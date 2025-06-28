
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  FileText, 
  ShoppingCart, 
  Receipt, 
  Users, 
  FileContract, 
  Package, 
  Shield, 
  Truck, 
  Settings,
  BarChart3
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: BarChart3 },
  { name: 'Requisitions', path: '/requisitions', icon: FileText },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Invoices', path: '/invoices', icon: Receipt },
  { name: 'Suppliers', path: '/suppliers', icon: Users },
  { name: 'Contracts', path: '/contracts', icon: FileContract },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Spend Guard', path: '/spend-guard', icon: Shield },
  { name: 'Supply Chain', path: '/supply-chain', icon: Truck },
  { name: 'Setup', path: '/setup', icon: Settings }
];

export const MainNavigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-coupa-blue">Coupa</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                      isActive
                        ? "border-coupa-blue text-coupa-blue"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
