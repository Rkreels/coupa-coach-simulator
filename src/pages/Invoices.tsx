
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllInvoicesPage from './invoices/AllInvoices';
import { ModulePage } from '../components/ModulePage';

const InvoicesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AllInvoicesPage />} />
      <Route path="/pending" element={<ModulePage moduleName="Invoices" pageTitle="Pending Approval" />} />
      <Route path="/processing" element={<ModulePage moduleName="Invoices" pageTitle="Processing" />} />
      <Route path="/approved" element={<ModulePage moduleName="Invoices" pageTitle="Approved Invoices" />} />
      <Route path="/paid" element={<ModulePage moduleName="Invoices" pageTitle="Paid Invoices" />} />
      <Route path="/disputes" element={<ModulePage moduleName="Invoices" pageTitle="Invoice Disputes" />} />
      <Route path="/credits" element={<ModulePage moduleName="Invoices" pageTitle="Credit Memos" />} />
      <Route path="/matching" element={<ModulePage moduleName="Invoices" pageTitle="Invoice Matching" />} />
    </Routes>
  );
};

export default InvoicesPage;
