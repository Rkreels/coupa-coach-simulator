import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { EnterpriseRequisition, RequisitionStatus, RequisitionLineItem, User, Department, CostCenter, Budget, ApprovalStep, AuditEntry } from '../types/coupa-entities';

// Mock data for comprehensive enterprise requisitions
const mockUsers: User[] = [
  {
    id: 'USR-001',
    email: 'john.smith@company.com',
    firstName: 'John',
    lastName: 'Smith',
    displayName: 'John Smith',
    department: 'IT',
    title: 'Senior Developer',
    costCenter: 'IT-001',
    location: 'New York',
    status: 'active',
    roles: [],
    permissions: [],
    preferences: {
      language: 'en',
      timezone: 'EST',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      emailNotifications: true,
      smsNotifications: false,
      theme: 'light'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const mockDepartments: Department[] = [
  {
    id: 'DEPT-001',
    name: 'Information Technology',
    code: 'IT',
    managerId: 'USR-001',
    manager: mockUsers[0],
    costCenters: [],
    budgets: [],
    employees: [],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const initialRequisitions: EnterpriseRequisition[] = [
  {
    id: 'REQ-24-001',
    number: 'REQ-2024-000001',
    title: 'Laptop Procurement for Development Team',
    description: 'New laptops needed for the expanding development team to support ongoing projects',
    status: 'pending_approval',
    businessJustification: 'Current laptops are 4+ years old and impacting productivity. Team size increased by 40% requiring additional hardware.',
    requestorId: 'USR-001',
    requestor: mockUsers[0],
    departmentId: 'DEPT-001',
    department: mockDepartments[0],
    costCenterId: 'CC-IT-001',
    costCenter: {
      id: 'CC-IT-001',
      name: 'IT Operations',
      code: 'IT-OPS',
      departmentId: 'DEPT-001',
      managerId: 'USR-001',
      budgets: [],
      glAccounts: ['1200-IT-HARDWARE'],
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    budgetId: 'BUD-IT-2024',
    currency: 'USD',
    totalAmount: 32000.00,
    taxAmount: 2560.00,
    shippingAmount: 150.00,
    discountAmount: 1200.00,
    netAmount: 33510.00,
    urgency: 'high',
    needByDate: '2024-03-15',
    deliveryAddress: {
      id: 'ADDR-001',
      type: 'shipping',
      name: 'IT Department',
      addressLine1: '123 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    billToAddress: {
      id: 'ADDR-002',
      type: 'billing',
      name: 'Accounts Payable',
      addressLine1: '123 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    shipToAddress: {
      id: 'ADDR-003',
      type: 'shipping',
      name: 'IT Department',
      addressLine1: '123 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    approvalPath: [
      {
        id: 'STEP-001',
        stepNumber: 1,
        name: 'Direct Manager Approval',
        approverId: 'USR-002',
        approverType: 'user',
        status: 'approved',
        requiredAmount: 10000,
        approvedAt: '2024-01-16T10:30:00Z',
        isParallel: false,
        escalationPath: []
      },
      {
        id: 'STEP-002',
        stepNumber: 2,
        name: 'IT Director Approval',
        approverId: 'USR-003',
        approverType: 'user',
        status: 'pending',
        requiredAmount: 25000,
        isParallel: false,
        timeoutHours: 72,
        escalationPath: []
      },
      {
        id: 'STEP-003',
        stepNumber: 3,
        name: 'Finance Approval',
        approverId: 'USR-004',
        approverType: 'role',
        status: 'pending',
        requiredAmount: 30000,
        isParallel: false,
        escalationPath: []
      }
    ],
    currentApprovalStep: 2,
    lineItems: [
      {
        id: 'LINE-001',
        lineNumber: 1,
        description: 'Dell XPS 15 Laptop - i7, 16GB RAM, 512GB SSD',
        quantity: 8,
        unitOfMeasure: 'Each',
        unitPrice: 2200.00,
        totalPrice: 17600.00,
        currency: 'USD',
        categoryId: 'CAT-IT-HARDWARE',
        category: {
          id: 'CAT-IT-HARDWARE',
          name: 'IT Hardware',
          code: 'IT-HW',
          commodityCode: '43211500',
          unspscCode: '43211508',
          subcategories: [],
          isActive: true,
          requiresApproval: true,
          suppliers: ['SUP-001', 'SUP-002'],
          contracts: ['CON-001'],
          catalogs: ['CAT-001'],
          attributes: [],
          customFields: [],
          auditTrail: [],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        commodityCode: '43211500',
        supplierItemNumber: 'DELL-XPS15-I7-16-512',
        manufacturerPartNumber: 'XPS9520-I7-16-512',
        requestedDeliveryDate: '2024-03-10',
        accountingCode: '1200-IT-HARDWARE',
        glAccount: '1200.001.001',
        costCenter: 'CC-IT-001',
        suppliers: [
          {
            supplierId: 'SUP-001',
            supplierName: 'Dell Technologies',
            unitPrice: 2200.00,
            totalPrice: 17600.00,
            currency: 'USD',
            leadTime: 5,
            validUntil: '2024-02-15',
            terms: 'Net 30',
            isSelected: true
          },
          {
            supplierId: 'SUP-002',
            supplierName: 'CDW Corporation',
            unitPrice: 2350.00,
            totalPrice: 18800.00,
            currency: 'USD',
            leadTime: 7,
            validUntil: '2024-02-15',
            terms: 'Net 30',
            isSelected: false
          }
        ],
        preferredSupplierId: 'SUP-001',
        selectedSupplierId: 'SUP-001',
        specifications: [
          {
            id: 'SPEC-001',
            name: 'Processor',
            value: 'Intel Core i7-12700H',
            required: true
          },
          {
            id: 'SPEC-002',
            name: 'Memory',
            value: '16GB DDR4',
            unit: 'GB',
            required: true
          },
          {
            id: 'SPEC-003',
            name: 'Storage',
            value: '512GB NVMe SSD',
            unit: 'GB',
            required: true
          }
        ],
        customFields: [],
        status: 'submitted',
        sourceType: 'catalog',
        catalogItemId: 'CAT-ITEM-001',
        contractId: 'CON-001',
        needByDate: '2024-03-10',
        receiptRequired: true,
        inspectionRequired: false,
        hazardous: false,
        environmentallyFriendly: true,
        sustainabilityScore: 85,
        auditTrail: []
      },
      {
        id: 'LINE-002',
        lineNumber: 2,
        description: 'Dell USB-C Docking Station',
        quantity: 8,
        unitOfMeasure: 'Each',
        unitPrice: 275.00,
        totalPrice: 2200.00,
        currency: 'USD',
        categoryId: 'CAT-IT-ACCESSORIES',
        category: {
          id: 'CAT-IT-ACCESSORIES',
          name: 'IT Accessories',
          code: 'IT-ACC',
          commodityCode: '43212000',
          subcategories: [],
          isActive: true,
          requiresApproval: false,
          suppliers: ['SUP-001'],
          contracts: ['CON-001'],
          catalogs: ['CAT-001'],
          attributes: [],
          customFields: [],
          auditTrail: [],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        commodityCode: '43212000',
        requestedDeliveryDate: '2024-03-10',
        accountingCode: '1200-IT-ACCESSORIES',
        suppliers: [
          {
            supplierId: 'SUP-001',
            supplierName: 'Dell Technologies',
            unitPrice: 275.00,
            totalPrice: 2200.00,
            currency: 'USD',
            leadTime: 3,
            validUntil: '2024-02-15',
            isSelected: true
          }
        ],
        selectedSupplierId: 'SUP-001',
        specifications: [],
        customFields: [],
        status: 'submitted',
        sourceType: 'catalog',
        needByDate: '2024-03-10',
        receiptRequired: true,
        inspectionRequired: false,
        hazardous: false,
        environmentallyFriendly: true,
        auditTrail: []
      }
    ],
    attachments: [
      {
        id: 'ATT-001',
        name: 'laptop-specifications.pdf',
        originalName: 'Laptop Technical Specifications.pdf',
        mimeType: 'application/pdf',
        size: 245760,
        url: '/attachments/laptop-specifications.pdf',
        uploadedBy: 'USR-001',
        uploadedAt: '2024-01-15T14:30:00Z',
        description: 'Technical specifications for requested laptops',
        isPublic: false,
        version: 1
      }
    ],
    comments: [
      {
        id: 'COM-001',
        text: 'Added business justification and technical specifications. This requisition aligns with our Q1 IT modernization initiative.',
        authorId: 'USR-001',
        author: mockUsers[0],
        createdAt: '2024-01-15T14:45:00Z',
        isInternal: true,
        attachments: []
      }
    ],
    tags: ['Q1-2024', 'IT-Modernization', 'Development-Team', 'Hardware-Refresh'],
    customFields: [
      {
        id: 'CF-001',
        name: 'project_code',
        label: 'Project Code',
        type: 'text',
        value: 'PROJ-IT-2024-001',
        required: true
      },
      {
        id: 'CF-002',
        name: 'asset_type',
        label: 'Asset Type',
        type: 'select',
        value: 'Capital',
        required: true,
        options: ['Capital', 'Operating', 'Maintenance']
      }
    ],
    auditTrail: [
      {
        id: 'AUD-001',
        action: 'created',
        description: 'Requisition created',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: '2024-01-15T09:00:00Z',
        changes: []
      },
      {
        id: 'AUD-002',
        action: 'submitted',
        description: 'Requisition submitted for approval',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: '2024-01-15T15:00:00Z',
        changes: [
          {
            field: 'status',
            oldValue: 'draft',
            newValue: 'submitted'
          }
        ]
      }
    ],
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-16T10:30:00Z',
    submittedAt: '2024-01-15T15:00:00Z',
    version: 2,
    isTemplate: false
  },
  {
    id: 'REQ-24-002',
    number: 'REQ-2024-000002',
    title: 'Office Supplies Q1 2024',
    description: 'Quarterly office supplies procurement for all departments',
    status: 'approved',
    businessJustification: 'Regular quarterly procurement to maintain adequate inventory levels for office operations.',
    requestorId: 'USR-001',
    requestor: mockUsers[0],
    departmentId: 'DEPT-002',
    department: {
      id: 'DEPT-002',
      name: 'Operations',
      code: 'OPS',
      managerId: 'USR-005',
      manager: mockUsers[0],
      costCenters: [],
      budgets: [],
      employees: [],
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    costCenterId: 'CC-OPS-001',
    costCenter: {
      id: 'CC-OPS-001',
      name: 'General Operations',
      code: 'OPS-GEN',
      departmentId: 'DEPT-002',
      managerId: 'USR-005',
      budgets: [],
      glAccounts: ['5000-OFFICE-SUPPLIES'],
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    currency: 'USD',
    totalAmount: 4750.00,
    taxAmount: 380.00,
    shippingAmount: 45.00,
    discountAmount: 95.00,
    netAmount: 5080.00,
    urgency: 'medium',
    needByDate: '2024-02-01',
    deliveryAddress: {
      id: 'ADDR-004',
      type: 'shipping',
      name: 'Main Office',
      addressLine1: '123 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    billToAddress: {
      id: 'ADDR-002',
      type: 'billing',
      name: 'Accounts Payable',
      addressLine1: '123 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    shipToAddress: {
      id: 'ADDR-004',
      type: 'shipping',
      name: 'Main Office',
      addressLine1: '123 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    approvalPath: [
      {
        id: 'STEP-004',
        stepNumber: 1,
        name: 'Operations Manager Approval',
        approverId: 'USR-005',
        approverType: 'user',
        status: 'approved',
        requiredAmount: 5000,
        approvedAt: '2024-01-14T11:15:00Z',
        isParallel: false,
        escalationPath: []
      }
    ],
    currentApprovalStep: 1,
    lineItems: [
      {
        id: 'LINE-003',
        lineNumber: 1,
        description: 'Copy Paper - Letter Size (20 cases)',
        quantity: 20,
        unitOfMeasure: 'Case',
        unitPrice: 42.50,
        totalPrice: 850.00,
        currency: 'USD',
        categoryId: 'CAT-OFFICE-SUPPLIES',
        category: {
          id: 'CAT-OFFICE-SUPPLIES',
          name: 'Office Supplies',
          code: 'OFF-SUP',
          commodityCode: '14111500',
          subcategories: [],
          isActive: true,
          requiresApproval: false,
          suppliers: ['SUP-003'],
          contracts: ['CON-002'],
          catalogs: ['CAT-002'],
          attributes: [],
          customFields: [],
          auditTrail: [],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        requestedDeliveryDate: '2024-01-30',
        accountingCode: '5000-OFFICE-SUPPLIES',
        suppliers: [
          {
            supplierId: 'SUP-003',
            supplierName: 'Office Depot',
            unitPrice: 42.50,
            totalPrice: 850.00,
            currency: 'USD',
            leadTime: 2,
            validUntil: '2024-02-01',
            isSelected: true
          }
        ],
        selectedSupplierId: 'SUP-003',
        specifications: [],
        customFields: [],
        status: 'approved',
        sourceType: 'catalog',
        needByDate: '2024-01-30',
        receiptRequired: true,
        inspectionRequired: false,
        hazardous: false,
        environmentallyFriendly: true,
        auditTrail: []
      }
    ],
    attachments: [],
    comments: [],
    tags: ['Q1-2024', 'Office-Supplies', 'Operations'],
    customFields: [],
    auditTrail: [
      {
        id: 'AUD-003',
        action: 'created',
        description: 'Requisition created',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: '2024-01-12T10:00:00Z',
        changes: []
      },
      {
        id: 'AUD-004',
        action: 'approved',
        description: 'Requisition approved by Operations Manager',
        userId: 'USR-005',
        user: mockUsers[0],
        timestamp: '2024-01-14T11:15:00Z',
        changes: [
          {
            field: 'status',
            oldValue: 'pending_approval',
            newValue: 'approved'
          }
        ]
      }
    ],
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-14T11:15:00Z',
    submittedAt: '2024-01-12T11:00:00Z',
    approvedAt: '2024-01-14T11:15:00Z',
    version: 1,
    isTemplate: false
  }
];

export const useEnterpriseRequisitions = () => {
  const [requisitions, setRequisitions] = useLocalStorage('enterpriseRequisitions', initialRequisitions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start?: string, end?: string}>({});

  // Filter requisitions based on current filters
  const filteredRequisitions = useMemo(() => {
    return requisitions.filter(req => {
      const matchesSearch = searchTerm === '' || 
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requestor.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || req.department.code === departmentFilter;
      const matchesUrgency = urgencyFilter === 'all' || req.urgency === urgencyFilter;

      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const reqDate = new Date(req.createdAt);
        if (dateRange.start) {
          matchesDate = matchesDate && reqDate >= new Date(dateRange.start);
        }
        if (dateRange.end) {
          matchesDate = matchesDate && reqDate <= new Date(dateRange.end);
        }
      }

      return matchesSearch && matchesStatus && matchesDepartment && matchesUrgency && matchesDate;
    });
  }, [requisitions, searchTerm, statusFilter, departmentFilter, urgencyFilter, dateRange]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = requisitions.length;
    const draft = requisitions.filter(r => r.status === 'draft').length;
    const pending = requisitions.filter(r => r.status === 'pending_approval' || r.status === 'submitted').length;
    const approved = requisitions.filter(r => r.status === 'approved').length;
    const rejected = requisitions.filter(r => r.status === 'rejected').length;
    const totalValue = requisitions.reduce((sum, r) => sum + r.netAmount, 0);
    const avgProcessingTime = 2.5; // days - calculated from audit trail in real implementation

    return {
      total,
      draft,
      pending,
      approved,
      rejected,
      totalValue,
      avgProcessingTime
    };
  }, [requisitions]);

  // CRUD operations
  const addRequisition = (requisition: Omit<EnterpriseRequisition, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'version' | 'auditTrail'>) => {
    const newRequisition: EnterpriseRequisition = {
      ...requisition,
      id: `REQ-24-${String(requisitions.length + 1).padStart(3, '0')}`,
      number: `REQ-2024-${String(requisitions.length + 1).padStart(6, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      auditTrail: [
        {
          id: `AUD-${Date.now()}`,
          action: 'created',
          description: 'Requisition created',
          userId: requisition.requestorId,
          user: requisition.requestor,
          timestamp: new Date().toISOString(),
          changes: []
        }
      ]
    };

    setRequisitions(prev => [...prev, newRequisition]);
    return newRequisition;
  };

  const updateRequisition = (id: string, updates: Partial<EnterpriseRequisition>) => {
    setRequisitions(prev => prev.map(req => {
      if (req.id === id) {
        const updatedReq = {
          ...req,
          ...updates,
          updatedAt: new Date().toISOString(),
          version: req.version + 1
        };

        // Add audit trail entry
        const auditEntry: AuditEntry = {
          id: `AUD-${Date.now()}`,
          action: 'updated',
          description: 'Requisition updated',
          userId: req.requestorId, // In real app, use current user
          user: req.requestor,
          timestamp: new Date().toISOString(),
          changes: Object.keys(updates).map(key => ({
            field: key,
            oldValue: (req as any)[key],
            newValue: (updates as any)[key]
          }))
        };

        updatedReq.auditTrail = [...req.auditTrail, auditEntry];
        return updatedReq;
      }
      return req;
    }));
  };

  const deleteRequisition = (id: string) => {
    setRequisitions(prev => prev.filter(req => req.id !== id));
  };

  const submitRequisition = (id: string) => {
    updateRequisition(id, {
      status: 'submitted',
      submittedAt: new Date().toISOString()
    });
  };

  const approveRequisition = (id: string, approverId: string, comments?: string) => {
    const requisition = requisitions.find(r => r.id === id);
    if (!requisition) return;

    const currentStep = requisition.approvalPath[requisition.currentApprovalStep || 0];
    if (currentStep) {
      const updatedApprovalPath = [...requisition.approvalPath];
      updatedApprovalPath[requisition.currentApprovalStep || 0] = {
        ...currentStep,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        comments
      };

      const isLastStep = (requisition.currentApprovalStep || 0) >= requisition.approvalPath.length - 1;
      const newStatus: RequisitionStatus = isLastStep ? 'approved' : 'pending_approval';
      const newCurrentStep = isLastStep ? undefined : (requisition.currentApprovalStep || 0) + 1;

      updateRequisition(id, {
        status: newStatus,
        approvalPath: updatedApprovalPath,
        currentApprovalStep: newCurrentStep,
        ...(isLastStep && { approvedAt: new Date().toISOString() })
      });
    }
  };

  const rejectRequisition = (id: string, approverId: string, reason: string) => {
    const requisition = requisitions.find(r => r.id === id);
    if (!requisition) return;

    const currentStep = requisition.approvalPath[requisition.currentApprovalStep || 0];
    if (currentStep) {
      const updatedApprovalPath = [...requisition.approvalPath];
      updatedApprovalPath[requisition.currentApprovalStep || 0] = {
        ...currentStep,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        comments: reason
      };

      updateRequisition(id, {
        status: 'rejected',
        approvalPath: updatedApprovalPath,
        rejectedAt: new Date().toISOString()
      });
    }
  };

  const addLineItem = (requisitionId: string, lineItem: Omit<RequisitionLineItem, 'id' | 'lineNumber' | 'auditTrail'>) => {
    const requisition = requisitions.find(r => r.id === requisitionId);
    if (!requisition) return;

    const newLineItem: RequisitionLineItem = {
      ...lineItem,
      id: `LINE-${Date.now()}`,
      lineNumber: requisition.lineItems.length + 1,
      auditTrail: []
    };

    const updatedLineItems = [...requisition.lineItems, newLineItem];
    const newTotalAmount = updatedLineItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const newTaxAmount = newTotalAmount * 0.08; // 8% tax rate
    const newNetAmount = newTotalAmount + newTaxAmount + (requisition.shippingAmount || 0) - (requisition.discountAmount || 0);

    updateRequisition(requisitionId, {
      lineItems: updatedLineItems,
      totalAmount: newTotalAmount,
      taxAmount: newTaxAmount,
      netAmount: newNetAmount
    });
  };

  const updateLineItem = (requisitionId: string, lineItemId: string, updates: Partial<RequisitionLineItem>) => {
    const requisition = requisitions.find(r => r.id === requisitionId);
    if (!requisition) return;

    const updatedLineItems = requisition.lineItems.map(item => {
      if (item.id === lineItemId) {
        return { ...item, ...updates };
      }
      return item;
    });

    const newTotalAmount = updatedLineItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const newTaxAmount = newTotalAmount * 0.08;
    const newNetAmount = newTotalAmount + newTaxAmount + (requisition.shippingAmount || 0) - (requisition.discountAmount || 0);

    updateRequisition(requisitionId, {
      lineItems: updatedLineItems,
      totalAmount: newTotalAmount,
      taxAmount: newTaxAmount,
      netAmount: newNetAmount
    });
  };

  const removeLineItem = (requisitionId: string, lineItemId: string) => {
    const requisition = requisitions.find(r => r.id === requisitionId);
    if (!requisition) return;

    const updatedLineItems = requisition.lineItems.filter(item => item.id !== lineItemId);
    const newTotalAmount = updatedLineItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const newTaxAmount = newTotalAmount * 0.08;
    const newNetAmount = newTotalAmount + newTaxAmount + (requisition.shippingAmount || 0) - (requisition.discountAmount || 0);

    updateRequisition(requisitionId, {
      lineItems: updatedLineItems,
      totalAmount: newTotalAmount,
      taxAmount: newTaxAmount,
      netAmount: newNetAmount
    });
  };

  const addComment = (requisitionId: string, text: string, authorId: string, isInternal: boolean = true) => {
    const requisition = requisitions.find(r => r.id === requisitionId);
    if (!requisition) return;

    const newComment = {
      id: `COM-${Date.now()}`,
      text,
      authorId,
      author: mockUsers[0], // In real app, fetch current user
      createdAt: new Date().toISOString(),
      isInternal,
      attachments: []
    };

    updateRequisition(requisitionId, {
      comments: [...requisition.comments, newComment]
    });
  };

  const duplicateRequisition = (id: string) => {
    const requisition = requisitions.find(r => r.id === id);
    if (!requisition) return null;

    const duplicated = addRequisition({
      ...requisition,
      title: `${requisition.title} (Copy)`,
      status: 'draft',
      submittedAt: undefined,
      approvedAt: undefined,
      rejectedAt: undefined,
      currentApprovalStep: undefined,
      approvalPath: requisition.approvalPath.map(step => ({
        ...step,
        status: 'pending',
        approvedAt: undefined,
        rejectedAt: undefined,
        comments: undefined
      })),
      comments: [],
      attachments: []
    });

    return duplicated;
  };

  return {
    requisitions: filteredRequisitions,
    allRequisitions: requisitions,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    urgencyFilter,
    setUrgencyFilter,
    dateRange,
    setDateRange,
    metrics,
    addRequisition,
    updateRequisition,
    deleteRequisition,
    submitRequisition,
    approveRequisition,
    rejectRequisition,
    addLineItem,
    updateLineItem,
    removeLineItem,
    addComment,
    duplicateRequisition,
    getRequisition: (id: string) => requisitions.find(r => r.id === id)
  };
};