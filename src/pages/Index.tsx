
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, FileText, Clock } from 'lucide-react';
import { requisitions, voiceScripts } from '../data/mockData';

const RequisitionsPage = () => {
  const [showNewReqForm, setShowNewReqForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <ApplicationLayout 
      pageTitle="Dashboard" 
      pageLoadScript={voiceScripts.requisitions.pageLoad}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requisitions..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        <VoiceElement
          whatScript={voiceScripts.requisitions.newButton.what}
          howScript={voiceScripts.requisitions.newButton.how}
          decisionScript={voiceScripts.requisitions.newButton.decision}
        >
          <Button 
            onClick={() => setShowNewReqForm(true)}
            className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> 
            New Requisition
          </Button>
        </VoiceElement>
      </div>
      
      {showNewReqForm ? (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Requisition</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                placeholder="Enter requisition title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
                <option>IT</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Finance</option>
                <option>HR</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                placeholder="Enter detailed description of what you're requesting"
                rows={3}
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
                    <option>Travel</option>
                    <option>Other</option>
                  </select>
                </TableCell>
              </TableRow>
              {/* Add Item button row */}
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
              onClick={() => setShowNewReqForm(false)}
            >
              Cancel
            </Button>
            
            <VoiceElement
              whatScript="This is the Save as Draft button."
              howScript="Click this button to save your progress without submitting it for approval."
              decisionScript="Use Save as Draft when you need more information before submission, like pricing or specifications."
            >
              <Button variant="outline">Save as Draft</Button>
            </VoiceElement>
            
            <VoiceElement
              whatScript="This is the Submit for Approval button."
              howScript="Click this button when your requisition is complete and ready for review."
              decisionScript="Only submit when you have all details complete and funding is confirmed. This will alert your manager for approval."
            >
              <Button className="bg-coupa-blue hover:bg-coupa-darkblue">Submit for Approval</Button>
            </VoiceElement>
          </div>
        </Card>
      ) : (
        <Card className="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requisitions.map((requisition) => (
                <VoiceElement
                  key={requisition.id}
                  whatScript={voiceScripts.requisitions.requisitionRow.what}
                  howScript={voiceScripts.requisitions.requisitionRow.how}
                  decisionScript={voiceScripts.requisitions.requisitionRow.decision}
                >
                  <TableRow className="hover:bg-gray-50 cursor-pointer">
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        {requisition.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{requisition.title}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          requisition.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : requisition.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : requisition.status === 'rejected' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {requisition.status.charAt(0).toUpperCase() + requisition.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{requisition.department}</TableCell>
                    <TableCell>{formatCurrency(requisition.totalAmount)}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {requisition.dateCreated}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{requisition.dueDate}</TableCell>
                    <TableCell>
                      {requisition.status === 'pending' && (
                        <VoiceElement
                          whatScript={voiceScripts.requisitions.approveButton.what}
                          howScript={voiceScripts.requisitions.approveButton.how}
                          decisionScript={voiceScripts.requisitions.approveButton.decision}
                        >
                          <Button size="sm" className="bg-coupa-green hover:bg-coupa-green/90">
                            Approve
                          </Button>
                        </VoiceElement>
                      )}
                      {requisition.status !== 'pending' && (
                        <Button variant="ghost" size="sm" className="text-coupa-blue">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </VoiceElement>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Showing 2 of 2 requisitions</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default RequisitionsPage;
