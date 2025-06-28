
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContractsNavigation } from '../components/navigation/ContractsNavigation';
import { AllContractsModule } from '../components/modules/AllContractsModule';
import ActiveContractsPage from './contracts/ActiveContracts';
import PendingContractsPage from './contracts/PendingContracts';
import ExpiredContractsPage from './contracts/ExpiredContracts';
import ContractTemplatesPage from './contracts/ContractTemplates';
import CreateContractPage from './contracts/CreateContract';

const ContractsPage = () => {
  return (
    <div>
      <ContractsNavigation />
      <Routes>
        <Route path="/" element={<AllContractsModule />} />
        <Route path="/active" element={<ActiveContractsPage />} />
        <Route path="/pending" element={<PendingContractsPage />} />
        <Route path="/expired" element={<ExpiredContractsPage />} />
        <Route path="/templates" element={<ContractTemplatesPage />} />
        <Route path="/create" element={<CreateContractPage />} />
      </Routes>
    </div>
  );
};

export default ContractsPage;
