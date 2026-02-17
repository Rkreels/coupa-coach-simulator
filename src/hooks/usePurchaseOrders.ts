import { useState, useMemo } from 'react';

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
  { id: 'PO-2024-001', title: 'Office Supplies Q2 2024', vendor: 'Office Depot', vendorId: 'VENDOR-001', status: 'approved', totalAmount: 2450, currency: 'USD', dateCreated: '2024-05-15', dateModified: '2024-05-20', expectedDelivery: '2024-06-01', approvedDate: '2024-05-20', requestor: 'John Smith', department: 'Operations', priority: 'medium', approvalStatus: 'approved', lineItems: [{ id: 'LI-001', itemName: 'Office Chairs', description: 'Ergonomic office chairs', quantity: 5, unitPrice: 299.99, totalPrice: 1499.95, category: 'Furniture', uom: 'each', needByDate: '2024-06-01' }], notes: 'Delivery to main office reception' },
  { id: 'PO-2024-002', title: 'IT Equipment Refresh', vendor: 'Dell Technologies', vendorId: 'VENDOR-002', status: 'sent', totalAmount: 15750, currency: 'USD', dateCreated: '2024-05-20', dateModified: '2024-05-22', expectedDelivery: '2024-06-15', sentDate: '2024-05-22', requestor: 'Jane Doe', department: 'IT', priority: 'high', approvalStatus: 'approved', lineItems: [{ id: 'LI-002', itemName: 'Laptops', description: 'Dell Latitude 7430', quantity: 10, unitPrice: 1575, totalPrice: 15750, category: 'IT Equipment', uom: 'each', needByDate: '2024-06-15' }] },
  { id: 'PO-2024-003', title: 'Marketing Materials', vendor: 'Print Solutions Inc', vendorId: 'VENDOR-003', status: 'pending', totalAmount: 850, currency: 'USD', dateCreated: '2024-05-25', dateModified: '2024-05-25', expectedDelivery: '2024-06-10', requestor: 'Mike Wilson', department: 'Marketing', priority: 'medium', approvalStatus: 'pending', lineItems: [{ id: 'LI-003', itemName: 'Brochures', description: '1000 company brochures', quantity: 1000, unitPrice: 0.85, totalPrice: 850, category: 'Marketing', uom: 'pieces', needByDate: '2024-06-10' }] },
  { id: 'PO-2024-004', title: 'Cleaning Supplies', vendor: 'CleanCorp', vendorId: 'VENDOR-004', status: 'received', totalAmount: 320, currency: 'USD', dateCreated: '2024-05-10', dateModified: '2024-05-30', expectedDelivery: '2024-05-28', actualDelivery: '2024-05-28', sentDate: '2024-05-15', receivedDate: '2024-05-28', approvedDate: '2024-05-12', requestor: 'Sarah Davis', department: 'Facilities', priority: 'low', approvalStatus: 'approved', deliveryStatus: 'Complete', lineItems: [{ id: 'LI-004', itemName: 'Cleaning Bundle', description: 'Monthly cleaning supplies', quantity: 1, unitPrice: 320, totalPrice: 320, category: 'Facilities', uom: 'set', needByDate: '2024-05-28' }] },
  { id: 'PO-2024-005', title: 'Cloud Hosting Services - Q2', vendor: 'AWS Cloud Services', vendorId: 'VENDOR-005', status: 'approved', totalAmount: 28500, currency: 'USD', dateCreated: '2024-04-01', dateModified: '2024-04-05', expectedDelivery: '2024-04-01', approvedDate: '2024-04-05', requestor: 'David Kim', department: 'IT', priority: 'high', approvalStatus: 'approved', lineItems: [{ id: 'LI-005', itemName: 'Cloud Compute', description: 'EC2 instances Q2 pre-purchase', quantity: 1, unitPrice: 28500, totalPrice: 28500, category: 'Cloud Services', uom: 'lot', needByDate: '2024-04-01' }] },
  { id: 'PO-2024-006', title: 'Marketing Agency Retainer - March', vendor: 'Creative Minds Agency', vendorId: 'VENDOR-006', status: 'completed', totalAmount: 15000, currency: 'USD', dateCreated: '2024-03-01', dateModified: '2024-03-31', expectedDelivery: '2024-03-31', actualDelivery: '2024-03-31', sentDate: '2024-03-01', receivedDate: '2024-03-31', approvedDate: '2024-03-02', requestor: 'Emily Chen', department: 'Marketing', priority: 'medium', approvalStatus: 'approved', deliveryStatus: 'Complete', lineItems: [{ id: 'LI-006', itemName: 'Marketing Retainer', description: 'Monthly retainer', quantity: 1, unitPrice: 15000, totalPrice: 15000, category: 'Services', uom: 'month', needByDate: '2024-03-31' }] },
  { id: 'PO-2024-007', title: 'Security Guard Services - Q2', vendor: 'SecureForce Inc.', vendorId: 'VENDOR-007', status: 'sent', totalAmount: 24000, currency: 'USD', dateCreated: '2024-03-25', dateModified: '2024-03-28', expectedDelivery: '2024-06-30', sentDate: '2024-03-28', requestor: 'Lisa Johnson', department: 'Facilities', priority: 'medium', approvalStatus: 'approved', lineItems: [{ id: 'LI-007', itemName: 'Security Services', description: 'Q2 security guard services', quantity: 3, unitPrice: 8000, totalPrice: 24000, category: 'Security', uom: 'month', needByDate: '2024-06-30' }] },
  { id: 'PO-2024-008', title: 'Telecom Services Upgrade', vendor: 'Verizon Business', vendorId: 'VENDOR-008', status: 'approved', totalAmount: 45000, currency: 'USD', dateCreated: '2024-04-10', dateModified: '2024-04-15', expectedDelivery: '2024-05-15', approvedDate: '2024-04-15', requestor: 'Mike Rodriguez', department: 'IT', priority: 'high', approvalStatus: 'approved', lineItems: [{ id: 'LI-008', itemName: 'Network Upgrade', description: 'Enterprise network equipment', quantity: 1, unitPrice: 45000, totalPrice: 45000, category: 'Telecom', uom: 'lot', needByDate: '2024-05-15' }] },
  { id: 'PO-2024-009', title: 'Catering - Annual Conference', vendor: 'Gourmet Corporate Catering', vendorId: 'VENDOR-009', status: 'pending', totalAmount: 12500, currency: 'USD', dateCreated: '2024-05-01', dateModified: '2024-05-01', expectedDelivery: '2024-06-15', requestor: 'Amanda White', department: 'HR', priority: 'medium', approvalStatus: 'pending', lineItems: [{ id: 'LI-009', itemName: 'Conference Catering', description: 'Full catering for 200 people', quantity: 200, unitPrice: 62.50, totalPrice: 12500, category: 'Catering', uom: 'person', needByDate: '2024-06-15' }] },
  { id: 'PO-2024-010', title: 'Fleet Vehicle Lease - Q2', vendor: 'Enterprise Fleet Management', vendorId: 'VENDOR-010', status: 'sent', totalAmount: 35000, currency: 'USD', dateCreated: '2024-04-01', dateModified: '2024-04-05', expectedDelivery: '2024-06-30', sentDate: '2024-04-05', requestor: 'James Wilson', department: 'Operations', priority: 'high', approvalStatus: 'approved', lineItems: [{ id: 'LI-010', itemName: 'Vehicle Lease', description: 'Q2 fleet lease payment', quantity: 10, unitPrice: 3500, totalPrice: 35000, category: 'Fleet', uom: 'vehicle', needByDate: '2024-06-30' }] },
  { id: 'PO-2024-011', title: 'Safety Equipment Restock', vendor: 'SafetyFirst Supplies', vendorId: 'VENDOR-011', status: 'received', totalAmount: 6800, currency: 'USD', dateCreated: '2024-01-15', dateModified: '2024-02-05', expectedDelivery: '2024-02-01', actualDelivery: '2024-02-03', sentDate: '2024-01-18', receivedDate: '2024-02-03', approvedDate: '2024-01-16', requestor: 'James Wilson', department: 'Operations', priority: 'high', approvalStatus: 'approved', deliveryStatus: 'Complete', lineItems: [{ id: 'LI-011', itemName: 'PPE Kit', description: 'Personal protective equipment', quantity: 50, unitPrice: 136, totalPrice: 6800, category: 'Safety', uom: 'kit', needByDate: '2024-02-01' }] },
  { id: 'PO-2024-012', title: 'Lab Reagents & Supplies', vendor: 'ScienceDirect Lab Supplies', vendorId: 'VENDOR-012', status: 'pending', totalAmount: 22000, currency: 'USD', dateCreated: '2024-02-01', dateModified: '2024-02-01', expectedDelivery: '2024-02-15', requestor: 'Patricia Adams', department: 'R&D', priority: 'high', approvalStatus: 'pending', lineItems: [{ id: 'LI-012', itemName: 'Reagent Bundle', description: 'Chemical reagents for testing', quantity: 10, unitPrice: 2200, totalPrice: 22000, category: 'Lab Supplies', uom: 'kit', needByDate: '2024-02-15' }] },
  { id: 'PO-2024-013', title: 'Cybersecurity Audit', vendor: 'CyberShield Consulting', vendorId: 'VENDOR-013', status: 'completed', totalAmount: 35000, currency: 'USD', dateCreated: '2024-01-10', dateModified: '2024-02-28', expectedDelivery: '2024-02-28', actualDelivery: '2024-02-28', sentDate: '2024-01-12', receivedDate: '2024-02-28', approvedDate: '2024-01-11', requestor: 'David Kim', department: 'IT', priority: 'urgent', approvalStatus: 'approved', deliveryStatus: 'Complete', lineItems: [{ id: 'LI-013', itemName: 'Security Audit', description: 'Full penetration test & audit', quantity: 1, unitPrice: 35000, totalPrice: 35000, category: 'Security', uom: 'project', needByDate: '2024-02-28' }] },
  { id: 'PO-2024-014', title: 'Warehouse Shelving', vendor: 'IndustrialRack Systems', vendorId: 'VENDOR-014', status: 'sent', totalAmount: 14500, currency: 'USD', dateCreated: '2024-02-10', dateModified: '2024-02-15', expectedDelivery: '2024-03-15', sentDate: '2024-02-15', requestor: 'James Wilson', department: 'Operations', priority: 'medium', approvalStatus: 'approved', lineItems: [{ id: 'LI-014', itemName: 'Heavy Duty Shelving', description: 'Industrial shelving units', quantity: 25, unitPrice: 580, totalPrice: 14500, category: 'Warehouse', uom: 'unit', needByDate: '2024-03-15' }] },
  { id: 'PO-2024-015', title: 'ERP License Renewal', vendor: 'SAP Licensing Corp', vendorId: 'VENDOR-015', status: 'approved', totalAmount: 100000, currency: 'USD', dateCreated: '2024-01-01', dateModified: '2024-01-05', expectedDelivery: '2024-01-31', approvedDate: '2024-01-05', requestor: 'David Kim', department: 'IT', priority: 'urgent', approvalStatus: 'approved', lineItems: [{ id: 'LI-015', itemName: 'ERP License', description: 'Annual ERP license renewal', quantity: 200, unitPrice: 500, totalPrice: 100000, category: 'Software', uom: 'license', needByDate: '2024-01-31' }] },
  { id: 'PO-2024-016', title: 'Waste Management - Q2', vendor: 'EcoWaste Solutions', vendorId: 'VENDOR-016', status: 'sent', totalAmount: 9000, currency: 'USD', dateCreated: '2024-03-28', dateModified: '2024-03-30', expectedDelivery: '2024-06-30', sentDate: '2024-03-30', requestor: 'Lisa Johnson', department: 'Facilities', priority: 'low', approvalStatus: 'approved', lineItems: [{ id: 'LI-016', itemName: 'Waste Services', description: 'Q2 waste management', quantity: 3, unitPrice: 3000, totalPrice: 9000, category: 'Waste', uom: 'month', needByDate: '2024-06-30' }] },
  { id: 'PO-2024-017', title: 'Legal Advisory Retainer', vendor: 'Baker & Associates LLP', vendorId: 'VENDOR-017', status: 'approved', totalAmount: 18500, currency: 'USD', dateCreated: '2024-02-01', dateModified: '2024-02-05', expectedDelivery: '2024-02-28', approvedDate: '2024-02-05', requestor: 'Patricia Adams', department: 'Legal', priority: 'high', approvalStatus: 'approved', lineItems: [{ id: 'LI-017', itemName: 'Legal Services', description: 'Monthly legal advisory', quantity: 74, unitPrice: 250, totalPrice: 18500, category: 'Legal', uom: 'hour', needByDate: '2024-02-28' }] },
  { id: 'PO-2024-018', title: 'Ergonomic Equipment', vendor: 'ErgoTech Solutions', vendorId: 'VENDOR-018', status: 'received', totalAmount: 4800, currency: 'USD', dateCreated: '2024-02-12', dateModified: '2024-03-10', expectedDelivery: '2024-03-15', actualDelivery: '2024-03-10', sentDate: '2024-02-15', receivedDate: '2024-03-10', approvedDate: '2024-02-14', requestor: 'Amanda White', department: 'HR', priority: 'low', approvalStatus: 'approved', deliveryStatus: 'Complete', lineItems: [{ id: 'LI-018', itemName: 'Standing Desks', description: 'Standing desk converters', quantity: 12, unitPrice: 400, totalPrice: 4800, category: 'Ergonomics', uom: 'each', needByDate: '2024-03-15' }] },
  { id: 'PO-2024-019', title: 'Insurance Premium Annual', vendor: 'Liberty Mutual Insurance', vendorId: 'VENDOR-019', status: 'completed', totalAmount: 85000, currency: 'USD', dateCreated: '2024-01-01', dateModified: '2024-01-10', expectedDelivery: '2024-01-15', actualDelivery: '2024-01-10', sentDate: '2024-01-02', receivedDate: '2024-01-10', approvedDate: '2024-01-03', requestor: 'Patricia Adams', department: 'Finance', priority: 'high', approvalStatus: 'approved', deliveryStatus: 'Complete', lineItems: [{ id: 'LI-019', itemName: 'Insurance Policy', description: 'Annual business insurance', quantity: 1, unitPrice: 85000, totalPrice: 85000, category: 'Insurance', uom: 'policy', needByDate: '2024-01-15' }] },
  { id: 'PO-2024-020', title: 'Shipping Supplies Restock', vendor: 'PackagePro Supplies', vendorId: 'VENDOR-020', status: 'draft', totalAmount: 1800, currency: 'USD', dateCreated: '2024-02-18', dateModified: '2024-02-18', expectedDelivery: '2024-03-01', requestor: 'James Wilson', department: 'Operations', priority: 'low', approvalStatus: 'not_required', lineItems: [{ id: 'LI-020', itemName: 'Shipping Boxes', description: 'Assorted shipping boxes', quantity: 200, unitPrice: 9, totalPrice: 1800, category: 'Packaging', uom: 'box', needByDate: '2024-03-01' }] }
];

export function usePurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof PurchaseOrder; direction: 'asc' | 'desc' } | null>(null);

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

    // Apply sorting
    if (sortConfig) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [purchaseOrders, searchTerm, statusFilter, departmentFilter, sortConfig]);

  const filters = {
    status: statusFilter,
    department: departmentFilter
  };

  const updateFilter = (filterType: string, value: string) => {
    if (filterType === 'status') {
      setStatusFilter(value);
    } else if (filterType === 'department') {
      setDepartmentFilter(value);
    }
  };

  const handleSort = (key: keyof PurchaseOrder) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

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
    filters,
    updateFilter,
    sortConfig,
    handleSort,
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
