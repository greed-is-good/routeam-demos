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
      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3 text-left text-[15px] font-semibold text-[#18261F] transition hover:bg-white"
      onClick={handleOpenService}
      type="button"
    >
      <span>{service.serviceName}</span>
      <ChevronRight aria-hidden="true" className="shrink-0 text-[#245943]" size={18} />
    </button>
  );
}
