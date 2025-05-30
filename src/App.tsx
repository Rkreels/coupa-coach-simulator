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
import MyTasks from "./pages/MyTasks";
import QuickActions from "./pages/QuickActions";
import { VoiceTutorialProvider } from "./contexts/VoiceTutorialContext";
import { VoiceTutorialControls } from "./components/VoiceTutorialControls";

const queryClient = new QueryClient();

// Enhanced navigation configuration matching Coupa's comprehensive module structure
const getModuleNavigation = (path: string) => {
  const basePath = path.split('/')[1] || '';
  
  const navigationConfig = {
    "/": {
      items: [
        { name: "Dashboard", path: "/", description: "Main dashboard overview" },
        { name: "Recent Activity", path: "/activity", description: "View recent system activity" },
        { name: "Notifications", path: "/notifications", description: "Check notifications and alerts" },
        { name: "My Tasks", path: "/tasks", description: "Personal task management" },
        { name: "Quick Actions", path: "/quick-actions", description: "Frequently used actions" }
      ],
      showNavigation: true
    },
    "tasks": {
      items: [
        { name: "Dashboard", path: "/", description: "Main dashboard overview" },
        { name: "Recent Activity", path: "/activity", description: "View recent system activity" },
        { name: "Notifications", path: "/notifications", description: "Check notifications and alerts" },
        { name: "My Tasks", path: "/tasks", description: "Personal task management" },
        { name: "Quick Actions", path: "/quick-actions", description: "Frequently used actions" }
      ],
      showNavigation: true
    },
    "quick-actions": {
      items: [
        { name: "Dashboard", path: "/", description: "Main dashboard overview" },
        { name: "Recent Activity", path: "/activity", description: "View recent system activity" },
        { name: "Notifications", path: "/notifications", description: "Check notifications and alerts" },
        { name: "My Tasks", path: "/tasks", description: "Personal task management" },
        { name: "Quick Actions", path: "/quick-actions", description: "Frequently used actions" }
      ],
      showNavigation: true
    },
    "requisitions": {
      items: [
        { name: "All Requisitions", path: "/requisitions", description: "View all requisitions" },
        { name: "Create Requisition", path: "/requisitions/create", description: "Create new requisition" },
        { name: "My Requisitions", path: "/requisitions/my", description: "View your requisitions" },
        { name: "Pending Approval", path: "/requisitions/pending", description: "Requisitions awaiting approval" },
        { name: "Approved", path: "/requisitions/approved", description: "Approved requisitions" },
        { name: "Templates", path: "/requisitions/templates", description: "Requisition templates" },
        { name: "Shopping", path: "/requisitions/shopping", description: "Browse catalogs and shop" },
        { name: "Quick Order", path: "/requisitions/quick-order", description: "Quick order entry" }
      ],
      showNavigation: true
    },
    "orders": {
      items: [
        { name: "All Orders", path: "/orders", description: "View all purchase orders" },
        { name: "Create PO", path: "/orders/create", description: "Create new purchase order" },
        { name: "Pending", path: "/orders/pending", description: "Orders pending approval" },
        { name: "Approved", path: "/orders/approved", description: "Approved orders" },
        { name: "Sent", path: "/orders/sent", description: "Orders sent to suppliers" },
        { name: "Receipts", path: "/orders/receipts", description: "Order receipts" },
        { name: "Returns", path: "/orders/returns", description: "Return merchandise" },
        { name: "Order Lines", path: "/orders/lines", description: "Order line items" }
      ],
      showNavigation: true
    },
    "suppliers": {
      items: [
        { name: "All Suppliers", path: "/suppliers", description: "View all suppliers" },
        { name: "Supplier Information", path: "/suppliers/information", description: "Supplier details and info" },
        { name: "Performance", path: "/suppliers/performance", description: "Supplier performance metrics" },
        { name: "Risk Assessment", path: "/suppliers/risk", description: "Supplier risk management" },
        { name: "Onboarding", path: "/suppliers/onboarding", description: "Supplier onboarding process" },
        { name: "Catalogs", path: "/suppliers/catalogs", description: "Supplier catalogs" },
        { name: "Questionnaires", path: "/suppliers/questionnaires", description: "Supplier questionnaires" },
        { name: "Certifications", path: "/suppliers/certifications", description: "Supplier certifications" }
      ],
      showNavigation: true
    },
    "contracts": {
      items: [
        { name: "All Contracts", path: "/contracts", description: "View all contracts" },
        { name: "Create Contract", path: "/contracts/create", description: "Create new contract" },
        { name: "Templates", path: "/contracts/templates", description: "Contract templates" },
        { name: "Pending Approval", path: "/contracts/pending", description: "Contracts awaiting approval" },
        { name: "Active Contracts", path: "/contracts/active", description: "Currently active contracts" },
        { name: "Expiring Soon", path: "/contracts/expiring", description: "Contracts expiring soon" },
        { name: "Amendments", path: "/contracts/amendments", description: "Contract amendments" },
        { name: "Compliance", path: "/contracts/compliance", description: "Contract compliance tracking" }
      ],
      showNavigation: true
    },
    "sourcing": {
      items: [
        { name: "Sourcing Events", path: "/sourcing", description: "All sourcing events" },
        { name: "RFIs", path: "/sourcing/rfis", description: "Request for Information" },
        { name: "RFPs", path: "/sourcing/rfps", description: "Request for Proposals" },
        { name: "RFQs", path: "/sourcing/rfqs", description: "Request for Quotes" },
        { name: "Auctions", path: "/sourcing/auctions", description: "Reverse auctions" },
        { name: "Awards", path: "/sourcing/awards", description: "Sourcing awards" },
        { name: "Savings Tracking", path: "/sourcing/savings", description: "Track sourcing savings" },
        { name: "Event Templates", path: "/sourcing/templates", description: "Sourcing event templates" }
      ],
      showNavigation: true
    },
    "invoices": {
      items: [
        { name: "All Invoices", path: "/invoices", description: "View all invoices" },
        { name: "Pending Approval", path: "/invoices/pending", description: "Invoices awaiting approval" },
        { name: "Processing", path: "/invoices/processing", description: "Invoices being processed" },
        { name: "Approved", path: "/invoices/approved", description: "Approved invoices" },
        { name: "Paid", path: "/invoices/paid", description: "Paid invoices" },
        { name: "Disputes", path: "/invoices/disputes", description: "Invoice disputes" },
        { name: "Credits", path: "/invoices/credits", description: "Credit memos" },
        { name: "Matching", path: "/invoices/matching", description: "Invoice matching" }
      ],
      showNavigation: true
    },
    "payments": {
      items: [
        { name: "Payment Dashboard", path: "/payments", description: "Payments overview" },
        { name: "Payment Runs", path: "/payments/runs", description: "Execute payment runs" },
        { name: "Scheduled Payments", path: "/payments/scheduled", description: "Scheduled payments" },
        { name: "Payment History", path: "/payments/history", description: "Payment transaction history" },
        { name: "Bank Accounts", path: "/payments/accounts", description: "Manage bank accounts" },
        { name: "Payment Methods", path: "/payments/methods", description: "Payment method setup" },
        { name: "Reconciliation", path: "/payments/reconciliation", description: "Payment reconciliation" },
        { name: "Cash Flow", path: "/payments/cash-flow", description: "Cash flow analysis" }
      ],
      showNavigation: true
    },
    "inventory": {
      items: [
        { name: "Inventory Overview", path: "/inventory", description: "Inventory dashboard" },
        { name: "Items", path: "/inventory/items", description: "Manage inventory items" },
        { name: "Stock Levels", path: "/inventory/stock", description: "Current stock levels" },
        { name: "Transactions", path: "/inventory/transactions", description: "Inventory transactions" },
        { name: "Adjustments", path: "/inventory/adjustments", description: "Inventory adjustments" },
        { name: "Locations", path: "/inventory/locations", description: "Warehouse locations" },
        { name: "Cycle Counts", path: "/inventory/cycle-counts", description: "Cycle counting" },
        { name: "Reports", path: "/inventory/reports", description: "Inventory reports" }
      ],
      showNavigation: true
    },
    "spend-guard": {
      items: [
        { name: "Spend Analysis", path: "/spend-guard", description: "Spend analysis dashboard" },
        { name: "Budget Tracking", path: "/spend-guard/budget", description: "Budget tracking and alerts" },
        { name: "Compliance", path: "/spend-guard/compliance", description: "Spend compliance monitoring" },
        { name: "Savings Opportunities", path: "/spend-guard/savings", description: "Identify savings opportunities" },
        { name: "Risk Management", path: "/spend-guard/risk", description: "Spend risk assessment" },
        { name: "Category Analysis", path: "/spend-guard/categories", description: "Spend by category" },
        { name: "Supplier Analysis", path: "/spend-guard/supplier-analysis", description: "Supplier spend analysis" },
        { name: "Reports", path: "/spend-guard/reports", description: "Spend analytics reports" }
      ],
      showNavigation: true
    },
    "analytics": {
      items: [
        { name: "Dashboards", path: "/analytics", description: "Interactive dashboards" },
        { name: "Spend Analytics", path: "/analytics/spend", description: "Spend analysis and reporting" },
        { name: "Supplier Analytics", path: "/analytics/suppliers", description: "Supplier performance analytics" },
        { name: "Contract Analytics", path: "/analytics/contracts", description: "Contract analytics" },
        { name: "Savings Analytics", path: "/analytics/savings", description: "Savings tracking and analysis" },
        { name: "Compliance Reports", path: "/analytics/compliance", description: "Compliance reporting" },
        { name: "Custom Reports", path: "/analytics/custom", description: "Build custom reports" },
        { name: "Data Explorer", path: "/analytics/explorer", description: "Explore data sets" }
      ],
      showNavigation: true
    },
    "travel-expenses": {
      items: [
        { name: "Expense Dashboard", path: "/travel-expenses", description: "Travel expenses overview" },
        { name: "Create Expense", path: "/travel-expenses/create", description: "Create expense report" },
        { name: "My Expenses", path: "/travel-expenses/my", description: "My expense reports" },
        { name: "Pending Reports", path: "/travel-expenses/pending", description: "Reports pending approval" },
        { name: "Travel Requests", path: "/travel-expenses/requests", description: "Travel request management" },
        { name: "Receipts", path: "/travel-expenses/receipts", description: "Receipt management" },
        { name: "Reimbursements", path: "/travel-expenses/reimbursements", description: "Reimbursement tracking" },
        { name: "Policies", path: "/travel-expenses/policies", description: "Travel and expense policies" }
      ],
      showNavigation: true
    },
    "setup": {
      items: [
        { name: "System Setup", path: "/setup", description: "System configuration" },
        { name: "User Management", path: "/setup/users", description: "Manage users and roles" },
        { name: "Approval Workflows", path: "/setup/workflows", description: "Configure approval workflows" },
        { name: "Custom Fields", path: "/setup/fields", description: "Custom field configuration" },
        { name: "Integrations", path: "/setup/integrations", description: "System integrations" },
        { name: "Notifications", path: "/setup/notifications", description: "Notification settings" },
        { name: "Security", path: "/setup/security", description: "Security settings" },
        { name: "Data Management", path: "/setup/data", description: "Data import/export tools" }
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
                <Route path="/tasks" element={<MyTasks />} />
                <Route path="/quick-actions" element={<QuickActions />} />
                <Route path="/orders" element={<PurchaseOrders />} />
                <Route path="/orders/*" element={<PurchaseOrders />} />
                <Route path="/requisitions" element={<Requisitions />} />
                <Route path="/requisitions/*" element={<Requisitions />} />
                <Route path="/sourcing" element={<Auctions />} />
                <Route path="/sourcing/*" element={<Auctions />} />
                <Route path="/supply-chain/*" element={<SupplyChain />} />
                <Route path="/analytics/*" element={<Analytics />} />
                <Route path="/invoices" element={<Invoices />} />
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
