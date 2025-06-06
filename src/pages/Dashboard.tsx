
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { usePurchaseOrders } from '../hooks/usePurchaseOrders';
import { useInvoices } from '../hooks/useInvoices';
import { useSuppliers } from '../hooks/useSuppliers';
import { 
  ShoppingCart, 
  FileText, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { metrics: poMetrics } = usePurchaseOrders();
  const { getMetrics: getInvoiceMetrics } = useInvoices();
  const { getMetrics: getSupplierMetrics } = useSuppliers();
  
  const invoiceMetrics = getInvoiceMetrics();
  const supplierMetrics = getSupplierMetrics();

  const quickActions = [
    { label: 'Create Requisition', path: '/requisitions/create', icon: FileText },
    { label: 'Create Order', path: '/orders/create', icon: ShoppingCart },
    { label: 'Add Supplier', path: '/suppliers', icon: Users },
    { label: 'View Invoices', path: '/invoices', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Procurement Dashboard</h1>
        <Badge variant="outline" className="text-sm">
          Real-time Data
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poMetrics.total}</div>
            <p className="text-xs text-muted-foreground">
              ${poMetrics.totalValue.toLocaleString()} total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{poMetrics.pending}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{supplierMetrics.activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              {supplierMetrics.avgRating}/5 avg rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoiceMetrics.totalInvoices}</div>
            <p className="text-xs text-muted-foreground">
              {invoiceMetrics.pendingApproval} pending approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate(action.path)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {poMetrics.pending > 0 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm">{poMetrics.pending} orders pending approval</span>
                  <Button size="sm" variant="outline" onClick={() => navigate('/orders/pending')}>
                    Review
                  </Button>
                </div>
              )}
              {invoiceMetrics.disputed > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm">{invoiceMetrics.disputed} invoices disputed</span>
                  <Button size="sm" variant="outline" onClick={() => navigate('/invoices/disputes')}>
                    Resolve
                  </Button>
                </div>
              )}
              {supplierMetrics.pendingSuppliers > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">{supplierMetrics.pendingSuppliers} suppliers pending approval</span>
                  <Button size="sm" variant="outline" onClick={() => navigate('/suppliers')}>
                    Review
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">On-time Delivery</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {supplierMetrics.avgOnTimeDelivery}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Processing Time</span>
                <Badge variant="outline">
                  {invoiceMetrics.avgProcessingTime}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Spend</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  ${supplierMetrics.totalSpend.toLocaleString()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
