import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Eye, Download, FileText } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const ReceivedOrdersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { purchaseOrders } = usePurchaseOrders();
  const receivedOrders = purchaseOrders.filter(o => o.status === 'received');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleExport = (item: any) => {
    const blob = new Blob([JSON.stringify(item, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `receipt-${item.id}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: `${item.id} exported.` });
  };

  const columns: any[] = [
    { key: 'id', header: 'Order ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (v: any, item: any) => `${item.currency} ${v.toLocaleString()}` },
    { key: 'receivedDate', header: 'Received Date', sortable: true },
    { key: 'deliveryStatus', header: 'Delivery Status', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Order Details', fields: [
      { label: 'Order ID', value: selectedItem.id },
      { label: 'Status', value: 'Received', type: 'badge' as const, badgeColor: 'bg-emerald-100 text-emerald-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Vendor', value: selectedItem.vendor },
      { label: 'Department', value: selectedItem.department },
      { label: 'Requestor', value: selectedItem.requestor },
      { label: 'Delivery Status', value: selectedItem.deliveryStatus },
    ]},
    { title: 'Dates & Financial', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Received Date', value: selectedItem.receivedDate },
      { label: 'Expected Delivery', value: selectedItem.expectedDelivery },
      { label: 'Actual Delivery', value: selectedItem.actualDelivery },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Received Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Received Orders</h2>
          <Badge className="bg-emerald-100 text-emerald-800"><CheckCircle2 className="h-4 w-4 mr-1" />{receivedOrders.length} Received</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Orders Successfully Received</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={receivedOrders} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport(item)}><Download className="h-4 w-4 mr-1" />Export</Button>
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

export default ReceivedOrdersPage;