
import React from 'react';
import { Bell, HelpCircle, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceElement } from './VoiceElement';

export const TopNav: React.FC = () => {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-2">
          <div className="bg-coupa-blue rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-coupa-blue font-bold text-xl">Coupa</span>
          <span className="text-gray-500 text-xs mt-1">Training</span>
        </a>
      </div>
      
      <div className="flex-1 max-w-xl ml-8">
        <VoiceElement
          whatScript="This is the global search bar. You can search for anything across the platform, including requisitions, suppliers, and invoices."
          howScript="Type keywords like 'office supplies' or 'ACME Inc.' and press Enter to search across all modules."
          decisionScript="Use specific search terms for better results. Search for 'PO-2023-001' to find a specific purchase order or 'pending approval' to see all items waiting for your review."
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search across all modules..."
              className="pl-10 pr-4 py-1.5 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
        </VoiceElement>
      </div>
      
      <div className="flex items-center space-x-4">
        <VoiceElement
          whatScript="This bell icon shows your notifications."
          howScript="Click to see alerts about pending approvals, received goods, or invoice issues."
          decisionScript="Check notifications at the start of your day to prioritize urgent approvals and avoid workflow bottlenecks."
        >
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This is the help button for accessing support resources."
          howScript="Click to see tutorials, documentation, and contact information for the support team."
          decisionScript="Use the help center for initial troubleshooting, but for urgent approval issues, contact the support team directly through the emergency number."
        >
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button>
        </VoiceElement>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>
        
        <div className="flex items-center border-l border-gray-200 pl-4 ml-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full p-1">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-sm font-medium">John Smith</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
