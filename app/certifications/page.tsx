import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getCertifications } from "@/app/lib/services/certifications";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications obtenues en Cloud, DevOps, systèmes et réseaux pour valider mes compétences techniques.",
};
//export const dynamic = "force-dynamic";

const gradients = [
  "from-orange-500 to-orange-700",
  "from-violet-500 to-violet-700",
  "from-sky-500 to-sky-700",
  "from-neutral-700 to-neutral-900",
  "from-blue-500 to-blue-700",
  "from-emerald-500 to-emerald-700",
];

export default async function CertificationsPage() {
  const certifications = await getCertifications();

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
                  Certifications
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Mes certifications
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Des certifications obtenues pour valider et structurer mes
                  connaissances en Cloud, DevOps, systèmes et réseaux.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl">
                  <div
                    className={`relative aspect-[16/9] bg-gradient-to-br ${
                      gradients[i % gradients.length]
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-5xl text-white/95">
                        🏆
                      </span>
                    </div>
                    {cert.year && (
                      <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur-sm">
                        {cert.year}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-600">
                      {cert.issuer}
                    </p>

                    <h2 className="mt-2 font-heading text-lg font-semibold text-neutral-900">
                      {cert.title}
                    </h2>

                    {cert.description && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                        {cert.description}
                      </p>
                    )}

                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700"
                      >
                        Vérifier le certificat
                        <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Vous souhaitez voir les documents ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Les certificats et documents associés sont disponibles dans la
                section Documents.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/documents"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Voir les documents
                </Link>
                <Link
                  href="/competences"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  Voir mes compétences
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