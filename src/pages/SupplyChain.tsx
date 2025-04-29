import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { TotalMetricCard } from '../components/supply-chain/TotalMetricCard';
import { ProductFlowChart } from '../components/supply-chain/ProductFlowChart';
import { FlowUnitsCostScatter } from '../components/supply-chain/FlowUnitsCostScatter';
import { CustomerFlowBarChart } from '../components/supply-chain/CustomerFlowBarChart';
import { CustomerFlowDetailsTable } from '../components/supply-chain/CustomerFlowDetailsTable';
import { supplyChainData, voiceScripts } from '../data/supplyChainData';
import { Button } from '@/components/ui/button';
import { RefreshCw, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { VoiceElement } from '../components/VoiceElement';

const SupplyChain = () => {
  return (
    <>
      <div className="bg-blue-500 text-white py-2 px-4 flex items-center">
        <div className="bg-coupa-blue rounded-md w-8 h-8 flex items-center justify-center mr-2">
          <span className="text-white font-bold">C</span>
        </div>
        <span className="text-xl font-medium">Supply Chain</span>
      </div>
      
      <ApplicationLayout>
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Workbooks › </span>
              <span className="text-sm">JM_NQ_Viz</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Data Last Refreshed: 6/28/2024 9:46 AM</span>
              <Button variant="outline" size="sm" className="flex items-center gap-1 h-8">
                <RefreshCw className="w-3 h-3" />
                Refresh Workbook Data
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
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <TotalMetricCard 
              title="Total Cost" 
              value={supplyChainData.totalCost}
              whatScript={voiceScripts.supplyChain.costOverview.what}
              howScript={voiceScripts.supplyChain.costOverview.how}
              decisionScript={voiceScripts.supplyChain.costOverview.decision}
            />
            <TotalMetricCard 
              title="Total Flow Units" 
              value={supplyChainData.totalFlowUnits} 
            />
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
          
          <CustomerFlowDetailsTable 
            data={supplyChainData.customerFlowDetails}
            whatScript={voiceScripts.supplyChain.flowDetails.what}
            howScript={voiceScripts.supplyChain.flowDetails.how}
            decisionScript={voiceScripts.supplyChain.flowDetails.decision}
          />
        </div>
      </ApplicationLayout>
    </>
  );
};

export default SupplyChain;
