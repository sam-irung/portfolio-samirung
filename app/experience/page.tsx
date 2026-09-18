import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

type ExperienceType = "stage" | "projet" | "formation";

type Experience = {
  period: string;
  title: string;
  org: string;
  location?: string;
  type: ExperienceType;
  description: string;
  missions: string[];
  technologies: string[];
};

const experiences: Experience[] = [
  {
    period: "2024 — 2025",
    title: "Stage — Administration Systèmes & Réseaux",
    org: "Gécamines",
    location: "RDC",
    type: "stage",
    description:
      "Administration d'un environnement Windows Server et gestion de l'infrastructure réseau d'une entreprise industrielle.",
    missions: [
      "Administration Windows Server et Active Directory",
      "Gestion des utilisateurs, groupes et politiques GPO",
      "Configuration DNS, DHCP et serveur de fichiers",
      "Support technique utilisateurs niveau 1 et 2",
      "Documentation d'infrastructure réseau",
    ],
    technologies: [
      "Windows Server",
      "Active Directory",
      "GPO",
      "DNS",
      "DHCP",
      "Réseaux",
    ],
  },
  {
    period: "2024",
    title: "Stage — Support Informatique",
    org: "Gécamines",
    location: "RDC",
    type: "stage",
    description:
      "Support informatique aux utilisateurs et participation à la maintenance du parc informatique.",
    missions: [
      "Installation et configuration de postes de travail",
      "Diagnostic et résolution d'incidents matériels et logiciels",
      "Gestion du parc informatique",
      "Assistance utilisateurs au quotidien",
    ],
    technologies: ["Windows", "Support IT", "Maintenance", "Réseaux"],
  },
  {
    period: "2023",
    title: "Stage — Découverte IT industrielle",
    org: "Kamoa Copper",
    location: "RDC",
    type: "stage",
    description:
      "Immersion dans un environnement IT industriel et participation aux opérations de maintenance réseau.",
    missions: [
      "Maintenance préventive des équipements réseau",
      "Participation aux interventions techniques sur site",
      "Observation des procédures IT en milieu industriel",
      "Support aux équipes techniques",
    ],
    technologies: ["Réseaux", "Maintenance", "Support IT"],
  },
  {
    period: "2024 — 2025",
    title: "Projets Cloud & DevOps",
    org: "Indépendant",
    type: "projet",
    description:
      "Conception et déploiement d'infrastructures cloud automatisées avec Terraform, dans une démarche DevOps et Infrastructure as Code.",
    missions: [
      "Architecture d'infrastructures AWS multi-environnements",
      "Automatisation complète avec Terraform et modules réutilisables",
      "Mise en place de pipelines CI/CD avec GitHub Actions",
      "Documentation technique et études de cas",
    ],
    technologies: [
      "AWS",
      "Terraform",
      "GitHub Actions",
      "Docker",
      "Linux",
    ],
  },
  {
    period: "2022 — 2025",
    title: "Licence en Informatique",
    org: "Formation universitaire",
    type: "formation",
    description:
      "Formation solide en réseaux, systèmes, programmation et bases de données.",
    missions: [
      "Réseaux et protocoles TCP/IP",
      "Systèmes d'exploitation Linux et Windows",
      "Programmation (Python, JavaScript)",
      "Bases de données relationnelles (SQL)",
      "Algorithmique et structures de données",
    ],
    technologies: ["Réseaux", "Linux", "Python", "SQL", "Algorithmique"],
  },
  {
    period: "2026 — En cours",
    title: "Master en Cybersécurité",
    org: "Formation universitaire",
    type: "formation",
    description:
      "Spécialisation en sécurité des systèmes, des réseaux et des infrastructures cloud.",
    missions: [
      "Sécurité des infrastructures et des SI",
      "DevSecOps et intégration de la sécurité au cycle de développement",
      "Analyse de risques et audit technique",
      "Cryptographie appliquée",
    ],
    technologies: [
      "Cybersécurité",
      "DevSecOps",
      "Sécurité réseau",
      "Cryptographie",
    ],
  },
];

const typeStyles: Record<ExperienceType, string> = {
  stage: "bg-emerald-100 text-emerald-700",
  projet: "bg-accent-100 text-accent-700",
  formation: "bg-primary-100 text-primary-700",
};

const typeLabels: Record<ExperienceType, string> = {
  stage: "Stage",
  projet: "Projet",
  formation: "Formation",
};

export default function ExperiencePage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
        {/* En-tête */}
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
                  Parcours
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Expérience & formation
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Un parcours qui combine formation académique, stages en
                  entreprise et projets techniques personnels, en progression
                  continue vers le Cloud, le DevOps et la cybersécurité.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="relative">
            {/* Ligne verticale */}
            <span className="absolute left-3 top-2 hidden h-[calc(100%-1rem)] w-px bg-neutral-200 md:left-[180px] md:block" />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <Reveal key={exp.title + exp.period} delay={i * 0.05}>
                  <div className="relative grid gap-6 md:grid-cols-[180px_1fr] md:gap-10">
                    {/* Colonne gauche : période */}
                    <div className="hidden md:block">
                      <p className="font-heading text-base font-semibold text-neutral-900">
                        {exp.period}
                      </p>
                      <span
                        className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyles[exp.type]}`}
                      >
                        {typeLabels[exp.type]}
                      </span>
                    </div>

                    {/* Point sur la ligne (desktop) */}
                    <span className="absolute left-[180px] top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-primary-600 ring-2 ring-primary-100 md:block" />

                    {/* Carte */}
                    <article className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg md:p-8">
                      {/* Version mobile : période + type */}
                      <div className="mb-4 flex flex-wrap items-center gap-3 md:hidden">
                        <p className="font-heading text-sm font-semibold text-neutral-900">
                          {exp.period}
                        </p>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyles[exp.type]}`}
                        >
                          {typeLabels[exp.type]}
                        </span>
                      </div>

                      <h2 className="font-heading text-xl font-bold text-neutral-900">
                        {exp.title}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-primary-600">
                        {exp.org}
                        {exp.location && (
                          <span className="text-neutral-500">
                            {" "}
                            · {exp.location}
                          </span>
                        )}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                        {exp.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-neutral-900">
                          Missions
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {exp.missions.map((mission) => (
                            <li
                              key={mission}
                              className="flex gap-2 text-sm leading-relaxed text-neutral-600"
                            >
                              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                              {mission}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Mon CV complet est disponible
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Retrouvez l'ensemble de mon parcours dans le document officiel.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/documents/CV-Sam-Irung.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Télécharger mon CV
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