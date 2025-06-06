
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

export const OrdersNavigation: React.FC = () => {
  const navigationItems = [
    {
      name: 'All Orders',
      path: '/orders',
      description: 'View all purchase orders'
    },
    {
      name: 'Pending',
      path: '/orders/pending',
      description: 'Orders pending approval'
    },
    {
      name: 'Approved',
      path: '/orders/approved',
      description: 'Approved orders ready to send'
    },
    {
      name: 'Sent',
      path: '/orders/sent',
      description: 'Orders sent to vendors'
    },
    {
      name: 'Received',
      path: '/orders/received',
      description: 'Orders received from vendors'
    },
    {
      name: 'Create Order',
      path: '/orders/create',
      description: 'Create new purchase order'
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
