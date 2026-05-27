import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FarmRequest } from '../types/requests';
import { StatusBadge } from './StatusBadge';

export function RequestCard({ request }: { request: FarmRequest }) {
  return (
    <Link
      className="group relative block min-h-[108px] overflow-hidden rounded-[22px] border border-[#E2DED5] bg-white px-4 py-3.5 shadow-[0_8px_20px_rgba(24,38,31,0.055)] transition active:scale-[0.995]"
      to={`/requests/${request.id}`}
    >
      <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-[#245943]" />

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
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6F3EC] text-[#245943] transition group-hover:bg-[#DCE7DA]">
          <ChevronRight aria-hidden="true" size={17} />
        </span>
      </div>
    </Link>
  );
}
