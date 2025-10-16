import { useState, useMemo } from 'react';

// Mock data structure for enterprise invoices
const initialInvoices = [
  {
    id: 'INV-24-001',
    invoiceNumber: 'INV-2024-000001',
    supplierInvoiceNumber: 'DELL-INV-2024-001234',
    status: 'pending',
    vendorName: 'Dell Technologies Inc.',
    supplierId: 'SUP-001',
    currency: 'USD',
    subtotalAmount: 19800.00,
    taxAmount: 1584.00,
    totalAmount: 20334.00,
    invoiceDate: '2024-03-10',
    dueDate: '2024-04-09',
    receivedDate: '2024-03-12',
    priority: 'high',
    department: 'IT',
    requestor: 'John Smith',
    approver: 'Jane Doe',
    paymentMethod: 'ACH',
    paymentReference: 'PAY-001',
    disputeReason: '',
    processingStage: 'validation',
    assignedTo: 'AP Team'
  },
  {
    id: 'INV-24-002',
    invoiceNumber: 'INV-2024-000002',
    supplierInvoiceNumber: 'OD-2024-5678',
    status: 'approved',
    vendorName: 'Office Depot Business Solutions',
    supplierId: 'SUP-003',
    currency: 'USD',
    subtotalAmount: 4750.00,
    taxAmount: 380.00,
    totalAmount: 5080.00,
    invoiceDate: '2024-01-30',
    dueDate: '2024-02-14',
    receivedDate: '2024-02-01',
    approvedDate: '2024-02-02',
    priority: 'medium',
    department: 'Operations',
    requestor: 'Sarah Wilson',
    approver: 'Mike Johnson',
    paymentMethod: 'ACH',
    paymentReference: 'PAY-002',
    disputeReason: '',
    processingStage: 'completed',
    assignedTo: 'Finance Team'
  },
  {
    id: 'INV-24-003',
    invoiceNumber: 'INV-2024-000003',
    supplierInvoiceNumber: 'SERV-2024-9999',
    status: 'disputed',
    vendorName: 'TechServices Corp',
    supplierId: 'SUP-004',
    currency: 'USD',
    subtotalAmount: 12500.00,
    taxAmount: 1000.00,
    totalAmount: 13500.00,
    invoiceDate: '2024-02-15',
    dueDate: '2024-03-17',
    receivedDate: '2024-02-18',
    priority: 'urgent',
    department: 'IT',
    requestor: 'Tom Brown',
    approver: 'Lisa Garcia',
    paymentMethod: '',
    paymentReference: '',
    disputeReason: 'Amount discrepancy',
    disputeDate: '2024-02-20',
    processingStage: 'dispute_resolution',
    assignedTo: 'Dispute Team'
  },
  {
    id: 'INV-24-004',
    invoiceNumber: 'INV-2024-000004',
    supplierInvoiceNumber: 'MSFT-2024-555',
    status: 'processing',
    vendorName: 'Microsoft Corporation',
    supplierId: 'SUP-005',
    currency: 'USD',
    subtotalAmount: 8900.00,
    taxAmount: 712.00,
    totalAmount: 9612.00,
    invoiceDate: '2024-03-01',
    dueDate: '2024-03-31',
    receivedDate: '2024-03-03',
    priority: 'medium',
    department: 'IT',
    requestor: 'Alex Chen',
    approver: 'David Kim',
    paymentMethod: '',
    paymentReference: '',
    disputeReason: '',
    processingStage: 'coding',
    assignedTo: 'AP Clerk'
  },
  {
    id: 'INV-24-005',
    invoiceNumber: 'INV-2024-000005',
    supplierInvoiceNumber: 'AMZ-2024-777',
    status: 'paid',
    vendorName: 'Amazon Web Services',
    supplierId: 'SUP-006',
    currency: 'USD',
    subtotalAmount: 3200.00,
    taxAmount: 256.00,
    totalAmount: 3456.00,
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-14',
    receivedDate: '2024-01-17',
    approvedDate: '2024-01-20',
    paidDate: '2024-02-10',
    priority: 'low',
    department: 'IT',
    requestor: 'Emma White',
    approver: 'Robert Lee',
    paymentMethod: 'Credit Card',
    paymentReference: 'PAY-005',
    disputeReason: '',
    processingStage: 'completed',
    assignedTo: 'Finance Team'
  }
];

export const useEnterpriseInvoices = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');

  // Filter invoices based on search and filters
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = searchTerm === '' || 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.supplierInvoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      const matchesSupplier = supplierFilter === 'all' || invoice.supplierId === supplierFilter;
      
      return matchesSearch && matchesStatus && matchesSupplier;
    });
  }, [invoices, searchTerm, statusFilter, supplierFilter]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = invoices.length;
    const pending = invoices.filter(inv => inv.status === 'pending').length;
    const approved = invoices.filter(inv => inv.status === 'approved').length;
    const paid = invoices.filter(inv => inv.status === 'paid').length;
    const disputed = invoices.filter(inv => inv.status === 'disputed').length;
    const processing = invoices.filter(inv => inv.status === 'processing').length;
    const overdue = invoices.filter(inv => 
      inv.status !== 'paid' && new Date(inv.dueDate) < new Date()
    ).length;
    const totalValue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

    return {
      total,
      pending,
      approved,
      paid,
      disputed,
      processing,
      overdue,
      totalValue
    };
  }, [invoices]);

  // CRUD Operations
  const addInvoice = (invoiceData: any) => {
    const newInvoice = {
      id: `INV-24-${String(invoices.length + 1).padStart(3, '0')}`,
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(6, '0')}`,
      ...invoiceData,
      receivedDate: new Date().toISOString().split('T')[0]
    };
    setInvoices([...invoices, newInvoice]);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: any) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id ? { ...invoice, ...updates } : invoice
    ));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  // Business Logic Operations
  const approveInvoice = (id: string, approver?: string) => {
    updateInvoice(id, {
      status: 'approved',
      approvedDate: new Date().toISOString().split('T')[0],
      approver: approver || 'Current User'
    });
  };

  const rejectInvoice = (id: string, reason?: string) => {
    updateInvoice(id, {
      status: 'rejected',
      rejectedDate: new Date().toISOString().split('T')[0],
      rejectionReason: reason || 'Rejected by approver'
    });
  };

  const payInvoice = (id: string, paymentData?: any) => {
    updateInvoice(id, {
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0],
      paymentMethod: paymentData?.method || 'ACH',
      paymentReference: paymentData?.reference || `PAY-${Date.now()}`
    });
  };

  const disputeInvoice = (id: string, reason: string) => {
    updateInvoice(id, {
      status: 'disputed',
      disputeReason: reason,
      disputeDate: new Date().toISOString().split('T')[0]
    });
  };

  const resolveDispute = (id: string, resolution?: string) => {
    updateInvoice(id, {
      status: 'approved',
      disputeResolution: resolution || 'Dispute resolved',
      disputeResolvedDate: new Date().toISOString().split('T')[0]
    });
  };

  const processInvoice = (id: string, stage: string) => {
    updateInvoice(id, {
      status: 'processing',
      processingStage: stage
    });
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
    metrics,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    approveInvoice,
    rejectInvoice,
    payInvoice,
    disputeInvoice,
    resolveDispute,
    processInvoice
  };
};