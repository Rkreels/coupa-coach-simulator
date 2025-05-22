
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Clock, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle, FileText, ShoppingBag, CreditCard, Users, Package, Truck, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardSummaryCard } from "@/components/dashboard/DashboardSummaryCard";
import { DashboardTasksList } from "@/components/dashboard/DashboardTasksList";
import { SpendChart } from "@/components/dashboard/SpendChart";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";
import { ApprovalQueueWidget } from "@/components/dashboard/ApprovalQueueWidget";
import { DashboardAlerts } from "@/components/dashboard/DashboardAlerts";

const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">
            Customize Dashboard
          </Button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardSummaryCard 
          title="Monthly Spend" 
          value="$1,245,230" 
          change={12.5} 
          trend="up" 
          icon={<CreditCard className="h-5 w-5" />}
          description="vs. previous month"
        />

        <DashboardSummaryCard 
          title="Open POs" 
          value="124" 
          change={-3.2} 
          trend="down" 
          icon={<Package className="h-5 w-5" />}
          description="vs. previous month"
        />

        <DashboardSummaryCard 
          title="Pending Approvals" 
          value="18" 
          change={7.8} 
          trend="up" 
          icon={<FileText className="h-5 w-5" />}
          description="requiring action"
        />

        <DashboardSummaryCard 
          title="Active Suppliers" 
          value="289" 
          change={1.5} 
          trend="up" 
          icon={<Users className="h-5 w-5" />}
          description="currently active"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spend Analysis Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Spend Analysis</CardTitle>
              <Tabs defaultValue="monthly" className="w-[200px]">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <SpendChart />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <Link to="/activity" className="text-sm text-blue-600 hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent>
              <RecentActivityFeed limit={5} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Approval Queue */}
          <ApprovalQueueWidget />
          
          {/* Tasks & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks & To-Dos</CardTitle>
              <CardDescription>Your pending tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardTasksList />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Tasks</Button>
            </CardFooter>
          </Card>
          
          {/* Alerts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Alerts</CardTitle>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">3 New</Badge>
            </CardHeader>
            <CardContent>
              <DashboardAlerts />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
