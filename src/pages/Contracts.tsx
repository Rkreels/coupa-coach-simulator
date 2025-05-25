
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContractsModule } from '../components/modules/ContractsModule';

const ContractsPage = () => {
  return (
    <Routes>
      <Route path="/*" element={<ContractsModule />} />
    </Routes>
  );
};

export default ContractsPage;
