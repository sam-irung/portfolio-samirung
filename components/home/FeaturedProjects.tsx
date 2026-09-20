import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/app/lib/services/projects";

const gradients = [
  "from-blue-500 to-blue-700",
  "from-indigo-500 to-indigo-700",
  "from-emerald-500 to-emerald-700",
  "from-violet-500 to-violet-700",
  "from-orange-500 to-orange-700",
];

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);

  return (
    <section id="projets" className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                Projets
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                Projets sélectionnés
              </h2>
              <p className="mt-3 max-w-xl text-base text-neutral-600">
                Une sélection de projets représentatifs de mon travail en Cloud,
                DevOps et Infrastructure as Code.
              </p>
            </div>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Voir tous les projets
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <Link
                href={`/projets/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`relative aspect-[16/10] bg-gradient-to-br ${
                    gradients[i % gradients.length]
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-semibold text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                    {project.shortSummary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((pt) => (
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
      </div>
    </section>
  );
}