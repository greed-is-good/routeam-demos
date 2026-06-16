import type { ReactNode } from 'react';

export function MobilePageContainer({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'dark' }) {
  return (
    <div
      className={[
        'min-h-screen w-full overflow-hidden text-[#18261F]',
        variant === 'dark' ? 'bg-[#163A2D]' : 'bg-[#F6F3EC]',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
