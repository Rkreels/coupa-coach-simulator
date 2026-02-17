
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
  { id: 'SUP-001', name: 'Office Supplies Co.', code: 'OSC001', status: 'active', category: 'Office Supplies', contactPerson: 'Sarah Wilson', email: 'sarah@officesupplies.com', phone: '+1-555-0123', address: { street: '123 Business Ave', city: 'Chicago', state: 'IL', zipCode: '60601', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 50000, currency: 'USD', taxId: '12-3456789', bankDetails: { bankName: 'First National Bank', accountNumber: '1234567890', routingNumber: '021000021' }, certifications: ['ISO 9001', 'Green Certified'], performance: { rating: 4.5, onTimeDelivery: 95, qualityScore: 92, totalOrders: 156, totalSpend: 75000 }, contracts: [{ id: 'CON-001', name: 'Master Supply Agreement', type: 'master', startDate: '2024-01-01', endDate: '2024-12-31', value: 100000, status: 'active' }], lastOrderDate: '2024-01-15', createdDate: '2023-01-01', lastModified: '2024-01-15' },
  { id: 'SUP-002', name: 'TechCorp Solutions', code: 'TCS002', status: 'active', category: 'IT Equipment', contactPerson: 'Mike Rodriguez', email: 'mike@techcorp.com', phone: '+1-555-0456', address: { street: '456 Tech Street', city: 'San Francisco', state: 'CA', zipCode: '94105', country: 'USA' }, paymentTerms: 'Net 45', creditLimit: 200000, currency: 'USD', taxId: '98-7654321', bankDetails: { bankName: 'Silicon Valley Bank', accountNumber: '9876543210', routingNumber: '121000248' }, certifications: ['ISO 27001', 'SOC 2'], performance: { rating: 4.8, onTimeDelivery: 98, qualityScore: 96, totalOrders: 89, totalSpend: 250000 }, contracts: [{ id: 'CON-002', name: 'IT Services Framework', type: 'framework', startDate: '2024-01-01', endDate: '2025-12-31', value: 500000, status: 'active' }], lastOrderDate: '2024-01-12', createdDate: '2023-06-15', lastModified: '2024-01-12' },
  { id: 'SUP-003', name: 'Dell Technologies', code: 'DEL003', status: 'active', category: 'IT Equipment', contactPerson: 'Jennifer Lee', email: 'jlee@dell.com', phone: '+1-555-0789', address: { street: '1 Dell Way', city: 'Round Rock', state: 'TX', zipCode: '78682', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 500000, currency: 'USD', taxId: '13-2658599', bankDetails: { bankName: 'Bank of America', accountNumber: '4567890123', routingNumber: '111000025' }, certifications: ['ISO 9001', 'ISO 14001', 'EPEAT Gold'], performance: { rating: 4.7, onTimeDelivery: 96, qualityScore: 95, totalOrders: 234, totalSpend: 580000 }, contracts: [{ id: 'CON-003', name: 'Hardware Purchase Agreement', type: 'purchase', startDate: '2024-01-15', endDate: '2025-01-14', value: 750000, status: 'active' }], lastOrderDate: '2024-02-01', createdDate: '2022-03-10', lastModified: '2024-02-01' },
  { id: 'SUP-004', name: 'CleanCorp', code: 'CLN004', status: 'active', category: 'Services', contactPerson: 'Robert Martinez', email: 'robert@cleancorp.com', phone: '+1-555-0234', address: { street: '789 Service Blvd', city: 'Chicago', state: 'IL', zipCode: '60605', country: 'USA' }, paymentTerms: 'Net 15', creditLimit: 25000, currency: 'USD', taxId: '45-6789012', bankDetails: { bankName: 'Chase Bank', accountNumber: '3456789012', routingNumber: '021000021' }, certifications: ['Green Seal Certified'], performance: { rating: 4.2, onTimeDelivery: 100, qualityScore: 88, totalOrders: 48, totalSpend: 35000 }, contracts: [{ id: 'CON-004', name: 'Cleaning Services', type: 'service', startDate: '2024-01-01', endDate: '2024-12-31', value: 25000, status: 'active' }], lastOrderDate: '2024-01-28', createdDate: '2023-06-01', lastModified: '2024-01-28' },
  { id: 'SUP-005', name: 'AWS Cloud Services', code: 'AWS005', status: 'active', category: 'Cloud Services', contactPerson: 'Amanda Chen', email: 'enterprise@aws.com', phone: '+1-555-0345', address: { street: '410 Terry Ave N', city: 'Seattle', state: 'WA', zipCode: '98109', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 1000000, currency: 'USD', taxId: '91-1646860', bankDetails: { bankName: 'US Bank', accountNumber: '7890123456', routingNumber: '073000545' }, certifications: ['SOC 2', 'ISO 27001', 'FedRAMP'], performance: { rating: 4.9, onTimeDelivery: 99, qualityScore: 98, totalOrders: 12, totalSpend: 340000 }, contracts: [], lastOrderDate: '2024-02-01', createdDate: '2023-02-01', lastModified: '2024-02-01' },
  { id: 'SUP-006', name: 'Creative Minds Agency', code: 'CMA006', status: 'active', category: 'Marketing', contactPerson: 'Lisa Park', email: 'lisa@creativeminds.com', phone: '+1-555-0567', address: { street: '321 Creative Ave', city: 'New York', state: 'NY', zipCode: '10012', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 100000, currency: 'USD', taxId: '23-4567890', bankDetails: { bankName: 'Citibank', accountNumber: '2345678901', routingNumber: '021000089' }, certifications: [], performance: { rating: 4.4, onTimeDelivery: 92, qualityScore: 94, totalOrders: 36, totalSpend: 165000 }, contracts: [], lastOrderDate: '2024-01-31', createdDate: '2023-04-15', lastModified: '2024-01-31' },
  { id: 'SUP-007', name: 'SecureForce Inc.', code: 'SFI007', status: 'active', category: 'Security', contactPerson: 'David Brown', email: 'david@secureforce.com', phone: '+1-555-0678', address: { street: '555 Guard St', city: 'Dallas', state: 'TX', zipCode: '75201', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 50000, currency: 'USD', taxId: '34-5678901', bankDetails: { bankName: 'Wells Fargo', accountNumber: '8901234567', routingNumber: '121000248' }, certifications: ['ASIS Certified', 'State Licensed'], performance: { rating: 4.3, onTimeDelivery: 100, qualityScore: 90, totalOrders: 24, totalSpend: 96000 }, contracts: [], lastOrderDate: '2024-01-31', createdDate: '2023-07-01', lastModified: '2024-01-31' },
  { id: 'SUP-008', name: 'Print Solutions Inc', code: 'PSI008', status: 'active', category: 'Marketing', contactPerson: 'Karen Thompson', email: 'karen@printsolutions.com', phone: '+1-555-0890', address: { street: '100 Print Lane', city: 'Atlanta', state: 'GA', zipCode: '30301', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 30000, currency: 'USD', taxId: '56-7890123', bankDetails: { bankName: 'PNC Bank', accountNumber: '0123456789', routingNumber: '043000096' }, certifications: ['FSC Certified'], performance: { rating: 4.1, onTimeDelivery: 90, qualityScore: 91, totalOrders: 62, totalSpend: 45000 }, contracts: [], lastOrderDate: '2024-01-20', createdDate: '2023-03-01', lastModified: '2024-01-20' },
  { id: 'SUP-009', name: 'Baker & Associates LLP', code: 'BAL009', status: 'active', category: 'Legal Services', contactPerson: 'John Baker', email: 'jbaker@bakerassoc.com', phone: '+1-555-0901', address: { street: '200 Legal Plaza', city: 'Washington', state: 'DC', zipCode: '20001', country: 'USA' }, paymentTerms: 'Net 45', creditLimit: 200000, currency: 'USD', taxId: '67-8901234', bankDetails: { bankName: 'TD Bank', accountNumber: '1234509876', routingNumber: '031101266' }, certifications: [], performance: { rating: 4.6, onTimeDelivery: 95, qualityScore: 97, totalOrders: 18, totalSpend: 180000 }, contracts: [], lastOrderDate: '2024-02-15', createdDate: '2022-09-01', lastModified: '2024-02-15' },
  { id: 'SUP-010', name: 'Gourmet Corporate Catering', code: 'GCC010', status: 'active', category: 'Catering', contactPerson: 'Maria Garcia', email: 'maria@gourmetcorp.com', phone: '+1-555-1012', address: { street: '50 Food Court', city: 'Chicago', state: 'IL', zipCode: '60607', country: 'USA' }, paymentTerms: 'Net 15', creditLimit: 25000, currency: 'USD', taxId: '78-9012345', bankDetails: { bankName: 'BMO Harris', accountNumber: '5678901234', routingNumber: '071000013' }, certifications: ['Food Safety Certified', 'Organic Certified'], performance: { rating: 4.4, onTimeDelivery: 97, qualityScore: 93, totalOrders: 42, totalSpend: 48000 }, contracts: [], lastOrderDate: '2024-02-08', createdDate: '2023-05-01', lastModified: '2024-02-08' },
  { id: 'SUP-011', name: 'Enterprise Fleet Management', code: 'EFM011', status: 'active', category: 'Fleet', contactPerson: 'Thomas Wright', email: 'twright@efleet.com', phone: '+1-555-1123', address: { street: '900 Motor Pkwy', city: 'St. Louis', state: 'MO', zipCode: '63101', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 500000, currency: 'USD', taxId: '89-0123456', bankDetails: { bankName: 'US Bank', accountNumber: '6789012345', routingNumber: '081000210' }, certifications: ['ISO 14001'], performance: { rating: 4.5, onTimeDelivery: 98, qualityScore: 94, totalOrders: 12, totalSpend: 420000 }, contracts: [], lastOrderDate: '2024-02-01', createdDate: '2022-01-15', lastModified: '2024-02-01' },
  { id: 'SUP-012', name: 'SAP Licensing Corp', code: 'SAP012', status: 'active', category: 'Software', contactPerson: 'Hans Mueller', email: 'hmueller@sap.com', phone: '+1-555-1234', address: { street: '3999 West Chester', city: 'Newtown Square', state: 'PA', zipCode: '19073', country: 'USA' }, paymentTerms: 'Net 60', creditLimit: 2000000, currency: 'USD', taxId: '90-1234567', bankDetails: { bankName: 'Deutsche Bank', accountNumber: '7890123456', routingNumber: '021000018' }, certifications: ['ISO 27001', 'SOC 2'], performance: { rating: 4.3, onTimeDelivery: 100, qualityScore: 92, totalOrders: 4, totalSpend: 1200000 }, contracts: [], lastOrderDate: '2024-01-01', createdDate: '2021-06-01', lastModified: '2024-01-01' },
  { id: 'SUP-013', name: 'MedEquip Solutions', code: 'MES013', status: 'pending', category: 'Medical Equipment', contactPerson: 'Dr. Sarah Collins', email: 'scollins@medequip.com', phone: '+1-555-1345', address: { street: '400 Health Way', city: 'Boston', state: 'MA', zipCode: '02101', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 150000, currency: 'USD', taxId: '01-2345678', bankDetails: { bankName: 'State Street Bank', accountNumber: '8901234567', routingNumber: '011000028' }, certifications: ['FDA Approved', 'ISO 13485'], performance: { rating: 0, onTimeDelivery: 0, qualityScore: 0, totalOrders: 0, totalSpend: 0 }, contracts: [], createdDate: '2024-02-10', lastModified: '2024-02-10' },
  { id: 'SUP-014', name: 'Talent First Staffing', code: 'TFS014', status: 'pending', category: 'Staffing', contactPerson: 'Rachel Kim', email: 'rkim@talentfirst.com', phone: '+1-555-1456', address: { street: '600 HR Plaza', city: 'New York', state: 'NY', zipCode: '10016', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 300000, currency: 'USD', taxId: '12-3456780', bankDetails: { bankName: 'HSBC', accountNumber: '9012345678', routingNumber: '021001088' }, certifications: ['SIA Certified'], performance: { rating: 0, onTimeDelivery: 0, qualityScore: 0, totalOrders: 0, totalSpend: 0 }, contracts: [], createdDate: '2024-02-15', lastModified: '2024-02-15' },
  { id: 'SUP-015', name: 'Verizon Business', code: 'VBZ015', status: 'active', category: 'Telecom', contactPerson: 'Mark Stevens', email: 'mstevens@verizon.com', phone: '+1-555-1567', address: { street: '1 Verizon Way', city: 'Basking Ridge', state: 'NJ', zipCode: '07920', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 200000, currency: 'USD', taxId: '23-4567891', bankDetails: { bankName: 'JP Morgan Chase', accountNumber: '0123456780', routingNumber: '021000021' }, certifications: ['SOC 2', 'ISO 27001'], performance: { rating: 4.2, onTimeDelivery: 97, qualityScore: 90, totalOrders: 24, totalSpend: 156000 }, contracts: [], lastOrderDate: '2024-02-01', createdDate: '2022-08-01', lastModified: '2024-02-01' },
  { id: 'SUP-016', name: 'IndustrialRack Systems', code: 'IRS016', status: 'active', category: 'Warehouse Equipment', contactPerson: 'Frank Miller', email: 'fmiller@industrialrack.com', phone: '+1-555-1678', address: { street: '800 Industrial Blvd', city: 'Columbus', state: 'OH', zipCode: '43201', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 100000, currency: 'USD', taxId: '34-5678902', bankDetails: { bankName: 'KeyBank', accountNumber: '1234567891', routingNumber: '041001039' }, certifications: ['ISO 9001'], performance: { rating: 4.0, onTimeDelivery: 88, qualityScore: 91, totalOrders: 8, totalSpend: 52000 }, contracts: [], lastOrderDate: '2024-01-15', createdDate: '2023-09-01', lastModified: '2024-01-15' },
  { id: 'SUP-017', name: 'EcoWaste Solutions', code: 'EWS017', status: 'active', category: 'Waste Management', contactPerson: 'Nancy Green', email: 'ngreen@ecowaste.com', phone: '+1-555-1789', address: { street: '150 Eco Lane', city: 'Denver', state: 'CO', zipCode: '80201', country: 'USA' }, paymentTerms: 'Net 15', creditLimit: 20000, currency: 'USD', taxId: '45-6789013', bankDetails: { bankName: 'FirstBank', accountNumber: '2345678902', routingNumber: '107005047' }, certifications: ['EPA Certified', 'R2 Certified'], performance: { rating: 4.1, onTimeDelivery: 100, qualityScore: 87, totalOrders: 48, totalSpend: 36000 }, contracts: [], lastOrderDate: '2024-02-01', createdDate: '2023-04-01', lastModified: '2024-02-01' },
  { id: 'SUP-018', name: 'SafetyFirst Supplies', code: 'SFS018', status: 'inactive', category: 'Safety Equipment', contactPerson: 'Bill Harper', email: 'bharper@safetyfirst.com', phone: '+1-555-1890', address: { street: '300 Safety Rd', city: 'Houston', state: 'TX', zipCode: '77001', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 40000, currency: 'USD', taxId: '56-7890124', bankDetails: { bankName: 'Frost Bank', accountNumber: '3456789013', routingNumber: '114000093' }, certifications: ['OSHA Compliant'], performance: { rating: 3.5, onTimeDelivery: 82, qualityScore: 78, totalOrders: 22, totalSpend: 28000 }, contracts: [], lastOrderDate: '2023-09-15', createdDate: '2022-06-01', lastModified: '2023-12-01', notes: 'Deactivated due to poor delivery performance' },
  { id: 'SUP-019', name: 'BuildRight Contractors', code: 'BRC019', status: 'pending', category: 'Construction', contactPerson: 'Steve Johnson', email: 'sjohnson@buildright.com', phone: '+1-555-1901', address: { street: '500 Build Ave', city: 'Phoenix', state: 'AZ', zipCode: '85001', country: 'USA' }, paymentTerms: 'Net 45', creditLimit: 500000, currency: 'USD', taxId: '67-8901235', bankDetails: { bankName: 'Western Alliance', accountNumber: '4567890124', routingNumber: '122105278' }, certifications: ['LEED Certified', 'Bonded & Insured'], performance: { rating: 0, onTimeDelivery: 0, qualityScore: 0, totalOrders: 0, totalSpend: 0 }, contracts: [], createdDate: '2024-02-05', lastModified: '2024-02-05' },
  { id: 'SUP-020', name: 'PowerGen Parts Inc', code: 'PGP020', status: 'suspended', category: 'Electrical Equipment', contactPerson: 'George Adams', email: 'gadams@powergen.com', phone: '+1-555-2012', address: { street: '700 Power Dr', city: 'Nashville', state: 'TN', zipCode: '37201', country: 'USA' }, paymentTerms: 'Net 30', creditLimit: 75000, currency: 'USD', taxId: '78-9012346', bankDetails: { bankName: 'Regions Bank', accountNumber: '5678901235', routingNumber: '062000019' }, certifications: ['UL Listed'], performance: { rating: 3.2, onTimeDelivery: 75, qualityScore: 80, totalOrders: 15, totalSpend: 42000 }, contracts: [], lastOrderDate: '2024-01-10', createdDate: '2023-01-15', lastModified: '2024-02-18', notes: 'Suspended - pricing dispute on invoice VEN-019-2024' }
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
