
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

export const InvoicesNavigation: React.FC = () => {
  const navigationItems = [
    {
      name: 'All Invoices',
      path: '/invoices',
      description: 'View all invoices'
    },
    {
      name: 'Pending',
      path: '/invoices/pending',
      description: 'Invoices pending approval'
    },
    {
      name: 'Approved',
      path: '/invoices/approved',
      description: 'Approved invoices ready for payment'
    },
    {
      name: 'Processing',
      path: '/invoices/processing',
      description: 'Invoices being processed'
    },
    {
      name: 'Paid',
      path: '/invoices/paid',
      description: 'Paid invoices'
    },
    {
      name: 'Disputed',
      path: '/invoices/disputed',
      description: 'Disputed invoices'
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
