
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequisitionsModule } from '../components/modules/RequisitionsModule';
import { RequisitionsNavigation } from '../components/navigation/RequisitionsNavigation';
import CreateRequisitionPage from './requisitions/CreateRequisition';
import MyRequisitionsPage from './requisitions/MyRequisitions';
import { ModulePage } from '../components/ModulePage';

const RequisitionsPage = () => {
  return (
    <div className="w-full">
      <RequisitionsNavigation />
      <Routes>
        <Route path="/" element={<RequisitionsModule />} />
        <Route path="/create" element={<CreateRequisitionPage />} />
        <Route path="/my" element={<MyRequisitionsPage />} />
        <Route path="/pending" element={<ModulePage moduleName="Requisitions" pageTitle="Pending Approval" />} />
        <Route path="/approved" element={<ModulePage moduleName="Requisitions" pageTitle="Approved Requisitions" />} />
        <Route path="/templates" element={<ModulePage moduleName="Requisitions" pageTitle="Requisition Templates" />} />
        <Route path="/shopping" element={<ModulePage moduleName="Requisitions" pageTitle="Shopping Catalogs" />} />
        <Route path="/quick-order" element={<ModulePage moduleName="Requisitions" pageTitle="Quick Order Entry" />} />
      </Routes>
    </div>
  );
};

export default RequisitionsPage;
