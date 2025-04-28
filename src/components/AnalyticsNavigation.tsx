
import React from 'react';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';

interface AnalyticsNavigationProps {
  currentTab: string;
  onTabChange?: (tab: string) => void;
}

export const AnalyticsNavigation: React.FC<AnalyticsNavigationProps> = ({ 
  currentTab, 
  onTabChange = () => {} 
}) => {
  const tabs = [
    { id: 'insights', label: 'Insights' },
    { id: 'process-insights', label: 'Process Insights' },
    { id: 'reports', label: 'Reports' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'content-insights', label: 'Content Insights' },
    { id: 'dashboards', label: 'Dashboards' },
    { id: 'pricing-insights', label: 'Pricing Insights' },
    { id: 'purchase-metrics', label: 'Purchase Metrics' },
    { id: 'risk-performance', label: 'Risk Performance' },
    { id: 'risk-access-analytics', label: 'Risk Access Analytics' },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <Link 
            key={tab.id}
            to="#"
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap",
              currentTab === tab.id 
                ? "border-b-2 border-coupa-blue text-coupa-blue" 
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={(e) => {
              e.preventDefault();
              onTabChange(tab.id);
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
