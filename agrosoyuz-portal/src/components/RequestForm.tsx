import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonRequestFields } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';
import { createRequest } from '../services/mockRequestsService';
import type { FieldConfig, ServiceConfig } from '../types/forms';
import { FormFieldRenderer } from './FormFieldRenderer';
import { PrimaryButton } from './PrimaryButton';

function buildInitialValues(fields: FieldConfig[], user: ReturnType<typeof useAuth>['user']) {
  const values = fields.reduce<Record<string, string>>((result, field) => {
    result[field.name] = '';
    return result;
  }, {});

  values.applicantName = user?.fullName ?? '';
  values.farmName = user?.farmName ?? '';
  values.phone = user?.phone ?? '';

  return values;
}

export function RequestForm({ service }: { service: ServiceConfig }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fields = useMemo(() => [...commonRequestFields, ...service.fields], [service.fields]);
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues(fields, user));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues(buildInitialValues(fields, user));
    setErrors({});
  }, [fields, service.serviceSlug, user]);

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
    const createdRequest = createRequest(service, values);
    navigate(`/requests/success/${createdRequest.id}`);
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <section className="rounded-card border border-[#E2DED5] bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">Данные заявителя</h2>
        <div className="grid gap-4">
          {commonRequestFields.map((field) => (
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

      <section className="rounded-card border border-[#E2DED5] bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">Параметры услуги</h2>
        <div className="grid gap-4">
          {service.fields.map((field) => (
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

      <p className="rounded-2xl bg-[#ECE4D5] px-4 py-3 text-sm leading-relaxed text-[#536259]">
        Состав данных предварительный и будет уточнён для выбранной услуги.
      </p>

      <PrimaryButton fullWidth loading={isSubmitting} type="submit">
        Отправить заявку
      </PrimaryButton>
    </form>
  );
}
