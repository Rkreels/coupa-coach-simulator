
import React from 'react';
import TopNavigation from '../TopNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <main>
        {children}
      </main>
    </div>
  );
};
