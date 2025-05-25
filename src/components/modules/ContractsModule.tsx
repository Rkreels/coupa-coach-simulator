
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { useModuleData } from '../../hooks/useModuleData';
import { FileText, Clock, CheckCircle, AlertTriangle, Plus, Calendar } from 'lucide-react';

export const ContractsModule: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { metrics, recentItems, alerts, loading } = useModuleData('contracts');
  const [dialogOpen, setDialogOpen] = useState(false);

  const getPageContent = () => {
    if (path.includes('/create')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Create New Contract</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Master Service Agreement', 'Purchase Agreement', 'NDA', 'SLA'].map((type) => (
                  <Button key={type} variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    {type}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create from Scratch
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
                <Button variant="outline" className="w-full">
                  Import Contract
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (path.includes('/active')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Contracts</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Contract
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Active Contracts</p>
                    <p className="text-2xl font-bold">{metrics.activeContracts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Expiring Soon</p>
                    <p className="text-2xl font-bold">{metrics.expiringContracts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-2xl font-bold">${(metrics.totalValue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={recentItems}
                columns={[
                  { key: 'id', header: 'Contract ID', sortable: true },
                  { key: 'supplier', header: 'Supplier', sortable: true },
                  { 
                    key: 'status', 
                    header: 'Status',
                    render: (value: string) => (
                      <Badge variant={value === 'active' ? 'default' : value === 'expiring' ? 'destructive' : 'secondary'}>
                        {value}
                      </Badge>
                    )
                  },
                  { 
                    key: 'value', 
                    header: 'Contract Value',
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

    if (path.includes('/expiring')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Expiring Contracts</h2>
            <Button variant="outline">Export Report</Button>
          </div>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span className="font-medium text-orange-800">
                  {metrics.expiringContracts} contracts are expiring within the next 30 days
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {recentItems.filter(item => item.status === 'expiring').map((contract) => (
              <Card key={contract.id} className="border-orange-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{contract.id}</h3>
                      <p className="text-sm text-gray-600">{contract.supplier}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${contract.value.toLocaleString()}</p>
                      <Badge variant="destructive">Expires Soon</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Default all contracts page
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">All Contracts</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{metrics.totalContracts}</p>
                <p className="text-sm text-gray-500">Total Contracts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{metrics.activeContracts}</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{metrics.expiringContracts}</p>
                <p className="text-sm text-gray-500">Expiring</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{metrics.complianceRate}%</p>
                <p className="text-sm text-gray-500">Compliance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    if (path.includes('/create')) return 'Create Contract';
    if (path.includes('/templates')) return 'Contract Templates';
    if (path.includes('/pending')) return 'Pending Approval';
    if (path.includes('/active')) return 'Active Contracts';
    if (path.includes('/expiring')) return 'Expiring Contracts';
    if (path.includes('/amendments')) return 'Contract Amendments';
    if (path.includes('/compliance')) return 'Contract Compliance';
    return 'All Contracts';
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
          title="Create New Contract"
          fields={[
            { name: 'title', label: 'Contract Title', type: 'text' as const, required: true },
            { name: 'supplier', label: 'Supplier', type: 'text' as const, required: true },
            { name: 'type', label: 'Contract Type', type: 'select' as const, required: true, options: [
              { value: 'msa', label: 'Master Service Agreement' },
              { value: 'purchase', label: 'Purchase Agreement' },
              { value: 'nda', label: 'Non-Disclosure Agreement' },
              { value: 'sla', label: 'Service Level Agreement' }
            ]},
            { name: 'value', label: 'Contract Value', type: 'number' as const, required: true },
            { name: 'startDate', label: 'Start Date', type: 'date' as const, required: true },
            { name: 'endDate', label: 'End Date', type: 'date' as const, required: true }
          ]}
          values={{}}
          onValuesChange={() => {}}
          onSubmit={() => setDialogOpen(false)}
          submitText="Create Contract"
        />
      </div>
    </ApplicationLayout>
  );
};
