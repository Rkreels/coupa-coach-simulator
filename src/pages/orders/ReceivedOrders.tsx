
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { CheckCircle2, Eye, Download, FileText } from 'lucide-react';

const ReceivedOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { purchaseOrders } = usePurchaseOrders();
  const receivedOrders = purchaseOrders.filter(order => order.status === 'received');

  const columns: any[] = [
    { key: 'id', header: 'Order ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
{ 
      key: 'totalAmount', 
      header: 'Amount',
      render: (value: any, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'receivedDate', header: 'Received Date', sortable: true },
    { key: 'deliveryStatus', header: 'Delivery Status', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Received Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Received Orders</h2>
          <Badge className="bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {receivedOrders.length} Received
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders Successfully Received</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={receivedOrders}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Receipt
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
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

export default ReceivedOrdersPage;
