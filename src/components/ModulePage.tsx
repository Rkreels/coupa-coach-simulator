
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ApplicationLayout } from './ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useModuleData } from '../hooks/useModuleData';
import { AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

interface ModulePageProps {
  moduleName: string;
  pageTitle: string;
  subModuleName?: string;
}

export const ModulePage: React.FC<ModulePageProps> = ({
  moduleName,
  pageTitle,
  subModuleName
}) => {
  const location = useLocation();
  const { metrics, recentItems, alerts, loading } = useModuleData(moduleName);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      sent: 'bg-purple-100 text-purple-800',
      received: 'bg-indigo-100 text-indigo-800',
      completed: 'bg-emerald-100 text-emerald-800',
      dispute: 'bg-red-100 text-red-800',
      failed: 'bg-red-100 text-red-800',
      processed: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      low_stock: 'bg-orange-100 text-orange-800',
      out_of_stock: 'bg-red-100 text-red-800',
      adequate: 'bg-green-100 text-green-800',
      high_risk: 'bg-red-100 text-red-800',
      onboarding: 'bg-yellow-100 text-yellow-800',
      expiring: 'bg-orange-100 text-orange-800',
      in_progress: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <ApplicationLayout pageTitle={pageTitle}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout pageTitle={pageTitle}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-gray-600 mt-1">
              {subModuleName ? `${moduleName} > ${subModuleName}` : `Current path: ${location.pathname}`}
            </p>
          </div>
          <Button>
            Quick Action
          </Button>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  alert.type === 'urgent' ? 'bg-red-50 border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  alert.type === 'success' ? 'bg-green-50 border-green-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                {getAlertIcon(alert.type)}
                <span className="text-sm font-medium">{alert.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(metrics).map(([key, value]) => (
            <Card key={key}>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {typeof value === 'number' && key.includes('Value') 
                      ? `$${value.toLocaleString()}`
                      : value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Items */}
        {recentItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{item.id}</span>
                        <span className="text-gray-600">
                          {item.title || item.name || item.vendor || item.supplier}
                        </span>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.amount && (
                        <span className="font-medium">${item.amount.toLocaleString()}</span>
                      )}
                      {item.value && (
                        <span className="font-medium">${item.value.toLocaleString()}</span>
                      )}
                      {item.quantity !== undefined && (
                        <span className="font-medium">Qty: {item.quantity}</span>
                      )}
                      {item.score && (
                        <span className="font-medium">Score: {item.score}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Module-specific content placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>{pageTitle} Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is the {pageTitle} page for the {moduleName} module. 
              Content and functionality specific to this submenu would be implemented here.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Available Actions:</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm">Create New</Button>
                <Button variant="outline" size="sm" className="ml-2">Import Data</Button>
                <Button variant="outline" size="sm" className="ml-2">Export Report</Button>
                <Button variant="outline" size="sm" className="ml-2">View Analytics</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};
