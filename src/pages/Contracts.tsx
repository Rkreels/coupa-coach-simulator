
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContractsNavigation } from '../components/navigation/ContractsNavigation';
import { AllContractsModule } from '../components/modules/AllContractsModule';

const ContractsPage = () => {
  return (
    <div>
      <ContractsNavigation />
      <Routes>
        <Route path="/*" element={<AllContractsModule />} />
      </Routes>
    </div>
  );
};

export default ContractsPage;
