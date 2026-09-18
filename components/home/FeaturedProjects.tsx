import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const projects = [
  { title: "Infrastructure AWS avec Terraform", category: "Infrastructure as Code", description: "Déploiement automatisé d'une infrastructure AWS complète (VPC, EC2, S3, IAM) avec Terraform et modules réutilisables.", tags: ["Terraform", "AWS", "Git"], color: "from-blue-500 to-blue-700" },
  { title: "Cluster Kubernetes managé", category: "DevOps", description: "Déploiement d'applications conteneurisées sur Kubernetes avec pipeline CI/CD GitHub Actions et observabilité.", tags: ["Kubernetes", "Docker", "CI/CD"], color: "from-indigo-500 to-indigo-700" },
  { title: "Mipanga Agro", category: "Application métier", description: "Plateforme de gestion agricole pour petites exploitations : suivi des cultures, stocks et ventes.", tags: ["Next.js", "PostgreSQL", "Prisma"], color: "from-emerald-500 to-emerald-700" },
];

export default function FeaturedProjects() {
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
            <Reveal key={project.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${project.color}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-semibold text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                    <Link
                    href="/projets"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700"
                    >
                    Voir le projet
                    <span aria-hidden>→</span>
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