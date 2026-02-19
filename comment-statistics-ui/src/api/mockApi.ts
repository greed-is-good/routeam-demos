import { COMMENT_CATEGORIES } from '../constants/categories';
import type {
  AppSettings,
  AuthResponse,
  CategoryStat,
  LicenseInfo,
  LicenseStatus,
  LoginRequest,
  ParserScheduleMode,
  ReportCommentRow,
  StatisticsRequest,
  StatisticsResponse,
  WeekdayCode,
} from '../types/models';

const STORAGE_KEYS = {
  settings: 'city-feedback.settings',
  license: 'city-feedback.license',
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  vkSources: ['https://vk.com/city_official'],
  reportEmails: ['moderator@cityfeedback.local'],
  parserScheduleMode: 'minutes',
  parserIntervalMinutes: 30,
  parserDailyTime: '09:00',
  parserWeeklyDays: ['mon', 'wed', 'fri'],
  parserWeeklyTime: '09:00',
};

const VALID_SCHEDULE_MODES: ParserScheduleMode[] = ['minutes', 'daily', 'weekly'];
const VALID_WEEKDAY_CODES: WeekdayCode[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

interface StoredLicense extends LicenseInfo {
  rawKey: string | null;
}

const DEFAULT_LICENSE: StoredLicense = {
  rawKey: null,
  maskedKey: null,
  status: 'not_activated',
  expiresAt: null,
  monthlyUsage: 0,
  monthlyLimit: 500,
  checkedAt: new Date().toISOString(),
};

const MOCK_USER = {
  username: 'admin',
  password: 'admin123',
};

const BASE_LATENCY = 350;
export const LICENSE_UPDATED_EVENT = 'city-feedback:license-updated';
const AUTHOR_FIRST_NAMES = [
  'Ivan',
  'Petr',
  'Sergey',
  'Mikhail',
  'Alexey',
  'Dmitry',
  'Andrey',
  'Nikolay',
  'Roman',
  'Kirill',
] as const;

const AUTHOR_LAST_NAMES = [
  'Smirnov',
  'Ivanov',
  'Petrov',
  'Sidorov',
  'Kuznetsov',
  'Volkov',
  'Fedorov',
  'Egorov',
  'Romanov',
  'Orlov',
] as const;

const CITY_PLACES = [
  'ул. Ленина',
  'пр. Победы',
  'ул. Гагарина',
  'ул. Центральная',
  'ул. Молодежная',
  'ул. Школьная',
  'мкр. Северный',
  'мкр. Южный',
  'наб. Городская',
  'ул. Советская',
] as const;

const BUS_ROUTES = ['2', '5', '8', '12', '17', '23', '34', '44', '61', '72'] as const;

const CLINICS = [
  'поликлиника №1',
  'поликлиника №2',
  'поликлиника №3',
  'детская поликлиника',
  'городская больница',
] as const;

const CATEGORY_COMMENT_TEMPLATES: Record<string, readonly string[]> = {
  'Водоснабжение и ЖКХ': [
    'На {place}, дом {house}, с утра нет холодной воды. Уже не первый раз за неделю.',
    'Вечером на {place} вода идет ржавая, невозможно ни помыться, ни постирать.',
    'Почему в доме на {place}, {house}, постоянно скачет напор воды? Сделайте уже нормально.',
    'На {place} опять отключили воду без предупреждения. Можно заранее информировать жителей?',
  ],
  'Дороги / Инфраструктура': [
    'На {place} такие ямы, что подвеску жалко. Когда будет ремонт?',
    'После дождя на {place} одно сплошное озеро, пройти пешком невозможно.',
    'На перекрестке у {place} стерлась разметка, в темноте вообще ничего не видно.',
    'На {place}, возле дома {house}, провалился асфальт. Это уже опасно.',
  ],
  Благоустройство: [
    'Во дворе на {place} контейнеры переполнены, мусор уже вокруг лежит.',
    'На {place} давно не убирали, урны полные и листья никто не вывозит.',
    'Поставьте, пожалуйста, освещение на {place}, вечером очень темно и некомфортно.',
    'На детской площадке у {place} сломаны качели, детям просто негде играть.',
  ],
  'Аварийное жилье': [
    'В доме на {place}, {house}, трещины по стенам растут. Нужна проверка срочно.',
    'На {place} в подъезде осыпается потолок, страшно заходить.',
    'После дождя на {place}, дом {house}, течет крыша на верхних этажах.',
    'Дом на {place} официально аварийный, но никаких подвижек по расселению нет.',
  ],
  Медицина: [
    'В {clinic} невозможно записаться к терапевту, ближайшая запись только через две недели.',
    'На {place} в аптеке при поликлинике постоянно нет льготных лекарств.',
    'В {clinic} огромные очереди, прием задерживается на 1.5-2 часа.',
    'В {clinic} не работает электронная очередь, люди ругаются в коридоре каждый день.',
  ],
  'Семьи СВО': [
    'Подскажите, куда обращаться по выплатам для семей СВО? На местах дают разную информацию.',
    'Заявление для семьи СВО подали давно, а ответа до сих пор нет. Можно ускорить рассмотрение?',
    'Нужна помощь семье СВО с оформлением льгот, на горячей линии никто толком не объясняет.',
    'Почему по поддержке семей СВО в разных окнах разные требования к документам?',
  ],
  'Молодежь, спорт': [
    'На {place} спортивная площадка без освещения, после 18:00 уже не позаниматься.',
    'Секция для детей переполнена, добавьте еще группы в районе {place}.',
    'Стадион на {place} закрыт по выходным, хотя это единственное место для тренировок рядом.',
    'В молодежном центре на {place} отменили занятия без предупреждения, это уже не первый раз.',
  ],
  'Общественный транспорт': [
    'Автобус №{route} утром едет битком, люди не могут зайти на остановке у {place}.',
    'Маршрут №{route} постоянно опаздывает на 20-30 минут. Можно стабилизировать расписание?',
    'На остановке у {place} нет табло и навеса, в дождь стоять невозможно.',
    'После 21:00 маршрут №{route} почти не ходит, из центра домой не уехать.',
  ],
  Другое: [
    'Подскажите, пожалуйста, куда направить обращение по ситуации на {place}?',
    'На {place} уже несколько дней не работает уличное освещение.',
    'Нужна обратная связь по жалобе, которую оставляли раньше по району {place}.',
    'Проверьте, пожалуйста, состояние территории на {place}, там явный беспорядок.',
  ],
};

const FALLBACK_COMMENT_TEMPLATES = [
  'На {place} есть проблема, прошу проверить и дать обратную связь.',
  'Прошу обратить внимание на ситуацию на {place}, ждем решение.',
] as const;

function withLatency<T>(factory: () => T): Promise<T> {
  const latency = BASE_LATENCY + Math.round(Math.random() * 250);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(factory());
      } catch (error) {
        reject(error);
      }
    }, latency);
  });
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeTime(value: string | undefined, fallback: string): string {
  if (!value) {
    return fallback;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return fallback;
  }

  const match = /^(\d{1,2}):(\d{2})$/.exec(trimmed);
  if (!match) {
    return fallback;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return fallback;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function normalizeScheduleMode(mode: unknown): ParserScheduleMode {
  if (typeof mode !== 'string') {
    return DEFAULT_SETTINGS.parserScheduleMode;
  }

  return VALID_SCHEDULE_MODES.includes(mode as ParserScheduleMode)
    ? (mode as ParserScheduleMode)
    : DEFAULT_SETTINGS.parserScheduleMode;
}

function normalizeWeekdayCodes(days: unknown): WeekdayCode[] {
  if (!Array.isArray(days)) {
    return DEFAULT_SETTINGS.parserWeeklyDays;
  }

  const filtered = days.filter((day): day is WeekdayCode =>
    VALID_WEEKDAY_CODES.includes(day as WeekdayCode),
  );
  const unique = [...new Set(filtered)];
  return unique.length ? unique : DEFAULT_SETTINGS.parserWeeklyDays;
}

function normalizeSettings(source: Partial<AppSettings> | AppSettings): AppSettings {
  return {
    vkSources: (source.vkSources ?? []).map((sourceUrl) => sourceUrl.trim()).filter(Boolean),
    reportEmails: (source.reportEmails ?? []).map((email) => email.trim()).filter(Boolean),
    parserScheduleMode: normalizeScheduleMode(source.parserScheduleMode),
    parserIntervalMinutes: Math.max(
      1,
      Math.round(source.parserIntervalMinutes ?? DEFAULT_SETTINGS.parserIntervalMinutes),
    ),
    parserDailyTime: normalizeTime(source.parserDailyTime, DEFAULT_SETTINGS.parserDailyTime),
    parserWeeklyDays: normalizeWeekdayCodes(source.parserWeeklyDays),
    parserWeeklyTime: normalizeTime(source.parserWeeklyTime, DEFAULT_SETTINGS.parserWeeklyTime),
  };
}

function emitLicenseUpdated(payload: LicenseInfo): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent<LicenseInfo>(LICENSE_UPDATED_EVENT, { detail: payload }));
}

function toMockJwt(username: string): string {
  const payload = {
    sub: username,
    role: 'admin',
    iat: Date.now(),
  };

  return `mock.${window.btoa(JSON.stringify(payload))}.signature`;
}

function maskLicenseKey(key: string): string {
  if (key.length <= 8) {
    return `${key.slice(0, 2)}****${key.slice(-2)}`;
  }

  return `${key.slice(0, 4)}-${'*'.repeat(Math.max(4, key.length - 8))}-${key.slice(-4)}`;
}

function detectLicenseStatus(key: string): LicenseStatus {
  const normalized = key.toUpperCase();

  if (normalized.includes('EXPIRED')) {
    return 'expired';
  }
  if (normalized.includes('SUSPEND')) {
    return 'suspended';
  }
  if (normalized.includes('LIMIT')) {
    return 'limit_exceeded';
  }
  if (normalized.includes('OFFLINE')) {
    return 'gateway_unavailable';
  }

  return 'active';
}

function calculateUsageFromKey(key: string, monthlyLimit: number): number {
  const checksum = [...key].reduce((sum, symbol) => sum + symbol.charCodeAt(0), 0);
  return Math.min(monthlyLimit, (checksum % 280) + 120);
}

function ensureVkSourcesConfigured(): void {
  const settings = normalizeSettings(readStorage<AppSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS));
  const hasSources = settings.vkSources.some((source) => source.trim().length > 0);

  if (!hasSources) {
    throw new Error(
      'Добавьте хотя бы один источник ВКонтакте в разделе «Настройки», чтобы сформировать отчет',
    );
  }
}

function makeStatistics(from: string, to: string): CategoryStat[] {
  const seed = [...`${from}:${to}`].reduce((sum, symbol) => sum + symbol.charCodeAt(0), 0);

  return COMMENT_CATEGORIES.map((category, index) => {
    const count = ((seed + index * 29) % 42) + 6;
    return { category, count };
  });
}

function makeSeed(input: string): number {
  return [...input].reduce((sum, symbol) => sum + symbol.charCodeAt(0), 0);
}

function pseudoRandomInt(seed: number, min: number, max: number): number {
  const normalized = Math.abs(Math.sin(seed) * 10000);
  const fraction = normalized - Math.floor(normalized);
  return Math.floor(fraction * (max - min + 1)) + min;
}

function buildAuthorName(seed: number): string {
  const first = AUTHOR_FIRST_NAMES[pseudoRandomInt(seed + 3, 0, AUTHOR_FIRST_NAMES.length - 1)];
  const last = AUTHOR_LAST_NAMES[pseudoRandomInt(seed + 7, 0, AUTHOR_LAST_NAMES.length - 1)];
  return `${last} ${first}`;
}

function interpolateTemplate(template: string, seed: number): string {
  const place = CITY_PLACES[pseudoRandomInt(seed + 41, 0, CITY_PLACES.length - 1)];
  const house = pseudoRandomInt(seed + 43, 1, 200);
  const route = BUS_ROUTES[pseudoRandomInt(seed + 47, 0, BUS_ROUTES.length - 1)];
  const clinic = CLINICS[pseudoRandomInt(seed + 53, 0, CLINICS.length - 1)];

  return template
    .replace(/\{place\}/g, place)
    .replace(/\{house\}/g, String(house))
    .replace(/\{route\}/g, route)
    .replace(/\{clinic\}/g, clinic);
}

function buildCommentText(category: string, seed: number): string {
  const templates = CATEGORY_COMMENT_TEMPLATES[category] ?? FALLBACK_COMMENT_TEMPLATES;
  const template = templates[pseudoRandomInt(seed + 29, 0, templates.length - 1)];
  return interpolateTemplate(template, seed);
}

function buildReportRows(from: string, to: string): ReportCommentRow[] {
  const start = new Date(from).getTime();
  const end = new Date(to).getTime();
  const duration = Math.max(1, end - start);
  const statistics = makeStatistics(from, to);
  const baseSeed = makeSeed(`${from}:${to}`);
  const rows: ReportCommentRow[] = [];

  let globalIndex = 0;
  statistics.forEach((categoryRow, categoryIndex) => {
    for (let localIndex = 0; localIndex < categoryRow.count; localIndex += 1) {
      const seed = baseSeed + categoryIndex * 1000 + localIndex * 13 + globalIndex;
      const tsOffset = pseudoRandomInt(seed + 17, 0, duration);
      const publishedAt = new Date(start + tsOffset).toISOString();
      const authorId = 100000 + seed;
      const postId = 200000 + categoryIndex * 1000 + localIndex;
      const commentId = 500000 + globalIndex;

      rows.push({
        commentText: buildCommentText(categoryRow.category, seed),
        category: categoryRow.category,
        publishedAt,
        likesCount: pseudoRandomInt(seed + 23, 0, 180),
        authorName: buildAuthorName(seed),
        authorProfileUrl: `https://vk.com/id${authorId}`,
        postUrl: `https://vk.com/wall-${postId}_${commentId}`,
        commentUrl: `https://vk.com/wall-${postId}_${commentId}?reply=${commentId}`,
      });

      globalIndex += 1;
    }
  });

  return rows.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const { username, password } = credentials;

  const valid = username.trim() === MOCK_USER.username && password === MOCK_USER.password;
  if (!valid) {
    return withLatency(() => {
      throw new Error('Неверный логин или пароль');
    });
  }

  return withLatency(() => ({
    token: toMockJwt(username),
    username,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
  }));
}

export async function fetchSettings(): Promise<AppSettings> {
  return withLatency(() => {
    const stored = readStorage<Partial<AppSettings>>(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
    return normalizeSettings(stored);
  });
}

export async function updateSettings(nextSettings: AppSettings): Promise<AppSettings> {
  const sanitized = normalizeSettings(nextSettings);

  writeStorage(STORAGE_KEYS.settings, sanitized);
  return withLatency(() => sanitized);
}

export async function fetchLicenseInfo(): Promise<LicenseInfo> {
  const current = readStorage<StoredLicense>(STORAGE_KEYS.license, DEFAULT_LICENSE);
  const { rawKey, ...publicData } = current;
  void rawKey;
  return withLatency(() => publicData);
}

export async function activateLicense(licenseKey: string): Promise<LicenseInfo> {
  const normalized = licenseKey.trim().toUpperCase();
  const keyPattern = /^[A-Z0-9-]{10,40}$/;

  if (!keyPattern.test(normalized)) {
    return withLatency(() => {
      throw new Error('Ключ должен содержать от 10 до 40 символов: A-Z, 0-9 и "-"');
    });
  }

  const status = detectLicenseStatus(normalized);
  const monthlyLimit = 500;
  const monthlyUsage =
    status === 'limit_exceeded' ? monthlyLimit : calculateUsageFromKey(normalized, monthlyLimit);

  const now = new Date();
  const expiresAt =
    status === 'expired'
      ? new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString()
      : new Date(now.getTime() + 1000 * 60 * 60 * 24 * 60).toISOString();

  const next: StoredLicense = {
    rawKey: normalized,
    maskedKey: maskLicenseKey(normalized),
    status,
    expiresAt,
    monthlyUsage,
    monthlyLimit,
    checkedAt: now.toISOString(),
  };

  writeStorage(STORAGE_KEYS.license, next);
  const { rawKey, ...publicData } = next;
  void rawKey;
  return withLatency(() => {
    emitLicenseUpdated(publicData);
    return publicData;
  });
}

export async function fetchStatistics(payload: StatisticsRequest): Promise<StatisticsResponse> {
  const fromDate = new Date(payload.from);
  const toDate = new Date(payload.to);

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return withLatency(() => {
      throw new Error('Укажите корректный диапазон дат');
    });
  }

  if (fromDate > toDate) {
    return withLatency(() => {
      throw new Error('Дата начала не может быть позже даты окончания');
    });
  }

  try {
    ensureVkSourcesConfigured();
  } catch (error) {
    return withLatency(() => {
      throw error;
    });
  }

  const categories = makeStatistics(payload.from, payload.to);
  const total = categories.reduce((sum, row) => sum + row.count, 0);

  return withLatency(() => ({
    from: payload.from,
    to: payload.to,
    generatedAt: new Date().toISOString(),
    total,
    categories,
  }));
}

export async function fetchReportComments(period: StatisticsRequest): Promise<ReportCommentRow[]> {
  const fromDate = new Date(period.from);
  const toDate = new Date(period.to);

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return withLatency(() => {
      throw new Error('Период выгрузки отчета задан некорректно');
    });
  }

  if (fromDate > toDate) {
    return withLatency(() => {
      throw new Error('Дата начала не может быть позже даты окончания');
    });
  }

  try {
    ensureVkSourcesConfigured();
  } catch (error) {
    return withLatency(() => {
      throw error;
    });
  }

  return withLatency(() => buildReportRows(period.from, period.to));
}

export async function sendReportByEmail(period: StatisticsRequest): Promise<{ recipients: string[] }> {
  const fromDate = new Date(period.from);
  const toDate = new Date(period.to);

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return withLatency(() => {
      throw new Error('Период отправки отчета задан некорректно');
    });
  }

  const settings = readStorage<AppSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS);

  if (!settings.reportEmails.length) {
    return withLatency(() => {
      throw new Error('Добавьте хотя бы один email в настройках рассылки');
    });
  }

  const recipients = settings.reportEmails;
  return withLatency(() => ({ recipients }));
}
