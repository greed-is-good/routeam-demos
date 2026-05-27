import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { ConfirmationBottomSheet } from '../components/ConfirmationBottomSheet';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { RequestDetails } from '../components/RequestDetails';
import { deleteRequest, getRequestById } from '../services/mockRequestsService';

export function RequestDetailsPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const request = getRequestById(requestId);

  const handleConfirmDelete = () => {
    if (!request) {
      return;
    }

    const deleted = deleteRequest(request.id);
    setDeleteOpen(false);

    if (deleted) {
      navigate('/requests', { state: { toast: 'Заявка удалена' } });
    }
  };

  return (
    <AppLayout>
      <Link className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#245943]" to="/requests">
        <ArrowLeft aria-hidden="true" size={18} />
        Назад
      </Link>

      {request ? (
        <RequestDetails onDelete={() => setDeleteOpen(true)} request={request} />
      ) : (
        <EmptyState
          description="Заявка не найдена в локальных данных прототипа."
          title="Заявка не найдена"
          action={
            <Link to="/requests">
              <PrimaryButton variant="secondary">Вернуться к списку</PrimaryButton>
            </Link>
          }
        />
      )}

      <ConfirmationBottomSheet
        isOpen={isDeleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </AppLayout>
  );
}
