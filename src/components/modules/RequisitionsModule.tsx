
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { useEnterpriseRequisitions } from '../../hooks/useEnterpriseRequisitions';
import { Plus, Search, Eye, Edit, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const RequisitionsModule = () => {
  const {
    requisitions,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    metrics
  } = useEnterpriseRequisitions();

  const getStatusBadge = (status: string) => {
    if (!status) return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    { 
      key: 'id' as const, 
      header: 'Req ID', 
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="font-mono text-sm">{value}</span>
        </div>
      )
    },
    { key: 'title' as const, header: 'Title', sortable: true },
    { key: 'requestor' as const, header: 'Requestor', sortable: true },
    { key: 'department' as const, header: 'Department', sortable: true },
    { 
      key: 'status' as const, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value)
    },
    { 
      key: 'priority' as const, 
      header: 'Priority',
      render: (value: string) => {
        if (!value) return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
        
        return (
          <Badge className={
            value === 'urgent' ? 'bg-red-100 text-red-800' :
            value === 'high' ? 'bg-orange-100 text-orange-800' :
            value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    { 
      key: 'totalAmount' as const, 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'neededByDate' as const, header: 'Needed By', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Requisitions">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Requisition Management</h2>
          <div className="flex gap-2">
            <Link to="/requisitions/templates">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </Button>
            </Link>
            <Link to="/requisitions/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Requisition
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/requisitions/my">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">My Requisitions</p>
                    <p className="text-lg font-semibold">View & Manage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/requisitions/pending">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-500">Pending Approval</p>
                    <p className="text-lg font-semibold">{metrics.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/requisitions/approved">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="text-lg font-semibold">{metrics.approved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/requisitions/shopping">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Shopping Catalog</p>
                    <p className="text-lg font-semibold">Browse Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search requisitions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Requisitions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Requisitions</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={requisitions.slice(0, 10)}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {(item.status === 'draft' || item.status === 'rejected') && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};
