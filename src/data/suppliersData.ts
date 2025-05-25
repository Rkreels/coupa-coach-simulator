
import { Supplier } from '../types/supplier';

export const initialSuppliersData: Supplier[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    category: 'IT Services',
    status: 'active',
    riskLevel: 'low',
    spend: '$452,300',
    performance: 92,
    lastUpdated: '2023-05-15',
    email: 'contact@acme.com',
    phone: '+1-555-0123',
    address: '123 Business St, City, State 12345',
    contactPerson: 'John Smith'
  },
  {
    id: '2',
    name: 'TechSupplies Inc.',
    category: 'Hardware',
    status: 'active',
    riskLevel: 'medium',
    spend: '$310,750',
    performance: 78,
    lastUpdated: '2023-05-10',
    email: 'info@techsupplies.com',
    phone: '+1-555-0124',
    address: '456 Tech Ave, City, State 12346',
    contactPerson: 'Jane Doe'
  },
  {
    id: '3',
    name: 'Global Services Ltd.',
    category: 'Consulting',
    status: 'active',
    riskLevel: 'low',
    spend: '$275,400',
    performance: 95,
    lastUpdated: '2023-05-12',
    email: 'hello@globalservices.com',
    phone: '+1-555-0125',
    address: '789 Global Blvd, City, State 12347',
    contactPerson: 'Bob Johnson'
  }
];
