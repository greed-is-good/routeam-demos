import { Link } from 'react-router-dom';
import type { FarmRequest } from '../types/requests';
import { StatusBadge } from './StatusBadge';

export function RequestCard({ request }: { request: FarmRequest }) {
  return (
    <article className="rounded-card border border-[#E2DED5] bg-white p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold leading-tight">{request.serviceName}</h2>
          <p className="mt-1 text-sm text-[#69756E]">{request.number}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#69756E]">{request.createdAt}</p>
        <Link
          className="inline-flex min-h-11 items-center rounded-2xl bg-[#245943] px-4 text-sm font-semibold text-white"
          to={`/requests/${request.id}`}
        >
          Открыть
        </Link>
      </div>
    </article>
  );
}
