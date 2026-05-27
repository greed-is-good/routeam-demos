import { ClipboardList, Sprout } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/services', label: 'Услуги', icon: Sprout },
  { to: '/requests', label: 'Мои заявки', icon: ClipboardList },
];

export function BottomNavigation() {
  return (
    <nav className="sticky bottom-0 z-30 px-5 pb-4 pt-2">
      <div className="rounded-[28px] border border-white/12 bg-[#173A2C]/96 p-2 shadow-[0_20px_44px_rgba(20,45,35,0.28)] backdrop-blur">
        <div className="grid grid-cols-2 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  [
                    'flex min-h-[52px] items-center justify-center gap-2 rounded-[22px] text-sm font-bold transition',
                    isActive
                      ? 'bg-[#8BCB5B] text-[#102418] shadow-[0_10px_22px_rgba(139,203,91,0.24)]'
                      : 'text-white/74 hover:bg-white/8',
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
