
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Eye, Edit, Trash2, Building, Star, TrendingUp, Users } from 'lucide-react';

const SuppliersModule = () => {
  const { toast } = useToast();
  const {
    suppliers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    deleteSupplier,
    getMetrics,
    getCategories
  } = useSuppliers();

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const metrics = getMetrics();
  const categories = getCategories();

  const handleDelete = (supplier) => {
    deleteSupplier(supplier.id);
    toast({
      title: 'Supplier Deleted',
      description: `Supplier "${supplier.name}" has been deleted.`,
      variant: 'destructive'
    });
  };

  const openDetails = (supplier) => {
    setSelectedSupplier(supplier);
    setDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    { 
      key: 'name',
      header: 'Supplier Name', 
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-blue-500" />
          <div>
            <span className="font-medium">{value}</span>
            <p className="text-sm text-gray-500">{item.code}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => getStatusBadge(value)
    },
    { 
      key: 'category', 
      header: 'Category',
      render: (value) => (
        <Badge className="bg-purple-100 text-purple-800">
          {value}
        </Badge>
      )
    },
    { key: 'contactPerson', header: 'Contact Person', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { 
      key: 'performance', 
      header: 'Rating',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{value.rating.toFixed(1)}</span>
        </div>
      )
    },
    { 
      key: 'performance', 
      header: 'Total Spend',
      render: (value, item) => `${item.currency} ${value.totalSpend.toLocaleString()}`
    }
  ];

  return (
    <Routes>
      <Route path="/" element={
        <ApplicationLayout pageTitle="Suppliers">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Supplier Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Suppliers</p>
                      <p className="text-2xl font-bold">{metrics.totalSuppliers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Active Suppliers</p>
                      <p className="text-2xl font-bold">{metrics.activeSuppliers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Avg Rating</p>
                      <p className="text-2xl font-bold">{metrics.avgRating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Spend</p>
                      <p className="text-2xl font-bold">${metrics.totalSpend.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search suppliers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Suppliers Table */}
            <Card>
              <CardContent className="p-0">
                <DataTable
                  data={suppliers}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit functionality would go here
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
                          handleDelete(item);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
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
                <DialogTitle>Supplier Details</DialogTitle>
              </DialogHeader>
              {selectedSupplier && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Company Name</label>
                          <p className="text-lg font-semibold">{selectedSupplier.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Status</label>
                          <div className="mt-1">{getStatusBadge(selectedSupplier.status)}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Category</label>
                          <p>{selectedSupplier.category}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Contact Person</label>
                          <p>{selectedSupplier.contactPerson}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p>{selectedSupplier.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p>{selectedSupplier.phone}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Rating</label>
                            <p className="text-lg font-semibold">{selectedSupplier.performance.rating}/5</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">On-Time Delivery</label>
                            <p className="text-lg font-semibold">{selectedSupplier.performance.onTimeDelivery}%</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Quality Score</label>
                            <p className="text-lg font-semibold">{selectedSupplier.performance.qualityScore}%</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Total Orders</label>
                            <p className="text-lg font-semibold">{selectedSupplier.performance.totalOrders}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Total Spend</label>
                          <p className="text-lg font-semibold">{selectedSupplier.currency} {selectedSupplier.performance.totalSpend.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedSupplier.contracts && selectedSupplier.contracts.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Active Contracts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedSupplier.contracts.map((contract, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded">
                              <div>
                                <p className="font-medium">{contract.name}</p>
                                <p className="text-sm text-gray-500">{contract.type}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{selectedSupplier.currency} {contract.value.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">{contract.startDate} - {contract.endDate}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </ApplicationLayout>
      } />
      <Route path="/performance" element={
        <ApplicationLayout pageTitle="Supplier Performance">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Supplier Performance Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {suppliers.slice(0, 6).map(supplier => (
                <Card key={supplier.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {supplier.name}
                      {getStatusBadge(supplier.status)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-yellow-600">{supplier.performance.rating}</p>
                        <p className="text-sm text-gray-500">Rating</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{supplier.performance.onTimeDelivery}%</p>
                        <p className="text-sm text-gray-500">On Time</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{supplier.performance.qualityScore}%</p>
                        <p className="text-sm text-gray-500">Quality</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ApplicationLayout>
      } />
      <Route path="/contracts" element={
        <ApplicationLayout pageTitle="Supplier Contracts">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Active Contracts</h2>
            <div className="space-y-4">
              {suppliers.flatMap(supplier => 
                supplier.contracts.map(contract => (
                  <Card key={`${supplier.id}-${contract.id}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{contract.name}</h3>
                          <p className="text-gray-600">{supplier.name}</p>
                          <Badge className="mt-2">{contract.type}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">{supplier.currency} {contract.value.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{contract.startDate} - {contract.endDate}</p>
                          {getStatusBadge(contract.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </ApplicationLayout>
      } />
    </Routes>
  );
};

export { SuppliersModule };
