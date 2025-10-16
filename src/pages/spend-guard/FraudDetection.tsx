import { ApplicationLayout } from '@/components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertOctagon, Activity } from 'lucide-react';
import { useState } from 'react';

interface FraudAlert {
  id: string;
  transactionId: string;
  type: string;
  description: string;
  amount: number;
  supplier: string;
  detectedDate: string;
  riskScore: number;
  status: 'investigating' | 'confirmed' | 'cleared';
}

const mockData: FraudAlert[] = [
  {
    id: '1',
    transactionId: 'TXN-12345',
    type: 'Suspicious Pattern',
    description: 'Multiple invoices with similar amounts',
    amount: 4999.99,
    supplier: 'ABC Corp',
    detectedDate: '2025-10-15',
    riskScore: 85,
    status: 'investigating'
  }
];

export default function FraudDetectionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<FraudAlert[]>(mockData);

  const columns: any[] = [
    {
      accessorKey: 'transactionId',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'type',
      header: 'Fraud Type',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => `$${row.original.amount.toLocaleString()}`
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
    },
    {
      accessorKey: 'riskScore',
      header: 'Risk Score',
      cell: ({ row }: any) => (
        <Badge variant={row.original.riskScore > 70 ? 'destructive' : 'default'}>
          {row.original.riskScore}%
        </Badge>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'confirmed' ? 'destructive' : row.original.status === 'investigating' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      )
    }
  ];

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Fraud Detection</h1>
          <p className="text-muted-foreground">Monitor suspicious transactions and patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investigations</CardTitle>
              <AlertOctagon className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Fraud</CardTitle>
              <Shield className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125K</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fraud Alerts</CardTitle>
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
