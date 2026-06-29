import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FarmRequest } from '../types/requests';
import { StatusBadge } from './StatusBadge';

export function RequestCard({ request }: { request: FarmRequest }) {
  return (
    <Link
      className="group agro-card block min-h-[112px] rounded-[24px] border border-[#E2DED5] bg-white px-4 py-3.5 shadow-[0_10px_24px_rgba(24,38,31,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(24,38,31,0.08)] active:scale-[0.995]"
      to={`/requests/${request.id}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-xs font-black uppercase tracking-[0.06em] text-[#69756E]">
          {request.categoryName}
        </p>
        <StatusBadge status={request.status} />
      </div>

      <h2 className="mt-2 line-clamp-1 text-[17px] font-black leading-tight text-[#18261F]">{request.serviceName}</h2>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-sm font-bold text-[#69756E]">
          № {request.number} · {request.createdAt}
        </p>
        <span className="field-marker flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#245943] transition group-hover:scale-105">
          <ChevronRight aria-hidden="true" size={17} />
        </span>
      </div>
    </Link>
  );
}
