import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const PendingSuppliersPage = () => {
  const { toast } = useToast();
  const { suppliers, updateSupplier } = useSuppliers();
  const pendingSuppliers = suppliers.filter(s => s.status === 'pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleApprove = (id: string) => { updateSupplier(id, { status: 'active' }); toast({ title: 'Supplier Approved' }); };
  const handleReject = (id: string) => { updateSupplier(id, { status: 'inactive' }); toast({ title: 'Supplier Rejected', variant: 'destructive' }); };

  const columns: any[] = [
    { key: 'name', header: 'Supplier Name', sortable: true },
    { key: 'code', header: 'Code', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'contactPerson', header: 'Contact', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone', sortable: true },
    { key: 'createdDate', header: 'Applied Date', sortable: true },
    { key: 'certifications', header: 'Certifications', render: (_: any, item: any) => (
      <div className="flex flex-wrap gap-1">
        {item.certifications.slice(0, 2).map((cert: string, i: number) => <Badge key={i} variant="outline" className="text-xs">{cert}</Badge>)}
        {item.certifications.length > 2 && <Badge variant="outline" className="text-xs">+{item.certifications.length - 2}</Badge>}
      </div>
    )}
  ];

  const viewSections = selectedItem ? [
    { title: 'Application Details', fields: [
      { label: 'Supplier ID', value: selectedItem.id },
      { label: 'Status', value: 'Pending', type: 'badge' as const, badgeColor: 'bg-yellow-100 text-yellow-800' },
      { label: 'Name', value: selectedItem.name, span: 2 },
      { label: 'Category', value: selectedItem.category },
      { label: 'Tax ID', value: selectedItem.taxId },
    ]},
    { title: 'Contact', fields: [
      { label: 'Contact Person', value: selectedItem.contactPerson },
      { label: 'Email', value: selectedItem.email },
      { label: 'Phone', value: selectedItem.phone },
      { label: 'Address', value: `${selectedItem.address.street}, ${selectedItem.address.city}, ${selectedItem.address.state}` },
    ]},
    { title: 'Qualifications', fields: [
      { label: 'Payment Terms', value: selectedItem.paymentTerms },
      { label: 'Credit Limit', value: `${selectedItem.currency} ${selectedItem.creditLimit.toLocaleString()}` },
      { label: 'Certifications', value: selectedItem.certifications, type: 'list' as const, span: 2 },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Pending Suppliers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Suppliers Pending Approval</h2>
          <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-4 w-4 mr-1" />{pendingSuppliers.length} Pending</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Supplier Registration Queue</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={pendingSuppliers} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />Review</Button>
                  <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleApprove(item.id)}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleReject(item.id)}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
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

export default PendingSuppliersPage;