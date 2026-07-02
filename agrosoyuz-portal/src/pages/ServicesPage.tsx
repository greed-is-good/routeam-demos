import { AppLayout } from '../components/AppLayout';
import { CategoryCard } from '../components/CategoryCard';
import { PageContainer } from '../components/PageContainer';
import { serviceCategories } from '../config/servicesConfig';

export function ServicesPage() {
  return (
    <AppLayout>
      <PageContainer className="pb-32 md:pb-10">
        <section className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold text-agro-green">Каталог</p>
          <h1 className="mt-2 text-[32px] font-semibold leading-tight text-agro-text md:text-4xl">Выберите направление</h1>
          <p className="mt-3 text-[16px] leading-relaxed text-agro-secondary">
            Откройте нужный раздел, чтобы посмотреть доступные услуги.
          </p>
        </section>

        <section className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3" aria-label="Категории услуг">
          {serviceCategories.map((category) => (
            <CategoryCard
              category={category}
              className={category.categorySlug === 'field-work' || category.categorySlug === 'support' ? 'md:col-span-2 lg:col-span-1' : ''}
              key={category.categorySlug}
            />
          ))}
        </section>
      </PageContainer>
    </AppLayout>
  );
}
