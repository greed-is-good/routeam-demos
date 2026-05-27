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
      <section className="rounded-card border border-[#E2DED5] bg-white p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[#69756E]">Номер заявки</p>
            <h1 className="mt-1 text-2xl font-bold">{request.number}</h1>
          </div>
          <StatusBadge status={request.status} />
        </div>
        <div className="grid gap-3 text-sm">
          <div>
            <p className="text-[#69756E]">Услуга</p>
            <p className="mt-1 text-base font-semibold">{request.serviceName}</p>
          </div>
          <div>
            <p className="text-[#69756E]">Категория</p>
            <p className="mt-1 font-semibold">{request.categoryName}</p>
          </div>
          <div>
            <p className="text-[#69756E]">Дата создания</p>
            <p className="mt-1 font-semibold">{request.createdAt}</p>
          </div>
        </div>
      </section>

      <section className="rounded-card border border-[#E2DED5] bg-white p-4">
        <h2 className="text-lg font-bold">Переданные данные</h2>
        <dl className="mt-4 grid gap-3">
          {displayFields.map((field) => (
            <div className="rounded-2xl bg-[#F6F3EC] px-4 py-3" key={field.name}>
              <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-[#69756E]">{field.label}</dt>
              <dd className="mt-1 text-[15px] font-semibold text-[#18261F]">{field.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-card border border-[#E2DED5] bg-white p-4">
        <h2 className="text-lg font-bold">{statusInfo.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#69756E]">{statusInfo.description}</p>
      </section>

      <section className="rounded-card border border-[#E2DED5] bg-[#ECE4D5] p-4">
        <h2 className="text-lg font-bold">Контакт для уточнений</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#536259]">
          Если потребуются дополнительные данные, менеджер свяжется с вами по телефону:
        </p>
        <p className="mt-3 text-lg font-bold text-[#18261F]">{phone}</p>
      </section>

      {canDelete ? (
        <PrimaryButton fullWidth onClick={onDelete} type="button" variant="secondary">
          Удалить заявку
        </PrimaryButton>
      ) : null}
    </article>
  );
}
