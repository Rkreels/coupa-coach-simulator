
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { VoiceTutorialControls } from './VoiceTutorialControls';
import { VoiceTutorialProvider } from '../contexts/VoiceTutorialContext';
import { VoiceElement } from './VoiceElement';

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageLoadScript?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  pageTitle,
  pageLoadScript
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <VoiceTutorialProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <TopNav />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          
          <main className={`flex-1 overflow-auto transition-all duration-200 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <VoiceElement 
              triggerOn="load" 
              whatScript={pageLoadScript}
            >
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">{pageTitle}</h1>
                {children}
              </div>
            </VoiceElement>
          </main>
        </div>
        
        <VoiceTutorialControls />
      </div>
    </VoiceTutorialProvider>
  );
};
