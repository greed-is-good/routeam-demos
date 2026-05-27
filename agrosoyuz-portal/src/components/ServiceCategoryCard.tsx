import { IconGlyph } from './IconGlyph';
import { ServiceLink } from './ServiceLink';
import type { ServiceCategory } from '../types/forms';

const toneClassNames: Record<ServiceCategory['tone'], string> = {
  accent: 'bg-[#DCE7DA] border-[#CBDCC8]',
  sand: 'bg-[#ECE4D5] border-[#E2DED5]',
  white: 'bg-white border-[#E2DED5]',
};

export function ServiceCategoryCard({ category, featured = false }: { category: ServiceCategory; featured?: boolean }) {
  return (
    <section className={`rounded-card border p-4 ${toneClassNames[category.tone]} ${featured ? 'min-h-[236px]' : ''}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="max-w-[260px] text-xl font-bold leading-tight text-[#18261F]">{category.categoryName}</h2>
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-[#245943]">
          <IconGlyph className="h-5 w-5" name={category.icon} />
        </span>
      </div>
      <div className="grid gap-2.5">
        {category.services.map((service) => (
          <ServiceLink key={service.serviceSlug} service={service} />
        ))}
      </div>
    </section>
  );
}
