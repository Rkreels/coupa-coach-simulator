
import { useState } from 'react';

export interface Contract {
  id: string;
  title: string;
  type: 'purchase' | 'service' | 'master' | 'framework' | 'nda' | 'amendment';
  status: 'draft' | 'pending' | 'active' | 'expired' | 'terminated' | 'renewed';
  supplier: string;
  supplierId: string;
  value: number;
  currency: string;
  startDate: string;
  endDate: string;
  renewalDate?: string;
  terminationDate?: string;
  department: string;
  owner: string;
  approver?: string;
  signedDate?: string;
  description: string;
  terms: string[];
  attachments: string[];
  autoRenewal: boolean;
  notificationDays: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  complianceStatus: 'compliant' | 'non-compliant' | 'under-review';
  createdDate: string;
  lastModified: string;
  notes?: string;
}

const initialContracts: Contract[] = [
  { id: 'CNT-2024-001', title: 'Office Supplies Master Agreement', type: 'master', status: 'active', supplier: 'Office Supplies Co.', supplierId: 'SUP-001', value: 100000, currency: 'USD', startDate: '2024-01-01', endDate: '2024-12-31', department: 'Procurement', owner: 'John Smith', approver: 'Jane Wilson', signedDate: '2023-12-15', description: 'Master agreement for office supplies procurement', terms: ['Net 30 payment terms', 'Volume discounts apply'], attachments: [], autoRenewal: true, notificationDays: 90, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-12-01', lastModified: '2024-01-01', notes: 'Standard office supplies contract' },
  { id: 'CNT-2024-002', title: 'IT Services Framework Contract', type: 'framework', status: 'active', supplier: 'TechCorp Solutions', supplierId: 'SUP-002', value: 500000, currency: 'USD', startDate: '2024-01-01', endDate: '2025-12-31', department: 'IT', owner: 'Mike Rodriguez', approver: 'Sarah Davis', signedDate: '2023-12-20', description: 'Framework contract for IT services and support', terms: ['SLA guarantees', '24/7 support'], attachments: [], autoRenewal: false, notificationDays: 180, riskLevel: 'medium', complianceStatus: 'compliant', createdDate: '2023-11-15', lastModified: '2024-01-01' },
  { id: 'CNT-2024-003', title: 'Cleaning Services Contract', type: 'service', status: 'active', supplier: 'CleanCorp', supplierId: 'SUP-004', value: 25000, currency: 'USD', startDate: '2024-01-01', endDate: '2024-06-30', renewalDate: '2024-07-01', department: 'Facilities', owner: 'Lisa Johnson', approver: 'Tom Brown', signedDate: '2023-12-10', description: 'Cleaning services for main office', terms: ['Monthly billing', 'Green cleaning'], attachments: [], autoRenewal: true, notificationDays: 30, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-11-30', lastModified: '2024-01-01' },
  { id: 'CNT-2024-004', title: 'Cloud Hosting Services Agreement', type: 'service', status: 'active', supplier: 'AWS Cloud Services', supplierId: 'SUP-005', value: 350000, currency: 'USD', startDate: '2024-02-01', endDate: '2025-01-31', department: 'IT', owner: 'David Kim', approver: 'Sarah Davis', signedDate: '2024-01-25', description: 'Enterprise cloud hosting and compute services', terms: ['99.99% SLA uptime', 'Pay-per-use billing'], attachments: [], autoRenewal: true, notificationDays: 120, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2024-01-10', lastModified: '2024-02-01' },
  { id: 'CNT-2024-005', title: 'Marketing Agency Retainer', type: 'service', status: 'active', supplier: 'Creative Minds Agency', supplierId: 'SUP-006', value: 180000, currency: 'USD', startDate: '2024-01-01', endDate: '2024-12-31', department: 'Marketing', owner: 'Emily Chen', approver: 'Robert Taylor', signedDate: '2023-12-22', description: 'Monthly marketing retainer for brand services', terms: ['Monthly deliverables', 'Quarterly reviews'], attachments: [], autoRenewal: false, notificationDays: 60, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-12-15', lastModified: '2024-01-01' },
  { id: 'CNT-2024-006', title: 'Security Guard Services', type: 'service', status: 'active', supplier: 'SecureForce Inc.', supplierId: 'SUP-007', value: 96000, currency: 'USD', startDate: '2024-01-01', endDate: '2024-12-31', department: 'Facilities', owner: 'Lisa Johnson', approver: 'Tom Brown', signedDate: '2023-12-28', description: '24/7 security guard services for all facilities', terms: ['Background checks required', 'Bi-weekly shifts'], attachments: [], autoRenewal: true, notificationDays: 90, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-12-20', lastModified: '2024-01-01' },
  { id: 'CNT-2024-007', title: 'Dell Hardware Purchase Agreement', type: 'purchase', status: 'active', supplier: 'Dell Technologies', supplierId: 'SUP-008', value: 750000, currency: 'USD', startDate: '2024-01-15', endDate: '2025-01-14', department: 'IT', owner: 'Mike Rodriguez', approver: 'Sarah Davis', signedDate: '2024-01-10', description: 'Bulk hardware procurement agreement', terms: ['Volume pricing tiers', 'Next-day replacement warranty'], attachments: [], autoRenewal: false, notificationDays: 120, riskLevel: 'medium', complianceStatus: 'compliant', createdDate: '2024-01-05', lastModified: '2024-01-15' },
  { id: 'CNT-2024-008', title: 'Legal Services Retainer', type: 'service', status: 'pending', supplier: 'Baker & Associates LLP', supplierId: 'SUP-009', value: 200000, currency: 'USD', startDate: '2024-03-01', endDate: '2025-02-28', department: 'Legal', owner: 'Patricia Adams', approver: 'CEO Office', signedDate: undefined, description: 'Corporate legal advisory services', terms: ['Hourly billing rates', 'Monthly cap $20K'], attachments: [], autoRenewal: false, notificationDays: 90, riskLevel: 'medium', complianceStatus: 'under-review', createdDate: '2024-02-01', lastModified: '2024-02-10' },
  { id: 'CNT-2024-009', title: 'Catering Services Agreement', type: 'service', status: 'active', supplier: 'Gourmet Corporate Catering', supplierId: 'SUP-010', value: 48000, currency: 'USD', startDate: '2024-01-01', endDate: '2024-12-31', department: 'HR', owner: 'Amanda White', approver: 'Tom Brown', signedDate: '2023-12-18', description: 'Corporate event and daily catering', terms: ['48hr advance notice', 'Dietary accommodations'], attachments: [], autoRenewal: true, notificationDays: 60, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-12-10', lastModified: '2024-01-01' },
  { id: 'CNT-2024-010', title: 'Vehicle Fleet Lease Agreement', type: 'master', status: 'active', supplier: 'Enterprise Fleet Management', supplierId: 'SUP-011', value: 420000, currency: 'USD', startDate: '2024-01-01', endDate: '2026-12-31', department: 'Operations', owner: 'James Wilson', approver: 'CFO Office', signedDate: '2023-12-01', description: '3-year fleet vehicle lease for field operations', terms: ['Mileage limits apply', 'Maintenance included'], attachments: [], autoRenewal: false, notificationDays: 180, riskLevel: 'medium', complianceStatus: 'compliant', createdDate: '2023-11-15', lastModified: '2024-01-01' },
  { id: 'CNT-2024-011', title: 'ERP Software License Agreement', type: 'framework', status: 'active', supplier: 'SAP Licensing Corp', supplierId: 'SUP-012', value: 1200000, currency: 'USD', startDate: '2024-01-01', endDate: '2026-12-31', department: 'IT', owner: 'David Kim', approver: 'CTO Office', signedDate: '2023-11-30', description: 'Enterprise ERP software licensing', terms: ['Named user licensing', 'Annual support included'], attachments: [], autoRenewal: true, notificationDays: 365, riskLevel: 'high', complianceStatus: 'compliant', createdDate: '2023-11-01', lastModified: '2024-01-01' },
  { id: 'CNT-2024-012', title: 'Warehouse Space Lease', type: 'master', status: 'active', supplier: 'ProLogis Real Estate', supplierId: 'SUP-013', value: 360000, currency: 'USD', startDate: '2024-01-01', endDate: '2026-12-31', department: 'Operations', owner: 'James Wilson', approver: 'CFO Office', signedDate: '2023-10-15', description: 'Regional distribution center lease', terms: ['Triple net lease', 'Annual escalation 3%'], attachments: [], autoRenewal: false, notificationDays: 365, riskLevel: 'medium', complianceStatus: 'compliant', createdDate: '2023-10-01', lastModified: '2024-01-01' },
  { id: 'CNT-2024-013', title: 'Staffing Agency Agreement', type: 'framework', status: 'pending', supplier: 'Talent First Staffing', supplierId: 'SUP-014', value: 300000, currency: 'USD', startDate: '2024-04-01', endDate: '2025-03-31', department: 'HR', owner: 'Amanda White', approver: 'CHRO Office', signedDate: undefined, description: 'Temporary and contract staffing services', terms: ['Conversion fee applies', 'Background checks included'], attachments: [], autoRenewal: false, notificationDays: 90, riskLevel: 'medium', complianceStatus: 'under-review', createdDate: '2024-02-15', lastModified: '2024-02-20' },
  { id: 'CNT-2024-014', title: 'Telecom Services Contract', type: 'service', status: 'active', supplier: 'Verizon Business', supplierId: 'SUP-015', value: 156000, currency: 'USD', startDate: '2024-01-01', endDate: '2025-12-31', department: 'IT', owner: 'Mike Rodriguez', approver: 'Sarah Davis', signedDate: '2023-12-01', description: 'Enterprise voice and data telecommunications', terms: ['Unlimited domestic calling', 'Managed network'], attachments: [], autoRenewal: true, notificationDays: 120, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-11-15', lastModified: '2024-01-01' },
  { id: 'CNT-2024-015', title: 'Insurance Coverage Policy', type: 'master', status: 'active', supplier: 'Liberty Mutual Insurance', supplierId: 'SUP-016', value: 85000, currency: 'USD', startDate: '2024-01-01', endDate: '2024-12-31', department: 'Finance', owner: 'Patricia Adams', approver: 'CFO Office', signedDate: '2023-12-15', description: 'Comprehensive business insurance coverage', terms: ['Annual premium', 'Claims within 30 days'], attachments: [], autoRenewal: true, notificationDays: 90, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-12-01', lastModified: '2024-01-01' },
  { id: 'CNT-2024-016', title: 'Office Furniture Purchase', type: 'purchase', status: 'expired', supplier: 'Herman Miller Inc.', supplierId: 'SUP-017', value: 125000, currency: 'USD', startDate: '2023-01-01', endDate: '2023-12-31', department: 'Facilities', owner: 'Lisa Johnson', approver: 'Tom Brown', signedDate: '2022-12-15', description: 'Ergonomic office furniture procurement', terms: ['10-year warranty', 'Bulk discount 15%'], attachments: [], autoRenewal: false, notificationDays: 60, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2022-12-01', lastModified: '2024-01-05' },
  { id: 'CNT-2024-017', title: 'Consulting Services Agreement', type: 'service', status: 'expired', supplier: 'McKinsey & Company', supplierId: 'SUP-018', value: 450000, currency: 'USD', startDate: '2023-03-01', endDate: '2023-12-31', department: 'Strategy', owner: 'CEO Office', approver: 'Board', signedDate: '2023-02-20', description: 'Strategic consulting for digital transformation', terms: ['Fixed fee engagement', 'Monthly status reports'], attachments: [], autoRenewal: false, notificationDays: 60, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-02-15', lastModified: '2024-01-10' },
  { id: 'CNT-2024-018', title: 'NDA - Research Partner', type: 'nda', status: 'active', supplier: 'InnovateTech Research', supplierId: 'SUP-019', value: 0, currency: 'USD', startDate: '2024-02-01', endDate: '2026-01-31', department: 'R&D', owner: 'David Kim', approver: 'Legal', signedDate: '2024-01-28', description: 'Non-disclosure agreement for joint research', terms: ['Mutual NDA', '2-year term', 'Covers all IP'], attachments: [], autoRenewal: false, notificationDays: 180, riskLevel: 'high', complianceStatus: 'compliant', createdDate: '2024-01-20', lastModified: '2024-02-01' },
  { id: 'CNT-2024-019', title: 'Travel Management Services', type: 'service', status: 'draft', supplier: 'Corporate Travel Partners', supplierId: 'SUP-020', value: 200000, currency: 'USD', startDate: '2024-05-01', endDate: '2025-04-30', department: 'HR', owner: 'Amanda White', approver: 'CFO Office', description: 'Managed corporate travel booking and support', terms: ['24/7 booking support', 'Negotiated airline rates'], attachments: [], autoRenewal: false, notificationDays: 90, riskLevel: 'low', complianceStatus: 'under-review', createdDate: '2024-02-10', lastModified: '2024-02-15' },
  { id: 'CNT-2024-020', title: 'Waste Management Services', type: 'service', status: 'active', supplier: 'EcoWaste Solutions', supplierId: 'SUP-021', value: 36000, currency: 'USD', startDate: '2024-01-01', endDate: '2024-12-31', department: 'Facilities', owner: 'Lisa Johnson', approver: 'Tom Brown', signedDate: '2023-12-20', description: 'Commercial waste and recycling management', terms: ['Weekly pickup schedule', 'Recycling reports'], attachments: [], autoRenewal: true, notificationDays: 60, riskLevel: 'low', complianceStatus: 'compliant', createdDate: '2023-12-10', lastModified: '2024-01-01' }
];

export const useContracts = () => {
  const [contracts, setContracts] = useState(initialContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const addContract = (contract: Omit<Contract, 'id' | 'lastModified'>) => {
    const newContract: Contract = {
      ...contract,
      id: `CNT-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, '0')}`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setContracts([...contracts, newContract]);
    return newContract;
  };

  const updateContract = (id: string, updates: Partial<Contract>) => {
    setContracts(contracts.map(contract => 
      contract.id === id 
        ? { ...contract, ...updates, lastModified: new Date().toISOString().split('T')[0] }
        : contract
    ));
  };

  const deleteContract = (id: string) => {
    setContracts(contracts.filter(contract => contract.id !== id));
  };

  const getContract = (id: string) => {
    return contracts.find(contract => contract.id === id);
  };

  const getMetrics = () => {
    const totalContracts = contracts.length;
    const activeContracts = contracts.filter(c => c.status === 'active').length;
    const expiringSoon = contracts.filter(c => {
      if (c.status !== 'active') return false;
      const endDate = new Date(c.endDate);
      const today = new Date();
      const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      return diffDays <= c.notificationDays;
    }).length;
    const totalValue = contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.value, 0);
    const riskContracts = contracts.filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical').length;

    return {
      totalContracts,
      activeContracts,
      expiringSoon,
      totalValue,
      riskContracts
    };
  };

  return {
    contracts: filteredContracts,
    allContracts: contracts,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    addContract,
    updateContract,
    deleteContract,
    getContract,
    getMetrics
  };
};
