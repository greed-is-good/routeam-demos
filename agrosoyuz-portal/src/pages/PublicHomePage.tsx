import { ClipboardCheck, ClipboardList, MapPin, Phone, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { PageContainer } from '../components/PageContainer';

const steps = ['Выберите направление', 'Заполните заявку', 'Отслеживайте статус'];

export function PublicHomePage() {
  return (
    <AppLayout>
      <PageContainer className="pb-2">
        <section className="py-4 md:py-10">
          <div className="max-w-3xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-control bg-agro-greenSoft text-agro-green">
              <Sprout aria-hidden="true" size={22} />
            </div>
            <h1 className="text-[34px] font-semibold leading-[1.08] text-agro-text md:text-5xl">
              Единый вход для заявок по услугам хозяйства
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-agro-secondary md:text-lg">
              Выберите направление и оставьте заявку. Менеджер свяжется с вами для уточнения деталей.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-control bg-agro-green px-5 py-3 text-[15px] font-semibold text-white shadow-soft transition duration-200 hover:bg-agro-greenHover active:scale-[0.99]"
                to="/services"
              >
                Перейти к услугам
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-6 md:grid-cols-[1fr_1fr] md:items-stretch">
          <div className="rounded-card border border-agro-border bg-agro-surface p-4 md:p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-control bg-agro-greenSoft text-agro-green">
              <ClipboardCheck aria-hidden="true" size={20} />
            </div>
            <h2 className="text-[22px] font-semibold text-agro-text">Как работает сервис</h2>
            <div className="mt-5 grid gap-3">
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
