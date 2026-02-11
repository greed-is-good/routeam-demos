export const COMMENT_CATEGORIES = [
  'Водоснабжение и ЖКХ',
  'Дороги / Инфраструктура',
  'Благоустройство',
  'Аварийное жилье',
  'Медицина',
  'Семьи СВО',
  'Молодежь, спорт',
  'Общественный транспорт',
  'Другое',
] as const;

export type CommentCategory = (typeof COMMENT_CATEGORIES)[number];
