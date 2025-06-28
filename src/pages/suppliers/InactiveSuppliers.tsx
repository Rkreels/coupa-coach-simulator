
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, RotateCcw, Eye, Trash2 } from 'lucide-react';

const InactiveSuppliersPage = () => {
  const { toast } = useToast();
  const { suppliers, updateSupplier, deleteSupplier } = useSuppliers();
  const inactiveSuppliers = suppliers.filter(supplier => supplier.status === 'inactive' || supplier.status === 'suspended');

  const handleReactivate = (supplierId: string) => {
    updateSupplier(supplierId, { status: 'active' });
    toast({
      title: 'Supplier Reactivated',
      description: 'Supplier has been reactivated successfully.'
    });
  };

  const handleDelete = (supplierId: string) => {
    deleteSupplier(supplierId);
    toast({
      title: 'Supplier Deleted',
      description: 'Supplier has been permanently deleted.',
      variant: 'destructive'
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'suspended') {
      return (
        <Badge className="bg-orange-100 text-orange-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Suspended
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800">
        Inactive
      </Badge>
    );
  };

  const columns = [
    { key: 'name', header: 'Supplier Name', sortable: true },
    { key: 'code', header: 'Code', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (value, item) => getStatusBadge(item.status)
    },
    { key: 'contactPerson', header: 'Contact Person', sortable: true },
    { key: 'lastOrderDate', header: 'Last Order', sortable: true },
    { key: 'lastModified', header: 'Last Modified', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Inactive Suppliers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Inactive & Suspended Suppliers</h2>
          <Badge className="bg-gray-100 text-gray-800">
            <AlertCircle className="h-4 w-4 mr-1" />
            {inactiveSuppliers.length} Inactive
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supplier Recovery Management</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={inactiveSuppliers}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-600"
                    onClick={() => handleReactivate(item.id)}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reactivate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default InactiveSuppliersPage;
