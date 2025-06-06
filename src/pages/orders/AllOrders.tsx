
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePurchaseOrders } from '../../hooks/usePurchaseOrders';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, Edit, Trash, Search, Send, Package, Clock, CheckCircle, FileText } from 'lucide-react';

const AllOrdersPage = () => {
  const { toast } = useToast();
  const { purchaseOrders, totalCount, metrics } = usePurchaseOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendOrder = (order) => {
    toast({
      title: 'Order Sent',
      description: `Purchase order ${order.id} has been sent to ${order.vendor}.`
    });
  };

  const handleReceiveOrder = (order) => {
    toast({
      title: 'Order Received',
      description: `Purchase order ${order.id} has been marked as received.`
    });
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const columns = [
    { 
      key: 'id', 
      header: 'Order ID', 
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="font-mono text-sm">{value}</span>
        </div>
      )
    },
    { key: 'title', header: 'Title', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      render: (value) => (
        <Badge className={
          value === 'approved' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'sent' ? 'bg-blue-100 text-blue-800' :
          value === 'received' ? 'bg-emerald-100 text-emerald-800' :
          'bg-gray-100 text-gray-800'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      render: (value, item) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'requestor', header: 'Requestor', sortable: true },
    { key: 'expectedDelivery', header: 'Expected Delivery', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="All Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Purchase Orders Management</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{totalCount}</div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{metrics.pending}</div>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{metrics.approved}</div>
                  <p className="text-sm text-gray-500">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</div>
                  <p className="text-sm text-gray-500">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredOrders}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRowClick={openDetails}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(item);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {item.status === 'approved' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendOrder(item);
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                  {item.status === 'sent' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReceiveOrder(item);
                      }}
                    >
                      <Package className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit functionality
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete functionality
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Order ID</label>
                  <p className="text-lg font-semibold">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Vendor</label>
                  <p className="text-lg">{selectedOrder.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <Badge className="mt-1">{selectedOrder.status}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Amount</label>
                  <p className="text-lg font-semibold">{selectedOrder.currency} {selectedOrder.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ApplicationLayout>
  );
};

export default AllOrdersPage;
