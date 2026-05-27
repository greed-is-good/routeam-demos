import { ArrowRight } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';
import { serviceCategories } from '../config/servicesConfig';

const workSteps = ['Выберите услугу', 'Оставьте заявку', 'Отслеживайте статус'];

export function ServicesPage() {
  return (
    <AppLayout>
      <section className="mb-4">
        <h1 className="text-[28px] font-black leading-tight text-[#18261F]">Услуги для хозяйства</h1>
        <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-[#69756E]">
          Выберите направление и оставьте заявку
        </p>
      </section>

      <section className="grid gap-3" aria-label="Каталог услуг">
        {serviceCategories.map((category) => (
          <ServiceCategoryCard category={category} key={category.categorySlug} />
        ))}
      </section>

      <section className="mt-4 rounded-[22px] border border-[#E2DED5] bg-white p-4 shadow-[0_8px_18px_rgba(24,38,31,0.05)]">
        <h2 className="text-base font-black text-[#18261F]">Как это работает</h2>
        <div className="mt-3 flex items-center gap-2 overflow-hidden text-sm font-bold text-[#536259]">
          {workSteps.map((step, index) => (
            <div className="flex min-w-0 items-center gap-2" key={step}>
              <span className="truncate">{step}</span>
              {index < workSteps.length - 1 ? (
                <ArrowRight aria-hidden="true" className="shrink-0 text-[#245943]" size={14} />
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
