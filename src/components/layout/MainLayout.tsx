
import React from 'react';
import { TopNavigation } from '../TopNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
