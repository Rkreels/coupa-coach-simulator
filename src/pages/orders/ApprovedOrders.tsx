import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { Send, Eye, Download } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const ApprovedOrdersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { purchaseOrders, sendPurchaseOrder } = usePurchaseOrders();
  const approvedOrders = purchaseOrders.filter(o => o.status === 'approved');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleSend = (order: any) => {
    sendPurchaseOrder(order.id);
    toast({ title: 'Order Sent', description: `${order.id} sent to ${order.vendor}.` });
  };
  const handleExport = (order: any) => {
    const blob = new Blob([JSON.stringify(order, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${order.id}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'PDF Exported', description: `${order.id} exported.` });
  };

  const columns: any[] = [
    { key: 'id', header: 'Order ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (v: number, item: any) => `${item.currency} ${v.toLocaleString()}` },
    { key: 'approvedDate', header: 'Approved Date', sortable: true },
    { key: 'expectedDelivery', header: 'Expected Delivery', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Order Details', fields: [
      { label: 'Order ID', value: selectedItem.id },
      { label: 'Status', value: 'Approved', type: 'badge' as const, badgeColor: 'bg-green-100 text-green-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Vendor', value: selectedItem.vendor },
      { label: 'Department', value: selectedItem.department },
      { label: 'Requestor', value: selectedItem.requestor },
      { label: 'Priority', value: selectedItem.priority, type: 'badge' as const },
    ]},
    { title: 'Financial & Dates', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Approved Date', value: selectedItem.approvedDate },
      { label: 'Expected Delivery', value: selectedItem.expectedDelivery },
      { label: 'Created', value: selectedItem.dateCreated },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Approved Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Approved Orders</h2>
          <Badge className="bg-green-100 text-green-800">{approvedOrders.length} Approved</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Ready to Send</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={approvedOrders} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" className="text-blue-600" onClick={() => handleSend(item)}><Send className="h-4 w-4 mr-1" />Send</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport(item)}><Download className="h-4 w-4 mr-1" />PDF</Button>
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

export default ApprovedOrdersPage;