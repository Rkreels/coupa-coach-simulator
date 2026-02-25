import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useContracts } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, XCircle, Eye, Edit } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';
import { FormDialog } from '@/components/ui/form-dialog';

const PendingContractsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { contracts, updateContract } = useContracts();
  const pendingContracts = contracts.filter(c => c.status === 'pending');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setFormValues({ title: item.title, supplier: item.supplier, value: item.value, department: item.department, owner: item.owner, description: item.description });
    setEditOpen(true);
  };
  const handleEditSubmit = () => {
    if (selectedItem) { updateContract(selectedItem.id, formValues); toast({ title: 'Contract Updated' }); setEditOpen(false); }
  };
  const handleApprove = (id: string) => {
    updateContract(id, { status: 'active', signedDate: new Date().toISOString().split('T')[0] });
    toast({ title: 'Contract Approved', description: 'Contract has been approved and activated.' });
  };
  const handleReject = (id: string) => {
    updateContract(id, { status: 'terminated' });
    toast({ title: 'Contract Rejected', variant: 'destructive' });
  };

  const getTypeColor = (type: string) => ({ master: 'bg-blue-100 text-blue-800', service: 'bg-green-100 text-green-800', purchase: 'bg-purple-100 text-purple-800', framework: 'bg-orange-100 text-orange-800', nda: 'bg-gray-100 text-gray-800' }[type] || 'bg-gray-100 text-gray-800');
  const editFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'supplier', label: 'Supplier', type: 'text' as const, required: true },
    { name: 'value', label: 'Value', type: 'number' as const, required: true },
    { name: 'department', label: 'Department', type: 'text' as const },
    { name: 'owner', label: 'Owner', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'textarea' as const }
  ];

  const columns: any[] = [
    { key: 'title', header: 'Contract Title', sortable: true },
    { key: 'type', header: 'Type', render: (_: any, item: any) => <Badge className={getTypeColor(item.type)}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Badge> },
    { key: 'supplier', header: 'Supplier', sortable: true },
    { key: 'value', header: 'Value', render: (v: any, item: any) => `${item.currency} ${v.toLocaleString()}` },
    { key: 'owner', header: 'Owner', sortable: true },
    { key: 'createdDate', header: 'Created', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Contract Details', fields: [
      { label: 'Contract ID', value: selectedItem.id },
      { label: 'Status', value: 'Pending', type: 'badge' as const, badgeColor: 'bg-yellow-100 text-yellow-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Supplier', value: selectedItem.supplier },
      { label: 'Department', value: selectedItem.department },
      { label: 'Owner', value: selectedItem.owner },
      { label: 'Value', value: `${selectedItem.currency} ${selectedItem.value.toLocaleString()}` },
      { label: 'Description', value: selectedItem.description, span: 2 },
      { label: 'Terms', value: selectedItem.terms, type: 'list' as const, span: 2 },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Pending Contracts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Contracts Pending Approval</h2>
          <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-4 w-4 mr-1" />{pendingContracts.length} Pending</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Contract Approval Queue</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={pendingContracts} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />Review</Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4 mr-1" />Edit</Button>
                  <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleApprove(item.id)}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleReject(item.id)}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.title || ''} subtitle={selectedItem?.id} sections={viewSections} />
      <FormDialog open={editOpen} onOpenChange={setEditOpen} title={`Edit Contract - ${selectedItem?.id || ''}`} fields={editFields} values={formValues} onValuesChange={setFormValues} onSubmit={handleEditSubmit} submitText="Update" />
    </ApplicationLayout>
  );
};

export default PendingContractsPage;