import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Eye, Edit, Trash2, Star } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';
import { FormDialog } from '@/components/ui/form-dialog';

const ActiveSuppliersPage = () => {
  const { toast } = useToast();
  const { suppliers, updateSupplier, deleteSupplier } = useSuppliers();
  const activeSuppliers = suppliers.filter(s => s.status === 'active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setFormValues({ name: item.name, contactPerson: item.contactPerson, email: item.email, phone: item.phone, category: item.category, paymentTerms: item.paymentTerms, creditLimit: item.creditLimit });
    setEditOpen(true);
  };
  const handleEditSubmit = () => {
    if (selectedItem) { updateSupplier(selectedItem.id, formValues); toast({ title: 'Supplier Updated' }); setEditOpen(false); }
  };
  const handleSuspend = (id: string) => { updateSupplier(id, { status: 'suspended' }); toast({ title: 'Supplier Suspended' }); };
  const handleDelete = (id: string) => { deleteSupplier(id); toast({ title: 'Supplier Deleted', variant: 'destructive' }); };

  const getRatingStars = (rating: number) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
  ));

  const editFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'contactPerson', label: 'Contact Person', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone', type: 'text' as const },
    { name: 'category', label: 'Category', type: 'text' as const },
    { name: 'paymentTerms', label: 'Payment Terms', type: 'text' as const },
    { name: 'creditLimit', label: 'Credit Limit', type: 'number' as const }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Supplier Name', sortable: true },
    { key: 'code', header: 'Code', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'contactPerson', header: 'Contact', sortable: true },
    { key: 'performance', header: 'Rating', render: (_: any, item: any) => (
      <div className="flex items-center gap-1">{getRatingStars(Math.floor(item.performance.rating))}<span className="ml-1 text-sm text-gray-600">{item.performance.rating.toFixed(1)}</span></div>
    )},
    { key: 'performance', header: 'On-Time %', render: (_: any, item: any) => `${item.performance.onTimeDelivery}%` },
    { key: 'lastOrderDate', header: 'Last Order', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Company Information', fields: [
      { label: 'Supplier ID', value: selectedItem.id },
      { label: 'Code', value: selectedItem.code },
      { label: 'Name', value: selectedItem.name, span: 2 },
      { label: 'Category', value: selectedItem.category },
      { label: 'Status', value: selectedItem.status, type: 'badge' as const, badgeColor: 'bg-green-100 text-green-800' },
    ]},
    { title: 'Contact Details', fields: [
      { label: 'Contact Person', value: selectedItem.contactPerson },
      { label: 'Email', value: selectedItem.email },
      { label: 'Phone', value: selectedItem.phone },
      { label: 'Address', value: `${selectedItem.address.street}, ${selectedItem.address.city}, ${selectedItem.address.state} ${selectedItem.address.zipCode}` },
    ]},
    { title: 'Financial', fields: [
      { label: 'Payment Terms', value: selectedItem.paymentTerms },
      { label: 'Credit Limit', value: `${selectedItem.currency} ${selectedItem.creditLimit.toLocaleString()}` },
      { label: 'Total Spend', value: `${selectedItem.currency} ${selectedItem.performance.totalSpend.toLocaleString()}` },
      { label: 'Total Orders', value: selectedItem.performance.totalOrders },
    ]},
    { title: 'Performance', fields: [
      { label: 'Rating', value: `${selectedItem.performance.rating}/5` },
      { label: 'On-Time Delivery', value: `${selectedItem.performance.onTimeDelivery}%` },
      { label: 'Quality Score', value: `${selectedItem.performance.qualityScore}%` },
      { label: 'Certifications', value: selectedItem.certifications, type: 'list' as const },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Active Suppliers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Active Suppliers</h2>
          <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-4 w-4 mr-1" />{activeSuppliers.length} Active</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Supplier Performance Overview</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={activeSuppliers} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4 mr-1" />Edit</Button>
                  <Button variant="outline" size="sm" className="text-orange-600" onClick={() => handleSuspend(item.id)}>Suspend</Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.name || ''} subtitle={selectedItem?.id} sections={viewSections} />
      <FormDialog open={editOpen} onOpenChange={setEditOpen} title={`Edit Supplier - ${selectedItem?.name || ''}`} fields={editFields} values={formValues} onValuesChange={setFormValues} onSubmit={handleEditSubmit} submitText="Update" />
    </ApplicationLayout>
  );
};

export default ActiveSuppliersPage;