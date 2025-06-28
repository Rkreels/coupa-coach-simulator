
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, XCircle, Eye, FileText } from 'lucide-react';

const PendingSuppliersPage = () => {
  const { toast } = useToast();
  const { suppliers, updateSupplier } = useSuppliers();
  const pendingSuppliers = suppliers.filter(supplier => supplier.status === 'pending');

  const handleApprove = (supplierId: string) => {
    updateSupplier(supplierId, { status: 'active' });
    toast({
      title: 'Supplier Approved',
      description: 'Supplier has been approved and activated.'
    });
  };

  const handleReject = (supplierId: string) => {
    updateSupplier(supplierId, { status: 'inactive' });
    toast({
      title: 'Supplier Rejected',
      description: 'Supplier application has been rejected.',
      variant: 'destructive'
    });
  };

  const columns = [
    { key: 'name', header: 'Supplier Name', sortable: true },
    { key: 'code', header: 'Code', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'contactPerson', header: 'Contact Person', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone', sortable: true },
    { key: 'createdDate', header: 'Applied Date', sortable: true },
    {
      key: 'certifications',
      header: 'Certifications',
      render: (value, item) => (
        <div className="flex flex-wrap gap-1">
          {item.certifications.slice(0, 2).map((cert, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {cert}
            </Badge>
          ))}
          {item.certifications.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{item.certifications.length - 2}
            </Badge>
          )}
        </div>
      )
    }
  ];

  return (
    <ApplicationLayout pageTitle="Pending Suppliers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Suppliers Pending Approval</h2>
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-4 w-4 mr-1" />
            {pendingSuppliers.length} Pending
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supplier Registration Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={pendingSuppliers}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Documents
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleApprove(item.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleReject(item.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
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

export default PendingSuppliersPage;
