
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
import NotFound from "./pages/NotFound";
import { TopBar } from "./components/TopBar";
import { TopNavigation } from "./components/TopNavigation";
import { SecondaryNavigation } from "./components/SecondaryNavigation";

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
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/orders" element={<PurchaseOrders />} />
            <Route path="/sourcing" element={<Auctions />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
