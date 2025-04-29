
import React from 'react';
import { TopBar } from './TopBar';
import { TopNavigation } from './TopNavigation';
import { VoiceTutorialControls } from './VoiceTutorialControls';
import { VoiceTutorialProvider } from '../contexts/VoiceTutorialContext';
import { VoiceElement } from './VoiceElement';

interface ApplicationLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageLoadScript?: string;
}

export const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ 
  children, 
  pageTitle,
  pageLoadScript
}) => {
  return (
    <VoiceTutorialProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-1 overflow-auto">
          <VoiceElement 
            triggerOn="load" 
            whatScript={pageLoadScript}
          >
            <div className="p-4">
              {pageTitle && <h1 className="text-2xl font-bold text-gray-800 mb-4">{pageTitle}</h1>}
              {children}
            </div>
          </VoiceElement>
        </main>
        
        <VoiceTutorialControls />
      </div>
    </VoiceTutorialProvider>
  );
};
