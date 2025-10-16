
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
  {
    id: 'CNT-2024-001',
    title: 'Office Supplies Master Agreement',
    type: 'master',
    status: 'active',
    supplier: 'Office Supplies Co.',
    supplierId: 'SUP-001',
    value: 100000,
    currency: 'USD',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    department: 'Procurement',
    owner: 'John Smith',
    approver: 'Jane Wilson',
    signedDate: '2023-12-15',
    description: 'Master agreement for office supplies procurement',
    terms: ['Net 30 payment terms', 'Volume discounts apply', 'Quality guarantees'],
    attachments: [],
    autoRenewal: true,
    notificationDays: 90,
    riskLevel: 'low',
    complianceStatus: 'compliant',
    createdDate: '2023-12-01',
    lastModified: '2024-01-01',
    notes: 'Standard office supplies contract'
  },
  {
    id: 'CNT-2024-002',
    title: 'IT Services Framework Contract',
    type: 'framework',
    status: 'active',
    supplier: 'TechCorp Solutions',
    supplierId: 'SUP-002',
    value: 500000,
    currency: 'USD',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    department: 'IT',
    owner: 'Mike Rodriguez',
    approver: 'Sarah Davis',
    signedDate: '2023-12-20',
    description: 'Framework contract for IT services and support',
    terms: ['SLA guarantees', '24/7 support', 'Scalable services'],
    attachments: [],
    autoRenewal: false,
    notificationDays: 180,
    riskLevel: 'medium',
    complianceStatus: 'compliant',
    createdDate: '2023-11-15',
    lastModified: '2024-01-01'
  },
  {
    id: 'CNT-2024-003',
    title: 'Cleaning Services Contract',
    type: 'service',
    status: 'active',
    supplier: 'CleanCorp',
    supplierId: 'SUP-004',
    value: 25000,
    currency: 'USD',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    renewalDate: '2024-07-01',
    department: 'Facilities',
    owner: 'Lisa Johnson',
    approver: 'Tom Brown',
    signedDate: '2023-12-10',
    description: 'Cleaning services for main office building',
    terms: ['Monthly billing', 'Quality inspections', 'Green cleaning products'],
    attachments: [],
    autoRenewal: true,
    notificationDays: 30,
    riskLevel: 'low',
    complianceStatus: 'compliant',
    createdDate: '2023-11-30',
    lastModified: '2024-01-01'
  }
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
