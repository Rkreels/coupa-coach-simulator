
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
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
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">High Risk</span>;
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Medium Risk</span>;
      case 'low':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Low Risk</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{level}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Resolved" 
      ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><Check className="h-3 w-3" /> Resolved</span>
      : <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><AlertTriangle className="h-3 w-3" /> Open</span>;
  };

  return (
    <ApplicationLayout 
      pageTitle="Spend Guard"
      pageLoadScript="Welcome to Spend Guard. This module helps identify potential risks, fraud, and compliance issues in your spending, helping you save money and maintain financial integrity."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Risk Level:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <BarChart3 className="h-4 w-4" /> 
          Risk Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows active risk alerts requiring attention."
          howScript="Monitor this to address current spending risks."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Alerts</p>
                <h3 className="text-3xl font-bold text-coupa-blue">3</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-coupa-blue" />
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
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolution Rate</p>
                <h3 className="text-3xl font-bold text-green-600">82%</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
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
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Potential Savings Identified</p>
                <h3 className="text-3xl font-bold text-purple-600">$24,850</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              Year to date
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Detected</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
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
                  <TableCell className="text-gray-600">
                    {alert.detected}
                  </TableCell>
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
      </Card>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
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
