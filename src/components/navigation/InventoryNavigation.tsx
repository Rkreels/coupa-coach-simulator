
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

const inventoryNavigationItems = [
  {
    name: 'All Items',
    path: '/inventory',
    description: 'View all inventory items across locations'
  },
  {
    name: 'Stock Levels',
    path: '/inventory/stock-levels',
    description: 'Monitor current stock levels and availability'
  },
  {
    name: 'Reorder Points',
    path: '/inventory/reorder-points',
    description: 'Manage minimum stock thresholds and reorder triggers'
  },
  {
    name: 'Transfers',
    path: '/inventory/transfers',
    description: 'Track inventory movements between locations'
  },
  {
    name: 'Adjustments',
    path: '/inventory/adjustments',
    description: 'Record inventory count adjustments and corrections'
  },
  {
    name: 'Cycle Counts',
    path: '/inventory/cycle-counts',
    description: 'Manage periodic inventory counting schedules'
  },
  {
    name: 'Locations',
    path: '/inventory/locations',
    description: 'Configure warehouses and storage locations'
  },
  {
    name: 'Categories',
    path: '/inventory/categories',
    description: 'Organize items by product categories'
  },
  {
    name: 'Reports',
    path: '/inventory/reports',
    description: 'Generate inventory analytics and reports'
  }
];

export const InventoryNavigation = () => {
  return (
    <SecondaryNavigation 
      items={inventoryNavigationItems}
      backgroundColor="bg-white border-b border-gray-200"
      textColor="text-gray-600"
      activeBackgroundColor="bg-blue-50"
      activeBorderColor="border-blue-500"
    />
  );
};
