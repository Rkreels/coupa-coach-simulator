
import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

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
  {
    id: '1',
    source: 'DC_GA',
    customer: 'CZ_0145',
    product: 'Product1',
    mode: 'DC_CUST',
    period: 'SINGLEPERIOD',
    totalFlowUnits: 60900.00,
    totalCost: 64820.24,
    averageFlowCostPerUnit: 1.06,
    status: 'active',
    riskLevel: 'low',
    lastUpdated: '2024-05-25'
  },
  {
    id: '2',
    source: 'DC_ME',
    customer: 'CZ_0146',
    product: 'Product1',
    mode: 'DC_CUST',
    period: 'SINGLEPERIOD',
    totalFlowUnits: 64200.00,
    totalCost: 175812.92,
    averageFlowCostPerUnit: 2.75,
    status: 'active',
    riskLevel: 'medium',
    lastUpdated: '2024-05-25'
  },
  {
    id: '3',
    source: 'DC_WY',
    customer: 'CZ_0147',
    product: 'Product1',
    mode: 'DC_CUST',
    period: 'SINGLEPERIOD',
    totalFlowUnits: 52200.00,
    totalCost: 176464.21,
    averageFlowCostPerUnit: 3.38,
    status: 'optimizing',
    riskLevel: 'high',
    lastUpdated: '2024-05-25'
  }
];

export function useSupplyChainData() {
  const [flows, setFlows] = useLocalStorage('supplyChainFlows', initialFlows);
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
