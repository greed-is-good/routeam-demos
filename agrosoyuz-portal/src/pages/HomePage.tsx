import { ArrowRight, ClipboardList, Plus, Tractor, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { RequestCard } from '../components/RequestCard';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../hooks/useAuth';
import { useRequests } from '../hooks/useRequests';
import type { RequestStatus } from '../types/requests';

const statusOrder: RequestStatus[] = ['Получена', 'В обработке', 'Исполнена', 'Закрыта без исполнения'];

function getFirstName(fullName: string) {
  return fullName.trim().split(' ')[0] || 'Фермер';
}

function formatActiveRequestsCount(count: number) {
  if (count === 1) {
    return '1 активная';
  }

  return `${count} активных`;
}

export function HomePage() {
  const { user } = useAuth();
  const { requests } = useRequests();
  const latestRequests = requests.slice(0, 2);
  const activeRequestsCount = requests.filter((request) => ['Получена', 'В обработке'].includes(request.status)).length;

  const statusCounts = statusOrder
    .map((status) => ({
      status,
      count: requests.filter((request) => request.status === status).length,
    }))
    .filter((item) => item.count > 0);

  return (
    <AppLayout>
      <section className="agro-card mb-4 rounded-[30px] border border-[#D9E2D6] bg-[#DCE7DA] p-4 shadow-[0_18px_44px_rgba(24,38,31,0.1)] md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black text-[#245943]">{user?.farmName ?? 'Хозяйство'}</p>
            <h1 className="mt-2 text-[28px] font-black leading-[1.05] text-[#18261F]">
              {getFirstName(user?.fullName ?? '')}, что нужно хозяйству?
            </h1>
          </div>
          <span className="field-marker flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] text-[#245943] shadow-[inset_0_0_0_1px_rgba(36,89,67,0.08)]">
            <Tractor aria-hidden="true" size={21} />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[1.2fr_0.8fr] gap-2.5">
          <Link
            className="flex min-h-[76px] items-center justify-between gap-3 rounded-[24px] bg-[#245943] px-4 text-sm font-black text-white shadow-[0_16px_28px_rgba(36,89,67,0.22)] transition active:scale-[0.99]"
            to="/services"
          >
            <span>Оставить заявку</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/14">
              <Plus aria-hidden="true" size={18} />
            </span>
          </Link>
          <Link
            className="soft-paper flex min-h-[76px] flex-col justify-between rounded-[24px] border border-white/80 px-4 py-3 text-sm font-black text-[#245943] transition active:scale-[0.99]"
            to="/requests"
          >
            <span>{formatActiveRequestsCount(activeRequestsCount)}</span>
            <ClipboardList aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section className="mb-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {statusCounts.length > 0 ? (
          statusCounts.map((item) => (
            <Link
              className="soft-paper flex min-h-[82px] flex-col justify-between gap-2 rounded-[24px] border border-[#E2DED5] px-3.5 py-3 shadow-[0_10px_24px_rgba(24,38,31,0.055)] transition active:scale-[0.99]"
              key={item.status}
              to="/requests"
            >
              <p className="text-[24px] font-black leading-none text-[#18261F]">{item.count}</p>
              <StatusBadge status={item.status} />
            </Link>
          ))
        ) : (
          <div className="rounded-[24px] border border-[#E2DED5] bg-white p-4 md:col-span-4">
            <p className="text-sm font-bold text-[#69756E]">Заявок пока нет</p>
          </div>
        )}
      </section>

      <section className="mb-4">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-black text-[#18261F]">Последние заявки</h2>
          <Link className="inline-flex items-center gap-1 text-sm font-black text-[#245943]" to="/requests">
            Все
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>

        {latestRequests.length > 0 ? (
          <div className="grid gap-2.5 md:grid-cols-2">
            {latestRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Заявок пока нет"
            description="Выберите услугу и отправьте первую заявку."
            action={
              <Link to="/services">
                <span className="inline-flex min-h-11 items-center rounded-full bg-[#245943] px-5 text-sm font-black text-white">
                  Выбрать услугу
                </span>
              </Link>
            }
          />
        )}
      </section>

      <section className="agro-card rounded-[28px] border border-[#E2DED5] bg-white p-4 shadow-[0_14px_30px_rgba(24,38,31,0.06)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-[#18261F]">Мой профиль</h2>
            <p className="mt-1 text-sm font-semibold text-[#69756E]">{user?.activity}</p>
          </div>
          <Link
            className="field-marker flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-[#245943]"
            to="/profile"
            aria-label="Открыть профиль"
          >
            <UserRound aria-hidden="true" size={19} />
          </Link>
        </div>

        <div className="mt-4 grid gap-2 text-sm font-bold text-[#3C4B43] sm:grid-cols-3">
          <p className="rounded-[18px] bg-[#F6F3EC] px-3 py-2">{user?.farmSize}</p>
          <p className="rounded-[18px] bg-[#F6F3EC] px-3 py-2">{user?.sownArea}</p>
          <p className="rounded-[18px] bg-[#F6F3EC] px-3 py-2 sm:col-span-3">{user?.crops}</p>
        </div>
      </section>
    </AppLayout>
  );
}
