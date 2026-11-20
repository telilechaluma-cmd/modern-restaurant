import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (fullName: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loginAsDemoAdmin: () => void;
  loginAsDemoCustomer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'talile_user_v1';
const ALL_USERS_KEY = 'talile_registered_users_v1';

const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'user-admin-1',
    email: 'admin@talile.com',
    fullName: 'Chef Tadios (Executive Manager)',
    phoneNumber: '+251 911 234 567',
    role: 'admin'
  },
  {
    id: 'user-cust-1',
    email: 'dawit@gmail.com',
    fullName: 'Dawit Alene',
    phoneNumber: '+251 912 345 678',
    role: 'customer',
    savedAddresses: [
      {
        title: 'Home',
        subCity: 'Bole (Medhanialem / Atlas / Rwanda)',
        address: 'Atlas Road, Bldg 4, Apt 3B',
        landmark: 'Behind Edna Mall'
      }
    ]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // initialize user store if not existing
    const existing = localStorage.getItem(ALL_USERS_KEY);
    if (!existing) {
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  const login = async (email: string, _pass: string): Promise<{ success: boolean; message: string }> => {
    const raw = localStorage.getItem(ALL_USERS_KEY);
    const users: UserProfile[] = raw ? JSON.parse(raw) : DEFAULT_USERS;
    const cleanEmail = email.trim().toLowerCase();

    const found = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (found) {
      setUser(found);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(found));
      return { success: true, message: `Welcome back, ${found.fullName}!` };
    }

    // Auto-create customer if logging in for ease of use
    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      email: cleanEmail,
      fullName: cleanEmail.split('@')[0],
      phoneNumber: '+251 911 000 000',
      role: cleanEmail.includes('admin') ? 'admin' : 'customer'
    };
    users.push(newUser);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, message: `Welcome to TALILE Restaurant!` };
  };

  const register = async (
    fullName: string, 
    email: string, 
    phone: string, 
    _pass: string
  ): Promise<{ success: boolean; message: string }> => {
    const raw = localStorage.getItem(ALL_USERS_KEY);
    const users: UserProfile[] = raw ? JSON.parse(raw) : DEFAULT_USERS;
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      email: cleanEmail,
      fullName,
      phoneNumber: phone,
      role: 'customer'
    };
    users.push(newUser);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, message: 'Account created successfully!' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const loginAsDemoAdmin = () => {
    const adminUser = DEFAULT_USERS[0];
    setUser(adminUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(adminUser));
  };

  const loginAsDemoCustomer = () => {
    const custUser = DEFAULT_USERS[1];
    setUser(custUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(custUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        loginAsDemoAdmin,
        loginAsDemoCustomer
      }}
    >
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
