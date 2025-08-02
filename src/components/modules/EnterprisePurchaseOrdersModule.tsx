import React, { useState } from 'react';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEnterprisePurchaseOrders } from '../../hooks/useEnterprisePurchaseOrders';
import { EnterprisePurchaseOrder } from '../../types/coupa-entities';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Truck,
  DollarSign,
  Package,
  Users
} from 'lucide-react';

export const EnterprisePurchaseOrdersModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    purchaseOrders,
    statusFilter,
    setStatusFilter,
    supplierFilter,
    setSupplierFilter,
    metrics,
    issuePurchaseOrder,
    acknowledgePurchaseOrder,
    receivePurchaseOrder
  } = useEnterprisePurchaseOrders();

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: Edit },
      pending_approval: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      issued: { color: 'bg-blue-100 text-blue-800', icon: FileText },
      acknowledged: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
      in_progress: { color: 'bg-orange-100 text-orange-800', icon: Truck },
      partially_received: { color: 'bg-cyan-100 text-cyan-800', icon: Package },
      received: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      invoiced: { color: 'bg-indigo-100 text-indigo-800', icon: FileText },
      closed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      disputed: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.draft;
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getTypeColor = (type: string) => {
    const colors = {
      standard: 'bg-blue-100 text-blue-800',
      blanket: 'bg-purple-100 text-purple-800',
      contract: 'bg-green-100 text-green-800',
      services: 'bg-orange-100 text-orange-800',
      catalog: 'bg-cyan-100 text-cyan-800'
    };
    return colors[type as keyof typeof colors] || colors.standard;
  };

  const handleQuickAction = async (action: string, poId: string) => {
    try {
      switch (action) {
        case 'issue':
          issuePurchaseOrder(poId);
          toast({ title: 'Purchase order issued successfully' });
          break;
        case 'acknowledge':
          acknowledgePurchaseOrder(poId);
          toast({ title: 'Purchase order acknowledged' });
          break;
        case 'receive':
          receivePurchaseOrder(poId, {
            number: `REC-${Date.now()}`,
            purchaseOrderId: poId,
            receivedDate: new Date().toISOString(),
            receivedBy: 'USR-001',
            status: 'complete',
            lineItems: [],
            comments: [],
            attachments: []
          });
          toast({ title: 'Purchase order marked as received' });
          break;
      }
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to perform action', 
        variant: 'destructive' 
      });
    }
  };

  const columns = [
    {
      key: 'number' as keyof EnterprisePurchaseOrder,
      header: 'PO Number',
      render: (value: any) => (
        <div className="font-medium">{value}</div>
      )
    },
    {
      key: 'title' as keyof EnterprisePurchaseOrder,
      header: 'Title',
      render: (value: any) => (
        <div className="max-w-[300px] truncate" title={value}>
          {value}
        </div>
      )
    },
    {
      key: 'supplier' as keyof EnterprisePurchaseOrder,
      header: 'Supplier',
      render: (value: any, po: EnterprisePurchaseOrder) => po.supplier.displayName
    },
    {
      key: 'type' as keyof EnterprisePurchaseOrder,
      header: 'Type',
      render: (value: any) => (
        <Badge className={getTypeColor(value)}>
          {value.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'status' as keyof EnterprisePurchaseOrder,
      header: 'Status',
      render: (value: any) => getStatusBadge(value)
    },
    {
      key: 'totalAmount' as keyof EnterprisePurchaseOrder,
      header: 'Total Amount',
      render: (value: any) => (
        <div className="text-right font-medium">
          ${value.toLocaleString()}
        </div>
      )
    },
    {
      key: 'orderDate' as keyof EnterprisePurchaseOrder,
      header: 'Order Date',
      render: (value: any) => new Date(value).toLocaleDateString()
    },
    {
      key: 'requestedDeliveryDate' as keyof EnterprisePurchaseOrder,
      header: 'Delivery Date',
      render: (value: any) => new Date(value).toLocaleDateString()
    }
  ];

  // Filter data based on search term
  const filteredData = purchaseOrders.filter(po =>
    po.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.supplier.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Purchase Order
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Purchase Orders</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.total}</div>
              <p className="text-xs text-muted-foreground">
                {filteredData.length} purchase orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.pending}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Current period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                Unique suppliers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by PO number, title, or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  <SelectItem value="Dell Technologies">Dell Technologies</SelectItem>
                  <SelectItem value="Office Depot">Office Depot</SelectItem>
                  <SelectItem value="CDW Corporation">CDW Corporation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DataTable 
              data={filteredData}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};