import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

const projects = [
  {
    slug: "infrastructure-aws-terraform",
    title: "Infrastructure Cloud avec Terraform",
    category: "Infrastructure as Code",
    description:
      "Conception et automatisation d'une infrastructure cloud avec Terraform, avec une approche orientée reproductibilité et sécurité.",
    technologies: ["Terraform", "AWS", "Git"],
    color: "from-blue-500 to-blue-700",
    icon: "</>",
  },
  {
    slug: "environnement-kubernetes",
    title: "Environnement Kubernetes",
    category: "DevOps",
    description:
      "Mise en place d'un environnement Kubernetes pour le déploiement et l'administration d'applications conteneurisées.",
    technologies: ["Kubernetes", "Docker", "Linux"],
    color: "from-indigo-500 to-indigo-700",
    icon: "☸",
  },
  {
    slug: "mipanga-agro",
    title: "Mipanga Agro",
    category: "Application",
    description:
      "Plateforme numérique destinée à accompagner les agriculteurs dans la planification et le suivi de leurs activités agricoles.",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    color: "from-emerald-500 to-emerald-700",
    icon: "🌾",
  },
  {
    slug: "lab-gns3",
    title: "Lab Réseau GNS3",
    category: "Réseaux",
    description:
      "Simulation d'architectures réseau d'entreprise : VLAN, routage inter-VLAN, OSPF et VPN site-à-site.",
    technologies: ["GNS3", "VLAN", "OSPF"],
    color: "from-cyan-500 to-cyan-700",
    icon: "◈",
  },
  {
    slug: "active-directory-lab",
    title: "Active Directory Lab",
    category: "Systèmes",
    description:
      "Déploiement d'un domaine Active Directory complet : utilisateurs, GPO, DNS, DHCP et partage de fichiers.",
    technologies: ["Windows Server", "AD", "GPO"],
    color: "from-sky-500 to-sky-700",
    icon: "⚙",
  },
  {
    slug: "devsecops-pipeline",
    title: "Pipeline DevSecOps",
    category: "Sécurité",
    description:
      "Pipeline CI/CD sécurisé : scanning IaC, SAST, gestion des secrets et politique d'accès au moindre privilège.",
    technologies: ["DevSecOps", "CI/CD", "Sécurité"],
    color: "from-rose-500 to-rose-700",
    icon: "🛡",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-neutral-50">
        {/* En-tête de page */}
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
                  d'applications. Chaque projet est présenté comme une étude de
                  cas : contexte, architecture, résultats et apprentissages.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Grille des projets */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <Link
                  href={`/projets/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
                >
                  {/* Bandeau visuel */}
                  <div
                    className={`relative aspect-[16/9] bg-gradient-to-br ${project.color}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-4xl text-white/90">
                        {project.icon}
                      </span>
                    </div>

                    <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-heading text-lg font-semibold text-neutral-900">
                      {project.title}
                    </h2>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                        >
                          {tech}
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
        </section>
      </main>

      <Footer />
    </>
  );
}