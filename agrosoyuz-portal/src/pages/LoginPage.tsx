import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { MobilePageContainer } from '../components/MobilePageContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loginDemo } = useAuth();
  const redirect = searchParams.get('redirect') || '/requests';
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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
      <main className="flex min-h-screen flex-col px-5 py-6">
        <Link className="mb-8 text-lg font-bold text-[#18261F]" to="/services">
          Агросоюз
        </Link>

        <section className="rounded-card border border-[#E2DED5] bg-white p-5">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE7DA] text-[#245943]">
            <LogIn aria-hidden="true" size={24} />
          </div>
          <h1 className="text-2xl font-bold">Вход в личный кабинет</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[#69756E]">Отслеживайте свои заявки и их статус</p>

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#3C4B43]">Телефон</span>
              <input
                className="min-h-12 rounded-2xl border border-[#E2DED5] bg-white px-4 text-[15px] outline-none focus:border-[#245943]"
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                value={phone}
              />
              {errors.phone ? <span className="text-sm font-medium text-[#9A4D45]">{errors.phone}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#3C4B43]">Пароль</span>
              <input
                className="min-h-12 rounded-2xl border border-[#E2DED5] bg-white px-4 text-[15px] outline-none focus:border-[#245943]"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                value={password}
              />
              {errors.password ? <span className="text-sm font-medium text-[#9A4D45]">{errors.password}</span> : null}
            </label>

            <PrimaryButton fullWidth type="submit">
              Войти
            </PrimaryButton>
          </form>

          <button
            className="mt-3 min-h-11 w-full rounded-2xl border border-dashed border-[#D7D0C3] bg-[#F6F3EC] px-4 text-sm font-semibold text-[#245943]"
            onClick={handleDemoLogin}
            type="button"
          >
            Войти в демо-аккаунт
          </button>

          <div className="mt-5 grid gap-3 text-center text-sm font-semibold">
            <Link className="text-[#245943]" to={`/register?redirect=${encodeURIComponent(redirect)}`}>
              Создать аккаунт
            </Link>
            <Link className="text-[#69756E]" to="/services">
              Вернуться к услугам
            </Link>
          </div>
        </section>
      </main>
    </MobilePageContainer>
  );
}
