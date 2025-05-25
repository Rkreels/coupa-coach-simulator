
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModulePage } from '../components/ModulePage';

const AuctionsPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const getPageTitle = (path: string) => {
    if (path.includes('/rfis')) return 'Request for Information';
    if (path.includes('/rfps')) return 'Request for Proposals';
    if (path.includes('/rfqs')) return 'Request for Quotes';
    if (path.includes('/auctions')) return 'Reverse Auctions';
    if (path.includes('/awards')) return 'Sourcing Awards';
    if (path.includes('/savings')) return 'Savings Tracking';
    if (path.includes('/templates')) return 'Event Templates';
    return 'Sourcing Events';
  };

  return (
    <Routes>
      <Route path="/" element={
        <ModulePage 
          moduleName="sourcing" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
      <Route path="/*" element={
        <ModulePage 
          moduleName="sourcing" 
          pageTitle={getPageTitle(path)}
          subModuleName={path.split('/').pop()}
        />
      } />
    </Routes>
  );
};

export default AuctionsPage;
