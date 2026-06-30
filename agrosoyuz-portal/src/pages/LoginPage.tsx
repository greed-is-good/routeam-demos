import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react';
import { MobilePageContainer } from '../components/MobilePageContainer';
import { PageContainer } from '../components/PageContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { getServiceBySlug } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';

function getServiceFromRedirect(redirect: string) {
  const match = redirect.match(/\/requests\/new\/([^/?#]+)/);
  return getServiceBySlug(match?.[1]);
}

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loginDemo } = useAuth();
  const redirect = searchParams.get('redirect') || '/requests';
  const selectedService = getServiceFromRedirect(redirect);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const finishLogin = () => {
    navigate(redirect, { replace: true });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!phone.trim()) {
      nextErrors.phone = 'Укажите телефон';
    }

    if (!password.trim()) {
      nextErrors.password = 'Укажите пароль';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    login(phone, password);
    finishLogin();
  };

  const handleDemoLogin = () => {
    loginDemo();
    finishLogin();
  };

  return (
    <MobilePageContainer>
      <main className="flex min-h-screen items-start py-6 md:items-center">
        <PageContainer size="form">
        <Link className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-agro-green" to="/">
          <ArrowLeft aria-hidden="true" size={18} />
          Назад
        </Link>

        <section className="rounded-card border border-agro-border bg-agro-surface p-5 shadow-soft">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-control bg-agro-greenSoft text-agro-green">
            <LogIn aria-hidden="true" size={24} />
          </div>
          <p className="text-lg font-bold text-agro-text">Агросоюз</p>
          <h1 className="mt-3 text-[28px] font-bold leading-tight text-agro-text">Вход в личный кабинет</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-agro-secondary">Отслеживайте свои заявки и их статус</p>

          {selectedService ? (
            <div className="mt-5 rounded-control border border-agro-border bg-agro-bg px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-agro-secondary">Вы оформляете заявку</p>
              <p className="mt-1 text-[15px] font-semibold text-agro-text">{selectedService.serviceName}</p>
            </div>
          ) : null}

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-agro-text">Телефон</span>
              <input
                className="min-h-12 rounded-control border border-agro-border bg-agro-bg px-4 text-[15px] text-agro-text outline-none focus:border-agro-green focus:bg-white"
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                value={phone}
              />
              {errors.phone ? <span className="text-sm font-medium text-agro-danger">{errors.phone}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-agro-text">Пароль</span>
              <span className="relative">
                <input
                  className="min-h-12 w-full rounded-control border border-agro-border bg-agro-bg px-4 pr-12 text-[15px] text-agro-text outline-none focus:border-agro-green focus:bg-white"
                  onChange={(event) => setPassword(event.target.value)}
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                />
                <button
                  aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                  className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full text-agro-secondary hover:bg-agro-muted"
                  onClick={() => setPasswordVisible((value) => !value)}
                  type="button"
                >
                  {isPasswordVisible ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
                </button>
              </span>
              {errors.password ? <span className="text-sm font-medium text-agro-danger">{errors.password}</span> : null}
            </label>

            <PrimaryButton fullWidth type="submit">
              {selectedService ? 'Войти и продолжить' : 'Войти'}
            </PrimaryButton>
          </form>

          <button
            className="mt-3 min-h-11 w-full rounded-control border border-dashed border-agro-border bg-agro-bg px-4 text-sm font-semibold text-agro-green"
            onClick={handleDemoLogin}
            type="button"
          >
            Продолжить с демо-данными
          </button>

          <div className="mt-5 text-center text-sm font-semibold">
            <span className="text-agro-secondary">Нет аккаунта? </span>
            <Link className="text-agro-green" to={`/register?redirect=${encodeURIComponent(redirect)}`}>
              Зарегистрироваться
            </Link>
          </div>
        </section>
        </PageContainer>
      </main>
    </MobilePageContainer>
  );
}
