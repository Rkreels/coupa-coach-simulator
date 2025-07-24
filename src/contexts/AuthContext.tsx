import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  avatar?: string;
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdDate: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users with different roles and permissions
const mockUsers: User[] = [
  {
    id: 'usr-001',
    username: 'admin',
    email: 'admin@company.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'System Administrator',
    department: 'IT',
    permissions: ['*'], // All permissions
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: 'usr-002',
    username: 'manager',
    email: 'manager@company.com',
    firstName: 'John',
    lastName: 'Manager',
    role: 'Procurement Manager',
    department: 'Procurement',
    permissions: [
      'requisitions.create', 'requisitions.approve', 'requisitions.view_all',
      'suppliers.create', 'suppliers.edit', 'suppliers.view_all',
      'contracts.create', 'contracts.approve', 'contracts.view_all',
      'invoices.approve', 'invoices.view_all',
      'orders.create', 'orders.approve', 'orders.view_all',
      'reports.view_all', 'analytics.view'
    ],
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: 'usr-003',
    username: 'buyer',
    email: 'buyer@company.com',
    firstName: 'Jane',
    lastName: 'Buyer',
    role: 'Buyer',
    department: 'Procurement',
    permissions: [
      'requisitions.create', 'requisitions.view_own',
      'suppliers.view_all',
      'contracts.view_all',
      'orders.create', 'orders.view_own',
      'invoices.view_own'
    ],
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: 'usr-004',
    username: 'employee',
    email: 'employee@company.com',
    firstName: 'Bob',
    lastName: 'Employee',
    role: 'Employee',
    department: 'Marketing',
    permissions: [
      'requisitions.create', 'requisitions.view_own',
      'suppliers.view_public',
      'orders.view_own'
    ],
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: 'usr-005',
    username: 'finance',
    email: 'finance@company.com',
    firstName: 'Sarah',
    lastName: 'Finance',
    role: 'Finance Manager',
    department: 'Finance',
    permissions: [
      'requisitions.view_all', 'requisitions.approve',
      'invoices.create', 'invoices.approve', 'invoices.view_all',
      'orders.view_all',
      'contracts.view_all',
      'reports.view_all', 'analytics.view',
      'payments.create', 'payments.approve'
    ],
    isActive: true,
    createdDate: '2024-01-01'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const foundUser = mockUsers.find(u => u.username === username && u.isActive);
    
    if (foundUser && (password === 'password' || password === username)) {
      const userWithLogin = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      };
      
      setUser(userWithLogin);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithLogin));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  const switchUser = (userId: string) => {
    const foundUser = mockUsers.find(u => u.id === userId);
    if (foundUser) {
      const userWithLogin = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      };
      setUser(userWithLogin);
      localStorage.setItem('currentUser', JSON.stringify(userWithLogin));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    hasPermission,
    hasRole,
    switchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};