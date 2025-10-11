
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { useEnterpriseInvoices } from '../../hooks/useEnterpriseInvoices';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const PendingInvoicesPage = () => {
  const { toast } = useToast();
  const { allInvoices: invoices, approveInvoice, rejectInvoice } = useEnterpriseInvoices();
  const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending');

  const handleApprove = (invoice: any) => {
    approveInvoice(invoice.id, 'Current User');
    toast({
      title: 'Invoice Approved',
      description: `Invoice ${invoice.invoiceNumber} has been approved.`
    });
  };

  const handleReject = (invoice: any) => {
    rejectInvoice(invoice.id, 'Rejected by approver');
    toast({
      title: 'Invoice Rejected',
      description: `Invoice ${invoice.invoiceNumber} has been rejected.`,
      variant: 'destructive'
    });
  };

  const [searchTerm, setSearchTerm] = useState('');

  const columns: any[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'invoiceDate', header: 'Invoice Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Pending Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Invoices Pending Approval</h2>
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-4 w-4 mr-1" />
            {pendingInvoices.length} Pending
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={pendingInvoices}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleApprove(item)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleReject(item)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default PendingInvoicesPage;
