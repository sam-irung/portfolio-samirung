import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getLabs } from "@/app/lib/services/labs";

export const dynamic = "force-dynamic";

const gradients = [
  "from-violet-500 to-violet-700",
  "from-blue-500 to-blue-700",
  "from-orange-500 to-orange-700",
  "from-cyan-500 to-cyan-700",
  "from-sky-500 to-sky-700",
  "from-rose-500 to-rose-700",
];

const icons = ["</>", "☸", "☁", "◈", "⚙", "🛡"];

export default async function LabsPage() {
  const labs = await getLabs();

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                ← Retour à l'accueil
              </Link>

              <div className="mt-8 max-w-3xl">
                <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                  Labs
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Laboratoires techniques
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Des environnements d'expérimentation conçus pour tester,
                  comprendre et reconstruire.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab, i) => (
              <Reveal key={lab.id} delay={i * 0.06}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
                >
                  <div
                    className={`relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${
                      gradients[i % gradients.length]
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                    <span className="relative font-mono text-4xl text-white/95">
                      {icons[i % icons.length]}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-heading text-lg font-semibold text-neutral-900">
                      {lab.title}
                    </h2>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                      {lab.summary}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
                      Explorer le lab
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Vous voulez voir ces labs en action ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Tous les labs sont documentés sur GitHub.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://github.com/sam-irung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Voir sur GitHub
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  Me contacter
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}