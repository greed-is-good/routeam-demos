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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#18261F]/35 px-4 pb-4">
      <section className="w-full max-w-[398px] rounded-[24px] bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold">Удалить заявку?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#69756E]">
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
