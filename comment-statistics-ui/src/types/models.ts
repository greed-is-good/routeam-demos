import type { CommentCategory } from '../constants/categories';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  expiresAt: string;
}

export interface UserSession {
  token: string;
  username: string;
  expiresAt: string;
}

export type ParserScheduleMode = 'minutes' | 'daily' | 'weekly';

export type WeekdayCode = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface AppSettings {
  vkSources: string[];
  reportEmails: string[];
  parserScheduleMode: ParserScheduleMode;
  parserIntervalMinutes: number;
  parserDailyTime: string;
  parserWeeklyDays: WeekdayCode[];
  parserWeeklyTime: string;
}

export type LicenseStatus =
  | 'not_activated'
  | 'active'
  | 'expired'
  | 'suspended'
  | 'limit_exceeded'
  | 'gateway_unavailable';

export interface LicenseInfo {
  maskedKey: string | null;
  status: LicenseStatus;
  expiresAt: string | null;
  monthlyUsage: number;
  monthlyLimit: number;
  checkedAt: string;
}

export interface CategoryStat {
  category: CommentCategory;
  count: number;
}

export interface StatisticsRequest {
  from: string;
  to: string;
}

export interface StatisticsResponse {
  from: string;
  to: string;
  generatedAt: string;
  total: number;
  categories: CategoryStat[];
}

export interface ReportCommentRow {
  commentText: string;
  category: CommentCategory;
  publishedAt: string;
  likesCount: number;
  authorName: string;
  authorProfileUrl: string;
  postUrl: string;
  commentUrl: string;
}
