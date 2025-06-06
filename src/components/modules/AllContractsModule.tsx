import React, { useState } from 'react';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/ui/form-dialog';
import { ImportExport } from '@/components/ui/import-export';
import { useContracts, Contract } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, Edit, Trash, FileText, AlertTriangle, Calendar, Shield } from 'lucide-react';

export const AllContractsModule = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const {
    contracts,
    allContracts,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    addContract,
    updateContract,
    deleteContract,
    getMetrics
  } = useContracts();

  const metrics = getMetrics();

  const formFields = [
    { name: 'title', label: 'Contract Title', type: 'text' as const, required: true },
    { 
      name: 'type', 
      label: 'Contract Type', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'purchase', label: 'Purchase' },
        { value: 'service', label: 'Service' },
        { value: 'master', label: 'Master Agreement' },
        { value: 'framework', label: 'Framework' },
        { value: 'nda', label: 'NDA' },
        { value: 'amendment', label: 'Amendment' }
      ]
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'pending', label: 'Pending' },
        { value: 'active', label: 'Active' },
        { value: 'expired', label: 'Expired' },
        { value: 'terminated', label: 'Terminated' },
        { value: 'renewed', label: 'Renewed' }
      ]
    },
    { name: 'supplier', label: 'Supplier Name', type: 'text' as const, required: true },
    { name: 'supplierId', label: 'Supplier ID', type: 'text' as const, required: true },
    { name: 'value', label: 'Contract Value', type: 'number' as const, required: true },
    { name: 'currency', label: 'Currency', type: 'text' as const, placeholder: 'USD' },
    { name: 'startDate', label: 'Start Date', type: 'date' as const, required: true },
    { name: 'endDate', label: 'End Date', type: 'date' as const, required: true },
    { name: 'renewalDate', label: 'Renewal Date', type: 'date' as const },
    { name: 'department', label: 'Department', type: 'text' as const, required: true },
    { name: 'owner', label: 'Contract Owner', type: 'text' as const, required: true },
    { name: 'approver', label: 'Approver', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { 
      name: 'riskLevel', 
      label: 'Risk Level', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' }
      ]
    },
    { name: 'notificationDays', label: 'Notification Days', type: 'number' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ];

  const columns = [
    { key: 'id' as keyof Contract, header: 'Contract ID', sortable: true },
    { key: 'title' as keyof Contract, header: 'Title', sortable: true },
    { 
      key: 'type' as keyof Contract, 
      header: 'Type', 
      render: (value: string) => getTypeBadge(value as Contract['type'])
    },
    { 
      key: 'status' as keyof Contract, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value as Contract['status'])
    },
    { key: 'supplier' as keyof Contract, header: 'Supplier', sortable: true },
    { 
      key: 'value' as keyof Contract, 
      header: 'Value', 
      sortable: true,
      render: (value: number, item: Contract) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'endDate' as keyof Contract, header: 'End Date', sortable: true },
    { 
      key: 'riskLevel' as keyof Contract, 
      header: 'Risk', 
      render: (value: string) => getRiskBadge(value as Contract['riskLevel'])
    }
  ];

  const handleAddContract = () => {
    setEditingContract(null);
    setFormValues({
      title: '',
      type: 'purchase',
      status: 'draft',
      supplier: '',
      supplierId: '',
      value: 0,
      currency: 'USD',
      startDate: '',
      endDate: '',
      renewalDate: '',
      department: '',
      owner: '',
      approver: '',
      description: '',
      terms: [],
      attachments: [],
      autoRenewal: false,
      notificationDays: 30,
      riskLevel: 'low',
      complianceStatus: 'compliant',
      createdDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setDialogOpen(true);
  };

  const handleEditContract = (contract: Contract) => {
    setEditingContract(contract);
    setFormValues(contract);
    setDialogOpen(true);
  };

  const handleDeleteContract = (contract: Contract) => {
    if (window.confirm(`Are you sure you want to delete contract ${contract.title}?`)) {
      deleteContract(contract.id);
      toast({
        title: "Contract Deleted",
        description: `${contract.title} has been removed.`,
      });
    }
  };

  const handleSubmit = () => {
    const contractData = {
      title: formValues.title || '',
      type: formValues.type || 'purchase',
      status: formValues.status || 'draft',
      supplier: formValues.supplier || '',
      supplierId: formValues.supplierId || '',
      value: Number(formValues.value) || 0,
      currency: formValues.currency || 'USD',
      startDate: formValues.startDate || '',
      endDate: formValues.endDate || '',
      renewalDate: formValues.renewalDate,
      department: formValues.department || '',
      owner: formValues.owner || '',
      approver: formValues.approver,
      description: formValues.description || '',
      terms: formValues.terms || [],
      attachments: formValues.attachments || [],
      autoRenewal: formValues.autoRenewal || false,
      notificationDays: Number(formValues.notificationDays) || 30,
      riskLevel: formValues.riskLevel || 'low',
      complianceStatus: formValues.complianceStatus || 'compliant',
      createdDate: formValues.createdDate || new Date().toISOString().split('T')[0],
      notes: formValues.notes || ''
    };

    if (editingContract) {
      updateContract(editingContract.id, contractData);
      toast({
        title: "Contract Updated",
        description: `${formValues.title} has been updated successfully.`,
      });
    } else {
      addContract(contractData);
      toast({
        title: "Contract Created",
        description: `${formValues.title} has been created successfully.`,
      });
    }
    setDialogOpen(false);
  };

  const getStatusBadge = (status: Contract['status']) => {
    const colors = {
      draft: 'bg-gray-50 text-gray-700 border-gray-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      active: 'bg-green-50 text-green-700 border-green-200',
      expired: 'bg-red-50 text-red-700 border-red-200',
      terminated: 'bg-red-50 text-red-700 border-red-200',
      renewed: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: Contract['type']) => {
    const colors = {
      purchase: 'bg-blue-50 text-blue-700 border-blue-200',
      service: 'bg-green-50 text-green-700 border-green-200',
      master: 'bg-purple-50 text-purple-700 border-purple-200',
      framework: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      nda: 'bg-orange-50 text-orange-700 border-orange-200',
      amendment: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getRiskBadge = (risk: Contract['riskLevel']) => {
    const colors = {
      low: 'bg-green-50 text-green-700 border-green-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      high: 'bg-orange-50 text-orange-700 border-orange-200',
      critical: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={colors[risk]}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)}
      </Badge>
    );
  };

  const renderActions = (contract: Contract) => (
    <div className="flex gap-1">
      <Button variant="outline" size="sm">
        <Eye className="h-4 w-4 mr-1" />
        View
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleEditContract(contract)}>
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600"
        onClick={() => handleDeleteContract(contract)}
      >
        <Trash className="h-4 w-4 mr-1" />
        Delete
      </Button>
    </div>
  );

  return (
    <ApplicationLayout pageTitle="Contracts Management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Contracts</p>
                <p className="text-3xl font-bold">{metrics.totalContracts}</p>
                <p className="text-sm text-blue-600">${metrics.totalValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-3xl font-bold text-green-600">{metrics.activeContracts}</p>
                <p className="text-sm text-green-600">
                  <FileText className="h-3 w-3 inline mr-1" />
                  In force
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Expiring Soon</p>
                <p className="text-3xl font-bold text-yellow-600">{metrics.expiringSoon}</p>
                <p className="text-sm text-yellow-600">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Need attention
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">High Risk</p>
                <p className="text-3xl font-bold text-red-600">{metrics.riskContracts}</p>
                <p className="text-sm text-red-600">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Monitor closely
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Contracts ({contracts.length})</CardTitle>
              <div className="flex gap-2">
                <ImportExport
                  data={allContracts}
                  onImport={() => {}}
                  filename="contracts"
                  headers={{
                    id: 'Contract ID',
                    title: 'Title',
                    type: 'Type',
                    status: 'Status',
                    supplier: 'Supplier',
                    value: 'Value',
                    startDate: 'Start Date',
                    endDate: 'End Date'
                  } as any}
                />
                <Button onClick={handleAddContract}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contract
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={contracts}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={renderActions}
            />
          </CardContent>
        </Card>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editingContract ? 'Edit Contract' : 'Create New Contract'}
          fields={formFields}
          values={formValues}
          onValuesChange={setFormValues}
          onSubmit={handleSubmit}
          submitText={editingContract ? 'Update' : 'Create'}
        />
      </div>
    </ApplicationLayout>
  );
};
