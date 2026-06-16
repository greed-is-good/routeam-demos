import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { BottomNavigation } from './BottomNavigation';
import { Header } from './Header';
import { MobilePageContainer } from './MobilePageContainer';

export function AppLayout({ children, withHeader = true }: { children: ReactNode; withHeader?: boolean }) {
  const { isAuthenticated } = useAuth();

  return (
    <MobilePageContainer>
      <div className="app-surface relative flex min-h-screen flex-col md:min-h-[844px]">
        {withHeader ? <Header /> : null}
        <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-5 pb-8 md:px-8">{children}</main>
        {isAuthenticated ? <BottomNavigation /> : null}
      </div>
    </MobilePageContainer>
  );
}
