
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { useModuleData } from '../../hooks/useModuleData';
import { Plus, ShoppingCart, FileText, Search, Clock, CheckCircle } from 'lucide-react';

export const RequisitionsModule: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { metrics, recentItems, alerts, loading } = useModuleData('requisitions');
  const [dialogOpen, setDialogOpen] = useState(false);

  const getPageContent = () => {
    if (path.includes('/my')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Requisitions</h2>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Requisition
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold">{metrics.pendingApproval}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="text-2xl font-bold">{metrics.approved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold">{metrics.totalRequisitions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Recent Requisitions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={recentItems}
                columns={[
                  { key: 'id', header: 'Req ID', sortable: true },
                  { key: 'title', header: 'Title', sortable: true },
                  { 
                    key: 'status', 
                    header: 'Status',
                    render: (value: string) => (
                      <Badge variant={value === 'pending' ? 'destructive' : value === 'approved' ? 'default' : 'secondary'}>
                        {value}
                      </Badge>
                    )
                  },
                  { 
                    key: 'amount', 
                    header: 'Amount',
                    render: (value: number) => `$${value.toLocaleString()}`
                  }
                ]}
                searchTerm=""
                onSearchChange={() => {}}
                onSort={() => {}}
                sortConfig={{ key: null, direction: 'asc' }}
              />
            </CardContent>
          </Card>
        </div>
      );
    }

    if (path.includes('/shopping')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shopping & Catalogs</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search Catalogs
              </Button>
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Office Supplies', 'IT Equipment', 'Marketing Materials'].map((catalog) => (
              <Card key={catalog} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{catalog}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Browse {catalog.toLowerCase()} catalog</p>
                  <Button variant="outline" className="w-full">
                    Browse Catalog
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (path.includes('/templates')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Requisition Templates</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Monthly Office Supplies', 'IT Equipment Request', 'Travel Booking', 'Marketing Campaign'].map((template) => (
              <Card key={template} className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">{template}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Template</Badge>
                    <Button size="sm">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Default create requisition page
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Create New Requisition</h2>
        <Card>
          <CardHeader>
            <CardTitle>Requisition Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Start New Requisition
              </Button>
              <div className="text-center text-gray-500">
                or choose from templates above
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const getPageTitle = () => {
    if (path.includes('/my')) return 'My Requisitions';
    if (path.includes('/pending')) return 'Pending Approval';
    if (path.includes('/approved')) return 'Approved Requisitions';
    if (path.includes('/templates')) return 'Requisition Templates';
    if (path.includes('/shopping')) return 'Shopping & Catalogs';
    if (path.includes('/quick-order')) return 'Quick Order';
    return 'Create Requisition';
  };

  if (loading) {
    return (
      <ApplicationLayout pageTitle={getPageTitle()}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout pageTitle={getPageTitle()}>
      <div className="space-y-6">
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  alert.type === 'urgent' ? 'bg-red-50 border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <span className="text-sm font-medium">{alert.message}</span>
              </div>
            ))}
          </div>
        )}

        {getPageContent()}

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Create New Requisition"
          fields={[
            { name: 'title', label: 'Requisition Title', type: 'text' as const, required: true },
            { name: 'department', label: 'Department', type: 'text' as const, required: true },
            { name: 'justification', label: 'Business Justification', type: 'textarea' as const, required: true },
            { name: 'priority', label: 'Priority', type: 'select' as const, required: true, options: [
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'urgent', label: 'Urgent' }
            ]}
          ]}
          values={{}}
          onValuesChange={() => {}}
          onSubmit={() => setDialogOpen(false)}
          submitText="Create Requisition"
        />
      </div>
    </ApplicationLayout>
  );
};
