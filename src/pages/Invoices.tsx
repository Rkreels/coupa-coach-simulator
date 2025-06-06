
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllInvoicesPage from './invoices/AllInvoices';
import PendingInvoicesPage from './invoices/PendingInvoices';
import ProcessingInvoicesPage from './invoices/ProcessingInvoices';
import ApprovedInvoicesPage from './invoices/ApprovedInvoices';
import PaidInvoicesPage from './invoices/PaidInvoices';
import DisputedInvoicesPage from './invoices/DisputedInvoices';
import { ModulePage } from '../components/ModulePage';

const InvoicesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AllInvoicesPage />} />
      <Route path="/pending" element={<PendingInvoicesPage />} />
      <Route path="/processing" element={<ProcessingInvoicesPage />} />
      <Route path="/approved" element={<ApprovedInvoicesPage />} />
      <Route path="/paid" element={<PaidInvoicesPage />} />
      <Route path="/disputes" element={<DisputedInvoicesPage />} />
      <Route path="/credits" element={<ModulePage moduleName="Invoices" pageTitle="Credit Memos" />} />
      <Route path="/matching" element={<ModulePage moduleName="Invoices" pageTitle="Invoice Matching" />} />
    </Routes>
  );
};

export default InvoicesPage;
