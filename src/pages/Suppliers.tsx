
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SuppliersNavigation } from '../components/navigation/SuppliersNavigation';
import { AllSuppliersModule } from '../components/modules/AllSuppliersModule';
import ActiveSuppliersPage from './suppliers/ActiveSuppliers';
import PendingSuppliersPage from './suppliers/PendingSuppliers';
import InactiveSuppliersPage from './suppliers/InactiveSuppliers';
import AddSupplierPage from './suppliers/AddSupplier';

const SuppliersPage = () => {
  return (
    <div>
      <SuppliersNavigation />
      <Routes>
        <Route path="/" element={<AllSuppliersModule />} />
        <Route path="/active" element={<ActiveSuppliersPage />} />
        <Route path="/pending" element={<PendingSuppliersPage />} />
        <Route path="/inactive" element={<InactiveSuppliersPage />} />
        <Route path="/add" element={<AddSupplierPage />} />
      </Routes>
    </div>
  );
};

export default SuppliersPage;
