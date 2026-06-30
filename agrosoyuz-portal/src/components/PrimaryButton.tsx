import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClassNames = {
  primary: 'bg-agro-green text-white shadow-soft hover:bg-agro-greenHover',
  secondary: 'border border-agro-border bg-agro-surface text-agro-green hover:bg-agro-muted',
  danger: 'bg-agro-danger text-white shadow-soft hover:bg-[#7F403A]',
  ghost: 'bg-transparent text-agro-green hover:bg-agro-greenSoft',
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
        'inline-flex min-h-12 items-center justify-center rounded-control px-5 py-3 text-[15px] font-semibold transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60',
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
