
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';
import { useLocation } from 'react-router-dom';

export const RequisitionsNavigation: React.FC = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'Create Requisition',
      path: '/requisitions',
      description: 'Create a new requisition'
    },
    {
      name: 'My Requisitions',
      path: '/requisitions/my',
      description: 'View your requisitions'
    },
    {
      name: 'Pending Approval',
      path: '/requisitions/pending',
      description: 'Requisitions awaiting approval'
    },
    {
      name: 'Approved',
      path: '/requisitions/approved',
      description: 'Approved requisitions'
    },
    {
      name: 'Templates',
      path: '/requisitions/templates',
      description: 'Requisition templates'
    },
    {
      name: 'Shopping',
      path: '/requisitions/shopping',
      description: 'Browse shopping catalogs'
    },
    {
      name: 'Quick Order',
      path: '/requisitions/quick-order',
      description: 'Quick order form'
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
