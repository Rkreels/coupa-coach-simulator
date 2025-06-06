
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SuppliersNavigation } from '../components/navigation/SuppliersNavigation';
import { AllSuppliersModule } from '../components/modules/AllSuppliersModule';

const SuppliersPage = () => {
  return (
    <div>
      <SuppliersNavigation />
      <Routes>
        <Route path="/*" element={<AllSuppliersModule />} />
      </Routes>
    </div>
  );
};

export default SuppliersPage;
