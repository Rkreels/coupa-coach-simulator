import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';

const Departments = () => {
  const departments = [
    {
      id: 'DEPT-001',
      name: 'Procurement',
      code: 'PROC',
      manager: 'John Smith',
      costCenter: 'CC-1001',
      budget: 500000,
      spent: 245000,
      employees: 12,
      status: 'Active'
    },
    {
      id: 'DEPT-002',
      name: 'Information Technology',
      code: 'IT',
      manager: 'Sarah Wilson',
      costCenter: 'CC-1002',
      budget: 750000,
      spent: 432000,
      employees: 18,
      status: 'Active'
    },
    {
      id: 'DEPT-003',
      name: 'Human Resources',
      code: 'HR',
      manager: 'Mike Rodriguez',
      costCenter: 'CC-1003',
      budget: 300000,
      spent: 156000,
      employees: 8,
      status: 'Active'
    },
    {
      id: 'DEPT-004',
      name: 'Marketing',
      code: 'MKT',
      manager: 'Lisa Johnson',
      costCenter: 'CC-1004',
      budget: 400000,
      spent: 298000,
      employees: 15,
      status: 'Active'
    }
  ];

  const columns: any[] = [
    { key: 'name', header: 'Department Name' },
    { key: 'code', header: 'Code' },
    { key: 'manager', header: 'Manager' },
    { key: 'costCenter', header: 'Cost Center' },
    { 
      key: 'budget', 
      header: 'Budget',
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'spent', 
      header: 'Spent',
      render: (value: number, row: any) => {
        const percentage = (value / row.budget) * 100;
        return (
          <div>
            <div className="text-sm">${value.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
          </div>
        );
      }
    },
    { key: 'employees', header: 'Employees' },
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

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSpent = departments.reduce((sum, dept) => sum + dept.spent, 0);
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employees, 0);

  return (
    <ApplicationLayout 
      pageTitle="Departments"
      pageLoadScript="Manage organizational departments and cost centers for better budget tracking and reporting."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{departments.length}</h3>
              <p className="text-gray-600">Departments</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">${totalBudget.toLocaleString()}</h3>
            <p className="text-gray-600">Total Budget</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">${totalSpent.toLocaleString()}</h3>
            <p className="text-gray-600">Total Spent</p>
            <div className="text-sm text-gray-500">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div>
            <h3 className="text-2xl font-bold">{totalEmployees}</h3>
            <p className="text-gray-600">Total Employees</p>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Department Management</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>
        
        <DataTable 
          data={departments}
          columns={columns}
          searchTerm=""
          onSearchChange={() => {}}
        />
      </Card>
    </ApplicationLayout>
  );
};

export default Departments;