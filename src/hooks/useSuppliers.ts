
import { useState } from 'react';

export interface Supplier {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentTerms: string;
  creditLimit: number;
  currency: string;
  taxId: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  };
  certifications: string[];
  performance: {
    rating: number;
    onTimeDelivery: number;
    qualityScore: number;
    totalOrders: number;
    totalSpend: number;
  };
  contracts: SupplierContract[];
  lastOrderDate?: string;
  createdDate: string;
  lastModified: string;
  notes?: string;
}

export interface SupplierContract {
  id: string;
  name: string;
  type: 'master' | 'purchase' | 'service' | 'framework';
  startDate: string;
  endDate: string;
  value: number;
  status: 'active' | 'expired' | 'pending' | 'terminated';
}

const initialSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Office Supplies Co.',
    code: 'OSC001',
    status: 'active',
    category: 'Office Supplies',
    contactPerson: 'Sarah Wilson',
    email: 'sarah@officesupplies.com',
    phone: '+1-555-0123',
    address: {
      street: '123 Business Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    paymentTerms: 'Net 30',
    creditLimit: 50000,
    currency: 'USD',
    taxId: '12-3456789',
    bankDetails: {
      bankName: 'First National Bank',
      accountNumber: '1234567890',
      routingNumber: '021000021'
    },
    certifications: ['ISO 9001', 'Green Certified'],
    performance: {
      rating: 4.5,
      onTimeDelivery: 95,
      qualityScore: 92,
      totalOrders: 156,
      totalSpend: 75000
    },
    contracts: [
      {
        id: 'CON-001',
        name: 'Master Supply Agreement',
        type: 'master',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        value: 100000,
        status: 'active'
      }
    ],
    lastOrderDate: '2024-01-15',
    createdDate: '2023-01-01',
    lastModified: '2024-01-15'
  },
  {
    id: 'SUP-002',
    name: 'TechCorp Solutions',
    code: 'TCS002',
    status: 'active',
    category: 'IT Equipment',
    contactPerson: 'Mike Rodriguez',
    email: 'mike@techcorp.com',
    phone: '+1-555-0456',
    address: {
      street: '456 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    paymentTerms: 'Net 45',
    creditLimit: 200000,
    currency: 'USD',
    taxId: '98-7654321',
    bankDetails: {
      bankName: 'Silicon Valley Bank',
      accountNumber: '9876543210',
      routingNumber: '121000248'
    },
    certifications: ['ISO 27001', 'SOC 2'],
    performance: {
      rating: 4.8,
      onTimeDelivery: 98,
      qualityScore: 96,
      totalOrders: 89,
      totalSpend: 250000
    },
    contracts: [
      {
        id: 'CON-002',
        name: 'IT Services Framework',
        type: 'framework',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        value: 500000,
        status: 'active'
      }
    ],
    lastOrderDate: '2024-01-12',
    createdDate: '2023-06-15',
    lastModified: '2024-01-12'
  }
];

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const addSupplier = (supplier: Omit<Supplier, 'id' | 'lastModified'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: `SUP-${String(suppliers.length + 1).padStart(3, '0')}`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setSuppliers([...suppliers, newSupplier]);
    return newSupplier;
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
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
    const pendingSuppliers = suppliers.filter(s => s.status === 'pending').length;
    const suspendedSuppliers = suppliers.filter(s => s.status === 'suspended').length;
    const avgRating = suppliers.reduce((sum, s) => sum + s.performance.rating, 0) / suppliers.length;
    const totalSpend = suppliers.reduce((sum, s) => sum + s.performance.totalSpend, 0);
    const avgOnTimeDelivery = suppliers.reduce((sum, s) => sum + s.performance.onTimeDelivery, 0) / suppliers.length;

    return {
      totalSuppliers,
      activeSuppliers,
      pendingSuppliers,
      suspendedSuppliers,
      avgRating: Number(avgRating.toFixed(1)),
      totalSpend,
      avgOnTimeDelivery: Number(avgOnTimeDelivery.toFixed(1))
    };
  };

  const getCategories = () => {
    const categories = [...new Set(suppliers.map(s => s.category))];
    return categories.sort();
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
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplier,
    getMetrics,
    getCategories
  };
};
