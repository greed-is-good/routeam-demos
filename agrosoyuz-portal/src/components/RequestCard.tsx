import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FarmRequest } from '../types/requests';
import { StatusBadge } from './StatusBadge';

export function RequestCard({ request }: { request: FarmRequest }) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-[#E2DED5] bg-white p-4 shadow-[0_18px_38px_rgba(24,38,31,0.08)]">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-[#245943]" />
      <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#DCE7DA]/72" />

      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-[#69756E]">{request.categoryName}</p>
          <h2 className="text-xl font-black leading-tight">{request.serviceName}</h2>
          <p className="mt-1 text-sm font-bold text-[#69756E]">{request.number}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="relative flex items-center justify-between gap-3 rounded-[20px] bg-[#F6F3EC] p-3">
        <p className="text-sm font-bold text-[#69756E]">{request.createdAt}</p>
        <Link
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#245943] px-4 text-sm font-black text-white shadow-[0_10px_20px_rgba(36,89,67,0.18)]"
          to={`/requests/${request.id}`}
        >
          Открыть
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </article>
  );
}
