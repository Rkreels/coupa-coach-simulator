
import React from 'react';
import { SecondaryNavigation } from '../SecondaryNavigation';

const supplyChainNavigationItems = [
  {
    name: 'Analytics Dashboard',
    path: '/supply-chain',
    description: 'Supply chain performance overview and metrics'
  },
  {
    name: 'Flow Management',
    path: '/supply-chain/flow-management',
    description: 'Manage product flows between locations'
  },
  {
    name: 'Network Optimization',
    path: '/supply-chain/network-optimization',
    description: 'Optimize distribution networks and routes'
  },
  {
    name: 'Demand Planning',
    path: '/supply-chain/demand-planning',
    description: 'Forecast demand and plan inventory levels'
  },
  {
    name: 'Supplier Performance',
    path: '/supply-chain/supplier-performance',
    description: 'Monitor supplier delivery and quality metrics'
  },
  {
    name: 'Transportation',
    path: '/supply-chain/transportation',
    description: 'Manage shipping modes and logistics'
  },
  {
    name: 'Risk Assessment',
    path: '/supply-chain/risk-assessment',
    description: 'Identify and mitigate supply chain risks'
  },
  {
    name: 'Cost Analysis',
    path: '/supply-chain/cost-analysis',
    description: 'Analyze costs across the supply chain'
  },
  {
    name: 'Sustainability',
    path: '/supply-chain/sustainability',
    description: 'Track environmental impact and carbon footprint'
  },
  {
    name: 'Collaboration',
    path: '/supply-chain/collaboration',
    description: 'Partner portal and supplier collaboration tools'
  }
];

export const SupplyChainNavigation = () => {
  return (
    <SecondaryNavigation 
      items={supplyChainNavigationItems}
      backgroundColor="bg-white border-b border-gray-200"
      textColor="text-gray-600"
      activeBackgroundColor="bg-purple-50"
      activeBorderColor="border-purple-500"
    />
  );
};
