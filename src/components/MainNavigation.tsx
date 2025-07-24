
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  X,
  User,
  LogOut,
  UserCheck
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
  const { user, logout, switchUser } = useAuth();

  const demoUsers = [
    { id: 'usr-001', name: 'Admin User', role: 'System Administrator' },
    { id: 'usr-002', name: 'John Manager', role: 'Procurement Manager' },
    { id: 'usr-003', name: 'Jane Buyer', role: 'Buyer' },
    { id: 'usr-004', name: 'Bob Employee', role: 'Employee' },
    { id: 'usr-005', name: 'Sarah Finance', role: 'Finance Manager' }
  ];

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

          {/* User Profile and Mobile menu button */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.role} • {user?.department}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Switch User (Demo)
                </DropdownMenuLabel>
                {demoUsers.map((demoUser) => (
                  <DropdownMenuItem
                    key={demoUser.id}
                    onClick={() => switchUser(demoUser.id)}
                    className="cursor-pointer"
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="text-sm">{demoUser.name}</span>
                      <span className="text-xs text-muted-foreground">{demoUser.role}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
