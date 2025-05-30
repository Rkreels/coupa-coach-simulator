
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  vendorId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'processing' | 'paid' | 'dispute' | 'rejected';
  invoiceDate: string;
  dueDate: string;
  description: string;
  poNumber?: string;
  department: string;
  approver?: string;
  approvedDate?: string;
  paidDate?: string;
  disputeReason?: string;
  lineItems: InvoiceLineItem[];
  attachments: string[];
  dateCreated: string;
  dateModified: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  poLineId?: string;
}

const initialInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    invoiceNumber: 'VND-001-2024',
    vendor: 'Office Depot',
    vendorId: 'VND-001',
    amount: 2500,
    currency: 'USD',
    status: 'pending',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-14',
    description: 'Office supplies Q1',
    poNumber: 'PO-2024-001',
    department: 'Marketing',
    lineItems: [
      {
        id: 'IL-001',
        description: 'Printer Paper',
        quantity: 20,
        unitPrice: 12.50,
        totalPrice: 250
      }
    ],
    attachments: [],
    dateCreated: '2024-01-15',
    dateModified: '2024-01-15'
  },
  {
    id: 'INV-2024-002',
    invoiceNumber: 'DELL-002-2024',
    vendor: 'Dell Technologies',
    vendorId: 'VND-002',
    amount: 15000,
    currency: 'USD',
    status: 'approved',
    invoiceDate: '2024-01-10',
    dueDate: '2024-02-09',
    description: 'IT equipment refresh',
    poNumber: 'PO-2024-002',
    department: 'IT',
    approver: 'John Smith',
    approvedDate: '2024-01-12',
    lineItems: [
      {
        id: 'IL-002',
        description: 'Dell XPS 15 Laptop',
        quantity: 5,
        unitPrice: 2500,
        totalPrice: 12500
      }
    ],
    attachments: [],
    dateCreated: '2024-01-10',
    dateModified: '2024-01-12'
  }
];

export const useInvoices = () => {
  const [invoices, setInvoices] = useLocalStorage('invoices', initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'dateCreated' | 'dateModified'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0]
    };
    setInvoices([...invoices, newInvoice]);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id 
        ? { ...invoice, ...updates, dateModified: new Date().toISOString().split('T')[0] }
        : invoice
    ));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const getMetrics = () => {
    const totalInvoices = invoices.length;
    const pending = invoices.filter(i => i.status === 'pending').length;
    const approved = invoices.filter(i => i.status === 'approved').length;
    const paid = invoices.filter(i => i.status === 'paid').length;
    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

    return {
      totalInvoices,
      pending,
      approved,
      paid,
      totalAmount
    };
  };

  return {
    invoices: filteredInvoices,
    allInvoices: invoices,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getMetrics
  };
};
