import { Tag } from 'antd';

import type { LicenseStatus } from '../types/models';

interface StatusMeta {
  color: string;
  label: string;
}

const STATUS_META: Record<LicenseStatus, StatusMeta> = {
  not_activated: { color: 'default', label: 'Не активирована' },
  active: { color: 'success', label: 'Активна' },
  expired: { color: 'error', label: 'Срок истек' },
  suspended: { color: 'volcano', label: 'Приостановлена' },
  limit_exceeded: { color: 'warning', label: 'Лимит исчерпан' },
  gateway_unavailable: { color: 'processing', label: 'Шлюз недоступен' },
};

interface LicenseStatusTagProps {
  status: LicenseStatus;
}

export function LicenseStatusTag({ status }: LicenseStatusTagProps): JSX.Element {
  const meta = STATUS_META[status];
  return <Tag color={meta.color}>{meta.label}</Tag>;
}
