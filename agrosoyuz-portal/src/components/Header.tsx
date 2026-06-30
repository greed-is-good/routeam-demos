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
    <header className="mx-auto flex w-full min-w-0 max-w-6xl items-center justify-between gap-3 px-4 pb-4 pt-5 sm:px-5 md:px-8">
      <Link to="/" className="inline-flex min-h-11 items-center" aria-label="Агросоюз">
        <span className="text-xl font-semibold tracking-[0] text-agro-text">Агросоюз</span>
      </Link>

      {isAuthenticated ? (
        <div className="flex shrink-0 items-center gap-2">
          <Link
            className="inline-flex min-h-11 items-center rounded-full border border-agro-border bg-agro-surface px-4 text-sm font-semibold text-agro-green"
            to="/requests"
          >
            Кабинет
          </Link>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-agro-secondary hover:bg-agro-muted hover:text-agro-green"
            onClick={handleLogout}
            type="button"
            aria-label="Выйти"
            title="Выйти"
          >
            <LogOut aria-hidden="true" size={17} />
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-agro-border bg-agro-surface px-4 text-sm font-semibold text-agro-green"
        >
          Войти
        </Link>
      )}
    </header>
  );
}
