import { ArrowRight, ClipboardList, Plus, Sprout, UserRound } from 'lucide-react';
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
      <section className="mb-4 rounded-[28px] border border-[#D9E2D6] bg-[#DCE7DA] p-4 shadow-[0_14px_34px_rgba(24,38,31,0.08)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black text-[#245943]">{user?.farmName ?? 'Хозяйство'}</p>
            <h1 className="mt-2 text-[28px] font-black leading-[1.05] text-[#18261F]">
              {getFirstName(user?.fullName ?? '')}, что нужно хозяйству?
            </h1>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#245943]">
            <Sprout aria-hidden="true" size={20} />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <Link
            className="flex min-h-[68px] items-center justify-between gap-3 rounded-[22px] bg-[#245943] px-4 text-sm font-black text-white shadow-[0_12px_24px_rgba(36,89,67,0.18)]"
            to="/services"
          >
            <span>Оставить заявку</span>
            <Plus aria-hidden="true" size={18} />
          </Link>
          <Link
            className="flex min-h-[68px] items-center justify-between gap-3 rounded-[22px] bg-white px-4 text-sm font-black text-[#245943]"
            to="/requests"
          >
            <span>{formatActiveRequestsCount(activeRequestsCount)}</span>
            <ClipboardList aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section className="mb-4 grid gap-2.5 md:grid-cols-4">
        {statusCounts.length > 0 ? (
          statusCounts.map((item) => (
            <Link
              className="flex min-h-[62px] items-center justify-between gap-2 rounded-[22px] border border-[#E2DED5] bg-white px-3.5 shadow-[0_8px_20px_rgba(24,38,31,0.045)]"
              key={item.status}
              to="/requests"
            >
              <div className="min-w-0">
                <p className="text-[20px] font-black leading-none text-[#18261F]">{item.count}</p>
                <p className="mt-1 truncate text-xs font-bold text-[#69756E]">заявки</p>
              </div>
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

      <section className="rounded-[28px] border border-[#E2DED5] bg-white p-4 shadow-[0_10px_26px_rgba(24,38,31,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-[#18261F]">Мой профиль</h2>
            <p className="mt-1 text-sm font-semibold text-[#69756E]">{user?.activity}</p>
          </div>
          <Link
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F6F3EC] text-[#245943]"
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
