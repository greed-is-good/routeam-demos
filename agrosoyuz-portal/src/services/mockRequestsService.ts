import { initialMockRequests } from '../mocks/mockRequests';
import type { ServiceConfig } from '../types/forms';
import type { FarmRequest } from '../types/requests';

const REQUESTS_STORAGE_KEY = 'agrosoyuz.requests';

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function cloneInitialRequests() {
  return initialMockRequests.map((request) => ({
    ...request,
    data: { ...request.data },
  }));
}

function saveRequests(requests: FarmRequest[]) {
  if (canUseStorage()) {
    window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
  }
}

function formatRussianDate(date: Date) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(' г.', '');
}

function generateRequestNumber(requests: FarmRequest[]) {
  const maxNumber = requests.reduce((max, request) => {
    const numericPart = Number(request.number.replace(/\D/g, ''));
    return Number.isFinite(numericPart) ? Math.max(max, numericPart) : max;
  }, 0);

  return `AG-${String(maxNumber + 1).padStart(4, '0')}`;
}

export function getRequests(): FarmRequest[] {
  if (!canUseStorage()) {
    return cloneInitialRequests();
  }

  const rawRequests = window.localStorage.getItem(REQUESTS_STORAGE_KEY);
  if (rawRequests === null) {
    const seededRequests = cloneInitialRequests();
    saveRequests(seededRequests);
    return seededRequests;
  }

  try {
    return JSON.parse(rawRequests) as FarmRequest[];
  } catch {
    const seededRequests = cloneInitialRequests();
    saveRequests(seededRequests);
    return seededRequests;
  }
}

export function getRequestById(requestId: string | undefined): FarmRequest | undefined {
  return getRequests().find((request) => request.id === requestId);
}

export function createRequest(service: ServiceConfig, data: Record<string, string>): FarmRequest {
  const requests = getRequests();
  const now = new Date();
  const request: FarmRequest = {
    id: `request-${Date.now()}`,
    number: generateRequestNumber(requests),
    serviceSlug: service.serviceSlug,
    serviceName: service.serviceName,
    categoryName: service.categoryName,
    createdAt: formatRussianDate(now),
    createdAtIso: now.toISOString(),
    status: 'Получена',
    data,
  };

  saveRequests([request, ...requests]);
  return request;
}

export function deleteRequest(requestId: string) {
  const requests = getRequests();
  const targetRequest = requests.find((request) => request.id === requestId);

  // Правило удаления заявки в статусе «Получена» является допущением прототипа и требует подтверждения с заказчиком.
  if (!targetRequest || targetRequest.status !== 'Получена') {
    return false;
  }

  saveRequests(requests.filter((request) => request.id !== requestId));
  return true;
}
