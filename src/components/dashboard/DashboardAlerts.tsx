
import React from 'react';
import { AlertCircle, Bell, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'error';
  time: string;
}

export const DashboardAlerts: React.FC = () => {
  // Sample alerts data
  const alerts: Alert[] = [
    {
      id: '1',
      title: 'Budget Threshold Reached',
      message: 'IT Department has reached 90% of monthly budget',
      type: 'warning',
      time: '1 hour ago'
    },
    {
      id: '2',
      title: 'Contract Expiring Soon',
      message: 'Service agreement with Acme Corp expires in 15 days',
      type: 'warning',
      time: '3 hours ago'
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on May 25, 2023',
      type: 'info',
      time: 'Yesterday'
    }
  ];

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getAlertBadge = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
          <div className="shrink-0 mt-1">
            {getAlertIcon(alert.type)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm">{alert.title}</h3>
              {getAlertBadge(alert.type)}
            </div>
            
            <p className="text-xs text-gray-700">{alert.message}</p>
            
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{alert.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
