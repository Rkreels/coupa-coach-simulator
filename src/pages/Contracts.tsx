
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
import { Search, Plus, MoreVertical, ChevronDown, Filter, Calendar, AlertCircle, FileText } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Contract {
  id: string;
  title: string;
  supplier: string;
  type: string;
  status: 'active' | 'pending' | 'expired' | 'draft';
  startDate: string;
  endDate: string;
  value: string;
  riskLevel: 'low' | 'medium' | 'high';
  completeness?: number;
}

const contractsData: Contract[] = [
  {
    id: '1',
    title: 'IT Support Services',
    supplier: 'Acme Corporation',
    type: 'Service',
    status: 'active',
    startDate: '2023-01-15',
    endDate: '2024-01-14',
    value: '$120,000',
    riskLevel: 'low'
  },
  {
    id: '2',
    title: 'Office Equipment Lease',
    supplier: 'Office Solutions',
    type: 'Lease',
    status: 'active',
    startDate: '2022-06-01',
    endDate: '2023-06-30',
    value: '$48,500',
    riskLevel: 'medium'
  },
  {
    id: '3',
    title: 'Digital Marketing Services',
    supplier: 'Digital Marketing Group',
    type: 'Service',
    status: 'pending',
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    value: '$75,000',
    riskLevel: 'low',
    completeness: 80
  },
  {
    id: '4',
    title: 'Software License Agreement',
    supplier: 'TechSupplies Inc.',
    type: 'License',
    status: 'expired',
    startDate: '2022-01-01',
    endDate: '2023-01-01',
    value: '$35,000',
    riskLevel: 'low'
  },
  {
    id: '5',
    title: 'Consulting Services',
    supplier: 'Global Services Ltd.',
    type: 'Service',
    status: 'active',
    startDate: '2023-03-15',
    endDate: '2023-12-15',
    value: '$95,200',
    riskLevel: 'medium'
  },
  {
    id: '6',
    title: 'Manufacturing Components',
    supplier: 'Industrial Supplies Co.',
    type: 'Purchase',
    status: 'draft',
    startDate: '',
    endDate: '',
    value: '$204,750',
    riskLevel: 'high',
    completeness: 45
  }
];

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredContracts = contractsData.filter(contract => {
    // Filter by search term
    const matchesSearch = 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by tab
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'active' && contract.status === 'active') ||
      (activeTab === 'pending' && contract.status === 'pending') ||
      (activeTab === 'expired' && contract.status === 'expired') ||
      (activeTab === 'draft' && contract.status === 'draft');

    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'expired':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Expired</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Draft</Badge>;
      default:
        return null;
    }
  };

  const getRiskBadge = (risk: Contract['riskLevel']) => {
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

  const getDaysRemaining = (endDate: string) => {
    if (!endDate) return 'N/A';
    
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    return `${diffDays} days`;
  };

  const getExpiryClass = (endDate: string) => {
    if (!endDate) return '';
    
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-red-600';
    if (diffDays <= 30) return 'text-amber-600';
    return 'text-green-600';
  };

  // Get contracts expiring soon for the alert card
  const contractsExpiringSoon = contractsData.filter(contract => {
    if (!contract.endDate) return false;
    
    const end = new Date(contract.endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 && diffDays <= 30;
  });

  return (
    <MainLayout pageTitle="Contract Management">
      <div className="space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Contracts</p>
                <p className="text-3xl font-bold">72</p>
                <p className="text-sm text-green-600">6 new this month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Annual Contract Value</p>
                <p className="text-3xl font-bold">$4.2M</p>
                <p className="text-sm text-green-600">+12% vs last year</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Contracts Expiring Soon</p>
                <p className="text-3xl font-bold">{contractsExpiringSoon.length}</p>
                <p className="text-sm text-amber-600">Within next 30 days</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Attention Needed</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    {contractsExpiringSoon.length} contracts require renewal action in the next 30 days
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 bg-white border-amber-200 text-amber-700 hover:bg-amber-100">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contracts Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Contracts</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search contracts..."
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
                    <Calendar className="h-4 w-4" />
                    Calendar View
                  </Button>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    New Contract
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Contracts</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title & Supplier</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Time Remaining</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Risk</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContracts.map((contract) => (
                        <TableRow key={contract.id}>
                          <TableCell>
                            <div className="font-medium">{contract.title}</div>
                            <div className="text-sm text-gray-500">{contract.supplier}</div>
                            {contract.completeness !== undefined && (
                              <div className="mt-1">
                                <div className="text-xs text-gray-500 mb-1">Completion: {contract.completeness}%</div>
                                <Progress value={contract.completeness} className="h-1" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{contract.type}</TableCell>
                          <TableCell>{getStatusBadge(contract.status)}</TableCell>
                          <TableCell>
                            {contract.startDate && (
                              <div>
                                <div className="text-xs text-gray-500">Start:</div>
                                <div>{new Date(contract.startDate).toLocaleDateString()}</div>
                              </div>
                            )}
                            {contract.endDate && (
                              <div className="mt-1">
                                <div className="text-xs text-gray-500">End:</div>
                                <div>{new Date(contract.endDate).toLocaleDateString()}</div>
                              </div>
                            )}
                            {!contract.startDate && !contract.endDate && 'Not set'}
                          </TableCell>
                          <TableCell>
                            <span className={getExpiryClass(contract.endDate)}>
                              {getDaysRemaining(contract.endDate)}
                            </span>
                          </TableCell>
                          <TableCell>{contract.value}</TableCell>
                          <TableCell>{getRiskBadge(contract.riskLevel)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Contract
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem>Renewal Options</DropdownMenuItem>
                                <DropdownMenuItem>Compliance Check</DropdownMenuItem>
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

export default Contracts;
