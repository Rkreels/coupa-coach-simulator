
import React, { useState } from 'react';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/ui/form-dialog';
import { ImportExport } from '@/components/ui/import-export';
import { useSuppliers, Supplier } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, Edit, Trash, Star, TrendingUp, Users, AlertCircle } from 'lucide-react';

export const AllSuppliersModule = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const {
    suppliers,
    allSuppliers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getMetrics,
    getCategories
  } = useSuppliers();

  const metrics = getMetrics();
  const categories = getCategories();

  const formFields = [
    { name: 'name', label: 'Supplier Name', type: 'text' as const, required: true },
    { name: 'code', label: 'Supplier Code', type: 'text' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
        { value: 'suspended', label: 'Suspended' }
      ]
    },
    { name: 'category', label: 'Category', type: 'text' as const, required: true },
    { name: 'contactPerson', label: 'Contact Person', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone', type: 'text' as const, required: true },
    { name: 'address.street', label: 'Street Address', type: 'text' as const },
    { name: 'address.city', label: 'City', type: 'text' as const },
    { name: 'address.state', label: 'State', type: 'text' as const },
    { name: 'address.zipCode', label: 'Zip Code', type: 'text' as const },
    { name: 'address.country', label: 'Country', type: 'text' as const },
    { name: 'paymentTerms', label: 'Payment Terms', type: 'text' as const },
    { name: 'creditLimit', label: 'Credit Limit', type: 'number' as const },
    { name: 'currency', label: 'Currency', type: 'text' as const, placeholder: 'USD' },
    { name: 'taxId', label: 'Tax ID', type: 'text' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ];

  const columns = [
    { key: 'code' as keyof Supplier, header: 'Code', sortable: true },
    { key: 'name' as keyof Supplier, header: 'Name', sortable: true },
    { 
      key: 'status' as keyof Supplier, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value as Supplier['status'])
    },
    { key: 'category' as keyof Supplier, header: 'Category', sortable: true },
    { key: 'contactPerson' as keyof Supplier, header: 'Contact', sortable: true },
    { 
      key: 'performance' as keyof Supplier, 
      header: 'Rating',
      render: (value: any) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span>{value.rating}/5</span>
        </div>
      )
    },
    { 
      key: 'performance' as keyof Supplier, 
      header: 'Orders',
      render: (value: any) => value.totalOrders
    },
    { 
      key: 'performance' as keyof Supplier, 
      header: 'Total Spend',
      render: (value: any, item: Supplier) => `${item.currency} ${value.totalSpend.toLocaleString()}`
    }
  ];

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setFormValues({
      name: '',
      code: '',
      status: 'pending',
      category: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      },
      paymentTerms: 'Net 30',
      creditLimit: 0,
      currency: 'USD',
      taxId: '',
      bankDetails: {
        bankName: '',
        accountNumber: '',
        routingNumber: ''
      },
      certifications: [],
      performance: {
        rating: 0,
        onTimeDelivery: 0,
        qualityScore: 0,
        totalOrders: 0,
        totalSpend: 0
      },
      contracts: [],
      createdDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setDialogOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormValues({
      ...supplier,
      'address.street': supplier.address.street,
      'address.city': supplier.address.city,
      'address.state': supplier.address.state,
      'address.zipCode': supplier.address.zipCode,
      'address.country': supplier.address.country
    });
    setDialogOpen(true);
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    if (window.confirm(`Are you sure you want to delete supplier ${supplier.name}?`)) {
      deleteSupplier(supplier.id);
      toast({
        title: "Supplier Deleted",
        description: `${supplier.name} has been removed.`,
      });
    }
  };

  const handleSubmit = () => {
    const supplierData = {
      name: formValues.name || '',
      code: formValues.code || '',
      status: formValues.status || 'pending',
      category: formValues.category || '',
      contactPerson: formValues.contactPerson || '',
      email: formValues.email || '',
      phone: formValues.phone || '',
      address: {
        street: formValues['address.street'] || '',
        city: formValues['address.city'] || '',
        state: formValues['address.state'] || '',
        zipCode: formValues['address.zipCode'] || '',
        country: formValues['address.country'] || 'USA'
      },
      paymentTerms: formValues.paymentTerms || 'Net 30',
      creditLimit: Number(formValues.creditLimit) || 0,
      currency: formValues.currency || 'USD',
      taxId: formValues.taxId || '',
      bankDetails: formValues.bankDetails || {
        bankName: '',
        accountNumber: '',
        routingNumber: ''
      },
      certifications: formValues.certifications || [],
      performance: formValues.performance || {
        rating: 0,
        onTimeDelivery: 0,
        qualityScore: 0,
        totalOrders: 0,
        totalSpend: 0
      },
      contracts: formValues.contracts || [],
      createdDate: formValues.createdDate || new Date().toISOString().split('T')[0],
      notes: formValues.notes || ''
    };

    if (editingSupplier) {
      updateSupplier(editingSupplier.id, supplierData);
      toast({
        title: "Supplier Updated",
        description: `${formValues.name} has been updated successfully.`,
      });
    } else {
      addSupplier(supplierData);
      toast({
        title: "Supplier Created",
        description: `${formValues.name} has been created successfully.`,
      });
    }
    setDialogOpen(false);
  };

  const getStatusBadge = (status: Supplier['status']) => {
    const colors = {
      active: 'bg-green-50 text-green-700 border-green-200',
      inactive: 'bg-gray-50 text-gray-700 border-gray-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      suspended: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderActions = (supplier: Supplier) => (
    <div className="flex gap-1">
      <Button variant="outline" size="sm">
        <Eye className="h-4 w-4 mr-1" />
        View
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleEditSupplier(supplier)}>
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600"
        onClick={() => handleDeleteSupplier(supplier)}
      >
        <Trash className="h-4 w-4 mr-1" />
        Delete
      </Button>
    </div>
  );

  return (
    <ApplicationLayout pageTitle="Suppliers Management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Suppliers</p>
                <p className="text-3xl font-bold">{metrics.totalSuppliers}</p>
                <p className="text-sm text-blue-600">{categories.length} categories</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-3xl font-bold text-green-600">{metrics.activeSuppliers}</p>
                <p className="text-sm text-green-600">
                  <Users className="h-3 w-3 inline mr-1" />
                  Available
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-3xl font-bold text-yellow-600">{metrics.avgRating}/5</p>
                <p className="text-sm text-yellow-600">
                  <Star className="h-3 w-3 inline mr-1" />
                  Performance
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Spend</p>
                <p className="text-3xl font-bold">${metrics.totalSpend.toLocaleString()}</p>
                <p className="text-sm text-blue-600">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  All time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Suppliers ({suppliers.length})</CardTitle>
              <div className="flex gap-2">
                <ImportExport
                  data={allSuppliers}
                  onImport={() => {}}
                  filename="suppliers"
                  headers={{
                    id: 'ID',
                    name: 'Name',
                    code: 'Code',
                    status: 'Status',
                    category: 'Category',
                    contactPerson: 'Contact Person',
                    email: 'Email',
                    phone: 'Phone'
                  }}
                />
                <Button onClick={handleAddSupplier}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={suppliers}
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
          title={editingSupplier ? 'Edit Supplier' : 'Create New Supplier'}
          fields={formFields}
          values={formValues}
          onValuesChange={setFormValues}
          onSubmit={handleSubmit}
          submitText={editingSupplier ? 'Update' : 'Create'}
        />
      </div>
    </ApplicationLayout>
  );
};
