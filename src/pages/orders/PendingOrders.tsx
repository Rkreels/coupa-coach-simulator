
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const PendingOrdersPage = () => {
  const { toast } = useToast();
  const { purchaseOrders, approvePurchaseOrder, rejectPurchaseOrder } = usePurchaseOrders();
  const pendingOrders = purchaseOrders.filter(order => order.status === 'pending');

  const handleApprove = (orderId: string) => {
    approvePurchaseOrder(orderId);
    toast({
      title: 'Order Approved',
      description: `Purchase order ${orderId} has been approved.`
    });
  };

  const handleReject = (orderId: string) => {
    rejectPurchaseOrder(orderId);
    toast({
      title: 'Order Rejected',
      description: `Purchase order ${orderId} has been rejected.`,
      variant: 'destructive'
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
    { key: 'requestor' as const, header: 'Requestor', sortable: true },
    { key: 'expectedDelivery' as const, header: 'Expected Delivery', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Pending Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Orders Pending Approval</h2>
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-4 w-4 mr-1" />
            {pendingOrders.length} Pending
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={pendingOrders}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleApprove(item.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleReject(item.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
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

export default PendingOrdersPage;
