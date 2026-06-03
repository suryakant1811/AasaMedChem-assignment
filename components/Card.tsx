type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 ${className}`}>{children}</div>;
}
