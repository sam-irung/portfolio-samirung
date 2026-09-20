import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProjectBySlug, getPublishedProjects } from "@/app/lib/services/projects";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.shortSummary,
  };
}
//export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusLabels: Record<string, string> = {
    COMPLETED: "Terminé",
    DEVELOPMENT: "En développement",
    ARCHIVED: "Archivé",
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <Link
              href="/projets"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              ← Tous les projets
            </Link>

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                  {statusLabels[project.status] ?? project.status}
                </span>
              </div>

              <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                {project.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
                {project.shortSummary}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((pt) => (
                  <span
                    key={pt.technologyId}
                    className="rounded-md bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-700"
                  >
                    {pt.technology.name}
                  </span>
                ))}
              </div>

              {(project.githubUrl || project.demoUrl || project.documentationUrl) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                      Voir sur GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                    >
                      Voir la démo
                    </a>
                  )}
                  {project.documentationUrl && (
                    <a
                      href={project.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                    >
                      Documentation
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Visuel */}
        <section className="mx-auto max-w-5xl px-6 pt-12">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl text-white/90 md:text-8xl">
                {"</>"}
              </span>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_240px] md:gap-16">
            <div className="space-y-12">
              {project.context && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Contexte
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-neutral-600">
                    {project.context}
                  </p>
                </div>
              )}

              {project.objectives && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Objectifs
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-neutral-600">
                    {project.objectives}
                  </p>
                </div>
              )}

              {project.architecture && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Architecture
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-neutral-600">
                    {project.architecture}
                  </p>
                </div>
              )}

              {project.implementation && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Implémentation
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-neutral-600">
                    {project.implementation}
                  </p>
                </div>
              )}

              {project.results && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Résultats
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-neutral-600">
                    {project.results}
                  </p>
                </div>
              )}

              {project.difficulties && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Difficultés rencontrées
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-neutral-600">
                    {project.difficulties}
                  </p>
                </div>
              )}

              {project.solutions && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Solutions
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-neutral-600">
                    {project.solutions}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="md:sticky md:top-24 md:h-fit">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Fiche technique
                </h3>

                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-neutral-500">Statut</dt>
                    <dd className="mt-1 font-medium text-neutral-900">
                      {statusLabels[project.status] ?? project.status}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-neutral-500">Technologies</dt>
                    <dd className="mt-1 font-mono text-xs text-neutral-900">
                      {project.technologies.map((pt) => pt.technology.name).join(", ")}
                    </dd>
                  </div>

                  {project.githubUrl && (
                    <div>
                      <dt className="text-neutral-500">Code source</dt>
                      <dd className="mt-1">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          GitHub →
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <Link
                href="/projets"
                className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                ← Tous les projets
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}