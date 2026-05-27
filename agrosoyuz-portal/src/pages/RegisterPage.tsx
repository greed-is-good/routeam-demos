import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MobilePageContainer } from '../components/MobilePageContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../hooks/useAuth';

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register } = useAuth();
  const redirect = searchParams.get('redirect') || '/requests';
  const [fullName, setFullName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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
      <main className="flex min-h-screen flex-col px-5 py-6">
        <Link className="mb-8 text-lg font-bold text-[#18261F]" to="/services">
          Агросоюз
        </Link>

        <section className="rounded-card border border-[#E2DED5] bg-white p-5">
          <h1 className="text-2xl font-bold">Регистрация</h1>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#3C4B43]">ФИО</span>
              <input
                className="min-h-12 rounded-2xl border border-[#E2DED5] px-4 text-[15px] outline-none focus:border-[#245943]"
                onChange={(event) => setFullName(event.target.value)}
                value={fullName}
              />
              {errors.fullName ? <span className="text-sm font-medium text-[#9A4D45]">{errors.fullName}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#3C4B43]">Название хозяйства</span>
              <input
                className="min-h-12 rounded-2xl border border-[#E2DED5] px-4 text-[15px] outline-none focus:border-[#245943]"
                onChange={(event) => setFarmName(event.target.value)}
                value={farmName}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#3C4B43]">Телефон</span>
              <input
                className="min-h-12 rounded-2xl border border-[#E2DED5] px-4 text-[15px] outline-none focus:border-[#245943]"
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                value={phone}
              />
              {errors.phone ? <span className="text-sm font-medium text-[#9A4D45]">{errors.phone}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#3C4B43]">Пароль</span>
              <input
                className="min-h-12 rounded-2xl border border-[#E2DED5] px-4 text-[15px] outline-none focus:border-[#245943]"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                value={password}
              />
              {errors.password ? <span className="text-sm font-medium text-[#9A4D45]">{errors.password}</span> : null}
            </label>

            <label className="flex min-h-12 items-start gap-3 rounded-2xl bg-[#F6F3EC] px-4 py-3 text-sm font-semibold text-[#3C4B43]">
              <input
                checked={accepted}
                className="mt-1 h-4 w-4 accent-[#245943]"
                onChange={(event) => setAccepted(event.target.checked)}
                type="checkbox"
              />
              <span>Согласен на обработку персональных данных</span>
            </label>
            {errors.accepted ? <span className="text-sm font-medium text-[#9A4D45]">{errors.accepted}</span> : null}

            <PrimaryButton fullWidth type="submit">
              Зарегистрироваться
            </PrimaryButton>
          </form>

          <div className="mt-5 grid gap-3 text-center text-sm font-semibold">
            <Link className="text-[#245943]" to={`/login?redirect=${encodeURIComponent(redirect)}`}>
              Уже есть аккаунт? Войти
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
