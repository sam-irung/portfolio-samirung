import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getDocuments } from "@/app/lib/services/documents";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const documents = await getDocuments();

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
                  Documents
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Documents professionnels
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  CV, rapports, mémoires et autres documents professionnels,
                  disponibles en téléchargement.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="space-y-4">
            {documents.map((doc, i) => (
              <Reveal key={doc.id} delay={i * 0.06}>
                <article className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg md:p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-5">
                      <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 font-mono text-xs font-bold text-primary-700">
                        {doc.fileType ?? "PDF"}
                      </span>

                      <div>
                        {doc.category && (
                          <p className="text-xs font-medium uppercase tracking-wider text-primary-600">
                            {doc.category}
                          </p>
                        )}
                        <h2 className="mt-1 font-heading text-lg font-semibold text-neutral-900 md:text-xl">
                          {doc.title}
                        </h2>
                        {doc.description && (
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 md:flex-shrink-0">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-full bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                      >
                        Consulter
                      </a>
                      <a
                        href={doc.fileUrl}
                        download
                        className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                      >
                        Télécharger
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-12 text-center text-sm text-neutral-500">
              D'autres documents seront ajoutés progressivement : mémoires,
              rapports de stage, certificats et publications.
            </p>
          </Reveal>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Besoin d'un document spécifique ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Contactez-moi pour toute demande particulière.
              </p>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
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