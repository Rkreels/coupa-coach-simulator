
import React from 'react';
import { MainLayout } from '../components/MainLayout';
import { MyTasksWidget } from '../components/dashboard/MyTasksWidget';

const MyTasks = () => {
  return (
    <MainLayout pageTitle="My Tasks">
      <div className="flex flex-col gap-6">
        <MyTasksWidget />
      </div>
    </MainLayout>
  );
};

export default MyTasks;
