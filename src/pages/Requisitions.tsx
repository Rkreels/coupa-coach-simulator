
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequisitionsModule } from '../components/modules/RequisitionsModule';

const RequisitionsPage = () => {
  return (
    <Routes>
      <Route path="/*" element={<RequisitionsModule />} />
    </Routes>
  );
};

export default RequisitionsPage;
