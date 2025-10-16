import { useState } from 'react';

export interface EnterpriseSupplier {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'blacklisted';
  category: string;
  tier: 'strategic' | 'preferred' | 'standard' | 'emerging';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  
  // Contact Information
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  
  // Address Information
  addresses: {
    billing: AddressInfo;
    shipping: AddressInfo;
    remitTo: AddressInfo;
  };
  
  // Financial Information
  financial: {
    paymentTerms: string;
    creditLimit: number;
    currency: string;
    taxId: string;
    dunsNumber?: string;
    bankDetails: BankDetails;
  };
  
  // Performance Metrics
  performance: {
    rating: number;
    onTimeDelivery: number;
    qualityScore: number;
    costSavings: number;
    totalOrders: number;
    totalSpend: number;
    averageOrderValue: number;
  };
  
  // Compliance & Certifications
  compliance: {
    certifications: string[];
    insuranceExpiry: string;
    w9Status: 'current' | 'expired' | 'pending';
    diversityStatus: string[];
  };
  
  // Contracts & Agreements
  contracts: SupplierContract[];
  
  // Audit Trail
  createdDate: string;
  lastModified: string;
  lastOrderDate?: string;
  lastAuditDate?: string;
  notes?: string;
}

interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode?: string;
}

interface SupplierContract {
  id: string;
  name: string;
  type: 'master' | 'purchase' | 'service' | 'framework';
  startDate: string;
  endDate: string;
  value: number;
  status: 'active' | 'expired' | 'pending' | 'terminated';
}

const initialSuppliers: EnterpriseSupplier[] = [
  {
    id: 'SUP-ENT-001',
    name: 'Global Office Solutions Inc.',
    code: 'GOS001',
    status: 'active',
    category: 'Office Supplies',
    tier: 'strategic',
    riskLevel: 'low',
    primaryContact: {
      name: 'Sarah Wilson',
      title: 'Account Manager',
      email: 'sarah.wilson@globalofficecheme.com',
      phone: '+1-555-0123'
    },
    addresses: {
      billing: {
        street: '123 Business Avenue',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      shipping: {
        street: '456 Warehouse District',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60602',
        country: 'USA'
      },
      remitTo: {
        street: '789 Finance Center',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60603',
        country: 'USA'
      }
    },
    financial: {
      paymentTerms: 'Net 30',
      creditLimit: 500000,
      currency: 'USD',
      taxId: '12-3456789',
      dunsNumber: '123456789',
      bankDetails: {
        bankName: 'First National Bank',
        accountNumber: '****-****-1234',
        routingNumber: '021000021'
      }
    },
    performance: {
      rating: 4.8,
      onTimeDelivery: 97.5,
      qualityScore: 96.2,
      costSavings: 125000,
      totalOrders: 245,
      totalSpend: 1250000,
      averageOrderValue: 5102
    },
    compliance: {
      certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'Green Business Certified'],
      insuranceExpiry: '2024-12-31',
      w9Status: 'current',
      diversityStatus: ['Women-Owned Business', 'Small Business']
    },
    contracts: [
      {
        id: 'CNT-GOS-001',
        name: 'Master Supply Agreement',
        type: 'master',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        value: 1000000,
        status: 'active'
      }
    ],
    createdDate: '2023-01-15',
    lastModified: '2024-01-15',
    lastOrderDate: '2024-01-14',
    lastAuditDate: '2023-11-15'
  }
];

export const useEnterpriseSuppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.primaryContact.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    const matchesTier = tierFilter === 'all' || supplier.tier === tierFilter;
    const matchesRisk = riskFilter === 'all' || supplier.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTier && matchesRisk;
  });

  const addSupplier = (supplier: Omit<EnterpriseSupplier, 'id' | 'lastModified' | 'createdDate'>) => {
    const newSupplier: EnterpriseSupplier = {
      ...supplier,
      id: `SUP-ENT-${String(suppliers.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setSuppliers([...suppliers, newSupplier]);
    return newSupplier;
  };

  const updateSupplier = (id: string, updates: Partial<EnterpriseSupplier>) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === id 
        ? { ...supplier, ...updates, lastModified: new Date().toISOString().split('T')[0] }
        : supplier
    ));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const getSupplier = (id: string) => {
    return suppliers.find(supplier => supplier.id === id);
  };

  const getMetrics = () => {
    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
    const strategicSuppliers = suppliers.filter(s => s.tier === 'strategic').length;
    const highRiskSuppliers = suppliers.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length;
    
    const avgRating = suppliers.reduce((sum, s) => sum + s.performance.rating, 0) / suppliers.length;
    const totalSpend = suppliers.reduce((sum, s) => sum + s.performance.totalSpend, 0);
    const avgOnTimeDelivery = suppliers.reduce((sum, s) => sum + s.performance.onTimeDelivery, 0) / suppliers.length;
    const totalCostSavings = suppliers.reduce((sum, s) => sum + s.performance.costSavings, 0);

    return {
      totalSuppliers,
      activeSuppliers,
      strategicSuppliers,
      highRiskSuppliers,
      avgRating: Number(avgRating.toFixed(1)),
      totalSpend,
      avgOnTimeDelivery: Number(avgOnTimeDelivery.toFixed(1)),
      totalCostSavings
    };
  };

  const getCategories = () => {
    const categories = [...new Set(suppliers.map(s => s.category))];
    return categories.sort();
  };

  const getTiers = () => {
    return ['strategic', 'preferred', 'standard', 'emerging'];
  };

  const getRiskLevels = () => {
    return ['low', 'medium', 'high', 'critical'];
  };

  return {
    suppliers: filteredSuppliers,
    allSuppliers: suppliers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    tierFilter,
    setTierFilter,
    riskFilter,
    setRiskFilter,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplier,
    getMetrics,
    getCategories,
    getTiers,
    getRiskLevels
  };
};