
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface SecondaryNavigationProps {
  items?: {
    name: string;
    path: string;
  }[];
  backgroundColor?: string;
  textColor?: string;
  activeBackgroundColor?: string;
  activeBorderColor?: string;
}

export const SecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ 
  items = [],
  backgroundColor = "bg-blue-500",
  textColor = "text-white",
  activeBackgroundColor = "bg-blue-600",
  activeBorderColor = "border-white"
}) => {
  const location = useLocation();
  
  if (!items || items.length === 0) return null;
  
  return (
    <div className={`${backgroundColor} ${textColor}`}>
      <div className="flex overflow-x-auto">
        {items.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-blue-600",
              location.pathname === item.path 
                ? `border-b-2 ${activeBorderColor} ${activeBackgroundColor}` 
                : ""
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
