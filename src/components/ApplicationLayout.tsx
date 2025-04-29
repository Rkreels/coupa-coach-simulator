
import React from 'react';
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
    <>
      <VoiceElement 
        triggerOn="load" 
        whatScript={pageLoadScript}
      >
        <div className="p-4">
          {pageTitle && <h1 className="text-2xl font-bold text-gray-800 mb-4">{pageTitle}</h1>}
          {children}
        </div>
      </VoiceElement>
    </>
  );
};
