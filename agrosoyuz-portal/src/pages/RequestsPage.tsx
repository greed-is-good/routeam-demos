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

function formatRequestsCount(count: number) {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} заявок`;
  }

  if (lastDigit === 1) {
    return `${count} заявка`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} заявки`;
  }

  return `${count} заявок`;
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

      <section className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-[28px] font-black leading-tight text-[#18261F]">Мои заявки</h1>
          <span className="shrink-0 rounded-full bg-[#DCE7DA] px-3 py-1.5 text-xs font-black text-[#245943]">
            {formatRequestsCount(requests.length)}
          </span>
        </div>
        <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-[#69756E]">
          Отслеживайте статус отправленных заявок
        </p>
      </section>

      {requests.length > 0 ? (
        <section className="grid gap-2.5 md:grid-cols-2">
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
