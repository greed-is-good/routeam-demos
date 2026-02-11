import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { login as loginRequest } from '../api/mockApi';
import type { LoginRequest, UserSession } from '../types/models';

const AUTH_STORAGE_KEY = 'city-feedback.auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  session: UserSession | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStoredSession(): UserSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as UserSession;
    if (new Date(parsed.expiresAt).getTime() <= Date.now()) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: PropsWithChildren): JSX.Element {
  const [session, setSession] = useState<UserSession | null>(() => getStoredSession());

  const handleLogin = async (credentials: LoginRequest): Promise<void> => {
    const response = await loginRequest(credentials);
    const nextSession: UserSession = {
      token: response.token,
      username: response.username,
      expiresAt: response.expiresAt,
    };

    setSession(nextSession);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
  };

  const handleLogout = (): void => {
    setSession(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(session),
      session,
      login: handleLogin,
      logout: handleLogout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }

  return context;
}
