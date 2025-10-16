import { ApplicationLayout } from '@/components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Copy, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface DuplicateInvoice {
  id: string;
  invoiceNumber1: string;
  invoiceNumber2: string;
  supplier: string;
  amount: number;
  similarity: number;
  detectedDate: string;
  status: 'pending' | 'resolved' | 'confirmed-duplicate';
}

const mockData: DuplicateInvoice[] = [
  {
    id: '1',
    invoiceNumber1: 'INV-2025-001',
    invoiceNumber2: 'INV-2025-002',
    supplier: 'Tech Solutions Ltd',
    amount: 12500.00,
    similarity: 98,
    detectedDate: '2025-10-14',
    status: 'pending'
  }
];

export default function DuplicateInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<DuplicateInvoice[]>(mockData);

  const columns: any[] = [
    {
      accessorKey: 'invoiceNumber1',
      header: 'Invoice #1',
    },
    {
      accessorKey: 'invoiceNumber2',
      header: 'Invoice #2',
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => `$${row.original.amount.toLocaleString()}`
    },
    {
      accessorKey: 'similarity',
      header: 'Match %',
      cell: ({ row }: any) => (
        <Badge variant={row.original.similarity > 90 ? 'destructive' : 'default'}>
          {row.original.similarity}%
        </Badge>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'confirmed-duplicate' ? 'destructive' : row.original.status === 'pending' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      )
    }
  ];

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Duplicate Invoice Detection</h1>
          <p className="text-muted-foreground">Identify and prevent duplicate payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Duplicates</CardTitle>
              <Copy className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Duplicates</CardTitle>
              <Copy className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amount Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45K</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Duplicate Invoices</CardTitle>
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
