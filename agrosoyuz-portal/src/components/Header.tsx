import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pb-4 pt-5 md:px-8">
      <Link to="/" className="inline-flex items-center gap-2" aria-label="Агросоюз">
        <span className="field-marker flex h-9 w-9 items-center justify-center rounded-[14px] text-sm font-bold text-agro-green">
          А
        </span>
        <span className="text-lg font-bold tracking-[0] text-agro-text">Агросоюз</span>
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <Link
            to="/requests"
            className="inline-flex min-h-11 items-center rounded-full border border-agro-border bg-agro-surface px-4 text-sm font-semibold text-agro-green"
          >
            Мои заявки
          </Link>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-agro-border bg-agro-surface text-agro-green"
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
          className="inline-flex min-h-11 items-center rounded-full border border-agro-border bg-agro-surface px-4 text-sm font-semibold text-agro-green"
        >
          Войти
        </Link>
      )}
    </header>
  );
}
