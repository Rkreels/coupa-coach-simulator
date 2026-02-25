import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useInvoices } from '../../hooks/useInvoices';
import { useToast } from '@/hooks/use-toast';
import { Eye, Edit, AlertTriangle, MessageSquare } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';
import { FormDialog } from '@/components/ui/form-dialog';

const DisputedInvoicesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { invoices, updateInvoice } = useInvoices();
  const disputedInvoices = invoices.filter(invoice => invoice.status === 'disputed');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleResolve = (item: any) => {
    updateInvoice(item.id, { status: 'approved', notes: 'Dispute resolved' });
    toast({ title: 'Dispute Resolved', description: `Invoice ${item.invoiceNumber} dispute has been resolved.` });
  };
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setFormValues({ totalAmount: item.totalAmount, notes: item.notes || '', description: item.description });
    setEditOpen(true);
  };
  const handleEditSubmit = () => {
    if (selectedItem) {
      updateInvoice(selectedItem.id, formValues);
      toast({ title: 'Invoice Updated', description: `Invoice ${selectedItem.invoiceNumber} updated.` });
      setEditOpen(false);
    }
  };

  const editFields = [
    { name: 'totalAmount', label: 'Amount', type: 'number' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const },
    { name: 'notes', label: 'Resolution Notes', type: 'textarea' as const }
  ];

  const columns: any[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (value: any, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'invoiceDate', header: 'Invoice Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Dispute Details', fields: [
      { label: 'Invoice Number', value: selectedItem.invoiceNumber },
      { label: 'Status', value: 'Disputed', type: 'badge' as const, badgeColor: 'bg-orange-100 text-orange-800' },
      { label: 'Vendor', value: selectedItem.vendorName },
      { label: 'Department', value: selectedItem.department },
      { label: 'Dispute Notes', value: selectedItem.notes, span: 2 },
      { label: 'Description', value: selectedItem.description, span: 2 },
    ]},
    { title: 'Financial', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Tax', value: `${selectedItem.currency} ${selectedItem.taxAmount.toLocaleString()}` },
      { label: 'Invoice Date', value: selectedItem.invoiceDate },
      { label: 'Due Date', value: selectedItem.dueDate },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Disputed Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Disputed Invoices</h2>
          <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="h-4 w-4 mr-1" />{disputedInvoices.length} Disputed</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Invoices Under Investigation</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={disputedInvoices} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" className="text-orange-600" onClick={() => handleResolve(item)}><MessageSquare className="h-4 w-4 mr-1" />Resolve</Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4 mr-1" />Edit</Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.invoiceNumber || ''} subtitle="Disputed Invoice" sections={viewSections} />
      <FormDialog open={editOpen} onOpenChange={setEditOpen} title={`Edit Invoice - ${selectedItem?.invoiceNumber || ''}`} fields={editFields} values={formValues} onValuesChange={setFormValues} onSubmit={handleEditSubmit} submitText="Update" />
    </ApplicationLayout>
  );
};

export default DisputedInvoicesPage;