import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { useEnterpriseOrders } from '../../hooks/useEnterpriseOrders';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, CheckCircle, X, Clock } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const PendingOrdersPage = () => {
  const { orders, searchTerm, setSearchTerm, approveOrder, rejectOrder } = useEnterpriseOrders();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const pendingOrders = orders.filter(o => o.status === 'pending_approval');
  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleApprove = (order: any) => { approveOrder(order.id, 'USR-001', 'Approved'); toast({ title: 'Order Approved', description: `${order.number} approved.` }); };
  const handleReject = (order: any) => { rejectOrder(order.id, 'USR-001', 'Rejected'); toast({ title: 'Order Rejected', variant: 'destructive' }); };

  const columns: any[] = [
    { key: 'number', header: 'Order #', render: (value: string) => <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-yellow-500" /><span className="font-mono text-sm">{value}</span></div> },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'supplier', header: 'Supplier', render: (_: any, order: any) => order.supplier?.displayName || 'N/A' },
    { key: 'totalAmount', header: 'Amount', render: (value: number, order: any) => `${order.currency} ${value.toLocaleString()}` },
    { key: 'orderDate', header: 'Order Date', sortable: true, render: (value: string) => new Date(value).toLocaleDateString() }
  ];

  const viewSections = selectedItem ? [
    { title: 'Order Details', fields: [
      { label: 'Order Number', value: selectedItem.number },
      { label: 'Status', value: 'Pending Approval', type: 'badge' as const, badgeColor: 'bg-yellow-100 text-yellow-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Supplier', value: selectedItem.supplier?.displayName },
      { label: 'Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Order Date', value: new Date(selectedItem.orderDate).toLocaleDateString() },
      { label: 'Department', value: selectedItem.department },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Pending Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Pending Orders</h2>
            <Badge className="bg-yellow-100 text-yellow-800">{pendingOrders.length} Awaiting Approval</Badge>
          </div>
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Orders Awaiting Approval</CardTitle>
              <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search orders..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" /></div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable data={pendingOrders} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(order) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(order)}><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-green-600" onClick={() => handleApprove(order)}><CheckCircle className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleReject(order)}><X className="h-4 w-4" /></Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.title || ''} subtitle={selectedItem?.number} sections={viewSections} />
    </ApplicationLayout>
  );
};

export default PendingOrdersPage;