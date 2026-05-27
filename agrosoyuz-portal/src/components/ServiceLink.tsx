import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ServiceConfig } from '../types/forms';

export function ServiceLink({ service, compact = false }: { service: ServiceConfig; compact?: boolean }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const requestPath = `/requests/new/${service.serviceSlug}`;

  const handleOpenService = () => {
    if (isAuthenticated) {
      navigate(requestPath);
      return;
    }

    navigate(`/login?redirect=${encodeURIComponent(requestPath)}`);
  };

  return (
    <button
      className={[
        'group flex w-full items-center justify-between gap-3 text-left transition active:scale-[0.99]',
        compact
          ? 'min-h-11 rounded-[18px] bg-white/72 px-3 py-2 text-sm font-bold text-[#18261F] shadow-[inset_0_0_0_1px_rgba(226,222,213,0.7)]'
          : 'min-h-[54px] rounded-[20px] bg-white/82 px-4 py-3 text-[15px] font-black text-[#18261F] shadow-[0_10px_22px_rgba(24,38,31,0.07),inset_0_0_0_1px_rgba(255,255,255,0.72)]',
      ].join(' ')}
      onClick={handleOpenService}
      type="button"
    >
      <span>{service.serviceName}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#245943] text-white transition group-hover:bg-[#1E4A38]">
        <ChevronRight aria-hidden="true" size={16} />
      </span>
    </button>
  );
}
