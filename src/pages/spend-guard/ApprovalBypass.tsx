import { ApplicationLayout } from '@/components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ApprovalBypass {
  id: string;
  transactionId: string;
  type: string;
  amount: number;
  requester: string;
  bypassedLevel: string;
  date: string;
  reason: string;
  status: 'flagged' | 'reviewed' | 'approved';
}

const mockData: ApprovalBypass[] = [
  {
    id: '1',
    transactionId: 'PO-2025-789',
    type: 'Purchase Order',
    amount: 25000.00,
    requester: 'John Smith',
    bypassedLevel: 'Director Approval',
    date: '2025-10-13',
    reason: 'Emergency Purchase',
    status: 'flagged'
  }
];

export default function ApprovalBypassPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<ApprovalBypass[]>(mockData);

  const columns: any[] = [
    {
      accessorKey: 'transactionId',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => `$${row.original.amount.toLocaleString()}`
    },
    {
      accessorKey: 'requester',
      header: 'Requester',
    },
    {
      accessorKey: 'bypassedLevel',
      header: 'Bypassed Level',
    },
    {
      accessorKey: 'reason',
      header: 'Reason',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'flagged' ? 'destructive' : row.original.status === 'reviewed' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      )
    }
  ];

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Approval Bypass Monitoring</h1>
          <p className="text-muted-foreground">Monitor transactions that bypassed approval workflows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Bypasses</CardTitle>
              <ShieldAlert className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value at Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$175K</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Approval Bypass Cases</CardTitle>
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
