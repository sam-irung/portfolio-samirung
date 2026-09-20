import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getPublications } from "@/app/lib/services/publications";

export const dynamic = "force-dynamic";

const typeStyles: Record<string, string> = {
  Article: "bg-primary-100 text-primary-700",
  Mémoire: "bg-accent-100 text-accent-700",
  Conférence: "bg-emerald-100 text-emerald-700",
  Rapport: "bg-sky-100 text-sky-700",
};

export default async function PublicationsPage() {
  const publications = await getPublications();

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
                  Recherche
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Publications & recherche
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Articles scientifiques, mémoires, conférences et rapports
                  techniques autour du Cloud, de la sécurité, des réseaux et de
                  l'énergie.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          {publications.length === 0 ? (
            <p className="text-center text-neutral-500">
              Aucune publication pour le moment.
            </p>
          ) : (
            <div className="space-y-6">
              {publications.map((pub, i) => (
                <Reveal key={pub.id} delay={i * 0.06}>
                  <article className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg md:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      {pub.type && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            typeStyles[pub.type] ??
                            "bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          {pub.type}
                        </span>
                      )}
                      {(pub.journal || pub.conference) && (
                        <span className="font-mono text-xs text-neutral-500">
                          {pub.journal ?? pub.conference}
                          {pub.year && ` — ${pub.year}`}
                        </span>
                      )}
                      {pub.doi && (
                        <span className="font-mono text-xs text-neutral-400">
                          DOI : {pub.doi}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 font-heading text-xl font-semibold text-neutral-900 md:text-2xl">
                      {pub.title}
                    </h2>

                    {pub.authors && (
                      <p className="mt-2 text-sm text-neutral-600">
                        {pub.authors}
                      </p>
                    )}

                    {pub.abstract && (
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base">
                        {pub.abstract}
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">
                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center gap-2 rounded-full bg-primary-600 px-4 text-xs font-medium text-white transition-colors hover:bg-primary-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Télécharger le PDF
                        </a>
                      )}
                      {pub.externalUrl && (
                        <a
                          href={pub.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                        >
                          Lien externe
                          <span aria-hidden>→</span>
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Vous travaillez sur un sujet proche ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                N'hésitez pas à me contacter pour discuter recherche,
                collaboration ou partage d'expérience.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Me contacter
                </Link>
                <Link
                  href="/documents"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  Voir les documents
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