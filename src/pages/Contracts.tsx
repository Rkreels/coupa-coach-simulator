
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AllContractsModule } from '../components/modules/AllContractsModule';

const ContractsPage = () => {
  return (
    <Routes>
      <Route path="/*" element={<AllContractsModule />} />
    </Routes>
  );
};

export default ContractsPage;
