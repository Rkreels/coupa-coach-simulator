
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useInvoices } from '../../hooks/useInvoices';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Loader } from 'lucide-react';

const ProcessingInvoicesPage = () => {
  const { invoices } = useInvoices();
  const processingInvoices = invoices.filter(invoice => invoice.status === 'processing');

  const columns = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'vendorName', header: 'Vendor', sortable: true },
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
    <ApplicationLayout pageTitle="Processing Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Invoices in Processing</h2>
          <Badge className="bg-blue-100 text-blue-800">
            <Loader className="h-4 w-4 mr-1" />
            {processingInvoices.length} Processing
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Currently Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={processingInvoices}
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
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
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

export default ProcessingInvoicesPage;
