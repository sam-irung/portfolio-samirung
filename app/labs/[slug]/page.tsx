import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Lab = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  objective: string;
  environment: string;
  architecture: string;
  steps: { title: string; detail: string }[];
  technologies: string[];
  results: string[];
  learnings: string[];
  github?: string;
  color: string;
  icon: string;
};

const labs: Lab[] = [
  {
    slug: "terraform-lab",
    title: "Terraform Lab",
    category: "Infrastructure as Code",
    tagline:
      "Modules Terraform réutilisables pour déployer une infrastructure AWS complète.",
    objective:
      "Maîtriser la structuration d'un projet Terraform professionnel : modules, environnements, state distant et gestion des dépendances entre ressources.",
    environment:
      "Poste Linux local + compte AWS sandbox + bucket S3 pour le state + table DynamoDB pour le verrouillage.",
    architecture:
      "Trois modules principaux : réseau (VPC, subnets, route tables), calcul (EC2, security groups), stockage (S3). Chaque module est appelé depuis un environnement (dev, staging, prod) avec ses propres variables.",
    steps: [
      {
        title: "1. Initialisation",
        detail:
          "Création de la structure de dossiers, configuration du backend S3 + DynamoDB pour le state distant.",
      },
      {
        title: "2. Module réseau",
        detail:
          "Écriture du module VPC avec subnets publics/privés, route tables, internet gateway et NAT gateway.",
      },
      {
        title: "3. Module calcul",
        detail:
          "Module EC2 avec AMI paramétrable, security groups et user data pour l'initialisation.",
      },
      {
        title: "4. Environnements",
        detail:
          "Création des environnements dev, staging et prod qui appellent les modules avec leurs variables propres.",
      },
      {
        title: "5. Tests et validation",
        detail:
          "terraform validate, terraform plan et déploiement effectif sur AWS sandbox.",
      },
    ],
    technologies: ["Terraform", "AWS", "VPC", "EC2", "S3", "DynamoDB"],
    results: [
      "Infrastructure reproductible en une commande",
      "State distant fonctionnel avec verrouillage",
      "Modules réutilisables sur plusieurs environnements",
      "Code documenté et versionné",
    ],
    learnings: [
      "Structuration d'un projet Terraform multi-environnements",
      "Importance du state distant en équipe",
      "Bonnes pratiques sur les modules",
      "Différence entre variables, locals et outputs",
    ],
    github: "https://github.com/sam-irung",
    color: "from-violet-500 to-violet-700",
    icon: "</>",
  },
  {
    slug: "kubernetes-lab",
    title: "Kubernetes Lab",
    category: "DevOps",
    tagline:
      "Cluster Kubernetes local avec déploiement, Ingress et gestion de la configuration.",
    objective:
      "Comprendre le cycle complet d'une application conteneurisée sur Kubernetes : build, déploiement, exposition, configuration et monitoring.",
    environment:
      "Cluster k3s sur VM Linux + kubectl + Helm + registry local + Ingress NGINX.",
    architecture:
      "Namespace applicatif avec Deployments pour les services, Services ClusterIP pour la communication interne, Ingress pour l'exposition externe, ConfigMaps et Secrets pour la configuration.",
    steps: [
      {
        title: "1. Installation du cluster",
        detail:
          "Installation de k3s sur VM, configuration de kubectl et vérification des nodes.",
      },
      {
        title: "2. Conteneurisation",
        detail:
          "Création du Dockerfile, build de l'image, push dans un registry local.",
      },
      {
        title: "3. Déploiement",
        detail:
          "Écriture des manifests Kubernetes : Deployment, Service, Ingress.",
      },
      {
        title: "4. Configuration",
        detail:
          "Utilisation de ConfigMaps pour la configuration et Secrets pour les données sensibles.",
      },
      {
        title: "5. Mise à jour progressive",
        detail:
          "Test d'un rolling update et rollback pour comprendre la gestion des versions.",
      },
    ],
    technologies: ["Kubernetes", "k3s", "Docker", "Helm", "Ingress"],
    results: [
      "Application déployée et accessible via Ingress",
      "Mise à jour sans interruption de service",
      "Configuration externalisée et versionnée",
      "Compréhension concrète de l'orchestration",
    ],
    learnings: [
      "Différence entre Docker et Kubernetes",
      "Gestion des déploiements progressifs",
      "Debug de pods et services",
      "Organisation par namespaces",
    ],
    github: "https://github.com/sam-irung",
    color: "from-blue-500 to-blue-700",
    icon: "☸",
  },
  {
    slug: "aws-lab",
    title: "AWS Lab",
    category: "Cloud",
    tagline:
      "Architecture 3-tiers complète sur AWS avec haute disponibilité.",
    objective:
      "Concevoir une architecture AWS résiliente : VPC multi-AZ, load balancer, auto-scaling et base de données managée.",
    environment: "Compte AWS sandbox + console AWS + Terraform pour l'automatisation.",
    architecture:
      "VPC multi-AZ avec subnets publics (load balancer) et privés (application, base de données). Application Load Balancer en frontal, Auto Scaling Group pour les instances applicatives, RDS multi-AZ pour la base de données.",
    steps: [
      {
        title: "1. Réseau",
        detail:
          "Création du VPC multi-AZ avec subnets publics, privés et NAT gateways.",
      },
      {
        title: "2. Load balancing",
        detail:
          "Configuration d'un Application Load Balancer avec health checks.",
      },
      {
        title: "3. Auto Scaling",
        detail:
          "Launch Template + Auto Scaling Group avec politiques de scaling basées sur CPU.",
      },
      {
        title: "4. Base de données",
        detail:
          "Déploiement d'une instance RDS multi-AZ dans les subnets privés.",
      },
      {
        title: "5. Monitoring",
        detail:
          "Configuration des alarmes CloudWatch et du logging centralisé.",
      },
    ],
    technologies: ["AWS", "VPC", "ALB", "EC2", "RDS", "CloudWatch"],
    results: [
      "Architecture hautement disponible",
      "Scalabilité automatique selon la charge",
      "Monitoring complet avec alertes",
      "Documentation d'architecture détaillée",
    ],
    learnings: [
      "Conception d'architecture multi-AZ",
      "Différence entre subnets publics et privés",
      "Bonnes pratiques de sécurité réseau AWS",
      "Utilisation de CloudWatch pour l'observabilité",
    ],
    github: "https://github.com/sam-irung",
    color: "from-orange-500 to-orange-700",
    icon: "☁",
  },
  {
    slug: "gns3-lab",
    title: "GNS3 Lab",
    category: "Réseaux",
    tagline:
      "Simulation d'une architecture réseau d'entreprise à deux sites.",
    objective:
      "Maîtriser la configuration concrète de VLANs, routage inter-VLAN, OSPF multi-aires et VPN site-à-site.",
    environment: "GNS3 avec images Cisco IOS + VM pour les tests de connectivité.",
    architecture:
      "Deux sites d'entreprise avec VLANs (utilisateurs, serveurs, management), switches de distribution, routeurs avec OSPF et tunnel VPN entre les deux sites.",
    steps: [
      {
        title: "1. Topologie",
        detail:
          "Construction de la topologie à deux sites dans GNS3 avec VLANs.",
      },
      {
        title: "2. Switching",
        detail:
          "Configuration des VLANs, trunking 802.1Q et VTP (ou équivalent).",
      },
      {
        title: "3. Routage",
        detail:
          "Routage inter-VLAN (router-on-a-stick ou SVI) et OSPF multi-aires.",
      },
      {
        title: "4. VPN",
        detail:
          "Configuration d'un tunnel GRE/IPsec entre les deux sites.",
      },
      {
        title: "5. Tests",
        detail:
          "Tests de connectivité inter-sites, captures avec Wireshark.",
      },
    ],
    technologies: ["GNS3", "Cisco IOS", "VLAN", "OSPF", "VPN"],
    results: [
      "Architecture fonctionnelle simulant deux sites",
      "Documentation complète des configurations",
      "Captures Wireshark pour analyse",
    ],
    learnings: [
      "Configuration concrète de VLANs et trunking",
      "Diagnostic de problèmes de routage",
      "Lecture de captures réseau",
      "Mise en place d'un tunnel VPN",
    ],
    color: "from-cyan-500 to-cyan-700",
    icon: "◈",
  },
  {
    slug: "active-directory-lab",
    title: "Active Directory Lab",
    category: "Systèmes",
    tagline:
      "Domaine Active Directory complet avec GPO et services réseau.",
    objective:
      "Maîtriser la mise en place d'un environnement Windows Server structuré : AD, DNS, DHCP, GPO et serveur de fichiers.",
    environment:
      "Deux VMs Windows Server (contrôleur de domaine + serveur de fichiers) + une VM cliente Windows 10.",
    architecture:
      "Contrôleur de domaine avec AD DS, DNS et DHCP. Organisation logique par unités d'organisation (OU), GPO par service, serveur de fichiers avec partages par département.",
    steps: [
      {
        title: "1. Contrôleur de domaine",
        detail:
          "Installation du rôle AD DS, promotion du serveur, création de la forêt.",
      },
      {
        title: "2. Annuaire",
        detail:
          "Création des OU, des groupes et des utilisateurs selon une logique d'entreprise.",
      },
      {
        title: "3. GPO",
        detail:
          "Mise en place de GPO pour la sécurité, les restrictions et les paramètres utilisateurs.",
      },
      {
        title: "4. DNS et DHCP",
        detail:
          "Configuration du DNS intégré à AD et d'un serveur DHCP avec options.",
      },
      {
        title: "5. Partages",
        detail:
          "Serveur de fichiers avec partages par service et permissions par groupe.",
      },
    ],
    technologies: ["Windows Server", "AD DS", "GPO", "DNS", "DHCP"],
    results: [
      "Domaine fonctionnel avec tous les rôles principaux",
      "Politiques appliquées automatiquement",
      "Structure d'annuaire scalable",
    ],
    learnings: [
      "Organisation logique d'un annuaire AD",
      "Bonnes pratiques de sécurité AD",
      "Gestion des permissions par groupe",
      "Diagnostic d'application des GPO",
    ],
    color: "from-sky-500 to-sky-700",
    icon: "⚙",
  },
  {
    slug: "devsecops-lab",
    title: "DevSecOps Lab",
    category: "Sécurité",
    tagline:
      "Pipeline CI/CD sécurisé avec détection automatique des vulnérabilités.",
    objective:
      "Intégrer la sécurité à chaque étape du cycle de déploiement, sans ralentir le développement.",
    environment:
      "Dépôt GitHub + GitHub Actions + Terraform + outils de scanning (tfsec, checkov, gitleaks).",
    architecture:
      "Pipeline GitHub Actions en plusieurs jobs : lint, tests, scan IaC, scan secrets, build, déploiement conditionnel. Secrets gérés via GitHub Secrets, permissions minimales par job.",
    steps: [
      {
        title: "1. Structure du pipeline",
        detail:
          "Organisation du workflow en jobs indépendants et parallélisables.",
      },
      {
        title: "2. Scan IaC",
        detail:
          "Intégration de tfsec et checkov pour détecter les erreurs de configuration Terraform.",
      },
      {
        title: "3. Scan secrets",
        detail:
          "Ajout de gitleaks pour empêcher le commit de secrets en clair.",
      },
      {
        title: "4. Gestion des secrets",
        detail:
          "Utilisation de GitHub Secrets et du principe du moindre privilège sur les jobs.",
      },
      {
        title: "5. Déploiement conditionnel",
        detail:
          "Le déploiement ne se déclenche que si tous les scans passent.",
      },
    ],
    technologies: [
      "DevSecOps",
      "GitHub Actions",
      "tfsec",
      "checkov",
      "gitleaks",
    ],
    results: [
      "Détection automatique des erreurs IaC",
      "Aucun secret en clair dans le code",
      "Traçabilité complète des déploiements",
    ],
    learnings: [
      "Différence entre DevOps et DevSecOps",
      "Place de la sécurité dans un pipeline CI/CD",
      "Outillage concret pour l'IaC security",
      "Gestion sécurisée des secrets",
    ],
    github: "https://github.com/sam-irung",
    color: "from-rose-500 to-rose-700",
    icon: "🛡",
  },
];

export function generateStaticParams() {
  return labs.map((lab) => ({ slug: lab.slug }));
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = labs.find((l) => l.slug === slug);

  if (!lab) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero du lab */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <Link
              href="/labs"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              ← Tous les labs
            </Link>

            <div className="mt-8">
              <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                {lab.category}
              </span>

              <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                {lab.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
                {lab.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {lab.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {lab.github && (
                <div className="mt-8">
                  <a
                    href={lab.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    Voir sur GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Visuel principal */}
        <section className="mx-auto max-w-5xl px-6 pt-12">
          <div
            className={`relative aspect-[16/8] overflow-hidden rounded-3xl bg-gradient-to-br ${lab.color}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl text-white/90 md:text-8xl">
                {lab.icon}
              </span>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">
                Objectif
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {lab.objective}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">
                Environnement
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {lab.environment}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">
                Architecture
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {lab.architecture}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">
                Étapes
              </h2>
              <div className="mt-6 space-y-4">
                {lab.steps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-primary-300"
                  >
                    <h3 className="font-heading text-base font-semibold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">
                Résultats
              </h2>
              <ul className="mt-4 space-y-2">
                {lab.results.map((r) => (
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
                {lab.learnings.map((l) => (
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

            <div className="border-t border-neutral-200 pt-8">
              <Link
                href="/labs"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                ← Tous les labs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}