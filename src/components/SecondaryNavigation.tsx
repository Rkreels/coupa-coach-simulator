
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface SecondaryNavigationItem {
  name: string;
  path: string;
  description?: string;
  isActive?: boolean;
}

interface SecondaryNavigationProps {
  items?: SecondaryNavigationItem[];
  backgroundColor?: string;
  textColor?: string;
  activeBackgroundColor?: string;
  activeBorderColor?: string;
  customContent?: React.ReactNode;
}

export const SecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ 
  items = [],
  backgroundColor = "bg-white border-b border-gray-200",
  textColor = "text-gray-600",
  activeBackgroundColor = "bg-blue-50",
  activeBorderColor = "border-blue-500",
  customContent
}) => {
  const location = useLocation();
  
  // If no items and no custom content, don't render anything
  if ((!items || items.length === 0) && !customContent) return null;
  
  return (
    <div className={`${backgroundColor} ${textColor} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {customContent ? (
          customContent
        ) : (
          <div className="flex space-x-0 overflow-x-auto">
            {items.map((item) => {
              const isActive = item.isActive !== undefined ? item.isActive : location.pathname === item.path;
              return (
                <Link 
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200",
                    "hover:text-blue-600 hover:border-blue-300",
                    isActive 
                      ? `text-blue-600 ${activeBorderColor} ${activeBackgroundColor}` 
                      : "border-transparent"
                  )}
                  title={item.description}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
