import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { IconGlyph } from '../components/IconGlyph';
import { PageContainer } from '../components/PageContainer';
import { RequestForm } from '../components/RequestForm';
import { getServiceBySlug } from '../config/servicesConfig';

export function NewRequestPage() {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <AppLayout>
        <PageContainer size="form">
          <EmptyState
            description="Проверьте выбранную услугу или вернитесь к каталогу."
            title="Услуга не найдена"
            action={
              <Link className="font-semibold text-agro-green" to="/">
                Вернуться к направлениям
              </Link>
            }
          />
        </PageContainer>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageContainer size="form">
        <Link
          className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-agro-green"
          to={`/categories/${service.categorySlug}`}
        >
          <ArrowLeft aria-hidden="true" size={18} />
          Назад к направлению
        </Link>

        <section className="mb-5 rounded-card border border-agro-border bg-agro-surface p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-agro-green">{service.categoryName}</p>
            <h1 className="mt-2 text-[30px] font-bold leading-tight text-agro-text">{service.serviceName}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-agro-secondary">{service.shortDescription}</p>
          </div>
          <span className="field-marker flex h-12 w-12 shrink-0 items-center justify-center rounded-control text-agro-green">
            <IconGlyph className="h-5 w-5" name={service.icon} />
          </span>
        </div>
      </section>

        <RequestForm service={service} />
      </PageContainer>
    </AppLayout>
  );
}
