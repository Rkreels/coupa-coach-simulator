import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { useInvoices } from '../../hooks/useInvoices';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const PendingInvoicesPage = () => {
  const { toast } = useToast();
  const { invoices, approveInvoice, rejectInvoice } = useInvoices();
  const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };

  const handleApprove = (invoice: any) => {
    approveInvoice(invoice.id, 'Current User');
    toast({ title: 'Invoice Approved', description: `Invoice ${invoice.invoiceNumber} has been approved.` });
  };

  const handleReject = (invoice: any) => {
    rejectInvoice(invoice.id, 'Rejected by approver');
    toast({ title: 'Invoice Rejected', description: `Invoice ${invoice.invoiceNumber} has been rejected.`, variant: 'destructive' });
  };

  const columns: any[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'invoiceDate', header: 'Invoice Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Invoice Details', fields: [
      { label: 'Invoice Number', value: selectedItem.invoiceNumber },
      { label: 'Status', value: selectedItem.status, type: 'badge' as const, badgeColor: 'bg-yellow-100 text-yellow-800' },
      { label: 'Vendor', value: selectedItem.vendorName },
      { label: 'Department', value: selectedItem.department },
      { label: 'Priority', value: selectedItem.priority, type: 'badge' as const },
      { label: 'Description', value: selectedItem.description, span: 2 },
    ]},
    { title: 'Financial', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Tax Amount', value: `${selectedItem.currency} ${selectedItem.taxAmount.toLocaleString()}` },
      { label: 'Net Amount', value: `${selectedItem.currency} ${selectedItem.netAmount.toLocaleString()}` },
      { label: 'PO Reference', value: selectedItem.purchaseOrderId },
    ]},
    { title: 'Dates', fields: [
      { label: 'Invoice Date', value: selectedItem.invoiceDate },
      { label: 'Due Date', value: selectedItem.dueDate },
      { label: 'Submitted Date', value: selectedItem.submittedDate },
      { label: 'Last Modified', value: selectedItem.lastModified },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Pending Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Invoices Pending Approval</h2>
          <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-4 w-4 mr-1" />{pendingInvoices.length} Pending</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Pending Approval</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={pendingInvoices} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={() => handleApprove(item)}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleReject(item)}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.invoiceNumber || ''} subtitle={`Invoice from ${selectedItem?.vendorName || ''}`} sections={viewSections} />
    </ApplicationLayout>
  );
};

export default PendingInvoicesPage;