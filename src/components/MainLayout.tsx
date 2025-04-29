
import React from 'react';
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
  return (
    <VoiceTutorialProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <TopNav />
        
        <main className="flex-1 overflow-auto">
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
        
        <VoiceTutorialControls />
      </div>
    </VoiceTutorialProvider>
  );
};
