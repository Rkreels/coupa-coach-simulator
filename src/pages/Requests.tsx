
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, FileText, Clock, Check, X } from 'lucide-react';

// Mock data for requests
const requests = [
  {
    id: "REQ-2023-001",
    title: "IT Support for Marketing Event",
    type: "Service Request",
    status: "approved",
    requestedBy: "Sarah Johnson",
    dateCreated: "2023-05-12",
    dateNeeded: "2023-06-01",
    priority: "Medium"
  },
  {
    id: "REQ-2023-002",
    title: "Office Relocation Support",
    type: "Service Request",
    status: "pending",
    requestedBy: "John Smith",
    dateCreated: "2023-05-15",
    dateNeeded: "2023-06-15",
    priority: "High"
  },
  {
    id: "REQ-2023-003",
    title: "Software License Request - Adobe Suite",
    type: "Software Request",
    status: "rejected",
    requestedBy: "Emily Davis",
    dateCreated: "2023-05-10",
    dateNeeded: "2023-05-25",
    priority: "Low"
  },
  {
    id: "REQ-2023-004",
    title: "Catering for Department Meeting",
    type: "Service Request",
    status: "approved",
    requestedBy: "Michael Chen",
    dateCreated: "2023-05-08",
    dateNeeded: "2023-05-20",
    priority: "Medium"
  }
];

const Requests = () => {
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

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'High':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">High</span>;
      case 'Medium':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Medium</span>;
      case 'Low':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Low</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{priority}</span>;
    }
  };

  return (
    <ApplicationLayout 
      pageTitle="Requests"
      pageLoadScript="Welcome to Requests. Here you can make and manage various types of requests including service requests, software licenses, and other non-purchase items."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
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
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Request
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <VoiceElement
          whatScript="This shows all requests requiring your attention."
          howScript="Click to view all requests."
        >
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500">
            <h3 className="font-medium">All Requests</h3>
            <p className="text-2xl font-bold mt-2">4</p>
            <p className="text-sm text-gray-600">Total requests</p>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows requests pending approval."
          howScript="Click to view pending requests."
        >
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-yellow-500">
            <h3 className="font-medium">Pending</h3>
            <p className="text-2xl font-bold mt-2">1</p>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows approved requests."
          howScript="Click to view approved requests."
        >
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-green-500">
            <h3 className="font-medium">Approved</h3>
            <p className="text-2xl font-bold mt-2">2</p>
            <p className="text-sm text-gray-600">Ready for fulfillment</p>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows rejected requests."
          howScript="Click to view rejected requests."
        >
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-red-500">
            <h3 className="font-medium">Rejected</h3>
            <p className="text-2xl font-bold mt-2">1</p>
            <p className="text-sm text-gray-600">Requires attention</p>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Needed By</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <VoiceElement
                key={req.id}
                whatScript={`This is request ${req.id} for ${req.title}.`}
                howScript="Click on this row to view request details or take action."
              >
                <TableRow className="hover:bg-gray-50 cursor-pointer">
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      {req.id}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{req.title}</TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                        req.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : req.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {getStatusIcon(req.status)}
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{req.requestedBy}</TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center text-sm">
                      <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {req.dateCreated}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{req.dateNeeded}</TableCell>
                  <TableCell>{getPriorityBadge(req.priority)}</TableCell>
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
        <div>Showing {requests.length} of {requests.length} requests</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default Requests;
