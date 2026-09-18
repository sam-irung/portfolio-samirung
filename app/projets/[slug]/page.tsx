import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Project = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  context: string;
  problem: string;
  objectives: string[];
  architecture: string;
  technologies: string[];
  results: string[];
  learnings: string[];
  github?: string;
  demo?: string;
  color: string;
  icon: string;
};

const projects: Project[] = [
  {
    slug: "infrastructure-aws-terraform",
    title: "Infrastructure Cloud avec Terraform",
    category: "Infrastructure as Code",
    tagline:
      "Automatiser le déploiement d'une infrastructure AWS complète en code.",
    context:
      "Dans le cadre de mes projets personnels Cloud, j'ai voulu concevoir une infrastructure AWS reproductible, versionnable et prête à évoluer, plutôt que de la configurer manuellement via la console AWS.",
    problem:
      "Comment déployer une architecture cloud complète (réseau, calcul, stockage, identités) de manière fiable, reproductible et documentée, sans dépendre d'une configuration manuelle difficile à maintenir ?",
    objectives: [
      "Définir toute l'infrastructure en code avec Terraform",
      "Structurer le code en modules réutilisables",
      "Gérer un state distant pour le travail en équipe",
      "Appliquer les principes du moindre privilège IAM",
      "Documenter chaque ressource et chaque variable",
    ],
    architecture:
      "L'infrastructure est décomposée en modules : réseau (VPC, subnets, route tables), calcul (EC2, security groups), stockage (S3) et identités (IAM). Chaque module est appelé depuis un environnement (dev, staging, prod) avec ses propres variables.",
    technologies: ["Terraform", "AWS", "VPC", "EC2", "S3", "IAM", "Git"],
    results: [
      "Déploiement reproductible en une seule commande",
      "Réduction du temps de mise en place d'un environnement",
      "Aucune configuration manuelle dans la console AWS",
      "Code versionné et documenté",
    ],
    learnings: [
      "Structuration d'un projet Terraform multi-environnements",
      "Gestion du state et des providers",
      "Sécurisation des accès IAM dès la conception",
      "Importance de la documentation dans l'IaC",
    ],
    github: "https://github.com/sam-irung/devsecops-iac-pipeline",
    color: "from-blue-500 to-blue-700",
    icon: "</>",
  },
  {
    slug: "environnement-kubernetes",
    title: "Environnement Kubernetes",
    category: "DevOps",
    tagline:
      "Déployer et administrer des applications conteneurisées sur Kubernetes.",
    context:
      "Pour approfondir mes compétences DevOps, j'ai monté un environnement Kubernetes local afin de comprendre le cycle complet : conteneurisation, déploiement, exposition réseau et persistance.",
    problem:
      "Comment passer d'applications Docker locales à un environnement orchestré capable de gérer le scaling, les mises à jour progressives et la résilience ?",
    objectives: [
      "Conteneuriser une application complète",
      "Déployer sur un cluster Kubernetes",
      "Exposer les services via Ingress",
      "Gérer la configuration et les secrets",
      "Mettre en place un pipeline de déploiement",
    ],
    architecture:
      "Cluster Kubernetes (k3s) avec namespace dédié, deployments pour les services applicatifs, services ClusterIP pour la communication interne, Ingress pour l'exposition externe, ConfigMaps et Secrets pour la configuration.",
    technologies: ["Kubernetes", "Docker", "Helm", "Ingress", "Linux"],
    results: [
      "Applications déployées automatiquement",
      "Mises à jour sans interruption de service",
      "Configuration centralisée et versionnée",
      "Compréhension concrète de l'orchestration",
    ],
    learnings: [
      "Différence entre Docker et Kubernetes",
      "Gestion des déploiements progressifs",
      "Debug de pods et de services",
      "Organisation d'un cluster par namespaces",
    ],
    github: "https://github.com/sam-irung",
    color: "from-indigo-500 to-indigo-700",
    icon: "☸",
  },
  {
    slug: "mipanga-agro",
    title: "Mipanga Agro",
    category: "Application",
    tagline:
      "Plateforme numérique pour accompagner les agriculteurs au quotidien.",
    context:
      "Mipanga Agro est né d'un constat : les petites exploitations agricoles manquent d'outils simples pour planifier leurs cultures, suivre leurs stocks et anticiper leurs ventes.",
    problem:
      "Comment fournir un outil numérique utile aux agriculteurs, utilisable même avec une connexion limitée, et centré sur leurs vrais besoins quotidiens ?",
    objectives: [
      "Concevoir une interface simple et accessible",
      "Gérer les cultures, les stocks et les ventes",
      "Fournir une vision claire de l'activité",
      "Préparer une base évolutive vers le mobile",
    ],
    architecture:
      "Application Next.js avec App Router, base PostgreSQL hébergée sur Supabase, ORM Prisma pour l'accès aux données, et interface responsive pensée mobile-first.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    results: [
      "Prototype fonctionnel de gestion agricole",
      "Interface accessible sur mobile et desktop",
      "Base de données relationnelle structurée",
    ],
    learnings: [
      "Conception d'un modèle de données métier",
      "Développement fullstack avec Next.js",
      "Importance de l'expérience utilisateur en contexte réel",
    ],
    github: "https://github.com/sam-irung/Mipanga-agro",
    color: "from-emerald-500 to-emerald-700",
    icon: "🌾",
  },
  {
    slug: "lab-gns3",
    title: "Lab Réseau GNS3",
    category: "Réseaux",
    tagline:
      "Simuler une architecture réseau d'entreprise complète et la documenter.",
    context:
      "Pour consolider mes bases en administration réseaux, j'ai construit un laboratoire complet sur GNS3 reproduisant une architecture d'entreprise réaliste.",
    problem:
      "Comment comprendre concrètement le routage inter-VLAN, la segmentation réseau et les VPN site-à-site sans matériel physique ?",
    objectives: [
      "Segmenter le réseau en VLANs",
      "Configurer le routage inter-VLAN",
      "Déployer OSPF sur plusieurs routeurs",
      "Mettre en place un VPN site-à-site",
    ],
    architecture:
      "Topologie à deux sites : chaque site dispose de ses VLANs, d'un switch de distribution et d'un routeur. Les routeurs communiquent via OSPF et un tunnel VPN relie les deux sites.",
    technologies: ["GNS3", "Cisco IOS", "VLAN", "OSPF", "VPN"],
    results: [
      "Architecture fonctionnelle simulant deux sites",
      "Documentation complète des configurations",
      "Compréhension pratique des protocoles de routage",
    ],
    learnings: [
      "Configuration concrète de VLANs",
      "Diagnostic de problèmes de routage",
      "Lecture et analyse de captures réseau",
    ],
    color: "from-cyan-500 to-cyan-700",
    icon: "◈",
  },
  {
    slug: "active-directory-lab",
    title: "Active Directory Lab",
    category: "Systèmes",
    tagline:
      "Déployer un domaine Active Directory complet avec GPO et services réseau.",
    context:
      "L'administration Windows Server et Active Directory reste centrale en entreprise. J'ai monté un laboratoire pour maîtriser la mise en place d'un domaine de bout en bout.",
    problem:
      "Comment concevoir un environnement Windows Server structuré, avec utilisateurs, permissions, politiques et services réseau intégrés ?",
    objectives: [
      "Promouvoir un contrôleur de domaine",
      "Structurer l'annuaire (OU, groupes, utilisateurs)",
      "Mettre en place des GPO",
      "Configurer DNS et DHCP",
      "Mettre en place un serveur de fichiers avec permissions",
    ],
    architecture:
      "Un contrôleur de domaine Windows Server avec AD DS, DNS et DHCP. Organisation de l'annuaire par unités d'organisation logiques, GPO par service, serveur de fichiers avec partages par service.",
    technologies: ["Windows Server", "Active Directory", "GPO", "DNS", "DHCP"],
    results: [
      "Domaine fonctionnel avec tous les rôles principaux",
      "Politiques appliquées automatiquement aux postes",
      "Structure d'annuaire scalable et documentée",
    ],
    learnings: [
      "Organisation logique d'un annuaire",
      "Bonnes pratiques de sécurité AD",
      "Gestion des permissions par groupe",
    ],
    color: "from-sky-500 to-sky-700",
    icon: "⚙",
  },
  {
    slug: "devsecops-pipeline",
    title: "Pipeline DevSecOps",
    category: "Sécurité",
    tagline:
      "Intégrer la sécurité à chaque étape du cycle de déploiement.",
    context:
      "La sécurité ne doit pas être une étape finale, mais intégrée dès la conception. J'ai construit un pipeline qui applique les principes DevSecOps du commit à la production.",
    problem:
      "Comment détecter les vulnérabilités et les mauvaises pratiques avant qu'elles n'atteignent la production, sans ralentir le développement ?",
    objectives: [
      "Scanner l'IaC avant chaque déploiement",
      "Analyser le code pour détecter les vulnérabilités",
      "Gérer les secrets de manière sécurisée",
      "Appliquer le principe du moindre privilège",
      "Journaliser et tracer les déploiements",
    ],
    architecture:
      "Pipeline GitHub Actions avec étapes successives : lint, tests, scan IaC (tfsec, checkov), analyse SAST, build, déploiement conditionnel. Secrets gérés via GitHub Secrets, permissions minimales par job.",
    technologies: ["DevSecOps", "GitHub Actions", "tfsec", "SAST", "CI/CD"],
    results: [
      "Détection automatique des erreurs IaC",
      "Aucun secret en clair dans le code",
      "Traçabilité complète des déploiements",
    ],
    learnings: [
      "Différence entre DevOps et DevSecOps",
      "Place de la sécurité dans un pipeline CI/CD",
      "Outillage concret pour l'IaC security",
    ],
    github: "https://github.com/sam-irung",
    color: "from-rose-500 to-rose-700",
    icon: "🛡",
  },
];

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero du projet */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <Link
              href="/projets"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              ← Tous les projets
            </Link>

            <div className="mt-8">
              <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                {project.category}
              </span>

              <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                {project.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
                {project.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.github || project.demo) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                      Voir sur GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                    >
                      Voir la démo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Visuel principal */}
        <section className="mx-auto max-w-5xl px-6 pt-12">
          <div
            className={`relative aspect-[16/8] overflow-hidden rounded-3xl bg-gradient-to-br ${project.color}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl text-white/90 md:text-8xl">
                {project.icon}
              </span>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_240px] md:gap-16">
            {/* Colonne principale */}
            <div className="space-y-12">
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Contexte
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {project.context}
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Problématique
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {project.problem}
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Objectifs
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.objectives.map((obj) => (
                    <li
                      key={obj}
                      className="flex gap-3 text-base leading-relaxed text-neutral-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Architecture
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {project.architecture}
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Résultats
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.results.map((r) => (
                    <li
                      key={r}
                      className="flex gap-3 text-base leading-relaxed text-neutral-600"
                    >
                      <span className="mt-1 text-primary-600">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Ce que j'ai appris
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.learnings.map((l) => (
                    <li
                      key={l}
                      className="flex gap-3 text-base leading-relaxed text-neutral-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="md:sticky md:top-24 md:h-fit">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Fiche technique
                </h3>

                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-neutral-500">Catégorie</dt>
                    <dd className="mt-1 font-medium text-neutral-900">
                      {project.category}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-neutral-500">Technologies</dt>
                    <dd className="mt-1 font-mono text-xs text-neutral-900">
                      {project.technologies.join(", ")}
                    </dd>
                  </div>

                  {project.github && (
                    <div>
                      <dt className="text-neutral-500">Code source</dt>
                      <dd className="mt-1">
                        <a
                          href={project.github}
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