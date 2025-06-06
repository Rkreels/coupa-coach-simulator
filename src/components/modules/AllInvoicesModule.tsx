
import React, { useState } from 'react';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/ui/form-dialog';
import { ImportExport } from '@/components/ui/import-export';
import { useInvoices, Invoice } from '../../hooks/useInvoices';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, Edit, Trash, Check, X, DollarSign, AlertTriangle } from 'lucide-react';

export const AllInvoicesModule = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const {
    invoices,
    allInvoices,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    approveInvoice,
    rejectInvoice,
    payInvoice,
    getMetrics
  } = useInvoices();

  const metrics = getMetrics();

  const formFields = [
    { name: 'invoiceNumber', label: 'Invoice Number', type: 'text' as const, required: true },
    { name: 'vendorName', label: 'Vendor Name', type: 'text' as const, required: true },
    { name: 'vendorId', label: 'Vendor ID', type: 'text' as const, required: true },
    { name: 'department', label: 'Department', type: 'text' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'approved', label: 'Approved' },
        { value: 'paid', label: 'Paid' },
        { value: 'disputed', label: 'Disputed' },
        { value: 'rejected', label: 'Rejected' }
      ]
    },
    { 
      name: 'priority', 
      label: 'Priority', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ]
    },
    { name: 'invoiceDate', label: 'Invoice Date', type: 'date' as const, required: true },
    { name: 'dueDate', label: 'Due Date', type: 'date' as const, required: true },
    { name: 'totalAmount', label: 'Total Amount', type: 'number' as const, required: true },
    { name: 'currency', label: 'Currency', type: 'text' as const, placeholder: 'USD' },
    { name: 'taxAmount', label: 'Tax Amount', type: 'number' as const },
    { name: 'netAmount', label: 'Net Amount', type: 'number' as const },
    { name: 'purchaseOrderId', label: 'Purchase Order ID', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ];

  const columns = [
    { key: 'invoiceNumber' as keyof Invoice, header: 'Invoice #', sortable: true },
    { key: 'vendorName' as keyof Invoice, header: 'Vendor', sortable: true },
    { 
      key: 'status' as keyof Invoice, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value as Invoice['status'])
    },
    { 
      key: 'priority' as keyof Invoice, 
      header: 'Priority', 
      render: (value: string) => getPriorityBadge(value as Invoice['priority'])
    },
    { 
      key: 'totalAmount' as keyof Invoice, 
      header: 'Amount', 
      sortable: true,
      render: (value: number, item: Invoice) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'invoiceDate' as keyof Invoice, header: 'Invoice Date', sortable: true },
    { key: 'dueDate' as keyof Invoice, header: 'Due Date', sortable: true },
    { key: 'department' as keyof Invoice, header: 'Department', sortable: true }
  ];

  const handleAddInvoice = () => {
    setEditingInvoice(null);
    setFormValues({
      invoiceNumber: '',
      vendorName: '',
      vendorId: '',
      department: '',
      status: 'pending',
      priority: 'medium',
      invoiceDate: '',
      dueDate: '',
      totalAmount: 0,
      currency: 'USD',
      taxAmount: 0,
      netAmount: 0,
      purchaseOrderId: '',
      description: '',
      lineItems: [],
      attachments: [],
      submittedDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setDialogOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormValues(invoice);
    setDialogOpen(true);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (window.confirm(`Are you sure you want to delete invoice ${invoice.invoiceNumber}?`)) {
      deleteInvoice(invoice.id);
      toast({
        title: "Invoice Deleted",
        description: `Invoice ${invoice.invoiceNumber} has been removed.`,
      });
    }
  };

  const handleApprove = (invoice: Invoice) => {
    approveInvoice(invoice.id, 'Current User');
    toast({
      title: "Invoice Approved",
      description: `Invoice ${invoice.invoiceNumber} has been approved.`,
    });
  };

  const handleReject = (invoice: Invoice) => {
    rejectInvoice(invoice.id, 'Rejected by user');
    toast({
      title: "Invoice Rejected",
      description: `Invoice ${invoice.invoiceNumber} has been rejected.`,
      variant: 'destructive'
    });
  };

  const handlePay = (invoice: Invoice) => {
    payInvoice(invoice.id, 'Bank Transfer');
    toast({
      title: "Invoice Paid",
      description: `Invoice ${invoice.invoiceNumber} has been marked as paid.`,
    });
  };

  const handleSubmit = () => {
    const invoiceData = {
      invoiceNumber: formValues.invoiceNumber || '',
      vendorName: formValues.vendorName || '',
      vendorId: formValues.vendorId || '',
      department: formValues.department || '',
      status: formValues.status || 'pending',
      priority: formValues.priority || 'medium',
      invoiceDate: formValues.invoiceDate || '',
      dueDate: formValues.dueDate || '',
      totalAmount: Number(formValues.totalAmount) || 0,
      currency: formValues.currency || 'USD',
      taxAmount: Number(formValues.taxAmount) || 0,
      netAmount: Number(formValues.netAmount) || 0,
      purchaseOrderId: formValues.purchaseOrderId,
      description: formValues.description || '',
      lineItems: [],
      attachments: [],
      submittedDate: new Date().toISOString().split('T')[0],
      notes: formValues.notes || ''
    };

    if (editingInvoice) {
      updateInvoice(editingInvoice.id, invoiceData);
      toast({
        title: "Invoice Updated",
        description: `Invoice ${formValues.invoiceNumber} has been updated successfully.`,
      });
    } else {
      addInvoice(invoiceData);
      toast({
        title: "Invoice Created",
        description: `Invoice ${formValues.invoiceNumber} has been created successfully.`,
      });
    }
    setDialogOpen(false);
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const colors = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      processing: 'bg-blue-50 text-blue-700 border-blue-200',
      approved: 'bg-green-50 text-green-700 border-green-200',
      paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      disputed: 'bg-red-50 text-red-700 border-red-200',
      rejected: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Invoice['priority']) => {
    const colors = {
      low: 'bg-gray-50 text-gray-700 border-gray-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      high: 'bg-orange-50 text-orange-700 border-orange-200',
      urgent: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={colors[priority]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const renderActions = (invoice: Invoice) => (
    <div className="flex gap-1">
      <Button variant="outline" size="sm">
        <Eye className="h-4 w-4 mr-1" />
        View
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleEditInvoice(invoice)}>
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      {invoice.status === 'pending' && (
        <>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-green-600"
            onClick={() => handleApprove(invoice)}
          >
            <Check className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600"
            onClick={() => handleReject(invoice)}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </>
      )}
      {invoice.status === 'approved' && (
        <Button 
          variant="outline" 
          size="sm" 
          className="text-blue-600"
          onClick={() => handlePay(invoice)}
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Pay
        </Button>
      )}
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600"
        onClick={() => handleDeleteInvoice(invoice)}
      >
        <Trash className="h-4 w-4 mr-1" />
        Delete
      </Button>
    </div>
  );

  return (
    <ApplicationLayout pageTitle="Invoices Management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Invoices</p>
                <p className="text-3xl font-bold">{metrics.totalInvoices}</p>
                <p className="text-sm text-blue-600">${metrics.totalValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-600">{metrics.pendingApproval}</p>
                <p className="text-sm text-yellow-600">Need review</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Paid</p>
                <p className="text-3xl font-bold text-green-600">{metrics.paid}</p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Disputed</p>
                <p className="text-3xl font-bold text-red-600">{metrics.disputed}</p>
                <p className="text-sm text-red-600">
                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                  Need attention
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Invoices ({invoices.length})</CardTitle>
              <div className="flex gap-2">
                <ImportExport
                  data={allInvoices}
                  onImport={() => {}}
                  filename="invoices"
                  headers={{
                    id: 'ID',
                    invoiceNumber: 'Invoice Number',
                    vendorName: 'Vendor Name',
                    status: 'Status',
                    totalAmount: 'Total Amount',
                    invoiceDate: 'Invoice Date',
                    dueDate: 'Due Date'
                  }}
                />
                <Button onClick={handleAddInvoice}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Invoice
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={invoices}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={renderActions}
            />
          </CardContent>
        </Card>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
          fields={formFields}
          values={formValues}
          onValuesChange={setFormValues}
          onSubmit={handleSubmit}
          submitText={editingInvoice ? 'Update' : 'Create'}
        />
      </div>
    </ApplicationLayout>
  );
};
