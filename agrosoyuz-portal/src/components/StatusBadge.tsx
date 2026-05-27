import type { RequestStatus } from '../types/requests';

const statusClassNames: Record<RequestStatus, string> = {
  Получена: 'bg-[#DBEAFE] text-[#24507A] border-[#C7DBF6]',
  'В обработке': 'bg-[#F7E8C8] text-[#7A5520] border-[#EBD39E]',
  Исполнена: 'bg-[#DCE7DA] text-[#245943] border-[#C8D9C5]',
  'Закрыта без исполнения': 'bg-[#E9DDDA] text-[#7D3F3F] border-[#D8C7C2]',
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClassNames[status]}`}>
      {status}
    </span>
  );
}
