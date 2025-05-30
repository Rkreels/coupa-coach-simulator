
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequisitionsModule } from '../components/modules/RequisitionsModule';
import { RequisitionsNavigation } from '../components/navigation/RequisitionsNavigation';

const RequisitionsPage = () => {
  return (
    <div className="w-full">
      <RequisitionsNavigation />
      <Routes>
        <Route path="/*" element={<RequisitionsModule />} />
      </Routes>
    </div>
  );
};

export default RequisitionsPage;
