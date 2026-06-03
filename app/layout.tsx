import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'AasaMedChem - Inventory Management',
  description: 'Professional inventory and order management system for pharmaceutical distribution.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-slate-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
