
import { useState } from 'react';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  vendorId: string;
  department: string;
  status: 'pending' | 'processing' | 'approved' | 'paid' | 'disputed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  currency: string;
  taxAmount: number;
  netAmount: number;
  purchaseOrderId?: string;
  description: string;
  lineItems: InvoiceLineItem[];
  approver?: string;
  approvedDate?: string;
  paidDate?: string;
  paymentMethod?: string;
  attachments: string[];
  submittedDate: string;
  lastModified: string;
  notes?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  accountCode?: string;
  taxRate: number;
}

const initialInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    invoiceNumber: 'VEN-001-2024',
    vendorName: 'Office Supplies Co.',
    vendorId: 'VEN-001',
    department: 'Marketing',
    status: 'pending',
    priority: 'medium',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-15',
    totalAmount: 2750.00,
    currency: 'USD',
    taxAmount: 250.00,
    netAmount: 2500.00,
    purchaseOrderId: 'PO-2024-001',
    description: 'Office supplies for Q1 2024',
    lineItems: [
      {
        id: 'LI-001',
        description: 'Printer Paper (A4)',
        quantity: 20,
        unitPrice: 12.50,
        totalPrice: 250.00,
        category: 'Office Supplies',
        accountCode: '6001',
        taxRate: 0.1
      }
    ],
    attachments: [],
    submittedDate: '2024-01-15',
    lastModified: '2024-01-15'
  },
  {
    id: 'INV-2024-002',
    invoiceNumber: 'VEN-002-2024',
    vendorName: 'Dell Technologies',
    vendorId: 'VEN-002',
    department: 'IT',
    status: 'approved',
    priority: 'high',
    invoiceDate: '2024-01-10',
    dueDate: '2024-02-10',
    totalAmount: 16500.00,
    currency: 'USD',
    taxAmount: 1500.00,
    netAmount: 15000.00,
    purchaseOrderId: 'PO-2024-002',
    description: 'IT equipment purchase',
    approver: 'John Smith',
    approvedDate: '2024-01-12',
    lineItems: [
      {
        id: 'LI-002',
        description: 'Dell XPS 15 Laptop',
        quantity: 5,
        unitPrice: 2500.00,
        totalPrice: 12500.00,
        category: 'IT Equipment',
        accountCode: '6002',
        taxRate: 0.1
      }
    ],
    attachments: [],
    submittedDate: '2024-01-10',
    lastModified: '2024-01-12'
  },
  {
    id: 'INV-2024-003',
    invoiceNumber: 'VEN-003-2024',
    vendorName: 'CleanCorp',
    vendorId: 'VEN-003',
    department: 'Facilities',
    status: 'paid',
    priority: 'low',
    invoiceDate: '2024-01-05',
    dueDate: '2024-02-05',
    totalAmount: 352.00,
    currency: 'USD',
    taxAmount: 32.00,
    netAmount: 320.00,
    purchaseOrderId: 'PO-2024-004',
    description: 'Monthly cleaning services',
    approver: 'Jane Wilson',
    approvedDate: '2024-01-08',
    paidDate: '2024-01-30',
    paymentMethod: 'Bank Transfer',
    lineItems: [
      {
        id: 'LI-003',
        description: 'Cleaning Services',
        quantity: 1,
        unitPrice: 320.00,
        totalPrice: 320.00,
        category: 'Services',
        accountCode: '6003',
        taxRate: 0.1
      }
    ],
    attachments: [],
    submittedDate: '2024-01-05',
    lastModified: '2024-01-30'
  },
  {
    id: 'INV-2024-004',
    invoiceNumber: 'VEN-004-2024',
    vendorName: 'Print Solutions Inc',
    vendorId: 'VEN-004',
    department: 'Marketing',
    status: 'processing',
    priority: 'medium',
    invoiceDate: '2024-01-20',
    dueDate: '2024-02-20',
    totalAmount: 935.00,
    currency: 'USD',
    taxAmount: 85.00,
    netAmount: 850.00,
    purchaseOrderId: 'PO-2024-003',
    description: 'Marketing brochures and materials',
    lineItems: [
      {
        id: 'LI-004',
        description: 'Marketing Brochures',
        quantity: 1000,
        unitPrice: 0.85,
        totalPrice: 850.00,
        category: 'Marketing',
        accountCode: '6004',
        taxRate: 0.1
      }
    ],
    attachments: [],
    submittedDate: '2024-01-20',
    lastModified: '2024-01-20'
  },
  {
    id: 'INV-2024-005',
    invoiceNumber: 'VEN-005-2024',
    vendorName: 'TechSupport Pro',
    vendorId: 'VEN-005',
    department: 'IT',
    status: 'disputed',
    priority: 'high',
    invoiceDate: '2024-01-18',
    dueDate: '2024-02-18',
    totalAmount: 5500.00,
    currency: 'USD',
    taxAmount: 500.00,
    netAmount: 5000.00,
    description: 'Technical support services',
    notes: 'Disputed - service quality issues',
    lineItems: [
      {
        id: 'LI-005',
        description: 'Technical Support',
        quantity: 40,
        unitPrice: 125.00,
        totalPrice: 5000.00,
        category: 'Services',
        accountCode: '6005',
        taxRate: 0.1
      }
    ],
    attachments: [],
    submittedDate: '2024-01-18',
    lastModified: '2024-01-25'
  }
];

export const useInvoices = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || invoice.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'lastModified'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setInvoices([...invoices, newInvoice]);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id 
        ? { ...invoice, ...updates, lastModified: new Date().toISOString().split('T')[0] }
        : invoice
    ));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const getInvoice = (id: string) => {
    return invoices.find(invoice => invoice.id === id);
  };

  const approveInvoice = (id: string, approver: string) => {
    updateInvoice(id, {
      status: 'approved',
      approver,
      approvedDate: new Date().toISOString().split('T')[0]
    });
  };

  const rejectInvoice = (id: string, reason?: string) => {
    updateInvoice(id, {
      status: 'rejected',
      notes: reason || 'Invoice rejected'
    });
  };

  const payInvoice = (id: string, paymentMethod: string) => {
    updateInvoice(id, {
      status: 'paid',
      paymentMethod,
      paidDate: new Date().toISOString().split('T')[0]
    });
  };

  const getMetrics = () => {
    const totalInvoices = invoices.length;
    const pendingApproval = invoices.filter(i => i.status === 'pending').length;
    const processing = invoices.filter(i => i.status === 'processing').length;
    const approved = invoices.filter(i => i.status === 'approved').length;
    const paid = invoices.filter(i => i.status === 'paid').length;
    const disputed = invoices.filter(i => i.status === 'disputed').length;
    const totalValue = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    const avgProcessingTime = '2.5 days';

    return {
      totalInvoices,
      pendingApproval,
      processing,
      approved,
      paid,
      disputed,
      totalValue,
      avgProcessingTime
    };
  };

  return {
    invoices: filteredInvoices,
    allInvoices: invoices,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    approveInvoice,
    rejectInvoice,
    payInvoice,
    getMetrics
  };
};
