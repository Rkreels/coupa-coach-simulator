
import React from 'react';
import { MainLayout } from '../components/MainLayout';
import { QuickActionsWidget } from '../components/dashboard/QuickActionsWidget';

const QuickActions = () => {
  return (
    <MainLayout pageTitle="Quick Actions">
      <div className="flex flex-col gap-6">
        <QuickActionsWidget />
      </div>
    </MainLayout>
  );
};

export default QuickActions;
