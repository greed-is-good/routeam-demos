import { ArrowRight, ClipboardCheck, Sprout } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';
import { serviceCategories } from '../config/servicesConfig';

const workSteps = ['Выберите услугу', 'Оставьте заявку', 'Отслеживайте статус'];

export function ServicesPage() {
  return (
    <AppLayout>
      <section className="relative overflow-hidden rounded-[28px] bg-[#245943] p-5 text-white shadow-[0_18px_42px_rgba(36,89,67,0.18)]">
        <div className="absolute inset-0 services-hero-field" />
        <div className="relative">
          <div className="mb-10 flex items-center justify-between">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[20px] bg-[#DCE7DA] text-[#245943] shadow-[0_8px_18px_rgba(18,36,28,0.16)]">
              <Sprout aria-hidden="true" size={23} />
            </span>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#245943]">
              MVP портал
            </span>
          </div>
          <h1 className="max-w-[300px] text-[31px] font-black leading-[1.06] tracking-[0]">
            Услуги для вашего хозяйства
          </h1>
          <p className="mt-3 max-w-[312px] text-[15px] font-semibold leading-relaxed text-white">
            Выберите направление и оставьте заявку. Менеджер свяжется с вами для уточнения деталей.
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-[#E2DED5] bg-white p-4 shadow-[0_12px_28px_rgba(24,38,31,0.07)]">
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
