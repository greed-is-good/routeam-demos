import { ClipboardList, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/requests', label: 'Мои заявки', icon: ClipboardList },
];

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-2 md:px-8">
      <div className="mx-auto w-full max-w-md rounded-[24px] border border-agro-border bg-agro-surface p-1.5 shadow-lift">
        <div className="grid grid-cols-2 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  [
                    'flex min-h-[50px] items-center justify-center gap-1.5 rounded-[18px] px-3 text-[13px] font-semibold transition duration-200',
                    isActive
                      ? 'bg-agro-green text-white shadow-soft'
                      : 'text-agro-secondary hover:bg-agro-bg',
                  ].join(' ')
                }
                key={item.to}
                to={item.to}
              >
                <Icon aria-hidden="true" size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
