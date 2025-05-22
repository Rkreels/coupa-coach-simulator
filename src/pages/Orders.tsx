
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, Package, FileText, Check, Clock, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

// Define the status type to ensure consistency
type OrderStatus = "completed" | "processing" | "pending" | "cancelled";

// Define the priority type to ensure consistency
type OrderPriority = "High" | "Medium" | "Low";

// Define the order interface
interface Order {
  id: string;
  title: string;
  supplier: string;
  status: OrderStatus;
  orderDate: string;
  deliveryDate: string | null;
  totalAmount: number;
  priority: OrderPriority;
  items: OrderItem[];
}

// Define the order item interface
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Define the new order form data type
interface NewOrderFormData {
  title: string;
  supplier: string;
  deliveryDate: string;
  priority: OrderPriority;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
}

// Initial mock data for orders
const initialOrders: Order[] = [
  {
    id: "PO-2023-001",
    title: "Office Supplies - Q2",
    supplier: "Staples Inc.",
    status: "completed",
    orderDate: "2023-05-01",
    deliveryDate: "2023-05-10",
    totalAmount: 2450.75,
    priority: "Medium",
    items: [
      {
        id: "ITEM-001",
        name: "Paper Reams",
        quantity: 50,
        unitPrice: 5.99,
        totalPrice: 299.50
      },
      {
        id: "ITEM-002",
        name: "Ink Cartridges",
        quantity: 10,
        unitPrice: 45.99,
        totalPrice: 459.90
      }
    ]
  },
  {
    id: "PO-2023-002",
    title: "IT Equipment - Laptops",
    supplier: "Dell Technologies",
    status: "processing",
    orderDate: "2023-05-15",
    deliveryDate: null,
    totalAmount: 12350.00,
    priority: "High",
    items: [
      {
        id: "ITEM-003",
        name: "Dell XPS Laptop",
        quantity: 5,
        unitPrice: 1599.00,
        totalPrice: 7995.00
      },
      {
        id: "ITEM-004",
        name: "Docking Stations",
        quantity: 5,
        unitPrice: 199.00,
        totalPrice: 995.00
      }
    ]
  },
  {
    id: "PO-2023-003",
    title: "Marketing Materials",
    supplier: "PrintWorks Co.",
    status: "pending",
    orderDate: "2023-05-20",
    deliveryDate: null,
    totalAmount: 3200.50,
    priority: "Medium",
    items: [
      {
        id: "ITEM-005",
        name: "Brochures",
        quantity: 1000,
        unitPrice: 1.50,
        totalPrice: 1500.00
      },
      {
        id: "ITEM-006",
        name: "Business Cards",
        quantity: 500,
        unitPrice: 0.25,
        totalPrice: 125.00
      }
    ]
  }
];

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Form state for creating new orders
  const [newOrderData, setNewOrderData] = useState<NewOrderFormData>({
    title: '',
    supplier: '',
    deliveryDate: '',
    priority: 'Medium',
    items: [{
      name: '',
      quantity: 1,
      unitPrice: 0
    }]
  });

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Get status icon based on status
  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Handle opening the view dialog
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  // Handle opening the edit dialog
  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
    // Pre-populate the form with the order data
    setNewOrderData({
      title: order.title,
      supplier: order.supplier,
      deliveryDate: order.deliveryDate || '',
      priority: order.priority,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    });
  };

  // Handle opening the delete dialog
  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  // Handle creating a new order
  const handleCreateOrder = () => {
    // Calculate the total price for each item
    const items = newOrderData.items.map((item, index) => ({
      id: `ITEM-NEW-${index}`,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.quantity * item.unitPrice
    }));

    // Calculate the total amount
    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    // Create the new order
    const newOrder: Order = {
      id: `PO-${new Date().getFullYear()}-${orders.length + 1}`.padStart(10, '0'),
      title: newOrderData.title,
      supplier: newOrderData.supplier,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: newOrderData.deliveryDate || null,
      totalAmount,
      priority: newOrderData.priority,
      items
    };

    // Add the new order to the orders list
    setOrders([newOrder, ...orders]);
    
    // Reset form and close dialog
    setNewOrderData({
      title: '',
      supplier: '',
      deliveryDate: '',
      priority: 'Medium',
      items: [{
        name: '',
        quantity: 1,
        unitPrice: 0
      }]
    });
    setIsCreateDialogOpen(false);

    // Show success toast
    toast({
      title: "Order Created",
      description: `Order ${newOrder.id} has been created successfully.`,
    });
  };

  // Handle updating an existing order
  const handleUpdateOrder = () => {
    if (!selectedOrder) return;

    // Calculate the total price for each item
    const items = newOrderData.items.map((item, index) => ({
      id: `ITEM-${selectedOrder.id}-${index}`,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.quantity * item.unitPrice
    }));

    // Calculate the total amount
    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    // Create the updated order
    const updatedOrder: Order = {
      ...selectedOrder,
      title: newOrderData.title,
      supplier: newOrderData.supplier,
      deliveryDate: newOrderData.deliveryDate || null,
      totalAmount,
      priority: newOrderData.priority,
      items
    };

    // Update the orders list
    setOrders(orders.map(order => order.id === selectedOrder.id ? updatedOrder : order));
    
    // Reset form and close dialog
    setIsEditDialogOpen(false);

    // Show success toast
    toast({
      title: "Order Updated",
      description: `Order ${updatedOrder.id} has been updated successfully.`,
    });
  };

  // Handle deleting an order
  const handleConfirmDelete = () => {
    if (!selectedOrder) return;

    // Remove the order from the orders list
    setOrders(orders.filter(order => order.id !== selectedOrder.id));
    
    // Close dialog
    setIsDeleteDialogOpen(false);

    // Show success toast
    toast({
      title: "Order Deleted",
      description: `Order ${selectedOrder.id} has been deleted.`,
    });
  };

  // Add a new item to the order form
  const handleAddItem = () => {
    setNewOrderData({
      ...newOrderData,
      items: [...newOrderData.items, {
        name: '',
        quantity: 1,
        unitPrice: 0
      }]
    });
  };

  // Remove an item from the order form
  const handleRemoveItem = (index: number) => {
    if (newOrderData.items.length === 1) return; // Keep at least one item
    
    setNewOrderData({
      ...newOrderData,
      items: newOrderData.items.filter((_, i) => i !== index)
    });
  };

  // Update item data in the form
  const handleItemChange = (index: number, field: 'name' | 'quantity' | 'unitPrice', value: string | number) => {
    const newItems = [...newOrderData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'name' ? value : Number(value)
    };

    setNewOrderData({
      ...newOrderData,
      items: newItems
    });
  };

  // Filter orders based on search query and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate total dollar amount of orders
  const totalOrderAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Count orders by status
  const pendingOrdersCount = orders.filter(order => order.status === 'pending').length;
  const processingOrdersCount = orders.filter(order => order.status === 'processing').length;

  return (
    <ApplicationLayout 
      pageTitle="Purchase Orders"
      pageLoadScript="Welcome to the Purchase Orders module. Here you can create, manage, and track orders to your suppliers. Review orders by status and track delivery timelines."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select 
              className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Purchase Order
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows the total value of all purchase orders."
          howScript="Use this to track your overall purchasing volume."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total PO Value</p>
                <h3 className="text-3xl font-bold text-coupa-blue">{formatCurrency(totalOrderAmount)}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{orders.length}</span> total orders
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows orders awaiting approval."
          howScript="Monitor this to ensure orders are processed on time."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>
                <h3 className="text-3xl font-bold text-yellow-500">{pendingOrdersCount}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Awaiting approval</span>
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows orders in progress."
          howScript="Track these orders to ensure timely delivery."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Processing Orders</p>
                <h3 className="text-3xl font-bold text-blue-500">{processingOrdersCount}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">In progress</span>
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    {order.id}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{order.title}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'processing' 
                          ? 'bg-blue-100 text-blue-800' 
                          : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.deliveryDate || 'Not scheduled'}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : order.priority === 'Medium' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-yellow-600 hover:text-yellow-800"
                      onClick={() => handleEditOrder(order)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteOrder(order)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No orders found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Showing {filteredOrders.length} of {orders.length} orders</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>

      {/* Create Order Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.title}
                onChange={(e) => setNewOrderData({...newOrderData, title: e.target.value})}
                placeholder="Enter order title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Supplier</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.supplier}
                onChange={(e) => setNewOrderData({...newOrderData, supplier: e.target.value})}
              >
                <option value="">Select a supplier</option>
                <option value="Staples Inc.">Staples Inc.</option>
                <option value="Dell Technologies">Dell Technologies</option>
                <option value="PrintWorks Co.">PrintWorks Co.</option>
                <option value="Office Depot">Office Depot</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expected Delivery Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.deliveryDate}
                onChange={(e) => setNewOrderData({...newOrderData, deliveryDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.priority}
                onChange={(e) => setNewOrderData({...newOrderData, priority: e.target.value as OrderPriority})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="py-2">
            <h3 className="font-medium mb-3">Line Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newOrderData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        placeholder="Item name"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="1"
                        className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-24 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700" 
                        onClick={() => handleRemoveItem(index)}
                        disabled={newOrderData.items.length === 1}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2" 
              onClick={handleAddItem}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateOrder}
              disabled={!newOrderData.title || !newOrderData.supplier}
            >
              Create Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Order Dialog */}
      {selectedOrder && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Order Details: {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Title</h3>
                <p>{selectedOrder.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                <p>{selectedOrder.supplier}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                    selectedOrder.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedOrder.status === 'processing' 
                        ? 'bg-blue-100 text-blue-800' 
                        : selectedOrder.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {getStatusIcon(selectedOrder.status)}
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedOrder.priority === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : selectedOrder.priority === 'Medium' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {selectedOrder.priority}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                <p>{selectedOrder.orderDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Expected Delivery</h3>
                <p>{selectedOrder.deliveryDate || 'Not scheduled'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="text-lg font-semibold text-coupa-blue">{formatCurrency(selectedOrder.totalAmount)}</p>
              </div>
            </div>

            <div className="py-2">
              <h3 className="font-medium mb-3">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(item.totalPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <DialogFooter>
              <Button 
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Order: {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.title}
                onChange={(e) => setNewOrderData({...newOrderData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Supplier</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.supplier}
                onChange={(e) => setNewOrderData({...newOrderData, supplier: e.target.value})}
              >
                <option value="">Select a supplier</option>
                <option value="Staples Inc.">Staples Inc.</option>
                <option value="Dell Technologies">Dell Technologies</option>
                <option value="PrintWorks Co.">PrintWorks Co.</option>
                <option value="Office Depot">Office Depot</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expected Delivery Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.deliveryDate}
                onChange={(e) => setNewOrderData({...newOrderData, deliveryDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                value={newOrderData.priority}
                onChange={(e) => setNewOrderData({...newOrderData, priority: e.target.value as OrderPriority})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="py-2">
            <h3 className="font-medium mb-3">Line Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newOrderData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="1"
                        className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-24 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700" 
                        onClick={() => handleRemoveItem(index)}
                        disabled={newOrderData.items.length === 1}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2" 
              onClick={handleAddItem}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateOrder}
              disabled={!newOrderData.title || !newOrderData.supplier}
            >
              Update Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Order Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete order <strong>{selectedOrder?.id}</strong>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ApplicationLayout>
  );
};

export default OrdersPage;

