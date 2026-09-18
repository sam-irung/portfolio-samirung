import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const publications = [
  {
    type: "Article scientifique",
    title: "Electricity Theft and Its Impact on Distribution Networks",
    venue: "Energy Engineering",
    year: "2025",
    doi: "10.xxxx/xxxxx",
    description:
      "Analyse de l'impact des vols d'électricité sur la stabilité des réseaux de distribution et propositions de contre-mesures techniques.",
  },
  {
    type: "Mémoire",
    title: "Sécurisation des infrastructures cloud par l'Infrastructure as Code",
    venue: "Travail de recherche",
    year: "2025",
    doi: null,
    description:
      "Étude de l'intégration de la sécurité dans les pipelines IaC, du scanning Terraform à la détection de dérives.",
  },
  {
    type: "Conférence",
    title: "DevSecOps dans les environnements contraints",
    venue: "Communauté technique",
    year: "2024",
    doi: null,
    description:
      "Retour d'expérience sur la mise en place de pratiques DevSecOps dans des contextes à ressources limitées.",
  },
];

export default function PublicationsPreview() {
  return (
    <section id="publications" className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* En-tête */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                Recherche
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                Publications & recherche
              </h2>
              <p className="mt-3 max-w-xl text-base text-neutral-600">
                Articles scientifiques, mémoires et contributions techniques
                autour du Cloud, de la sécurité et des infrastructures.
              </p>
            </div>
            <Link
              href="#publications"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Voir toutes les publications
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Liste */}
        <div className="mt-12 space-y-4">
          {publications.map((pub, i) => (
            <Reveal key={pub.title} delay={i * 0.08}>
              <article className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                    {pub.type}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    {pub.venue} — {pub.year}
                  </span>
                  {pub.doi && (
                    <span className="font-mono text-xs text-neutral-400">
                      DOI: {pub.doi}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold text-neutral-900 md:text-xl">
                  {pub.title}
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
                  {pub.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="#publications"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-primary-600 px-4 text-xs font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    Lire
                  </Link>
                  <Link
                    href="#publications"
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                  >
                    PDF
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}