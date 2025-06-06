
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { InvoicesNavigation } from '../components/navigation/InvoicesNavigation';
import { AllInvoicesModule } from '../components/modules/AllInvoicesModule';
import PendingInvoicesPage from './invoices/PendingInvoices';
import ApprovedInvoicesPage from './invoices/ApprovedInvoices';
import ProcessingInvoicesPage from './invoices/ProcessingInvoices';
import PaidInvoicesPage from './invoices/PaidInvoices';
import DisputedInvoicesPage from './invoices/DisputedInvoices';

const InvoicesPage = () => {
  return (
    <div>
      <InvoicesNavigation />
      <Routes>
        <Route path="/" element={<AllInvoicesModule />} />
        <Route path="/pending" element={<PendingInvoicesPage />} />
        <Route path="/approved" element={<ApprovedInvoicesPage />} />
        <Route path="/processing" element={<ProcessingInvoicesPage />} />
        <Route path="/paid" element={<PaidInvoicesPage />} />
        <Route path="/disputed" element={<DisputedInvoicesPage />} />
      </Routes>
    </div>
  );
};

export default InvoicesPage;
