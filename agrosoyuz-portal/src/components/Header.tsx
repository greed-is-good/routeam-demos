import { LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/services', label: 'Услуги' },
  { to: '/requests', label: 'Мои заявки' },
];

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/services');
  };

  return (
    <header className="px-5 pb-4 pt-5">
      <div className="flex items-center justify-between">
        <Link to="/services" className="text-lg font-black tracking-[0] text-[#18261F]" aria-label="Агросоюз">
          Агросоюз
        </Link>

        {isAuthenticated ? (
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E2DED5] bg-white text-[#245943] shadow-[0_8px_20px_rgba(24,38,31,0.08)]"
            onClick={handleLogout}
            type="button"
            aria-label="Выйти"
            title="Выйти"
          >
            <LogOut aria-hidden="true" size={18} />
          </button>
        ) : (
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-bold text-[#245943] shadow-[0_8px_20px_rgba(24,38,31,0.08)]"
          >
            Войти
          </Link>
        )}
      </div>

      <nav className="mt-4 grid grid-cols-2 gap-2 rounded-[22px] border border-[#E2DED5] bg-white p-1.5 shadow-[0_10px_24px_rgba(24,38,31,0.06)]">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              [
                'flex min-h-10 items-center justify-center rounded-[17px] text-sm font-black transition',
                isActive ? 'bg-[#245943] text-white' : 'text-[#536259] hover:bg-[#F6F3EC]',
              ].join(' ')
            }
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
