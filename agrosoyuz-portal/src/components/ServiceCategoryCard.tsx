import { IconGlyph } from './IconGlyph';
import { ServiceLink } from './ServiceLink';
import type { ServiceCategory } from '../types/forms';

export function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  return (
    <section className="rounded-[22px] border border-[#E2DED5] bg-white p-4 shadow-[0_8px_18px_rgba(24,38,31,0.05)]">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[#DCE7DA] text-[#245943]">
          <IconGlyph className="h-5 w-5" name={category.icon} />
        </span>
        <h2 className="text-[17px] font-black leading-tight text-[#18261F]">{category.categoryName}</h2>
      </div>

      <div className="grid divide-y divide-[#ECE7DD]">
        {category.services.map((service) => (
          <ServiceLink key={service.serviceSlug} service={service} />
        ))}
      </div>
    </section>
  );
}
