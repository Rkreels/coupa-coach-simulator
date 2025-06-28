
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

const setupNavigationItems = [
  {
    name: 'Overview',
    path: '/setup',
    description: 'Setup dashboard and configuration overview'
  },
  {
    name: 'Company Profile',
    path: '/setup/company-profile',
    description: 'Configure company information and branding'
  },
  {
    name: 'Users & Roles',
    path: '/setup/users-roles',
    description: 'Manage user accounts and permission roles'
  },
  {
    name: 'Departments',
    path: '/setup/departments',
    description: 'Set up organizational departments and cost centers'
  },
  {
    name: 'Approval Workflows',
    path: '/setup/approval-workflows',
    description: 'Configure approval chains and business rules'
  },
  {
    name: 'Payment Methods',
    path: '/setup/payment-methods',
    description: 'Set up payment providers and financial accounts'
  },
  {
    name: 'Tax Configuration',
    path: '/setup/tax-configuration',
    description: 'Configure tax rates and regional settings'
  },
  {
    name: 'Currencies',
    path: '/setup/currencies',
    description: 'Manage multi-currency support and exchange rates'
  },
  {
    name: 'Custom Fields',
    path: '/setup/custom-fields',
    description: 'Create custom data fields for various modules'
  },
  {
    name: 'Integrations',
    path: '/setup/integrations',
    description: 'Configure ERP and third-party system integrations'
  },
  {
    name: 'Email Templates',
    path: '/setup/email-templates',
    description: 'Customize notification and communication templates'
  },
  {
    name: 'Security Settings',
    path: '/setup/security-settings',
    description: 'Configure authentication and security policies'
  }
];

export const SetupNavigation = () => {
  return (
    <SecondaryNavigation 
      items={setupNavigationItems}
      backgroundColor="bg-white border-b border-gray-200"
      textColor="text-gray-600"
      activeBackgroundColor="bg-gray-50"
      activeBorderColor="border-gray-500"
    />
  );
};
