import { ClipboardList, Home, Sprout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Главная', icon: Home, matches: ['/'] },
  { to: '/services', label: 'Услуги', icon: Sprout, matches: ['/services', '/categories', '/requests/new'] },
  { to: '/requests', label: 'Мои заявки', icon: ClipboardList, matches: ['/requests'] },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(14px,env(safe-area-inset-bottom))] pt-2 sm:px-5 md:px-8">
      <div className="mx-auto w-full min-w-0 max-w-[420px] rounded-[22px] border border-agro-border bg-agro-surface p-1.5 shadow-lift">
        <div className="grid min-w-0 grid-cols-3 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.matches.some((path) =>
              path === '/' ? location.pathname === '/' : location.pathname.startsWith(path),
            );
            return (
              <Link
                className={[
                  'flex min-h-[48px] min-w-0 items-center justify-center gap-1 rounded-[17px] px-1 text-[12px] font-semibold transition duration-200 sm:gap-1.5 sm:px-2 sm:text-[13px]',
                  isActive ? 'bg-agro-green text-white shadow-soft' : 'text-agro-secondary hover:bg-agro-bg',
                ].join(' ')}
                key={item.to}
                to={item.to}
              >
                <Icon aria-hidden="true" className="shrink-0" size={17} />
                <span className="min-w-0 truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
