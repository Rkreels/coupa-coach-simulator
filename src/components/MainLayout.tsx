
import React from 'react';
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
    <VoiceElement 
      triggerOn="load" 
      whatScript={pageLoadScript}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{pageTitle}</h1>
        {children}
      </div>
    </VoiceElement>
  );
};
