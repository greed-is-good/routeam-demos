import { ArrowRight, ClipboardCheck, Sprout } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';
import { serviceCategories } from '../config/servicesConfig';

const workSteps = ['Выберите услугу', 'Оставьте заявку', 'Отслеживайте статус'];

export function ServicesPage() {
  return (
    <AppLayout>
      <section className="relative overflow-hidden rounded-[28px] bg-[#245943] p-5 text-white shadow-[0_22px_48px_rgba(36,89,67,0.18)]">
        <div className="absolute inset-0 services-hero-field opacity-90" />
        <div className="relative">
          <div className="mb-12 flex items-center justify-between">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/18 backdrop-blur">
              <Sprout aria-hidden="true" size={22} />
            </span>
            <span className="rounded-full bg-white/16 px-3 py-2 text-xs font-semibold backdrop-blur">
              MVP портал
            </span>
          </div>
          <h1 className="max-w-[280px] text-[31px] font-black leading-[1.03] tracking-[0]">
            Услуги для вашего хозяйства
          </h1>
          <p className="mt-3 max-w-[310px] text-[15px] leading-relaxed text-white/82">
            Выберите направление и оставьте заявку. Менеджер свяжется с вами для уточнения деталей.
          </p>
        </div>
      </section>

      <section className="-mt-5 ml-4 mr-4 rounded-[24px] border border-[#E2DED5] bg-white p-4 shadow-[0_16px_34px_rgba(24,38,31,0.09)]">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#DCE7DA] text-[#245943]">
            <ClipboardCheck aria-hidden="true" size={20} />
          </span>
          <div>
            <h2 className="text-base font-bold">Быстрый сценарий заявки</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#69756E]">
              Каталог открыт без входа, а отправка заявки доступна после mock-авторизации.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4" aria-label="Каталог услуг">
        {serviceCategories.map((category, index) => (
          <ServiceCategoryCard category={category} featured={index < 3} key={category.categorySlug} />
        ))}
      </section>

      <section className="mt-5 rounded-[24px] border border-[#E2DED5] bg-white p-4">
        <h2 className="text-xl font-bold">Как это работает</h2>
        <div className="mt-4 grid gap-3">
          {workSteps.map((step, index) => (
            <div className="flex min-h-12 items-center justify-between gap-3 rounded-2xl bg-[#F6F3EC] px-4" key={step}>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#245943] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-[15px] font-semibold">{step}</span>
              </div>
              <ArrowRight aria-hidden="true" className="text-[#9BA39D]" size={17} />
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
