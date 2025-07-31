import React, { useState } from 'react';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEnterpriseRequisitions } from '../../hooks/useEnterpriseRequisitions';
import { useEnterprisePurchaseOrders } from '../../hooks/useEnterprisePurchaseOrders';
import { useEnterpriseInvoices } from '../../hooks/useEnterpriseInvoices';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

export const EnterpriseAnalyticsModule = () => {
  const { metrics: reqMetrics } = useEnterpriseRequisitions();
  const { metrics: poMetrics } = useEnterprisePurchaseOrders();
  const { metrics: invMetrics } = useEnterpriseInvoices();

  // Sample data for charts - in real app would come from analytics service
  const spendByCategory = [
    { name: 'IT Hardware', value: 45000, percentage: 35 },
    { name: 'Office Supplies', value: 25000, percentage: 19 },
    { name: 'Professional Services', value: 32000, percentage: 25 },
    { name: 'Facilities', value: 18000, percentage: 14 },
    { name: 'Travel', value: 9000, percentage: 7 }
  ];

  const monthlySpend = [
    { month: 'Jan', amount: 85000, target: 90000 },
    { month: 'Feb', amount: 92000, target: 90000 },
    { month: 'Mar', amount: 78000, target: 90000 },
    { month: 'Apr', amount: 95000, target: 90000 },
    { month: 'May', amount: 88000, target: 90000 },
    { month: 'Jun', amount: 102000, target: 90000 }
  ];

  const supplierPerformance = [
    { name: 'Dell Technologies', onTime: 96, quality: 94, cost: 92 },
    { name: 'Office Depot', onTime: 88, quality: 91, cost: 95 },
    { name: 'CDW Corporation', onTime: 93, quality: 89, cost: 87 },
    { name: 'Staples Business', onTime: 85, quality: 92, cost: 93 }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {change}
          </span>{' '}
          from last month
        </p>
      </CardContent>
    </Card>
  );

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Analytics</h1>
          <div className="flex gap-2">
            <Button variant="outline">Export Report</Button>
            <Button>Schedule Report</Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Spend (YTD)"
            value={`$${(reqMetrics.totalValue + poMetrics.totalValue + invMetrics.totalValue).toLocaleString()}`}
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Active Suppliers"
            value="157"
            change="+3.2%"
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Purchase Orders"
            value={poMetrics.total}
            change="+8.1%"
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Pending Approvals"
            value={reqMetrics.pending + poMetrics.pending}
            change="-15.3%"
            icon={Clock}
            trend="up"
          />
        </div>

        <Tabs defaultValue="spending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
            <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
            <TabsTrigger value="compliance">Compliance & Risk</TabsTrigger>
            <TabsTrigger value="procurement">Procurement Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="spending" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Spend by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={spendByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {spendByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spend vs Target</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlySpend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" name="Actual Spend" />
                      <Line type="monotone" dataKey="target" stroke="hsl(var(--destructive))" strokeDasharray="5 5" name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Performance Scorecard</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={supplierPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTime" fill="hsl(var(--primary))" name="On-Time Delivery %" />
                    <Bar dataKey="quality" fill="hsl(var(--secondary))" name="Quality Score %" />
                    <Bar dataKey="cost" fill="hsl(var(--accent))" name="Cost Performance %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">94%</div>
                    <p className="text-sm text-muted-foreground">Contracts in compliance</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supplier Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Low Risk</span>
                      <Badge variant="secondary">142</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Medium Risk</span>
                      <Badge variant="default">12</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">High Risk</span>
                      <Badge variant="destructive">3</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Violations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">7</div>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="procurement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Avg. Approval Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3 days</div>
                  <p className="text-xs text-green-600">-0.5 days from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requisition Cycle Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5.7 days</div>
                  <p className="text-xs text-green-600">-1.2 days from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>PO Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">97.2%</div>
                  <p className="text-xs text-green-600">+2.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$47K</div>
                  <p className="text-xs text-green-600">+$12K from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ApplicationLayout>
  );
};