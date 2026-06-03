import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

const features = [
  {
    title: 'Direct-to-Manufacturer Sourcing',
    description: 'Bypass brokers to unlock factory-direct pricing on premium raw materials.',
    icon: 'M',
  },
  {
    title: '100% Compliant & Certified',
    description: 'Access critical quality documentation including CoA, GMP, and FDA certifications with every order.',
    icon: 'C',
  },
  {
    title: 'End-to-End Catalogue',
    description: 'Source APIs, excipients, packaging, lab instruments, and other pharma essentials from one place.',
    icon: 'E',
  },
  {
    title: 'Transparent Supply Chain',
    description: 'Track orders and verify supplier credentials through a secure digitized vetting process.',
    icon: 'T',
  },
];

const categories = [
  {
    title: 'Active Pharmaceutical Ingredients',
    label: 'APIs',
    description: 'High-quality bulk drugs for formulation manufacturing.',
  },
  {
    title: 'Excipients & Chemical Intermediates',
    label: 'Raw materials',
    description: 'Essential materials for stable drug delivery and reliable production.',
  },
  {
    title: 'Packaging Materials',
    label: 'Packaging',
    description: 'Primary and secondary pharma-grade packaging solutions.',
  },
  {
    title: 'Lab Instruments & Equipment',
    label: 'Lab essentials',
    description: 'Reliable tools to support R&D and quality control labs.',
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  const primaryHref = user ? (user.role === 'ADMIN' ? '/admin/products' : '/products') : '/register';
  const secondaryHref = user ? (user.role === 'ADMIN' ? '/admin' : '/seller') : '/register';

  return (
    <main className="min-h-screen bg-[#f6faf9] text-slate-950">
      <section className="relative min-h-[calc(100vh-145px)] overflow-hidden bg-slate-950">
        <Image
          src="/aasa-hero-pharma.png"
          alt="Pharmaceutical sourcing dashboard with lab materials and compliance documents"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,17,29,0.94)_0%,rgba(4,17,29,0.84)_36%,rgba(4,17,29,0.34)_72%,rgba(4,17,29,0.12)_100%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-145px)] max-w-7xl items-center px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-emerald-300">AasaMedChem</p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Streamline Your Pharmaceutical Sourcing. Direct. Digital. Secure.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Connect directly with certified global suppliers for APIs, excipients, and lab essentials. Eliminate middlemen, reduce procurement cycles, and secure your supply chain on India&apos;s premier B2B pharma marketplace.
            </p>

            {/* <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={primaryHref} className="inline-flex items-center justify-center rounded-lg bg-emerald-400 px-6 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-300">
                Source APIs Now
              </Link>
              <Link href={secondaryHref} className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
                Become a Verified Supplier
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2">
          <div className="border-l-4 border-rose-500 pl-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-600">The problem</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Traditional pharma procurement is broken.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Intermediaries inflate costs, quality documentation is often delayed, and verifying supplier compliance takes weeks.
            </p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Our solution</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">AasaMedChem digitises the entire ecosystem.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We bring verified manufacturers and global buyers onto a single, transparent platform, making pharma sourcing as simple as click, verify, and ship.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">Why buyers choose us</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">Built for faster, cleaner, more compliant pharma sourcing.</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-950 text-sm font-bold text-emerald-300">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Product categories</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold">Navigate the full pharmaceutical sourcing stack.</h2>
            </div>
            <Link href="/products" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-100">
              View Catalogue
            </Link>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article key={category.title} className="bg-slate-950/95 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">{category.label}</p>
                <h3 className="mt-5 text-xl font-semibold">{category.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">Trust & compliance</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Compliance is Our Priority.</h2>
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 md:mt-0">
            We ensure all listed partners adhere to strict global regulatory frameworks, including WHO-GMP, ISO, and FDA standards. Your regulatory safety is guaranteed.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">Start sourcing smarter</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">Ready to Optimise Your Pharma Supply Chain?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Join the next generation of digital pharmaceutical procurement today.
          </p>
          <Link href={user ? primaryHref : '/register'} className="mt-9 inline-flex items-center justify-center rounded-lg bg-slate-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-teal-900">
            Create Your Free Account
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#f6faf9] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-950">AasaMedChem Private Limited</p>
            <p className="mt-1">© 2026 AasaMedChem Private Limited. Regd. Office: Haryana, India.</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/" className="hover:text-slate-950">About Us</Link>
            <Link href="/products" className="hover:text-slate-950">Product Catalogue</Link>
            <Link href="/register" className="hover:text-slate-950">Supplier Verification Program</Link>
            <Link href="/" className="hover:text-slate-950">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-950">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
