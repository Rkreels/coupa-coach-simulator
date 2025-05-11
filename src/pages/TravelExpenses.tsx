
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, FileText, Clock, Check, X, Briefcase, BarChart3 } from 'lucide-react';

// Mock data for expense reports
const expenseReports = [
  {
    id: "EXP-2023-001",
    title: "Client Meeting - New York",
    status: "approved",
    submittedBy: "David Wilson",
    totalAmount: 1850.75,
    dateSubmitted: "2023-05-08",
    tripDates: "May 2-5, 2023",
    categoryBreakdown: {
      "Airfare": 450,
      "Hotel": 850,
      "Meals": 320,
      "Transportation": 180,
      "Other": 50.75
    }
  },
  {
    id: "EXP-2023-002",
    title: "Conference - Chicago",
    status: "pending",
    submittedBy: "Sarah Johnson",
    totalAmount: 2450.00,
    dateSubmitted: "2023-05-15",
    tripDates: "May 12-14, 2023",
    categoryBreakdown: {
      "Airfare": 550,
      "Hotel": 1200,
      "Meals": 350,
      "Conference Fee": 300,
      "Transportation": 50
    }
  },
  {
    id: "EXP-2023-003",
    title: "Sales Meeting - Boston",
    status: "rejected",
    submittedBy: "Michael Chen",
    totalAmount: 1200.50,
    dateSubmitted: "2023-05-10",
    tripDates: "May 8-9, 2023",
    categoryBreakdown: {
      "Airfare": 400,
      "Hotel": 450,
      "Meals": 200,
      "Transportation": 150.50
    }
  }
];

const TravelExpenses = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <ApplicationLayout 
      pageTitle="Travel & Expenses"
      pageLoadScript="Welcome to the Travel and Expenses module. Here you can create expense reports, manage travel requests, and track reimbursements."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" /> 
            Reports
          </Button>
          <Button 
            className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> 
            New Expense Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows your year-to-date expense total."
          howScript="Use this to track overall spending for the year."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">YTD Expenses</p>
                <h3 className="text-3xl font-bold text-coupa-blue">$5,501.25</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">12</span> expense reports submitted
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows pending expense reports awaiting approval."
          howScript="Monitor this to track reports that need action."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Approval</p>
                <h3 className="text-3xl font-bold text-yellow-500">$2,450.00</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">1</span> expense report awaiting approval
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows the amount reimbursed to you this month."
          howScript="Track your monthly reimbursements here."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reimbursed This Month</p>
                <h3 className="text-3xl font-bold text-green-600">$1,850.75</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              Processed on May 15, 2023
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Trip Dates</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseReports.map((report) => (
              <VoiceElement
                key={report.id}
                whatScript={`This is expense report ${report.id} for ${report.title}.`}
                howScript="Click on this row to view expense details or take action."
              >
                <TableRow className="hover:bg-gray-50 cursor-pointer">
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      {report.id}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                        report.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : report.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {getStatusIcon(report.status)}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{report.submittedBy}</TableCell>
                  <TableCell>{formatCurrency(report.totalAmount)}</TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center text-sm">
                      <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {report.dateSubmitted}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{report.tripDates}</TableCell>
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
        <div>Showing {expenseReports.length} of {expenseReports.length} expense reports</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default TravelExpenses;
