import { ArrowRight, ClipboardList, MapPin, Phone, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { IconGlyph } from '../components/IconGlyph';
import { PageContainer } from '../components/PageContainer';
import { SectionHeader } from '../components/SectionHeader';
import { categoryDescriptions, serviceCategories } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';

const steps = ['Выберите направление', 'Заполните заявку', 'Отслеживайте статус'];

export function PublicHomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <AppLayout>
      <PageContainer className="pb-2">
        <section className="grid gap-6 py-4 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-8">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-agro-border bg-agro-surface px-3 py-1.5 text-sm font-semibold text-agro-green">
              Портал заявок для хозяйства
            </p>
            <h1 className="max-w-3xl text-[32px] font-bold leading-[1.08] text-agro-text md:text-5xl">
              Услуги для вашего хозяйства
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-agro-secondary md:text-lg">
              Выберите направление и оставьте заявку. Менеджер свяжется с вами для уточнения деталей.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-control bg-agro-green px-5 py-3 text-[15px] font-semibold text-white shadow-soft transition duration-200 hover:bg-agro-greenHover active:scale-[0.99]"
                href="#directions"
              >
                Выбрать услугу
              </a>
              {isAuthenticated ? (
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-control border border-agro-border bg-agro-surface px-5 py-3 text-[15px] font-semibold text-agro-green transition duration-200 hover:bg-agro-muted active:scale-[0.99]"
                  to="/requests"
                >
                  Мои заявки
                </Link>
              ) : null}
            </div>
          </div>

          <div className="agro-card rounded-[28px] border border-agro-border bg-agro-greenSoft p-4 shadow-soft md:p-5">
            <div className="rounded-[24px] bg-agro-surface p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-agro-secondary">Направления</p>
                  <p className="mt-1 text-3xl font-bold text-agro-text">5</p>
                </div>
                <span className="field-marker flex h-12 w-12 items-center justify-center rounded-card text-agro-green">
                  <Sprout aria-hidden="true" size={22} />
                </span>
              </div>
              <div className="mt-5 grid gap-2">
                {serviceCategories.slice(0, 3).map((category) => (
                  <div className="flex items-center gap-3 rounded-control bg-agro-bg px-3 py-2.5" key={category.categorySlug}>
                    <IconGlyph className="h-4 w-4 text-agro-green" name={category.icon} />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-agro-text">{category.categoryName}</span>
                    <span className="text-xs font-semibold text-agro-secondary">{category.services.length}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-6" id="directions">
          <SectionHeader
            title="Основные направления"
            description="Выберите раздел, чтобы увидеть доступные услуги и перейти к заявке."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category, index) => (
              <Link
                className={[
                  'group rounded-card border border-agro-border bg-agro-surface p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.99]',
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : '',
                ].join(' ')}
                key={category.categorySlug}
                to={`/categories/${category.categorySlug}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="field-marker flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-agro-green">
                    <IconGlyph className="h-5 w-5" name={category.icon} />
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1 text-agro-green opacity-70 transition group-hover:translate-x-0.5"
                    size={18}
                  />
                </div>
                <h2 className="mt-4 text-xl font-bold leading-tight text-agro-text">{category.categoryName}</h2>
                <p className="mt-2 min-h-[44px] text-[14px] leading-relaxed text-agro-secondary">
                  {categoryDescriptions[category.categorySlug]}
                </p>
                <p className="mt-4 text-sm font-semibold text-agro-green">{category.services.length} услуги</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 py-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="rounded-card border border-agro-border bg-agro-muted p-4 md:p-5">
            <h2 className="text-[22px] font-bold text-agro-text">Как работает сервис</h2>
            <div className="mt-4 grid gap-3">
              {steps.map((step, index) => (
                <div className="flex items-center gap-3" key={step}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-agro-green text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[15px] font-semibold text-agro-text">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-agro-border bg-agro-surface p-4 md:p-5">
            <h2 className="text-[22px] font-bold text-agro-text">Контакты</h2>
            <div className="mt-4 grid gap-3 text-[15px] text-agro-secondary">
              <p className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 shrink-0 text-agro-green" size={18} />
                Контактный телефон будет указан заказчиком
              </p>
              <p className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-agro-green" size={18} />
                Адрес будет указан заказчиком
              </p>
              <p className="flex gap-3">
                <ClipboardList aria-hidden="true" className="mt-0.5 shrink-0 text-agro-green" size={18} />
                Режим работы будет указан заказчиком
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-agro-border py-6 text-sm text-agro-secondary">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-agro-text">Агросоюз</p>
            <p>© 2026. Прототип пользовательского портала.</p>
          </div>
        </footer>
      </PageContainer>
    </AppLayout>
  );
}
