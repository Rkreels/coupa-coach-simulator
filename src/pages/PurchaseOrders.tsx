
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { ImportExport } from '@/components/ui/import-export';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePurchaseOrders, PurchaseOrder } from '../hooks/usePurchaseOrders';
import { Plus, MoreVertical, Edit, Trash, Eye, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PurchaseOrdersPage = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPO, setEditingPO] = useState<PurchaseOrder | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const {
    purchaseOrders,
    allPurchaseOrders,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortConfig,
    handleSort,
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    totalCount,
    filteredCount,
    metrics
  } = usePurchaseOrders();

  const formFields = [
    { name: 'title', label: 'PO Title', type: 'text' as const, required: true },
    { name: 'vendor', label: 'Vendor Name', type: 'text' as const, required: true },
    { name: 'vendorId', label: 'Vendor ID', type: 'text' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'sent', label: 'Sent' },
        { value: 'received', label: 'Received' },
        { value: 'completed', label: 'Completed' },
        { value: 'canceled', label: 'Canceled' }
      ]
    },
    { name: 'totalAmount', label: 'Total Amount', type: 'number' as const, required: true },
    { name: 'currency', label: 'Currency', type: 'text' as const, placeholder: 'USD' },
    { name: 'expectedDelivery', label: 'Expected Delivery', type: 'date' as const, required: true },
    { name: 'requestor', label: 'Requestor', type: 'text' as const, required: true },
    { name: 'department', label: 'Department', type: 'text' as const, required: true },
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
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ];

  const columns = [
    { key: 'id' as keyof PurchaseOrder, header: 'PO Number', sortable: true },
    { key: 'title' as keyof PurchaseOrder, header: 'Title', sortable: true },
    { 
      key: 'status' as keyof PurchaseOrder, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value as PurchaseOrder['status'])
    },
    { key: 'vendor' as keyof PurchaseOrder, header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount' as keyof PurchaseOrder, 
      header: 'Total Amount', 
      sortable: true,
      render: (value: number, item: PurchaseOrder) => `${item.currency || 'USD'} ${value.toLocaleString()}`
    },
    { key: 'requestor' as keyof PurchaseOrder, header: 'Requestor', sortable: true },
    { key: 'expectedDelivery' as keyof PurchaseOrder, header: 'Expected Delivery', sortable: true },
    { 
      key: 'priority' as keyof PurchaseOrder, 
      header: 'Priority', 
      render: (value: string) => getPriorityBadge(value as PurchaseOrder['priority'])
    }
  ];

  const handleAddPO = () => {
    setEditingPO(null);
    setFormValues({
      title: '',
      vendor: '',
      vendorId: '',
      status: 'draft',
      totalAmount: 0,
      currency: 'USD',
      expectedDelivery: '',
      requestor: '',
      department: '',
      priority: 'medium',
      approvalStatus: 'not_required',
      lineItems: [],
      notes: ''
    });
    setDialogOpen(true);
  };

  const handleEditPO = (po: PurchaseOrder) => {
    setEditingPO(po);
    setFormValues(po);
    setDialogOpen(true);
  };

  const handleDeletePO = (po: PurchaseOrder) => {
    if (window.confirm(`Are you sure you want to delete ${po.id}?`)) {
      deletePurchaseOrder(po.id);
      toast({
        title: "Purchase Order Deleted",
        description: `${po.id} has been removed.`,
      });
    }
  };

  const handleSubmit = () => {
    const poData = {
      title: formValues.title || '',
      vendor: formValues.vendor || '',
      vendorId: formValues.vendorId || '',
      status: formValues.status || 'draft',
      totalAmount: Number(formValues.totalAmount) || 0,
      currency: formValues.currency || 'USD',
      expectedDelivery: formValues.expectedDelivery || '',
      requestor: formValues.requestor || '',
      department: formValues.department || '',
      priority: formValues.priority || 'medium',
      approvalStatus: 'not_required' as const,
      lineItems: [],
      notes: formValues.notes || ''
    };

    if (editingPO) {
      updatePurchaseOrder(editingPO.id, poData);
      toast({
        title: "Purchase Order Updated",
        description: `${formValues.title} has been updated successfully.`,
      });
    } else {
      addPurchaseOrder(poData);
      toast({
        title: "Purchase Order Created",
        description: `${formValues.title} has been created successfully.`,
      });
    }
    setDialogOpen(false);
  };

  const handleImport = (importedData: PurchaseOrder[]) => {
    importedData.forEach(po => {
      const poWithDefaults = {
        title: po.title || '',
        vendor: po.vendor || '',
        vendorId: po.vendorId || '',
        status: po.status || 'draft',
        totalAmount: po.totalAmount || 0,
        currency: po.currency || 'USD',
        expectedDelivery: po.expectedDelivery || '',
        actualDelivery: po.actualDelivery,
        requestor: po.requestor || '',
        department: po.department || '',
        priority: po.priority || 'medium',
        approvalStatus: 'not_required' as const,
        lineItems: po.lineItems || [],
        notes: po.notes || '',
        attachments: po.attachments || []
      };
      addPurchaseOrder(poWithDefaults);
    });
  };

  const getStatusBadge = (status: PurchaseOrder['status']) => {
    const colors = {
      draft: 'bg-gray-50 text-gray-700 border-gray-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      approved: 'bg-green-50 text-green-700 border-green-200',
      sent: 'bg-blue-50 text-blue-700 border-blue-200',
      received: 'bg-purple-50 text-purple-700 border-purple-200',
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      canceled: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: PurchaseOrder['priority']) => {
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

  const renderActions = (po: PurchaseOrder) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEditPO(po)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        {po.status === 'approved' && (
          <DropdownMenuItem>
            <Send className="h-4 w-4 mr-2" />
            Send to Supplier
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => handleDeletePO(po)}
          className="text-red-600"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Create headers with all required PO fields for export
  const exportHeaders = {
    id: 'PO Number',
    title: 'Title',
    vendor: 'Vendor',
    vendorId: 'Vendor ID',
    status: 'Status',
    totalAmount: 'Total Amount',
    currency: 'Currency',
    dateCreated: 'Date Created',
    dateModified: 'Date Modified',
    expectedDelivery: 'Expected Delivery',
    actualDelivery: 'Actual Delivery',
    sentDate: 'Sent Date',
    receivedDate: 'Received Date',
    approvedDate: 'Approved Date',
    requestor: 'Requestor',
    department: 'Department',
    priority: 'Priority',
    approvalStatus: 'Approval Status',
    lineItems: 'Line Items',
    notes: 'Notes',
    attachments: 'Attachments',
    deliveryStatus: 'Delivery Status'
  };

  return (
    <ApplicationLayout pageTitle="Purchase Orders">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total POs</p>
                <p className="text-3xl font-bold">{totalCount}</p>
                <p className="text-sm text-blue-600">{filteredCount} filtered</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-600">{metrics.pending}</p>
                <p className="text-sm text-yellow-600">Require attention</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-3xl font-bold text-green-600">{metrics.approved}</p>
                <p className="text-sm text-green-600">Ready to send</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-3xl font-bold">${metrics.totalValue.toLocaleString()}</p>
                <p className="text-sm text-blue-600">All POs combined</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Purchase Orders ({filteredCount} of {totalCount})</CardTitle>
              <div className="flex gap-2">
                <ImportExport
                  data={allPurchaseOrders}
                  onImport={handleImport}
                  filename="purchase-orders"
                  headers={exportHeaders}
                />
                <Button onClick={handleAddPO}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create PO
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={purchaseOrders}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSort={handleSort}
              sortConfig={sortConfig}
              actions={renderActions}
            />
          </CardContent>
        </Card>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editingPO ? 'Edit Purchase Order' : 'Create New Purchase Order'}
          fields={formFields}
          values={formValues}
          onValuesChange={setFormValues}
          onSubmit={handleSubmit}
          submitText={editingPO ? 'Update' : 'Create'}
        />
      </div>
    </ApplicationLayout>
  );
};

export default PurchaseOrdersPage;
