import type { ReactNode } from 'react';

export function InlineNotice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-card border border-agro-border bg-agro-muted px-4 py-3 text-[14px] leading-relaxed text-agro-secondary">
      {children}
    </div>
  );
}
