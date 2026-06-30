import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FarmRequest } from '../types/requests';
import { StatusBadge } from './StatusBadge';

export function RequestCard({ request }: { request: FarmRequest }) {
  return (
    <Link
      className="group block min-h-[108px] rounded-card border border-agro-border bg-agro-surface px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.995]"
      to={`/requests/${request.id}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-[0.06em] text-agro-secondary">
          {request.categoryName}
        </p>
        <StatusBadge status={request.status} />
      </div>

      <h2 className="mt-2 line-clamp-1 text-[17px] font-semibold leading-tight text-agro-text">{request.serviceName}</h2>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-agro-secondary">
          № {request.number} · {request.createdAt}
        </p>
        <span className="field-marker flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-agro-green transition group-hover:scale-105">
          <ChevronRight aria-hidden="true" size={17} />
        </span>
      </div>
    </Link>
  );
}
