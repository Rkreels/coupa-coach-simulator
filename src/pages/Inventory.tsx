import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { InventoryNavigation } from '../components/navigation/InventoryNavigation';
import StockLevelsPage from './inventory/StockLevels';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Plus, Package, AlertTriangle } from 'lucide-react';

const InventoryDashboard = () => {
  return (
    <ApplicationLayout pageTitle="Inventory">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <h3 className="text-2xl font-bold text-blue-600">179</h3>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-yellow-500">1</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Out of Stock Items</p>
                <h3 className="text-2xl font-bold text-red-500">1</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </Card>
        </div>
      </div>
    </ApplicationLayout>
  );
};

const Inventory = () => {
  return (
    <div>
      <InventoryNavigation />
      <Routes>
        <Route path="/" element={<InventoryDashboard />} />
        <Route path="/stock-levels" element={<StockLevelsPage />} />
      </Routes>
    </div>
  );
};

export default Inventory;