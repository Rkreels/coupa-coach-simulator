import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Shield, Edit, Trash2 } from 'lucide-react';

const UsersRoles = () => {
  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@acme.com',
      role: 'Procurement Manager',
      status: 'Active',
      department: 'Procurement',
      lastLogin: '2024-01-15',
      permissions: ['requisitions.create', 'orders.approve']
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@acme.com',
      role: 'System Administrator',
      status: 'Active',
      department: 'IT',
      lastLogin: '2024-01-14',
      permissions: ['admin.full_access']
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@acme.com',
      role: 'Buyer',
      status: 'Inactive',
      department: 'Procurement',
      lastLogin: '2024-01-10',
      permissions: ['requisitions.view', 'suppliers.manage']
    }
  ];

  const roles = [
    {
      id: '1',
      name: 'System Administrator',
      description: 'Full system access and configuration',
      userCount: 2,
      permissions: ['admin.full_access', 'system.configure']
    },
    {
      id: '2',
      name: 'Procurement Manager',
      description: 'Manage procurement processes and approvals',
      userCount: 5,
      permissions: ['requisitions.approve', 'orders.create', 'suppliers.manage']
    },
    {
      id: '3',
      name: 'Buyer',
      description: 'Create and manage purchase orders',
      userCount: 12,
      permissions: ['requisitions.create', 'orders.create', 'suppliers.view']
    }
  ];

  const userColumns: any[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'department', header: 'Department' },
    { key: 'lastLogin', header: 'Last Login' }
  ];

  const roleColumns: any[] = [
    { key: 'name', header: 'Role Name' },
    { key: 'description', header: 'Description' },
    { key: 'userCount', header: 'Users' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <ApplicationLayout 
      pageTitle="Users & Roles"
      pageLoadScript="Manage user accounts, roles, and permissions for your organization."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">24</h3>
              <p className="text-gray-600">Total Users</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">19</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">8</h3>
              <p className="text-gray-600">User Roles</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">User Management</h3>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
          
          <DataTable 
            data={users}
            columns={userColumns}
            searchTerm=""
            onSearchChange={() => {}}
          />
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Role Management</h3>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </div>
          
          <DataTable 
            data={roles}
            columns={roleColumns}
            searchTerm=""
            onSearchChange={() => {}}
          />
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default UsersRoles;