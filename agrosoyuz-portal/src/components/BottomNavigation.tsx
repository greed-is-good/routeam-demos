import { ClipboardList, Sprout } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/services', label: 'Услуги', icon: Sprout },
  { to: '/requests', label: 'Мои заявки', icon: ClipboardList },
];

export function BottomNavigation() {
  return (
    <nav className="sticky bottom-0 z-30 px-5 pb-4 pt-2">
      <div className="rounded-[24px] border border-[#E2DED5] bg-white p-1.5 shadow-[0_14px_30px_rgba(24,38,31,0.12)]">
        <div className="grid grid-cols-2 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  [
                    'flex min-h-[50px] items-center justify-center gap-2 rounded-[19px] text-sm font-black transition',
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
