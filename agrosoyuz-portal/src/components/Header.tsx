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
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 pb-4 pt-5 md:px-8">
      <Link to={isAuthenticated ? '/home' : '/services'} className="inline-flex items-center gap-2" aria-label="Агросоюз">
        <span className="field-marker flex h-9 w-9 items-center justify-center rounded-[14px] text-sm font-black text-[#245943]">
          А
        </span>
        <span className="text-lg font-black tracking-[0] text-[#18261F]">Агросоюз</span>
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
    </header>
  );
}
