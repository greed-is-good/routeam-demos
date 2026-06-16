import { useEffect, useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../hooks/useAuth';
import type { MockUser } from '../types/user';

const profileFields: Array<{
  name: keyof MockUser;
  label: string;
  multiline?: boolean;
}> = [
  { name: 'fullName', label: 'ФИО' },
  { name: 'farmName', label: 'Название хозяйства' },
  { name: 'phone', label: 'Телефон' },
  { name: 'farmSize', label: 'Размер хозяйства' },
  { name: 'crops', label: 'Что выращивает / культуры', multiline: true },
  { name: 'activity', label: 'Чем занимается' },
  { name: 'sownArea', label: 'Площадь посевных' },
  { name: 'demandedServices', label: 'Востребованные услуги', multiline: true },
];

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState<MockUser | null>(user);
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  if (!profile) {
    return null;
  }

  const handleChange = (name: keyof MockUser, value: string) => {
    setProfile((currentProfile) => {
      if (!currentProfile) {
        return currentProfile;
      }

      return {
        ...currentProfile,
        [name]: value,
      };
    });
    setSaved(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(profile);
    setSaved(true);
  };

  return (
    <AppLayout>
      <section className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-[28px] font-black leading-tight text-[#18261F]">Мой профиль</h1>
          {isSaved ? (
            <span className="shrink-0 rounded-full bg-[#DCE7DA] px-3 py-1.5 text-xs font-black text-[#245943]">
              Сохранено
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-[#69756E]">
          Данные хозяйства используются при создании заявок
        </p>
      </section>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        {profileFields.map((field) => (
          <label className={field.multiline ? 'grid gap-2 md:col-span-2' : 'grid gap-2'} key={field.name}>
            <span className="text-sm font-bold text-[#3C4B43]">{field.label}</span>
            {field.multiline ? (
              <textarea
                className="min-h-28 rounded-[20px] border border-[#E2DED5] bg-white px-4 py-3 text-[15px] font-semibold text-[#18261F] outline-none transition focus:border-[#245943] focus:shadow-[0_0_0_4px_rgba(36,89,67,0.08)]"
                onChange={(event) => handleChange(field.name, event.target.value)}
                value={profile[field.name]}
              />
            ) : (
              <input
                className="min-h-[52px] rounded-[20px] border border-[#E2DED5] bg-white px-4 text-[15px] font-semibold text-[#18261F] outline-none transition focus:border-[#245943] focus:shadow-[0_0_0_4px_rgba(36,89,67,0.08)]"
                onChange={(event) => handleChange(field.name, event.target.value)}
                value={profile[field.name]}
              />
            )}
          </label>
        ))}

        <div className="md:col-span-2">
          <PrimaryButton fullWidth type="submit">
            Сохранить профиль
          </PrimaryButton>
        </div>
      </form>
    </AppLayout>
  );
}
