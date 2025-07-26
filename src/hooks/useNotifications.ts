import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface NotificationData {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'approval_request' | 'system_alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  entityType?: string;
  entityId?: string;
  userId: string;
  department?: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
}

const initialNotifications: NotificationData[] = [
  {
    id: 'notif-001',
    type: 'approval_request',
    title: 'Invoice Approval Required',
    message: 'Invoice INV-2023-001 from Staples Inc. requires your approval. Amount: $1,250.00',
    timestamp: '2024-01-26T10:30:00Z',
    isRead: false,
    priority: 'high',
    actionUrl: '/invoices/INV-2023-001',
    entityType: 'Invoice',
    entityId: 'INV-2023-001',
    userId: 'current-user',
    department: 'Finance',
    metadata: { amount: 1250, vendor: 'Staples Inc.' }
  },
  {
    id: 'notif-002',
    type: 'system_alert',
    title: 'Budget Threshold Exceeded',
    message: 'IT Department has exceeded 85% of quarterly budget. Current usage: $42,500 of $50,000',
    timestamp: '2024-01-26T09:15:00Z',
    isRead: false,
    priority: 'urgent',
    actionUrl: '/analytics/budgets',
    entityType: 'Budget',
    entityId: 'BUDGET-IT-Q1-2024',
    userId: 'current-user',
    department: 'IT',
    metadata: { currentSpend: 42500, budgetLimit: 50000, percentage: 85 }
  },
  {
    id: 'notif-003',
    type: 'success',
    title: 'Purchase Order Approved',
    message: 'Your purchase order PO-2023-045 for IT equipment has been approved by Jane Smith.',
    timestamp: '2024-01-26T08:45:00Z',
    isRead: true,
    priority: 'medium',
    actionUrl: '/orders/PO-2023-045',
    entityType: 'PurchaseOrder',
    entityId: 'PO-2023-045',
    userId: 'current-user',
    department: 'IT',
    metadata: { approver: 'Jane Smith', amount: 15000 }
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useLocalStorage('notifications', initialNotifications);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [preferences, setPreferences] = useLocalStorage('notificationPreferences', {
    email: true,
    browser: true,
    mobile: false,
    digestFrequency: 'daily',
    types: {
      approval_request: true,
      system_alert: true,
      info: true,
      success: true,
      warning: true,
      error: true
    }
  });

  // Simulate real-time notifications
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      // Randomly generate new notifications for demonstration
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const newNotification = generateRandomNotification();
        addNotification(newNotification);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [realTimeEnabled]);

  const generateRandomNotification = (): Omit<NotificationData, 'id' | 'timestamp' | 'userId'> => {
    const templates = [
      {
        type: 'approval_request' as const,
        title: 'New Approval Required',
        message: 'A new requisition requires your approval.',
        priority: 'high' as const,
        entityType: 'Requisition'
      },
      {
        type: 'system_alert' as const,
        title: 'Contract Expiring',
        message: 'Contract with ABC Corp expires in 30 days.',
        priority: 'medium' as const,
        entityType: 'Contract'
      },
      {
        type: 'info' as const,
        title: 'New Supplier Added',
        message: 'A new supplier has been added to your network.',
        priority: 'low' as const,
        entityType: 'Supplier'
      }
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    return {
      ...template,
      isRead: false,
      entityId: `${template.entityType?.toUpperCase()}-${Date.now()}`,
      department: ['IT', 'Finance', 'Operations'][Math.floor(Math.random() * 3)]
    };
  };

  const addNotification = (notification: Omit<NotificationData, 'id' | 'timestamp' | 'userId'>) => {
    const newNotification: NotificationData = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'current-user'
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Browser notification if enabled
    if (preferences.browser && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }

    return newNotification;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const getFilteredNotifications = (filters: {
    type?: string;
    priority?: string;
    isRead?: boolean;
    department?: string;
  } = {}) => {
    return notifications.filter(notif => {
      if (filters.type && notif.type !== filters.type) return false;
      if (filters.priority && notif.priority !== filters.priority) return false;
      if (filters.isRead !== undefined && notif.isRead !== filters.isRead) return false;
      if (filters.department && notif.department !== filters.department) return false;
      return true;
    });
  };

  const getNotificationStats = () => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.isRead).length;
    const approvalCount = notifications.filter(n => n.type === 'approval_request' && !n.isRead).length;
    
    const byType = notifications.reduce((acc, notif) => {
      acc[notif.type] = (acc[notif.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byPriority = notifications.reduce((acc, notif) => {
      acc[notif.priority] = (acc[notif.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: notifications.length,
      unreadCount,
      urgentCount,
      approvalCount,
      byType,
      byPriority
    };
  };

  const requestBrowserPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  const sendApprovalNotification = (entityType: string, entityId: string, details: any) => {
    addNotification({
      type: 'approval_request',
      title: `${entityType} Approval Required`,
      message: `${entityType} ${entityId} requires your approval. ${details.description || ''}`,
      priority: 'high',
      actionUrl: `/${entityType.toLowerCase()}s/${entityId}`,
      entityType,
      entityId,
      isRead: false,
      metadata: details
    });
  };

  const sendSystemAlert = (title: string, message: string, priority: NotificationData['priority'] = 'medium') => {
    addNotification({
      type: 'system_alert',
      title,
      message,
      priority,
      isRead: false
    });
  };

  return {
    notifications,
    preferences,
    setPreferences,
    realTimeEnabled,
    setRealTimeEnabled,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getFilteredNotifications,
    getNotificationStats,
    requestBrowserPermission,
    sendApprovalNotification,
    sendSystemAlert
  };
};