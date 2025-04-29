
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, ShoppingCart, Clock } from 'lucide-react';
import { purchaseOrders, suppliers, voiceScripts } from '../data/mockData';

const PurchaseOrdersPage = () => {
  const [showNewPOForm, setShowNewPOForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <ApplicationLayout 
      pageTitle="Purchase Orders"
      pageLoadScript={voiceScripts.purchaseOrders.pageLoad}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search purchase orders..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
        
        <Button 
          onClick={() => setShowNewPOForm(true)}
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Purchase Order
        </Button>
      </div>
      
      {showNewPOForm ? (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Purchase Order</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
                placeholder="Enter PO title"
              />
            </div>
            <VoiceElement
              whatScript={voiceScripts.purchaseOrders.vendorSelect.what}
              howScript={voiceScripts.purchaseOrders.vendorSelect.how}
              decisionScript={voiceScripts.purchaseOrders.vendorSelect.decision}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
                  <option value="">Select a vendor</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name} (Rating: {supplier.rating}/5)
                    </option>
                  ))}
                </select>
              </div>
            </VoiceElement>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requisition</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
                <option value="">Select a requisition (optional)</option>
                <option value="REQ-2023-001">REQ-2023-001 - Office Supplies for Q2</option>
                <option value="REQ-2023-002">REQ-2023-002 - Laptops for IT Department</option>
              </select>
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
              onClick={() => setShowNewPOForm(false)}
            >
              Cancel
            </Button>
            <Button variant="outline">Save as Draft</Button>
            <Button className="bg-coupa-blue hover:bg-coupa-darkblue">Send to Supplier</Button>
          </div>
        </Card>
      ) : (
        <Card className="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <VoiceElement
                  key={po.id}
                  whatScript={voiceScripts.purchaseOrders.poRow.what}
                  howScript={voiceScripts.purchaseOrders.poRow.how}
                  decisionScript={voiceScripts.purchaseOrders.poRow.decision}
                >
                  <TableRow className="hover:bg-gray-50 cursor-pointer">
                    <TableCell>
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 text-gray-400 mr-2" />
                        {po.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{po.title}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          po.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : po.status === 'sent' 
                              ? 'bg-blue-100 text-blue-800' 
                              : po.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : po.status === 'canceled' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>{formatCurrency(po.totalAmount)}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {po.dateCreated}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{po.expectedDelivery}</TableCell>
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
        <div>Showing 1 of 1 purchase orders</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default PurchaseOrdersPage;
