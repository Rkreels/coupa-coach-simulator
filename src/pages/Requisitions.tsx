
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModulePage } from '../components/ModulePage';

const RequisitionsPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const getPageTitle = (path: string) => {
    if (path.includes('/my')) return 'My Requisitions';
    if (path.includes('/pending')) return 'Pending Approval';
    if (path.includes('/approved')) return 'Approved Requisitions';
    if (path.includes('/templates')) return 'Requisition Templates';
    if (path.includes('/shopping')) return 'Shopping & Catalogs';
    if (path.includes('/quick-order')) return 'Quick Order';
    return 'Create Requisition';
  };

  return (
    <Routes>
      <Route path="/" element={
        <ModulePage 
          moduleName="requisitions" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
      <Route path="/*" element={
        <ModulePage 
          moduleName="requisitions" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
    </Routes>
  );
};

export default RequisitionsPage;
