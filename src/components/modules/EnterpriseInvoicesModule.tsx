import React, { useState } from 'react';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEnterpriseInvoices } from '../../hooks/useEnterpriseInvoices';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  CreditCard,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

export const EnterpriseInvoicesModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    invoices,
    statusFilter,
    setStatusFilter,
    supplierFilter,
    setSupplierFilter,
    metrics,
    approveInvoice,
    rejectInvoice,
    payInvoice,
    disputeInvoice
  } = useEnterpriseInvoices();

  const getStatusBadge = (status: string) => {
    const statusMap = {
      received: { color: 'bg-blue-100 text-blue-800', icon: FileText },
      pending_approval: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      disputed: { color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      paid: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      partially_paid: { color: 'bg-orange-100 text-orange-800', icon: CreditCard },
      voided: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
      on_hold: { color: 'bg-purple-100 text-purple-800', icon: Clock },
      pending_payment: { color: 'bg-cyan-100 text-cyan-800', icon: CreditCard },
      overdue: { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.received;
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getTypeColor = (type: string) => {
    const colors = {
      standard: 'bg-blue-100 text-blue-800',
      credit_memo: 'bg-green-100 text-green-800',
      debit_memo: 'bg-orange-100 text-orange-800',
      prepayment: 'bg-purple-100 text-purple-800',
      recurring: 'bg-cyan-100 text-cyan-800'
    };
    return colors[type as keyof typeof colors] || colors.standard;
  };

  const getMatchingStatusBadge = (status: string) => {
    const colors = {
      matched: 'bg-green-100 text-green-800',
      exception: 'bg-yellow-100 text-yellow-800',
      unmatched: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.unmatched;
  };

  const handleQuickAction = async (action: string, invoiceId: string) => {
    try {
      switch (action) {
        case 'approve':
          approveInvoice(invoiceId, 'USR-001', 'Approved via quick action');
          toast({ title: 'Invoice approved successfully' });
          break;
        case 'reject':
          rejectInvoice(invoiceId, 'USR-001', 'Rejected via quick action');
          toast({ title: 'Invoice rejected' });
          break;
        case 'pay':
          payInvoice(invoiceId, 'ACH');
          toast({ title: 'Invoice marked as paid' });
          break;
        case 'dispute':
          disputeInvoice(invoiceId, {
            type: 'pricing',
            amount: 0,
            description: 'Disputed via quick action',
            createdBy: 'USR-001',
            status: 'open'
          });
          toast({ title: 'Invoice disputed' });
          break;
      }
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to perform action', 
        variant: 'destructive' 
      });
    }
  };

  const columns = [
    {
      accessorKey: 'number',
      header: 'Invoice Number',
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue('number')}</div>
      )
    },
    {
      accessorKey: 'supplierInvoiceNumber',
      header: 'Supplier Invoice #',
      cell: ({ row }: any) => (
        <div className="text-sm text-muted-foreground">{row.getValue('supplierInvoiceNumber')}</div>
      )
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }: any) => row.original.supplier.displayName
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }: any) => (
        <Badge className={getTypeColor(row.getValue('type'))}>
          {row.getValue('type').replace('_', ' ').toUpperCase()}
        </Badge>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => getStatusBadge(row.getValue('status'))
    },
    {
      accessorKey: 'matchingStatus',
      header: 'Matching',
      cell: ({ row }: any) => (
        <Badge className={getMatchingStatusBadge(row.getValue('matchingStatus'))}>
          {row.getValue('matchingStatus').toUpperCase()}
        </Badge>
      )
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total Amount',
      cell: ({ row }: any) => (
        <div className="text-right font-medium">
          ${row.getValue('totalAmount').toLocaleString()}
        </div>
      )
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: ({ row }: any) => {
        const dueDate = new Date(row.getValue('dueDate'));
        const isOverdue = dueDate < new Date() && row.original.status !== 'paid';
        return (
          <div className={isOverdue ? 'text-red-600 font-medium' : ''}>
            {dueDate.toLocaleDateString()}
          </div>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const invoice = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            {invoice.status === 'pending_approval' && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleQuickAction('approve', invoice.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleQuickAction('reject', invoice.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <AlertCircle className="h-4 w-4" />
                </Button>
              </>
            )}
            {invoice.status === 'approved' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleQuickAction('pay', invoice.id)}
                className="text-blue-600 hover:text-blue-700"
              >
                <CreditCard className="h-4 w-4" />
              </Button>
            )}
            {['received', 'pending_approval', 'approved'].includes(invoice.status) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleQuickAction('dispute', invoice.id)}
                className="text-yellow-600 hover:text-yellow-700"
              >
                <AlertTriangle className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      }
    }
  ];

  // Filter data based on search term
  const filteredData = invoices.filter(invoice =>
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.supplierInvoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.supplier.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.total}</div>
              <p className="text-xs text-muted-foreground">
                {filteredData.length} invoices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.pendingApproval}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Current period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{metrics.overdue}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by invoice number, supplier, or PO..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  <SelectItem value="Dell Technologies">Dell Technologies</SelectItem>
                  <SelectItem value="Office Depot">Office Depot</SelectItem>
                  <SelectItem value="CDW Corporation">CDW Corporation</SelectItem>
                  <SelectItem value="Staples Business">Staples Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DataTable 
              data={filteredData}
              columns={columns.map(col => ({ ...col, key: col.accessorKey || col.id }))}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};