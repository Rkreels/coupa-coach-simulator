import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Workflow, Plus, Play, Pause, Edit } from 'lucide-react';

const ApprovalWorkflows = () => {
  const workflows = [
    {
      id: 'WF-001',
      name: 'Purchase Requisition Approval',
      type: 'Requisition',
      status: 'Active',
      triggers: 'Amount > $1000',
      steps: 3,
      avgProcessingTime: '2.5 days',
      totalProcessed: 156
    },
    {
      id: 'WF-002', 
      name: 'Contract Review Workflow',
      type: 'Contract',
      status: 'Active',
      triggers: 'New Contract Creation',
      steps: 4,
      avgProcessingTime: '5.2 days',
      totalProcessed: 28
    },
    {
      id: 'WF-003',
      name: 'Supplier Onboarding',
      type: 'Supplier',
      status: 'Draft',
      triggers: 'New Supplier Registration',
      steps: 5,
      avgProcessingTime: '8.5 days',
      totalProcessed: 12
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Workflow Name' },
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
    { key: 'triggers', header: 'Triggers' },
    { key: 'steps', header: 'Steps' },
    { key: 'avgProcessingTime', header: 'Avg Time' },
    { key: 'totalProcessed', header: 'Processed' },
    {
      key: 'actions',
      header: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            {row.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      )
    }
  ];

  return (
    <ApplicationLayout 
      pageTitle="Approval Workflows"
      pageLoadScript="Configure approval chains and business rules for automated workflow processing."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Workflow className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{workflows.length}</h3>
              <p className="text-gray-600">Total Workflows</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{workflows.filter(w => w.status === 'Active').length}</h3>
            <p className="text-gray-600">Active Workflows</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">3.2</h3>
            <p className="text-gray-600">Avg Processing Days</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">196</h3>
            <p className="text-gray-600">Items Processed</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Workflow Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
        
        <DataTable 
          data={workflows}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
    </ApplicationLayout>
  );
};

export default ApprovalWorkflows;