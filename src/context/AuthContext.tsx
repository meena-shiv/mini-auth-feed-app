import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded test accounts
const testAccounts = [
  { email: 'demo@example.com', password: 'password123' },
  { email: 'test@user.com', password: 'testpass' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const found = testAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );
    if (found) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    // For demo, just allow any new email/password and "log in"
    setUser({ email });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}; 