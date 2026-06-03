type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: string;
};

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm shadow-slate-200/50">
      {icon && <p className="text-4xl">{icon}</p>}
      <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
      {description && <p className="mt-2 text-slate-600">{description}</p>}
    </div>
  );
}

type ErrorStateProps = {
  title: string;
  message?: string;
};

export function ErrorState({ title, message }: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm shadow-red-200/50">
      <h2 className="font-semibold text-red-900">{title}</h2>
      {message && <p className="mt-2 text-sm text-red-700">{message}</p>}
    </div>
  );
}
