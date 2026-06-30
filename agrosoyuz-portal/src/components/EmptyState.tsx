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
    <section className="rounded-card border border-agro-border bg-agro-surface p-6 text-center">
      <div className="field-marker mx-auto mb-4 h-12 w-12 rounded-control" />
      <h2 className="text-xl font-bold text-agro-text">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-agro-secondary">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
