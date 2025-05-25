
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import PurchaseOrders from "./pages/PurchaseOrders";
import Auctions from "./pages/Auctions";
import SupplyChain from "./pages/SupplyChain";
import Analytics from "./pages/Analytics";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";
import { TopBar } from "./components/TopBar";
import TopNavigation from "./components/TopNavigation";
import { SecondaryNavigation } from "./components/SecondaryNavigation";
import Community from "./pages/Community";
import Payments from "./pages/Payments";
import Inventory from "./pages/Inventory";
import SpendGuard from "./pages/SpendGuard";
import Setup from "./pages/Setup";
import Requisitions from "./pages/Requisitions";
import TravelExpenses from "./pages/TravelExpenses";
import Forecasts from "./pages/Forecasts";
import Requests from "./pages/Requests";
import Activity from "./pages/Activity";
import Notifications from "./pages/Notifications";
import Suppliers from "./pages/Suppliers";
import Contracts from "./pages/Contracts";
import { VoiceTutorialProvider } from "./contexts/VoiceTutorialContext";
import { VoiceTutorialControls } from "./components/VoiceTutorialControls";

const queryClient = new QueryClient();

// Enhanced navigation configuration with module-specific settings
const getModuleNavigation = (path: string) => {
  const basePath = path.split('/')[1] || '';
  
  const navigationConfig = {
    "/": {
      items: [
        { name: "Dashboard", path: "/", description: "Main dashboard overview" },
        { name: "Recent Activity", path: "/activity", description: "View recent system activity" },
        { name: "Notifications", path: "/notifications", description: "Check notifications and alerts" }
      ],
      showNavigation: true
    },
    "orders": {
      items: [
        { name: "Purchase Orders", path: "/orders", description: "Manage purchase orders" },
        { name: "Requisitions", path: "/requisitions", description: "Handle requisition requests" },
        { name: "Receipts", path: "/receipts", description: "Track receipt confirmations" },
        { name: "Catalogs", path: "/catalogs", description: "Browse supplier catalogs" },
        { name: "Suppliers", path: "/suppliers", description: "Manage supplier relationships" }
      ],
      showNavigation: true
    },
    "suppliers": {
      items: [
        { name: "All Suppliers", path: "/suppliers", description: "View all suppliers" },
        { name: "Onboarding", path: "/suppliers/onboarding", description: "Supplier onboarding process" },
        { name: "Performance", path: "/suppliers/performance", description: "Supplier performance metrics" },
        { name: "Risk Management", path: "/suppliers/risk", description: "Assess supplier risks" }
      ],
      showNavigation: true
    },
    "contracts": {
      items: [
        { name: "All Contracts", path: "/contracts", description: "View all contracts" },
        { name: "Templates", path: "/contracts/templates", description: "Contract templates library" },
        { name: "Approval Workflow", path: "/contracts/approval", description: "Contract approval process" },
        { name: "Reporting", path: "/contracts/reporting", description: "Contract analytics and reports" }
      ],
      showNavigation: true
    },
    "sourcing": {
      items: [
        { name: "Auctions", path: "/sourcing", description: "Manage sourcing auctions" },
        { name: "RFPs", path: "/rfps", description: "Request for proposals" },
        { name: "Contracts", path: "/contracts", description: "Sourcing contracts" },
        { name: "Suppliers", path: "/suppliers", description: "Sourcing suppliers" }
      ],
      showNavigation: true
    },
    "supply-chain": {
      items: [
        { name: "Overview", path: "/supply-chain", description: "Supply chain overview" },
        { name: "Data Management", path: "/supply-chain/data-management", description: "Manage supply chain data" },
        { name: "Data Flows", path: "/supply-chain/data-flows", description: "Monitor data flows" },
        { name: "Model Building", path: "/supply-chain/model-building", description: "Build supply chain models" },
        { name: "Macros", path: "/supply-chain/macros", description: "Automation macros" },
        { name: "Queue Management", path: "/supply-chain/queue", description: "Manage processing queues" },
        { name: "Administration", path: "/supply-chain/admin", description: "System administration" }
      ],
      showNavigation: true
    },
    "analytics": {
      items: [
        { name: "Dashboards", path: "/analytics", description: "Interactive dashboards" },
        { name: "Reports", path: "/analytics/reports", description: "Generated reports" },
        { name: "Data Explorer", path: "/analytics/explorer", description: "Explore data sets" },
        { name: "Settings", path: "/analytics/settings", description: "Analytics configuration" }
      ],
      showNavigation: true
    },
    "invoices": {
      items: [
        { name: "All Invoices", path: "/invoices", description: "View all invoices" },
        { name: "Pending Approval", path: "/invoices/pending", description: "Invoices awaiting approval" },
        { name: "Processing", path: "/invoices/processing", description: "Invoices being processed" },
        { name: "Paid", path: "/invoices/paid", description: "Completed payments" },
        { name: "Disputes", path: "/invoices/disputes", description: "Invoice disputes" }
      ],
      showNavigation: true
    },
    "travel-expenses": {
      items: [
        { name: "Dashboard", path: "/travel-expenses", description: "Travel expenses overview" },
        { name: "Expenses", path: "/travel-expenses/expenses", description: "Expense entries" },
        { name: "Reports", path: "/travel-expenses/reports", description: "Expense reports" },
        { name: "Travel Requests", path: "/travel-expenses/requests", description: "Travel request management" }
      ],
      showNavigation: true
    },
    "community": {
      items: [
        { name: "Home", path: "/community", description: "Community homepage" },
        { name: "Forum", path: "/community/forum", description: "Discussion forums" },
        { name: "Knowledge Base", path: "/community/knowledge", description: "Knowledge articles" },
        { name: "Support", path: "/community/support", description: "Get support" }
      ],
      showNavigation: true
    },
    "payments": {
      items: [
        { name: "Dashboard", path: "/payments", description: "Payments overview" },
        { name: "Processing", path: "/payments/processing", description: "Process payments" },
        { name: "History", path: "/payments/history", description: "Payment history" },
        { name: "Settings", path: "/payments/settings", description: "Payment settings" }
      ],
      showNavigation: true
    },
    "inventory": {
      items: [
        { name: "Dashboard", path: "/inventory", description: "Inventory overview" },
        { name: "Items", path: "/inventory/items", description: "Manage inventory items" },
        { name: "Transactions", path: "/inventory/transactions", description: "Inventory transactions" },
        { name: "Settings", path: "/inventory/settings", description: "Inventory settings" }
      ],
      showNavigation: true
    }
  };

  // For root path, use the root config
  if (path === "/") {
    return navigationConfig["/"];
  }

  // For other paths, find the matching base path
  return navigationConfig[basePath] || { items: [], showNavigation: false };
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navConfig = getModuleNavigation(location.pathname);

  return (
    <>
      <TopBar />
      <TopNavigation />
      {navConfig.showNavigation && (
        <SecondaryNavigation 
          items={navConfig.items}
          backgroundColor="bg-white border-b border-gray-200"
          textColor="text-gray-600"
          activeBackgroundColor="bg-blue-50"
          activeBorderColor="border-blue-500"
        />
      )}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VoiceTutorialProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <AppLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/orders" element={<PurchaseOrders />} />
                <Route path="/requisitions" element={<Requisitions />} />
                <Route path="/sourcing" element={<Auctions />} />
                <Route path="/supply-chain/*" element={<SupplyChain />} />
                <Route path="/analytics/*" element={<Analytics />} />
                <Route path="/invoices/*" element={<Invoices />} />
                <Route path="/community/*" element={<Community />} />
                <Route path="/payments/*" element={<Payments />} />
                <Route path="/inventory/*" element={<Inventory />} />
                <Route path="/spend-guard/*" element={<SpendGuard />} />
                <Route path="/setup/*" element={<Setup />} />
                <Route path="/travel-expenses/*" element={<TravelExpenses />} />
                <Route path="/forecasts/*" element={<Forecasts />} />
                <Route path="/requests/*" element={<Requests />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/suppliers/*" element={<Suppliers />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contracts/*" element={<Contracts />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
            <VoiceTutorialControls />
          </div>
        </VoiceTutorialProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
