import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, Settings, CheckCircle, AlertCircle } from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      id: 'INT-001',
      name: 'SAP ERP',
      type: 'ERP System',
      status: 'Connected',
      lastSync: '2024-01-15 09:30',
      frequency: 'Real-time',
      dataFlow: 'Bidirectional'
    },
    {
      id: 'INT-002',
      name: 'Salesforce CRM',
      type: 'CRM',
      status: 'Connected',
      lastSync: '2024-01-15 09:15',
      frequency: 'Every 4 hours',
      dataFlow: 'Outbound'
    },
    {
      id: 'INT-003',
      name: 'DocuSign',
      type: 'E-Signature',
      status: 'Connected',
      lastSync: '2024-01-15 08:45',
      frequency: 'On-demand',
      dataFlow: 'Bidirectional'
    },
    {
      id: 'INT-004',
      name: 'Slack',
      type: 'Communication',
      status: 'Error',
      lastSync: '2024-01-14 16:20',
      frequency: 'Real-time',
      dataFlow: 'Outbound'
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Integration Name' },
    { key: 'type', header: 'Type' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Connected' ? 'default' : value === 'Error' ? 'destructive' : 'secondary'}>
          <div className="flex items-center gap-1">
            {value === 'Connected' ? <CheckCircle className="h-3 w-3" /> : 
             value === 'Error' ? <AlertCircle className="h-3 w-3" /> : null}
            {value}
          </div>
        </Badge>
      )
    },
    { key: 'lastSync', header: 'Last Sync' },
    { key: 'frequency', header: 'Sync Frequency' },
    { key: 'dataFlow', header: 'Data Flow' },
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
      pageTitle="Integrations"
      pageLoadScript="Configure ERP and third-party system integrations for seamless data flow."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{integrations.length}</h3>
              <p className="text-gray-600">Total Integrations</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{integrations.filter(i => i.status === 'Connected').length}</h3>
            <p className="text-gray-600">Active Connections</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{integrations.filter(i => i.status === 'Error').length}</h3>
            <p className="text-gray-600">Failed Connections</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">15.2k</h3>
            <p className="text-gray-600">Records Synced Today</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Integration Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
        
        <DataTable 
          data={integrations}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Integrations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>ERP Systems</span>
              <Badge>SAP, Oracle, NetSuite</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Financial Systems</span>
              <Badge>QuickBooks, Xero</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>E-Signature</span>
              <Badge>DocuSign, Adobe Sign</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Communication</span>
              <Badge>Slack, Teams</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Document Management</span>
              <Badge>SharePoint, Box</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Integration Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <span>Real-time data synchronization</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <span>Automated error handling and retry</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <span>Data mapping and transformation</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <span>Comprehensive audit logging</span>
            </div>
          </div>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default Integrations;