import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { IconGlyph } from '../components/IconGlyph';
import { PageContainer } from '../components/PageContainer';
import { ServiceLink } from '../components/ServiceLink';
import { categoryDescriptions, serviceCategories } from '../config/servicesConfig';

export function ServicesPage() {
  return (
    <AppLayout>
      <PageContainer className="pb-2">
        <section className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold text-agro-green">Каталог</p>
          <h1 className="mt-2 text-[32px] font-semibold leading-tight text-agro-text md:text-4xl">Услуги для хозяйства</h1>
          <p className="mt-3 text-[16px] leading-relaxed text-agro-secondary">
            Выберите направление, откройте услугу и оставьте заявку. Все услуги отображаются равнозначно.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" aria-label="Каталог услуг">
          {serviceCategories.map((category) => (
            <article className="rounded-card border border-agro-border bg-agro-surface p-4" key={category.categorySlug}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-3">
                  <span className="field-marker flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-agro-green">
                    <IconGlyph className="h-5 w-5" name={category.icon} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-[19px] font-semibold leading-tight text-agro-text">{category.categoryName}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-agro-secondary">
                      {categoryDescriptions[category.categorySlug]}
                    </p>
                  </div>
                </div>
                <Link
                  aria-label={`Открыть направление ${category.categoryName}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-agro-bg text-agro-green transition hover:bg-agro-greenSoft"
                  to={`/categories/${category.categorySlug}`}
                >
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </div>

              <div className="grid gap-2">
                {category.services.map((service) => (
                  <ServiceLink key={service.serviceSlug} service={service} />
                ))}
              </div>
            </article>
          ))}
        </section>
      </PageContainer>
    </AppLayout>
  );
}
