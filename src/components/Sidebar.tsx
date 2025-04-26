
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingCart, Package, Gavel, BarChart3, TrendingUp, FileText, Users, Settings } from 'lucide-react';
import { VoiceElement } from './VoiceElement';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  
  const navItems = [
    { 
      path: '/', 
      name: 'Dashboard', 
      icon: <BarChart3 className="h-5 w-5" /> 
    },
    { 
      path: '/purchase-orders', 
      name: 'Purchase Orders', 
      icon: <ShoppingCart className="h-5 w-5" /> 
    },
    { 
      path: '/supply-chain', 
      name: 'Supply Chain', 
      icon: <TrendingUp className="h-5 w-5" /> 
    },
    { 
      path: '/auctions', 
      name: 'Auctions', 
      icon: <Gavel className="h-5 w-5" /> 
    },
    { 
      path: '/invoices', 
      name: 'Invoices', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      path: '/suppliers', 
      name: 'Suppliers', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      path: '/inventory', 
      name: 'Inventory', 
      icon: <Package className="h-5 w-5" /> 
    },
    { 
      path: '/settings', 
      name: 'Settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 transition-all duration-300 z-20",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-6 w-6 bg-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="space-y-1 px-2">
        {navItems.map((item) => (
          <VoiceElement
            key={item.path}
            whatScript={`This is the ${item.name} navigation link. It takes you to the ${item.name} section of the application.`}
            howScript={`Click on this link to access the ${item.name} area and manage related tasks.`}
            triggerOn="hover"
          >
            <Link to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  location.pathname === item.path && "bg-gray-100 text-coupa-blue font-medium",
                  collapsed ? "px-0 justify-center" : "px-3"
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Button>
            </Link>
          </VoiceElement>
        ))}
      </nav>
    </aside>
  );
};
