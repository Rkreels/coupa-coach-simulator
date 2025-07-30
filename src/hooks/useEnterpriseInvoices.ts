import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { EnterpriseInvoice, InvoiceStatus, InvoiceLineItem, TaxLineItem, Payment, Dispute, MatchingException, User, Supplier, AuditEntry } from '../types/coupa-entities';

// Mock data for comprehensive enterprise invoices
const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    number: 'SUPP-000001',
    name: 'Dell Technologies Inc.',
    displayName: 'Dell Technologies',
    status: 'active',
    type: 'company',
    subsidiaries: [],
    businessType: ['Manufacturer'],
    industryType: ['Technology'],
    size: 'enterprise',
    taxId: '13-2658599',
    addresses: [],
    contacts: [],
    bankAccounts: [],
    certifications: [],
    capabilities: [],
    commodities: ['IT Hardware'],
    geographicCoverage: ['Global'],
    paymentTerms: {
      id: 'PT-001',
      name: 'Net 30',
      description: 'Payment due 30 days from invoice date',
      daysNet: 30,
      discountDays: 10,
      discountPercentage: 2.0,
      isEarlyPaymentDiscount: true
    },
    currencies: ['USD'],
    languages: ['English'],
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
      certifications: ['Energy Star'],
      score: 86,
      lastUpdated: '2024-01-01T00:00:00Z'
    },
    complianceStatus: {
      overall: 'compliant',
      requirements: [],
      auditFindings: []
    },
    contracts: [],
    catalogs: [],
    integrations: [],
    customFields: [],
    documents: [],
    auditTrail: [],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    version: 1
  }
];

const mockUsers: User[] = [
  {
    id: 'USR-001',
    email: 'jane.doe@company.com',
    firstName: 'Jane',
    lastName: 'Doe',
    displayName: 'Jane Doe',
    department: 'Accounts Payable',
    title: 'AP Specialist',
    costCenter: 'FIN-001',
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

const initialInvoices: EnterpriseInvoice[] = [
  {
    id: 'INV-24-001',
    number: 'INV-2024-000001',
    supplierInvoiceNumber: 'DELL-INV-2024-001234',
    type: 'standard',
    status: 'pending_approval',
    supplierId: 'SUP-001',
    supplier: mockSuppliers[0],
    purchaseOrderIds: ['PO-24-001'],
    purchaseOrders: [], // Would be populated in real implementation
    currency: 'USD',
    subtotalAmount: 19800.00,
    taxAmount: 1584.00,
    shippingAmount: 150.00,
    discountAmount: 1200.00,
    totalAmount: 20334.00,
    amountDue: 20334.00,
    paidAmount: 0.00,
    disputedAmount: 0.00,
    invoiceDate: '2024-03-10T00:00:00Z',
    dueDate: '2024-04-09T00:00:00Z',
    discountDate: '2024-03-20T00:00:00Z',
    receivedDate: '2024-03-12T00:00:00Z',
    paymentTerms: {
      id: 'PT-001',
      name: 'Net 30',
      description: 'Payment due 30 days from invoice date',
      daysNet: 30,
      discountDays: 10,
      discountPercentage: 2.0,
      isEarlyPaymentDiscount: true
    },
    remitToAddress: {
      id: 'ADDR-REM-001',
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
    billFromAddress: {
      id: 'ADDR-BILL-001',
      type: 'billing',
      name: 'Dell Technologies Inc.',
      addressLine1: 'One Dell Way',
      city: 'Round Rock',
      state: 'TX',
      postalCode: '78682',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    lineItems: [
      {
        id: 'INVLI-001',
        lineNumber: 1,
        description: 'Dell XPS 15 Laptop - i7, 16GB RAM, 512GB SSD',
        quantity: 8,
        unitPrice: 2200.00,
        totalPrice: 17600.00,
        currency: 'USD',
        poLineItemId: 'POLI-001',
        receiptLineItemId: 'RECLI-001',
        accountingCode: '1200-IT-HARDWARE',
        taxCode: 'TX-NY-STD',
        taxAmount: 1408.00,
        customFields: [],
        matchingStatus: 'matched',
        exceptions: []
      },
      {
        id: 'INVLI-002',
        lineNumber: 2,
        description: 'Dell USB-C Docking Station',
        quantity: 8,
        unitPrice: 275.00,
        totalPrice: 2200.00,
        currency: 'USD',
        poLineItemId: 'POLI-002',
        receiptLineItemId: 'RECLI-002',
        accountingCode: '1200-IT-ACCESSORIES',
        taxCode: 'TX-NY-STD',
        taxAmount: 176.00,
        customFields: [],
        matchingStatus: 'matched',
        exceptions: []
      }
    ],
    taxLineItems: [
      {
        id: 'TAXLI-001',
        taxCode: 'TX-NY-STD',
        taxDescription: 'New York State Sales Tax',
        taxRate: 8.0,
        taxableAmount: 19800.00,
        taxAmount: 1584.00,
        jurisdiction: 'New York'
      }
    ],
    approvalPath: [
      {
        id: 'STEP-INV-001',
        stepNumber: 1,
        name: 'AP Clerk Review',
        approverId: 'USR-001',
        approverType: 'user',
        status: 'pending',
        requiredAmount: 25000,
        isParallel: false,
        escalationPath: []
      },
      {
        id: 'STEP-INV-002',
        stepNumber: 2,
        name: 'Finance Manager Approval',
        approverId: 'USR-002',
        approverType: 'user',
        status: 'pending',
        requiredAmount: 20000,
        isParallel: false,
        escalationPath: []
      }
    ],
    currentApprovalStep: 0,
    matchingStatus: 'matched',
    matchingExceptions: [],
    paymentStatus: 'pending',
    payments: [],
    disputes: [],
    attachments: [
      {
        id: 'ATT-INV-001',
        name: 'dell-invoice-001234.pdf',
        originalName: 'Invoice DELL-INV-2024-001234.pdf',
        mimeType: 'application/pdf',
        size: 425600,
        url: '/attachments/dell-invoice-001234.pdf',
        uploadedBy: 'USR-001',
        uploadedAt: '2024-03-12T09:15:00Z',
        description: 'Original invoice from Dell Technologies',
        isPublic: false,
        version: 1
      }
    ],
    comments: [
      {
        id: 'COM-INV-001',
        text: 'Invoice received and matched against PO-24-001. All line items and amounts match. Ready for approval.',
        authorId: 'USR-001',
        author: mockUsers[0],
        createdAt: '2024-03-12T10:30:00Z',
        isInternal: true,
        attachments: []
      }
    ],
    customFields: [
      {
        id: 'CF-INV-001',
        name: 'gl_code',
        label: 'GL Code',
        type: 'text',
        value: '1200.001.001',
        required: true
      }
    ],
    auditTrail: [
      {
        id: 'AUD-INV-001',
        action: 'received',
        description: 'Invoice received from supplier',
        userId: 'SYS-001',
        user: mockUsers[0],
        timestamp: '2024-03-12T09:00:00Z',
        changes: []
      },
      {
        id: 'AUD-INV-002',
        action: 'matched',
        description: 'Invoice matched against purchase order',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: '2024-03-12T10:15:00Z',
        changes: [
          {
            field: 'matchingStatus',
            oldValue: 'unmatched',
            newValue: 'matched'
          }
        ]
      }
    ],
    createdAt: '2024-03-12T09:00:00Z',
    updatedAt: '2024-03-12T10:30:00Z',
    processedAt: '2024-03-12T10:15:00Z',
    version: 1,
    isRecurring: false
  },
  {
    id: 'INV-24-002',
    number: 'INV-2024-000002',
    supplierInvoiceNumber: 'OD-2024-5678',
    type: 'standard',
    status: 'approved',
    supplierId: 'SUP-003',
    supplier: {
      ...mockSuppliers[0],
      id: 'SUP-003',
      name: 'Office Depot Business Solutions',
      displayName: 'Office Depot'
    },
    purchaseOrderIds: ['PO-24-002'],
    purchaseOrders: [],
    currency: 'USD',
    subtotalAmount: 4750.00,
    taxAmount: 380.00,
    shippingAmount: 45.00,
    discountAmount: 95.00,
    totalAmount: 5080.00,
    amountDue: 5080.00,
    paidAmount: 0.00,
    disputedAmount: 0.00,
    invoiceDate: '2024-01-30T00:00:00Z',
    dueDate: '2024-02-14T00:00:00Z',
    receivedDate: '2024-02-01T00:00:00Z',
    approvedDate: '2024-02-02T00:00:00Z',
    paymentTerms: {
      id: 'PT-002',
      name: 'Net 15',
      description: 'Payment due 15 days from invoice date',
      daysNet: 15,
      isEarlyPaymentDiscount: false
    },
    remitToAddress: {
      id: 'ADDR-REM-002',
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
    billFromAddress: {
      id: 'ADDR-BILL-002',
      type: 'billing',
      name: 'Office Depot LLC',
      addressLine1: '6600 North Military Trail',
      city: 'Boca Raton',
      state: 'FL',
      postalCode: '33496',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    lineItems: [
      {
        id: 'INVLI-003',
        lineNumber: 1,
        description: 'Copy Paper - Letter Size (20 cases)',
        quantity: 20,
        unitPrice: 42.50,
        totalPrice: 850.00,
        currency: 'USD',
        poLineItemId: 'POLI-003',
        receiptLineItemId: 'RECLI-003',
        accountingCode: '5000-OFFICE-SUPPLIES',
        taxCode: 'TX-NY-STD',
        taxAmount: 68.00,
        customFields: [],
        matchingStatus: 'matched',
        exceptions: []
      }
    ],
    taxLineItems: [
      {
        id: 'TAXLI-002',
        taxCode: 'TX-NY-STD',
        taxDescription: 'New York State Sales Tax',
        taxRate: 8.0,
        taxableAmount: 4750.00,
        taxAmount: 380.00,
        jurisdiction: 'New York'
      }
    ],
    approvalPath: [
      {
        id: 'STEP-INV-003',
        stepNumber: 1,
        name: 'Operations Manager Approval',
        approverId: 'USR-005',
        approverType: 'user',
        status: 'approved',
        requiredAmount: 5000,
        approvedAt: '2024-02-02T11:30:00Z',
        isParallel: false,
        escalationPath: []
      }
    ],
    currentApprovalStep: undefined,
    matchingStatus: 'matched',
    matchingExceptions: [],
    paymentStatus: 'scheduled',
    payments: [
      {
        id: 'PAY-001',
        paymentNumber: 'PAY-2024-000001',
        method: 'ach',
        amount: 5080.00,
        currency: 'USD',
        scheduledDate: '2024-02-14T00:00:00Z',
        status: 'scheduled',
        remittanceInfo: {
          invoiceNumbers: ['INV-2024-000002'],
          discountsTaken: 0,
          adjustments: 0,
          netAmount: 5080.00
        }
      }
    ],
    disputes: [],
    attachments: [],
    comments: [
      {
        id: 'COM-INV-002',
        text: 'Invoice approved for payment. Payment scheduled for due date.',
        authorId: 'USR-005',
        author: mockUsers[0],
        createdAt: '2024-02-02T11:30:00Z',
        isInternal: true,
        attachments: []
      }
    ],
    customFields: [],
    auditTrail: [
      {
        id: 'AUD-INV-003',
        action: 'received',
        description: 'Invoice received from supplier',
        userId: 'SYS-001',
        user: mockUsers[0],
        timestamp: '2024-02-01T08:00:00Z',
        changes: []
      },
      {
        id: 'AUD-INV-004',
        action: 'approved',
        description: 'Invoice approved for payment',
        userId: 'USR-005',
        user: mockUsers[0],
        timestamp: '2024-02-02T11:30:00Z',
        changes: [
          {
            field: 'status',
            oldValue: 'pending_approval',
            newValue: 'approved'
          }
        ]
      }
    ],
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-02T11:30:00Z',
    processedAt: '2024-02-01T09:00:00Z',
    version: 1,
    isRecurring: false
  },
  {
    id: 'INV-24-003',
    number: 'INV-2024-000003',
    supplierInvoiceNumber: 'SERV-2024-9999',
    type: 'standard',
    status: 'disputed',
    supplierId: 'SUP-004',
    supplier: {
      ...mockSuppliers[0],
      id: 'SUP-004',
      name: 'TechServices Corp',
      displayName: 'TechServices'
    },
    purchaseOrderIds: ['PO-24-003'],
    purchaseOrders: [],
    currency: 'USD',
    subtotalAmount: 15000.00,
    taxAmount: 1200.00,
    shippingAmount: 0.00,
    discountAmount: 0.00,
    totalAmount: 16200.00,
    amountDue: 16200.00,
    paidAmount: 0.00,
    disputedAmount: 3000.00,
    invoiceDate: '2024-02-15T00:00:00Z',
    dueDate: '2024-03-16T00:00:00Z',
    receivedDate: '2024-02-18T00:00:00Z',
    paymentTerms: {
      id: 'PT-003',
      name: 'Net 30',
      description: 'Payment due 30 days from invoice date',
      daysNet: 30,
      isEarlyPaymentDiscount: false
    },
    remitToAddress: {
      id: 'ADDR-REM-003',
      type: 'remit_to',
      name: 'TechServices Corp',
      addressLine1: '456 Tech Boulevard',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    billFromAddress: {
      id: 'ADDR-BILL-003',
      type: 'billing',
      name: 'TechServices Corp',
      addressLine1: '456 Tech Boulevard',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    lineItems: [
      {
        id: 'INVLI-004',
        lineNumber: 1,
        description: 'IT Consulting Services - January 2024',
        quantity: 100,
        unitPrice: 150.00,
        totalPrice: 15000.00,
        currency: 'USD',
        poLineItemId: 'POLI-004',
        accountingCode: '6000-CONSULTING',
        taxCode: 'TX-CA-STD',
        taxAmount: 1200.00,
        customFields: [],
        matchingStatus: 'exception',
        exceptions: ['Quantity discrepancy: PO shows 80 hours, invoice shows 100 hours']
      }
    ],
    taxLineItems: [
      {
        id: 'TAXLI-003',
        taxCode: 'TX-CA-STD',
        taxDescription: 'California State Sales Tax',
        taxRate: 8.0,
        taxableAmount: 15000.00,
        taxAmount: 1200.00,
        jurisdiction: 'California'
      }
    ],
    approvalPath: [
      {
        id: 'STEP-INV-004',
        stepNumber: 1,
        name: 'IT Manager Review',
        approverId: 'USR-003',
        approverType: 'user',
        status: 'pending',
        requiredAmount: 20000,
        isParallel: false,
        escalationPath: []
      }
    ],
    currentApprovalStep: 0,
    matchingStatus: 'exception',
    matchingExceptions: [
      {
        type: 'quantity',
        description: 'Invoice quantity (100 hours) exceeds PO quantity (80 hours) by 20 hours',
        severity: 'medium',
        autoResolvable: false,
        resolution: 'Pending supplier explanation for additional hours'
      }
    ],
    paymentStatus: 'on_hold',
    payments: [],
    disputes: [
      {
        id: 'DISP-001',
        type: 'quantity',
        description: 'Invoice shows 100 hours of consulting services, but PO was only for 80 hours. Additional 20 hours not pre-approved.',
        amount: 3000.00,
        status: 'investigating',
        createdBy: 'USR-003',
        createdDate: '2024-02-20T00:00:00Z',
        documents: []
      }
    ],
    attachments: [
      {
        id: 'ATT-INV-003',
        name: 'timesheet-january-2024.pdf',
        originalName: 'Consulting Timesheet - January 2024.pdf',
        mimeType: 'application/pdf',
        size: 156780,
        url: '/attachments/timesheet-january-2024.pdf',
        uploadedBy: 'USR-003',
        uploadedAt: '2024-02-20T14:45:00Z',
        description: 'Timesheet supporting disputed hours',
        isPublic: false,
        version: 1
      }
    ],
    comments: [
      {
        id: 'COM-INV-003',
        text: 'Invoice contains 20 hours beyond the approved PO. Initiated dispute for clarification on additional work performed.',
        authorId: 'USR-003',
        author: mockUsers[0],
        createdAt: '2024-02-20T15:00:00Z',
        isInternal: true,
        attachments: []
      }
    ],
    customFields: [
      {
        id: 'CF-INV-002',
        name: 'project_code',
        label: 'Project Code',
        type: 'text',
        value: 'PROJ-IT-CONSULT-2024',
        required: true
      }
    ],
    auditTrail: [
      {
        id: 'AUD-INV-005',
        action: 'received',
        description: 'Invoice received from supplier',
        userId: 'SYS-001',
        user: mockUsers[0],
        timestamp: '2024-02-18T10:00:00Z',
        changes: []
      },
      {
        id: 'AUD-INV-006',
        action: 'disputed',
        description: 'Invoice disputed due to quantity discrepancy',
        userId: 'USR-003',
        user: mockUsers[0],
        timestamp: '2024-02-20T15:00:00Z',
        changes: [
          {
            field: 'status',
            oldValue: 'pending_approval',
            newValue: 'disputed'
          }
        ]
      }
    ],
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-02-20T15:00:00Z',
    processedAt: '2024-02-18T11:30:00Z',
    version: 2,
    isRecurring: false
  }
];

export const useEnterpriseInvoices = () => {
  const [invoices, setInvoices] = useLocalStorage('enterpriseInvoices', initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start?: string, end?: string}>({});

  // Filter invoices based on current filters
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesSearch = searchTerm === '' || 
        inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.supplierInvoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
      const matchesSupplier = supplierFilter === 'all' || inv.supplier.name === supplierFilter;
      const matchesPaymentStatus = paymentStatusFilter === 'all' || inv.paymentStatus === paymentStatusFilter;

      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const invDate = new Date(inv.invoiceDate);
        if (dateRange.start) {
          matchesDate = matchesDate && invDate >= new Date(dateRange.start);
        }
        if (dateRange.end) {
          matchesDate = matchesDate && invDate <= new Date(dateRange.end);
        }
      }

      return matchesSearch && matchesStatus && matchesSupplier && matchesPaymentStatus && matchesDate;
    });
  }, [invoices, searchTerm, statusFilter, supplierFilter, paymentStatusFilter, dateRange]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = invoices.length;
    const received = invoices.filter(inv => inv.status === 'received').length;
    const pendingApproval = invoices.filter(inv => inv.status === 'pending_approval').length;
    const approved = invoices.filter(inv => inv.status === 'approved').length;
    const paid = invoices.filter(inv => inv.status === 'paid').length;
    const disputed = invoices.filter(inv => inv.status === 'disputed').length;
    const overdue = invoices.filter(inv => inv.status !== 'paid' && new Date(inv.dueDate) < new Date()).length;
    
    const totalValue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const paidValue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
    const pendingValue = invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
    const disputedValue = invoices.filter(inv => inv.status === 'disputed').reduce((sum, inv) => sum + inv.disputedAmount, 0);

    return {
      total,
      received,
      pendingApproval,
      approved,
      paid,
      disputed,
      overdue,
      totalValue,
      paidValue,
      pendingValue,
      disputedValue
    };
  }, [invoices]);

  // CRUD operations
  const addInvoice = (invoice: Omit<EnterpriseInvoice, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'version' | 'auditTrail'>) => {
    const newInvoice: EnterpriseInvoice = {
      ...invoice,
      id: `INV-24-${String(invoices.length + 1).padStart(3, '0')}`,
      number: `INV-2024-${String(invoices.length + 1).padStart(6, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      auditTrail: [
        {
          id: `AUD-${Date.now()}`,
          action: 'received',
          description: 'Invoice received from supplier',
          userId: 'SYS-001',
          user: mockUsers[0],
          timestamp: new Date().toISOString(),
          changes: []
        }
      ]
    };

    setInvoices(prev => [...prev, newInvoice]);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: Partial<EnterpriseInvoice>) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        const updatedInv = {
          ...inv,
          ...updates,
          updatedAt: new Date().toISOString(),
          version: inv.version + 1
        };

        // Add audit trail entry
        const auditEntry: AuditEntry = {
          id: `AUD-${Date.now()}`,
          action: 'updated',
          description: 'Invoice updated',
          userId: 'USR-001', // Current user
          user: mockUsers[0],
          timestamp: new Date().toISOString(),
          changes: Object.keys(updates).map(key => ({
            field: key,
            oldValue: (inv as any)[key],
            newValue: (updates as any)[key]
          }))
        };

        updatedInv.auditTrail = [...inv.auditTrail, auditEntry];
        return updatedInv;
      }
      return inv;
    }));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const approveInvoice = (id: string, approverId: string, comments?: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return;

    const currentStep = invoice.approvalPath[invoice.currentApprovalStep || 0];
    if (currentStep) {
      const updatedApprovalPath = [...invoice.approvalPath];
      updatedApprovalPath[invoice.currentApprovalStep || 0] = {
        ...currentStep,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        comments
      };

      const isLastStep = (invoice.currentApprovalStep || 0) >= invoice.approvalPath.length - 1;
      const newStatus: InvoiceStatus = isLastStep ? 'approved' : 'pending_approval';
      const newCurrentStep = isLastStep ? undefined : (invoice.currentApprovalStep || 0) + 1;

      updateInvoice(id, {
        status: newStatus,
        approvalPath: updatedApprovalPath,
        currentApprovalStep: newCurrentStep,
        ...(isLastStep && { 
          approvedDate: new Date().toISOString(),
          paymentStatus: 'pending'
        })
      });
    }
  };

  const rejectInvoice = (id: string, approverId: string, reason: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return;

    const currentStep = invoice.approvalPath[invoice.currentApprovalStep || 0];
    if (currentStep) {
      const updatedApprovalPath = [...invoice.approvalPath];
      updatedApprovalPath[invoice.currentApprovalStep || 0] = {
        ...currentStep,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        comments: reason
      };

      updateInvoice(id, {
        status: 'rejected',
        approvalPath: updatedApprovalPath,
        paymentStatus: 'cancelled'
      });
    }
  };

  const payInvoice = (id: string, paymentMethod: string, amount?: number) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return;

    const paymentAmount = amount || invoice.amountDue;
    const isFullyPaid = paymentAmount >= invoice.amountDue;

    const payment: Payment = {
      id: `PAY-${Date.now()}`,
      paymentNumber: `PAY-2024-${String(Date.now()).slice(-6)}`,
      method: paymentMethod as any,
      amount: paymentAmount,
      currency: invoice.currency,
      scheduledDate: new Date().toISOString(),
      processedDate: new Date().toISOString(),
      status: 'paid',
      remittanceInfo: {
        invoiceNumbers: [invoice.number],
        discountsTaken: 0,
        adjustments: 0,
        netAmount: paymentAmount
      }
    };

    updateInvoice(id, {
      status: isFullyPaid ? 'paid' : 'partially_paid',
      paymentStatus: isFullyPaid ? 'paid' : 'processing',
      paidAmount: invoice.paidAmount + paymentAmount,
      amountDue: invoice.amountDue - paymentAmount,
      payments: [...invoice.payments, payment],
      paymentDate: isFullyPaid ? new Date().toISOString() : invoice.paymentDate
    });
  };

  const disputeInvoice = (id: string, disputeData: Omit<Dispute, 'id' | 'createdDate'>) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return;

    const dispute: Dispute = {
      ...disputeData,
      id: `DISP-${Date.now()}`,
      createdDate: new Date().toISOString()
    };

    updateInvoice(id, {
      status: 'disputed',
      paymentStatus: 'on_hold',
      disputedAmount: invoice.disputedAmount + disputeData.amount,
      disputes: [...invoice.disputes, dispute]
    });
  };

  const resolveDispute = (invoiceId: string, disputeId: string, resolution: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const updatedDisputes = invoice.disputes.map(dispute => {
      if (dispute.id === disputeId) {
        return {
          ...dispute,
          status: 'resolved' as const,
          resolvedDate: new Date().toISOString(),
          resolution
        };
      }
      return dispute;
    });

    const allDisputesResolved = updatedDisputes.every(d => d.status === 'resolved');

    updateInvoice(invoiceId, {
      disputes: updatedDisputes,
      status: allDisputesResolved ? 'approved' : 'disputed',
      paymentStatus: allDisputesResolved ? 'pending' : 'on_hold'
    });
  };

  const addMatchingException = (invoiceId: string, exception: MatchingException) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    updateInvoice(invoiceId, {
      matchingStatus: 'exception',
      matchingExceptions: [...invoice.matchingExceptions, exception]
    });
  };

  const resolveMatchingException = (invoiceId: string, exceptionIndex: number, resolution: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const updatedExceptions = [...invoice.matchingExceptions];
    updatedExceptions[exceptionIndex] = {
      ...updatedExceptions[exceptionIndex],
      resolution
    };

    const hasUnresolvedExceptions = updatedExceptions.some(ex => !ex.resolution);

    updateInvoice(invoiceId, {
      matchingExceptions: updatedExceptions,
      matchingStatus: hasUnresolvedExceptions ? 'exception' : 'matched'
    });
  };

  const addComment = (invoiceId: string, text: string, authorId: string, isInternal: boolean = true) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const newComment = {
      id: `COM-${Date.now()}`,
      text,
      authorId,
      author: mockUsers[0], // In real app, fetch current user
      createdAt: new Date().toISOString(),
      isInternal,
      attachments: []
    };

    updateInvoice(invoiceId, {
      comments: [...invoice.comments, newComment]
    });
  };

  const duplicateInvoice = (id: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return null;

    const duplicated = addInvoice({
      ...invoice,
      supplierInvoiceNumber: `${invoice.supplierInvoiceNumber}-COPY`,
      status: 'received',
      paymentStatus: 'pending',
      currentApprovalStep: 0,
      approvalPath: invoice.approvalPath.map(step => ({
        ...step,
        status: 'pending',
        approvedAt: undefined,
        rejectedAt: undefined,
        comments: undefined
      })),
      payments: [],
      disputes: [],
      paidAmount: 0,
      disputedAmount: 0,
      amountDue: invoice.totalAmount,
      comments: [],
      attachments: []
    });

    return duplicated;
  };

  return {
    invoices: filteredInvoices,
    allInvoices: invoices,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    supplierFilter,
    setSupplierFilter,
    paymentStatusFilter,
    setPaymentStatusFilter,
    dateRange,
    setDateRange,
    metrics,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    approveInvoice,
    rejectInvoice,
    payInvoice,
    disputeInvoice,
    resolveDispute,
    addMatchingException,
    resolveMatchingException,
    addComment,
    duplicateInvoice,
    getInvoice: (id: string) => invoices.find(inv => inv.id === id)
  };
};