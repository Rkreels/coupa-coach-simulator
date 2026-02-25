import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { Package, Eye, Truck } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const SentOrdersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { purchaseOrders, receivePurchaseOrder } = usePurchaseOrders();
  const sentOrders = purchaseOrders.filter(o => o.status === 'sent');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleReceive = (order: any) => {
    receivePurchaseOrder(order.id);
    toast({ title: 'Order Received', description: `${order.id} marked as received.` });
  };

  const columns: any[] = [
    { key: 'id', header: 'Order ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (v: any, item: any) => `${item.currency} ${v.toLocaleString()}` },
    { key: 'sentDate', header: 'Sent Date', sortable: true },
    { key: 'expectedDelivery', header: 'Expected Delivery', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Order Details', fields: [
      { label: 'Order ID', value: selectedItem.id },
      { label: 'Status', value: 'Sent', type: 'badge' as const, badgeColor: 'bg-blue-100 text-blue-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Vendor', value: selectedItem.vendor },
      { label: 'Department', value: selectedItem.department },
      { label: 'Requestor', value: selectedItem.requestor },
      { label: 'Priority', value: selectedItem.priority, type: 'badge' as const },
    ]},
    { title: 'Shipping & Dates', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Sent Date', value: selectedItem.sentDate },
      { label: 'Expected Delivery', value: selectedItem.expectedDelivery },
      { label: 'Notes', value: selectedItem.notes },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Sent Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Sent Orders</h2>
          <Badge className="bg-blue-100 text-blue-800"><Truck className="h-4 w-4 mr-1" />{sentOrders.length} Sent</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Orders Sent to Vendors</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={sentOrders} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleReceive(item)}><Package className="h-4 w-4 mr-1" />Receive</Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.title || ''} subtitle={selectedItem?.id} sections={viewSections} />
    </ApplicationLayout>
  );
};

export default SentOrdersPage;