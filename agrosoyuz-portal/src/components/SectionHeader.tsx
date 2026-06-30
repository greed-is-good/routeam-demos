import type { ReactNode } from 'react';

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-[22px] font-bold leading-tight text-agro-text md:text-2xl">{title}</h2>
        {description ? <p className="mt-1.5 text-[15px] leading-relaxed text-agro-secondary">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
