
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, FileText, Clock, Check, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data for invoices
const invoices = [
  {
    id: "INV-2023-001",
    title: "Office Supplies - Q2",
    status: "paid",
    supplier: "Staples Inc.",
    totalAmount: 2450.75,
    dateCreated: "2023-05-12",
    dueDate: "2023-06-12",
    paymentDate: "2023-06-10"
  },
  {
    id: "INV-2023-002",
    title: "IT Equipment - Laptops",
    status: "pending",
    supplier: "Dell Technologies",
    totalAmount: 12350.00,
    dateCreated: "2023-05-15",
    dueDate: "2023-06-15",
    paymentDate: null
  },
  {
    id: "INV-2023-003",
    title: "Marketing Materials",
    status: "overdue",
    supplier: "PrintWorks Co.",
    totalAmount: 3200.50,
    dateCreated: "2023-04-20",
    dueDate: "2023-05-20",
    paymentDate: null
  }
];

const InvoicesPage = () => {
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'paid':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <ApplicationLayout pageTitle="Invoices">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
        
        <Button 
          onClick={() => setShowNewInvoiceForm(true)}
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Invoice
        </Button>
      </div>
      
      {showNewInvoiceForm ? (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Invoice</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                placeholder="Enter invoice title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
                <option value="">Select a supplier</option>
                <option value="1">Staples Inc.</option>
                <option value="2">Dell Technologies</option>
                <option value="3">PrintWorks Co.</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              />
            </div>
          </div>
          
          <h3 className="font-medium text-gray-800 mb-3">Line Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                    placeholder="Item name"
                  />
                </TableCell>
                <TableCell className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                    placeholder="Description"
                  />
                </TableCell>
                <TableCell className="px-3 py-2">
                  <input
                    type="number"
                    className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="px-3 py-2">
                  <input
                    type="number"
                    className="w-24 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent"
                    placeholder="0.00"
                  />
                </TableCell>
                <TableCell className="px-3 py-2">
                  <span className="text-gray-600">$0.00</span>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-coupa-blue focus:border-transparent">
                    <option>Office Supplies</option>
                    <option>IT Equipment</option>
                    <option>Marketing</option>
                    <option>Other</option>
                  </select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" /> Add Line Item
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowNewInvoiceForm(false)}
            >
              Cancel
            </Button>
            <Button variant="outline">Save as Draft</Button>
            <Button className="bg-coupa-blue hover:bg-coupa-darkblue">Submit Invoice</Button>
          </div>
        </Card>
      ) : (
        <Card className="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <VoiceElement
                  key={invoice.id}
                  whatScript={`This is invoice ${invoice.id} for ${invoice.title}.`}
                  howScript="Click on this row to view invoice details or take action."
                >
                  <TableRow className="hover:bg-gray-50 cursor-pointer">
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        {invoice.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{invoice.title}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                          invoice.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : invoice.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{invoice.supplier}</TableCell>
                    <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {invoice.dateCreated}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-coupa-blue">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </VoiceElement>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Showing {invoices.length} of {invoices.length} invoices</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default InvoicesPage;
