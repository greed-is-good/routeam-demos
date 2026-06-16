import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { mockUser } from '../mocks/mockUser';
import { clearAuthUser, getStoredAuthUser, saveAuthUser } from '../services/mockAuthService';
import type { MockUser, RegisterInput } from '../types/user';

interface AuthContextValue {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => void;
  loginDemo: () => void;
  register: (input: RegisterInput) => void;
  updateProfile: (profile: MockUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => getStoredAuthUser());

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: () => {
        saveAuthUser(mockUser);
        setUser(mockUser);
      },
      loginDemo: () => {
        saveAuthUser(mockUser);
        setUser(mockUser);
      },
      register: (input) => {
        const newUser = {
          ...mockUser,
          fullName: input.fullName || mockUser.fullName,
          farmName: input.farmName || mockUser.farmName,
          phone: input.phone || mockUser.phone,
        };
        saveAuthUser(newUser);
        setUser(newUser);
      },
      updateProfile: (profile) => {
        saveAuthUser(profile);
        setUser(profile);
      },
      logout: () => {
        clearAuthUser();
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
