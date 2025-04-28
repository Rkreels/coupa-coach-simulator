
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { AnalyticsNavigation } from '../components/AnalyticsNavigation';
import { BreadcrumbNavigation } from '../components/BreadcrumbNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Settings, MoreVertical, RefreshCw } from 'lucide-react';
import { VoiceElement } from '../components/VoiceElement';

const Analytics = () => {
  const [currentTab, setCurrentTab] = useState('analytics');
  
  const breadcrumbItems = [
    { label: 'Coupa Content', path: '#' },
    { label: 'Spend Management', path: '#' },
    { label: 'CFO Dashboard - Summary', path: '#' }
  ];

  return (
    <ApplicationLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h1>
        
        <AnalyticsNavigation 
          currentTab={currentTab} 
          onTabChange={setCurrentTab} 
        />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <BreadcrumbNavigation items={breadcrumbItems} />
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                <span>Analytics Setup</span>
              </Button>
              
              <Button variant="outline" size="sm" className="bg-coupa-blue text-white hover:bg-coupa-darkblue flex items-center gap-1">
                <span>Create New Report</span>
              </Button>
              
              <Button variant="outline" size="sm" className="bg-coupa-blue text-white hover:bg-coupa-darkblue flex items-center gap-1">
                <span>Create New Dashboard</span>
              </Button>
            </div>
          </div>
          
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">CFO Dashboard - Summary</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <VoiceElement
              whatScript="This card shows the trailing 12-month spend."
              howScript="Use this to track your annual spending trends."
            >
              <Card className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-coupa-blue">447.76 M</h2>
                    <p className="text-sm text-gray-600">Trailing 12-Month Spend</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This shows your year-over-year spending change."
              howScript="Monitor this percentage to understand spending growth or reduction."
            >
              <Card className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-orange-500">206.1%</h2>
                    <p className="text-sm text-gray-600">YoY Change in Spend</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This displays your average quarterly spending."
              howScript="Use this to understand your typical quarterly budget utilization."
            >
              <Card className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-coupa-blue">111.94 M</h2>
                    <p className="text-sm text-gray-600">Average Quarterly Spend</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </VoiceElement>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <VoiceElement
              whatScript="This chart shows quarterly spending trends."
              howScript="Use this to track spending patterns throughout the year."
            >
              <Card className="p-0">
                <div className="border-b p-4">
                  <h3 className="text-base font-medium">Quarterly Spending Trends</h3>
                </div>
                <div className="p-4 h-72">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>Chart placeholder - Quarterly spending visualization</p>
                  </div>
                </div>
              </Card>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This chart compares year-over-year spending."
              howScript="Use this to compare spending between current and previous years by quarter."
            >
              <Card className="p-0">
                <div className="border-b p-4">
                  <h3 className="text-base font-medium">YoY Spend Comparison</h3>
                </div>
                <div className="p-4 h-72">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>Chart placeholder - YoY spending comparison by quarter</p>
                  </div>
                </div>
              </Card>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This shows spending across your top accounts."
              howScript="Monitor which accounts use the most budget."
            >
              <Card className="p-0">
                <div className="border-b p-4">
                  <h3 className="text-base font-medium">Spend in Top Accounts</h3>
                </div>
                <div className="p-4 h-72">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>Chart placeholder - Top accounts by spend</p>
                  </div>
                </div>
              </Card>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This shows your top commodity categories by spend."
              howScript="Use this to identify your highest spending categories."
            >
              <Card className="p-0">
                <div className="border-b p-4">
                  <h3 className="text-base font-medium">Top Commodity of Spend</h3>
                </div>
                <div className="p-4 h-72">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>Chart placeholder - Top commodities by spend</p>
                  </div>
                </div>
              </Card>
            </VoiceElement>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default Analytics;
