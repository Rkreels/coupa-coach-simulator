
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  FileText, 
  ShoppingCart, 
  Receipt, 
  Users, 
  FileText as ContractsIcon, 
  Package, 
  Shield, 
  Truck, 
  Settings,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: BarChart3 },
  { name: 'Requisitions', path: '/requisitions', icon: FileText },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Invoices', path: '/invoices', icon: Receipt },
  { name: 'Suppliers', path: '/suppliers', icon: Users },
  { name: 'Contracts', path: '/contracts', icon: ContractsIcon },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Spend Guard', path: '/spend-guard', icon: Shield },
  { name: 'Supply Chain', path: '/supply-chain', icon: Truck },
  { name: 'Setup', path: '/setup', icon: Settings }
];

export const MainNavigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-coupa-blue">Coupa</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:ml-6 lg:flex lg:space-x-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors",
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

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2 text-base font-medium transition-colors",
                      isActive
                        ? "text-coupa-blue bg-blue-50 border-r-4 border-coupa-blue"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
