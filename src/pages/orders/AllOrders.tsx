import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, Edit, Trash, Search, Send, Package, Clock, CheckCircle, FileText } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';
import { FormDialog } from '@/components/ui/form-dialog';

const AllOrdersPage = () => {
  const { toast } = useToast();
  const { purchaseOrders, totalCount, metrics, sendPurchaseOrder, receivePurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = usePurchaseOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (order: any) => { setSelectedItem(order); setViewOpen(true); };
  const handleEdit = (order: any) => {
    setSelectedItem(order);
    setFormValues({ title: order.title, vendor: order.vendor, totalAmount: order.totalAmount, department: order.department, expectedDelivery: order.expectedDelivery, notes: order.notes || '', priority: order.priority });
    setEditOpen(true);
  };
  const handleEditSubmit = () => {
    if (selectedItem) { updatePurchaseOrder(selectedItem.id, formValues); toast({ title: 'Order Updated', description: `${selectedItem.id} updated.` }); setEditOpen(false); }
  };
  const handleSend = (order: any) => { sendPurchaseOrder(order.id); toast({ title: 'Order Sent', description: `${order.id} sent to ${order.vendor}.` }); };
  const handleReceive = (order: any) => { receivePurchaseOrder(order.id); toast({ title: 'Order Received', description: `${order.id} received.` }); };
  const handleDelete = (order: any) => { deletePurchaseOrder(order.id); toast({ title: 'Order Deleted', variant: 'destructive' }); };

  const editFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'vendor', label: 'Vendor', type: 'text' as const, required: true },
    { name: 'totalAmount', label: 'Amount', type: 'number' as const, required: true },
    { name: 'department', label: 'Department', type: 'text' as const },
    { name: 'priority', label: 'Priority', type: 'select' as const, options: [
      { value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }, { value: 'urgent', label: 'Urgent' }
    ]},
    { name: 'expectedDelivery', label: 'Expected Delivery', type: 'date' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ];

  const columns: any[] = [
    { key: 'id', header: 'Order ID', sortable: true, render: (value: string) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-blue-500" /><span className="font-mono text-sm">{value}</span></div> },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'status', header: 'Status', render: (value: string) => {
      const colors: Record<string, string> = { approved: 'bg-green-100 text-green-800', pending: 'bg-yellow-100 text-yellow-800', sent: 'bg-blue-100 text-blue-800', received: 'bg-emerald-100 text-emerald-800', draft: 'bg-gray-100 text-gray-800', completed: 'bg-purple-100 text-purple-800' };
      return <Badge className={colors[value] || 'bg-gray-100 text-gray-800'}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>;
    }},
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'requestor', header: 'Requestor', sortable: true },
    { key: 'expectedDelivery', header: 'Expected Delivery', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Order Overview', fields: [
      { label: 'Order ID', value: selectedItem.id },
      { label: 'Status', value: selectedItem.status, type: 'badge' as const },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Vendor', value: selectedItem.vendor },
      { label: 'Department', value: selectedItem.department },
      { label: 'Requestor', value: selectedItem.requestor },
      { label: 'Priority', value: selectedItem.priority, type: 'badge' as const },
    ]},
    { title: 'Financial & Dates', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Created', value: selectedItem.dateCreated },
      { label: 'Expected Delivery', value: selectedItem.expectedDelivery },
      { label: 'Actual Delivery', value: selectedItem.actualDelivery },
      { label: 'Sent Date', value: selectedItem.sentDate },
      { label: 'Received Date', value: selectedItem.receivedDate },
    ]},
    { title: 'Line Items', fields: selectedItem.lineItems?.map((li: any, i: number) => (
      { label: `Item ${i + 1}: ${li.itemName}`, value: `${li.quantity} x $${li.unitPrice} = $${li.totalPrice.toLocaleString()}`, span: 2 }
    )) || [] },
    { title: 'Notes', fields: [{ label: 'Notes', value: selectedItem.notes, span: 2 }] }
  ] : [];

  return (
    <ApplicationLayout pageTitle="All Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Purchase Orders Management</h2>
          <Button><Plus className="h-4 w-4 mr-2" />Create Order</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card><CardContent className="p-6"><div className="flex items-center space-x-2"><FileText className="h-5 w-5 text-blue-500" /><div><div className="text-2xl font-bold">{totalCount}</div><p className="text-sm text-gray-500">Total</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center space-x-2"><Clock className="h-5 w-5 text-yellow-500" /><div><div className="text-2xl font-bold text-yellow-600">{metrics.pending}</div><p className="text-sm text-gray-500">Pending</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center space-x-2"><CheckCircle className="h-5 w-5 text-green-500" /><div><div className="text-2xl font-bold text-green-600">{metrics.approved}</div><p className="text-sm text-gray-500">Approved</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center space-x-2"><Package className="h-5 w-5 text-purple-500" /><div><div className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</div><p className="text-sm text-gray-500">Total Value</p></div></div></CardContent></Card>
        </div>
        <Card><CardContent className="p-4"><div className="flex gap-4 items-center">
          <div className="flex-1"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search orders..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" /></div></div>
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="sent">Sent</SelectItem><SelectItem value="received">Received</SelectItem></SelectContent></Select>
        </div></CardContent></Card>
        <Card>
          <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={filteredOrders} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleView(item); }}><Eye className="h-4 w-4" /></Button>
                  {item.status === 'approved' && <Button variant="ghost" size="sm" className="text-blue-600" onClick={(e) => { e.stopPropagation(); handleSend(item); }}><Send className="h-4 w-4" /></Button>}
                  {item.status === 'sent' && <Button variant="ghost" size="sm" className="text-green-600" onClick={(e) => { e.stopPropagation(); handleReceive(item); }}><Package className="h-4 w-4" /></Button>}
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEdit(item); }}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={(e) => { e.stopPropagation(); handleDelete(item); }}><Trash className="h-4 w-4" /></Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.title || ''} subtitle={selectedItem?.id} sections={viewSections} />
      <FormDialog open={editOpen} onOpenChange={setEditOpen} title={`Edit Order - ${selectedItem?.id || ''}`} fields={editFields} values={formValues} onValuesChange={setFormValues} onSubmit={handleEditSubmit} submitText="Update" />
    </ApplicationLayout>
  );
};

export default AllOrdersPage;