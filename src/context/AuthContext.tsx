import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/flight';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ADMIN_CREDENTIALS = {
  email: 'admin@skybook.com',
  password: 'Admin@123',
  name: 'Admin User'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const savedUser = localStorage.getItem('skybook_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Admin login
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: 'admin-001',
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email
      };
      setUser(adminUser);
      localStorage.setItem('skybook_user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }

    // Regular user login (check localStorage for registered users)
    const registeredUsers = JSON.parse(localStorage.getItem('skybook_registered_users') || '[]');
    const foundUser = registeredUsers.find((u: { email: string; password: string }) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('skybook_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    const registeredUsers = JSON.parse(localStorage.getItem('skybook_registered_users') || '[]');
    
    // Check if user already exists
    if (registeredUsers.find((u: { email: string }) => u.email === email)) {
      setIsLoading(false);
      return false;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password // In real app, this should be hashed
    };

    registeredUsers.push(newUser);
    localStorage.setItem('skybook_registered_users', JSON.stringify(registeredUsers));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('skybook_user', JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
    return true;
  };

  const googleLogin = async (): Promise<void> => {
    // Simulate Google OAuth login
    const googleUser: User = {
      id: `google-${Date.now()}`,
      name: 'Google User',
      email: 'user@gmail.com'
    };
    
    setUser(googleUser);
    localStorage.setItem('skybook_user', JSON.stringify(googleUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skybook_user');
  };

  const value = {
    user,
    login,
    register,
    googleLogin,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};