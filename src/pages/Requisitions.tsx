
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequisitionsNavigation } from '../components/navigation/RequisitionsNavigation';
import { RequisitionsModule } from '../components/modules/RequisitionsModule';
import CreateRequisitionPage from './requisitions/CreateRequisition';
import MyRequisitionsPage from './requisitions/MyRequisitions';
import TemplatesPage from './requisitions/Templates';
import PendingApprovalPage from './requisitions/PendingApproval';
import ApprovedRequisitionsPage from './requisitions/ApprovedRequisitions';
import ShoppingCatalogPage from './requisitions/ShoppingCatalog';
import QuickOrderEntryPage from './requisitions/QuickOrderEntry';

const RequisitionsPage = () => {
  return (
    <div>
      <RequisitionsNavigation />
      <Routes>
        <Route path="/" element={<RequisitionsModule />} />
        <Route path="/create" element={<CreateRequisitionPage />} />
        <Route path="/my" element={<MyRequisitionsPage />} />
        <Route path="/pending" element={<PendingApprovalPage />} />
        <Route path="/approved" element={<ApprovedRequisitionsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/shopping" element={<ShoppingCatalogPage />} />
        <Route path="/quick-order" element={<QuickOrderEntryPage />} />
      </Routes>
    </div>
  );
};

export default RequisitionsPage;
