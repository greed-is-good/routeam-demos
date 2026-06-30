import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { IconGlyph } from '../components/IconGlyph';
import { PageContainer } from '../components/PageContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { categoryDescriptions, getCategoryBySlug } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!category) {
    return (
      <AppLayout>
        <PageContainer size="content">
          <EmptyState
            title="Направление не найдено"
            description="Проверьте ссылку или вернитесь к списку направлений."
            action={
              <Link to="/services">
                <PrimaryButton variant="secondary">Все направления</PrimaryButton>
              </Link>
            }
          />
        </PageContainer>
      </AppLayout>
    );
  }

  const openService = (serviceSlug: string) => {
    const requestPath = `/requests/new/${serviceSlug}`;

    if (isAuthenticated) {
      navigate(requestPath);
      return;
    }

    navigate(`/login?redirect=${encodeURIComponent(requestPath)}`);
  };

  return (
    <AppLayout>
      <PageContainer size="content" className="pb-2">
        <Link className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-agro-green" to="/services">
          <ArrowLeft aria-hidden="true" size={18} />
          Все направления
        </Link>

        <section className="mb-6 rounded-card border border-agro-border bg-agro-surface p-5">
          <div className="flex min-w-0 items-start gap-4">
            <span className="field-marker flex h-12 w-12 shrink-0 items-center justify-center rounded-control text-agro-green">
              <IconGlyph className="h-6 w-6" name={category.icon} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-agro-green">{category.services.length} услуги</p>
              <h1 className="mt-1 text-[30px] font-bold leading-tight text-agro-text">{category.categoryName}</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-agro-secondary">
                {categoryDescriptions[category.categorySlug]}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2" aria-label="Услуги направления">
          {category.services.map((service) => (
            <button
              className="group flex min-h-[116px] min-w-0 items-center justify-between gap-4 rounded-card border border-agro-border bg-agro-surface p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.99]"
              key={service.serviceSlug}
              onClick={() => openService(service.serviceSlug)}
              type="button"
            >
              <div className="min-w-0">
                <h2 className="text-[18px] font-semibold leading-snug text-agro-text">{service.serviceName}</h2>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-agro-secondary">
                  {service.shortDescription}
                </p>
                <p className="mt-3 text-sm font-semibold text-agro-green">Оставить заявку</p>
              </div>
              <span className="field-marker flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-agro-green transition group-hover:scale-105">
                <ChevronRight aria-hidden="true" size={18} />
              </span>
            </button>
          ))}
        </section>
      </PageContainer>
    </AppLayout>
  );
}
