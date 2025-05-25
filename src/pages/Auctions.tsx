
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SourcingModule } from '../components/modules/SourcingModule';

const AuctionsPage = () => {
  return (
    <Routes>
      <Route path="/*" element={<SourcingModule />} />
    </Routes>
  );
};

export default AuctionsPage;
