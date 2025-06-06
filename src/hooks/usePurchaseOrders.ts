
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
  sentDate?: string;
  receivedDate?: string;
  approvedDate?: string;
  requestor: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  approvalStatus: 'not_required' | 'pending' | 'approved' | 'rejected';
  lineItems: PurchaseOrderLineItem[];
  notes?: string;
  attachments?: string[];
  deliveryStatus?: string;
}

export interface PurchaseOrderLineItem {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  uom: string;
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
    approvedDate: '2024-05-20',
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
    sentDate: '2024-05-22',
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
  },
  {
    id: 'PO-2024-003',
    title: 'Marketing Materials',
    vendor: 'Print Solutions Inc',
    vendorId: 'VENDOR-003',
    status: 'pending',
    totalAmount: 850.00,
    currency: 'USD',
    dateCreated: '2024-05-25',
    dateModified: '2024-05-25',
    expectedDelivery: '2024-06-10',
    requestor: 'Mike Wilson',
    department: 'Marketing',
    priority: 'medium',
    approvalStatus: 'pending',
    lineItems: [
      {
        id: 'LI-003',
        itemName: 'Brochures',
        description: 'Company brochures - 1000 units',
        quantity: 1000,
        unitPrice: 0.85,
        totalPrice: 850.00,
        category: 'Marketing',
        uom: 'pieces',
        needByDate: '2024-06-10'
      }
    ]
  },
  {
    id: 'PO-2024-004',
    title: 'Cleaning Supplies',
    vendor: 'CleanCorp',
    vendorId: 'VENDOR-004',
    status: 'received',
    totalAmount: 320.00,
    currency: 'USD',
    dateCreated: '2024-05-10',
    dateModified: '2024-05-30',
    expectedDelivery: '2024-05-28',
    actualDelivery: '2024-05-28',
    sentDate: '2024-05-15',
    receivedDate: '2024-05-28',
    approvedDate: '2024-05-12',
    requestor: 'Sarah Davis',
    department: 'Facilities',
    priority: 'low',
    approvalStatus: 'approved',
    deliveryStatus: 'Complete',
    lineItems: [
      {
        id: 'LI-004',
        itemName: 'Cleaning Supplies Bundle',
        description: 'Monthly cleaning supplies',
        quantity: 1,
        unitPrice: 320.00,
        totalPrice: 320.00,
        category: 'Facilities',
        uom: 'set',
        needByDate: '2024-05-28'
      }
    ]
  }
];

export function usePurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useLocalStorage('purchaseOrders', initialPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredData = useMemo(() => {
    let result = purchaseOrders;

    if (searchTerm) {
      result = result.filter((po) =>
        po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.requestor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      result = result.filter((po) => po.status === statusFilter);
    }

    if (departmentFilter && departmentFilter !== 'all') {
      result = result.filter((po) => po.department === departmentFilter);
    }

    return result;
  }, [purchaseOrders, searchTerm, statusFilter, departmentFilter]);

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

  const approvePurchaseOrder = (id: string) => {
    updatePurchaseOrder(id, {
      status: 'approved',
      approvalStatus: 'approved',
      approvedDate: new Date().toISOString().split('T')[0]
    });
  };

  const rejectPurchaseOrder = (id: string) => {
    updatePurchaseOrder(id, {
      status: 'draft',
      approvalStatus: 'rejected'
    });
  };

  const sendPurchaseOrder = (id: string) => {
    updatePurchaseOrder(id, {
      status: 'sent',
      sentDate: new Date().toISOString().split('T')[0]
    });
  };

  const receivePurchaseOrder = (id: string) => {
    updatePurchaseOrder(id, {
      status: 'received',
      receivedDate: new Date().toISOString().split('T')[0],
      actualDelivery: new Date().toISOString().split('T')[0],
      deliveryStatus: 'Complete'
    });
  };

  const getMetrics = () => ({
    total: purchaseOrders.length,
    pending: purchaseOrders.filter(po => po.status === 'pending').length,
    approved: purchaseOrders.filter(po => po.status === 'approved').length,
    sent: purchaseOrders.filter(po => po.status === 'sent').length,
    received: purchaseOrders.filter(po => po.status === 'received').length,
    completed: purchaseOrders.filter(po => po.status === 'completed').length,
    totalValue: purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0)
  });

  return {
    purchaseOrders: filteredData,
    allPurchaseOrders: purchaseOrders,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    approvePurchaseOrder,
    rejectPurchaseOrder,
    sendPurchaseOrder,
    receivePurchaseOrder,
    totalCount: purchaseOrders.length,
    filteredCount: filteredData.length,
    metrics: getMetrics()
  };
}
