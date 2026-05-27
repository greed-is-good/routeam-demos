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
      className="flex min-h-[48px] w-full items-center justify-between gap-3 py-2.5 text-left text-[15px] font-bold text-[#18261F] transition hover:text-[#245943] active:scale-[0.995]"
      onClick={handleOpenService}
      type="button"
    >
      <span className="min-w-0 flex-1 leading-snug">{service.serviceName}</span>
      <ChevronRight aria-hidden="true" className="shrink-0 text-[#245943]" size={17} />
    </button>
  );
}
