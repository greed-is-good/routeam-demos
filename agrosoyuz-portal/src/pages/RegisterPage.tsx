import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { MobilePageContainer } from '../components/MobilePageContainer';
import { PageContainer } from '../components/PageContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { getServiceBySlug } from '../config/servicesConfig';
import { useAuth } from '../hooks/useAuth';

function getServiceFromRedirect(redirect: string) {
  const match = redirect.match(/\/requests\/new\/([^/?#]+)/);
  return getServiceBySlug(match?.[1]);
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register } = useAuth();
  const redirect = searchParams.get('redirect') || '/requests';
  const selectedService = getServiceFromRedirect(redirect);
  const [fullName, setFullName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Укажите ФИО';
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Укажите телефон';
    }

    if (!password.trim()) {
      nextErrors.password = 'Укажите пароль';
    }

    if (!accepted) {
      nextErrors.accepted = 'Подтвердите согласие';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    register({ fullName, farmName, phone, password });
    navigate(redirect, { replace: true });
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
          <p className="text-lg font-bold text-agro-text">Агросоюз</p>
          <h1 className="mt-3 text-[28px] font-bold leading-tight text-agro-text">Регистрация</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-agro-secondary">Создайте mock-профиль для отправки заявок.</p>
          {selectedService ? (
            <div className="mt-5 rounded-control border border-agro-border bg-agro-bg px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-agro-secondary">Вы оформляете заявку</p>
              <p className="mt-1 text-[15px] font-semibold text-agro-text">{selectedService.serviceName}</p>
            </div>
          ) : null}

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-agro-text">ФИО</span>
              <input
                className="min-h-12 rounded-control border border-agro-border bg-agro-bg px-4 text-[15px] outline-none focus:border-agro-green focus:bg-white"
                onChange={(event) => setFullName(event.target.value)}
                value={fullName}
              />
              {errors.fullName ? <span className="text-sm font-medium text-agro-danger">{errors.fullName}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-agro-text">Название хозяйства</span>
              <input
                className="min-h-12 rounded-control border border-agro-border bg-agro-bg px-4 text-[15px] outline-none focus:border-agro-green focus:bg-white"
                onChange={(event) => setFarmName(event.target.value)}
                value={farmName}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-agro-text">Телефон</span>
              <input
                className="min-h-12 rounded-control border border-agro-border bg-agro-bg px-4 text-[15px] outline-none focus:border-agro-green focus:bg-white"
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
                  className="min-h-12 w-full rounded-control border border-agro-border bg-agro-bg px-4 pr-12 text-[15px] outline-none focus:border-agro-green focus:bg-white"
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

            <label className="flex min-h-12 items-start gap-3 rounded-control bg-agro-bg px-4 py-3 text-sm font-semibold text-agro-text">
              <input
                checked={accepted}
                className="mt-1 h-4 w-4 accent-agro-green"
                onChange={(event) => setAccepted(event.target.checked)}
                type="checkbox"
              />
              <span>Согласен на обработку персональных данных</span>
            </label>
            {errors.accepted ? <span className="text-sm font-medium text-agro-danger">{errors.accepted}</span> : null}

            <PrimaryButton fullWidth type="submit">
              Зарегистрироваться
            </PrimaryButton>
          </form>

          <div className="mt-5 text-center text-sm font-semibold">
            <Link className="text-agro-green" to={`/login?redirect=${encodeURIComponent(redirect)}`}>
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </section>
        </PageContainer>
      </main>
    </MobilePageContainer>
  );
}
