
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Eye, Edit, MessageSquare, Trash2, Star } from 'lucide-react';

const ActiveSuppliersPage = () => {
  const { toast } = useToast();
  const { suppliers, updateSupplier, deleteSupplier } = useSuppliers();
  const activeSuppliers = suppliers.filter(supplier => supplier.status === 'active');

  const handleSuspend = (supplierId: string) => {
    updateSupplier(supplierId, { status: 'suspended' });
    toast({
      title: 'Supplier Suspended',
      description: 'Supplier has been suspended successfully.'
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

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const columns = [
    { key: 'name', header: 'Supplier Name', sortable: true },
    { key: 'code', header: 'Code', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'contactPerson', header: 'Contact Person', sortable: true },
    { 
      key: 'performance', 
      header: 'Rating',
      render: (value, item) => (
        <div className="flex items-center gap-1">
          {getRatingStars(Math.floor(item.performance.rating))}
          <span className="ml-1 text-sm text-gray-600">
            {item.performance.rating.toFixed(1)}
          </span>
        </div>
      )
    },
    { 
      key: 'performance', 
      header: 'On-Time %',
      render: (value, item) => `${item.performance.onTimeDelivery}%`
    },
    { key: 'lastOrderDate', header: 'Last Order', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Active Suppliers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Active Suppliers</h2>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            {activeSuppliers.length} Active
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supplier Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={activeSuppliers}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-orange-600"
                    onClick={() => handleSuspend(item.id)}
                  >
                    Suspend
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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

export default ActiveSuppliersPage;
