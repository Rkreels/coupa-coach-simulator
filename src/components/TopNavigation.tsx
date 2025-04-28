
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Home, FileText, ShoppingCart, CreditCard, Package, Gavel, BarChart3, TrendingUp, Shield, Settings, MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceElement } from './VoiceElement';

export const TopNavigation: React.FC = () => {
  const location = useLocation();
  
  const mainNavItems = [
    { 
      path: '/', 
      name: 'Home', 
      icon: <Home className="h-4 w-4" /> 
    },
    { 
      path: '/travel-expenses', 
      name: 'Travel & Expenses', 
      icon: <BarChart3 className="h-4 w-4" /> 
    },
    { 
      path: '/forecasts', 
      name: 'Forecasts', 
      icon: <TrendingUp className="h-4 w-4" /> 
    },
    { 
      path: '/requests', 
      name: 'Requests', 
      icon: <FileText className="h-4 w-4" /> 
    },
    { 
      path: '/purchase-orders', 
      name: 'Orders', 
      icon: <ShoppingCart className="h-4 w-4" /> 
    },
    { 
      path: '/invoices', 
      name: 'Invoices', 
      icon: <FileText className="h-4 w-4" /> 
    },
    { 
      path: '/community', 
      name: 'Community', 
      icon: <Users className="h-4 w-4" /> 
    },
    { 
      path: '/payments', 
      name: 'Payments', 
      icon: <CreditCard className="h-4 w-4" /> 
    },
    { 
      path: '/inventory', 
      name: 'Inventory', 
      icon: <Package className="h-4 w-4" /> 
    },
    { 
      path: '/auctions', 
      name: 'Sourcing', 
      icon: <Gavel className="h-4 w-4" /> 
    },
    { 
      path: '/spend-guard', 
      name: 'Spend Guard', 
      icon: <Shield className="h-4 w-4" /> 
    },
    { 
      path: '/supply-chain', 
      name: 'Supply Chain', 
      icon: <Package className="h-4 w-4" /> 
    },
    { 
      path: '/setup', 
      name: 'Setup', 
      icon: <Settings className="h-4 w-4" /> 
    },
    { 
      path: '/more', 
      name: 'More...', 
      icon: <MoreHorizontal className="h-4 w-4" />,
      className: "bg-coupa-blue text-white hover:bg-coupa-darkblue" 
    },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="flex items-center px-2 py-1">
        {mainNavItems.map((item) => (
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
                  "h-9 text-sm gap-1",
                  location.pathname === item.path && "bg-gray-100 text-coupa-blue font-medium",
                  item.className
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            </Link>
          </VoiceElement>
        ))}
      </div>
    </nav>
  );
};
