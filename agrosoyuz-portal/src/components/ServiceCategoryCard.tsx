import { IconGlyph } from './IconGlyph';
import { ServiceLink } from './ServiceLink';
import type { ServiceCategory } from '../types/forms';

export function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  return (
    <section className="agro-card rounded-[24px] border border-[#E2DED5] bg-white p-3.5 shadow-[0_10px_24px_rgba(24,38,31,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(24,38,31,0.075)]">
      <div className="mb-3 flex items-center gap-3">
        <span className="field-marker flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-[#245943]">
          <IconGlyph className="h-5 w-5" name={category.icon} />
        </span>
        <div className="min-w-0">
          <h2 className="text-[17px] font-black leading-tight text-[#18261F]">{category.categoryName}</h2>
          <p className="mt-0.5 text-xs font-bold text-[#69756E]">{category.services.length} услуги</p>
        </div>
      </div>

      <div className="grid gap-1.5">
        {category.services.map((service) => (
          <ServiceLink key={service.serviceSlug} service={service} />
        ))}
      </div>
    </section>
  );
}
