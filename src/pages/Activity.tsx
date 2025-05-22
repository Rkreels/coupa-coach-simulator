
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  Clock, User, FileText, ShoppingBag, Package, CheckCircle2, 
  AlertCircle, XCircle, Calendar
} from "lucide-react";

type ActivityType = 'all' | 'approvals' | 'documents' | 'requests' | 'orders';

type Activity = {
  id: string;
  type: 'approval' | 'document' | 'request' | 'order';
  title: string;
  user: string;
  userAvatar?: string;
  date: string;
  status: 'pending' | 'completed' | 'rejected';
  description: string;
};

const ActivityPage: React.FC = () => {
  const [filter, setFilter] = useState<ActivityType>('all');

  // Mock activity data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'approval',
      title: 'Invoice #INV-2023-001 Approval',
      user: 'Jane Cooper',
      date: '10 minutes ago',
      status: 'pending',
      description: 'Office supplies - $324.99'
    },
    {
      id: '2',
      type: 'order',
      title: 'Purchase Order #PO-2023-056 Updated',
      user: 'Robert Fox',
      date: '1 hour ago',
      status: 'completed',
      description: 'Order quantity updated from 5 to 8 units'
    },
    {
      id: '3',
      type: 'document',
      title: 'Contract with Acme Corp Uploaded',
      user: 'Leslie Alexander',
      date: '3 hours ago',
      status: 'completed',
      description: 'Annual service contract - IT Support'
    },
    {
      id: '4',
      type: 'request',
      title: 'New Software Purchase Request',
      user: 'Kristin Watson',
      date: '5 hours ago',
      status: 'rejected',
      description: 'Adobe Creative Cloud licenses - Over budget'
    },
    {
      id: '5',
      type: 'approval',
      title: 'Budget Increase Request',
      user: 'Cameron Williamson',
      date: 'Yesterday',
      status: 'pending',
      description: 'Marketing department - Q4 campaign'
    }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter.slice(0, -1));

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'approval': return <CheckCircle2 className="h-5 w-5 text-orange-500" />;
      case 'document': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'request': return <ShoppingBag className="h-5 w-5 text-purple-500" />;
      case 'order': return <Package className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusBadge = (status: Activity['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Recent Activity</h1>
      
      <Tabs defaultValue="all" value={filter} onValueChange={(v) => setFilter(v as ActivityType)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter} className="space-y-4">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{activity.title}</h3>
                      {getStatusBadge(activity.status)}
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{activity.user}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-10">
              <div className="mx-auto bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mb-1">No recent activity</h3>
              <p className="text-gray-500">There's no recent activity matching your filters.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivityPage;
