import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  module: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  result: 'success' | 'failure' | 'warning';
  metadata?: Record<string, any>;
}

export interface AuditFilters {
  userId?: string;
  entityType?: string;
  module?: string;
  action?: string;
  severity?: string;
  result?: string;
  dateFrom?: string;
  dateTo?: string;
}

const initialAuditLog: AuditEntry[] = [
  {
    id: 'audit-001',
    userId: 'user-123',
    userName: 'John Doe',
    action: 'CREATE',
    entityType: 'Invoice',
    entityId: 'INV-2023-001',
    entityName: 'Office Supplies Invoice',
    newValues: { amount: 1250, vendor: 'Staples Inc.', status: 'pending' },
    timestamp: '2024-01-26T10:30:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    module: 'Invoicing',
    severity: 'medium',
    result: 'success',
    metadata: { department: 'Finance' }
  },
  {
    id: 'audit-002',
    userId: 'user-456',
    userName: 'Jane Smith',
    action: 'APPROVE',
    entityType: 'PurchaseOrder',
    entityId: 'PO-2023-045',
    entityName: 'IT Equipment Order',
    oldValues: { status: 'pending', approver: null },
    newValues: { status: 'approved', approver: 'Jane Smith', approvedAt: '2024-01-26T11:15:00Z' },
    timestamp: '2024-01-26T11:15:00Z',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    module: 'Purchase Orders',
    severity: 'high',
    result: 'success',
    metadata: { amount: 15000, department: 'IT' }
  },
  {
    id: 'audit-003',
    userId: 'user-789',
    userName: 'Mike Johnson',
    action: 'LOGIN',
    entityType: 'User',
    entityId: 'user-789',
    entityName: 'Mike Johnson',
    timestamp: '2024-01-26T09:00:00Z',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    module: 'Authentication',
    severity: 'low',
    result: 'success',
    metadata: { sessionId: 'sess-abc123', loginMethod: 'password' }
  },
  {
    id: 'audit-004',
    userId: 'user-123',
    userName: 'John Doe',
    action: 'DELETE',
    entityType: 'Supplier',
    entityId: 'SUP-2023-012',
    entityName: 'Inactive Supplier Co.',
    oldValues: { status: 'inactive', name: 'Inactive Supplier Co.', contactEmail: 'contact@inactive.com' },
    timestamp: '2024-01-25T16:45:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    module: 'Suppliers',
    severity: 'critical',
    result: 'success',
    metadata: { reason: 'Permanent closure', authorizedBy: 'admin-001' }
  }
];

export const useAuditTrail = () => {
  const [auditLog, setAuditLog] = useLocalStorage('auditTrail', initialAuditLog);
  const [filters, setFilters] = useState<AuditFilters>({});

  const logActivity = (
    action: string,
    entityType: string,
    entityId: string,
    entityName: string,
    options: {
      oldValues?: Record<string, any>;
      newValues?: Record<string, any>;
      module: string;
      severity: AuditEntry['severity'];
      metadata?: Record<string, any>;
    }
  ) => {
    const newEntry: AuditEntry = {
      id: `audit-${Date.now()}`,
      userId: 'current-user', // In real app, get from auth context
      userName: 'Current User',
      action,
      entityType,
      entityId,
      entityName,
      oldValues: options.oldValues,
      newValues: options.newValues,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.100', // In real app, get from request
      userAgent: navigator.userAgent,
      module: options.module,
      severity: options.severity,
      result: 'success',
      metadata: options.metadata
    };

    setAuditLog([newEntry, ...auditLog]);
    return newEntry;
  };

  const getFilteredAuditLog = () => {
    return auditLog.filter(entry => {
      if (filters.userId && entry.userId !== filters.userId) return false;
      if (filters.entityType && entry.entityType !== filters.entityType) return false;
      if (filters.module && entry.module !== filters.module) return false;
      if (filters.action && entry.action !== filters.action) return false;
      if (filters.severity && entry.severity !== filters.severity) return false;
      if (filters.result && entry.result !== filters.result) return false;
      if (filters.dateFrom && entry.timestamp < filters.dateFrom) return false;
      if (filters.dateTo && entry.timestamp > filters.dateTo) return false;
      return true;
    });
  };

  const getAuditSummary = () => {
    const total = auditLog.length;
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = auditLog.filter(entry => entry.timestamp.startsWith(today));
    
    const byAction = auditLog.reduce((acc, entry) => {
      acc[entry.action] = (acc[entry.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bySeverity = auditLog.reduce((acc, entry) => {
      acc[entry.severity] = (acc[entry.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byModule = auditLog.reduce((acc, entry) => {
      acc[entry.module] = (acc[entry.module] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      todayCount: todayEntries.length,
      byAction,
      bySeverity,
      byModule,
      mostActiveUser: 'Current User',
      mostActiveModule: Object.keys(byModule).reduce((a, b) => byModule[a] > byModule[b] ? a : b, 'Unknown')
    };
  };

  const exportAuditLog = (format: 'csv' | 'json' = 'csv') => {
    const data = getFilteredAuditLog();
    
    if (format === 'csv') {
      const headers = ['Timestamp', 'User', 'Action', 'Entity Type', 'Entity ID', 'Module', 'Severity', 'Result'];
      const rows = data.map(entry => [
        entry.timestamp,
        entry.userName,
        entry.action,
        entry.entityType,
        entry.entityId,
        entry.module,
        entry.severity,
        entry.result
      ]);
      
      const csvContent = [headers, ...rows].map(row => 
        row.map(cell => `"${cell}"`).join(',')
      ).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-log-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return {
    auditLog: getFilteredAuditLog(),
    allAuditLog: auditLog,
    filters,
    setFilters,
    logActivity,
    getAuditSummary,
    exportAuditLog,
    clearFilters: () => setFilters({})
  };
};