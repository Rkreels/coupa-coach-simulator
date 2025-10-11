
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { Send, Eye, Download } from 'lucide-react';

const ApprovedOrdersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { purchaseOrders, sendPurchaseOrder } = usePurchaseOrders();
  const approvedOrders = purchaseOrders.filter(order => order.status === 'approved');

  const handleSend = (order) => {
    sendPurchaseOrder(order.id);
    toast({
      title: 'Order Sent',
      description: `Purchase order ${order.id} has been sent to ${order.vendor}.`
    });
  };

  const columns = [
    { key: 'id' as const, header: 'Order ID', sortable: true },
    { key: 'title' as const, header: 'Title', sortable: true },
    { key: 'vendor' as const, header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount' as const, 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'approvedDate' as const, header: 'Approved Date', sortable: true },
    { key: 'expectedDelivery' as const, header: 'Expected Delivery', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Approved Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Approved Orders</h2>
          <Badge className="bg-green-100 text-green-800">
            {approvedOrders.length} Approved
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ready to Send</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={approvedOrders}
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
                    onClick={() => handleSend(item)}
                    className="text-blue-600"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
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

export default ApprovedOrdersPage;
