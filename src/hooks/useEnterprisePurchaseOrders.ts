import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { EnterprisePurchaseOrder, PurchaseOrderStatus, PurchaseOrderLineItem, User, Supplier, ChangeOrder, Receipt, AuditEntry } from '../types/coupa-entities';

// Mock data for comprehensive enterprise purchase orders
const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    number: 'SUPP-000001',
    name: 'Dell Technologies Inc.',
    displayName: 'Dell Technologies',
    status: 'active',
    type: 'company',
    businessType: ['Manufacturer', 'Distributor'],
    industryType: ['Technology', 'Hardware'],
    size: 'enterprise',
    yearEstablished: 1984,
    taxId: '13-2658599',
    dunsNumber: '123456789',
    addresses: [],
    contacts: [],
    bankAccounts: [],
    certifications: [
      {
        id: 'CERT-001',
        name: 'ISO 9001:2015',
        type: 'Quality Management',
        issuedBy: 'ISO',
        issuedDate: '2023-01-01',
        expirationDate: '2026-01-01',
        status: 'active'
      }
    ],
    capabilities: [],
    commodities: ['IT Hardware', 'Computer Equipment'],
    geographicCoverage: ['North America', 'Europe', 'Asia Pacific'],
    paymentTerms: {
      id: 'PT-001',
      name: 'Net 30',
      description: 'Payment due 30 days from invoice date',
      daysNet: 30,
      discountDays: 10,
      discountPercentage: 2.0,
      isEarlyPaymentDiscount: true
    },
    currencies: ['USD', 'EUR', 'CAD'],
    languages: ['English', 'Spanish', 'French'],
    performanceMetrics: {
      onTimeDeliveryRate: 96.5,
      qualityScore: 4.7,
      responseTime: 2.3,
      defectRate: 0.8,
      customerSatisfactionScore: 4.6,
      totalSpend: 2500000,
      numberOfOrders: 145,
      averageOrderValue: 17241,
      lastUpdated: '2024-01-15T00:00:00Z'
    },
    riskAssessment: {
      overall: 'low',
      financial: 'low',
      operational: 'low',
      compliance: 'low',
      cyber: 'medium',
      geopolitical: 'low',
      environmental: 'low',
      lastAssessedAt: '2024-01-01T00:00:00Z',
      assessedBy: 'RISK-TEAM',
      nextAssessmentDate: '2024-07-01T00:00:00Z',
      mitigationPlans: []
    },
    sustainabilityMetrics: {
      carbonFootprint: 125,
      energyEfficiency: 87,
      wasteReduction: 78,
      recyclingRate: 92,
      sustainableSourcing: 85,
      certifications: ['Energy Star', 'EPEAT Gold'],
      score: 86,
      lastUpdated: '2024-01-01T00:00:00Z'
    },
    complianceStatus: {
      overall: 'compliant',
      requirements: [],
      auditFindings: []
    },
    contracts: ['CON-001'],
    catalogs: [],
    integrations: [],
    customFields: [],
    documents: [],
    auditTrail: [],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    onboardedAt: '2023-01-15T00:00:00Z',
    version: 1
  }
];

const mockUsers: User[] = [
  {
    id: 'USR-001',
    email: 'john.smith@company.com',
    firstName: 'John',
    lastName: 'Smith',
    displayName: 'John Smith',
    department: 'Procurement',
    title: 'Senior Procurement Specialist',
    costCenter: 'PROC-001',
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

const initialPurchaseOrders: EnterprisePurchaseOrder[] = [
  {
    id: 'PO-24-001',
    number: 'PO-2024-000001',
    title: 'Dell Laptop Procurement for Development Team',
    description: 'Purchase order for new development team laptops as per approved requisition REQ-24-001',
    status: 'issued',
    type: 'standard',
    requisitionIds: ['REQ-24-001'],
    requisitions: [], // Would be populated in real implementation
    supplierId: 'SUP-001',
    supplier: mockSuppliers[0],
    buyerId: 'USR-001',
    buyer: mockUsers[0],
    currency: 'USD',
    subtotalAmount: 19800.00,
    taxAmount: 1584.00,
    shippingAmount: 150.00,
    discountAmount: 1200.00,
    totalAmount: 20334.00,
    contractId: 'CON-001',
    paymentTerms: {
      id: 'PT-001',
      name: 'Net 30',
      description: 'Payment due 30 days from invoice date',
      daysNet: 30,
      discountDays: 10,
      discountPercentage: 2.0,
      isEarlyPaymentDiscount: true
    },
    deliveryTerms: {
      id: 'DT-001',
      code: 'FOB',
      description: 'Free on Board - Destination',
      incoterm: 'FOB'
    },
    shippingMethod: 'Ground',
    freightTerms: 'Prepaid',
    billToAddress: {
      id: 'ADDR-001',
      type: 'billing',
      name: 'Accounts Payable Department',
      addressLine1: '123 Corporate Plaza',
      addressLine2: 'Suite 100',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    shipToAddress: {
      id: 'ADDR-002',
      type: 'shipping',
      name: 'IT Department - Hardware Receiving',
      addressLine1: '123 Corporate Plaza',
      addressLine2: 'Loading Dock B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: false,
      isActive: true
    },
    remitToAddress: {
      id: 'ADDR-003',
      type: 'remit_to',
      name: 'Dell Technologies Inc.',
      addressLine1: 'One Dell Way',
      city: 'Round Rock',
      state: 'TX',
      postalCode: '78682',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    orderDate: '2024-01-17T00:00:00Z',
    requestedDeliveryDate: '2024-03-10T00:00:00Z',
    promisedDeliveryDate: '2024-03-08T00:00:00Z',
    expectedDeliveryDate: '2024-03-08T00:00:00Z',
    lineItems: [
      {
        id: 'POLI-001',
        poLineNumber: 1,
        lineNumber: 1,
        requisitionLineItemId: 'LINE-001',
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
          isActive: true,
          requiresApproval: true,
          suppliers: ['SUP-001'],
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
        requestedDeliveryDate: '2024-03-10T00:00:00Z',
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
          }
        ],
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
          }
        ],
        customFields: [],
        status: 'approved',
        sourceType: 'catalog',
        catalogItemId: 'CAT-ITEM-001',
        contractId: 'CON-001',
        needByDate: '2024-03-10T00:00:00Z',
        receiptRequired: true,
        inspectionRequired: false,
        hazardous: false,
        environmentallyFriendly: true,
        sustainabilityScore: 85,
        auditTrail: [],
        promisedQuantity: 8,
        receivedQuantity: 0,
        invoicedQuantity: 0,
        remainingQuantity: 8,
        promisedDeliveryDate: '2024-03-08T00:00:00Z',
        receipts: [],
        invoiceLineItems: []
      },
      {
        id: 'POLI-002',
        poLineNumber: 2,
        lineNumber: 2,
        requisitionLineItemId: 'LINE-002',
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
        requestedDeliveryDate: '2024-03-10T00:00:00Z',
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
        status: 'approved',
        sourceType: 'catalog',
        needByDate: '2024-03-10T00:00:00Z',
        receiptRequired: true,
        inspectionRequired: false,
        hazardous: false,
        environmentallyFriendly: true,
        auditTrail: [],
        promisedQuantity: 8,
        receivedQuantity: 0,
        invoicedQuantity: 0,
        remainingQuantity: 8,
        promisedDeliveryDate: '2024-03-08T00:00:00Z',
        receipts: [],
        invoiceLineItems: []
      }
    ],
    approvalPath: [
      {
        id: 'STEP-001',
        stepNumber: 1,
        name: 'Procurement Manager Approval',
        approverId: 'USR-001',
        approverType: 'user',
        status: 'approved',
        requiredAmount: 25000,
        approvedAt: '2024-01-16T14:30:00Z',
        isParallel: false,
        escalationPath: []
      }
    ],
    currentApprovalStep: undefined,
    attachments: [
      {
        id: 'ATT-PO-001',
        name: 'purchase-order-confirmation.pdf',
        originalName: 'PO Confirmation - Dell Technologies.pdf',
        mimeType: 'application/pdf',
        size: 185420,
        url: '/attachments/po-confirmation.pdf',
        uploadedBy: 'USR-001',
        uploadedAt: '2024-01-17T09:15:00Z',
        description: 'Purchase order confirmation from Dell',
        isPublic: false,
        version: 1
      }
    ],
    comments: [
      {
        id: 'COM-PO-001',
        text: 'PO issued to Dell Technologies. Delivery confirmed for March 8th, 2024. All specifications verified.',
        authorId: 'USR-001',
        author: mockUsers[0],
        createdAt: '2024-01-17T09:30:00Z',
        isInternal: true,
        attachments: []
      }
    ],
    changeOrders: [],
    receipts: [],
    invoices: [],
    customFields: [
      {
        id: 'CF-PO-001',
        name: 'project_code',
        label: 'Project Code',
        type: 'text',
        value: 'PROJ-IT-2024-001',
        required: true
      }
    ],
    auditTrail: [
      {
        id: 'AUD-PO-001',
        action: 'created',
        description: 'Purchase order created from approved requisition',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: '2024-01-17T08:00:00Z',
        changes: []
      },
      {
        id: 'AUD-PO-002',
        action: 'issued',
        description: 'Purchase order issued to supplier',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: '2024-01-17T09:00:00Z',
        changes: [
          {
            field: 'status',
            oldValue: 'approved',
            newValue: 'issued'
          }
        ]
      }
    ],
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-01-17T09:30:00Z',
    issuedAt: '2024-01-17T09:00:00Z',
    acknowledgedAt: '2024-01-17T11:45:00Z',
    version: 1,
    revisionNumber: 0,
    isAmendment: false
  },
  {
    id: 'PO-24-002',
    number: 'PO-2024-000002',
    title: 'Office Supplies - Q1 2024 Procurement',
    description: 'Standard quarterly office supplies procurement',
    status: 'acknowledged',
    type: 'standard',
    requisitionIds: ['REQ-24-002'],
    requisitions: [],
    supplierId: 'SUP-003',
    supplier: {
      ...mockSuppliers[0],
      id: 'SUP-003',
      name: 'Office Depot Business Solutions',
      displayName: 'Office Depot'
    },
    buyerId: 'USR-001',
    buyer: mockUsers[0],
    currency: 'USD',
    subtotalAmount: 4750.00,
    taxAmount: 380.00,
    shippingAmount: 45.00,
    discountAmount: 95.00,
    totalAmount: 5080.00,
    paymentTerms: {
      id: 'PT-002',
      name: 'Net 15',
      description: 'Payment due 15 days from invoice date',
      daysNet: 15,
      isEarlyPaymentDiscount: false
    },
    deliveryTerms: {
      id: 'DT-002',
      code: 'CIF',
      description: 'Cost, Insurance, and Freight',
      incoterm: 'CIF'
    },
    shippingMethod: 'Standard Ground',
    freightTerms: 'Prepaid',
    billToAddress: {
      id: 'ADDR-001',
      type: 'billing',
      name: 'Accounts Payable Department',
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
      name: 'Main Office Reception',
      addressLine1: '123 Corporate Plaza',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: false,
      isActive: true
    },
    remitToAddress: {
      id: 'ADDR-005',
      type: 'remit_to',
      name: 'Office Depot LLC',
      addressLine1: '6600 North Military Trail',
      city: 'Boca Raton',
      state: 'FL',
      postalCode: '33496',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    orderDate: '2024-01-15T00:00:00Z',
    requestedDeliveryDate: '2024-01-30T00:00:00Z',
    promisedDeliveryDate: '2024-01-28T00:00:00Z',
    expectedDeliveryDate: '2024-01-28T00:00:00Z',
    lineItems: [
      {
        id: 'POLI-003',
        poLineNumber: 1,
        lineNumber: 1,
        requisitionLineItemId: 'LINE-003',
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
        requestedDeliveryDate: '2024-01-30T00:00:00Z',
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
        needByDate: '2024-01-30T00:00:00Z',
        receiptRequired: true,
        inspectionRequired: false,
        hazardous: false,
        environmentallyFriendly: true,
        auditTrail: [],
        promisedQuantity: 20,
        receivedQuantity: 0,
        invoicedQuantity: 0,
        remainingQuantity: 20,
        promisedDeliveryDate: '2024-01-28T00:00:00Z',
        receipts: [],
        invoiceLineItems: []
      }
    ],
    approvalPath: [
      {
        id: 'STEP-002',
        stepNumber: 1,
        name: 'Operations Manager Approval',
        approverId: 'USR-005',
        approverType: 'user',
        status: 'approved',
        requiredAmount: 5000,
        approvedAt: '2024-01-14T16:20:00Z',
        isParallel: false,
        escalationPath: []
      }
    ],
    attachments: [],
    comments: [],
    changeOrders: [],
    receipts: [],
    invoices: [],
    customFields: [],
    auditTrail: [
      {
        id: 'AUD-PO-003',
        action: 'created',
        description: 'Purchase order created',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: '2024-01-15T10:00:00Z',
        changes: []
      },
      {
        id: 'AUD-PO-004',
        action: 'acknowledged',
        description: 'Purchase order acknowledged by supplier',
        userId: 'SYS-001',
        user: mockUsers[0],
        timestamp: '2024-01-15T14:30:00Z',
        changes: [
          {
            field: 'status',
            oldValue: 'issued',
            newValue: 'acknowledged'
          }
        ]
      }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    issuedAt: '2024-01-15T11:00:00Z',
    acknowledgedAt: '2024-01-15T14:30:00Z',
    version: 1,
    revisionNumber: 0,
    isAmendment: false
  }
];

export const useEnterprisePurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useLocalStorage('enterprisePurchaseOrders', initialPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start?: string, end?: string}>({});

  // Filter purchase orders based on current filters
  const filteredPurchaseOrders = useMemo(() => {
    return purchaseOrders.filter(po => {
      const matchesSearch = searchTerm === '' || 
        po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
      const matchesSupplier = supplierFilter === 'all' || po.supplier.name === supplierFilter;
      const matchesType = typeFilter === 'all' || po.type === typeFilter;

      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const poDate = new Date(po.orderDate);
        if (dateRange.start) {
          matchesDate = matchesDate && poDate >= new Date(dateRange.start);
        }
        if (dateRange.end) {
          matchesDate = matchesDate && poDate <= new Date(dateRange.end);
        }
      }

      return matchesSearch && matchesStatus && matchesSupplier && matchesType && matchesDate;
    });
  }, [purchaseOrders, searchTerm, statusFilter, supplierFilter, typeFilter, dateRange]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = purchaseOrders.length;
    const draft = purchaseOrders.filter(po => po.status === 'draft').length;
    const pending = purchaseOrders.filter(po => po.status === 'pending_approval').length;
    const approved = purchaseOrders.filter(po => po.status === 'approved').length;
    const issued = purchaseOrders.filter(po => po.status === 'issued').length;
    const acknowledged = purchaseOrders.filter(po => po.status === 'acknowledged').length;
    const inProgress = purchaseOrders.filter(po => po.status === 'in_progress').length;
    const received = purchaseOrders.filter(po => po.status === 'received').length;
    const totalValue = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);
    const avgOrderValue = total > 0 ? totalValue / total : 0;

    return {
      total,
      draft,
      pending,
      approved,
      issued,
      acknowledged,
      inProgress,
      received,
      totalValue,
      avgOrderValue
    };
  }, [purchaseOrders]);

  // CRUD operations
  const addPurchaseOrder = (po: Omit<EnterprisePurchaseOrder, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'version' | 'auditTrail'>) => {
    const newPO: EnterprisePurchaseOrder = {
      ...po,
      id: `PO-24-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      number: `PO-2024-${String(purchaseOrders.length + 1).padStart(6, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      auditTrail: [
        {
          id: `AUD-${Date.now()}`,
          action: 'created',
          description: 'Purchase order created',
          userId: po.buyerId,
          user: po.buyer,
          timestamp: new Date().toISOString(),
          changes: []
        }
      ]
    };

    setPurchaseOrders(prev => [...prev, newPO]);
    return newPO;
  };

  const updatePurchaseOrder = (id: string, updates: Partial<EnterprisePurchaseOrder>) => {
    setPurchaseOrders(prev => prev.map(po => {
      if (po.id === id) {
        const updatedPO = {
          ...po,
          ...updates,
          updatedAt: new Date().toISOString(),
          version: po.version + 1
        };

        // Add audit trail entry
        const auditEntry: AuditEntry = {
          id: `AUD-${Date.now()}`,
          action: 'updated',
          description: 'Purchase order updated',
          userId: po.buyerId,
          user: po.buyer,
          timestamp: new Date().toISOString(),
          changes: Object.keys(updates).map(key => ({
            field: key,
            oldValue: (po as any)[key],
            newValue: (updates as any)[key]
          }))
        };

        updatedPO.auditTrail = [...po.auditTrail, auditEntry];
        return updatedPO;
      }
      return po;
    }));
  };

  const deletePurchaseOrder = (id: string) => {
    setPurchaseOrders(prev => prev.filter(po => po.id !== id));
  };

  const issuePurchaseOrder = (id: string) => {
    updatePurchaseOrder(id, {
      status: 'issued',
      issuedAt: new Date().toISOString()
    });
  };

  const acknowledgePurchaseOrder = (id: string) => {
    updatePurchaseOrder(id, {
      status: 'acknowledged',
      acknowledgedAt: new Date().toISOString()
    });
  };

  const receivePurchaseOrder = (id: string, receiptData: Omit<Receipt, 'id' | 'createdAt' | 'auditTrail'>) => {
    const po = purchaseOrders.find(p => p.id === id);
    if (!po) return;

    const receipt: Receipt = {
      ...receiptData,
      id: `REC-${Date.now()}`,
      createdAt: new Date().toISOString(),
      auditTrail: []
    };

    // Update line item quantities
    const updatedLineItems = po.lineItems.map(item => ({
      ...item,
      receivedQuantity: item.receivedQuantity + (receiptData.lineItems.find(r => r.poLineItemId === item.id)?.quantityReceived || 0)
    }));

    // Check if all items are fully received
    const allReceived = updatedLineItems.every(item => item.receivedQuantity >= item.quantity);

    updatePurchaseOrder(id, {
      status: allReceived ? 'received' : 'partially_received',
      lineItems: updatedLineItems,
      receipts: [...po.receipts, receipt]
    });
  };

  const addChangeOrder = (poId: string, changeOrder: Omit<ChangeOrder, 'id' | 'requestedDate'>) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (!po) return;

    const newChangeOrder: ChangeOrder = {
      ...changeOrder,
      id: `CO-${Date.now()}`,
      requestedDate: new Date().toISOString()
    };

    updatePurchaseOrder(poId, {
      changeOrders: [...po.changeOrders, newChangeOrder]
    });
  };

  const approveChangeOrder = (poId: string, changeOrderId: string, approverId: string) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (!po) return;

    const updatedChangeOrders = po.changeOrders.map(co => {
      if (co.id === changeOrderId) {
        return {
          ...co,
          status: 'approved' as const,
          approvedBy: approverId,
          approvedDate: new Date().toISOString()
        };
      }
      return co;
    });

    updatePurchaseOrder(poId, {
      changeOrders: updatedChangeOrders
    });
  };

  const cancelPurchaseOrder = (id: string, reason: string) => {
    updatePurchaseOrder(id, {
      status: 'cancelled',
      reasonForChange: reason
    });
  };

  const addComment = (poId: string, text: string, authorId: string, isInternal: boolean = true) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (!po) return;

    const newComment = {
      id: `COM-${Date.now()}`,
      text,
      authorId,
      author: mockUsers[0], // In real app, fetch current user
      createdAt: new Date().toISOString(),
      isInternal,
      attachments: []
    };

    updatePurchaseOrder(poId, {
      comments: [...po.comments, newComment]
    });
  };

  const duplicatePurchaseOrder = (id: string) => {
    const po = purchaseOrders.find(p => p.id === id);
    if (!po) return null;

    const duplicated = addPurchaseOrder({
      ...po,
      title: `${po.title} (Copy)`,
      status: 'draft',
      issuedAt: undefined,
      acknowledgedAt: undefined,
      receipts: [],
      invoices: [],
      changeOrders: [],
      comments: [],
      attachments: []
    });

    return duplicated;
  };

  return {
    purchaseOrders: filteredPurchaseOrders,
    allPurchaseOrders: purchaseOrders,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    supplierFilter,
    setSupplierFilter,
    typeFilter,
    setTypeFilter,
    dateRange,
    setDateRange,
    metrics,
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    issuePurchaseOrder,
    acknowledgePurchaseOrder,
    receivePurchaseOrder,
    addChangeOrder,
    approveChangeOrder,
    cancelPurchaseOrder,
    addComment,
    duplicatePurchaseOrder,
    getPurchaseOrder: (id: string) => purchaseOrders.find(po => po.id === id)
  };
};