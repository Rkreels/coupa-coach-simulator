
import React from 'react';
import { Bell, HelpCircle, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GlobalSearch } from './GlobalSearch';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const TopBar: React.FC = () => {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center min-w-0 flex-1">
        <Link to="/" className="flex items-center flex-shrink-0">
          <div className="bg-blue-600 rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-blue-600 font-bold text-xl ml-1 hidden sm:inline">coupa</span>
        </Link>
        
        <div className="ml-4 sm:ml-6 flex-1 max-w-md">
          <GlobalSearch />
        </div>
        
        <div className="ml-4 flex-shrink-0">
          <a 
            href="https://skillsim.vercel.app/dashboard" 
            target="_self"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <span className="hidden sm:inline">Master Dashboard</span>
            <span className="sm:hidden">Master</span>
          </a>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
          </Button>
        </Link>
        
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
};
