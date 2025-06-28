
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

const spendGuardNavigationItems = [
  {
    name: 'Risk Dashboard',
    path: '/spend-guard',
    description: 'Overview of spending risks and alerts'
  },
  {
    name: 'Active Alerts',
    path: '/spend-guard/active-alerts',
    description: 'View and manage current risk alerts'
  },
  {
    name: 'Fraud Detection',
    path: '/spend-guard/fraud-detection',
    description: 'Monitor suspicious transactions and patterns'
  },
  {
    name: 'Duplicate Invoices',
    path: '/spend-guard/duplicate-invoices',
    description: 'Identify and prevent duplicate payments'
  },
  {
    name: 'Price Variance',
    path: '/spend-guard/price-variance',
    description: 'Track unusual price changes and deviations'
  },
  {
    name: 'Approval Bypass',
    path: '/spend-guard/approval-bypass',
    description: 'Monitor transactions that bypassed approval workflows'
  },
  {
    name: 'Supplier Risk',
    path: '/spend-guard/supplier-risk',
    description: 'Assess and monitor supplier compliance risks'
  },
  {
    name: 'Policy Violations',
    path: '/spend-guard/policy-violations',
    description: 'Track spending policy compliance issues'
  },
  {
    name: 'Analytics',
    path: '/spend-guard/analytics',
    description: 'Advanced risk analytics and reporting'
  },
  {
    name: 'Settings',
    path: '/spend-guard/settings',
    description: 'Configure risk thresholds and alert rules'
  }
];

export const SpendGuardNavigation = () => {
  return (
    <SecondaryNavigation 
      items={spendGuardNavigationItems}
      backgroundColor="bg-white border-b border-gray-200"
      textColor="text-gray-600"
      activeBackgroundColor="bg-red-50"
      activeBorderColor="border-red-500"
    />
  );
};
