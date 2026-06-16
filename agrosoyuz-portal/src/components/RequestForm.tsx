import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonRequestFields } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';
import { createRequest } from '../services/mockRequestsService';
import type { FieldConfig, ServiceConfig } from '../types/forms';
import { FormFieldRenderer } from './FormFieldRenderer';
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
      <section className="rounded-[28px] border border-[#E2DED5] bg-white p-4 shadow-[0_18px_38px_rgba(24,38,31,0.07)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-black">Данные заявки</h2>
          <span className="rounded-full bg-[#ECE4D5] px-3 py-1 text-xs font-black text-[#6A5635]">Mock</span>
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

      <p className="rounded-[22px] border border-[#E2DED5] bg-[#ECE4D5] px-4 py-3 text-sm font-semibold leading-relaxed text-[#536259]">
        Данные заявителя будут взяты из раздела «Мой профиль». Состав полей заявки предварительный.
      </p>

      <PrimaryButton fullWidth loading={isSubmitting} type="submit">
        Отправить заявку
      </PrimaryButton>
    </form>
  );
}
