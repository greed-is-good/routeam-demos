import type { RequestStatus } from '../types/requests';

const statusClassNames: Record<RequestStatus, string> = {
  Получена: 'bg-agro-infoSoft text-agro-info border-[#C7DBF6]',
  'В обработке': 'bg-agro-warningSoft text-agro-warning border-[#EBD39E]',
  Исполнена: 'bg-agro-greenSoft text-agro-green border-[#C8D9C5]',
  'Закрыта без исполнения': 'bg-agro-dangerSoft text-agro-danger border-[#D8C7C2]',
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`inline-flex shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none ${statusClassNames[status]}`}>
      {status}
    </span>
  );
}
