import { ClipboardList, Sprout } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/services', label: 'Услуги', icon: Sprout },
  { to: '/requests', label: 'Мои заявки', icon: ClipboardList },
];

export function BottomNavigation() {
  return (
    <nav className="sticky bottom-0 z-20 border-t border-[#E2DED5] bg-[#F6F3EC]/95 px-5 py-3 backdrop-blur">
      <div className="grid grid-cols-2 gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              className={({ isActive }) =>
                [
                  'flex min-h-12 items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition',
                  isActive ? 'bg-[#245943] text-white' : 'bg-white text-[#536259]',
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
    </nav>
  );
}
