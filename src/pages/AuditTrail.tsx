import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useAuditTrail } from '../hooks/useAuditTrail';
import { 
  Shield, Download, RefreshCw, Filter, Search, 
  Activity, AlertTriangle, CheckCircle, XCircle, 
  Clock, User, Database, FileText 
} from 'lucide-react';

const AuditTrailPage = () => {
  const { 
    auditLog, 
    filters, 
    setFilters, 
    getAuditSummary, 
    exportAuditLog, 
    clearFilters 
  } = useAuditTrail();
  
  const [searchTerm, setSearchTerm] = useState('');
  const summary = getAuditSummary();

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return (
      <Badge className={variants[severity as keyof typeof variants] || variants.medium}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failure':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const columns = [
    {
      key: 'timestamp' as const,
      header: 'Timestamp',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString()
    },
    {
      key: 'userName' as const,
      header: 'User',
      sortable: true,
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-gray-500">{item.userId}</div>
          </div>
        </div>
      )
    },
    {
      key: 'action' as const,
      header: 'Action',
      sortable: true,
      render: (value: string) => (
        <Badge variant="outline" className="font-mono">
          {value}
        </Badge>
      )
    },
    {
      key: 'entityType' as const,
      header: 'Entity',
      sortable: true,
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-500">{item.entityId}</div>
        </div>
      )
    },
    {
      key: 'module' as const,
      header: 'Module',
      sortable: true
    },
    {
      key: 'severity' as const,
      header: 'Severity',
      sortable: true,
      render: (value: string) => getSeverityBadge(value)
    },
    {
      key: 'result' as const,
      header: 'Result',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          {getResultIcon(value)}
          <span className="capitalize">{value}</span>
        </div>
      )
    },
    {
      key: 'ipAddress' as const,
      header: 'IP Address',
      sortable: false,
      render: (value: string) => (
        <span className="font-mono text-xs">{value}</span>
      )
    }
  ];

  const filteredAuditLog = auditLog.filter(entry => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        entry.userName.toLowerCase().includes(searchLower) ||
        entry.action.toLowerCase().includes(searchLower) ||
        entry.entityType.toLowerCase().includes(searchLower) ||
        entry.entityId.toLowerCase().includes(searchLower) ||
        entry.module.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <ApplicationLayout pageTitle="Audit Trail">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">System Audit Trail</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={() => exportAuditLog('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportAuditLog('json')}>
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Events</p>
                  <p className="text-2xl font-bold">{summary.total}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Today's Events</p>
                  <p className="text-2xl font-bold">{summary.todayCount}</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Most Active Module</p>
                  <p className="text-lg font-bold">{summary.mostActiveModule}</p>
                </div>
                <Database className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Critical Events</p>
                  <p className="text-2xl font-bold">{summary.bySeverity.critical || 0}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select 
                value={filters.entityType || 'all'} 
                onValueChange={(value) => setFilters({ ...filters, entityType: value === 'all' ? undefined : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Entity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="Invoice">Invoice</SelectItem>
                  <SelectItem value="PurchaseOrder">Purchase Order</SelectItem>
                  <SelectItem value="Supplier">Supplier</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.action || 'all'} 
                onValueChange={(value) => setFilters({ ...filters, action: value === 'all' ? undefined : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="CREATE">Create</SelectItem>
                  <SelectItem value="UPDATE">Update</SelectItem>
                  <SelectItem value="DELETE">Delete</SelectItem>
                  <SelectItem value="APPROVE">Approve</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.severity || 'all'} 
                onValueChange={(value) => setFilters({ ...filters, severity: value === 'all' ? undefined : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                placeholder="From Date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />

              <div className="flex gap-2">
                <Input
                  type="date"
                  placeholder="To Date"
                  value={filters.dateTo || ''}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="flex-1"
                />
                <Button variant="outline" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Log Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Audit Events
              </div>
              <Badge variant="outline">
                {filteredAuditLog.length} of {auditLog.length} events
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredAuditLog}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // In real app, would show detailed event modal
                    console.log('View audit event details:', item);
                  }}
                >
                  View Details
                </Button>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default AuditTrailPage;