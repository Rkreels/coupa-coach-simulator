
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

export const SuppliersNavigation: React.FC = () => {
  const navigationItems = [
    {
      name: 'All Suppliers',
      path: '/suppliers',
      description: 'View and manage all suppliers'
    },
    {
      name: 'Active',
      path: '/suppliers/active',
      description: 'Active suppliers'
    },
    {
      name: 'Pending',
      path: '/suppliers/pending',
      description: 'Suppliers pending approval'
    },
    {
      name: 'Inactive',
      path: '/suppliers/inactive',
      description: 'Inactive suppliers'
    },
    {
      name: 'Add Supplier',
      path: '/suppliers/add',
      description: 'Add new supplier'
    }
  ];

  return (
    <SecondaryNavigation 
      items={navigationItems}
      backgroundColor="bg-white border-b border-gray-200"
      textColor="text-gray-600"
      activeBackgroundColor="bg-blue-50"
      activeBorderColor="border-blue-500"
    />
  );
};
