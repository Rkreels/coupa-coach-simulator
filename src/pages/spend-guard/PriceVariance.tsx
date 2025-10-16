import { ApplicationLayout } from '@/components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface PriceVariance {
  id: string;
  supplier: string;
  item: string;
  baselinePrice: number;
  currentPrice: number;
  variance: number;
  variancePercent: number;
  lastUpdated: string;
  status: 'high' | 'medium' | 'low';
}

const mockData: PriceVariance[] = [
  {
    id: '1',
    supplier: 'Office Supplies Inc',
    item: 'A4 Paper Box',
    baselinePrice: 25.00,
    currentPrice: 35.00,
    variance: 10.00,
    variancePercent: 40,
    lastUpdated: '2025-10-15',
    status: 'high'
  },
  {
    id: '2',
    supplier: 'Tech Hardware Co',
    item: 'USB Flash Drive 32GB',
    baselinePrice: 15.00,
    currentPrice: 18.00,
    variance: 3.00,
    variancePercent: 20,
    lastUpdated: '2025-10-14',
    status: 'medium'
  }
];

export default function PriceVariancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<PriceVariance[]>(mockData);

  const columns: any[] = [
    {
      accessorKey: 'supplier',
      header: 'Supplier',
    },
    {
      accessorKey: 'item',
      header: 'Item',
    },
    {
      accessorKey: 'baselinePrice',
      header: 'Baseline Price',
      cell: ({ row }: any) => `$${row.original.baselinePrice.toFixed(2)}`
    },
    {
      accessorKey: 'currentPrice',
      header: 'Current Price',
      cell: ({ row }: any) => `$${row.original.currentPrice.toFixed(2)}`
    },
    {
      accessorKey: 'variance',
      header: 'Variance',
      cell: ({ row }: any) => (
        <span className={row.original.variance > 0 ? 'text-red-600' : 'text-green-600'}>
          {row.original.variance > 0 ? <TrendingUp className="inline w-4 h-4" /> : <TrendingDown className="inline w-4 h-4" />}
          ${Math.abs(row.original.variance).toFixed(2)} ({row.original.variancePercent}%)
        </span>
      )
    },
    {
      accessorKey: 'status',
      header: 'Risk Level',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'high' ? 'destructive' : row.original.status === 'medium' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      )
    },
    {
      accessorKey: 'lastUpdated',
      header: 'Last Updated',
    }
  ];

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Price Variance Monitoring</h1>
            <p className="text-muted-foreground">Track unusual price changes and deviations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Items with &gt;30% variance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Price Increase</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">Across all monitored items</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monitored Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">Active price tracking</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Price Variance Alerts</CardTitle>
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
