import type { ReactNode } from 'react';

export function MobilePageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#F6F3EC] text-[#18261F] shadow-soft">
      {children}
    </div>
  );
}
