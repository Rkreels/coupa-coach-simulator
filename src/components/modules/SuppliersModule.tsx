
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useModuleData } from '../../hooks/useModuleData';
import { Users, TrendingUp, AlertTriangle, Award, FileText, CheckCircle } from 'lucide-react';

export const SuppliersModule: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { metrics, recentItems, alerts, loading } = useModuleData('suppliers');

  const getPageContent = () => {
    if (path.includes('/information')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Supplier Information</h2>
            <Button>Add New Supplier</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Active Suppliers</p>
                    <p className="text-2xl font-bold">{metrics.activeSuppliers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Performance Score</p>
                    <p className="text-2xl font-bold">{metrics.performanceScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Risk Suppliers</p>
                    <p className="text-2xl font-bold">{metrics.riskSuppliers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Compliance Rate</p>
                    <p className="text-2xl font-bold">{metrics.complianceRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Supplier Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={recentItems}
                columns={[
                  { key: 'id', header: 'Supplier ID', sortable: true },
                  { key: 'name', header: 'Supplier Name', sortable: true },
                  { 
                    key: 'status', 
                    header: 'Status',
                    render: (value: string) => (
                      <Badge variant={value === 'active' ? 'default' : value === 'high_risk' ? 'destructive' : 'secondary'}>
                        {value.replace('_', ' ')}
                      </Badge>
                    )
                  },
                  { 
                    key: 'score', 
                    header: 'Performance Score',
                    render: (value: number) => `${value}%`
                  }
                ]}
                searchTerm=""
                onSearchChange={() => {}}
                onSort={() => {}}
                sortConfig={{ key: null, direction: 'asc' }}
              />
            </CardContent>
          </Card>
        </div>
      );
    }

    if (path.includes('/performance')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Supplier Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentItems.slice(0, 5).map((supplier) => (
                    <div key={supplier.id} className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">{supplier.name}</span>
                      <Badge variant="default">{supplier.score}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>On-time Delivery</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Score</span>
                    <span className="font-bold">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Competitiveness</span>
                    <span className="font-bold">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (path.includes('/onboarding')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Supplier Onboarding</h2>
            <Button>Start Onboarding Process</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Registration', 'Document Review', 'Assessment'].map((stage, index) => (
              <Card key={stage}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{stage}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {stage === 'Registration' ? 'Supplier completes registration form' :
                     stage === 'Document Review' ? 'Review supplier documentation' :
                     'Conduct supplier assessment'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Default all suppliers page
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">All Suppliers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{metrics.totalSuppliers}</p>
                <p className="text-sm text-gray-500">Total Suppliers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{metrics.activeSuppliers}</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{metrics.newSuppliers}</p>
                <p className="text-sm text-gray-500">New This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{metrics.riskSuppliers}</p>
                <p className="text-sm text-gray-500">High Risk</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    if (path.includes('/information')) return 'Supplier Information';
    if (path.includes('/performance')) return 'Supplier Performance';
    if (path.includes('/risk')) return 'Risk Assessment';
    if (path.includes('/onboarding')) return 'Supplier Onboarding';
    if (path.includes('/catalogs')) return 'Supplier Catalogs';
    if (path.includes('/questionnaires')) return 'Supplier Questionnaires';
    if (path.includes('/certifications')) return 'Supplier Certifications';
    return 'All Suppliers';
  };

  if (loading) {
    return (
      <ApplicationLayout pageTitle={getPageTitle()}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout pageTitle={getPageTitle()}>
      <div className="space-y-6">
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  alert.type === 'urgent' ? 'bg-red-50 border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <span className="text-sm font-medium">{alert.message}</span>
              </div>
            ))}
          </div>
        )}

        {getPageContent()}
      </div>
    </ApplicationLayout>
  );
};
