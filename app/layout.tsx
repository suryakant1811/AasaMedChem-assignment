import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inventory & Order Management',
  description: 'A clean inventory and order management system.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
