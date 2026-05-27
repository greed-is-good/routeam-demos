import { useCallback, useState } from 'react';
import { deleteRequest, getRequests } from '../services/mockRequestsService';
import type { FarmRequest } from '../types/requests';

export function useRequests() {
  const [requests, setRequests] = useState<FarmRequest[]>(() => getRequests());

  const refreshRequests = useCallback(() => {
    setRequests(getRequests());
  }, []);

  const removeRequest = useCallback((requestId: string) => {
    const deleted = deleteRequest(requestId);
    setRequests(getRequests());
    return deleted;
  }, []);

  return {
    requests,
    refreshRequests,
    removeRequest,
  };
}
