import type { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-card border border-[#E2DED5] bg-white p-6 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-[#DCE7DA]" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#69756E]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
