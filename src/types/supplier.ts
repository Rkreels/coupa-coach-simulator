
export interface Supplier {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  riskLevel: 'low' | 'medium' | 'high';
  spend: string;
  performance: number;
  lastUpdated: string;
  email?: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
}
