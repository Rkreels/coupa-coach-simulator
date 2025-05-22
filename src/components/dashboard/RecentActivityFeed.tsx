
import React from 'react';
import { Clock, Package, FileText, ShoppingBag, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: string;
  type: 'order' | 'invoice' | 'request' | 'approval';
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'rejected';
  time: string;
  user: string;
}

interface RecentActivityFeedProps {
  limit?: number;
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ limit = 10 }) => {
  // Sample activity data
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'approval',
      title: 'Invoice Approval',
      description: 'Invoice #INV-2023-056 from Acme Corp requires your approval',
      status: 'pending',
      time: '10 minutes ago',
      user: 'Finance Department'
    },
    {
      id: '2',
      type: 'order',
      title: 'Order Completed',
      description: 'Purchase Order #PO-2023-089 has been completed',
      status: 'completed',
      time: '1 hour ago',
      user: 'Logistics Team'
    },
    {
      id: '3',
      type: 'invoice',
      title: 'Invoice Paid',
      description: 'Invoice #INV-2023-045 has been paid successfully',
      status: 'completed',
      time: '3 hours ago',
      user: 'Accounting Department'
    },
    {
      id: '4',
      type: 'request',
      title: 'Request Rejected',
      description: 'Requisition #REQ-2023-112 for office supplies has been rejected',
      status: 'rejected',
      time: '5 hours ago',
      user: 'Procurement Team'
    },
    {
      id: '5',
      type: 'approval',
      title: 'Budget Increase',
      description: 'Budget increase request for Q4 requires your approval',
      status: 'pending',
      time: 'Yesterday',
      user: 'Finance Department'
    },
    {
      id: '6',
      type: 'order',
      title: 'Order Shipped',
      description: 'Purchase Order #PO-2023-078 has been shipped',
      status: 'completed',
      time: 'Yesterday',
      user: 'Logistics Team'
    }
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'order': return <Package className="h-4 w-4 text-blue-500" />;
      case 'invoice': return <FileText className="h-4 w-4 text-purple-500" />;
      case 'request': return <ShoppingBag className="h-4 w-4 text-orange-500" />;
      case 'approval': return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusBadge = (status: ActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {activities.slice(0, limit).map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
          <div className="shrink-0 mt-1">
            {getActivityIcon(activity.type)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm">{activity.title}</h3>
              {getStatusBadge(activity.status)}
            </div>
            
            <p className="text-xs text-gray-700">{activity.description}</p>
            
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{activity.time}</span>
              <span className="mx-1">•</span>
              <span>{activity.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
