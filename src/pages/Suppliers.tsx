
import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { ImportExport } from '@/components/ui/import-export';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDataManager } from '../hooks/useDataManager';
import { initialSuppliersData } from '../data/suppliersData';
import { Supplier } from '../types/supplier';
import { Plus, MoreVertical, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Suppliers = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const {
    data: suppliers,
    allData,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortConfig,
    handleSort,
    addItem,
    updateItem,
    deleteItem,
    totalCount,
    filteredCount
  } = useDataManager({
    storageKey: 'suppliers',
    initialData: initialSuppliersData,
    searchFields: ['name', 'category', 'email', 'contactPerson']
  });

  const formFields = [
    { name: 'name', label: 'Company Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone', type: 'text' as const },
    { name: 'contactPerson', label: 'Contact Person', type: 'text' as const, required: true },
    { name: 'address', label: 'Address', type: 'textarea' as const },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'IT Services', label: 'IT Services' },
        { value: 'Hardware', label: 'Hardware' },
        { value: 'Consulting', label: 'Consulting' },
        { value: 'Office Supplies', label: 'Office Supplies' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Manufacturing', label: 'Manufacturing' }
      ]
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' }
      ]
    },
    { 
      name: 'riskLevel', 
      label: 'Risk Level', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    { name: 'spend', label: 'Annual Spend', type: 'text' as const, placeholder: '$0' },
    { name: 'performance', label: 'Performance %', type: 'number' as const, placeholder: '0-100' }
  ];

  const columns = [
    { key: 'name' as keyof Supplier, header: 'Name', sortable: true },
    { key: 'category' as keyof Supplier, header: 'Category', sortable: true },
    { 
      key: 'status' as keyof Supplier, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value as Supplier['status'])
    },
    { 
      key: 'riskLevel' as keyof Supplier, 
      header: 'Risk Level', 
      render: (value: string) => getRiskBadge(value as Supplier['riskLevel'])
    },
    { key: 'spend' as keyof Supplier, header: 'Annual Spend', sortable: true },
    { 
      key: 'performance' as keyof Supplier, 
      header: 'Performance', 
      render: (value: number) => getPerformanceDisplay(value)
    },
    { key: 'lastUpdated' as keyof Supplier, header: 'Last Updated', sortable: true }
  ];

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setFormValues({
      status: 'pending',
      riskLevel: 'medium',
      performance: 0,
      spend: '$0',
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    setDialogOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormValues(supplier);
    setDialogOpen(true);
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    if (window.confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      deleteItem(supplier.id);
      toast({
        title: "Supplier Deleted",
        description: `${supplier.name} has been removed.`,
      });
    }
  };

  const handleSubmit = () => {
    if (editingSupplier) {
      updateItem(editingSupplier.id, {
        ...formValues,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Supplier Updated",
        description: `${formValues.name} has been updated successfully.`,
      });
    } else {
      addItem({
        ...formValues,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Supplier Added",
        description: `${formValues.name} has been added successfully.`,
      });
    }
    setDialogOpen(false);
  };

  const handleImport = (importedData: Supplier[]) => {
    importedData.forEach(supplier => {
      addItem({
        ...supplier,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    });
  };

  const getStatusBadge = (status: Supplier['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  const getRiskBadge = (risk: Supplier['riskLevel']) => {
    switch (risk) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      default:
        return null;
    }
  };

  const getPerformanceDisplay = (performance: number) => {
    if (performance === 0) return <span className="text-gray-400">N/A</span>;
    
    let colorClass = "text-yellow-600";
    if (performance >= 90) colorClass = "text-green-600";
    else if (performance < 70) colorClass = "text-red-600";
    
    return <span className={colorClass}>{performance}%</span>;
  };

  const renderActions = (supplier: Supplier) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEditSupplier(supplier)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDeleteSupplier(supplier)}
          className="text-red-600"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <MainLayout pageTitle="Supplier Management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Suppliers</p>
                <p className="text-3xl font-bold">{totalCount}</p>
                <p className="text-sm text-green-600">
                  {allData.filter(s => s.status === 'active').length} active
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Average Performance</p>
                <p className="text-3xl font-bold">
                  {Math.round(allData.reduce((acc, s) => acc + s.performance, 0) / allData.length || 0)}%
                </p>
                <p className="text-sm text-blue-600">Across all suppliers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">High Risk Suppliers</p>
                <p className="text-3xl font-bold text-red-600">
                  {allData.filter(s => s.riskLevel === 'high').length}
                </p>
                <p className="text-sm text-red-600">Require attention</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Suppliers ({filteredCount} of {totalCount})</CardTitle>
              <div className="flex gap-2">
                <ImportExport
                  data={allData}
                  onImport={handleImport}
                  filename="suppliers"
                  headers={{
                    name: 'Company Name',
                    email: 'Email',
                    phone: 'Phone',
                    contactPerson: 'Contact Person',
                    category: 'Category',
                    status: 'Status',
                    riskLevel: 'Risk Level',
                    spend: 'Annual Spend',
                    performance: 'Performance'
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
              onSort={handleSort}
              sortConfig={sortConfig}
              actions={renderActions}
            />
          </CardContent>
        </Card>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
          fields={formFields}
          values={formValues}
          onValuesChange={setFormValues}
          onSubmit={handleSubmit}
          submitText={editingSupplier ? 'Update' : 'Add'}
        />
      </div>
    </MainLayout>
  );
};

export default Suppliers;
