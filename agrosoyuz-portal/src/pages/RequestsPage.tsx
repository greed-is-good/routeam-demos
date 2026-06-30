import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { PageContainer } from '../components/PageContainer';
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
      <PageContainer size="content">
        {toast ? (
          <div className="fixed left-1/2 top-4 z-40 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-2xl bg-agro-green px-4 py-3 text-center text-sm font-semibold text-white shadow-soft">
            {toast}
          </div>
        ) : null}

        <section className="mb-5">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-[30px] font-bold leading-tight text-agro-text">Мои заявки</h1>
            <span className="shrink-0 rounded-full bg-agro-greenSoft px-3 py-1.5 text-xs font-semibold text-agro-green">
              {formatRequestsCount(requests.length)}
            </span>
          </div>
          <p className="mt-1.5 text-[15px] leading-relaxed text-agro-secondary">
            Отслеживайте статус отправленных заявок
          </p>
        </section>

        {requests.length > 0 ? (
          <section className="grid gap-3 md:grid-cols-2">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </section>
        ) : (
          <EmptyState
            description="После отправки первой заявки она появится в этом разделе."
            title="Заявок пока нет"
            action={
              <Link to="/">
                <PrimaryButton>Выбрать услугу</PrimaryButton>
              </Link>
            }
          />
        )}
      </PageContainer>
    </AppLayout>
  );
}
