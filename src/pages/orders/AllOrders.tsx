
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { Plus, Eye, Edit, Trash } from 'lucide-react';

const AllOrdersPage = () => {
  const { purchaseOrders, totalCount, metrics } = usePurchaseOrders();

  const columns = [
    { key: 'id' as const, header: 'Order ID', sortable: true },
    { key: 'title' as const, header: 'Title', sortable: true },
    { 
      key: 'status' as const, 
      header: 'Status', 
      render: (value: string) => (
        <Badge className={
          value === 'approved' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }>
          {value}
        </Badge>
      )
    },
    { key: 'vendor' as const, header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount' as const, 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'expectedDelivery' as const, header: 'Expected Delivery', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="All Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Purchase Orders</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-sm text-gray-500">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">{metrics.pending}</div>
              <p className="text-sm text-gray-500">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{metrics.approved}</div>
              <p className="text-sm text-gray-500">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</div>
              <p className="text-sm text-gray-500">Total Value</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={purchaseOrders}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default AllOrdersPage;
