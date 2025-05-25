
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModulePage } from '../components/ModulePage';

const ContractsPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const getPageTitle = (path: string) => {
    if (path.includes('/create')) return 'Create Contract';
    if (path.includes('/templates')) return 'Contract Templates';
    if (path.includes('/pending')) return 'Pending Approval';
    if (path.includes('/active')) return 'Active Contracts';
    if (path.includes('/expiring')) return 'Expiring Contracts';
    if (path.includes('/amendments')) return 'Contract Amendments';
    if (path.includes('/compliance')) return 'Contract Compliance';
    return 'All Contracts';
  };

  return (
    <Routes>
      <Route path="/" element={
        <ModulePage 
          moduleName="contracts" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
      <Route path="/*" element={
        <ModulePage 
          moduleName="contracts" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
    </Routes>
  );
};

export default ContractsPage;
