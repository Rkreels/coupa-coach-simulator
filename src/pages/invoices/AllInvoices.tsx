
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useInvoices } from '../../hooks/useInvoices';
import { Plus, Search, Eye, Edit, Trash2, CheckCircle, XCircle, DollarSign, Clock, FileText, AlertTriangle } from 'lucide-react';

const AllInvoicesPage = () => {
  const { toast } = useToast();
  const {
    invoices,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    deleteInvoice,
    approveInvoice,
    rejectInvoice,
    payInvoice,
    getMetrics
  } = useInvoices();

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const metrics = getMetrics();

  const handleApprove = (invoice) => {
    approveInvoice(invoice.id, 'Current User');
    toast({
      title: 'Invoice Approved',
      description: `Invoice ${invoice.invoiceNumber} has been approved.`
    });
  };

  const handleReject = (invoice) => {
    rejectInvoice(invoice.id, 'Rejected by user');
    toast({
      title: 'Invoice Rejected',
      description: `Invoice ${invoice.invoiceNumber} has been rejected.`,
      variant: 'destructive'
    });
  };

  const handlePay = (invoice) => {
    payInvoice(invoice.id, 'Bank Transfer');
    toast({
      title: 'Invoice Paid',
      description: `Invoice ${invoice.invoiceNumber} has been marked as paid.`
    });
  };

  const handleDelete = (invoice) => {
    deleteInvoice(invoice.id);
    toast({
      title: 'Invoice Deleted',
      description: `Invoice ${invoice.invoiceNumber} has been deleted.`,
      variant: 'destructive'
    });
  };

  const openDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setDetailsOpen(true);
  };

  const columns = [
    { 
      key: 'invoiceNumber',
      header: 'Invoice #', 
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="font-mono text-sm">{value}</span>
        </div>
      )
    },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge className={
          value === 'approved' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'processing' ? 'bg-blue-100 text-blue-800' :
          value === 'paid' ? 'bg-emerald-100 text-emerald-800' :
          value === 'disputed' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (value) => (
        <Badge className={
          value === 'urgent' ? 'bg-red-100 text-red-800' :
          value === 'high' ? 'bg-orange-100 text-orange-800' :
          value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      render: (value, item) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'invoiceDate', header: 'Invoice Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="All Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Invoice Management</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Invoices</p>
                  <p className="text-2xl font-bold">{metrics.totalInvoices}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Pending Approval</p>
                  <p className="text-2xl font-bold">{metrics.pendingApproval}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Disputed</p>
                  <p className="text-2xl font-bold">{metrics.disputed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardContent className="p-0">
            <DataTable
              data={invoices}
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
                  {item.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(item);
                        }}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(item);
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {item.status === 'approved' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePay(item);
                      }}
                    >
                      <DollarSign className="h-4 w-4" />
                    </Button>
                  )}
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
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Invoice Number</label>
                  <p className="text-lg font-semibold">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Vendor</label>
                  <p className="text-lg">{selectedInvoice.vendorName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <Badge className="mt-1">{selectedInvoice.status}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Amount</label>
                  <p className="text-lg font-semibold">{selectedInvoice.currency} {selectedInvoice.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ApplicationLayout>
  );
};

export default AllInvoicesPage;
