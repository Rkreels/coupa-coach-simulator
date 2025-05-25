
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { TotalMetricCard } from '../components/supply-chain/TotalMetricCard';
import { ProductFlowChart } from '../components/supply-chain/ProductFlowChart';
import { FlowUnitsCostScatter } from '../components/supply-chain/FlowUnitsCostScatter';
import { CustomerFlowBarChart } from '../components/supply-chain/CustomerFlowBarChart';
import { CustomerFlowDetailsTable } from '../components/supply-chain/CustomerFlowDetailsTable';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { ImportExport } from '@/components/ui/import-export';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSupplyChainData, SupplyChainFlow } from '../hooks/useSupplyChainData';
import { supplyChainData, voiceScripts } from '../data/supplyChainData';
import { RefreshCw, Info, Plus, MoreVertical, Edit, Trash, Settings } from 'lucide-react';
import { VoiceElement } from '../components/VoiceElement';
import { useToast } from '@/hooks/use-toast';

const SupplyChain = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFlow, setEditingFlow] = useState<SupplyChainFlow | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const {
    flows,
    allFlows,
    metrics,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortConfig,
    handleSort,
    addFlow,
    updateFlow,
    deleteFlow,
    totalCount,
    filteredCount
  } = useSupplyChainData();

  const formFields = [
    { name: 'source', label: 'Source Location', type: 'text' as const, required: true },
    { name: 'customer', label: 'Customer', type: 'text' as const, required: true },
    { name: 'product', label: 'Product', type: 'text' as const, required: true },
    { name: 'mode', label: 'Transportation Mode', type: 'text' as const, required: true },
    { name: 'period', label: 'Period', type: 'text' as const, required: true },
    { name: 'totalFlowUnits', label: 'Total Flow Units', type: 'number' as const, required: true },
    { name: 'totalCost', label: 'Total Cost', type: 'number' as const, required: true },
    { name: 'averageFlowCostPerUnit', label: 'Cost Per Unit', type: 'number' as const, required: true },
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
    },
    { 
      name: 'riskLevel', 
      label: 'Risk Level', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    }
  ];

  const columns = [
    { key: 'source' as keyof SupplyChainFlow, header: 'Source', sortable: true },
    { key: 'customer' as keyof SupplyChainFlow, header: 'Customer', sortable: true },
    { key: 'product' as keyof SupplyChainFlow, header: 'Product', sortable: true },
    { key: 'mode' as keyof SupplyChainFlow, header: 'Mode', sortable: true },
    { 
      key: 'totalFlowUnits' as keyof SupplyChainFlow, 
      header: 'Flow Units', 
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    { 
      key: 'totalCost' as keyof SupplyChainFlow, 
      header: 'Total Cost', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'averageFlowCostPerUnit' as keyof SupplyChainFlow, 
      header: 'Cost/Unit', 
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { 
      key: 'status' as keyof SupplyChainFlow, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value as SupplyChainFlow['status'])
    },
    { 
      key: 'riskLevel' as keyof SupplyChainFlow, 
      header: 'Risk', 
      render: (value: string) => getRiskBadge(value as SupplyChainFlow['riskLevel'])
    }
  ];

  const handleAddFlow = () => {
    setEditingFlow(null);
    setFormValues({
      source: '',
      customer: '',
      product: '',
      mode: '',
      period: 'SINGLEPERIOD',
      totalFlowUnits: 0,
      totalCost: 0,
      averageFlowCostPerUnit: 0,
      status: 'active',
      riskLevel: 'medium',
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    setDialogOpen(true);
  };

  const handleEditFlow = (flow: SupplyChainFlow) => {
    setEditingFlow(flow);
    setFormValues(flow);
    setDialogOpen(true);
  };

  const handleDeleteFlow = (flow: SupplyChainFlow) => {
    if (window.confirm(`Are you sure you want to delete this flow from ${flow.source} to ${flow.customer}?`)) {
      deleteFlow(flow.id);
      toast({
        title: "Flow Deleted",
        description: `Flow from ${flow.source} to ${flow.customer} has been removed.`,
      });
    }
  };

  const handleSubmit = () => {
    const flowData = {
      source: formValues.source || '',
      customer: formValues.customer || '',
      product: formValues.product || '',
      mode: formValues.mode || '',
      period: formValues.period || 'SINGLEPERIOD',
      totalFlowUnits: Number(formValues.totalFlowUnits) || 0,
      totalCost: Number(formValues.totalCost) || 0,
      averageFlowCostPerUnit: Number(formValues.averageFlowCostPerUnit) || 0,
      status: formValues.status || 'active',
      riskLevel: formValues.riskLevel || 'medium',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingFlow) {
      updateFlow(editingFlow.id, flowData);
      toast({
        title: "Flow Updated",
        description: `Flow from ${formValues.source} to ${formValues.customer} has been updated.`,
      });
    } else {
      addFlow(flowData);
      toast({
        title: "Flow Added",
        description: `New flow from ${formValues.source} to ${formValues.customer} has been created.`,
      });
    }
    setDialogOpen(false);
  };

  const handleImport = (importedData: SupplyChainFlow[]) => {
    importedData.forEach(flow => {
      const flowWithDefaults = {
        source: flow.source || '',
        customer: flow.customer || '',
        product: flow.product || '',
        mode: flow.mode || '',
        period: flow.period || 'SINGLEPERIOD',
        totalFlowUnits: flow.totalFlowUnits || 0,
        totalCost: flow.totalCost || 0,
        averageFlowCostPerUnit: flow.averageFlowCostPerUnit || 0,
        status: flow.status || 'active',
        riskLevel: flow.riskLevel || 'medium',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      addFlow(flowWithDefaults);
    });
  };

  const getStatusBadge = (status: SupplyChainFlow['status']) => {
    const colors = {
      active: 'bg-green-50 text-green-700 border-green-200',
      inactive: 'bg-gray-50 text-gray-700 border-gray-200',
      optimizing: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRiskBadge = (risk: SupplyChainFlow['riskLevel']) => {
    const colors = {
      low: 'bg-green-50 text-green-700 border-green-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      high: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={colors[risk]}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)}
      </Badge>
    );
  };

  const renderActions = (flow: SupplyChainFlow) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEditFlow(flow)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Flow
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
          Optimize Route
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDeleteFlow(flow)}
          className="text-red-600"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <ApplicationLayout pageLoadScript={voiceScripts.supplyChain.pageLoad}>
      <div className="space-y-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Workbooks › </span>
            <span className="text-sm">Supply Chain Analytics</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Data Last Refreshed: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            <Button variant="outline" size="sm" className="flex items-center gap-1 h-8">
              <RefreshCw className="w-3 h-3" />
              Refresh Data
            </Button>
          </div>
        </div>

        <Card className="p-3 mb-6 bg-gray-50 border-gray-200">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Assets
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Info className="w-3 h-3" />
              Insight Advisor
            </Button>
            
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                Sheets
              </Button>
              <Button variant="outline" size="sm">
                Duplicate
              </Button>
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TotalMetricCard 
            title="Total Cost" 
            value={metrics.totalCost}
            whatScript={voiceScripts.supplyChain.costOverview.what}
            howScript={voiceScripts.supplyChain.costOverview.how}
            decisionScript={voiceScripts.supplyChain.costOverview.decision}
          />
          <TotalMetricCard 
            title="Total Flow Units" 
            value={metrics.totalFlowUnits}
          />
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Average Performance</p>
                <p className="text-3xl font-bold">{metrics.averagePerformance}%</p>
                <p className="text-sm text-blue-600">Efficiency Score</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">High Risk Flows</p>
                <p className="text-3xl font-bold text-red-600">{metrics.highRiskFlows}</p>
                <p className="text-sm text-red-600">Need Attention</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <ProductFlowChart 
            data={supplyChainData.flowUnitsByProduct}
            whatScript={voiceScripts.supplyChain.flowUnitsChart.what}
            howScript={voiceScripts.supplyChain.flowUnitsChart.how}
            decisionScript={voiceScripts.supplyChain.flowUnitsChart.decision}
          />
          <VoiceElement
            whatScript="This is the customer flow map visualization. It shows the geographic flow of goods between your distribution centers and customers."
            howScript="Thicker lines represent higher flow volumes. Hover over locations for detailed metrics."
            decisionScript="If you see concentrated flows in certain regions, consider adding distribution centers there to reduce shipping costs."
          >
            <Card className="bg-white">
              <div className="p-3 border-b">
                <h3 className="text-sm text-gray-600">Customer Flow Map</h3>
              </div>
              <div className="h-64 p-4 flex justify-center items-center">
                <div className="text-center text-gray-500">
                  <img 
                    src="/lovable-uploads/84a0a1cd-6e19-45e5-bf62-4cb6629f538f.png" 
                    alt="Customer Flow Map"
                    className="max-h-60 object-contain mx-auto opacity-75" 
                  />
                </div>
              </div>
            </Card>
          </VoiceElement>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <FlowUnitsCostScatter 
            data={supplyChainData.flowUnitsByCost}
            whatScript={voiceScripts.supplyChain.costBySource.what}
            howScript={voiceScripts.supplyChain.costBySource.how}
            decisionScript={voiceScripts.supplyChain.costBySource.decision}
          />
          <CustomerFlowBarChart 
            data={supplyChainData.customerPerformance}
            whatScript={voiceScripts.supplyChain.customerFlow.what}
            howScript={voiceScripts.supplyChain.customerFlow.how}
            decisionScript={voiceScripts.supplyChain.customerFlow.decision}
          />
        </div>

        {/* Enhanced Flow Management Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Supply Chain Flows ({filteredCount} of {totalCount})</CardTitle>
              <div className="flex gap-2">
                <ImportExport
                  data={allFlows}
                  onImport={handleImport}
                  filename="supply-chain-flows"
                  headers={{
                    id: 'ID',
                    source: 'Source',
                    customer: 'Customer',
                    product: 'Product',
                    mode: 'Mode',
                    period: 'Period',
                    totalFlowUnits: 'Flow Units',
                    totalCost: 'Total Cost',
                    averageFlowCostPerUnit: 'Cost Per Unit',
                    status: 'Status',
                    riskLevel: 'Risk Level',
                    lastUpdated: 'Last Updated'
                  }}
                />
                <Button onClick={handleAddFlow}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Flow
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={flows}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSort={handleSort}
              sortConfig={sortConfig}
              actions={renderActions}
            />
          </CardContent>
        </Card>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editingFlow ? 'Edit Supply Chain Flow' : 'Add New Flow'}
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

export default SupplyChain;
