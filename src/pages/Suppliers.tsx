
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModulePage } from '../components/ModulePage';

const SuppliersPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const getPageTitle = (path: string) => {
    if (path.includes('/information')) return 'Supplier Information';
    if (path.includes('/performance')) return 'Supplier Performance';
    if (path.includes('/risk')) return 'Risk Assessment';
    if (path.includes('/onboarding')) return 'Supplier Onboarding';
    if (path.includes('/catalogs')) return 'Supplier Catalogs';
    if (path.includes('/questionnaires')) return 'Supplier Questionnaires';
    if (path.includes('/certifications')) return 'Supplier Certifications';
    return 'All Suppliers';
  };

  return (
    <Routes>
      <Route path="/" element={
        <ModulePage 
          moduleName="suppliers" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
      <Route path="/*" element={
        <ModulePage 
          moduleName="suppliers" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
    </Routes>
  );
};

export default SuppliersPage;
