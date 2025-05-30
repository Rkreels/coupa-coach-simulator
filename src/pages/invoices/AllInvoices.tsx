
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { useInvoices } from '../../hooks/useInvoices';
import { FileText, Clock, CheckCircle, DollarSign } from 'lucide-react';

const AllInvoicesPage = () => {
  const { invoices, getMetrics } = useInvoices();
  const metrics = getMetrics();

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      paid: 'bg-emerald-100 text-emerald-800',
      dispute: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    { key: 'invoiceNumber' as const, header: 'Invoice #', sortable: true },
    { key: 'vendor' as const, header: 'Vendor', sortable: true },
    { 
      key: 'status' as const, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value)
    },
    { 
      key: 'amount' as const, 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'invoiceDate' as const, header: 'Invoice Date', sortable: true },
    { key: 'dueDate' as const, header: 'Due Date', sortable: true },
    { key: 'department' as const, header: 'Department', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="All Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Invoices</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{metrics.totalInvoices}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold">{metrics.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Paid</p>
                  <p className="text-2xl font-bold">{metrics.paid}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold">${metrics.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={invoices}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default AllInvoicesPage;
