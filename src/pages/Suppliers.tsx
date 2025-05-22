
import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreVertical, ChevronDown, Filter, Download, Upload } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  riskLevel: 'low' | 'medium' | 'high';
  spend: string;
  performance: number;
  lastUpdated: string;
}

const suppliersData: Supplier[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    category: 'IT Services',
    status: 'active',
    riskLevel: 'low',
    spend: '$452,300',
    performance: 92,
    lastUpdated: '2023-05-15'
  },
  {
    id: '2',
    name: 'TechSupplies Inc.',
    category: 'Hardware',
    status: 'active',
    riskLevel: 'medium',
    spend: '$310,750',
    performance: 78,
    lastUpdated: '2023-05-10'
  },
  {
    id: '3',
    name: 'Global Services Ltd.',
    category: 'Consulting',
    status: 'active',
    riskLevel: 'low',
    spend: '$275,400',
    performance: 95,
    lastUpdated: '2023-05-12'
  },
  {
    id: '4',
    name: 'Office Solutions',
    category: 'Office Supplies',
    status: 'active',
    riskLevel: 'low',
    spend: '$198,625',
    performance: 88,
    lastUpdated: '2023-05-08'
  },
  {
    id: '5',
    name: 'Digital Marketing Group',
    category: 'Marketing',
    status: 'pending',
    riskLevel: 'medium',
    spend: '$145,800',
    performance: 0,
    lastUpdated: '2023-05-18'
  },
  {
    id: '6',
    name: 'Industrial Supplies Co.',
    category: 'Manufacturing',
    status: 'inactive',
    riskLevel: 'high',
    spend: '$98,250',
    performance: 62,
    lastUpdated: '2023-04-25'
  }
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredSuppliers = suppliersData.filter(supplier => {
    // Filter by search term
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by tab
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'active' && supplier.status === 'active') ||
      (activeTab === 'pending' && supplier.status === 'pending') ||
      (activeTab === 'inactive' && supplier.status === 'inactive');

    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: Supplier['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  const getRiskBadge = (risk: Supplier['riskLevel']) => {
    switch (risk) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      default:
        return null;
    }
  };

  const getPerformanceDisplay = (performance: number) => {
    if (performance === 0) return <span className="text-gray-400">N/A</span>;
    
    let colorClass = "text-yellow-600";
    if (performance >= 90) colorClass = "text-green-600";
    else if (performance < 70) colorClass = "text-red-600";
    
    return <span className={colorClass}>{performance}%</span>;
  };

  return (
    <MainLayout pageTitle="Supplier Management">
      <div className="space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Suppliers</p>
                <p className="text-3xl font-bold">324</p>
                <p className="text-sm text-green-600">+12 this month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Average Supplier Performance</p>
                <p className="text-3xl font-bold">86%</p>
                <p className="text-sm text-green-600">+2.4% vs last quarter</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Suppliers Requiring Attention</p>
                <p className="text-3xl font-bold">18</p>
                <p className="text-sm text-red-600">5 high risk suppliers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suppliers Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Suppliers</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search suppliers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="h-10 gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Upload className="h-4 w-4" />
                    Import
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Supplier
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Suppliers</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Annual Spend</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell>
                            <div className="font-medium">{supplier.name}</div>
                          </TableCell>
                          <TableCell>{supplier.category}</TableCell>
                          <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                          <TableCell>{getRiskBadge(supplier.riskLevel)}</TableCell>
                          <TableCell>{supplier.spend}</TableCell>
                          <TableCell>{getPerformanceDisplay(supplier.performance)}</TableCell>
                          <TableCell>{new Date(supplier.lastUpdated).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                                <DropdownMenuItem>Risk Assessment</DropdownMenuItem>
                                <DropdownMenuItem>Performance History</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Suppliers;
