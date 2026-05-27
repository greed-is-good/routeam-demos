export type RequestStatus = 'Получена' | 'В обработке' | 'Исполнена' | 'Закрыта без исполнения';

export interface FarmRequest {
  id: string;
  number: string;
  serviceSlug: string;
  serviceName: string;
  categoryName: string;
  createdAt: string;
  createdAtIso: string;
  status: RequestStatus;
  data: Record<string, string>;
}
