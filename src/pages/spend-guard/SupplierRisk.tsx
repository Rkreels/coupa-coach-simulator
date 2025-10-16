import { ApplicationLayout } from '@/components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown, Users } from 'lucide-react';
import { useState } from 'react';

interface SupplierRisk {
  id: string;
  supplierName: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskScore: number;
  issues: string[];
  totalSpend: number;
  lastAudit: string;
  status: 'active' | 'on-hold' | 'terminated';
}

const mockData: SupplierRisk[] = [
  {
    id: '1',
    supplierName: 'Global Tech Supplies',
    riskLevel: 'high',
    riskScore: 78,
    issues: ['Late deliveries', 'Quality concerns'],
    totalSpend: 250000,
    lastAudit: '2025-09-15',
    status: 'on-hold'
  },
  {
    id: '2',
    supplierName: 'Office Solutions Pro',
    riskLevel: 'medium',
    riskScore: 45,
    issues: ['Price increases'],
    totalSpend: 125000,
    lastAudit: '2025-10-01',
    status: 'active'
  }
];

export default function SupplierRiskPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<SupplierRisk[]>(mockData);

  const columns: any[] = [
    {
      accessorKey: 'supplierName',
      header: 'Supplier Name',
    },
    {
      accessorKey: 'riskScore',
      header: 'Risk Score',
      cell: ({ row }: any) => (
        <Badge variant={row.original.riskScore > 70 ? 'destructive' : row.original.riskScore > 40 ? 'default' : 'secondary'}>
          {row.original.riskScore}
        </Badge>
      )
    },
    {
      accessorKey: 'riskLevel',
      header: 'Risk Level',
      cell: ({ row }: any) => (
        <Badge variant={row.original.riskLevel === 'high' ? 'destructive' : row.original.riskLevel === 'medium' ? 'default' : 'secondary'}>
          {row.original.riskLevel}
        </Badge>
      )
    },
    {
      accessorKey: 'issues',
      header: 'Key Issues',
      cell: ({ row }: any) => row.original.issues.join(', ')
    },
    {
      accessorKey: 'totalSpend',
      header: 'Total Spend',
      cell: ({ row }: any) => `$${row.original.totalSpend.toLocaleString()}`
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'active' ? 'secondary' : row.original.status === 'on-hold' ? 'default' : 'destructive'}>
          {row.original.status}
        </Badge>
      )
    }
  ];

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Supplier Risk Assessment</h1>
          <p className="text-muted-foreground">Assess and monitor supplier compliance risks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Suppliers</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suppliers On Hold</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supplier Risk Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
}
