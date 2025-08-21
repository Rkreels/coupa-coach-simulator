import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { useEnterpriseOrders } from '../../hooks/useEnterpriseOrders';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, CheckCircle, X, Clock, AlertCircle, Edit } from 'lucide-react';

const PendingOrdersPage = () => {
  const { 
    orders, 
    metrics,
    searchTerm,
    setSearchTerm,
    approveOrder,
    rejectOrder
  } = useEnterpriseOrders();
  const { toast } = useToast();

  const pendingOrders = orders.filter(order => order.status === 'pending_approval');

  const handleApprove = (order: any) => {
    approveOrder(order.id, 'USR-001', 'Approved via bulk action');
    toast({
      title: 'Order Approved',
      description: `Order ${order.number} has been approved successfully.`
    });
  };

  const handleReject = (order: any) => {
    rejectOrder(order.id, 'USR-001', 'Does not meet approval criteria');
    toast({
      title: 'Order Rejected',
      description: `Order ${order.number} has been rejected.`,
      variant: 'destructive'
    });
  };

  const columns = [
    { 
      key: 'number' as const, 
      header: 'Order Number', 
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-yellow-500" />
          <span className="font-mono text-sm">{value}</span>
        </div>
      )
    },
    { key: 'title' as const, header: 'Title', sortable: true },
    { 
      key: 'supplier' as const, 
      header: 'Supplier', 
      render: (value: any, order: any) => order.supplier.displayName 
    },
    { 
      key: 'totalAmount' as const, 
      header: 'Amount',
      render: (value: number, order: any) => `${order.currency} ${value.toLocaleString()}`
    },
    { key: 'orderDate' as const, header: 'Order Date', sortable: true, render: (value: string) => new Date(value).toLocaleDateString() }
  ];

  return (
    <ApplicationLayout pageTitle="Pending Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Pending Orders</h2>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {pendingOrders.length} Awaiting Approval
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Orders Awaiting Approval</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={pendingOrders}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(order) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" title="View Details">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleApprove(order)}
                    className="text-green-600 hover:text-green-700"
                    title="Approve"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleReject(order)}
                    className="text-red-600 hover:text-red-700"
                    title="Reject"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default PendingOrdersPage;