
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { Package, Eye, Download, Truck } from 'lucide-react';

const SentOrdersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { purchaseOrders, receivePurchaseOrder } = usePurchaseOrders();
  const sentOrders = purchaseOrders.filter(order => order.status === 'sent');

  const handleReceive = (order) => {
    receivePurchaseOrder(order.id);
    toast({
      title: 'Order Received',
      description: `Purchase order ${order.id} has been marked as received.`
    });
  };

  const columns: any[] = [
    { key: 'id', header: 'Order ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      render: (value: any, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'sentDate', header: 'Sent Date', sortable: true },
    { key: 'expectedDelivery', header: 'Expected Delivery', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Sent Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Sent Orders</h2>
          <Badge className="bg-blue-100 text-blue-800">
            <Truck className="h-4 w-4 mr-1" />
            {sentOrders.length} Sent
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders Sent to Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={sentOrders}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600"
                    onClick={() => handleReceive(item)}
                  >
                    <Package className="h-4 w-4 mr-1" />
                    Receive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Track
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

export default SentOrdersPage;
