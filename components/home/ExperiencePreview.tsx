import Reveal from "@/components/ui/Reveal";

const experiences = [
  {
    year: "2026",
    period: "Aujourd'hui",
    title: "Master en Cybersécurité",
    org: "Formation universitaire",
    description:
      "Spécialisation en sécurité des infrastructures, DevSecOps et protection des systèmes cloud.",
    tags: ["Cybersécurité", "DevSecOps"],
    type: "formation",
  },
  {
    year: "2025",
    period: "2024 — 2025",
    title: "Projets Cloud & DevOps",
    org: "Indépendant",
    description:
      "Conception et déploiement d'infrastructures AWS automatisées avec Terraform. Mise en place de pipelines CI/CD.",
    tags: ["AWS", "Terraform", "GitHub Actions"],
    type: "projet",
  },
  {
    year: "2024",
    period: "2024",
    title: "Stage — Gécamines",
    org: "Gécamines",
    description:
      "Administration systèmes et réseaux. Gestion d'Active Directory, support technique et documentation d'infrastructure.",
    tags: ["Windows Server", "Active Directory", "Réseaux"],
    type: "stage",
  },
  {
    year: "2023",
    period: "2023",
    title: "Stage — Kamoa",
    org: "Kamoa Copper",
    description:
      "Découverte des environnements IT industriels. Participation à la maintenance réseau et au support utilisateurs.",
    tags: ["Réseaux", "Support IT"],
    type: "stage",
  },
  {
    year: "2022",
    period: "2022 — 2025",
    title: "Licence en Informatique",
    org: "Formation universitaire",
    description:
      "Fondamentaux en réseaux, systèmes, programmation et bases de données.",
    tags: ["Réseaux", "Systèmes", "Programmation"],
    type: "formation",
  },
];

export default function ExperiencePreview() {
  return (
    <section id="experience" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* En-tête */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
              Parcours
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
              Expérience & formation
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              De la formation académique aux projets techniques, un parcours
              orienté Cloud, DevOps et cybersécurité.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Ligne verticale */}
          <span className="absolute left-3 top-0 h-full w-px bg-neutral-200 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <Reveal key={exp.title} delay={i * 0.08}>
                  <div
                    className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                      isLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Carte */}
                    <div className={isLeft ? "md:text-right" : ""}>
                      <div className="ml-10 md:ml-0 rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg">
                        <div
                          className={`flex items-center gap-2 ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          <span className="rounded-full bg-primary-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary-700">
                            {exp.year}
                          </span>
                          <span className="text-xs font-medium text-neutral-500">
                            {exp.period}
                          </span>
                        </div>

                        <h3 className="mt-3 font-heading text-lg font-semibold text-neutral-900">
                          {exp.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-primary-600">
                          {exp.org}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                          {exp.description}
                        </p>

                        <div
                          className={`mt-4 flex flex-wrap gap-2 ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Point central */}
                    <span className="absolute left-3 top-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-primary-600 ring-4 ring-white md:left-1/2" />

                    {/* Colonne vide (pour alternance) */}
                    <div className="hidden md:block" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}