
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SuppliersModule } from '../components/modules/SuppliersModule';

const SuppliersPage = () => {
  return (
    <Routes>
      <Route path="/*" element={<SuppliersModule />} />
    </Routes>
  );
};

export default SuppliersPage;
