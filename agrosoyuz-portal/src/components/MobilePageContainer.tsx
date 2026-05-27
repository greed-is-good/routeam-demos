import type { ReactNode } from 'react';

export function MobilePageContainer({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'dark' }) {
  return (
    <div
      className={[
        'mx-auto min-h-screen w-full max-w-[430px] overflow-hidden text-[#18261F] shadow-soft md:my-6 md:min-h-[844px] md:rounded-[34px]',
        variant === 'dark' ? 'bg-[#163A2D]' : 'bg-[#F6F3EC]',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
