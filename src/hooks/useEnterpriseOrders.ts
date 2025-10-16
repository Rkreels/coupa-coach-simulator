import { useState, useMemo } from 'react';
import { EnterprisePurchaseOrder, PurchaseOrderStatus, User, Supplier, AuditEntry } from '../types/coupa-entities';

export interface EnterpriseOrder extends EnterprisePurchaseOrder {}

// Mock data for comprehensive enterprise orders
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

const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    number: 'SUPP-000001',
    name: 'Dell Technologies Inc.',
    displayName: 'Dell Technologies',
    status: 'active',
    type: 'company',
    subsidiaries: [],
    businessType: ['Manufacturer', 'Distributor'],
    industryType: ['Technology', 'Hardware'],
    size: 'enterprise',
    yearEstablished: 1984,
    taxId: '13-2658599',
    dunsNumber: '123456789',
    addresses: [],
    contacts: [],
    bankAccounts: [],
    certifications: [],
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

const initialOrders: EnterpriseOrder[] = [
  {
    id: 'ORD-24-001',
    number: 'ORD-2024-000001',
    title: 'Office Equipment Procurement - Q1 2024',
    description: 'Quarterly procurement of office equipment including computers, printers, and furniture',
    status: 'approved',
    type: 'standard',
    requisitionIds: ['REQ-24-001'],
    requisitions: [],
    supplierId: 'SUP-001',
    supplier: mockSuppliers[0],
    buyerId: 'USR-001',
    buyer: mockUsers[0],
    currency: 'USD',
    subtotalAmount: 25000.00,
    taxAmount: 2000.00,
    shippingAmount: 200.00,
    discountAmount: 500.00,
    totalAmount: 26700.00,
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
      name: 'Main Office - Receiving',
      addressLine1: '123 Corporate Plaza',
      addressLine2: 'Loading Dock A',
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
    orderDate: '2024-01-15T00:00:00Z',
    requestedDeliveryDate: '2024-02-15T00:00:00Z',
    promisedDeliveryDate: '2024-02-12T00:00:00Z',
    expectedDeliveryDate: '2024-02-12T00:00:00Z',
    lineItems: [],
    approvalPath: [],
    attachments: [],
    comments: [],
    changeOrders: [],
    receipts: [],
    invoices: [],
    customFields: [],
    auditTrail: [],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    issuedAt: '2024-01-15T10:00:00Z',
    acknowledgedAt: '2024-01-15T14:30:00Z',
    version: 1,
    revisionNumber: 0,
    isAmendment: false
  },
  {
    id: 'ORD-24-002',
    number: 'ORD-2024-000002',
    title: 'Software Licenses - Annual Renewal',
    description: 'Annual renewal of enterprise software licenses',
    status: 'pending_approval',
    type: 'blanket',
    requisitionIds: ['REQ-24-002'],
    requisitions: [],
    supplierId: 'SUP-002',
    supplier: {
      ...mockSuppliers[0],
      id: 'SUP-002',
      name: 'Microsoft Corporation',
      displayName: 'Microsoft'
    },
    buyerId: 'USR-001',
    buyer: mockUsers[0],
    currency: 'USD',
    subtotalAmount: 150000.00,
    taxAmount: 12000.00,
    shippingAmount: 0.00,
    discountAmount: 7500.00,
    totalAmount: 154500.00,
    paymentTerms: {
      id: 'PT-002',
      name: 'Net 60',
      description: 'Payment due 60 days from invoice date',
      daysNet: 60,
      isEarlyPaymentDiscount: false
    },
    deliveryTerms: {
      id: 'DT-002',
      code: 'EXW',
      description: 'Ex Works',
      incoterm: 'EXW'
    },
    shippingMethod: 'Digital Delivery',
    freightTerms: 'N/A',
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
      name: 'IT Department',
      addressLine1: '123 Corporate Plaza',
      addressLine2: 'Floor 5',
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
      name: 'Microsoft Corporation',
      addressLine1: 'One Microsoft Way',
      city: 'Redmond',
      state: 'WA',
      postalCode: '98052',
      country: 'US',
      isDefault: true,
      isActive: true
    },
    orderDate: '2024-01-18T00:00:00Z',
    requestedDeliveryDate: '2024-03-01T00:00:00Z',
    promisedDeliveryDate: '2024-02-28T00:00:00Z',
    expectedDeliveryDate: '2024-02-28T00:00:00Z',
    lineItems: [],
    approvalPath: [],
    attachments: [],
    comments: [],
    changeOrders: [],
    receipts: [],
    invoices: [],
    customFields: [],
    auditTrail: [],
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
    version: 1,
    revisionNumber: 0,
    isAmendment: false
  }
];

export const useEnterpriseOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  // Filtered orders based on current filters
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = !searchTerm || 
        order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.displayName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesSupplier = supplierFilter === 'all' || order.supplier.displayName === supplierFilter;
      const matchesType = typeFilter === 'all' || order.type === typeFilter;

      let matchesDate = true;
      if (dateRange !== 'all') {
        const orderDate = new Date(order.orderDate);
        const today = new Date();
        const days = parseInt(dateRange);
        const cutoffDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
        matchesDate = orderDate >= cutoffDate;
      }

      return matchesSearch && matchesStatus && matchesSupplier && matchesType && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, supplierFilter, typeFilter, dateRange]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending_approval').length;
    const approved = orders.filter(o => o.status === 'approved').length;
    const issued = orders.filter(o => o.status === 'issued').length;
    const received = orders.filter(o => o.status === 'received').length;
    const cancelled = orders.filter(o => o.status === 'cancelled').length;
    const totalValue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const avgOrderValue = total > 0 ? totalValue / total : 0;

    return {
      total,
      pending,
      approved,
      issued,
      received,
      cancelled,
      totalValue,
      avgOrderValue
    };
  }, [orders]);

  // CRUD Operations
  const addOrder = (orderData: Omit<EnterpriseOrder, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'version' | 'auditTrail'>) => {
    const newOrder: EnterpriseOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      number: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(6, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      auditTrail: [{
        id: `AUD-${Date.now()}`,
        action: 'created',
        description: 'Order created',
        userId: 'USR-001',
        user: mockUsers[0],
        timestamp: new Date().toISOString(),
        changes: []
      }]
    };

    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const updateOrder = (orderId: string, updates: Partial<EnterpriseOrder>) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? {
            ...order,
            ...updates,
            updatedAt: new Date().toISOString(),
            version: order.version + 1,
            auditTrail: [
              ...order.auditTrail,
              {
                id: `AUD-${Date.now()}`,
                action: 'updated',
                description: 'Order updated',
                userId: 'USR-001',
                user: mockUsers[0],
                timestamp: new Date().toISOString(),
                changes: []
              }
            ]
          }
        : order
    ));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  // Workflow Actions
  const approveOrder = (orderId: string, approverId: string, comments?: string) => {
    updateOrder(orderId, {
      status: 'approved',
      approvalPath: [
        {
          id: `STEP-${Date.now()}`,
          stepNumber: 1,
          name: 'Order Approval',
          approverId,
          approverType: 'user',
          status: 'approved',
          approvedAt: new Date().toISOString(),
          comments,
          isParallel: false,
          escalationPath: []
        }
      ]
    });
  };

  const rejectOrder = (orderId: string, rejectorId: string, reason: string) => {
    updateOrder(orderId, {
      status: 'cancelled',
      comments: [
        {
          id: `COM-${Date.now()}`,
          text: `Order rejected: ${reason}`,
          authorId: rejectorId,
          author: mockUsers[0],
          createdAt: new Date().toISOString(),
          isInternal: true,
          attachments: []
        }
      ]
    });
  };

  const issueOrder = (orderId: string) => {
    updateOrder(orderId, {
      status: 'issued',
      issuedAt: new Date().toISOString()
    });
  };

  const acknowledgeOrder = (orderId: string) => {
    updateOrder(orderId, {
      status: 'acknowledged',
      acknowledgedAt: new Date().toISOString()
    });
  };

  const submitOrder = (orderId: string) => {
    updateOrder(orderId, {
      status: 'pending_approval'
    });
  };

  const receiveOrder = (orderId: string, receiptData: any) => {
    updateOrder(orderId, {
      status: 'received',
      receipts: [...(orders.find(o => o.id === orderId)?.receipts || []), receiptData]
    });
  };

  const cancelOrder = (orderId: string, reason: string) => {
    updateOrder(orderId, {
      status: 'cancelled',
      comments: [
        {
          id: `COM-${Date.now()}`,
          text: `Order cancelled: ${reason}`,
          authorId: 'USR-001',
          author: mockUsers[0],
          createdAt: new Date().toISOString(),
          isInternal: true,
          attachments: []
        }
      ]
    });
  };

  const duplicateOrder = (orderId: string) => {
    const originalOrder = orders.find(o => o.id === orderId);
    if (!originalOrder) return null;

    const duplicatedOrder = {
      ...originalOrder,
      title: `${originalOrder.title} (Copy)`,
      status: 'draft' as PurchaseOrderStatus,
      issuedAt: undefined,
      acknowledgedAt: undefined
    };

    // Remove order-specific fields
    delete (duplicatedOrder as any).id;
    delete (duplicatedOrder as any).number;
    delete (duplicatedOrder as any).createdAt;
    delete (duplicatedOrder as any).updatedAt;
    delete (duplicatedOrder as any).version;
    delete (duplicatedOrder as any).auditTrail;

    return addOrder(duplicatedOrder);
  };

  return {
    // Data
    orders: filteredOrders,
    allOrders: orders,
    
    // Filters
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
    
    // Metrics
    metrics,
    
    // CRUD Operations
    addOrder,
    updateOrder, 
    deleteOrder,
    
    // Workflow Actions
    approveOrder,
    rejectOrder,
    issueOrder,
    acknowledgeOrder,
    submitOrder,
    receiveOrder,
    cancelOrder,
    duplicateOrder
  };
};