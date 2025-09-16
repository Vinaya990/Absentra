import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, employeeId: string) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('lms_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock authentication - in real app, this would be an API call
      const mockUsers: User[] = [
        { id: '1', username: 'admin', employee_id: 'EMP001', role: 'admin', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '2', username: 'hr.manager', employee_id: 'EMP002', role: 'hr', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '3', username: 'line.manager', employee_id: 'EMP003', role: 'line_manager', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '4', username: 'employee', employee_id: 'EMP004', role: 'employee', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      ];

      const foundUser = mockUsers.find(u => u.username === username && password === 'password');
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('lms_user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string, employeeId: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock registration - in real app, this would be an API call
      const newUser: User = {
        id: Date.now().toString(),
        username,
        employee_id: employeeId,
        role: 'employee',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem('lms_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};