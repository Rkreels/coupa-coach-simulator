
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useInvoices } from '../../hooks/useInvoices';
import { Eye, Edit, AlertTriangle, MessageSquare } from 'lucide-react';

const DisputedInvoicesPage = () => {
  const { invoices } = useInvoices();
  const disputedInvoices = invoices.filter(invoice => invoice.status === 'disputed');

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
    <ApplicationLayout pageTitle="Disputed Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Disputed Invoices</h2>
          <Badge className="bg-orange-100 text-orange-800">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {disputedInvoices.length} Disputed
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoices Under Investigation</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={disputedInvoices}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="text-orange-600">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Resolve
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

export default DisputedInvoicesPage;
