import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { SetupNavigation } from '../components/navigation/SetupNavigation';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Settings, Users, CreditCard, FileText, CheckCircle } from 'lucide-react';

const Setup = () => {
  return (
    <ApplicationLayout 
      pageTitle="Setup"
      pageLoadScript="Welcome to the Setup area. Here you can configure your Coupa instance, manage users, and customize settings for various modules."
    >
      <SetupNavigation />
      
      <div className="mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Find settings..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <VoiceElement
          whatScript="This section allows you to manage company-wide settings."
          howScript="Access settings for organization profiles, branding, and global preferences."
        >
          <Card className="p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Settings className="h-6 w-6 lg:h-8 lg:w-8 text-coupa-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">General Settings</h3>
              <p className="text-gray-600 mb-4 text-sm">Configure company information, branding, and global preferences.</p>
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Setup complete</span>
              </div>
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This section allows you to manage user accounts and permissions."
          howScript="Set up users, roles, and access controls for your organization."
        >
          <Card className="p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Users & Permissions</h3>
              <p className="text-gray-600 mb-4 text-sm">Manage users, roles, departments, and access controls.</p>
              <div className="flex items-center justify-center gap-2 text-yellow-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>8 tasks pending</span>
              </div>
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This section allows you to configure payment methods and financial settings."
          howScript="Set up payment providers, currencies, and tax configurations."
        >
          <Card className="p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CreditCard className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
              <p className="text-gray-600 mb-4 text-sm">Configure payment providers, currencies, and tax settings.</p>
              <div className="flex items-center justify-center gap-2 text-yellow-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>2 tasks pending</span>
              </div>
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Module Configuration</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {[
          { name: "Procurement", icon: <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-coupa-blue" />, status: "Complete" },
          { name: "Invoicing", icon: <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-coupa-blue" />, status: "Complete" },
          { name: "Expense Management", icon: <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-coupa-blue" />, status: "Setup Required" },
          { name: "Sourcing", icon: <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-coupa-blue" />, status: "In Progress" },
          { name: "Contracts", icon: <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-coupa-blue" />, status: "Setup Required" },
          { name: "Supplier Management", icon: <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-coupa-blue" />, status: "Complete" }
        ].map((module, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full mr-4">
                {module.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{module.name}</h3>
                <p className={`text-sm ${
                  module.status === "Complete" ? "text-green-600" :
                  module.status === "In Progress" ? "text-yellow-600" : "text-red-600"
                }`}>
                  {module.status}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="ml-2 shrink-0">
                Configure
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <h2 className="text-xl font-bold mb-4">Integration Settings</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {[
          { name: "SAP ERP", status: "Connected", lastSync: "2 hours ago" },
          { name: "Salesforce", status: "Connected", lastSync: "1 day ago" },
          { name: "Oracle NetSuite", status: "Not Connected", lastSync: "Never" },
          { name: "Workday", status: "Connected", lastSync: "5 hours ago" },
          { name: "Microsoft Dynamics", status: "Connection Error", lastSync: "Failed" },
          { name: "Custom API", status: "Connected", lastSync: "1 hour ago" }
        ].map((integration, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3 lg:mr-4 text-xs lg:text-sm font-medium">
                {integration.name.substring(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{integration.name}</h3>
                <p className={`text-xs ${
                  integration.status === "Connected" ? "text-green-600" :
                  integration.status === "Not Connected" ? "text-gray-600" : "text-red-600"
                }`}>
                  {integration.status} • Last sync: {integration.lastSync}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="ml-2 shrink-0">
                Configure
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </ApplicationLayout>
  );
};

export default Setup;
