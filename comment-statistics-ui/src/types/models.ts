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

export type ParserFrequency = 'once' | 'daily' | 'weekly' | 'monthly';

export type ParserEndType = 'never' | 'after_count' | 'on_date';

export interface ParserSchedule {
  startAt: string;
  timezone: string;
  frequency: ParserFrequency;
  interval: number;
  timeOfDay: string;
  endType: ParserEndType;
  endAfterOccurrences?: number;
  endDate?: string;
}

export interface AppSettings {
  vkSources: string[];
  reportEmails: string[];
  parserSchedule: ParserSchedule;
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
