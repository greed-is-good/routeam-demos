import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { IconGlyph } from '../components/IconGlyph';
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

      <section className="relative mb-5 overflow-hidden rounded-[30px] bg-[#245943] p-5 text-white shadow-[0_24px_54px_rgba(36,89,67,0.22)]">
        <div className="absolute inset-0 bento-lines-light opacity-70" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white/72">{service.categoryName}</p>
            <h1 className="mt-2 text-[28px] font-black leading-[1.04]">{service.serviceName}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-white/78">{service.shortDescription}</p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-white/16 text-white">
            <IconGlyph className="h-5 w-5" name={service.icon} />
          </span>
        </div>
      </section>

      <RequestForm service={service} />
    </AppLayout>
  );
}
