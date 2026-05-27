import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/services');
  };

  return (
    <header className="flex items-center justify-between px-5 pb-4 pt-5">
      <Link to="/services" className="text-lg font-black tracking-[0] text-[#18261F]" aria-label="Агросоюз">
        Агросоюз
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <Link
            to="/requests"
            className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-bold text-[#245943] shadow-[0_8px_20px_rgba(24,38,31,0.08)]"
          >
            Мои заявки
          </Link>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E2DED5] bg-white text-[#245943]"
            onClick={handleLogout}
            type="button"
            aria-label="Выйти"
            title="Выйти"
          >
            <LogOut aria-hidden="true" size={18} />
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-bold text-[#245943] shadow-[0_8px_20px_rgba(24,38,31,0.08)]"
        >
          Войти
        </Link>
      )}
    </header>
  );
}
