import { AppLayout } from '../components/AppLayout';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';
import { serviceCategories } from '../config/servicesConfig';

export function ServicesPage() {
  return (
    <AppLayout>
      <section className="mb-4">
        <h1 className="text-[28px] font-black leading-tight text-[#18261F]">Услуги для хозяйства</h1>
        <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-[#69756E]">
          Выберите направление и оставьте заявку
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2" aria-label="Каталог услуг">
        {serviceCategories.map((category) => (
          <ServiceCategoryCard category={category} key={category.categorySlug} />
        ))}
      </section>
    </AppLayout>
  );
}
