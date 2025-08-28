import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

const SecuritySettings = () => {
  const securityPolicies = [
    {
      id: 'SP-001',
      name: 'Password Policy',
      type: 'Authentication',
      status: 'Active',
      lastUpdated: '2024-01-01',
      compliance: 'SOX, ISO 27001',
      severity: 'Critical'
    },
    {
      id: 'SP-002',
      name: 'Multi-Factor Authentication',
      type: 'Authentication',
      status: 'Active',
      lastUpdated: '2024-01-01',
      compliance: 'SOX, PCI DSS',
      severity: 'Critical'
    },
    {
      id: 'SP-003',
      name: 'Session Timeout',
      type: 'Access Control',
      status: 'Active',
      lastUpdated: '2023-12-15',
      compliance: 'ISO 27001',
      severity: 'Medium'
    },
    {
      id: 'SP-004',
      name: 'IP Whitelisting',
      type: 'Network Security',
      status: 'Inactive',
      lastUpdated: '2023-11-20',
      compliance: 'Internal Policy',
      severity: 'Low'
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Policy Name' },
    { key: 'type', header: 'Type' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          <div className="flex items-center gap-1">
            {value === 'Active' ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
            {value}
          </div>
        </Badge>
      )
    },
    { key: 'lastUpdated', header: 'Last Updated' },
    { key: 'compliance', header: 'Compliance' },
    { 
      key: 'severity', 
      header: 'Severity',
      render: (value: string) => (
        <Badge variant={value === 'Critical' ? 'destructive' : value === 'Medium' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
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
      pageTitle="Security Settings"
      pageLoadScript="Configure authentication and security policies to protect your organization's data."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{securityPolicies.length}</h3>
              <p className="text-gray-600">Security Policies</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{securityPolicies.filter(p => p.status === 'Active').length}</h3>
            <p className="text-gray-600">Active Policies</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-gray-600">Compliance Score</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-gray-600">Security Incidents</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Security Policy Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Security Policy
          </Button>
        </div>
        
        <DataTable 
          data={securityPolicies}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security Features</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Password Complexity</span>
              <Badge>Enforced</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Session Management</span>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Audit Logging</span>
              <Badge>Comprehensive</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Encryption</span>
              <Badge>AES-256</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance Standards</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>SOX Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>GDPR Ready</span>
            </div>
          </div>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default SecuritySettings;