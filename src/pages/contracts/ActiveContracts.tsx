import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useContracts } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Eye, Edit, FileText, Calendar, AlertTriangle } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';
import { FormDialog } from '@/components/ui/form-dialog';

const ActiveContractsPage = () => {
  const { toast } = useToast();
  const { contracts, updateContract } = useContracts();
  const activeContracts = contracts.filter(c => c.status === 'active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setFormValues({ title: item.title, supplier: item.supplier, value: item.value, department: item.department, owner: item.owner, endDate: item.endDate, description: item.description, notificationDays: item.notificationDays });
    setEditOpen(true);
  };
  const handleEditSubmit = () => {
    if (selectedItem) {
      updateContract(selectedItem.id, formValues);
      toast({ title: 'Contract Updated', description: `${selectedItem.id} updated.` });
      setEditOpen(false);
    }
  };
  const handleRenew = (id: string) => {
    updateContract(id, { status: 'renewed' });
    toast({ title: 'Contract Renewed', description: 'Contract has been renewed.' });
  };

  const isExpiringSoon = (endDate: string, days: number) => {
    const diff = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return diff <= days;
  };
  const getTypeColor = (type: string) => ({ master: 'bg-blue-100 text-blue-800', service: 'bg-green-100 text-green-800', purchase: 'bg-purple-100 text-purple-800', framework: 'bg-orange-100 text-orange-800', nda: 'bg-gray-100 text-gray-800' }[type] || 'bg-gray-100 text-gray-800');

  const editFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'supplier', label: 'Supplier', type: 'text' as const, required: true },
    { name: 'value', label: 'Value', type: 'number' as const, required: true },
    { name: 'department', label: 'Department', type: 'text' as const, required: true },
    { name: 'owner', label: 'Owner', type: 'text' as const, required: true },
    { name: 'endDate', label: 'End Date', type: 'date' as const, required: true },
    { name: 'notificationDays', label: 'Notification Days', type: 'number' as const },
    { name: 'description', label: 'Description', type: 'textarea' as const }
  ];

  const columns: any[] = [
    { key: 'title', header: 'Contract Title', sortable: true },
    { key: 'type', header: 'Type', render: (_: any, item: any) => <Badge className={getTypeColor(item.type)}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Badge> },
    { key: 'supplier', header: 'Supplier', sortable: true },
    { key: 'value', header: 'Value', render: (value: any, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'startDate', header: 'Start Date', sortable: true },
    { key: 'endDate', header: 'End Date', sortable: true, render: (value: any, item: any) => (
      <div className="flex items-center gap-2"><span>{value}</span>{isExpiringSoon(item.endDate, item.notificationDays) && <AlertTriangle className="h-4 w-4 text-amber-500" />}</div>
    )},
    { key: 'department', header: 'Department', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Contract Overview', fields: [
      { label: 'Contract ID', value: selectedItem.id },
      { label: 'Status', value: selectedItem.status, type: 'badge' as const, badgeColor: 'bg-green-100 text-green-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Type', value: selectedItem.type, type: 'badge' as const, badgeColor: getTypeColor(selectedItem.type) },
      { label: 'Risk Level', value: selectedItem.riskLevel, type: 'badge' as const },
    ]},
    { title: 'Parties & Terms', fields: [
      { label: 'Supplier', value: selectedItem.supplier },
      { label: 'Department', value: selectedItem.department },
      { label: 'Owner', value: selectedItem.owner },
      { label: 'Approver', value: selectedItem.approver },
      { label: 'Value', value: `${selectedItem.currency} ${selectedItem.value.toLocaleString()}` },
      { label: 'Auto Renewal', value: selectedItem.autoRenewal ? 'Yes' : 'No' },
    ]},
    { title: 'Dates', fields: [
      { label: 'Start Date', value: selectedItem.startDate },
      { label: 'End Date', value: selectedItem.endDate },
      { label: 'Signed Date', value: selectedItem.signedDate },
      { label: 'Notification Days', value: selectedItem.notificationDays },
    ]},
    { title: 'Details', fields: [
      { label: 'Description', value: selectedItem.description, span: 2 },
      { label: 'Terms', value: selectedItem.terms, type: 'list' as const, span: 2 },
      { label: 'Compliance', value: selectedItem.complianceStatus, type: 'badge' as const },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Active Contracts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Active Contracts</h2>
          <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-4 w-4 mr-1" />{activeContracts.length} Active</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Contract Portfolio Management</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={activeContracts} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4 mr-1" />Edit</Button>
                  {isExpiringSoon(item.endDate, item.notificationDays) && (
                    <Button variant="outline" size="sm" className="text-blue-600" onClick={() => handleRenew(item.id)}><Calendar className="h-4 w-4 mr-1" />Renew</Button>
                  )}
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

export default ActiveContractsPage;