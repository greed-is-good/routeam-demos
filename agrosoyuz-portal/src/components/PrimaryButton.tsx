import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClassNames = {
  primary: 'bg-[#245943] text-white shadow-[0_12px_24px_rgba(36,89,67,0.18)] hover:bg-[#1f4d3a]',
  secondary: 'border border-[#D7D0C3] bg-white text-[#245943] hover:bg-[#F1EEE7]',
  danger: 'bg-[#7D3F3F] text-white hover:bg-[#6E3737]',
};

export function PrimaryButton({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={[
        'inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-[15px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variantClassNames[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Отправляем...' : children}
    </button>
  );
}
