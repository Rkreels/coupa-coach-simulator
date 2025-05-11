
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, CreditCard, Check, Clock, AlertTriangle } from 'lucide-react';

// Mock data for payments
const payments = [
  {
    id: "PAY-2023-001",
    supplier: "Staples Inc.",
    amount: 2450.75,
    status: "processed",
    method: "ACH",
    date: "2023-06-10",
    invoiceId: "INV-2023-001"
  },
  {
    id: "PAY-2023-002",
    supplier: "Dell Technologies",
    amount: 12350.00,
    status: "pending",
    method: "Wire Transfer",
    date: "2023-06-15",
    invoiceId: "INV-2023-002"
  },
  {
    id: "PAY-2023-003",
    supplier: "PrintWorks Co.",
    amount: 3200.50,
    status: "failed",
    method: "ACH",
    date: "2023-05-20",
    invoiceId: "INV-2023-003"
  }
];

const Payments = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'processed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <ApplicationLayout 
      pageTitle="Payments"
      pageLoadScript="Welcome to Payments. Here you can track all payments to suppliers, manage payment methods, and resolve any payment issues."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="processed">Processed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Payment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows the total payments processed this month."
          howScript="Use this to track your monthly payment activity."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Payments Processed (Month)</p>
                <h3 className="text-3xl font-bold text-coupa-blue">$18,001.25</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              <span className="font-medium">+12.5%</span> from last month
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows pending payments that need attention."
          howScript="Monitor this to ensure payments are processed on time."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Payments</p>
                <h3 className="text-3xl font-bold text-yellow-500">$12,350.00</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">1</span> payment requiring action
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows failed payments that need investigation."
          howScript="Address these payments to avoid supplier issues."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Failed Payments</p>
                <h3 className="text-3xl font-bold text-red-500">$3,200.50</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">1</span> payment requiring resolution
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <VoiceElement
                key={payment.id}
                whatScript={`This is payment ${payment.id} to ${payment.supplier}.`}
                howScript="Click on this row to view payment details or take action."
              >
                <TableRow className="hover:bg-gray-50 cursor-pointer">
                  <TableCell>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                      {payment.id}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{payment.supplier}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                        payment.status === 'processed' 
                          ? 'bg-green-100 text-green-800' 
                          : payment.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="text-gray-600">
                    {payment.date}
                  </TableCell>
                  <TableCell className="text-coupa-blue">{payment.invoiceId}</TableCell>
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
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Showing {payments.length} of {payments.length} payments</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default Payments;
