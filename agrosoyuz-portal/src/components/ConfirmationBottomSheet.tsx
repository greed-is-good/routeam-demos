import { PrimaryButton } from './PrimaryButton';

export function ConfirmationBottomSheet({
  isOpen,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-agro-text/35 px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
      <section className="w-full max-w-[420px] rounded-[24px] bg-agro-surface p-5 shadow-lift">
        <h2 className="text-xl font-bold text-agro-text">Удалить заявку?</h2>
        <p className="mt-2 text-sm leading-relaxed text-agro-secondary">
          Заявка будет удалена из вашего списка. Это действие нельзя отменить.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <PrimaryButton fullWidth onClick={onCancel} type="button" variant="secondary">
            Отмена
          </PrimaryButton>
          <PrimaryButton fullWidth onClick={onConfirm} type="button" variant="danger">
            Удалить заявку
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}
