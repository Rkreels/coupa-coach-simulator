
import { useState } from 'react';

export interface Requisition {
  id: string;
  title: string;
  requestor: string;
  department: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalAmount: number;
  currency: string;
  requestedDate: string;
  neededByDate: string;
  description: string;
  justification: string;
  category: string;
  supplier?: string;
  approver?: string;
  approvedDate?: string;
  lineItems: RequisitionLineItem[];
  attachments: string[];
  submittedDate?: string;
  lastModified: string;
}

export interface RequisitionLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  supplier?: string;
  partNumber?: string;
  needByDate: string;
}

const initialRequisitions: Requisition[] = [
  {
    id: 'REQ-2024-001',
    title: 'Office Supplies Q1 2024',
    requestor: 'Sarah Johnson',
    department: 'Marketing',
    status: 'pending',
    priority: 'medium',
    totalAmount: 2500,
    currency: 'USD',
    requestedDate: '2024-01-15',
    neededByDate: '2024-02-01',
    description: 'Quarterly office supplies for marketing team',
    justification: 'Regular office supplies needed for Q1 operations',
    category: 'Office Supplies',
    supplier: 'Office Depot',
    lineItems: [
      {
        id: 'LI-001',
        description: 'Printer Paper (A4)',
        quantity: 20,
        unitPrice: 12.50,
        totalPrice: 250,
        category: 'Paper Products',
        needByDate: '2024-02-01'
      }
    ],
    attachments: [],
    submittedDate: '2024-01-15',
    lastModified: '2024-01-15'
  },
  {
    id: 'REQ-2024-002',
    title: 'IT Equipment Refresh',
    requestor: 'Mike Chen',
    department: 'IT',
    status: 'approved',
    priority: 'high',
    totalAmount: 15000,
    currency: 'USD',
    requestedDate: '2024-01-10',
    neededByDate: '2024-01-25',
    description: 'Laptop and monitor refresh for development team',
    justification: 'Current equipment is 4+ years old and affecting productivity',
    category: 'IT Equipment',
    supplier: 'Dell Technologies',
    approver: 'John Smith',
    approvedDate: '2024-01-12',
    lineItems: [
      {
        id: 'LI-002',
        description: 'Dell XPS 15 Laptop',
        quantity: 5,
        unitPrice: 2500,
        totalPrice: 12500,
        category: 'Computers',
        partNumber: 'XPS15-2024',
        needByDate: '2024-01-25'
      }
    ],
    attachments: [],
    submittedDate: '2024-01-10',
    lastModified: '2024-01-12'
  }
];

export const useRequisitions = () => {
  const [requisitions, setRequisitions] = useState(initialRequisitions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredRequisitions = requisitions.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.requestor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || req.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const addRequisition = (requisition: Omit<Requisition, 'id' | 'lastModified'>) => {
    const newRequisition: Requisition = {
      ...requisition,
      id: `REQ-${new Date().getFullYear()}-${String(requisitions.length + 1).padStart(3, '0')}`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setRequisitions([...requisitions, newRequisition]);
    return newRequisition;
  };

  const updateRequisition = (id: string, updates: Partial<Requisition>) => {
    setRequisitions(requisitions.map(req => 
      req.id === id 
        ? { ...req, ...updates, lastModified: new Date().toISOString().split('T')[0] }
        : req
    ));
  };

  const deleteRequisition = (id: string) => {
    setRequisitions(requisitions.filter(req => req.id !== id));
  };

  const getRequisition = (id: string) => {
    return requisitions.find(req => req.id === id);
  };

  const getMetrics = () => {
    const totalRequisitions = requisitions.length;
    const pendingApproval = requisitions.filter(r => r.status === 'pending').length;
    const approved = requisitions.filter(r => r.status === 'approved').length;
    const drafted = requisitions.filter(r => r.status === 'draft').length;
    const totalValue = requisitions.reduce((sum, req) => sum + req.totalAmount, 0);

    return {
      totalRequisitions,
      pendingApproval,
      approved,
      drafted,
      totalValue,
      avgProcessingTime: '2.3 days'
    };
  };

  return {
    requisitions: filteredRequisitions,
    allRequisitions: requisitions,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    addRequisition,
    updateRequisition,
    deleteRequisition,
    getRequisition,
    getMetrics
  };
};
