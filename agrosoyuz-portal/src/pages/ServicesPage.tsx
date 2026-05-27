import { ArrowRight, ClipboardCheck, Sprout } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';
import { serviceCategories } from '../config/servicesConfig';

const workSteps = ['Выберите услугу', 'Оставьте заявку', 'Отслеживайте статус'];

export function ServicesPage() {
  return (
    <AppLayout>
      <section className="relative overflow-hidden rounded-[32px] bg-[#245943] p-5 text-white shadow-[0_28px_64px_rgba(36,89,67,0.23)]">
        <div className="absolute inset-0 services-hero-field opacity-95" />
        <div className="absolute -right-10 top-8 h-32 w-32 rounded-full bg-[#8BCB5B]/22 blur-2xl" />
        <div className="relative">
          <div className="mb-14 flex items-center justify-between">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[20px] bg-white/18 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur">
              <Sprout aria-hidden="true" size={23} />
            </span>
            <span className="rounded-full bg-white/16 px-3 py-2 text-xs font-bold backdrop-blur">
              MVP портал
            </span>
          </div>
          <h1 className="max-w-[300px] text-[32px] font-black leading-[1.03] tracking-[0]">
            Услуги для вашего хозяйства
          </h1>
          <p className="mt-3 max-w-[312px] text-[15px] leading-relaxed text-white/82">
            Выберите направление и оставьте заявку. Менеджер свяжется с вами для уточнения деталей.
          </p>
        </div>
      </section>

      <section className="-mt-6 ml-4 mr-4 rounded-[26px] border border-[#E2DED5] bg-white/96 p-4 shadow-[0_20px_46px_rgba(24,38,31,0.12)]">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-[#DCE7DA] text-[#245943]">
            <ClipboardCheck aria-hidden="true" size={21} />
          </span>
          <div>
            <h2 className="text-base font-black">Быстрый сценарий заявки</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#69756E]">
              Каталог открыт без входа. Для отправки заявки достаточно mock-авторизации.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4" aria-label="Каталог услуг">
        {serviceCategories.map((category, index) => (
          <ServiceCategoryCard category={category} featured={index < 3} key={category.categorySlug} />
        ))}
      </section>

      <section className="mt-5 rounded-[28px] border border-[#E2DED5] bg-white p-4 shadow-[0_16px_36px_rgba(24,38,31,0.07)]">
        <h2 className="text-xl font-black">Как это работает</h2>
        <div className="mt-4 grid gap-3">
          {workSteps.map((step, index) => (
            <div className="flex min-h-[54px] items-center justify-between gap-3 rounded-[20px] bg-[#F6F3EC] px-4" key={step}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#245943] text-sm font-black text-white">
                  {index + 1}
                </span>
                <span className="text-[15px] font-bold">{step}</span>
              </div>
              <ArrowRight aria-hidden="true" className="text-[#9BA39D]" size={17} />
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
