
import { useState, useEffect } from 'react';

interface ModuleMetrics {
  [key: string]: number | string;
}

interface ModuleData {
  metrics: ModuleMetrics;
  recentItems: any[];
  alerts: any[];
  loading: boolean;
}

export const useModuleData = (moduleName: string): ModuleData => {
  const [data, setData] = useState<ModuleData>({
    metrics: {},
    recentItems: [],
    alerts: [],
    loading: true
  });

  useEffect(() => {
    // Simulate API call for module-specific data
    const fetchModuleData = () => {
      setData({ ...data, loading: true });
      
      setTimeout(() => {
        const moduleData = getModuleSpecificData(moduleName);
        setData({
          ...moduleData,
          loading: false
        });
      }, 500);
    };

    fetchModuleData();
  }, [moduleName]);

  return data;
};

const getModuleSpecificData = (moduleName: string): Omit<ModuleData, 'loading'> => {
  const baseData = {
    metrics: {},
    recentItems: [],
    alerts: []
  };

  switch (moduleName) {
    case 'requisitions':
      return {
        ...baseData,
        metrics: {
          totalRequisitions: 245,
          pendingApproval: 12,
          approved: 156,
          inProgress: 77,
          totalValue: 1250000,
          averageProcessingTime: '2.3 days'
        },
        recentItems: [
          { id: 'REQ-001', title: 'Office Supplies Q1', status: 'pending', amount: 2500 },
          { id: 'REQ-002', title: 'IT Equipment', status: 'approved', amount: 15000 },
          { id: 'REQ-003', title: 'Marketing Materials', status: 'in_progress', amount: 3200 }
        ],
        alerts: [
          { type: 'warning', message: '12 requisitions pending approval over 3 days' },
          { type: 'info', message: 'New budget allocation available for Q2' }
        ]
      };

    case 'orders':
      return {
        ...baseData,
        metrics: {
          totalOrders: 189,
          pending: 23,
          approved: 78,
          sent: 45,
          received: 32,
          completed: 11,
          totalValue: 2150000
        },
        recentItems: [
          { id: 'PO-001', vendor: 'Acme Corp', status: 'sent', amount: 25000 },
          { id: 'PO-002', vendor: 'Tech Solutions', status: 'approved', amount: 18500 },
          { id: 'PO-003', vendor: 'Office Plus', status: 'received', amount: 3200 }
        ],
        alerts: [
          { type: 'urgent', message: '5 orders overdue for delivery' },
          { type: 'success', message: '23 orders delivered on time this week' }
        ]
      };

    case 'suppliers':
      return {
        ...baseData,
        metrics: {
          totalSuppliers: 456,
          activeSuppliers: 342,
          newSuppliers: 12,
          riskSuppliers: 8,
          performanceScore: 87,
          complianceRate: 94
        },
        recentItems: [
          { id: 'SUP-001', name: 'Global Tech Inc', status: 'active', score: 92 },
          { id: 'SUP-002', name: 'Office Depot', status: 'onboarding', score: 85 },
          { id: 'SUP-003', name: 'Industrial Supply Co', status: 'high_risk', score: 65 }
        ],
        alerts: [
          { type: 'warning', message: '8 suppliers flagged for risk assessment' },
          { type: 'info', message: '12 new supplier applications pending review' }
        ]
      };

    case 'contracts':
      return {
        ...baseData,
        metrics: {
          totalContracts: 234,
          activeContracts: 189,
          expiringContracts: 15,
          pendingRenewal: 8,
          totalValue: 45000000,
          complianceRate: 96
        },
        recentItems: [
          { id: 'CON-001', supplier: 'Tech Corp', status: 'active', value: 500000 },
          { id: 'CON-002', supplier: 'Service Pro', status: 'expiring', value: 250000 },
          { id: 'CON-003', supplier: 'Global Supply', status: 'pending', value: 750000 }
        ],
        alerts: [
          { type: 'urgent', message: '15 contracts expiring within 30 days' },
          { type: 'warning', message: '8 contracts pending renewal approval' }
        ]
      };

    case 'invoices':
      return {
        ...baseData,
        metrics: {
          totalInvoices: 1234,
          pendingApproval: 45,
          processing: 23,
          approved: 67,
          paid: 1099,
          disputes: 5,
          totalValue: 8750000
        },
        recentItems: [
          { id: 'INV-001', vendor: 'Tech Solutions', status: 'pending', amount: 15000 },
          { id: 'INV-002', vendor: 'Office Supply', status: 'approved', amount: 2500 },
          { id: 'INV-003', vendor: 'Service Pro', status: 'dispute', amount: 8500 }
        ],
        alerts: [
          { type: 'warning', message: '45 invoices pending approval' },
          { type: 'urgent', message: '5 invoices in dispute requiring attention' }
        ]
      };

    case 'payments':
      return {
        ...baseData,
        metrics: {
          totalPayments: 567,
          scheduledPayments: 23,
          processedToday: 12,
          failedPayments: 2,
          totalValue: 5600000,
          cashBalance: 2340000
        },
        recentItems: [
          { id: 'PAY-001', vendor: 'Global Tech', status: 'processed', amount: 25000 },
          { id: 'PAY-002', vendor: 'Office Plus', status: 'scheduled', amount: 3200 },
          { id: 'PAY-003', vendor: 'Service Corp', status: 'failed', amount: 15000 }
        ],
        alerts: [
          { type: 'urgent', message: '2 payments failed and require attention' },
          { type: 'info', message: '23 payments scheduled for next week' }
        ]
      };

    case 'inventory':
      return {
        ...baseData,
        metrics: {
          totalItems: 2345,
          lowStockItems: 45,
          outOfStockItems: 12,
          excessInventory: 23,
          totalValue: 1850000,
          turnoverRate: 4.2
        },
        recentItems: [
          { id: 'ITM-001', name: 'Office Chairs', status: 'low_stock', quantity: 5 },
          { id: 'ITM-002', name: 'Laptops', status: 'adequate', quantity: 25 },
          { id: 'ITM-003', name: 'Paper Supplies', status: 'out_of_stock', quantity: 0 }
        ],
        alerts: [
          { type: 'urgent', message: '12 items are out of stock' },
          { type: 'warning', message: '45 items have low stock levels' }
        ]
      };

    default:
      return baseData;
  }
};
