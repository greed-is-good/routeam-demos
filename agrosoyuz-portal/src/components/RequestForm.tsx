import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonRequestFields } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';
import { createRequest } from '../services/mockRequestsService';
import type { FieldConfig, ServiceConfig } from '../types/forms';
import { FormFieldRenderer } from './FormFieldRenderer';
import { InlineNotice } from './InlineNotice';
import { PrimaryButton } from './PrimaryButton';

const requestContextFieldNames = ['location', 'comment'];

function buildInitialValues(fields: FieldConfig[]) {
  const values = fields.reduce<Record<string, string>>((result, field) => {
    result[field.name] = '';
    return result;
  }, {});

  return values;
}

export function RequestForm({ service }: { service: ServiceConfig }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const requestContextFields = useMemo(
    () => commonRequestFields.filter((field) => requestContextFieldNames.includes(field.name)),
    [],
  );
  const fields = useMemo(() => [...requestContextFields, ...service.fields], [requestContextFields, service.fields]);
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues(fields));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues(buildInitialValues(fields));
    setErrors({});
  }, [fields, service.serviceSlug]);

  const handleChange = (name: string, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !String(values[field.name] ?? '').trim()) {
        nextErrors[field.name] = 'Заполните это поле';
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 520));
    const createdRequest = createRequest(service, {
      applicantName: user?.fullName ?? '',
      farmName: user?.farmName ?? '',
      phone: user?.phone ?? '',
      ...values,
    });
    navigate(`/requests/success/${createdRequest.id}`);
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <section className="rounded-card border border-agro-border bg-agro-surface p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-agro-text">Данные заявителя</h2>
          <p className="mt-1 text-sm leading-relaxed text-agro-secondary">Берутся из раздела «Мой профиль».</p>
        </div>
        <div className="grid gap-2 text-sm sm:grid-cols-3">
          <div className="rounded-control bg-agro-bg px-3 py-2">
            <p className="text-xs font-semibold text-agro-secondary">ФИО</p>
            <p className="mt-1 font-semibold text-agro-text">{user?.fullName}</p>
          </div>
          <div className="rounded-control bg-agro-bg px-3 py-2">
            <p className="text-xs font-semibold text-agro-secondary">Хозяйство</p>
            <p className="mt-1 font-semibold text-agro-text">{user?.farmName}</p>
          </div>
          <div className="rounded-control bg-agro-bg px-3 py-2">
            <p className="text-xs font-semibold text-agro-secondary">Телефон</p>
            <p className="mt-1 font-semibold text-agro-text">{user?.phone}</p>
          </div>
        </div>
      </section>

      <section className="rounded-card border border-agro-border bg-agro-surface p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-agro-text">Заполните данные заявки</h2>
          <p className="mt-1 text-sm leading-relaxed text-agro-secondary">Поля со звёздочкой обязательны.</p>
        </div>
        <div className="grid gap-4">
          {fields.map((field) => (
            <FormFieldRenderer
              error={errors[field.name]}
              field={field}
              key={field.name}
              onChange={handleChange}
              value={values[field.name] ?? ''}
            />
          ))}
        </div>
      </section>

      <InlineNotice>Если потребуются уточнения, менеджер свяжется с вами по указанному телефону.</InlineNotice>

      <PrimaryButton fullWidth loading={isSubmitting} type="submit">
        Отправить заявку
      </PrimaryButton>
    </form>
  );
}
