
import React from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  FileText, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  FileCog, 
  BarChart, 
  ShieldAlert, 
  Users, 
  File
} from 'lucide-react';
import { cn } from "@/lib/utils";

const isActive = (path: string, currentPath: string) => {
  return currentPath === path || (path !== '/' && currentPath.startsWith(path));
};

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  return (
    <RouterLink
      to={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      {children}
    </RouterLink>
  );
};

const TopNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex items-center space-x-2 text-sm overflow-x-auto px-4 py-1">
      <div className="relative group">
        <NavLink href="/" isActive={isActive('/', pathname)}>
          <Home className="w-4 h-4 mr-1.5" />
          Home
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/requisitions" isActive={isActive('/requisitions', pathname)}>
          <ShoppingBag className="w-4 h-4 mr-1.5" />
          Requisitions
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/orders" isActive={isActive('/orders', pathname)}>
          <Package className="w-4 h-4 mr-1.5" />
          Orders
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/invoices" isActive={isActive('/invoices', pathname)}>
          <FileText className="w-4 h-4 mr-1.5" />
          Invoices
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/payments" isActive={isActive('/payments', pathname)}>
          <CreditCard className="w-4 h-4 mr-1.5" />
          Payments
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/suppliers" isActive={isActive('/suppliers', pathname)}>
          <Users className="w-4 h-4 mr-1.5" />
          Suppliers
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/contracts" isActive={isActive('/contracts', pathname)}>
          <File className="w-4 h-4 mr-1.5" />
          Contracts
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/inventory" isActive={isActive('/inventory', pathname)}>
          <Truck className="w-4 h-4 mr-1.5" />
          Inventory
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/spend-guard" isActive={isActive('/spend-guard', pathname)}>
          <ShieldAlert className="w-4 h-4 mr-1.5" />
          Spend Guard
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/supply-chain" isActive={isActive('/supply-chain', pathname)}>
          <BarChart className="w-4 h-4 mr-1.5" />
          Supply Chain
        </NavLink>
      </div>
      <div className="relative group">
        <NavLink href="/setup" isActive={isActive('/setup', pathname)}>
          <FileCog className="w-4 h-4 mr-1.5" />
          Setup
        </NavLink>
      </div>
    </div>
  );
};

export default TopNavigation;
