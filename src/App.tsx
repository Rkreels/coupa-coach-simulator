
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
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
import CompanyProfile from './pages/setup/CompanyProfile';
import UsersRoles from './pages/setup/UsersRoles';
import Departments from './pages/setup/Departments';
import ApprovalWorkflows from './pages/setup/ApprovalWorkflows';
import PaymentMethods from './pages/setup/PaymentMethods';
import ApprovalsPage from './pages/Approvals';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <ProtectedRoute>
            <MainLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/requisitions/*" element={
                  <ProtectedRoute requiredPermission="requisitions.view_own">
                    <RequisitionsPage />
                  </ProtectedRoute>
                } />
                <Route path="/orders/*" element={
                  <ProtectedRoute requiredPermission="orders.view_own">
                    <OrdersPage />
                  </ProtectedRoute>
                } />
                <Route path="/invoices/*" element={
                  <ProtectedRoute requiredPermission="invoices.view_own">
                    <InvoicesPage />
                  </ProtectedRoute>
                } />
                <Route path="/suppliers/*" element={
                  <ProtectedRoute requiredPermission="suppliers.view_public">
                    <SuppliersPage />
                  </ProtectedRoute>
                } />
                <Route path="/contracts/*" element={
                  <ProtectedRoute requiredPermission="contracts.view_all">
                    <ContractsPage />
                  </ProtectedRoute>
                } />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/spend-guard" element={<SpendGuardPage />} />
                <Route path="/supply-chain" element={<SupplyChainPage />} />
        <Route path="/setup/*" element={
          <ProtectedRoute requiredRole="System Administrator">
            <Routes>
              <Route path="/" element={<SetupPage />} />
              <Route path="/company-profile" element={<CompanyProfile />} />
              <Route path="/users-roles" element={<UsersRoles />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/approval-workflows" element={<ApprovalWorkflows />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
            </Routes>
          </ProtectedRoute>
        } />
                <Route path="/approvals" element={<ApprovalsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
