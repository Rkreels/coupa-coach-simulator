
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Toaster } from '@/components/ui/toaster';
import DashboardPage from './pages/Dashboard';
import RequisitionsPage from './pages/Requisitions';
import OrdersPage from './pages/Orders';
import InvoicesPage from './pages/Invoices';
import SuppliersPage from './pages/Suppliers';
import ContractsPage from './pages/Contracts';
import InventoryPage from './pages/Inventory';
import SpendGuardPage from './pages/SpendGuard';
import SupplyChainPage from './pages/SupplyChain';
import SetupPage from './pages/Setup';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/requisitions/*" element={<RequisitionsPage />} />
            <Route path="/orders/*" element={<OrdersPage />} />
            <Route path="/invoices/*" element={<InvoicesPage />} />
            <Route path="/suppliers/*" element={<SuppliersPage />} />
            <Route path="/contracts/*" element={<ContractsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/spend-guard" element={<SpendGuardPage />} />
            <Route path="/supply-chain" element={<SupplyChainPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
