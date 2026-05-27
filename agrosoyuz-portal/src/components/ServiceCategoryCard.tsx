import { IconGlyph } from './IconGlyph';
import { ServiceLink } from './ServiceLink';
import type { ServiceCategory } from '../types/forms';

const categoryStyles: Record<
  string,
  {
    card: string;
    panel: string;
    icon: string;
    pattern: string;
    label: string;
  }
> = {
  goods: {
    card: 'min-h-[294px] bg-[#DCE7DA] border-[#BFD5BC] shadow-[0_24px_56px_rgba(36,89,67,0.16)]',
    panel: 'bg-[#245943] text-white',
    icon: 'bg-white/18 text-white',
    pattern: 'bento-field-dark',
    label: 'Материалы',
  },
  'field-work': {
    card: 'min-h-[244px] bg-[#245943] border-[#245943] text-white shadow-[0_26px_58px_rgba(36,89,67,0.22)]',
    panel: 'bg-white/14 text-white backdrop-blur',
    icon: 'bg-white/16 text-white',
    pattern: 'bento-lines-light',
    label: 'Работы',
  },
  'storage-sales': {
    card: 'min-h-[238px] bg-white border-[#E2DED5] shadow-[0_20px_44px_rgba(24,38,31,0.09)]',
    panel: 'bg-[#ECE4D5] text-[#18261F]',
    icon: 'bg-[#DCE7DA] text-[#245943]',
    pattern: 'bento-grain',
    label: 'Оборот',
  },
  land: {
    card: 'min-h-[208px] bg-[#ECE4D5] border-[#DED3BE] shadow-[0_18px_38px_rgba(74,59,38,0.1)]',
    panel: 'bg-white/72 text-[#18261F]',
    icon: 'bg-white/70 text-[#245943]',
    pattern: 'bento-field-sand',
    label: 'Земля',
  },
  support: {
    card: 'min-h-[208px] bg-white border-[#E2DED5] shadow-[0_18px_38px_rgba(24,38,31,0.08)]',
    panel: 'bg-[#DCE7DA] text-[#18261F]',
    icon: 'bg-[#245943] text-white',
    pattern: 'bento-document',
    label: 'Контур',
  },
};

export function ServiceCategoryCard({ category, featured = false }: { category: ServiceCategory; featured?: boolean }) {
  const styles = categoryStyles[category.categorySlug] ?? categoryStyles.goods;
  const [primaryService, ...secondaryServices] = category.services;

  return (
    <section className={`relative overflow-hidden rounded-[30px] border p-4 ${styles.card}`}>
      <div className={`pointer-events-none absolute inset-0 ${styles.pattern}`} />
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/25 blur-sm" />

      <div className="relative mb-5 flex items-start justify-between gap-3">
        <div>
          <span className="mb-3 inline-flex rounded-full bg-white/42 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[#245943]">
            {styles.label}
          </span>
          <h2 className={`max-w-[250px] text-[24px] font-black leading-[1.02] tracking-[0] ${category.categorySlug === 'field-work' ? 'text-white' : 'text-[#18261F]'}`}>
            {category.categoryName}
          </h2>
        </div>
        <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] shadow-[0_12px_24px_rgba(24,38,31,0.12)] ${styles.icon}`}>
          <IconGlyph className="h-5 w-5" name={category.icon} />
        </span>
      </div>

      {primaryService ? (
        <div className={`relative mb-3 rounded-[24px] p-3 ${styles.panel}`}>
          <p className={`mb-2 text-xs font-bold ${category.categorySlug === 'field-work' || category.categorySlug === 'goods' ? 'text-white/72' : 'text-[#69756E]'}`}>
            Основная заявка
          </p>
          <ServiceLink service={primaryService} />
        </div>
      ) : null}

      <div className={`relative grid gap-2 ${featured && secondaryServices.length > 1 ? 'grid-cols-1' : 'grid-cols-1'}`}>
        {secondaryServices.map((service) => (
          <ServiceLink compact key={service.serviceSlug} service={service} />
        ))}
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-white/30 pt-3">
        <span className={`text-xs font-bold ${category.categorySlug === 'field-work' ? 'text-white/74' : 'text-[#69756E]'}`}>
          {category.services.length} услуги
        </span>
        <span className={`h-2 w-16 rounded-full ${category.categorySlug === 'field-work' ? 'bg-white/28' : 'bg-[#245943]/18'}`} />
      </div>
    </section>
  );
}
