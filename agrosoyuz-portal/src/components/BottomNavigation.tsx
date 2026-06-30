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
    <nav className="fixed inset-x-0 bottom-0 z-50 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-2 md:px-8">
      <div className="mx-auto w-full max-w-md rounded-[24px] border border-agro-border bg-agro-surface p-1.5 shadow-lift">
        <div className="grid grid-cols-3 gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.matches.some((path) =>
              path === '/' ? location.pathname === '/' : location.pathname.startsWith(path),
            );
            return (
              <Link
                className={[
                  'flex min-h-[50px] items-center justify-center gap-1.5 rounded-[18px] px-2 text-[12px] font-semibold transition duration-200 sm:text-[13px]',
                  isActive ? 'bg-agro-green text-white shadow-soft' : 'text-agro-secondary hover:bg-agro-bg',
                ].join(' ')}
                key={item.to}
                to={item.to}
              >
                <Icon aria-hidden="true" size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
