import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Plus, Settings, TrendingUp } from 'lucide-react';

const Currencies = () => {
  const currencies = [
    {
      id: 'CUR-001',
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      rate: '1.0000',
      status: 'Active',
      lastUpdated: '2024-01-15 10:30',
      isBase: true
    },
    {
      id: 'CUR-002',
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      rate: '0.8500',
      status: 'Active',
      lastUpdated: '2024-01-15 10:30',
      isBase: false
    },
    {
      id: 'CUR-003',
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      rate: '0.7500',
      status: 'Active',
      lastUpdated: '2024-01-15 10:30',
      isBase: false
    }
  ];

  const columns: any[] = [
    { key: 'code', header: 'Currency Code' },
    { key: 'name', header: 'Currency Name' },
    { key: 'symbol', header: 'Symbol' },
    { key: 'rate', header: 'Exchange Rate' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'isBase', 
      header: 'Base Currency',
      render: (value: boolean) => value ? <Badge>Base</Badge> : null
    },
    { key: 'lastUpdated', header: 'Last Updated' },
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
      pageTitle="Currencies"
      pageLoadScript="Manage multi-currency support and configure exchange rate settings for global operations."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{currencies.length}</h3>
              <p className="text-gray-600">Active Currencies</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">USD</h3>
            <p className="text-gray-600">Base Currency</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">Daily</h3>
            <p className="text-gray-600">Rate Updates</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">99.9%</h3>
            <p className="text-gray-600">Rate Accuracy</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Currency Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Currency
          </Button>
        </div>
        
        <DataTable 
          data={currencies}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Exchange Rate Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Rate Provider</span>
              <Badge>XE.com</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Update Frequency</span>
              <span>Daily at 00:00 UTC</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Rate Precision</span>
              <span>4 decimal places</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Historical Data</span>
              <Badge variant="secondary">12 months</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Currency Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Real-time rate updates</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Historical rate tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Multi-currency reporting</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Automated conversions</span>
            </div>
          </div>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default Currencies;