import type { FieldConfig } from '../types/forms';

interface FormFieldRendererProps {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

const inputBaseClassName =
  'min-h-[52px] w-full rounded-control border bg-agro-bg px-4 py-3 text-[15px] text-agro-text outline-none transition duration-200 placeholder:text-[#8A918B] focus:border-agro-green focus:bg-white';

export function FormFieldRenderer({ field, value, error, onChange }: FormFieldRendererProps) {
  const borderClassName = error ? 'border-agro-danger' : 'border-agro-border';
  const requiredMark = field.required ? <span className="text-agro-danger"> *</span> : null;
  const errorId = `${field.name}-error`;

  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-agro-text">
        {field.label}
        {requiredMark}
      </span>

      {field.type === 'textarea' ? (
        <textarea
          className={`${inputBaseClassName} ${borderClassName} min-h-32 resize-none`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          value={value}
        />
      ) : null}

      {field.type === 'select' ? (
        <select
          className={`${inputBaseClassName} ${borderClassName}`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
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
                  'min-h-[48px] rounded-[18px] border px-4 py-2 text-left text-[15px] font-bold transition',
                  isSelected
                    ? 'border-agro-green bg-agro-greenSoft text-agro-green'
                    : 'border-agro-border bg-agro-bg text-agro-text',
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
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          type={field.type}
          value={value}
        />
      ) : null}

      {error ? (
        <span className="text-sm font-medium text-agro-danger" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
