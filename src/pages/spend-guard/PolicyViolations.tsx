import { ApplicationLayout } from '@/components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { FileWarning, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface PolicyViolation {
  id: string;
  violationType: string;
  description: string;
  user: string;
  department: string;
  amount: number;
  date: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'reviewing' | 'resolved';
}

const mockData: PolicyViolation[] = [
  {
    id: '1',
    violationType: 'Exceeds Budget Limit',
    description: 'Purchase order exceeds departmental budget',
    user: 'Jane Doe',
    department: 'Marketing',
    amount: 15000,
    date: '2025-10-14',
    severity: 'high',
    status: 'open'
  }
];

export default function PolicyViolationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<PolicyViolation[]>(mockData);

  const columns: any[] = [
    {
      accessorKey: 'violationType',
      header: 'Violation Type',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'user',
      header: 'User',
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => `$${row.original.amount.toLocaleString()}`
    },
    {
      accessorKey: 'severity',
      header: 'Severity',
      cell: ({ row }: any) => (
        <Badge variant={row.original.severity === 'critical' || row.original.severity === 'high' ? 'destructive' : 'default'}>
          {row.original.severity}
        </Badge>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'open' ? 'destructive' : row.original.status === 'reviewing' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      )
    }
  ];

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Policy Violations</h1>
          <p className="text-muted-foreground">Track spending policy compliance issues</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Violations</CardTitle>
              <FileWarning className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Policy Violation Cases</CardTitle>
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
