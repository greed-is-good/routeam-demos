import { commonRequestFields, getServiceBySlug } from '../config/servicesConfig';
import type { FieldConfig } from '../types/forms';
import type { FarmRequest, RequestStatus } from '../types/requests';
import { PrimaryButton } from './PrimaryButton';
import { StatusBadge } from './StatusBadge';

const statusContent: Record<RequestStatus, { title: string; description: string }> = {
  Получена: {
    title: 'Заявка получена',
    description: 'Заявка зарегистрирована и ожидает обработки менеджером.',
  },
  'В обработке': {
    title: 'Заявка в обработке',
    description: 'Менеджер работает с заявкой и организует дальнейшие действия.',
  },
  Исполнена: {
    title: 'Заявка исполнена',
    description: 'Работа по заявке завершена.',
  },
  'Закрыта без исполнения': {
    title: 'Заявка закрыта',
    description: 'Заявка завершена без исполнения.',
  },
};

function getDisplayFields(request: FarmRequest) {
  const service = getServiceBySlug(request.serviceSlug);
  const configuredFields = [...commonRequestFields, ...(service?.fields ?? [])];
  const labels = new Map<string, string>(configuredFields.map((field: FieldConfig) => [field.name, field.label]));
  const orderedNames = configuredFields.map((field) => field.name);
  const dataNames = Object.keys(request.data);
  const names = [...orderedNames, ...dataNames.filter((name) => !orderedNames.includes(name))];

  return names
    .map((name) => ({
      name,
      label: labels.get(name) ?? name,
      value: request.data[name],
    }))
    .filter((field) => String(field.value ?? '').trim().length > 0);
}

export function RequestDetails({ request, onDelete }: { request: FarmRequest; onDelete: () => void }) {
  const statusInfo = statusContent[request.status];
  const displayFields = getDisplayFields(request);
  const canDelete = request.status === 'Получена';
  const phone = request.data.phone || '+7 900 123-45-67';

  return (
    <article className="grid gap-4">
      <section className="relative overflow-hidden rounded-[30px] bg-[#245943] p-5 text-white shadow-[0_24px_54px_rgba(36,89,67,0.22)]">
        <div className="absolute inset-0 bento-lines-light opacity-60" />
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="relative">
            <p className="text-sm font-bold text-white/72">Номер заявки</p>
            <h1 className="mt-1 text-[30px] font-black">{request.number}</h1>
          </div>
          <StatusBadge status={request.status} />
        </div>
        <div className="relative grid gap-3 text-sm">
          <div className="rounded-[20px] bg-white/14 p-3 backdrop-blur">
            <p className="text-white/62">Услуга</p>
            <p className="mt-1 text-base font-black">{request.serviceName}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[20px] bg-white/14 p-3 backdrop-blur">
              <p className="text-white/62">Категория</p>
              <p className="mt-1 font-bold">{request.categoryName}</p>
            </div>
            <div className="rounded-[20px] bg-white/14 p-3 backdrop-blur">
              <p className="text-white/62">Дата</p>
              <p className="mt-1 font-bold">{request.createdAt}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#E2DED5] bg-white p-4 shadow-[0_18px_38px_rgba(24,38,31,0.07)]">
        <h2 className="text-lg font-black">Переданные данные</h2>
        <dl className="mt-4 grid gap-3">
          {displayFields.map((field) => (
            <div className="rounded-[20px] border border-[#E2DED5] bg-[#F6F3EC] px-4 py-3" key={field.name}>
              <dt className="text-xs font-black uppercase tracking-[0.04em] text-[#69756E]">{field.label}</dt>
              <dd className="mt-1 text-[15px] font-bold text-[#18261F]">{field.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-[28px] border border-[#E2DED5] bg-white p-4 shadow-[0_18px_38px_rgba(24,38,31,0.07)]">
        <h2 className="text-lg font-black">{statusInfo.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#69756E]">{statusInfo.description}</p>
      </section>

      <section className="rounded-[28px] border border-[#E2DED5] bg-[#ECE4D5] p-4 shadow-[0_18px_38px_rgba(74,59,38,0.08)]">
        <h2 className="text-lg font-black">Контакт для уточнений</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#536259]">
          Если потребуются дополнительные данные, менеджер свяжется с вами по телефону:
        </p>
        <p className="mt-3 rounded-[20px] bg-white/62 px-4 py-3 text-lg font-black text-[#18261F]">{phone}</p>
      </section>

      {canDelete ? (
        <PrimaryButton fullWidth onClick={onDelete} type="button" variant="secondary">
          Удалить заявку
        </PrimaryButton>
      ) : null}
    </article>
  );
}
