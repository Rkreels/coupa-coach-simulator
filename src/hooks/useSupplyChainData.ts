
import { useState, useMemo } from 'react';

export interface SupplyChainFlow {
  id: string;
  source: string;
  customer: string;
  product: string;
  mode: string;
  period: string;
  totalFlowUnits: number;
  totalCost: number;
  averageFlowCostPerUnit: number;
  status: 'active' | 'inactive' | 'optimizing';
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export interface SupplyChainMetrics {
  totalCost: number;
  totalFlowUnits: string;
  averagePerformance: number;
  highRiskFlows: number;
  activeFlows: number;
}

const initialFlows: SupplyChainFlow[] = [
  { id: '1', source: 'DC_GA', customer: 'CZ_0145', product: 'Product1', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 60900, totalCost: 64820.24, averageFlowCostPerUnit: 1.06, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-25' },
  { id: '2', source: 'DC_ME', customer: 'CZ_0146', product: 'Product1', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 64200, totalCost: 175812.92, averageFlowCostPerUnit: 2.75, status: 'active', riskLevel: 'medium', lastUpdated: '2024-05-25' },
  { id: '3', source: 'DC_WY', customer: 'CZ_0147', product: 'Product1', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 52200, totalCost: 176464.21, averageFlowCostPerUnit: 3.38, status: 'optimizing', riskLevel: 'high', lastUpdated: '2024-05-25' },
  { id: '4', source: 'DC_TX', customer: 'CZ_0148', product: 'Product2', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 78500, totalCost: 98125.00, averageFlowCostPerUnit: 1.25, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-24' },
  { id: '5', source: 'DC_CA', customer: 'CZ_0149', product: 'Product2', mode: 'DIRECT', period: 'SINGLEPERIOD', totalFlowUnits: 45300, totalCost: 158550.00, averageFlowCostPerUnit: 3.50, status: 'active', riskLevel: 'high', lastUpdated: '2024-05-24' },
  { id: '6', source: 'DC_IL', customer: 'CZ_0150', product: 'Product3', mode: 'DC_CUST', period: 'MULTIPERIOD', totalFlowUnits: 92100, totalCost: 110520.00, averageFlowCostPerUnit: 1.20, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-23' },
  { id: '7', source: 'DC_NY', customer: 'CZ_0151', product: 'Product1', mode: 'DIRECT', period: 'SINGLEPERIOD', totalFlowUnits: 33400, totalCost: 100200.00, averageFlowCostPerUnit: 3.00, status: 'optimizing', riskLevel: 'medium', lastUpdated: '2024-05-23' },
  { id: '8', source: 'DC_FL', customer: 'CZ_0152', product: 'Product3', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 71800, totalCost: 93340.00, averageFlowCostPerUnit: 1.30, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-22' },
  { id: '9', source: 'DC_PA', customer: 'CZ_0153', product: 'Product2', mode: 'DC_CUST', period: 'MULTIPERIOD', totalFlowUnits: 56700, totalCost: 141750.00, averageFlowCostPerUnit: 2.50, status: 'active', riskLevel: 'medium', lastUpdated: '2024-05-22' },
  { id: '10', source: 'DC_OH', customer: 'CZ_0154', product: 'Product1', mode: 'DIRECT', period: 'SINGLEPERIOD', totalFlowUnits: 28900, totalCost: 115600.00, averageFlowCostPerUnit: 4.00, status: 'inactive', riskLevel: 'high', lastUpdated: '2024-05-21' },
  { id: '11', source: 'DC_GA', customer: 'CZ_0155', product: 'Product3', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 84500, totalCost: 76050.00, averageFlowCostPerUnit: 0.90, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-21' },
  { id: '12', source: 'DC_MI', customer: 'CZ_0156', product: 'Product2', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 41200, totalCost: 82400.00, averageFlowCostPerUnit: 2.00, status: 'active', riskLevel: 'medium', lastUpdated: '2024-05-20' },
  { id: '13', source: 'DC_WA', customer: 'CZ_0157', product: 'Product1', mode: 'DIRECT', period: 'MULTIPERIOD', totalFlowUnits: 39800, totalCost: 139300.00, averageFlowCostPerUnit: 3.50, status: 'optimizing', riskLevel: 'high', lastUpdated: '2024-05-20' },
  { id: '14', source: 'DC_CO', customer: 'CZ_0158', product: 'Product3', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 67300, totalCost: 80760.00, averageFlowCostPerUnit: 1.20, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-19' },
  { id: '15', source: 'DC_MA', customer: 'CZ_0159', product: 'Product2', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 53600, totalCost: 107200.00, averageFlowCostPerUnit: 2.00, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-19' },
  { id: '16', source: 'DC_NC', customer: 'CZ_0160', product: 'Product1', mode: 'DIRECT', period: 'SINGLEPERIOD', totalFlowUnits: 31500, totalCost: 126000.00, averageFlowCostPerUnit: 4.00, status: 'inactive', riskLevel: 'high', lastUpdated: '2024-05-18' },
  { id: '17', source: 'DC_AZ', customer: 'CZ_0161', product: 'Product3', mode: 'DC_CUST', period: 'MULTIPERIOD', totalFlowUnits: 75800, totalCost: 90960.00, averageFlowCostPerUnit: 1.20, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-18' },
  { id: '18', source: 'DC_NJ', customer: 'CZ_0162', product: 'Product2', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 48900, totalCost: 122250.00, averageFlowCostPerUnit: 2.50, status: 'active', riskLevel: 'medium', lastUpdated: '2024-05-17' },
  { id: '19', source: 'DC_VA', customer: 'CZ_0163', product: 'Product1', mode: 'DC_CUST', period: 'SINGLEPERIOD', totalFlowUnits: 57200, totalCost: 68640.00, averageFlowCostPerUnit: 1.20, status: 'active', riskLevel: 'low', lastUpdated: '2024-05-17' },
  { id: '20', source: 'DC_MN', customer: 'CZ_0164', product: 'Product3', mode: 'DIRECT', period: 'SINGLEPERIOD', totalFlowUnits: 36400, totalCost: 145600.00, averageFlowCostPerUnit: 4.00, status: 'optimizing', riskLevel: 'high', lastUpdated: '2024-05-16' }
];

export function useSupplyChainData() {
  const [flows, setFlows] = useState(initialFlows);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SupplyChainFlow;
    direction: 'asc' | 'desc';
  } | null>(null);

  const filteredData = useMemo(() => {
    let result = flows;

    // Apply search
    if (searchTerm) {
      result = result.filter((flow) =>
        Object.values(flow).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((flow) => String(flow[key as keyof SupplyChainFlow]) === value);
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [flows, searchTerm, filters, sortConfig]);

  const metrics = useMemo((): SupplyChainMetrics => ({
    totalCost: flows.reduce((sum, flow) => sum + flow.totalCost, 0),
    totalFlowUnits: `${(flows.reduce((sum, flow) => sum + flow.totalFlowUnits, 0) / 1000000).toFixed(2)}M`,
    averagePerformance: Math.round(flows.length > 0 ? flows.reduce((sum, flow) => sum + (100 - flow.averageFlowCostPerUnit * 10), 0) / flows.length : 0),
    highRiskFlows: flows.filter(flow => flow.riskLevel === 'high').length,
    activeFlows: flows.filter(flow => flow.status === 'active').length
  }), [flows]);

  const addFlow = (flow: Omit<SupplyChainFlow, 'id'>) => {
    const newFlow = {
      ...flow,
      id: Date.now().toString()
    } as SupplyChainFlow;
    setFlows([...flows, newFlow]);
    return newFlow;
  };

  const updateFlow = (id: string, updates: Partial<SupplyChainFlow>) => {
    setFlows(flows.map(flow => 
      flow.id === id ? { ...flow, ...updates } : flow
    ));
  };

  const deleteFlow = (id: string) => {
    setFlows(flows.filter(flow => flow.id !== id));
  };

  const handleSort = (key: keyof SupplyChainFlow) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    flows: filteredData,
    allFlows: flows,
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
    totalCount: flows.length,
    filteredCount: filteredData.length
  };
}
