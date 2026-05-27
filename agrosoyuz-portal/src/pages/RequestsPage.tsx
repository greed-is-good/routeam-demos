import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { RequestCard } from '../components/RequestCard';
import { useRequests } from '../hooks/useRequests';

interface LocationState {
  toast?: string;
}

export function RequestsPage() {
  const { requests } = useRequests();
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>((location.state as LocationState | null)?.toast ?? null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2600);
    navigate(location.pathname, { replace: true });
    return () => window.clearTimeout(timer);
  }, [location.pathname, navigate, toast]);

  return (
    <AppLayout>
      {toast ? (
        <div className="fixed left-1/2 top-4 z-40 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-2xl bg-[#245943] px-4 py-3 text-center text-sm font-semibold text-white shadow-soft">
          {toast}
        </div>
      ) : null}

      <section className="mb-5">
        <h1 className="text-[28px] font-bold leading-tight">Мои заявки</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[#69756E]">
          Здесь отображаются отправленные заявки и их текущий статус
        </p>
      </section>

      {requests.length > 0 ? (
        <section className="grid gap-3">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </section>
      ) : (
        <EmptyState
          description="После отправки первой заявки она появится в этом разделе."
          title="Заявок пока нет"
          action={
            <Link to="/services">
              <PrimaryButton>Выбрать услугу</PrimaryButton>
            </Link>
          }
        />
      )}
    </AppLayout>
  );
}
