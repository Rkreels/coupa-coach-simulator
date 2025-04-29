
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface SecondaryNavigationProps {
  items: {
    name: string;
    path: string;
  }[];
}

export const SecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ items }) => {
  const location = useLocation();
  
  if (!items || items.length === 0) return null;
  
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex overflow-x-auto">
        {items.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              location.pathname === item.path 
                ? "border-b-2 border-coupa-blue text-coupa-blue" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
