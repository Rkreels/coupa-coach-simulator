import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Mail, Plus, Settings, Edit } from 'lucide-react';

const EmailTemplates = () => {
  const emailTemplates = [
    {
      id: 'ET-001',
      name: 'Requisition Approval Request',
      category: 'Approvals',
      status: 'Active',
      lastModified: '2024-01-10',
      usage: 'High',
      language: 'English'
    },
    {
      id: 'ET-002',
      name: 'Purchase Order Confirmation',
      category: 'Orders',
      status: 'Active',
      lastModified: '2024-01-08',
      usage: 'High',
      language: 'English'
    },
    {
      id: 'ET-003',
      name: 'Invoice Rejection Notice',
      category: 'Invoices',
      status: 'Active',
      lastModified: '2024-01-05',
      usage: 'Medium',
      language: 'English'
    },
    {
      id: 'ET-004',
      name: 'Supplier Welcome Email',
      category: 'Suppliers',
      status: 'Draft',
      lastModified: '2024-01-03',
      usage: 'Low',
      language: 'English'
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Template Name' },
    { key: 'category', header: 'Category' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'lastModified', header: 'Last Modified' },
    { 
      key: 'usage', 
      header: 'Usage',
      render: (value: string) => (
        <Badge variant={value === 'High' ? 'destructive' : value === 'Medium' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'language', header: 'Language' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <ApplicationLayout 
      pageTitle="Email Templates"
      pageLoadScript="Customize notification and communication templates for automated messaging."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{emailTemplates.length}</h3>
              <p className="text-gray-600">Email Templates</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{emailTemplates.filter(t => t.status === 'Active').length}</h3>
            <p className="text-gray-600">Active Templates</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-gray-600">Template Categories</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">2.5k</h3>
            <p className="text-gray-600">Emails Sent Today</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Template Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
        
        <DataTable 
          data={emailTemplates}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Template Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Approval Notifications</span>
              <Badge>12 templates</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Order Confirmations</span>
              <Badge>8 templates</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Invoice Notifications</span>
              <Badge>6 templates</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Supplier Communications</span>
              <Badge>4 templates</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>System Alerts</span>
              <Badge>3 templates</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Template Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Dynamic content placeholders</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Multi-language support</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>HTML and plain text formats</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Conditional content blocks</span>
            </div>
          </div>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default EmailTemplates;