import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { RequestForm } from '../components/RequestForm';
import { getServiceBySlug } from '../config/servicesConfig';

export function NewRequestPage() {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <AppLayout>
        <EmptyState
          description="Проверьте выбранную услугу или вернитесь к каталогу."
          title="Услуга не найдена"
          action={
            <Link className="font-semibold text-[#245943]" to="/services">
              Вернуться к услугам
            </Link>
          }
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#245943]" to="/services">
        <ArrowLeft aria-hidden="true" size={18} />
        Назад
      </Link>

      <section className="mb-5 rounded-card border border-[#E2DED5] bg-white p-4">
        <p className="text-sm font-semibold text-[#69756E]">{service.categoryName}</p>
        <h1 className="mt-2 text-[26px] font-bold leading-tight">{service.serviceName}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#69756E]">{service.shortDescription}</p>
      </section>

      <RequestForm service={service} />
    </AppLayout>
  );
}
