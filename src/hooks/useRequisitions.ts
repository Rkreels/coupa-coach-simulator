
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
  { id: 'REQ-2024-001', title: 'Office Supplies Q1 2024', requestor: 'Sarah Johnson', department: 'Marketing', status: 'pending', priority: 'medium', totalAmount: 2500, currency: 'USD', requestedDate: '2024-01-15', neededByDate: '2024-02-01', description: 'Quarterly office supplies for marketing team', justification: 'Regular Q1 office supplies', category: 'Office Supplies', supplier: 'Office Depot', lineItems: [{ id: 'LI-001', description: 'Printer Paper A4', quantity: 20, unitPrice: 12.50, totalPrice: 250, category: 'Paper Products', needByDate: '2024-02-01' }], attachments: [], submittedDate: '2024-01-15', lastModified: '2024-01-15' },
  { id: 'REQ-2024-002', title: 'IT Equipment Refresh', requestor: 'Mike Chen', department: 'IT', status: 'approved', priority: 'high', totalAmount: 15000, currency: 'USD', requestedDate: '2024-01-10', neededByDate: '2024-01-25', description: 'Laptop and monitor refresh for dev team', justification: 'Current equipment 4+ years old', category: 'IT Equipment', supplier: 'Dell Technologies', approver: 'John Smith', approvedDate: '2024-01-12', lineItems: [{ id: 'LI-002', description: 'Dell XPS 15 Laptop', quantity: 5, unitPrice: 2500, totalPrice: 12500, category: 'Computers', partNumber: 'XPS15-2024', needByDate: '2024-01-25' }], attachments: [], submittedDate: '2024-01-10', lastModified: '2024-01-12' },
  { id: 'REQ-2024-003', title: 'Marketing Campaign Materials', requestor: 'Emily Davis', department: 'Marketing', status: 'pending', priority: 'high', totalAmount: 8500, currency: 'USD', requestedDate: '2024-01-18', neededByDate: '2024-02-15', description: 'Print materials for Q1 campaign launch', justification: 'Required for product launch event', category: 'Marketing', supplier: 'Print Solutions Inc', lineItems: [{ id: 'LI-003', description: 'Campaign Brochures', quantity: 5000, unitPrice: 1.20, totalPrice: 6000, category: 'Print', needByDate: '2024-02-15' }], attachments: [], submittedDate: '2024-01-18', lastModified: '2024-01-18' },
  { id: 'REQ-2024-004', title: 'Server Room Cooling System', requestor: 'David Kim', department: 'IT', status: 'approved', priority: 'urgent', totalAmount: 45000, currency: 'USD', requestedDate: '2024-01-08', neededByDate: '2024-01-20', description: 'Emergency replacement of failed HVAC for server room', justification: 'Current system failed, risk of equipment damage', category: 'Facilities', supplier: 'CoolTech Systems', approver: 'Sarah Davis', approvedDate: '2024-01-09', lineItems: [{ id: 'LI-004', description: 'Precision Cooling Unit', quantity: 2, unitPrice: 22500, totalPrice: 45000, category: 'HVAC', needByDate: '2024-01-20' }], attachments: [], submittedDate: '2024-01-08', lastModified: '2024-01-09' },
  { id: 'REQ-2024-005', title: 'Employee Training Software', requestor: 'Amanda White', department: 'HR', status: 'pending', priority: 'medium', totalAmount: 12000, currency: 'USD', requestedDate: '2024-01-20', neededByDate: '2024-03-01', description: 'Annual license for e-learning platform', justification: 'Company-wide compliance training required', category: 'Software', supplier: 'LearnHub Corp', lineItems: [{ id: 'LI-005', description: 'Enterprise LMS License', quantity: 1, unitPrice: 12000, totalPrice: 12000, category: 'Software License', needByDate: '2024-03-01' }], attachments: [], submittedDate: '2024-01-20', lastModified: '2024-01-20' },
  { id: 'REQ-2024-006', title: 'Conference Room AV Upgrade', requestor: 'Tom Brown', department: 'Facilities', status: 'draft', priority: 'low', totalAmount: 18000, currency: 'USD', requestedDate: '2024-01-22', neededByDate: '2024-04-01', description: 'AV equipment upgrade for 3 conference rooms', justification: 'Current AV unreliable for client meetings', category: 'AV Equipment', lineItems: [{ id: 'LI-006', description: '75" Display Panel', quantity: 3, unitPrice: 3500, totalPrice: 10500, category: 'Displays', needByDate: '2024-04-01' }], attachments: [], lastModified: '2024-01-22' },
  { id: 'REQ-2024-007', title: 'Safety Equipment Annual Order', requestor: 'James Wilson', department: 'Operations', status: 'approved', priority: 'high', totalAmount: 6800, currency: 'USD', requestedDate: '2024-01-12', neededByDate: '2024-02-01', description: 'PPE and safety equipment annual replenishment', justification: 'OSHA compliance requirement', category: 'Safety Equipment', supplier: 'SafetyFirst Supplies', approver: 'Lisa Johnson', approvedDate: '2024-01-14', lineItems: [{ id: 'LI-007', description: 'Hard Hats', quantity: 50, unitPrice: 35, totalPrice: 1750, category: 'PPE', needByDate: '2024-02-01' }], attachments: [], submittedDate: '2024-01-12', lastModified: '2024-01-14' },
  { id: 'REQ-2024-008', title: 'Company Vehicle Maintenance', requestor: 'Robert Taylor', department: 'Operations', status: 'rejected', priority: 'medium', totalAmount: 4200, currency: 'USD', requestedDate: '2024-01-16', neededByDate: '2024-02-10', description: 'Fleet vehicle scheduled maintenance', justification: 'Quarterly fleet maintenance schedule', category: 'Vehicle Maintenance', supplier: 'AutoCare Fleet Services', lineItems: [{ id: 'LI-008', description: 'Full Service Package', quantity: 6, unitPrice: 700, totalPrice: 4200, category: 'Maintenance', needByDate: '2024-02-10' }], attachments: [], submittedDate: '2024-01-16', lastModified: '2024-01-18' },
  { id: 'REQ-2024-009', title: 'Customer Gift Baskets', requestor: 'Emily Davis', department: 'Sales', status: 'approved', priority: 'low', totalAmount: 3500, currency: 'USD', requestedDate: '2024-01-25', neededByDate: '2024-02-14', description: 'Premium gift baskets for top 10 clients', justification: 'Client appreciation for contract renewals', category: 'Gifts', supplier: 'Premium Gifts Co', approver: 'Robert Taylor', approvedDate: '2024-01-27', lineItems: [{ id: 'LI-009', description: 'Premium Gift Basket', quantity: 10, unitPrice: 350, totalPrice: 3500, category: 'Client Gifts', needByDate: '2024-02-14' }], attachments: [], submittedDate: '2024-01-25', lastModified: '2024-01-27' },
  { id: 'REQ-2024-010', title: 'Lab Testing Supplies', requestor: 'Patricia Adams', department: 'R&D', status: 'pending', priority: 'high', totalAmount: 22000, currency: 'USD', requestedDate: '2024-01-28', neededByDate: '2024-02-15', description: 'Chemical reagents and lab consumables', justification: 'Required for Project Alpha testing phase', category: 'Lab Supplies', supplier: 'ScienceDirect Lab Supplies', lineItems: [{ id: 'LI-010', description: 'Reagent Kit Bundle', quantity: 10, unitPrice: 2200, totalPrice: 22000, category: 'Lab Consumables', needByDate: '2024-02-15' }], attachments: [], submittedDate: '2024-01-28', lastModified: '2024-01-28' },
  { id: 'REQ-2024-011', title: 'Breakroom Furniture', requestor: 'Lisa Johnson', department: 'Facilities', status: 'draft', priority: 'low', totalAmount: 7500, currency: 'USD', requestedDate: '2024-02-01', neededByDate: '2024-04-01', description: 'New tables and chairs for employee breakroom', justification: 'Existing furniture worn out', category: 'Furniture', lineItems: [{ id: 'LI-011', description: 'Breakroom Table Set', quantity: 5, unitPrice: 1500, totalPrice: 7500, category: 'Furniture', needByDate: '2024-04-01' }], attachments: [], lastModified: '2024-02-01' },
  { id: 'REQ-2024-012', title: 'Cybersecurity Audit Services', requestor: 'David Kim', department: 'IT', status: 'approved', priority: 'urgent', totalAmount: 35000, currency: 'USD', requestedDate: '2024-01-05', neededByDate: '2024-02-28', description: 'Annual penetration testing and security audit', justification: 'SOC2 compliance requirement', category: 'Professional Services', supplier: 'CyberShield Consulting', approver: 'Sarah Davis', approvedDate: '2024-01-07', lineItems: [{ id: 'LI-012', description: 'Comprehensive Security Audit', quantity: 1, unitPrice: 35000, totalPrice: 35000, category: 'Security Services', needByDate: '2024-02-28' }], attachments: [], submittedDate: '2024-01-05', lastModified: '2024-01-07' },
  { id: 'REQ-2024-013', title: 'Warehouse Shelving Units', requestor: 'James Wilson', department: 'Operations', status: 'pending', priority: 'medium', totalAmount: 14500, currency: 'USD', requestedDate: '2024-02-02', neededByDate: '2024-03-15', description: 'Industrial shelving for new warehouse section', justification: 'Expanding inventory storage capacity', category: 'Warehouse Equipment', supplier: 'IndustrialRack Systems', lineItems: [{ id: 'LI-013', description: 'Heavy Duty Shelf Unit', quantity: 25, unitPrice: 580, totalPrice: 14500, category: 'Storage', needByDate: '2024-03-15' }], attachments: [], submittedDate: '2024-02-02', lastModified: '2024-02-02' },
  { id: 'REQ-2024-014', title: 'Annual Software Subscriptions', requestor: 'Mike Chen', department: 'IT', status: 'approved', priority: 'high', totalAmount: 28000, currency: 'USD', requestedDate: '2024-01-02', neededByDate: '2024-01-31', description: 'Renewal of development tools and SaaS subscriptions', justification: 'Critical development tools expiring', category: 'Software', supplier: 'SaaS Marketplace', approver: 'David Kim', approvedDate: '2024-01-04', lineItems: [{ id: 'LI-014', description: 'IDE Licenses', quantity: 20, unitPrice: 800, totalPrice: 16000, category: 'Software', needByDate: '2024-01-31' }], attachments: [], submittedDate: '2024-01-02', lastModified: '2024-01-04' },
  { id: 'REQ-2024-015', title: 'Office Renovation - Phase 1', requestor: 'Lisa Johnson', department: 'Facilities', status: 'pending', priority: 'medium', totalAmount: 95000, currency: 'USD', requestedDate: '2024-02-05', neededByDate: '2024-06-01', description: 'First phase of 3rd floor office renovation', justification: 'Modernizing workspace for hybrid work model', category: 'Construction', supplier: 'BuildRight Contractors', lineItems: [{ id: 'LI-015', description: 'Renovation Phase 1', quantity: 1, unitPrice: 95000, totalPrice: 95000, category: 'Construction', needByDate: '2024-06-01' }], attachments: [], submittedDate: '2024-02-05', lastModified: '2024-02-05' },
  { id: 'REQ-2024-016', title: 'Trade Show Booth Materials', requestor: 'Emily Davis', department: 'Marketing', status: 'cancelled', priority: 'medium', totalAmount: 11000, currency: 'USD', requestedDate: '2024-01-30', neededByDate: '2024-03-10', description: 'Exhibition booth for industry trade show', justification: 'Annual industry conference participation', category: 'Marketing', lineItems: [{ id: 'LI-016', description: 'Booth Display Kit', quantity: 1, unitPrice: 11000, totalPrice: 11000, category: 'Events', needByDate: '2024-03-10' }], attachments: [], submittedDate: '2024-01-30', lastModified: '2024-02-08' },
  { id: 'REQ-2024-017', title: 'Ergonomic Desk Accessories', requestor: 'Amanda White', department: 'HR', status: 'approved', priority: 'low', totalAmount: 4800, currency: 'USD', requestedDate: '2024-02-08', neededByDate: '2024-03-15', description: 'Standing desk converters and monitor arms', justification: 'Employee wellness initiative', category: 'Office Equipment', supplier: 'ErgoTech Solutions', approver: 'Tom Brown', approvedDate: '2024-02-10', lineItems: [{ id: 'LI-017', description: 'Standing Desk Converter', quantity: 12, unitPrice: 400, totalPrice: 4800, category: 'Ergonomics', needByDate: '2024-03-15' }], attachments: [], submittedDate: '2024-02-08', lastModified: '2024-02-10' },
  { id: 'REQ-2024-018', title: 'Emergency Generator Parts', requestor: 'Tom Brown', department: 'Facilities', status: 'approved', priority: 'urgent', totalAmount: 8900, currency: 'USD', requestedDate: '2024-02-12', neededByDate: '2024-02-20', description: 'Replacement parts for backup generator', justification: 'Generator failure risk - critical infrastructure', category: 'Electrical Equipment', supplier: 'PowerGen Parts Inc', approver: 'Lisa Johnson', approvedDate: '2024-02-13', lineItems: [{ id: 'LI-018', description: 'Generator Controller Board', quantity: 1, unitPrice: 8900, totalPrice: 8900, category: 'Electrical', needByDate: '2024-02-20' }], attachments: [], submittedDate: '2024-02-12', lastModified: '2024-02-13' },
  { id: 'REQ-2024-019', title: 'Recruitment Agency Services', requestor: 'Amanda White', department: 'HR', status: 'draft', priority: 'medium', totalAmount: 50000, currency: 'USD', requestedDate: '2024-02-14', neededByDate: '2024-04-01', description: 'Retained search for VP Engineering role', justification: 'Critical leadership hire needed', category: 'Recruitment', lineItems: [{ id: 'LI-019', description: 'Executive Search Retainer', quantity: 1, unitPrice: 50000, totalPrice: 50000, category: 'HR Services', needByDate: '2024-04-01' }], attachments: [], lastModified: '2024-02-14' },
  { id: 'REQ-2024-020', title: 'Shipping Supplies Restock', requestor: 'James Wilson', department: 'Operations', status: 'pending', priority: 'low', totalAmount: 1800, currency: 'USD', requestedDate: '2024-02-15', neededByDate: '2024-03-01', description: 'Boxes, tape, and packing materials', justification: 'Monthly shipping supplies replenishment', category: 'Shipping', supplier: 'PackagePro Supplies', lineItems: [{ id: 'LI-020', description: 'Shipping Box Assortment', quantity: 200, unitPrice: 9, totalPrice: 1800, category: 'Packaging', needByDate: '2024-03-01' }], attachments: [], submittedDate: '2024-02-15', lastModified: '2024-02-15' }
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
