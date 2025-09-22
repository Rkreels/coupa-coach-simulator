import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SupplyChainNavigation } from '../components/navigation/SupplyChainNavigation';
import FlowManagementPage from './supply-chain/FlowManagement';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { TotalMetricCard } from '../components/supply-chain/TotalMetricCard';
import { ProductFlowChart } from '../components/supply-chain/ProductFlowChart';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupplyChainData } from '../hooks/useSupplyChainData';
import { supplyChainData, voiceScripts } from '../data/supplyChainData';
import { RefreshCw, Info } from 'lucide-react';

const SupplyChainDashboard = () => {
  const { metrics } = useSupplyChainData();

  return (
    <ApplicationLayout pageLoadScript={voiceScripts.supplyChain.pageLoad}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TotalMetricCard 
            title="Total Cost" 
            value={metrics.totalCost}
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
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">High Risk Flows</p>
                <p className="text-3xl font-bold text-red-600">{metrics.highRiskFlows}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <ProductFlowChart 
            data={supplyChainData.flowUnitsByProduct}
          />
          <Card>
            <div className="h-64 p-4 flex justify-center items-center">
              <img 
                src="/lovable-uploads/84a0a1cd-6e19-45e5-bf62-4cb6629f538f.png" 
                alt="Customer Flow Map"
                className="max-h-60 object-contain opacity-75" 
              />
            </div>
          </Card>
        </div>
      </div>
    </ApplicationLayout>
  );
};

const SupplyChain = () => {
  return (
    <div>
      <SupplyChainNavigation />
      <Routes>
        <Route path="/" element={<SupplyChainDashboard />} />
        <Route path="/flow-management" element={<FlowManagementPage />} />
      </Routes>
    </div>
  );
};

export default SupplyChain;