import { serviceCategories } from '../config/servicesConfig';
import { AppLayout } from '../components/AppLayout';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';

const workSteps = ['Выберите услугу', 'Оставьте заявку', 'Отслеживайте статус'];

export function ServicesPage() {
  return (
    <AppLayout>
      <section className="rounded-card border border-[#CBDCC8] bg-[#DCE7DA] p-5">
        <h1 className="text-[28px] font-bold leading-tight tracking-[0]">Услуги для вашего хозяйства</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#3C4B43]">
          Выберите направление и оставьте заявку. Менеджер свяжется с вами для уточнения деталей.
        </p>
      </section>

      <section className="mt-5 grid gap-4" aria-label="Каталог услуг">
        {serviceCategories.map((category, index) => (
          <ServiceCategoryCard category={category} featured={index < 3} key={category.categorySlug} />
        ))}
      </section>

      <section className="mt-5 rounded-card border border-[#E2DED5] bg-white p-4">
        <h2 className="text-xl font-bold">Как это работает</h2>
        <div className="mt-4 grid gap-3">
          {workSteps.map((step, index) => (
            <div className="flex min-h-12 items-center gap-3 rounded-2xl bg-[#F6F3EC] px-4" key={step}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#245943] text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="text-[15px] font-semibold">{step}</span>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
