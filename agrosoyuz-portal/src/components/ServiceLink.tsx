import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ServiceConfig } from '../types/forms';

export function ServiceLink({ service }: { service: ServiceConfig }) {
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
      className="group flex min-h-[48px] w-full items-center justify-between gap-3 rounded-[18px] bg-[#F9F7F1] px-3 py-2.5 text-left text-[15px] font-bold text-[#18261F] transition hover:bg-[#F1EBDD] hover:text-[#245943] active:scale-[0.995]"
      onClick={handleOpenService}
      type="button"
    >
      <span className="min-w-0 flex-1 leading-snug">{service.serviceName}</span>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#245943] transition group-hover:bg-[#DCE7DA]">
        <ChevronRight aria-hidden="true" size={16} />
      </span>
    </button>
  );
}
