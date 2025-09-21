'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  UserAuth,
  GetProfileDocument,
  LogoutDocument,
} from '@/generated/graphql';

interface AuthContextType {
  user: UserAuth | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to safely access localStorage
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

const removeLocalStorageItem = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<UserAuth | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [logoutMutation] = useMutation(LogoutDocument);

  const logout = async () => {
    try {
      if (accessToken) {
        await logoutMutation();
      }
    } catch {
      // Ignore logout errors - still clear local state
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      removeLocalStorageItem('accessToken');
      removeLocalStorageItem('refreshToken');
      router.push('/');
    }
  };

  useQuery(GetProfileDocument, {
    skip: !accessToken,
    onCompleted: data => {
      if (data?.getProfile) {
        setUser(data.getProfile);
      }
    },
    onError: () => {
      logout();
    },
  });

  useEffect(() => {
    const storedAccessToken = getLocalStorageItem('accessToken');
    const storedRefreshToken = getLocalStorageItem('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
    setIsInitialized(true);
  }, []);

  const login = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setLocalStorageItem('accessToken', newAccessToken);
    setLocalStorageItem('refreshToken', newRefreshToken);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isAuthenticated: !!accessToken && !!user,
    isInitialized,
  };

  if (!isInitialized) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
