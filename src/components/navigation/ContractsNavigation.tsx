
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

export const ContractsNavigation: React.FC = () => {
  const navigationItems = [
    {
      name: 'All Contracts',
      path: '/contracts',
      description: 'View all contracts'
    },
    {
      name: 'Active',
      path: '/contracts/active',
      description: 'Active contracts'
    },
    {
      name: 'Pending',
      path: '/contracts/pending',
      description: 'Contracts pending approval'
    },
    {
      name: 'Expired',
      path: '/contracts/expired',
      description: 'Expired contracts'
    },
    {
      name: 'Templates',
      path: '/contracts/templates',
      description: 'Contract templates'
    },
    {
      name: 'Create Contract',
      path: '/contracts/create',
      description: 'Create new contract'
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
