
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useInvoices } from '../../hooks/useInvoices';
import { Eye, Download, CheckCircle2 } from 'lucide-react';

const PaidInvoicesPage = () => {
  const { invoices } = useInvoices();
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid');

  const columns = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      render: (value, item) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'paidDate', header: 'Paid Date', sortable: true },
    { key: 'paymentMethod', header: 'Payment Method', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Paid Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Paid Invoices</h2>
          <Badge className="bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {paidInvoices.length} Paid
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={paidInvoices}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Receipt
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

export default PaidInvoicesPage;
