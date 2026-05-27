import { ArrowRight, ClipboardCheck, Leaf, Sprout } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobilePageContainer } from '../components/MobilePageContainer';

const ONBOARDING_STORAGE_KEY = 'agrosoyuz.onboardingSeen';

const slides = [
  {
    eyebrow: 'Портал фермера',
    title: 'Ваше хозяйство, заявки и услуги в одном месте',
    text: 'Выберите нужное направление, оставьте заявку и отслеживайте её статус без лишних звонков на старте.',
    icon: Sprout,
  },
  {
    eyebrow: '11 направлений',
    title: 'От материалов до сопровождения хозяйства',
    text: 'Удобрения, СЗР, техника, хранение, земля, бухгалтерия и товарное кредитование собраны в понятном каталоге.',
    icon: Leaf,
  },
  {
    eyebrow: 'Mock MVP',
    title: 'Быстрый сценарий для оценки реализации',
    text: 'Формы, статусы и сохранение заявок работают локально, чтобы показать базовый пользовательский путь.',
    icon: ClipboardCheck,
  },
];

function rememberOnboardingSeen() {
  window.localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
}

export function hasSeenOnboarding() {
  return window.localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
}

export function OnboardingPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const slide = slides[activeSlide];
  const Icon = slide.icon;
  const isLastSlide = activeSlide === slides.length - 1;

  const fieldRows = useMemo(
    () => Array.from({ length: 9 }, (_, index) => ({ id: index, offset: index % 2 === 0 ? 0 : 18 })),
    [],
  );

  const goToServices = () => {
    rememberOnboardingSeen();
    navigate('/services', { replace: true });
  };

  const goNext = () => {
    if (isLastSlide) {
      goToServices();
      return;
    }

    setActiveSlide((currentSlide) => currentSlide + 1);
  };

  return (
    <MobilePageContainer variant="dark">
      <main className="relative flex min-h-screen overflow-hidden bg-[#163A2D] text-white">
        <div className="absolute inset-0 onboarding-field" aria-hidden="true">
          {fieldRows.map((row) => (
            <span key={row.id} style={{ transform: `translateX(${row.offset}px) rotate(-18deg)` }} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#123326]/5 via-[#123326]/15 to-[#0D2118]" />

        <section className="relative z-10 flex min-h-screen w-full flex-col justify-between px-6 pb-7 pt-5">
          <header className="flex items-center justify-between">
            <span className="text-lg font-bold">Агросоюз</span>
            <button
              className="min-h-11 rounded-full bg-white/12 px-4 text-sm font-semibold text-white backdrop-blur"
              onClick={goToServices}
              type="button"
            >
              Пропустить
            </button>
          </header>

          <div className="mt-8 flex-1">
            <div className="relative mx-auto h-[360px] max-w-[320px]">
              <div className="absolute left-6 top-5 h-36 w-36 rounded-full bg-[#8BCB5B]/30 blur-3xl" />
              <div className="absolute right-0 top-20 h-28 w-28 rounded-full bg-[#ECE4D5]/20 blur-2xl" />

              <div className="absolute left-1/2 top-8 w-[245px] -translate-x-1/2 rounded-[34px] border border-white/35 bg-[#F6F3EC]/95 p-3 text-[#18261F] shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
                <div className="h-[320px] overflow-hidden rounded-[26px] bg-[#F6F3EC]">
                  <div className="relative h-40 bg-[#245943] p-4 text-white">
                    <div className="absolute inset-0 mini-field" />
                    <div className="relative flex items-start justify-between">
                      <div>
                        <p className="text-xs text-white/75">Сегодня</p>
                        <p className="mt-1 text-3xl font-bold">24°C</p>
                      </div>
                      <span className="rounded-2xl bg-white/18 px-3 py-2 text-xs font-semibold">Ясно</span>
                    </div>
                    <p className="relative mt-7 text-xs leading-relaxed text-white/80">
                      Выберите услугу и отправьте заявку менеджеру.
                    </p>
                  </div>
                  <div className="grid gap-3 p-3">
                    <div className="rounded-2xl bg-white p-3 shadow-[0_8px_20px_rgba(24,38,31,0.08)]">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-bold">Заявки</span>
                        <span className="rounded-full bg-[#DCE7DA] px-2 py-1 text-[11px] font-bold text-[#245943]">
                          Получена
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-32 rounded-full bg-[#E2DED5]" />
                        <div className="h-3 w-40 rounded-full bg-[#ECE4D5]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-2xl bg-[#DCE7DA] p-3">
                        <p className="text-lg font-bold">11</p>
                        <p className="text-[11px] font-semibold text-[#536259]">услуг</p>
                      </div>
                      <div className="rounded-2xl bg-[#ECE4D5] p-3">
                        <p className="text-lg font-bold">4</p>
                        <p className="text-[11px] font-semibold text-[#536259]">статуса</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="rounded-[28px] bg-[#F6F3EC] p-5 text-[#18261F] shadow-[0_22px_60px_rgba(0,0,0,0.22)]">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCE7DA] text-[#245943]">
              <Icon aria-hidden="true" size={23} />
            </div>
            <p className="text-sm font-bold text-[#245943]">{slide.eyebrow}</p>
            <h1 className="mt-2 text-[28px] font-black leading-[1.05] tracking-[0]">{slide.title}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#536259]">{slide.text}</p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {slides.map((item, index) => (
                  <button
                    aria-label={`Экран ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-[#245943]' : 'w-2.5 bg-[#CFC8B9]'}`}
                    key={item.title}
                    onClick={() => setActiveSlide(index)}
                    type="button"
                  />
                ))}
              </div>
              <button
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#8BCB5B] px-5 text-sm font-bold text-[#102418] shadow-[0_12px_30px_rgba(139,203,91,0.25)]"
                onClick={goNext}
                type="button"
              >
                {isLastSlide ? 'К услугам' : 'Далее'}
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </section>
        </section>
      </main>
    </MobilePageContainer>
  );
}
