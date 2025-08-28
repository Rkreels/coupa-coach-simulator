import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Settings2, Plus, Settings, Type } from 'lucide-react';

const CustomFields = () => {
  const customFields = [
    {
      id: 'CF-001',
      name: 'Project Code',
      module: 'Requisitions',
      type: 'Text',
      required: true,
      status: 'Active',
      defaultValue: '',
      validation: 'Alphanumeric, 8 chars max'
    },
    {
      id: 'CF-002',
      name: 'Approval Level',
      module: 'Purchase Orders',
      type: 'Dropdown',
      required: false,
      status: 'Active',
      defaultValue: 'Standard',
      validation: 'Standard, Express, Emergency'
    },
    {
      id: 'CF-003',
      name: 'Supplier Risk Rating',
      module: 'Suppliers',
      type: 'Number',
      required: true,
      status: 'Active',
      defaultValue: '3',
      validation: '1-5 scale'
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Field Name' },
    { key: 'module', header: 'Module' },
    { key: 'type', header: 'Field Type' },
    { 
      key: 'required', 
      header: 'Required',
      render: (value: boolean) => (
        <Badge variant={value ? 'destructive' : 'secondary'}>
          {value ? 'Required' : 'Optional'}
        </Badge>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'defaultValue', header: 'Default Value' },
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
      pageTitle="Custom Fields"
      pageLoadScript="Create and manage custom data fields to extend functionality across modules."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Settings2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{customFields.length}</h3>
              <p className="text-gray-600">Custom Fields</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{customFields.filter(f => f.status === 'Active').length}</h3>
            <p className="text-gray-600">Active Fields</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">6</h3>
            <p className="text-gray-600">Supported Modules</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-gray-600">Field Types</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Custom Field Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Field
          </Button>
        </div>
        
        <DataTable 
          data={customFields}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Field Types</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Text Input</span>
              <Badge variant="outline">Basic</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Number Input</span>
              <Badge variant="outline">Basic</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Dropdown Select</span>
              <Badge variant="outline">Basic</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Date Picker</span>
              <Badge variant="outline">Basic</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Checkbox</span>
              <Badge variant="outline">Basic</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Multi-select</span>
              <Badge>Advanced</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Field Configuration</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-purple-600" />
              <span>Validation rules and constraints</span>
            </div>
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-purple-600" />
              <span>Default value assignment</span>
            </div>
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-purple-600" />
              <span>Conditional field visibility</span>
            </div>
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-purple-600" />
              <span>Cross-module field mapping</span>
            </div>
          </div>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default CustomFields;