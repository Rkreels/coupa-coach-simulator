
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ChevronLeft,
  ChevronRight,
  FileText, 
  ShoppingCart, 
  FileCheck, 
  Users, 
  BarChart3, 
  Package, 
  Gavel, 
  Clipboard, 
  Settings 
} from 'lucide-react';
import { VoiceElement } from './VoiceElement';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      title: "Procurement", 
      icon: ShoppingCart, 
      path: "/", 
      active: location.pathname === "/",
      voiceScripts: {
        what: "This is the Procurement module, the core of the Coupa platform.",
        how: "Click to access requisitions, purchase orders, and invoices.",
        decision: "Start your procurement process here when you need to request items, create orders, or process invoices."
      },
      submenu: [
        { title: "Requisitions", path: "/", active: location.pathname === "/" },
        { title: "Purchase Orders", path: "/purchase-orders", active: location.pathname === "/purchase-orders" },
        { title: "Invoices", path: "/invoices", active: location.pathname === "/invoices" },
      ]
    },
    { 
      title: "Sourcing", 
      icon: Gavel, 
      path: "/sourcing", 
      active: location.pathname === "/sourcing",
      voiceScripts: {
        what: "This is the Sourcing module for competitive bidding events.",
        how: "Click to manage RFPs, auctions, and supplier comparisons.",
        decision: "Use sourcing when you need to compare multiple suppliers or want to achieve cost savings through competitive bidding."
      },
      submenu: [
        { title: "RFx", path: "/sourcing", active: location.pathname === "/sourcing" },
        { title: "Auctions", path: "/auctions", active: location.pathname === "/auctions" },
      ]
    },
    { 
      title: "Suppliers", 
      icon: Users, 
      path: "/suppliers", 
      active: location.pathname === "/suppliers",
      voiceScripts: {
        what: "This is the Supplier module for managing vendor relationships.",
        how: "Click to view supplier profiles, performance metrics, and risk assessments.",
        decision: "Monitor this section regularly to identify high-performing suppliers for strategic partnerships or spot early warning signs of supplier issues."
      }
    },
    { 
      title: "Inventory", 
      icon: Package, 
      path: "/inventory", 
      active: location.pathname === "/inventory",
      voiceScripts: {
        what: "This is the Inventory module for stock management.",
        how: "Click to track inventory levels, reorder points, and demand planning.",
        decision: "Use this module when making procurement decisions based on current stock levels or to plan for seasonal demand changes."
      }
    },
    { 
      title: "Analytics", 
      icon: BarChart3, 
      path: "/analytics", 
      active: location.pathname === "/analytics",
      voiceScripts: {
        what: "This is the Analytics module for data-driven insights.",
        how: "Click to view spend analysis, supplier performance, and savings opportunities.",
        decision: "Check analytics before major sourcing events to identify negotiation opportunities or to report on departmental spending trends."
      }
    },
    { 
      title: "Contracts", 
      icon: FileCheck, 
      path: "/contracts", 
      active: location.pathname === "/contracts",
      voiceScripts: {
        what: "This is the Contracts module for agreement management.",
        how: "Click to view, create, or modify supplier contracts and track renewals.",
        decision: "Reference this section when creating purchase orders to ensure compliance with negotiated terms and volume discounts."
      }
    },
    { 
      title: "Reports", 
      icon: Clipboard, 
      path: "/reports", 
      active: location.pathname === "/reports",
      voiceScripts: {
        what: "This is the Reports module for customizable data exports.",
        how: "Click to generate reports on spend, compliance, suppliers, and more.",
        decision: "Generate monthly spend reports for budget meetings or supplier scorecards before quarterly business reviews."
      }
    },
    { 
      title: "Admin", 
      icon: Settings, 
      path: "/admin", 
      active: location.pathname === "/admin",
      voiceScripts: {
        what: "This is the Admin module for system configuration.",
        how: "Click to manage users, roles, approval workflows, and system settings.",
        decision: "Access admin functions when onboarding new team members or updating approval thresholds at the start of a new fiscal year."
      }
    },
  ];

  return (
    <div 
      className={cn(
        "h-[calc(100vh-3.5rem)] border-r border-gray-200 bg-white transition-all duration-300 ease-in-out fixed left-0 top-14 z-20",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-2 absolute right-0 top-2 transform translate-x-1/2 z-10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full w-6 h-6 bg-coupa-blue flex items-center justify-center text-white shadow-md hover:bg-coupa-darkblue transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="space-y-1 py-4">
        {menuItems.map((item) => (
          <VoiceElement
            key={item.title}
            whatScript={item.voiceScripts?.what}
            howScript={item.voiceScripts?.how}
            decisionScript={item.voiceScripts?.decision}
            className="px-2"
          >
            <div>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
                  item.active && "bg-blue-50 text-coupa-blue font-medium"
                )}
              >
                <item.icon className={cn("h-5 w-5", item.active ? "text-coupa-blue" : "text-gray-500")} />
                {!collapsed && (
                  <span className="ml-3 transition-opacity duration-200">{item.title}</span>
                )}
              </Link>
              
              {!collapsed && item.submenu && item.submenu.length > 0 && (
                <div className="pl-10 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.path}
                      className={cn(
                        "block py-1.5 px-2 text-sm rounded text-gray-700 hover:bg-gray-100 transition-colors",
                        subItem.active && "text-coupa-blue font-medium"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </VoiceElement>
        ))}
      </div>
    </div>
  );
};
