import { ClipboardList, Home, Sprout, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/home', label: 'Главная', icon: Home },
  { to: '/services', label: 'Услуги', icon: Sprout },
  { to: '/requests', label: 'Заявки', icon: ClipboardList },
  { to: '/profile', label: 'Профиль', icon: UserRound },
];

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-2 md:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-[24px] border border-[#E2DED5] bg-white p-1.5 shadow-[0_14px_34px_rgba(24,38,31,0.16)]">
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  [
                    'flex min-h-[50px] items-center justify-center gap-1 rounded-[19px] px-1.5 text-[11px] font-black transition sm:gap-1.5 sm:text-sm',
                    isActive
                      ? 'bg-[#245943] text-white shadow-[0_10px_22px_rgba(36,89,67,0.18)]'
                      : 'text-[#536259] hover:bg-[#F6F3EC]',
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
