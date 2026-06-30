import type { ReactNode } from 'react';

export function PageContainer({
  children,
  size = 'wide',
  className = '',
}: {
  children: ReactNode;
  size?: 'wide' | 'content' | 'form';
  className?: string;
}) {
  const sizeClassName = {
    wide: 'max-w-6xl',
    content: 'max-w-4xl',
    form: 'max-w-2xl',
  }[size];

  return <div className={`mx-auto w-full min-w-0 ${sizeClassName} px-4 sm:px-5 md:px-8 ${className}`}>{children}</div>;
}
