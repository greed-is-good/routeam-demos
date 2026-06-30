import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FarmRequest } from '../types/requests';
import { PrimaryButton } from './PrimaryButton';
import { StatusBadge } from './StatusBadge';

export function SuccessState({ request }: { request: FarmRequest }) {
  return (
    <section className="grid gap-5">
      <div className="rounded-card border border-[#CBDCC8] bg-agro-greenSoft p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-card bg-white text-agro-green">
          <CheckCircle2 aria-hidden="true" size={30} />
        </div>
        <h1 className="text-2xl font-bold text-agro-text">Заявка отправлена</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-agro-secondary">
          Если потребуются уточнения, менеджер свяжется с вами по указанному телефону.
        </p>
      </div>

      <div className="rounded-card border border-agro-border bg-white p-4">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-agro-secondary">Номер заявки</p>
            <p className="mt-1 text-lg font-bold text-agro-text">{request.number}</p>
          </div>
          <div>
            <p className="text-sm text-agro-secondary">Услуга</p>
            <p className="mt-1 font-semibold text-agro-text">{request.serviceName}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-agro-secondary">Статус</p>
            <StatusBadge status={request.status} />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <Link to="/requests">
          <PrimaryButton fullWidth>Перейти в мои заявки</PrimaryButton>
        </Link>
        <Link to="/">
          <PrimaryButton fullWidth variant="secondary">
            Вернуться к услугам
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
}
