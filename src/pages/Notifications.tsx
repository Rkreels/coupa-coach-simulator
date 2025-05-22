
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Bell, ShieldAlert, FileText, Clock, AlertCircle, 
  CheckCircle, XCircle, Calendar, Package, ShoppingBag, Search, Filter
} from 'lucide-react';

type NotificationType = 'all' | 'alerts' | 'approvals' | 'information';

type Notification = {
  id: string;
  type: 'alert' | 'approval' | 'information';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  relatedTo?: string;
};

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<NotificationType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Unusual spend detected',
      message: 'There is an unusual spending pattern in the Marketing department this month.',
      time: '10 minutes ago',
      isRead: false,
      priority: 'high',
      relatedTo: 'Spend Analysis'
    },
    {
      id: '2',
      type: 'approval',
      title: 'Invoice needs your approval',
      message: 'Invoice #INV-2023-056 from Acme Corp requires your approval.',
      time: '1 hour ago',
      isRead: false,
      priority: 'medium',
      relatedTo: 'Invoices'
    },
    {
      id: '3',
      type: 'information',
      title: 'Order has shipped',
      message: 'Purchase order #PO-2023-089 has been shipped and is on its way.',
      time: '3 hours ago',
      isRead: true,
      priority: 'low',
      relatedTo: 'Orders'
    },
    {
      id: '4',
      type: 'approval',
      title: 'Budget increase request',
      message: 'The IT department has requested a budget increase of $5,000 for Q4.',
      time: '5 hours ago',
      isRead: false,
      priority: 'medium',
      relatedTo: 'Budgets'
    },
    {
      id: '5',
      type: 'alert',
      title: 'Contract expiring soon',
      message: 'The contract with Digital Systems will expire in 14 days.',
      time: 'Yesterday',
      isRead: true,
      priority: 'high',
      relatedTo: 'Contracts'
    },
    {
      id: '6',
      type: 'information',
      title: 'New supplier added',
      message: 'TechSupply Inc. has been added to your approved suppliers list.',
      time: 'Yesterday',
      isRead: true,
      priority: 'low',
      relatedTo: 'Suppliers'
    },
    {
      id: '7',
      type: 'approval',
      title: 'New requisition for review',
      message: 'Requisition #REQ-2023-078 from Engineering requires your review.',
      time: '2 days ago',
      isRead: false,
      priority: 'high',
      relatedTo: 'Requisitions'
    },
    {
      id: '8',
      type: 'information',
      title: 'System maintenance scheduled',
      message: 'System will be down for maintenance on Saturday from 2-4 AM EST.',
      time: '2 days ago',
      isRead: true,
      priority: 'medium',
      relatedTo: 'System'
    }
  ]);

  // Filter notifications based on type and search
  const filteredNotifications = notifications
    .filter(notification => filter === 'all' ? true : notification.type === filter.slice(0, -1))
    .filter(notification => 
      searchQuery ? 
        (notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (notification.relatedTo && notification.relatedTo.toLowerCase().includes(searchQuery.toLowerCase())))
        : true
    );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const getNotificationIcon = (type: Notification['type'], priority: Notification['priority']) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className={`h-5 w-5 ${priority === 'high' ? 'text-red-500' : 'text-orange-500'}`} />;
      case 'approval':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'information':
        return priority === 'low' ? 
          <Package className="h-5 w-5 text-green-500" /> : 
          <ShoppingBag className="h-5 w-5 text-purple-500" />;
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
    }
  };

  const getNotificationCount = (type: NotificationType) => {
    if (type === 'all') return notifications.length;
    return notifications.filter(n => n.type === type.slice(0, -1)).length;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-blue-500">{unreadCount} new</Badge>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notifications..."
              className="pl-8 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={filter} onValueChange={(v) => setFilter(v as NotificationType)}>
        <TabsList className="mb-6 w-full overflow-x-auto">
          <TabsTrigger value="all">
            All 
            <Badge variant="outline" className="ml-2 bg-gray-100">{getNotificationCount('all')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts
            <Badge variant="outline" className="ml-2 bg-gray-100">{getNotificationCount('alerts')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approvals">
            Approvals
            <Badge variant="outline" className="ml-2 bg-gray-100">{getNotificationCount('approvals')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="information">
            Information
            <Badge variant="outline" className="ml-2 bg-gray-100">{getNotificationCount('information')}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter} className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:bg-gray-50 transition-colors ${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {getNotificationIcon(notification.type, notification.priority)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h3>
                      {getPriorityBadge(notification.priority)}
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{notification.time}</span>
                        {notification.relatedTo && (
                          <>
                            <span className="mx-2 text-gray-300">•</span>
                            <span>{notification.relatedTo}</span>
                          </>
                        )}
                      </div>
                      
                      {!notification.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs h-7 px-2"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredNotifications.length === 0 && (
            <div className="text-center py-10">
              <div className="mx-auto bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mb-1">No notifications</h3>
              <p className="text-gray-500">You don't have any notifications matching your selected filter.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
