
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, TrendingUp, RefreshCw, Plus, Settings, ArrowRight } from 'lucide-react';

const Forecasts = () => {
  return (
    <ApplicationLayout 
      pageTitle="Forecasts"
      pageLoadScript="Welcome to Forecasts. This module helps you predict future spend, identify budget trends, and plan procurement activities based on historical data and market trends."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search forecasts..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
          <Button 
            className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> 
            New Forecast
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This shows your forecasted annual spend."
          howScript="Use this to plan your annual budget."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Annual Forecast</p>
                <h3 className="text-3xl font-bold text-coupa-blue">$5.2M</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              <span className="font-medium">+8.4%</span> vs. previous year
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows your upcoming quarter's forecasted spend."
          howScript="Use this for quarterly budget planning."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Q3 2023 Forecast</p>
                <h3 className="text-3xl font-bold text-purple-600">$1.35M</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              <span className="font-medium">+12.2%</span> vs. Q2 2023
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows your savings target progress."
          howScript="Track how you're performing against cost-saving goals."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Savings Target Progress</p>
                <h3 className="text-3xl font-bold text-green-600">68%</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              $680K of $1M annual target
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VoiceElement
          whatScript="This chart shows your forecasted spending across categories."
          howScript="Use this to identify which categories will drive spending."
        >
          <Card className="p-0">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-base font-medium">Spend by Category (Forecast)</h3>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Configure
              </Button>
            </div>
            <div className="p-4 h-72">
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Chart placeholder - Category spend forecast visualization</p>
              </div>
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This chart shows quarterly spending trends and projections."
          howScript="Use this to track spending patterns and future projections."
        >
          <Card className="p-0">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-base font-medium">Quarterly Spend Trends</h3>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Configure
              </Button>
            </div>
            <div className="p-4 h-72">
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Chart placeholder - Quarterly spending trends with projections</p>
              </div>
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Your Forecasts</h2>
      
      <Card className="mb-6">
        <div className="divide-y">
          {[
            { name: "Annual IT Budget Forecast", type: "Department", period: "FY 2023", lastUpdated: "2023-05-10", owner: "John Smith" },
            { name: "Office Equipment Procurement", type: "Category", period: "Q2-Q4 2023", lastUpdated: "2023-05-08", owner: "Sarah Johnson" },
            { name: "Global Marketing Spend", type: "Department", period: "FY 2023", lastUpdated: "2023-05-15", owner: "Michael Chen" },
            { name: "Research & Development", type: "Department", period: "FY 2023-2024", lastUpdated: "2023-05-12", owner: "Robert Martinez" }
          ].map((forecast, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 flex items-center">
              <div className="flex-1">
                <h3 className="font-medium text-coupa-blue">{forecast.name}</h3>
                <div className="flex gap-4 mt-1 text-sm text-gray-600">
                  <span>Type: {forecast.type}</span>
                  <span>Period: {forecast.period}</span>
                  <span>Last updated: {forecast.lastUpdated}</span>
                  <span>Owner: {forecast.owner}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-coupa-blue">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
      
      <h2 className="text-xl font-bold mb-4">Recommended Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Update IT Hardware Forecast", description: "Recent price changes from suppliers suggest updating your IT hardware forecast" },
          { title: "Review Marketing Service Spend", description: "Projected marketing spend exceeds historical patterns by 24%" },
          { title: "Consolidate Office Supply Vendors", description: "Potential 12% savings by consolidating your office supply vendors based on forecast data" }
        ].map((action, index) => (
          <Card key={index} className="p-4 border-l-4 border-coupa-blue">
            <h3 className="font-medium">{action.title}</h3>
            <p className="text-sm text-gray-600 my-2">{action.description}</p>
            <Button variant="link" className="p-0 h-auto text-coupa-blue">
              Take Action
            </Button>
          </Card>
        ))}
      </div>
    </ApplicationLayout>
  );
};

export default Forecasts;
