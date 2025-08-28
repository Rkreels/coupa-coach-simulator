import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Percent, Plus, Settings, Globe } from 'lucide-react';

const TaxConfiguration = () => {
  const taxRates = [
    {
      id: 'TX-001',
      name: 'Standard VAT',
      type: 'VAT',
      rate: '20.00%',
      region: 'United Kingdom',
      status: 'Active',
      effectiveDate: '2024-01-01',
      applicableCategories: 'All except exempt'
    },
    {
      id: 'TX-002',
      name: 'Sales Tax - NY',
      type: 'Sales Tax',
      rate: '8.25%',
      region: 'New York, USA',
      status: 'Active',
      effectiveDate: '2024-01-01',
      applicableCategories: 'Taxable goods'
    },
    {
      id: 'TX-003',
      name: 'GST',
      type: 'GST',
      rate: '10.00%',
      region: 'Australia',
      status: 'Active',
      effectiveDate: '2024-01-01',
      applicableCategories: 'Most goods and services'
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Tax Name' },
    { key: 'type', header: 'Type' },
    { key: 'rate', header: 'Rate' },
    { key: 'region', header: 'Region' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'effectiveDate', header: 'Effective Date' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <ApplicationLayout 
      pageTitle="Tax Configuration"
      pageLoadScript="Configure tax rates, regional settings, and compliance rules for global operations."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Percent className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{taxRates.length}</h3>
              <p className="text-gray-600">Tax Configurations</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{taxRates.filter(t => t.status === 'Active').length}</h3>
            <p className="text-gray-600">Active Tax Rates</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-gray-600">Supported Regions</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">98.5%</h3>
            <p className="text-gray-600">Compliance Rate</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Tax Rate Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tax Configuration
          </Button>
        </div>
        
        <DataTable 
          data={taxRates}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Regional Tax Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Default Tax Calculation</span>
              <Badge>Inclusive</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax Reporting Period</span>
              <span>Monthly</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Auto Tax Updates</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Reverse Charge VAT</span>
              <Badge>Supported</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Multi-currency tax calculations</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Real-time tax rate updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Automated compliance reporting</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Audit trail for tax changes</span>
            </div>
          </div>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default TaxConfiguration;