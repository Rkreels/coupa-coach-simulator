import { useState, useEffect } from 'react';

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
  { id: 'notif-001', type: 'approval_request', title: 'Invoice Approval Required', message: 'Invoice INV-2024-001 from Staples Inc. requires your approval. Amount: $1,250.00', timestamp: '2024-01-26T10:30:00Z', isRead: false, priority: 'high', actionUrl: '/invoices', entityType: 'Invoice', entityId: 'INV-2024-001', userId: 'current-user', department: 'Finance' },
  { id: 'notif-002', type: 'system_alert', title: 'Budget Threshold Exceeded', message: 'IT Department has exceeded 85% of quarterly budget.', timestamp: '2024-01-26T09:15:00Z', isRead: false, priority: 'urgent', actionUrl: '/analytics', entityType: 'Budget', entityId: 'BUD-IT-Q1', userId: 'current-user', department: 'IT' },
  { id: 'notif-003', type: 'success', title: 'Purchase Order Approved', message: 'Your purchase order PO-2024-002 has been approved by Jane Smith.', timestamp: '2024-01-26T08:45:00Z', isRead: true, priority: 'medium', actionUrl: '/orders', entityType: 'PurchaseOrder', entityId: 'PO-2024-002', userId: 'current-user', department: 'IT' },
  { id: 'notif-004', type: 'warning', title: 'Contract Expiring Soon', message: 'Contract CNT-2024-003 with CleanCorp expires in 15 days.', timestamp: '2024-01-25T16:00:00Z', isRead: false, priority: 'high', actionUrl: '/contracts', entityType: 'Contract', entityId: 'CNT-2024-003', userId: 'current-user', department: 'Facilities' },
  { id: 'notif-005', type: 'info', title: 'New Supplier Registered', message: 'MedEquip Solutions has submitted a supplier registration request.', timestamp: '2024-01-25T14:30:00Z', isRead: true, priority: 'low', actionUrl: '/suppliers', entityType: 'Supplier', entityId: 'SUP-NEW-001', userId: 'current-user', department: 'Procurement' },
  { id: 'notif-006', type: 'approval_request', title: 'Requisition Pending Approval', message: 'REQ-2024-005 for $8,500 marketing materials needs your review.', timestamp: '2024-01-25T11:00:00Z', isRead: false, priority: 'high', actionUrl: '/requisitions', entityType: 'Requisition', entityId: 'REQ-2024-005', userId: 'current-user', department: 'Marketing' },
  { id: 'notif-007', type: 'error', title: 'Payment Failed', message: 'Payment for invoice INV-2024-003 failed. Please update payment method.', timestamp: '2024-01-25T09:00:00Z', isRead: false, priority: 'urgent', actionUrl: '/invoices', entityType: 'Invoice', entityId: 'INV-2024-003', userId: 'current-user', department: 'Finance' },
  { id: 'notif-008', type: 'success', title: 'Supplier Onboarded', message: 'TechCorp Solutions has completed onboarding and is now active.', timestamp: '2024-01-24T15:30:00Z', isRead: true, priority: 'medium', actionUrl: '/suppliers', entityType: 'Supplier', entityId: 'SUP-002', userId: 'current-user', department: 'Procurement' },
  { id: 'notif-009', type: 'info', title: 'Inventory Low Stock Alert', message: 'Printer toner cartridges are below reorder point (5 remaining).', timestamp: '2024-01-24T10:00:00Z', isRead: true, priority: 'medium', actionUrl: '/inventory', entityType: 'Inventory', entityId: 'INV-ITEM-042', userId: 'current-user', department: 'Operations' },
  { id: 'notif-010', type: 'warning', title: 'Delivery Delayed', message: 'PO-2024-004 delivery delayed by 3 business days from CleanCorp.', timestamp: '2024-01-24T08:00:00Z', isRead: false, priority: 'high', actionUrl: '/orders', entityType: 'PurchaseOrder', entityId: 'PO-2024-004', userId: 'current-user', department: 'Facilities' }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [preferences, setPreferences] = useState({
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