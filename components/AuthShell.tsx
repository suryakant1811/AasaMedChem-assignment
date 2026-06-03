import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

const trustPoints = ['Verified suppliers', 'Secure quotations', 'INR pricing', 'Compliance-first sourcing'];

export function AuthShell({ eyebrow, title, description, children, footer }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#f6faf9] px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-153px)] max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <Image
            src="/aasa-hero-pharma.png"
            alt="Pharmaceutical sourcing platform"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,17,29,0.94)_0%,rgba(4,17,29,0.78)_52%,rgba(4,17,29,0.34)_100%)]" />

          <div className="relative">
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              AasaMedChem
            </Link>
            <h2 className="mt-10 max-w-xl text-5xl font-semibold leading-tight">
              Secure access to digital pharma procurement.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-200">
              Source APIs, excipients, and lab essentials through a compliance-first B2B marketplace built for pharmaceutical teams.
            </p>
          </div>

          <div className="relative grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-lg border border-white/15 bg-white/10 p-4 text-sm font-semibold text-slate-100 backdrop-blur">
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">{title}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>

            <div className="mt-8">{children}</div>

            <div className="mt-7 text-center text-sm text-slate-600">{footer}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
