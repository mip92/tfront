'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import { MobileMenuButton } from './Sidebar';

interface HeaderProps {
  onSidebarOpen: () => void;
}

export default function Header({ onSidebarOpen }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-x-hidden">
      <div className="w-full flex h-14 items-center px-4 sm:px-6 lg:px-8 min-w-0">
        <MobileMenuButton onOpen={onSidebarOpen} />

        <div className="flex mr-4 min-w-0 flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">T</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 min-w-0">
          <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 min-w-0">
                <div className="hidden sm:flex items-center space-x-2 text-sm min-w-0">
                  <User className="h-4 w-4" />
                  <span className="text-gray-700 dark:text-gray-300 truncate">
                    {user?.email}
                  </span>
                  {user?.role && (
                    <span className="hidden md:inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-200 ring-1 ring-inset ring-blue-200 dark:ring-blue-700">
                      {user.role.name}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="h-9 w-9"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
