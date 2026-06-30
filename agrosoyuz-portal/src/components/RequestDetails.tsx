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
      <section className="rounded-card border border-agro-border bg-agro-surface p-5 shadow-soft">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-agro-secondary">Номер заявки</p>
            <h1 className="mt-1 text-[30px] font-bold text-agro-text">{request.number}</h1>
          </div>
          <StatusBadge status={request.status} />
        </div>
        <div className="grid gap-3 text-sm">
          <div className="rounded-control bg-agro-bg p-3">
            <p className="text-agro-secondary">Услуга</p>
            <p className="mt-1 text-base font-semibold text-agro-text">{request.serviceName}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-control bg-agro-bg p-3">
              <p className="text-agro-secondary">Категория</p>
              <p className="mt-1 font-semibold text-agro-text">{request.categoryName}</p>
            </div>
            <div className="rounded-control bg-agro-bg p-3">
              <p className="text-agro-secondary">Дата</p>
              <p className="mt-1 font-semibold text-agro-text">{request.createdAt}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-card border border-agro-border bg-agro-surface p-4">
        <h2 className="text-lg font-bold text-agro-text">Переданные данные</h2>
        <dl className="mt-4 grid gap-3">
          {displayFields.map((field) => (
            <div className="rounded-control border border-agro-border bg-agro-bg px-4 py-3" key={field.name}>
              <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-agro-secondary">{field.label}</dt>
              <dd className="mt-1 text-[15px] font-semibold text-agro-text">{field.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-card border border-agro-border bg-agro-surface p-4">
        <h2 className="text-lg font-bold text-agro-text">{statusInfo.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-agro-secondary">{statusInfo.description}</p>
      </section>

      <section className="rounded-card border border-agro-border bg-agro-muted p-4">
        <h2 className="text-lg font-bold text-agro-text">Контакт для уточнений</h2>
        <p className="mt-2 text-sm leading-relaxed text-agro-secondary">
          Если потребуются дополнительные данные, менеджер свяжется с вами по телефону:
        </p>
        <p className="mt-3 rounded-control bg-white px-4 py-3 text-lg font-bold text-agro-text">{phone}</p>
      </section>

      {canDelete ? (
        <PrimaryButton fullWidth onClick={onDelete} type="button" variant="secondary">
          Удалить заявку
        </PrimaryButton>
      ) : null}
    </article>
  );
}
