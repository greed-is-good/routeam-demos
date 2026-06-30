import { IconGlyph } from './IconGlyph';
import { ServiceLink } from './ServiceLink';
import type { ServiceCategory } from '../types/forms';

export function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  return (
    <section className="rounded-card border border-agro-border bg-agro-surface p-3.5 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="mb-3 flex items-center gap-3">
        <span className="field-marker flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-agro-green">
          <IconGlyph className="h-5 w-5" name={category.icon} />
        </span>
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold leading-tight text-agro-text">{category.categoryName}</h2>
          <p className="mt-0.5 text-xs font-medium text-agro-secondary">{category.services.length} услуги</p>
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
