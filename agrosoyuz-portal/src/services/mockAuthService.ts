import { mockUser } from '../mocks/mockUser';
import type { MockUser } from '../types/user';

const AUTH_STORAGE_KEY = 'agrosoyuz.authUser';

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function getStoredAuthUser(): MockUser | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as MockUser;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function saveAuthUser(user: MockUser = mockUser) {
  if (canUseStorage()) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }
}

export function clearAuthUser() {
  if (canUseStorage()) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
