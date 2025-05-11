
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, Package, AlertTriangle } from 'lucide-react';

// Mock data for inventory items
const inventoryItems = [
  {
    id: "ITEM-001",
    name: "Dell XPS Laptop",
    category: "Electronics",
    quantity: 24,
    status: "In Stock",
    location: "Warehouse A",
    lastUpdated: "2023-05-15"
  },
  {
    id: "ITEM-002",
    name: "HP Printer Paper",
    category: "Office Supplies",
    quantity: 150,
    status: "In Stock",
    location: "Warehouse B",
    lastUpdated: "2023-05-20"
  },
  {
    id: "ITEM-003",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    quantity: 5,
    status: "Low Stock",
    location: "Warehouse A",
    lastUpdated: "2023-05-18"
  },
  {
    id: "ITEM-004",
    name: "Wireless Keyboard",
    category: "Electronics",
    quantity: 0,
    status: "Out of Stock",
    location: "Warehouse C",
    lastUpdated: "2023-05-10"
  }
];

const Inventory = () => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'In Stock':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">In Stock</span>;
      case 'Low Stock':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Low Stock</span>;
      case 'Out of Stock':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Out of Stock</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <ApplicationLayout 
      pageTitle="Inventory"
      pageLoadScript="Welcome to Inventory Management. Here you can track stock levels, manage items, and view inventory transactions across multiple locations."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          Add New Item
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows the total number of items in your inventory."
          howScript="Use this metric to track overall inventory size."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <h3 className="text-3xl font-bold text-coupa-blue">179</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">4</span> unique item types
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows items in low stock that need reordering."
          howScript="Monitor this to prevent stockouts."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock Items</p>
                <h3 className="text-3xl font-bold text-yellow-500">1</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Needs attention soon
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows items that are out of stock."
          howScript="These items require immediate reordering."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Out of Stock Items</p>
                <h3 className="text-3xl font-bold text-red-500">1</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-red-500">
              Requires immediate attention!
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <VoiceElement
                key={item.id}
                whatScript={`This is inventory item ${item.id}: ${item.name}.`}
                howScript="Click on this row to view item details or manage inventory."
              >
                <TableRow className="hover:bg-gray-50 cursor-pointer">
                  <TableCell>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 text-gray-400 mr-2" />
                      {item.id}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-gray-600">
                    {item.lastUpdated}
                  </TableCell>
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
        <div>Showing {inventoryItems.length} of {inventoryItems.length} items</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default Inventory;
