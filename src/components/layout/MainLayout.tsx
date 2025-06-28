
import React from 'react';
import { MainNavigation } from '../MainNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <main>
        {children}
      </main>
    </div>
  );
};
