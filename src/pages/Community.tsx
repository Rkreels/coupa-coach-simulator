
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, FileText, HelpCircle, Users, Plus } from 'lucide-react';

const Community = () => {
  return (
    <ApplicationLayout 
      pageTitle="Community"
      pageLoadScript="Welcome to the Coupa Community. Connect with other Coupa users, access knowledge base articles, and get support for your questions."
    >
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search community resources..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
          />
        </div>
        
        <Button 
          className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 
          New Discussion
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card provides access to the community forum."
          howScript="Click to join discussions with other Coupa users."
        >
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <MessageCircle className="h-8 w-8 text-coupa-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">Discussion Forum</h3>
              <p className="text-gray-600 mb-4">Connect with other Coupa users and share best practices.</p>
              <Button variant="outline" size="sm" className="mt-2">
                Browse Discussions
              </Button>
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card provides access to the knowledge base."
          howScript="Click to access guides and documentation."
        >
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Knowledge Base</h3>
              <p className="text-gray-600 mb-4">Access guides, tutorials and best practice documentation.</p>
              <Button variant="outline" size="sm" className="mt-2">
                Browse Articles
              </Button>
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card provides access to support resources."
          howScript="Click to get help with any Coupa issues."
        >
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <HelpCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Support</h3>
              <p className="text-gray-600 mb-4">Get help with any issues or questions about Coupa.</p>
              <Button variant="outline" size="sm" className="mt-2">
                Contact Support
              </Button>
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Recent Discussions</h2>
      <Card className="mb-6">
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-coupa-blue">How to configure approval workflows for complex organizations?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Started by John Smith • {i * 2} replies • Last post 2 days ago
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                        {j}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <h2 className="text-xl font-bold mb-4">Popular Knowledge Articles</h2>
      <Card className="mb-6">
        <div className="divide-y">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 hover:bg-gray-50">
              <h3 className="font-medium text-coupa-blue">Getting Started with Invoice Management</h3>
              <p className="text-sm text-gray-600 mt-1">
                Learn how to set up and optimize your invoice processing workflow.
              </p>
              <div className="mt-2 flex items-center text-sm">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded mr-2">Setup Guide</span>
                <span className="text-gray-500">5 min read</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </ApplicationLayout>
  );
};

export default Community;
