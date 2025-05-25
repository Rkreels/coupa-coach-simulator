
import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface PurchaseOrder {
  id: string;
  title: string;
  vendor: string;
  vendorId: string;
  status: 'draft' | 'pending' | 'approved' | 'sent' | 'received' | 'completed' | 'canceled';
  totalAmount: number;
  currency: string;
  dateCreated: string;
  dateModified: string;
  expectedDelivery: string;
  actualDelivery?: string;
  requestor: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  approvalStatus: 'not_required' | 'pending' | 'approved' | 'rejected';
  lineItems: PurchaseOrderLineItem[];
  notes?: string;
  attachments?: string[];
}

export interface PurchaseOrderLineItem {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  uom: string; // unit of measure
  needByDate: string;
}

const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-2024-001',
    title: 'Office Supplies Q2 2024',
    vendor: 'Office Depot',
    vendorId: 'VENDOR-001',
    status: 'approved',
    totalAmount: 2450.00,
    currency: 'USD',
    dateCreated: '2024-05-15',
    dateModified: '2024-05-20',
    expectedDelivery: '2024-06-01',
    requestor: 'John Smith',
    department: 'Operations',
    priority: 'medium',
    approvalStatus: 'approved',
    lineItems: [
      {
        id: 'LI-001',
        itemName: 'Office Chairs',
        description: 'Ergonomic office chairs',
        quantity: 5,
        unitPrice: 299.99,
        totalPrice: 1499.95,
        category: 'Furniture',
        uom: 'each',
        needByDate: '2024-06-01'
      }
    ],
    notes: 'Delivery to main office reception'
  },
  {
    id: 'PO-2024-002',
    title: 'IT Equipment Refresh',
    vendor: 'Dell Technologies',
    vendorId: 'VENDOR-002',
    status: 'sent',
    totalAmount: 15750.00,
    currency: 'USD',
    dateCreated: '2024-05-20',
    dateModified: '2024-05-22',
    expectedDelivery: '2024-06-15',
    requestor: 'Jane Doe',
    department: 'IT',
    priority: 'high',
    approvalStatus: 'approved',
    lineItems: [
      {
        id: 'LI-002',
        itemName: 'Laptops',
        description: 'Dell Latitude 7430',
        quantity: 10,
        unitPrice: 1575.00,
        totalPrice: 15750.00,
        category: 'IT Equipment',
        uom: 'each',
        needByDate: '2024-06-15'
      }
    ]
  }
];

export function usePurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useLocalStorage('purchaseOrders', initialPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PurchaseOrder;
    direction: 'asc' | 'desc';
  } | null>(null);

  const filteredData = useMemo(() => {
    let result = purchaseOrders;

    // Apply search
    if (searchTerm) {
      result = result.filter((po) =>
        po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.requestor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((po) => String(po[key as keyof PurchaseOrder]) === value);
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [purchaseOrders, searchTerm, filters, sortConfig]);

  const addPurchaseOrder = (po: Omit<PurchaseOrder, 'id' | 'dateCreated' | 'dateModified'>) => {
    const newPO = {
      ...po,
      id: `PO-${new Date().getFullYear()}-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0]
    } as PurchaseOrder;
    setPurchaseOrders([...purchaseOrders, newPO]);
    return newPO;
  };

  const updatePurchaseOrder = (id: string, updates: Partial<PurchaseOrder>) => {
    setPurchaseOrders(purchaseOrders.map(po => 
      po.id === id ? { ...po, ...updates, dateModified: new Date().toISOString().split('T')[0] } : po
    ));
  };

  const deletePurchaseOrder = (id: string) => {
    setPurchaseOrders(purchaseOrders.filter(po => po.id !== id));
  };

  const handleSort = (key: keyof PurchaseOrder) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getMetrics = () => ({
    total: purchaseOrders.length,
    pending: purchaseOrders.filter(po => po.status === 'pending').length,
    approved: purchaseOrders.filter(po => po.status === 'approved').length,
    completed: purchaseOrders.filter(po => po.status === 'completed').length,
    totalValue: purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0)
  });

  return {
    purchaseOrders: filteredData,
    allPurchaseOrders: purchaseOrders,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortConfig,
    handleSort,
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    totalCount: purchaseOrders.length,
    filteredCount: filteredData.length,
    metrics: getMetrics()
  };
}
