
import React from 'react';
import { Search, Bell, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceElement } from './VoiceElement';

export const TopBar: React.FC = () => {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <div className="bg-coupa-blue rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-coupa-blue font-bold text-xl ml-1">coupa</span>
        </a>
        
        <div className="ml-6 relative flex-grow w-80">
          <VoiceElement
            whatScript="This is the global search bar. You can search for anything across the platform."
            howScript="Type keywords and press Enter to search across all modules."
          >
            <div className="relative">
              <input
                type="text"
                placeholder="What do you need?"
                className="pl-3 pr-9 py-1.5 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </VoiceElement>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <VoiceElement
          whatScript="This button shows your profile information."
          howScript="Click to access your profile settings and account options."
        >
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This notification bell shows your alerts."
          howScript="Click to see pending items and notifications."
        >
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
          </Button>
        </VoiceElement>
        
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
};
