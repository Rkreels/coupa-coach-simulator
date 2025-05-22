
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

// Define navigation menus for each section
const getSecondaryNavItems = (path: string) => {
  switch (path) {
    case "/orders":
      return [
        { name: "Purchase Orders", path: "/orders" },
        { name: "Requisitions", path: "/requisitions" },
        { name: "Receipts", path: "/receipts" },
        { name: "Catalogs", path: "/catalogs" },
        { name: "Suppliers", path: "/suppliers" }
      ];
    case "/sourcing":
      return [
        { name: "Auctions", path: "/sourcing" },
        { name: "RFPs", path: "/rfps" },
        { name: "Contracts", path: "/contracts" },
        { name: "Suppliers", path: "/suppliers" }
      ];
    case "/supply-chain":
      return [
        { name: "Home", path: "/supply-chain/home" },
        { name: "Data Management", path: "/supply-chain/data-management" },
        { name: "Data Flows", path: "/supply-chain/data-flows" },
        { name: "Model Building", path: "/supply-chain/model-building" },
        { name: "Macros", path: "/supply-chain/macros" },
        { name: "Data Visualizations", path: "/supply-chain" },
        { name: "Queue Management", path: "/supply-chain/queue" },
        { name: "Administration", path: "/supply-chain/admin" }
      ];
    case "/analytics":
      return [
        { name: "Dashboards", path: "/analytics" },
        { name: "Reports", path: "/analytics/reports" },
        { name: "Data Explorer", path: "/analytics/explorer" },
        { name: "Settings", path: "/analytics/settings" }
      ];
    case "/invoices":
      return [
        { name: "All Invoices", path: "/invoices" },
        { name: "Pending Approval", path: "/invoices/pending" },
        { name: "Processing", path: "/invoices/processing" },
        { name: "Paid", path: "/invoices/paid" },
        { name: "Disputes", path: "/invoices/disputes" }
      ];
    case "/":
      return [
        { name: "Dashboard", path: "/" },
        { name: "Recent Activity", path: "/activity" },
        { name: "Notifications", path: "/notifications" }
      ];
    case "/travel-expenses":
      return [
        { name: "Dashboard", path: "/travel-expenses" },
        { name: "Expenses", path: "/travel-expenses/expenses" },
        { name: "Reports", path: "/travel-expenses/reports" },
        { name: "Travel Requests", path: "/travel-expenses/requests" }
      ];
    case "/community":
      return [
        { name: "Home", path: "/community" },
        { name: "Forum", path: "/community/forum" },
        { name: "Knowledge Base", path: "/community/knowledge" },
        { name: "Support", path: "/community/support" }
      ];
    case "/payments":
      return [
        { name: "Dashboard", path: "/payments" },
        { name: "Processing", path: "/payments/processing" },
        { name: "History", path: "/payments/history" },
        { name: "Settings", path: "/payments/settings" }
      ];
    case "/inventory":
      return [
        { name: "Dashboard", path: "/inventory" },
        { name: "Items", path: "/inventory/items" },
        { name: "Transactions", path: "/inventory/transactions" },
        { name: "Settings", path: "/inventory/settings" }
      ];
    default:
      return [];
  }
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const path = window.location.pathname;
  const basePathMatch = path.match(/^\/[^/]*/);
  const basePath = basePathMatch ? basePathMatch[0] : "/";
  
  const navItems = getSecondaryNavItems(basePath);

  return (
    <>
      <TopBar />
      <TopNavigation />
      <SecondaryNavigation items={navItems} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
