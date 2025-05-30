
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllOrdersPage from './orders/AllOrders';
import CreateOrderPage from './orders/CreateOrder';
import PendingOrdersPage from './orders/PendingOrders';
import ApprovedOrdersPage from './orders/ApprovedOrders';
import { ModulePage } from '../components/ModulePage';

const OrdersPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AllOrdersPage />} />
      <Route path="/create" element={<CreateOrderPage />} />
      <Route path="/pending" element={<PendingOrdersPage />} />
      <Route path="/approved" element={<ApprovedOrdersPage />} />
      <Route path="/sent" element={<ModulePage moduleName="Orders" pageTitle="Sent Orders" />} />
      <Route path="/receipts" element={<ModulePage moduleName="Orders" pageTitle="Order Receipts" />} />
      <Route path="/returns" element={<ModulePage moduleName="Orders" pageTitle="Returns" />} />
      <Route path="/lines" element={<ModulePage moduleName="Orders" pageTitle="Order Lines" />} />
    </Routes>
  );
};

export default OrdersPage;
