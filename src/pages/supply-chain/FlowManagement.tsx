import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { useSupplyChainData } from '../../hooks/useSupplyChainData';
import { Package, TrendingUp, MapPin, Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FlowManagementPage = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFlow, setEditingFlow] = useState<any>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const {
    flows,
    metrics,
    searchTerm,
    setSearchTerm,
    addFlow,
    updateFlow,
    deleteFlow
  } = useSupplyChainData();

  const formFields = [
    { name: 'source', label: 'Source Location', type: 'text' as const, required: true },
    { name: 'customer', label: 'Destination', type: 'text' as const, required: true },
    { name: 'product', label: 'Product', type: 'text' as const, required: true },
    { name: 'mode', label: 'Transportation Mode', type: 'text' as const, required: true },
    { name: 'totalFlowUnits', label: 'Flow Units', type: 'number' as const, required: true },
    { name: 'totalCost', label: 'Total Cost', type: 'number' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'optimizing', label: 'Optimizing' }
      ]
    }
  ];

  const handleAddFlow = () => {
    setEditingFlow(null);
    setFormValues({
      source: '',
      customer: '',
      product: '',
      mode: 'Ground',
      totalFlowUnits: 0,
      totalCost: 0,
      status: 'active'
    });
    setDialogOpen(true);
  };

  const handleEditFlow = (flow: any) => {
    setEditingFlow(flow);
    setFormValues(flow);
    setDialogOpen(true);
  };

  const handleDeleteFlow = (flow: any) => {
    if (window.confirm(`Delete flow from ${flow.source} to ${flow.customer}?`)) {
      deleteFlow(flow.id);
      toast({
        title: "Flow Deleted",
        description: `Flow from ${flow.source} to ${flow.customer} has been removed.`
      });
    }
  };

  const handleSubmit = () => {
    const flowData = {
      source: formValues.source,
      customer: formValues.customer,
      product: formValues.product,
      mode: formValues.mode,
      period: 'SINGLEPERIOD',
      totalFlowUnits: Number(formValues.totalFlowUnits),
      totalCost: Number(formValues.totalCost),
      averageFlowCostPerUnit: Number(formValues.totalCost) / Number(formValues.totalFlowUnits) || 0,
      status: formValues.status,
      riskLevel: 'medium' as const,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingFlow) {
      updateFlow(editingFlow.id, flowData);
      toast({
        title: "Flow Updated",
        description: `Flow from ${formValues.source} to ${formValues.customer} updated.`
      });
    } else {
      addFlow(flowData);
      toast({
        title: "Flow Added", 
        description: `New flow from ${formValues.source} to ${formValues.customer} created.`
      });
    }
    setDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-50 text-green-700 border-green-200',
      inactive: 'bg-gray-50 text-gray-700 border-gray-200',
      optimizing: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns: any[] = [
    { key: 'source' as const, header: 'Source', sortable: true },
    { key: 'customer' as const, header: 'Destination', sortable: true },
    { key: 'product' as const, header: 'Product', sortable: true },
    { key: 'mode' as const, header: 'Mode', sortable: true },
    { 
      key: 'totalFlowUnits' as const, 
      header: 'Units', 
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    { 
      key: 'totalCost' as const, 
      header: 'Cost', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'status' as const, 
      header: 'Status',
      render: (value: string) => getStatusBadge(value)
    }
  ];

  return (
    <ApplicationLayout pageTitle="Flow Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Supply Chain Flow Management</h2>
          <Button onClick={handleAddFlow}>
            <Plus className="h-4 w-4 mr-2" />
            Add Flow
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Flows</p>
                  <h3 className="text-2xl font-bold text-blue-600">{flows.filter(f => f.status === 'active').length}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Units</p>
                  <h3 className="text-2xl font-bold text-green-600">{metrics.totalFlowUnits.toLocaleString()}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Cost</p>
                  <h3 className="text-2xl font-bold text-purple-600">${metrics.totalCost.toLocaleString()}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Optimizing</p>
                  <h3 className="text-2xl font-bold text-orange-600">{flows.filter(f => f.status === 'optimizing').length}</h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flow Details</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={flows}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditFlow(item)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteFlow(item)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editingFlow ? 'Edit Flow' : 'Add New Flow'}
          fields={formFields}
          values={formValues}
          onValuesChange={setFormValues}
          onSubmit={handleSubmit}
          submitText={editingFlow ? 'Update' : 'Add'}
        />
      </div>
    </ApplicationLayout>
  );
};

export default FlowManagementPage;