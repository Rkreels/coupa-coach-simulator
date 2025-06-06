
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AllSuppliersModule } from '../components/modules/AllSuppliersModule';

const SuppliersPage = () => {
  return (
    <Routes>
      <Route path="/*" element={<AllSuppliersModule />} />
    </Routes>
  );
};

export default SuppliersPage;
