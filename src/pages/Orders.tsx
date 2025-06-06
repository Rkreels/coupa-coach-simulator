
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OrdersNavigation } from '../components/navigation/OrdersNavigation';
import { AllOrdersModule } from '../components/modules/AllOrdersModule';
import PendingOrdersPage from './orders/PendingOrders';
import ApprovedOrdersPage from './orders/ApprovedOrders';
import SentOrdersPage from './orders/SentOrders';
import ReceivedOrdersPage from './orders/ReceivedOrders';
import CreateOrderPage from './orders/CreateOrder';

const OrdersPage = () => {
  return (
    <div>
      <OrdersNavigation />
      <Routes>
        <Route path="/" element={<AllOrdersModule />} />
        <Route path="/pending" element={<PendingOrdersPage />} />
        <Route path="/approved" element={<ApprovedOrdersPage />} />
        <Route path="/sent" element={<SentOrdersPage />} />
        <Route path="/received" element={<ReceivedOrdersPage />} />
        <Route path="/create" element={<CreateOrderPage />} />
      </Routes>
    </div>
  );
};

export default OrdersPage;
