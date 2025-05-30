
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';
import { useLocation } from 'react-router-dom';

export const RequisitionsNavigation: React.FC = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'All Requisitions',
      path: '/requisitions',
      description: 'View all requisitions'
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
