import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Settings, CheckCircle } from 'lucide-react';

const PaymentMethods = () => {
  const paymentMethods = [
    {
      id: 'PM-001',
      name: 'ACH Transfer',
      type: 'Bank Transfer',
      status: 'Active',
      provider: 'First National Bank',
      fees: '$2.50 per transaction',
      processingTime: '1-2 business days',
      usageCount: 245
    },
    {
      id: 'PM-002',
      name: 'Corporate Credit Card',
      type: 'Credit Card',
      status: 'Active', 
      provider: 'Chase Business',
      fees: '2.9% + $0.30',
      processingTime: 'Instant',
      usageCount: 89
    },
    {
      id: 'PM-003',
      name: 'Wire Transfer',
      type: 'Wire',
      status: 'Active',
      provider: 'Multiple Banks',
      fees: '$25.00 per transaction',
      processingTime: 'Same day',
      usageCount: 23
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Payment Method' },
    { key: 'type', header: 'Type' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'provider', header: 'Provider' },
    { key: 'fees', header: 'Fees' },
    { key: 'processingTime', header: 'Processing Time' },
    { key: 'usageCount', header: 'Usage Count' },
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
      pageTitle="Payment Methods"
      pageLoadScript="Configure payment providers, processing options, and financial account settings."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{paymentMethods.length}</h3>
              <p className="text-gray-600">Payment Methods</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{paymentMethods.filter(p => p.status === 'Active').length}</h3>
            <p className="text-gray-600">Active Methods</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">357</h3>
            <p className="text-gray-600">Total Transactions</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">$1.2M</h3>
            <p className="text-gray-600">Total Processed</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Method Configuration</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
        
        <DataTable 
          data={paymentMethods}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Default Payment Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Default Payment Method</span>
              <Badge>ACH Transfer</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Auto-approval Limit</span>
              <span>$5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Payment Terms</span>
              <span>Net 30</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Early Payment Discount</span>
              <Badge variant="secondary">2% / 10 days</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security & Compliance</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>PCI DSS Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>SOX Controls</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Bank Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Audit Trail</span>
            </div>
          </div>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default PaymentMethods;