import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FarmRequest } from '../types/requests';
import { PrimaryButton } from './PrimaryButton';
import { StatusBadge } from './StatusBadge';

export function SuccessState({ request }: { request: FarmRequest }) {
  return (
    <section className="grid gap-5">
      <div className="rounded-card border border-[#CBDCC8] bg-[#DCE7DA] p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-[#245943]">
          <CheckCircle2 aria-hidden="true" size={30} />
        </div>
        <h1 className="text-2xl font-bold">Заявка отправлена</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#3C4B43]">
          Мы получили вашу заявку. Если потребуются уточнения, менеджер свяжется с вами по указанному телефону.
        </p>
      </div>

      <div className="rounded-card border border-[#E2DED5] bg-white p-4">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-[#69756E]">Номер заявки</p>
            <p className="mt-1 text-lg font-bold">{request.number}</p>
          </div>
          <div>
            <p className="text-sm text-[#69756E]">Услуга</p>
            <p className="mt-1 font-semibold">{request.serviceName}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-[#69756E]">Статус</p>
            <StatusBadge status={request.status} />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <Link to="/requests">
          <PrimaryButton fullWidth>Перейти в мои заявки</PrimaryButton>
        </Link>
        <Link to="/services">
          <PrimaryButton fullWidth variant="secondary">
            Вернуться к услугам
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
}
