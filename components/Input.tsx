import type React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <label className="space-y-2">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <input
        className={`w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  );
}
