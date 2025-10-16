import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpendGuardNavigation } from '../components/navigation/SpendGuardNavigation';
import ActiveAlertsPage from './spend-guard/ActiveAlerts';
import FraudDetectionPage from './spend-guard/FraudDetection';
import DuplicateInvoicesPage from './spend-guard/DuplicateInvoices';
import PriceVariancePage from './spend-guard/PriceVariance';
import ApprovalBypassPage from './spend-guard/ApprovalBypass';
import SupplierRiskPage from './spend-guard/SupplierRisk';
import PolicyViolationsPage from './spend-guard/PolicyViolations';
import AnalyticsPage from './spend-guard/Analytics';
import SettingsPage from './spend-guard/Settings';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Shield, AlertTriangle, Check, ArrowRight, BarChart3 } from 'lucide-react';

const SpendGuardDashboard = () => {
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
    }
  ];

  const getRiskLevelBadge = (level: string) => {
    switch(level) {
      case 'high':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">High Risk</span>;
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Medium Risk</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{level}</span>;
    }
  };

  return (
    <ApplicationLayout pageTitle="Spend Guard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Alerts</p>
                <h3 className="text-2xl font-bold text-red-600">3</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolution Rate</p>
                <h3 className="text-2xl font-bold text-green-600">82%</h3>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Potential Savings</p>
                <h3 className="text-2xl font-bold text-purple-600">$24,850</h3>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>
      </div>
    </ApplicationLayout>
  );
};

const SpendGuard = () => {
  return (
    <div>
      <SpendGuardNavigation />
      <Routes>
        <Route path="/" element={<SpendGuardDashboard />} />
        <Route path="/active-alerts" element={<ActiveAlertsPage />} />
        <Route path="/fraud-detection" element={<FraudDetectionPage />} />
        <Route path="/duplicate-invoices" element={<DuplicateInvoicesPage />} />
        <Route path="/price-variance" element={<PriceVariancePage />} />
        <Route path="/approval-bypass" element={<ApprovalBypassPage />} />
        <Route path="/supplier-risk" element={<SupplierRiskPage />} />
        <Route path="/policy-violations" element={<PolicyViolationsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export default SpendGuard;