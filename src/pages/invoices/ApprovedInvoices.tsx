import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { useInvoices } from '../../hooks/useInvoices';
import { DollarSign, Eye, Download, CheckCircle } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const ApprovedInvoicesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { invoices, payInvoice } = useInvoices();
  const approvedInvoices = invoices.filter(invoice => invoice.status === 'approved');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handlePay = (invoice: any) => {
    payInvoice(invoice.id, 'Bank Transfer');
    toast({ title: 'Invoice Paid', description: `Invoice ${invoice.invoiceNumber} has been marked as paid.` });
  };
  const handleExport = (invoice: any) => {
    const data = JSON.stringify(invoice, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${invoice.invoiceNumber}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: `Invoice ${invoice.invoiceNumber} exported.` });
  };

  const columns: any[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (value: any, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'approvedDate', header: 'Approved Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'approver', header: 'Approved By', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Invoice Details', fields: [
      { label: 'Invoice Number', value: selectedItem.invoiceNumber },
      { label: 'Status', value: 'Approved', type: 'badge' as const, badgeColor: 'bg-green-100 text-green-800' },
      { label: 'Vendor', value: selectedItem.vendorName },
      { label: 'Department', value: selectedItem.department },
      { label: 'Approved By', value: selectedItem.approver },
      { label: 'Description', value: selectedItem.description, span: 2 },
    ]},
    { title: 'Financial', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Tax', value: `${selectedItem.currency} ${selectedItem.taxAmount.toLocaleString()}` },
      { label: 'Net Amount', value: `${selectedItem.currency} ${selectedItem.netAmount.toLocaleString()}` },
      { label: 'Due Date', value: selectedItem.dueDate },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Approved Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Approved Invoices</h2>
          <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-4 w-4 mr-1" />{approvedInvoices.length} Approved</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Ready for Payment</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={approvedInvoices} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" className="text-blue-600" onClick={() => handlePay(item)}><DollarSign className="h-4 w-4 mr-1" />Pay</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport(item)}><Download className="h-4 w-4 mr-1" />Export</Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.invoiceNumber || ''} subtitle={`Approved invoice from ${selectedItem?.vendorName || ''}`} sections={viewSections} />
    </ApplicationLayout>
  );
};

export default ApprovedInvoicesPage;