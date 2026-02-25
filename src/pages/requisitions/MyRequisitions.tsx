import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRequisitions } from '../../hooks/useRequisitions';
import { useToast } from '@/hooks/use-toast';
import { FileText, Edit, Eye, Trash2 } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';
import { FormDialog } from '@/components/ui/form-dialog';

const MyRequisitionsPage = () => {
  const { toast } = useToast();
  const { allRequisitions, searchTerm, setSearchTerm, deleteRequisition, updateRequisition } = useRequisitions();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-red-50 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setViewOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setFormValues({
      title: item.title,
      description: item.description,
      justification: item.justification,
      category: item.category,
      priority: item.priority,
      neededByDate: item.neededByDate,
      totalAmount: item.totalAmount,
      supplier: item.supplier || ''
    });
    setEditOpen(true);
  };

  const handleEditSubmit = () => {
    if (selectedItem) {
      updateRequisition(selectedItem.id, formValues);
      toast({ title: 'Requisition Updated', description: `${selectedItem.id} has been updated.` });
      setEditOpen(false);
    }
  };

  const handleDelete = (item: any) => {
    deleteRequisition(item.id);
    toast({ title: 'Requisition Deleted', description: `${item.id} has been deleted.`, variant: 'destructive' });
  };

  const editFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'category', label: 'Category', type: 'text' as const, required: true },
    { name: 'priority', label: 'Priority', type: 'select' as const, required: true, options: [
      { value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }, { value: 'urgent', label: 'Urgent' }
    ]},
    { name: 'neededByDate', label: 'Needed By', type: 'date' as const, required: true },
    { name: 'totalAmount', label: 'Total Amount', type: 'number' as const, required: true },
    { name: 'supplier', label: 'Supplier', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'justification', label: 'Justification', type: 'textarea' as const }
  ];

  const columns: any[] = [
    { key: 'id', header: 'Req ID', render: (value: string) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-gray-400" />
        <span className="font-mono text-sm">{value}</span>
      </div>
    )},
    { key: 'title', header: 'Title', sortable: true },
    { key: 'status', header: 'Status', render: (value: string) => (
      <Badge className={getStatusColor(value)}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>
    )},
    { key: 'totalAmount', header: 'Amount', render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'neededByDate', header: 'Needed By', sortable: true },
    { key: 'lastModified', header: 'Last Modified', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'General Information', fields: [
      { label: 'Requisition ID', value: selectedItem.id },
      { label: 'Status', value: selectedItem.status, type: 'badge' as const, badgeColor: getStatusColor(selectedItem.status) },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Requestor', value: selectedItem.requestor },
      { label: 'Department', value: selectedItem.department },
      { label: 'Priority', value: selectedItem.priority, type: 'badge' as const },
      { label: 'Category', value: selectedItem.category },
    ]},
    { title: 'Financial Details', fields: [
      { label: 'Total Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Supplier', value: selectedItem.supplier || 'Not assigned' },
      { label: 'Needed By', value: selectedItem.neededByDate },
      { label: 'Requested Date', value: selectedItem.requestedDate },
    ]},
    { title: 'Additional Information', fields: [
      { label: 'Description', value: selectedItem.description, span: 2 },
      { label: 'Justification', value: selectedItem.justification, span: 2 },
      { label: 'Approver', value: selectedItem.approver },
      { label: 'Approved Date', value: selectedItem.approvedDate },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="My Requisitions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Requisitions</h2>
          <Badge className="bg-blue-100 text-blue-800">{allRequisitions.length} Total</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Your Requisitions</CardTitle></CardHeader>
          <CardContent>
            <DataTable
              data={allRequisitions}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" title="View" onClick={() => handleView(item)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {(item.status === 'draft' || item.status === 'rejected') && (
                    <Button variant="ghost" size="sm" title="Edit" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-red-600" title="Delete" onClick={() => handleDelete(item)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <DetailViewDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        title={selectedItem?.title || ''}
        subtitle={selectedItem?.id}
        sections={viewSections}
      />

      <FormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title={`Edit Requisition - ${selectedItem?.id || ''}`}
        fields={editFields}
        values={formValues}
        onValuesChange={setFormValues}
        onSubmit={handleEditSubmit}
        submitText="Update"
      />
    </ApplicationLayout>
  );
};

export default MyRequisitionsPage;