import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categoryDescriptions } from '../config/servicesConfig';
import type { ServiceCategory } from '../types/forms';
import { IconGlyph } from './IconGlyph';

const toneClassNames = {
  accent: 'bg-agro-greenSoft',
  sand: 'bg-agro-sand',
  white: 'bg-agro-surface',
};

export function CategoryCard({
  category,
  className = '',
}: {
  category: ServiceCategory;
  className?: string;
}) {
  return (
    <Link
      className={[
        'group flex min-h-[172px] min-w-0 flex-col justify-between rounded-card border border-agro-border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.99]',
        toneClassNames[category.tone],
        className,
      ].join(' ')}
      to={`/categories/${category.categorySlug}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-white/70 text-agro-green ring-1 ring-agro-border/70">
          <IconGlyph className="h-5 w-5" name={category.icon} />
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-agro-green transition group-hover:translate-x-0.5">
          <ArrowRight aria-hidden="true" size={17} />
        </span>
      </div>

      <div className="mt-5 min-w-0">
        <h3 className="text-[19px] font-semibold leading-tight text-agro-text">{category.categoryName}</h3>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-agro-secondary">
          {categoryDescriptions[category.categorySlug]}
        </p>
        <p className="mt-4 text-sm font-semibold text-agro-green">Открыть направление · {category.services.length} услуги</p>
      </div>
    </Link>
  );
}
