import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for authentication
const demoUsers = [
  { id: '1', email: 'admin', password: 'Admin@123', name: 'Administrator' },
  { id: '2', email: 'admin@flight.com', password: 'Admin@123', name: 'Admin User' },
  { id: '3', email: 'demo@user.com', password: 'password123', name: 'Demo User' }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app start
    const storedUser = localStorage.getItem('flightBookingUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => 
      (u.email === email || u.email === 'admin') && u.password === password
    );
    
    if (foundUser) {
      const userObj = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name
      };
      setUser(userObj);
      localStorage.setItem('flightBookingUser', JSON.stringify(userObj));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const googleUser = {
      id: 'google-' + Date.now(),
      email: 'user@gmail.com',
      name: 'Google User'
    };
    
    setUser(googleUser);
    localStorage.setItem('flightBookingUser', JSON.stringify(googleUser));
    setLoading(false);
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = demoUsers.find(u => u.email === email);
    if (existingUser) {
      setLoading(false);
      return false;
    }
    
    const newUser = {
      id: 'user-' + Date.now(),
      email,
      name
    };
    
    setUser(newUser);
    localStorage.setItem('flightBookingUser', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flightBookingUser');
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}