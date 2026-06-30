import type { ReactNode } from 'react';

export function MobilePageContainer({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'dark' }) {
  return (
    <div
      className={[
        'min-h-screen w-full overflow-hidden text-agro-text',
        variant === 'dark' ? 'bg-[#163A2D]' : 'bg-agro-bg',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
