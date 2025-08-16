import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plane, User, LogOut, BookOpen } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Plane className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">SkyBook</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-blue-600"
          >
            Flights
          </Button>
          {user && (
            <Button 
              variant="ghost" 
              onClick={() => navigate('/bookings')}
              className="text-gray-600 hover:text-blue-600"
            >
              My Bookings
            </Button>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/bookings')}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-gray-600"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}