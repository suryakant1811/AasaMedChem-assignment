type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Inventory Dashboard</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-slate-600">{description}</p>
    </header>
  );
}
