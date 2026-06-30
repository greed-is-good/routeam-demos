import { ClipboardList, MapPin, Phone, Radio, Rows3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { CategoryCard } from '../components/CategoryCard';
import { FieldPattern } from '../components/FieldPattern';
import { PageContainer } from '../components/PageContainer';
import { serviceCategories } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';

const steps = ['Выберите направление', 'Заполните заявку', 'Получите обратную связь и отслеживайте статус'];

export function PublicHomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <AppLayout>
      <PageContainer className="pb-32 md:pb-10">
        <section className="grid gap-6 py-4 md:grid-cols-[1.02fr_0.98fr] md:items-center md:py-10">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-agro-green">Цифровой сервис для сельского хозяйства</p>
            <h1 className="mt-3 max-w-3xl text-[34px] font-semibold leading-[1.07] text-agro-text md:text-[56px]">
              Нужные услуги для вашего хозяйства в одном месте
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-agro-secondary md:text-lg">
              Выберите направление, оставьте заявку и отслеживайте её статус в личном кабинете.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-control bg-agro-green px-5 py-3 text-[15px] font-semibold text-white shadow-soft transition duration-200 hover:bg-agro-greenHover active:scale-[0.99]"
                to="/services"
              >
                Выбрать направление
              </Link>
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

          <FieldPattern />
        </section>

        <section className="py-8" aria-labelledby="home-categories">
          <div className="mb-5 max-w-2xl">
            <h2 className="text-[26px] font-semibold leading-tight text-agro-text md:text-[30px]" id="home-categories">
              Основные направления
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-agro-secondary">
              Откройте раздел, чтобы посмотреть доступные услуги и перейти к заявке.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 min-[390px]:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <CategoryCard
                category={category}
                className={category.categorySlug === 'field-work' || category.categorySlug === 'support' ? 'min-[390px]:col-span-2 lg:col-span-1' : ''}
                key={category.categorySlug}
              />
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="rounded-card border border-agro-border bg-agro-muted p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-control bg-white text-agro-green">
              <Rows3 aria-hidden="true" size={20} />
            </div>
            <h2 className="text-[26px] font-semibold leading-tight text-agro-text">Как работает сервис</h2>
            <div className="mt-5 grid gap-3">
              {steps.map((step, index) => (
                <div className="flex gap-3" key={step}>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-agro-green text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[15px] font-medium leading-relaxed text-agro-text">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8" aria-labelledby="home-contacts">
          <div className="rounded-card border border-agro-border bg-agro-surface p-5">
            <h2 className="text-[26px] font-semibold leading-tight text-agro-text" id="home-contacts">
              Контакты
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Phone, label: 'Телефон', value: 'Телефон будет указан заказчиком' },
                { icon: MapPin, label: 'Адрес', value: 'Адрес будет указан заказчиком' },
                { icon: ClipboardList, label: 'Режим работы', value: 'Режим работы будет указан заказчиком' },
                { icon: Radio, label: 'Канал связи', value: 'Общий канал связи будет указан заказчиком' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div className="rounded-control bg-agro-bg p-4" key={item.label}>
                    <Icon aria-hidden="true" className="text-agro-green" size={20} />
                    <p className="mt-3 text-sm font-semibold text-agro-text">{item.label}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-agro-secondary">{item.value}</p>
                  </div>
                );
              })}
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
