import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { BottomNavigation } from './BottomNavigation';
import { Header } from './Header';
import { MobilePageContainer } from './MobilePageContainer';

export function AppLayout({ children, withHeader = true }: { children: ReactNode; withHeader?: boolean }) {
  const { isAuthenticated } = useAuth();

  return (
    <MobilePageContainer>
      <div className="flex min-h-screen flex-col">
        {withHeader ? <Header /> : null}
        <main className="flex-1 px-5 pb-8">{children}</main>
        {isAuthenticated ? <BottomNavigation /> : null}
      </div>
    </MobilePageContainer>
  );
}
