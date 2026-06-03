import type React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
};

const variantStyles = {
  primary: 'bg-sky-600 text-white hover:bg-sky-700',
  secondary: 'bg-slate-800 text-white hover:bg-slate-900',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
  ghost: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
};

export function Button({
  variant = 'primary',
  isLoading,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? 'Loading…' : children}
    </button>
  );
}
