import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useInvoices } from '../../hooks/useInvoices';
import { useToast } from '@/hooks/use-toast';
import { Eye, Download, CheckCircle2 } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const PaidInvoicesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { invoices } = useInvoices();
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleExport = (item: any) => {
    const data = JSON.stringify(item, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `receipt-${item.invoiceNumber}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Receipt Downloaded', description: `Receipt for ${item.invoiceNumber} downloaded.` });
  };

  const columns: any[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (value: any, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'paidDate', header: 'Paid Date', sortable: true },
    { key: 'paymentMethod', header: 'Payment Method', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Payment Details', fields: [
      { label: 'Invoice Number', value: selectedItem.invoiceNumber },
      { label: 'Status', value: 'Paid', type: 'badge' as const, badgeColor: 'bg-emerald-100 text-emerald-800' },
      { label: 'Vendor', value: selectedItem.vendorName },
      { label: 'Department', value: selectedItem.department },
      { label: 'Payment Method', value: selectedItem.paymentMethod },
      { label: 'Paid Date', value: selectedItem.paidDate },
    ]},
    { title: 'Financial', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Tax', value: `${selectedItem.currency} ${selectedItem.taxAmount.toLocaleString()}` },
      { label: 'Approved By', value: selectedItem.approver },
      { label: 'Approved Date', value: selectedItem.approvedDate },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Paid Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Paid Invoices</h2>
          <Badge className="bg-emerald-100 text-emerald-800"><CheckCircle2 className="h-4 w-4 mr-1" />{paidInvoices.length} Paid</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={paidInvoices} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport(item)}><Download className="h-4 w-4 mr-1" />Receipt</Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.invoiceNumber || ''} subtitle={`Payment receipt`} sections={viewSections} />
    </ApplicationLayout>
  );
};

export default PaidInvoicesPage;