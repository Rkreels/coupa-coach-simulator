import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { SpendGuardNavigation } from '../components/navigation/SpendGuardNavigation';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Shield, AlertTriangle, Check, ArrowRight, BarChart3 } from 'lucide-react';

// Mock data for risk alerts
const riskAlerts = [
  {
    id: "RISK-001",
    type: "Duplicate Invoice",
    level: "high",
    description: "Invoice INV-2023-056 appears to be a duplicate of INV-2023-042",
    source: "Invoice Processing",
    detected: "2023-05-15",
    status: "Open"
  },
  {
    id: "RISK-002",
    type: "Price Variance",
    level: "medium",
    description: "Item price increased by 18% compared to last purchase",
    source: "Purchase Orders",
    detected: "2023-05-20",
    status: "Open"
  },
  {
    id: "RISK-003",
    type: "Approval Bypass",
    level: "high",
    description: "Purchase order PO-2023-089 bypassed required approval steps",
    source: "Approval Workflow",
    detected: "2023-05-22",
    status: "Resolved"
  },
  {
    id: "RISK-004",
    type: "Unauthorized Supplier",
    level: "medium",
    description: "Invoice submitted from non-approved supplier: TechSupplies Inc.",
    source: "Supplier Management",
    detected: "2023-05-18",
    status: "Open"
  }
];

const SpendGuard = () => {
  const getRiskLevelBadge = (level: string) => {
    switch(level) {
      case 'high':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">High Risk</span>;
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">Medium Risk</span>;
      case 'low':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">Low Risk</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">{level}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Resolved" 
      ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit whitespace-nowrap"><Check className="h-3 w-3" /> Resolved</span>
      : <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit whitespace-nowrap"><AlertTriangle className="h-3 w-3" /> Open</span>;
  };

  return (
    <ApplicationLayout 
      pageTitle="Spend Guard"
      pageLoadScript="Welcome to Spend Guard. This module helps identify potential risks, fraud, and compliance issues in your spending, helping you save money and maintain financial integrity."
    >
      <SpendGuardNavigation />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Risk Level:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2 w-full sm:w-auto"
        >
          <BarChart3 className="h-4 w-4" /> 
          Risk Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows active risk alerts requiring attention."
          howScript="Monitor this to address current spending risks."
        >
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Alerts</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-coupa-blue">3</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertTriangle className="h-5 w-5 lg:h-6 lg:w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">2</span> high risk alerts
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows your risk mitigation success rate."
          howScript="This percentage indicates how effectively you're addressing risks."
        >
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolution Rate</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-green-600">82%</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              <span className="font-medium">+5%</span> from last quarter
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows the savings from preventing fraudulent or improper spending."
          howScript="This indicates the financial value of your risk management efforts."
        >
          <Card className="p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Potential Savings Identified</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-purple-600">$24,850</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              Year to date
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-4 mb-6">
        {riskAlerts.map((alert) => (
          <VoiceElement
            key={alert.id}
            whatScript={`This is a ${alert.level} risk alert for ${alert.type}.`}
            howScript="Tap on this card to view alert details and take action."
          >
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{alert.id}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-coupa-blue" />
              </div>
              <h3 className="font-medium text-lg mb-2">{alert.type}</h3>
              <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Source:</span>
                  <div className="font-medium">{alert.source}</div>
                </div>
                <div>
                  <span className="text-gray-500">Detected:</span>
                  <div className="font-medium">{alert.detected}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {getRiskLevelBadge(alert.level)}
                {getStatusBadge(alert.status)}
              </div>
            </Card>
          </VoiceElement>
        ))}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card className="mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">ID</TableHead>
                  <TableHead className="min-w-[150px]">Type</TableHead>
                  <TableHead className="min-w-[120px]">Risk Level</TableHead>
                  <TableHead className="min-w-[300px]">Description</TableHead>
                  <TableHead className="min-w-[150px]">Source</TableHead>
                  <TableHead className="min-w-[120px]">Detected</TableHead>
                  <TableHead className="min-w-[120px]">Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskAlerts.map((alert) => (
                  <VoiceElement
                    key={alert.id}
                    whatScript={`This is a ${alert.level} risk alert for ${alert.type}.`}
                    howScript="Click on this row to view alert details and take action."
                  >
                    <TableRow className="hover:bg-gray-50 cursor-pointer">
                      <TableCell>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-gray-400 mr-2" />
                          {alert.id}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{alert.type}</TableCell>
                      <TableCell>{getRiskLevelBadge(alert.level)}</TableCell>
                      <TableCell>{alert.description}</TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell className="text-gray-600">{alert.detected}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-coupa-blue">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </VoiceElement>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-500 gap-4">
        <div>Showing {riskAlerts.length} of {riskAlerts.length} alerts</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default SpendGuard;
