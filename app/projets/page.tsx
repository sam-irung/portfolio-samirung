import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getPublishedProjects } from "@/app/lib/services/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez mes projets en Cloud, DevOps, Infrastructure as Code et sécurité : études de cas complètes avec architecture, technologies et résultats.",
};

//export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <>
      <Header />

      <main className="flex-1 bg-neutral-50">
        {/* En-tête */}
        <section className="border-b border-neutral-200 bg-white">
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
                  Portfolio
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Mes projets
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Une sélection de projets réalisés autour du Cloud, du DevOps,
                  de l'Infrastructure as Code, des réseaux et du développement
                  d'applications.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Grille */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          {projects.length === 0 ? (
            <p className="text-center text-neutral-500">
              Aucun projet publié pour le moment.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.06}>
                  <Link
                    href={`/projets/${project.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
                  >
                    {/* Bandeau */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-primary-500 to-primary-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-4xl text-white/90">
                          {"</>"}
                        </span>
                      </div>

                      {project.status === "COMPLETED" && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          Terminé
                        </span>
                      )}
                      {project.status === "DEVELOPMENT" && (
                        <span className="absolute left-4 top-4 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-medium text-amber-900">
                          En développement
                        </span>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-heading text-lg font-semibold text-neutral-900">
                        {project.title}
                      </h2>

                      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                        {project.shortSummary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((pt) => (
                          <span
                            key={pt.technologyId}
                            className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                          >
                            {pt.technology.name}
                          </span>
                        ))}
                      </div>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
                        Voir le projet
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}