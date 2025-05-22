
import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { DashboardSummaryCard } from '../components/dashboard/DashboardSummaryCard';
import { DashboardTasksList } from '../components/dashboard/DashboardTasksList';
import { DashboardAlerts } from '../components/dashboard/DashboardAlerts';
import { SpendChart } from '../components/dashboard/SpendChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { ApprovalQueueWidget } from '../components/dashboard/ApprovalQueueWidget';
import { CreditCard, FileText, PackageCheck, TrendingUp, BarChart3, Calendar, Users, Clock } from 'lucide-react';

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <MainLayout pageTitle="Dashboard">
      <div className="flex flex-col gap-6">
        {/* Summary Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardSummaryCard
            title="Total Spend YTD"
            value="$3.4M"
            change={12}
            trend="up"
            description="vs. Last Year"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardSummaryCard
            title="Open Purchase Orders"
            value="143"
            change={-4}
            trend="down"
            description="vs. Last Month"
            icon={<PackageCheck className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardSummaryCard
            title="Invoices Due This Week"
            value="27"
            change={8}
            trend="up"
            description="vs. Last Week"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardSummaryCard
            title="Savings YTD"
            value="$760K"
            change={15}
            trend="up"
            description="vs. Target"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 Days
                </Button>
              </div>
              
              <TabsContent value="overview" className="space-y-6 pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Spend Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SpendChart />
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base font-medium">Top Suppliers</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'Acme Corp', spend: '$452,300', change: 12 },
                          { name: 'TechSupplies Inc', spend: '$310,750', change: -3 },
                          { name: 'Global Services', spend: '$275,400', change: 8 },
                          { name: 'Office Solutions', spend: '$198,625', change: 0 },
                        ].map((supplier, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center">
                                <Users className="h-4 w-4 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">{supplier.name}</p>
                                <p className="text-xs text-gray-500">YTD Spend: {supplier.spend}</p>
                              </div>
                            </div>
                            <div className={`text-sm ${
                              supplier.change > 0 ? 'text-green-600' : 
                              supplier.change < 0 ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              {supplier.change > 0 && '+'}
                              {supplier.change}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base font-medium">Top Spend Categories</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'IT Services', spend: '$685,200', change: 7 },
                          { name: 'Office Supplies', spend: '$425,100', change: -2 },
                          { name: 'Marketing', spend: '$362,800', change: 15 },
                          { name: 'Facilities', spend: '$298,550', change: 3 },
                        ].map((category, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center">
                                <BarChart3 className="h-4 w-4 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">{category.name}</p>
                                <p className="text-xs text-gray-500">YTD Spend: {category.spend}</p>
                              </div>
                            </div>
                            <div className={`text-sm ${
                              category.change > 0 ? 'text-green-600' : 
                              category.change < 0 ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              {category.change > 0 && '+'}
                              {category.change}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics">
                <div className="h-[300px] flex items-center justify-center bg-gray-50 border rounded-md">
                  <div className="text-center">
                    <BarChart className="mx-auto h-10 w-10 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">Advanced Analytics</h3>
                    <p className="mt-1 text-sm text-gray-500">Configure your analytics and KPIs</p>
                    <Button className="mt-4">Configure Analytics</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardContent className="p-0">
                    <RecentActivityFeed />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">My Tasks</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <DashboardTasksList />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Approvals</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ApprovalQueueWidget />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Alerts</CardTitle>
                  <Button variant="ghost" size="sm">Settings</Button>
                </div>
              </CardHeader>
              <CardContent>
                <DashboardAlerts />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Upcoming Events</CardTitle>
                  <Button variant="ghost" size="sm">View Calendar</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Budget Review Meeting', date: 'Today', time: '2:00 PM' },
                    { title: 'Supplier Quarterly Review', date: 'Tomorrow', time: '11:00 AM' },
                    { title: 'Contract Renewal Discussion', date: 'May 24', time: '10:30 AM' },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-blue-50 rounded-full h-8 w-8 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
