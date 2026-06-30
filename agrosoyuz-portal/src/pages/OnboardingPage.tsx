import { ArrowRight, CheckCircle2, ClipboardCheck, Layers3, Sprout } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobilePageContainer } from '../components/MobilePageContainer';

const ONBOARDING_STORAGE_KEY = 'agrosoyuz.onboardingSeen';

const slides = [
  {
    eyebrow: 'Портал фермера',
    title: 'Выберите услугу для хозяйства',
    text: 'Каталог открыт сразу: материалы, техника, хранение, земля и сопровождение собраны в одном мобильном интерфейсе.',
    icon: Sprout,
    visual: 'catalog',
  },
  {
    eyebrow: 'Заявка без лишних шагов',
    title: 'Заполните форму по выбранной услуге',
    text: 'Форма собирается под конкретное направление. Контактные данные подставляются из mock-профиля.',
    icon: ClipboardCheck,
    visual: 'form',
  },
  {
    eyebrow: 'Контроль статуса',
    title: 'Смотрите заявки и их состояние',
    text: 'После отправки заявка сохраняется локально, появляется в списке и открывается в карточке с деталями.',
    icon: CheckCircle2,
    visual: 'status',
  },
];

function rememberOnboardingSeen() {
  window.localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
}

export function hasSeenOnboarding() {
  return window.localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
}

function OnboardingVisual({ type }: { type: string }) {
  if (type === 'form') {
    return (
      <div className="grid gap-3">
        <div className="flex items-center justify-between rounded-[24px] bg-white p-4 shadow-[0_14px_28px_rgba(10,30,20,0.12)]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#69756E]">Форма</p>
            <p className="mt-1 text-lg font-black text-[#18261F]">Удобрения</p>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#DCE7DA] text-[#245943]">
            <ClipboardCheck size={21} />
          </span>
        </div>
        {['ФИО заявителя', 'Телефон', 'Культура', 'Требуемый объём'].map((label) => (
          <div className="rounded-[20px] bg-[#F6F3EC] p-3" key={label}>
            <p className="text-xs font-bold text-[#69756E]">{label}</p>
            <div className="mt-2 h-3 w-3/4 rounded-full bg-[#D7D0C3]" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'status') {
    return (
      <div className="grid gap-3">
        {[
          ['AG-0241', 'Получена', 'bg-[#DBEAFE] text-[#24507A]'],
          ['AG-0198', 'В обработке', 'bg-[#F7E8C8] text-[#7A5520]'],
          ['AG-0142', 'Исполнена', 'bg-[#DCE7DA] text-[#245943]'],
        ].map(([number, status, badgeClassName]) => (
          <div className="rounded-[24px] bg-white p-4 shadow-[0_14px_28px_rgba(10,30,20,0.1)]" key={number}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#69756E]">{number}</p>
                <p className="mt-1 text-base font-black text-[#18261F]">Заявка по услуге</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${badgeClassName}`}>{status}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 rounded-[28px] bg-[#DCE7DA] p-4 text-[#18261F] shadow-[0_14px_28px_rgba(10,30,20,0.1)]">
        <div className="mb-8 flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-white text-[#245943]">
            <Layers3 size={21} />
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#245943]">5 категорий</span>
        </div>
        <p className="text-2xl font-black leading-tight">Товары и материалы</p>
        <p className="mt-2 text-sm font-semibold text-[#536259]">Удобрения, СЗР, посевной материал</p>
      </div>
      {['Техника', 'Хранение', 'Земля', 'Учёт'].map((item) => (
        <div className="min-h-[82px] rounded-[24px] bg-white p-3 shadow-[0_12px_24px_rgba(10,30,20,0.08)]" key={item}>
          <div className="mb-4 h-8 w-8 rounded-[14px] bg-[#ECE4D5]" />
          <p className="text-sm font-black text-[#18261F]">{item}</p>
        </div>
      ))}
    </div>
  );
}

export function OnboardingPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const slide = slides[activeSlide];
  const Icon = slide.icon;
  const isLastSlide = activeSlide === slides.length - 1;

  const goToServices = () => {
    rememberOnboardingSeen();
    navigate('/', { replace: true });
  };

  const goNext = () => {
    if (isLastSlide) {
      goToServices();
      return;
    }

    setActiveSlide((currentSlide) => currentSlide + 1);
  };

  return (
    <MobilePageContainer>
      <main className="flex min-h-screen flex-col bg-[#F6F3EC] px-5 py-5">
        <header className="flex items-center justify-between">
          <span className="text-lg font-black text-[#18261F]">Агросоюз</span>
          <button
            className="min-h-11 rounded-full bg-white px-4 text-sm font-black text-[#245943] shadow-[0_8px_20px_rgba(24,38,31,0.08)]"
            onClick={goToServices}
            type="button"
          >
            Пропустить
          </button>
        </header>

        <section className="mt-5 rounded-[34px] bg-[#245943] p-4 shadow-[0_22px_52px_rgba(36,89,67,0.2)]">
          <div className="rounded-[28px] bg-[#F6F3EC] p-4">
            <OnboardingVisual type={slide.visual} />
          </div>
        </section>

        <section className="mt-auto pt-6">
          <div className="rounded-[30px] bg-white p-5 shadow-[0_18px_42px_rgba(24,38,31,0.1)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[20px] bg-[#DCE7DA] text-[#245943]">
              <Icon aria-hidden="true" size={24} />
            </div>
            <p className="text-sm font-black text-[#245943]">{slide.eyebrow}</p>
            <h1 className="mt-2 text-[28px] font-black leading-[1.08] tracking-[0] text-[#18261F]">{slide.title}</h1>
            <p className="mt-3 text-[15px] font-semibold leading-relaxed text-[#536259]">{slide.text}</p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {slides.map((item, index) => (
                  <button
                    aria-label={`Экран ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-[#245943]' : 'w-2.5 bg-[#D7D0C3]'}`}
                    key={item.title}
                    onClick={() => setActiveSlide(index)}
                    type="button"
                  />
                ))}
              </div>
              <button
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#245943] px-5 text-sm font-black text-white shadow-[0_12px_26px_rgba(36,89,67,0.2)]"
                onClick={goNext}
                type="button"
              >
                {isLastSlide ? 'К услугам' : 'Далее'}
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </MobilePageContainer>
  );
}
