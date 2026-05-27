import type { FieldConfig } from '../types/forms';

interface FormFieldRendererProps {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

const inputBaseClassName =
  'min-h-12 w-full rounded-2xl border bg-white px-4 py-3 text-[15px] text-[#18261F] outline-none transition placeholder:text-[#8A918B] focus:border-[#245943]';

export function FormFieldRenderer({ field, value, error, onChange }: FormFieldRendererProps) {
  const borderClassName = error ? 'border-[#B56A62]' : 'border-[#E2DED5]';
  const requiredMark = field.required ? <span className="text-[#7D3F3F]"> *</span> : null;

  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#3C4B43]">
        {field.label}
        {requiredMark}
      </span>

      {field.type === 'textarea' ? (
        <textarea
          className={`${inputBaseClassName} ${borderClassName} min-h-28 resize-none`}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          value={value}
        />
      ) : null}

      {field.type === 'select' ? (
        <select
          className={`${inputBaseClassName} ${borderClassName}`}
          onChange={(event) => onChange(field.name, event.target.value)}
          value={value}
        >
          <option value="">Выберите вариант</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === 'radio' ? (
        <div className="grid gap-2">
          {field.options?.map((option) => {
            const isSelected = value === option;
            return (
              <button
                className={[
                  'min-h-11 rounded-2xl border px-4 py-2 text-left text-[15px] font-semibold transition',
                  isSelected
                    ? 'border-[#245943] bg-[#DCE7DA] text-[#245943]'
                    : 'border-[#E2DED5] bg-white text-[#3C4B43]',
                ].join(' ')}
                key={option}
                onClick={() => onChange(field.name, option)}
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      {field.type !== 'textarea' && field.type !== 'select' && field.type !== 'radio' ? (
        <input
          className={`${inputBaseClassName} ${borderClassName}`}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          type={field.type}
          value={value}
        />
      ) : null}

      {error ? <span className="text-sm font-medium text-[#9A4D45]">{error}</span> : null}
    </label>
  );
}
