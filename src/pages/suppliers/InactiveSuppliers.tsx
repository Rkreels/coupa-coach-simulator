import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, RotateCcw, Eye, Trash2 } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const InactiveSuppliersPage = () => {
  const { toast } = useToast();
  const { suppliers, updateSupplier, deleteSupplier } = useSuppliers();
  const inactiveSuppliers = suppliers.filter(s => s.status === 'inactive' || s.status === 'suspended');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleReactivate = (id: string) => { updateSupplier(id, { status: 'active' }); toast({ title: 'Supplier Reactivated' }); };
  const handleDelete = (id: string) => { deleteSupplier(id); toast({ title: 'Supplier Deleted', variant: 'destructive' }); };

  const getStatusBadge = (status: string) => status === 'suspended' 
    ? <Badge className="bg-orange-100 text-orange-800"><AlertCircle className="h-3 w-3 mr-1" />Suspended</Badge> 
    : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;

  const columns: any[] = [
    { key: 'name', header: 'Supplier Name', sortable: true },
    { key: 'code', header: 'Code', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'status', header: 'Status', render: (_: any, item: any) => getStatusBadge(item.status) },
    { key: 'contactPerson', header: 'Contact', sortable: true },
    { key: 'lastOrderDate', header: 'Last Order', sortable: true },
    { key: 'lastModified', header: 'Last Modified', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Supplier Details', fields: [
      { label: 'Supplier ID', value: selectedItem.id },
      { label: 'Status', value: selectedItem.status, type: 'badge' as const, badgeColor: selectedItem.status === 'suspended' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800' },
      { label: 'Name', value: selectedItem.name, span: 2 },
      { label: 'Category', value: selectedItem.category },
      { label: 'Contact', value: selectedItem.contactPerson },
      { label: 'Email', value: selectedItem.email },
      { label: 'Phone', value: selectedItem.phone },
      { label: 'Notes', value: selectedItem.notes, span: 2 },
    ]},
    { title: 'Performance History', fields: [
      { label: 'Rating', value: `${selectedItem.performance.rating}/5` },
      { label: 'On-Time Delivery', value: `${selectedItem.performance.onTimeDelivery}%` },
      { label: 'Quality Score', value: `${selectedItem.performance.qualityScore}%` },
      { label: 'Total Spend', value: `${selectedItem.currency} ${selectedItem.performance.totalSpend.toLocaleString()}` },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Inactive Suppliers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Inactive & Suspended Suppliers</h2>
          <Badge className="bg-gray-100 text-gray-800"><AlertCircle className="h-4 w-4 mr-1" />{inactiveSuppliers.length} Inactive</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Supplier Recovery Management</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={inactiveSuppliers} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" className="text-blue-600" onClick={() => handleReactivate(item.id)}><RotateCcw className="h-4 w-4 mr-1" />Reactivate</Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.name || ''} subtitle={selectedItem?.id} sections={viewSections} />
    </ApplicationLayout>
  );
};

export default InactiveSuppliersPage;