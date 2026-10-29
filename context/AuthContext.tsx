import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// API Base URL - uses relative URL in production (Vercel), localhost in development
const API_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

// How often to check if password was changed (in milliseconds)
const SESSION_CHECK_INTERVAL = 30000; // 30 seconds

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('go_holidays_auth') === 'true';
  });
  const [loading, setLoading] = useState(false);

  // Logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('go_holidays_auth');
    localStorage.removeItem('go_holidays_password_version');
  }, []);

  // Verify session - check if password was changed
  const verifySession = useCallback(async () => {
    const storedVersion = localStorage.getItem('go_holidays_password_version');
    
    if (!storedVersion || !isAuthenticated) return;

    try {
      const response = await fetch(`${API_URL}/admin/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passwordVersion: parseInt(storedVersion) }),
      });

      const data = await response.json();
      
      if (!response.ok || !data.valid) {
        console.log('Session invalidated - password was changed');
        logout();
        alert('You have been logged out because the admin password was changed.');
      }
    } catch (error) {
      // If server is unavailable, don't log out (allow offline access with fallback)
      console.error('Session verification failed:', error);
    }
  }, [isAuthenticated, logout]);

  // Periodically verify session
  useEffect(() => {
    if (!isAuthenticated) return;

    // Verify immediately on mount
    verifySession();

    // Set up interval to check periodically
    const interval = setInterval(verifySession, SESSION_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [isAuthenticated, verifySession]);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('go_holidays_auth', 'true');
        // Store the password version for session verification
        localStorage.setItem('go_holidays_password_version', String(data.passwordVersion || 1));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error - trying fallback:', error);
      // Fallback to default credentials if server is not available
      if (username === 'admin' && password === 'goholidays') {
        setIsAuthenticated(true);
        localStorage.setItem('go_holidays_auth', 'true');
        localStorage.setItem('go_holidays_password_version', '1');
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};