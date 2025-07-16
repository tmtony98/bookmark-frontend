import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      if (localStorage.getItem('user')) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
      }
      setIsLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, data: userData };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to login'
      };
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username,
        email,
        password
      });
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, data: userData };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to register'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
