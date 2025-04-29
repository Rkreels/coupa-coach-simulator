
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface SupplyChainNavigationProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export const SupplyChainNavigation: React.FC<SupplyChainNavigationProps> = ({ 
  currentTab = 'home', 
  onTabChange = () => {} 
}) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'data-management', label: 'Data Management' },
    { id: 'data-flows', label: 'Data Flows' },
    { id: 'model-building', label: 'Model Building' },
    { id: 'macros', label: 'Macros' },
    { id: 'data-visualizations', label: 'Data Visualizations' },
    { id: 'queue-management', label: 'Queue Management' },
    { id: 'administration', label: 'Administration' },
  ];

  return (
    <div className="bg-blue-500 text-white">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <Link 
            key={tab.id}
            to="#"
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-blue-600",
              currentTab === tab.id 
                ? "border-b-2 border-white bg-blue-600" 
                : ""
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
