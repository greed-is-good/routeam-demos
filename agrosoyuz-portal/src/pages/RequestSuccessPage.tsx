import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { EmptyState } from '../components/EmptyState';
import { PageContainer } from '../components/PageContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { SuccessState } from '../components/SuccessState';
import { getRequestById } from '../services/mockRequestsService';

export function RequestSuccessPage() {
  const { requestId } = useParams();
  const request = getRequestById(requestId);

  return (
    <AppLayout>
      <PageContainer size="form">
        {request ? (
          <SuccessState request={request} />
        ) : (
          <EmptyState
            description="Заявка не найдена в локальных данных прототипа."
            title="Нет данных заявки"
            action={
              <Link to="/">
                <PrimaryButton variant="secondary">Вернуться к услугам</PrimaryButton>
              </Link>
            }
          />
        )}
      </PageContainer>
    </AppLayout>
  );
}
