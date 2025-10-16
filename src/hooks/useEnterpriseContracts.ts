import { useState } from 'react';

export interface EnterpriseContract {
  id: string;
  title: string;
  type: 'purchase' | 'service' | 'master' | 'framework' | 'nda' | 'amendment' | 'blanket';
  status: 'draft' | 'pending_review' | 'pending_approval' | 'pending_signature' | 'active' | 'expired' | 'terminated' | 'renewed';
  
  // Parties
  supplier: {
    id: string;
    name: string;
    contact: string;
  };
  
  // Financial Details
  financial: {
    value: number;
    currency: string;
    spendCommitted: number;
    spendActual: number;
    savingsTarget: number;
    savingsActual: number;
  };
  
  // Dates & Timeline
  dates: {
    startDate: string;
    endDate: string;
    renewalDate?: string;
    terminationDate?: string;
    signedDate?: string;
    lastAmendmentDate?: string;
  };
  
  // Workflow & Approval
  workflow: {
    currentStage: string;
    approvers: string[];
    requiredApprovals: string[];
    completedApprovals: string[];
  };
  
  // Contract Details
  details: {
    department: string;
    owner: string;
    category: string;
    description: string;
    scope: string;
    deliverables: string[];
    milestones: ContractMilestone[];
  };
  
  // Terms & Conditions
  terms: {
    paymentTerms: string;
    deliveryTerms: string;
    qualityRequirements: string[];
    penaltyClauses: string[];
    terminationClauses: string[];
    renewalTerms: string;
  };
  
  // Risk & Compliance
  riskCompliance: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    riskFactors: string[];
    complianceStatus: 'compliant' | 'non-compliant' | 'under-review' | 'action-required';
    requiredCertifications: string[];
    auditSchedule: string;
  };
  
  // Document Management
  documents: {
    attachments: ContractAttachment[];
    templates: string[];
    amendments: string[];
    relatedContracts: string[];
  };
  
  // Notifications & Alerts
  notifications: {
    autoRenewal: boolean;
    renewalNotificationDays: number;
    expirationAlerts: boolean;
    milestoneAlerts: boolean;
    complianceAlerts: boolean;
  };
  
  // Performance & SLA
  performance: {
    slaTargets: SLATarget[];
    performanceMetrics: PerformanceMetric[];
    lastReviewDate?: string;
    nextReviewDate?: string;
  };
  
  // Audit Trail
  createdDate: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  version: number;
  notes?: string;
}

interface ContractMilestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  description: string;
  deliverable?: string;
}

interface ContractAttachment {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  version: string;
  size: number;
}

interface SLATarget {
  metric: string;
  target: number;
  unit: string;
  actual?: number;
  status: 'met' | 'not-met' | 'at-risk';
}

interface PerformanceMetric {
  metric: string;
  value: number;
  trend: 'improving' | 'declining' | 'stable';
  lastMeasured: string;
}

const initialContracts: EnterpriseContract[] = [
  {
    id: 'CNT-ENT-2024-001',
    title: 'Enterprise Office Supplies Master Agreement',
    type: 'master',
    status: 'active',
    supplier: {
      id: 'SUP-ENT-001',
      name: 'Global Office Solutions Inc.',
      contact: 'Sarah Wilson'
    },
    financial: {
      value: 1000000,
      currency: 'USD',
      spendCommitted: 750000,
      spendActual: 425000,
      savingsTarget: 150000,
      savingsActual: 95000
    },
    dates: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      signedDate: '2023-12-15'
    },
    workflow: {
      currentStage: 'Active',
      approvers: ['John Smith', 'Jane Wilson'],
      requiredApprovals: ['Legal', 'Finance', 'Procurement'],
      completedApprovals: ['Legal', 'Finance', 'Procurement']
    },
    details: {
      department: 'Procurement',
      owner: 'John Smith',
      category: 'Office Supplies',
      description: 'Master agreement for enterprise office supplies procurement',
      scope: 'All office supplies, stationery, and basic equipment',
      deliverables: ['Monthly delivery schedule', 'Quarterly business reviews', 'Annual cost savings report'],
      milestones: [
        {
          id: 'M1',
          name: 'Q1 Review',
          dueDate: '2024-03-31',
          status: 'completed',
          description: 'Quarterly performance review'
        }
      ]
    },
    terms: {
      paymentTerms: 'Net 30',
      deliveryTerms: '2-3 business days standard delivery',
      qualityRequirements: ['ISO 9001 certified products', 'Green/recycled materials where possible'],
      penaltyClauses: ['Late delivery penalty: 2% of order value'],
      terminationClauses: ['30-day notice for convenience', 'Immediate for cause'],
      renewalTerms: 'Auto-renewal with 90-day notice to terminate'
    },
    riskCompliance: {
      riskLevel: 'low',
      riskFactors: [],
      complianceStatus: 'compliant',
      requiredCertifications: ['Insurance Certificate', 'W-9 Form'],
      auditSchedule: 'Annual'
    },
    documents: {
      attachments: [],
      templates: ['Master Agreement Template'],
      amendments: [],
      relatedContracts: []
    },
    notifications: {
      autoRenewal: true,
      renewalNotificationDays: 90,
      expirationAlerts: true,
      milestoneAlerts: true,
      complianceAlerts: true
    },
    performance: {
      slaTargets: [
        {
          metric: 'On-time Delivery',
          target: 95,
          unit: '%',
          actual: 97.5,
          status: 'met'
        }
      ],
      performanceMetrics: [
        {
          metric: 'Cost Savings',
          value: 12.5,
          trend: 'improving',
          lastMeasured: '2024-01-15'
        }
      ]
    },
    createdDate: '2023-12-01',
    createdBy: 'John Smith',
    lastModified: '2024-01-15',
    lastModifiedBy: 'John Smith',
    version: 1
  }
];

export const useEnterpriseContracts = () => {
  const [contracts, setContracts] = useState(initialContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.type === typeFilter;
    const matchesRisk = riskFilter === 'all' || contract.riskCompliance.riskLevel === riskFilter;
    const matchesDepartment = departmentFilter === 'all' || contract.details.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesRisk && matchesDepartment;
  });

  const addContract = (contract: Omit<EnterpriseContract, 'id' | 'lastModified' | 'createdDate' | 'version'>) => {
    const newContract: EnterpriseContract = {
      ...contract,
      id: `CNT-ENT-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      version: 1
    };
    setContracts([...contracts, newContract]);
    return newContract;
  };

  const updateContract = (id: string, updates: Partial<EnterpriseContract>) => {
    setContracts(contracts.map(contract => 
      contract.id === id 
        ? { 
            ...contract, 
            ...updates, 
            lastModified: new Date().toISOString().split('T')[0],
            version: contract.version + 1 
          }
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
      const endDate = new Date(c.dates.endDate);
      const today = new Date();
      const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      return diffDays <= c.notifications.renewalNotificationDays;
    }).length;
    
    const totalValue = contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.financial.value, 0);
    const totalSavings = contracts.reduce((sum, c) => sum + c.financial.savingsActual, 0);
    const riskContracts = contracts.filter(c => c.riskCompliance.riskLevel === 'high' || c.riskCompliance.riskLevel === 'critical').length;
    const nonCompliantContracts = contracts.filter(c => c.riskCompliance.complianceStatus === 'non-compliant').length;

    return {
      totalContracts,
      activeContracts,
      expiringSoon,
      totalValue,
      totalSavings,
      riskContracts,
      nonCompliantContracts
    };
  };

  const getDepartments = () => {
    const departments = [...new Set(contracts.map(c => c.details.department))];
    return departments.sort();
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
    riskFilter,
    setRiskFilter,
    departmentFilter,
    setDepartmentFilter,
    addContract,
    updateContract,
    deleteContract,
    getContract,
    getMetrics,
    getDepartments
  };
};