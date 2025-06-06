
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { useInvoices } from '../../hooks/useInvoices';
import { DollarSign, Eye, Download, CheckCircle } from 'lucide-react';

const ApprovedInvoicesPage = () => {
  const { toast } = useToast();
  const { invoices, payInvoice } = useInvoices();
  const approvedInvoices = invoices.filter(invoice => invoice.status === 'approved');

  const handlePay = (invoice) => {
    payInvoice(invoice.id, 'Bank Transfer');
    toast({
      title: 'Invoice Paid',
      description: `Invoice ${invoice.invoiceNumber} has been marked as paid.`
    });
  };

  const columns = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      render: (value, item) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'approvedDate', header: 'Approved Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'approver', header: 'Approved By', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Approved Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Approved Invoices</h2>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            {approvedInvoices.length} Approved
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ready for Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={approvedInvoices}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-600"
                    onClick={() => handlePay(item)}
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Pay
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
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

export default ApprovedInvoicesPage;
