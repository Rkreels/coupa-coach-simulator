
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

interface TabItem {
  label: string;
  value: string;
  path: string;
}

interface TabsNavigationProps {
  tabs: TabItem[];
  currentPath: string;
  className?: string;
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({ 
  tabs,
  currentPath,
  className
}) => {
  const navigate = useNavigate();
  
  const getActiveTab = () => {
    const activeTab = tabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.value : tabs[0].value;
  };
  
  const handleTabChange = (value: string) => {
    const selectedTab = tabs.find(tab => tab.value === value);
    if (selectedTab) {
      navigate(selectedTab.path);
    }
  };
  
  return (
    <Tabs value={getActiveTab()} onValueChange={handleTabChange} className={className}>
      <TabsList className="bg-gray-100">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-white"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
