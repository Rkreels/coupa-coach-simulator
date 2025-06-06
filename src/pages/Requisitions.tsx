
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequisitionsModule } from '../components/modules/RequisitionsModule';
import CreateRequisitionPage from './requisitions/CreateRequisition';
import MyRequisitionsPage from './requisitions/MyRequisitions';
import TemplatesPage from './requisitions/Templates';
import { ModulePage } from '../components/ModulePage';

const RequisitionsPage = () => {
  return (
    <Routes>
      <Route path="/" element={<RequisitionsModule />} />
      <Route path="/create" element={<CreateRequisitionPage />} />
      <Route path="/my" element={<MyRequisitionsPage />} />
      <Route path="/pending" element={<ModulePage moduleName="Requisitions" pageTitle="Pending Approval" />} />
      <Route path="/approved" element={<ModulePage moduleName="Requisitions" pageTitle="Approved Requisitions" />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/shopping" element={<ModulePage moduleName="Requisitions" pageTitle="Shopping Catalogs" />} />
      <Route path="/quick-order" element={<ModulePage moduleName="Requisitions" pageTitle="Quick Order Entry" />} />
    </Routes>
  );
};

export default RequisitionsPage;
