
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
  { id: 'INV-2024-001', invoiceNumber: 'VEN-001-2024', vendorName: 'Office Supplies Co.', vendorId: 'VEN-001', department: 'Marketing', status: 'pending', priority: 'medium', invoiceDate: '2024-01-15', dueDate: '2024-02-15', totalAmount: 2750, currency: 'USD', taxAmount: 250, netAmount: 2500, purchaseOrderId: 'PO-2024-001', description: 'Office supplies for Q1 2024', lineItems: [{ id: 'LI-001', description: 'Printer Paper (A4)', quantity: 20, unitPrice: 12.50, totalPrice: 250, category: 'Office Supplies', accountCode: '6001', taxRate: 0.1 }], attachments: [], submittedDate: '2024-01-15', lastModified: '2024-01-15' },
  { id: 'INV-2024-002', invoiceNumber: 'VEN-002-2024', vendorName: 'Dell Technologies', vendorId: 'VEN-002', department: 'IT', status: 'approved', priority: 'high', invoiceDate: '2024-01-10', dueDate: '2024-02-10', totalAmount: 16500, currency: 'USD', taxAmount: 1500, netAmount: 15000, purchaseOrderId: 'PO-2024-002', description: 'IT equipment purchase', approver: 'John Smith', approvedDate: '2024-01-12', lineItems: [{ id: 'LI-002', description: 'Dell XPS 15 Laptop', quantity: 5, unitPrice: 2500, totalPrice: 12500, category: 'IT Equipment', accountCode: '6002', taxRate: 0.1 }], attachments: [], submittedDate: '2024-01-10', lastModified: '2024-01-12' },
  { id: 'INV-2024-003', invoiceNumber: 'VEN-003-2024', vendorName: 'CleanCorp', vendorId: 'VEN-003', department: 'Facilities', status: 'paid', priority: 'low', invoiceDate: '2024-01-05', dueDate: '2024-02-05', totalAmount: 352, currency: 'USD', taxAmount: 32, netAmount: 320, purchaseOrderId: 'PO-2024-004', description: 'Monthly cleaning services', approver: 'Jane Wilson', approvedDate: '2024-01-08', paidDate: '2024-01-30', paymentMethod: 'Bank Transfer', lineItems: [{ id: 'LI-003', description: 'Cleaning Services', quantity: 1, unitPrice: 320, totalPrice: 320, category: 'Services', accountCode: '6003', taxRate: 0.1 }], attachments: [], submittedDate: '2024-01-05', lastModified: '2024-01-30' },
  { id: 'INV-2024-004', invoiceNumber: 'VEN-004-2024', vendorName: 'Print Solutions Inc', vendorId: 'VEN-004', department: 'Marketing', status: 'processing', priority: 'medium', invoiceDate: '2024-01-20', dueDate: '2024-02-20', totalAmount: 935, currency: 'USD', taxAmount: 85, netAmount: 850, purchaseOrderId: 'PO-2024-003', description: 'Marketing brochures', lineItems: [{ id: 'LI-004', description: 'Brochures', quantity: 1000, unitPrice: 0.85, totalPrice: 850, category: 'Marketing', accountCode: '6004', taxRate: 0.1 }], attachments: [], submittedDate: '2024-01-20', lastModified: '2024-01-20' },
  { id: 'INV-2024-005', invoiceNumber: 'VEN-005-2024', vendorName: 'TechSupport Pro', vendorId: 'VEN-005', department: 'IT', status: 'disputed', priority: 'high', invoiceDate: '2024-01-18', dueDate: '2024-02-18', totalAmount: 5500, currency: 'USD', taxAmount: 500, netAmount: 5000, description: 'Technical support services', notes: 'Disputed - service quality issues', lineItems: [{ id: 'LI-005', description: 'Technical Support', quantity: 40, unitPrice: 125, totalPrice: 5000, category: 'Services', accountCode: '6005', taxRate: 0.1 }], attachments: [], submittedDate: '2024-01-18', lastModified: '2024-01-25' },
  { id: 'INV-2024-006', invoiceNumber: 'VEN-006-2024', vendorName: 'AWS Cloud Services', vendorId: 'VEN-006', department: 'IT', status: 'approved', priority: 'high', invoiceDate: '2024-02-01', dueDate: '2024-03-01', totalAmount: 28500, currency: 'USD', taxAmount: 2590.91, netAmount: 25909.09, description: 'Cloud hosting - January usage', approver: 'David Kim', approvedDate: '2024-02-05', lineItems: [{ id: 'LI-006', description: 'EC2 Compute Hours', quantity: 1, unitPrice: 18000, totalPrice: 18000, category: 'Cloud Services', accountCode: '6010', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-01', lastModified: '2024-02-05' },
  { id: 'INV-2024-007', invoiceNumber: 'VEN-007-2024', vendorName: 'Creative Minds Agency', vendorId: 'VEN-007', department: 'Marketing', status: 'pending', priority: 'medium', invoiceDate: '2024-02-05', dueDate: '2024-03-05', totalAmount: 15000, currency: 'USD', taxAmount: 1363.64, netAmount: 13636.36, description: 'Monthly marketing retainer - February', lineItems: [{ id: 'LI-007', description: 'Marketing Retainer', quantity: 1, unitPrice: 13636.36, totalPrice: 13636.36, category: 'Marketing Services', accountCode: '6020', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-05', lastModified: '2024-02-05' },
  { id: 'INV-2024-008', invoiceNumber: 'VEN-008-2024', vendorName: 'SecureForce Inc.', vendorId: 'VEN-008', department: 'Facilities', status: 'paid', priority: 'medium', invoiceDate: '2024-01-31', dueDate: '2024-02-28', totalAmount: 8000, currency: 'USD', taxAmount: 727.27, netAmount: 7272.73, description: 'Security guard services - January', approver: 'Lisa Johnson', approvedDate: '2024-02-03', paidDate: '2024-02-15', paymentMethod: 'ACH', lineItems: [{ id: 'LI-008', description: 'Security Services', quantity: 1, unitPrice: 7272.73, totalPrice: 7272.73, category: 'Security', accountCode: '6030', taxRate: 0.1 }], attachments: [], submittedDate: '2024-01-31', lastModified: '2024-02-15' },
  { id: 'INV-2024-009', invoiceNumber: 'VEN-009-2024', vendorName: 'Verizon Business', vendorId: 'VEN-009', department: 'IT', status: 'paid', priority: 'low', invoiceDate: '2024-02-01', dueDate: '2024-02-28', totalAmount: 13000, currency: 'USD', taxAmount: 1181.82, netAmount: 11818.18, description: 'Telecom services - January', approver: 'Mike Rodriguez', approvedDate: '2024-02-04', paidDate: '2024-02-20', paymentMethod: 'Bank Transfer', lineItems: [{ id: 'LI-009', description: 'Telecom Services', quantity: 1, unitPrice: 11818.18, totalPrice: 11818.18, category: 'Telecom', accountCode: '6040', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-01', lastModified: '2024-02-20' },
  { id: 'INV-2024-010', invoiceNumber: 'VEN-010-2024', vendorName: 'Gourmet Corporate Catering', vendorId: 'VEN-010', department: 'HR', status: 'processing', priority: 'low', invoiceDate: '2024-02-08', dueDate: '2024-03-08', totalAmount: 4200, currency: 'USD', taxAmount: 381.82, netAmount: 3818.18, description: 'Corporate event catering - Annual meeting', lineItems: [{ id: 'LI-010', description: 'Catering Package', quantity: 150, unitPrice: 25.45, totalPrice: 3818.18, category: 'Catering', accountCode: '6050', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-08', lastModified: '2024-02-08' },
  { id: 'INV-2024-011', invoiceNumber: 'VEN-011-2024', vendorName: 'Enterprise Fleet Management', vendorId: 'VEN-011', department: 'Operations', status: 'approved', priority: 'medium', invoiceDate: '2024-02-01', dueDate: '2024-03-01', totalAmount: 35000, currency: 'USD', taxAmount: 3181.82, netAmount: 31818.18, description: 'Fleet lease payment - February', approver: 'James Wilson', approvedDate: '2024-02-06', lineItems: [{ id: 'LI-011', description: 'Vehicle Lease', quantity: 10, unitPrice: 3181.82, totalPrice: 31818.18, category: 'Fleet', accountCode: '6060', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-01', lastModified: '2024-02-06' },
  { id: 'INV-2024-012', invoiceNumber: 'VEN-012-2024', vendorName: 'SAP Licensing Corp', vendorId: 'VEN-012', department: 'IT', status: 'pending', priority: 'urgent', invoiceDate: '2024-01-01', dueDate: '2024-01-31', totalAmount: 100000, currency: 'USD', taxAmount: 9090.91, netAmount: 90909.09, description: 'Annual ERP license renewal', lineItems: [{ id: 'LI-012', description: 'ERP License', quantity: 200, unitPrice: 454.55, totalPrice: 90909.09, category: 'Software', accountCode: '6070', taxRate: 0.1 }], attachments: [], submittedDate: '2024-01-01', lastModified: '2024-01-01' },
  { id: 'INV-2024-013', invoiceNumber: 'VEN-013-2024', vendorName: 'CyberShield Consulting', vendorId: 'VEN-013', department: 'IT', status: 'approved', priority: 'high', invoiceDate: '2024-02-10', dueDate: '2024-03-10', totalAmount: 35000, currency: 'USD', taxAmount: 3181.82, netAmount: 31818.18, description: 'Security audit - Phase 1', approver: 'David Kim', approvedDate: '2024-02-12', lineItems: [{ id: 'LI-013', description: 'Penetration Testing', quantity: 1, unitPrice: 31818.18, totalPrice: 31818.18, category: 'Security', accountCode: '6080', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-10', lastModified: '2024-02-12' },
  { id: 'INV-2024-014', invoiceNumber: 'VEN-014-2024', vendorName: 'ProLogis Real Estate', vendorId: 'VEN-014', department: 'Operations', status: 'paid', priority: 'high', invoiceDate: '2024-02-01', dueDate: '2024-02-15', totalAmount: 30000, currency: 'USD', taxAmount: 2727.27, netAmount: 27272.73, description: 'Warehouse rent - February', approver: 'James Wilson', approvedDate: '2024-02-03', paidDate: '2024-02-10', paymentMethod: 'Wire Transfer', lineItems: [{ id: 'LI-014', description: 'Warehouse Lease', quantity: 1, unitPrice: 27272.73, totalPrice: 27272.73, category: 'Real Estate', accountCode: '6090', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-01', lastModified: '2024-02-10' },
  { id: 'INV-2024-015', invoiceNumber: 'VEN-015-2024', vendorName: 'Liberty Mutual Insurance', vendorId: 'VEN-015', department: 'Finance', status: 'paid', priority: 'medium', invoiceDate: '2024-01-01', dueDate: '2024-01-15', totalAmount: 85000, currency: 'USD', taxAmount: 0, netAmount: 85000, description: 'Annual insurance premium', approver: 'Patricia Adams', approvedDate: '2024-01-03', paidDate: '2024-01-10', paymentMethod: 'Check', lineItems: [{ id: 'LI-015', description: 'Business Insurance', quantity: 1, unitPrice: 85000, totalPrice: 85000, category: 'Insurance', accountCode: '6100', taxRate: 0 }], attachments: [], submittedDate: '2024-01-01', lastModified: '2024-01-10' },
  { id: 'INV-2024-016', invoiceNumber: 'VEN-016-2024', vendorName: 'EcoWaste Solutions', vendorId: 'VEN-016', department: 'Facilities', status: 'processing', priority: 'low', invoiceDate: '2024-02-01', dueDate: '2024-03-01', totalAmount: 3000, currency: 'USD', taxAmount: 272.73, netAmount: 2727.27, description: 'Waste management - January', lineItems: [{ id: 'LI-016', description: 'Waste Collection', quantity: 4, unitPrice: 681.82, totalPrice: 2727.27, category: 'Waste Management', accountCode: '6110', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-01', lastModified: '2024-02-01' },
  { id: 'INV-2024-017', invoiceNumber: 'VEN-017-2024', vendorName: 'Baker & Associates LLP', vendorId: 'VEN-017', department: 'Legal', status: 'pending', priority: 'high', invoiceDate: '2024-02-15', dueDate: '2024-03-15', totalAmount: 18500, currency: 'USD', taxAmount: 0, netAmount: 18500, description: 'Legal advisory services - January', lineItems: [{ id: 'LI-017', description: 'Legal Consultation', quantity: 74, unitPrice: 250, totalPrice: 18500, category: 'Legal', accountCode: '6120', taxRate: 0 }], attachments: [], submittedDate: '2024-02-15', lastModified: '2024-02-15' },
  { id: 'INV-2024-018', invoiceNumber: 'VEN-018-2024', vendorName: 'ErgoTech Solutions', vendorId: 'VEN-018', department: 'HR', status: 'approved', priority: 'low', invoiceDate: '2024-02-12', dueDate: '2024-03-12', totalAmount: 4800, currency: 'USD', taxAmount: 436.36, netAmount: 4363.64, description: 'Ergonomic desk accessories', approver: 'Amanda White', approvedDate: '2024-02-14', lineItems: [{ id: 'LI-018', description: 'Standing Desk Converters', quantity: 12, unitPrice: 363.64, totalPrice: 4363.64, category: 'Ergonomics', accountCode: '6130', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-12', lastModified: '2024-02-14' },
  { id: 'INV-2024-019', invoiceNumber: 'VEN-019-2024', vendorName: 'PowerGen Parts Inc', vendorId: 'VEN-019', department: 'Facilities', status: 'disputed', priority: 'urgent', invoiceDate: '2024-02-14', dueDate: '2024-03-14', totalAmount: 9800, currency: 'USD', taxAmount: 890.91, netAmount: 8909.09, description: 'Generator parts - pricing discrepancy', notes: 'Amount exceeds PO by $900 - under review', lineItems: [{ id: 'LI-019', description: 'Generator Parts', quantity: 1, unitPrice: 8909.09, totalPrice: 8909.09, category: 'Electrical', accountCode: '6140', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-14', lastModified: '2024-02-18' },
  { id: 'INV-2024-020', invoiceNumber: 'VEN-020-2024', vendorName: 'PackagePro Supplies', vendorId: 'VEN-020', department: 'Operations', status: 'pending', priority: 'low', invoiceDate: '2024-02-18', dueDate: '2024-03-18', totalAmount: 1980, currency: 'USD', taxAmount: 180, netAmount: 1800, description: 'Shipping supplies restock', purchaseOrderId: 'PO-2024-020', lineItems: [{ id: 'LI-020', description: 'Shipping Boxes Assorted', quantity: 200, unitPrice: 9, totalPrice: 1800, category: 'Packaging', accountCode: '6150', taxRate: 0.1 }], attachments: [], submittedDate: '2024-02-18', lastModified: '2024-02-18' }
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
