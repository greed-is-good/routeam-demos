import type { RequestStatus } from '../types/requests';

const statusClassNames: Record<RequestStatus, string> = {
  Получена: 'bg-agro-infoSoft text-agro-info border-[#C7DBF6]',
  'В обработке': 'bg-agro-warningSoft text-agro-warning border-[#EBD39E]',
  Исполнена: 'bg-agro-greenSoft text-agro-green border-[#C8D9C5]',
  'Закрыта без исполнения': 'bg-agro-dangerSoft text-agro-danger border-[#D8C7C2]',
};

const compactStatusLabel: Record<RequestStatus, string> = {
  Получена: 'Получена',
  'В обработке': 'В обработке',
  Исполнена: 'Исполнена',
  'Закрыта без исполнения': 'Закрыта',
};

export function StatusBadge({ status, compact = false }: { status: RequestStatus; compact?: boolean }) {
  return (
    <span className={`inline-flex max-w-full shrink-0 whitespace-nowrap rounded-full border px-2 py-1 text-[11px] font-semibold leading-none sm:px-2.5 ${statusClassNames[status]}`}>
      {compact ? compactStatusLabel[status] : status}
    </span>
  );
}
