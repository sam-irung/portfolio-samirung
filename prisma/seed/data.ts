// ============================================================
// DONNÉES DE SEED — Portfolio Sam Irung
// Ces données sont provisoires et seront remplacées
// via l'admin dashboard.
// ============================================================

export const skillCategories = [
  {
    name: "Cloud",
    slug: "cloud",
    order: 1,
    skills: [
      { name: "AWS (EC2, S3, VPC, IAM)", level: "Intermédiaire", order: 1 },
      { name: "Cloud Architecture", level: "Intermédiaire", order: 2 },
      { name: "Identity & Access Management", level: "Intermédiaire", order: 3 },
      { name: "Monitoring & Logging", level: "Fondamental", order: 4 },
    ],
  },
  {
    name: "DevOps",
    slug: "devops",
    order: 2,
    skills: [
      { name: "Docker", level: "Intermédiaire", order: 1 },
      { name: "Kubernetes", level: "Intermédiaire", order: 2 },
      { name: "CI/CD (GitHub Actions)", level: "Intermédiaire", order: 3 },
      { name: "Linux Administration", level: "Avancé", order: 4 },
    ],
  },
  {
    name: "Infrastructure as Code",
    slug: "infrastructure-as-code",
    order: 3,
    skills: [
      { name: "Terraform", level: "Avancé", order: 1 },
      { name: "Modules Terraform", level: "Intermédiaire", order: 2 },
      { name: "State Management", level: "Intermédiaire", order: 3 },
      { name: "Git", level: "Avancé", order: 4 },
      { name: "Ansible", level: "Fondamental", order: 5 },
    ],
  },
  {
    name: "Réseaux",
    slug: "reseaux",
    order: 4,
    skills: [
      { name: "TCP/IP", level: "Avancé", order: 1 },
      { name: "VLAN & Switching", level: "Intermédiaire", order: 2 },
      { name: "Routage (OSPF, statique)", level: "Intermédiaire", order: 3 },
      { name: "VPN site-à-site", level: "Intermédiaire", order: 4 },
      { name: "GNS3", level: "Intermédiaire", order: 5 },
    ],
  },
  {
    name: "Systèmes",
    slug: "systemes",
    order: 5,
    skills: [
      { name: "Linux (Debian, Ubuntu, RHEL)", level: "Avancé", order: 1 },
      { name: "Windows Server", level: "Intermédiaire", order: 2 },
      { name: "Active Directory", level: "Intermédiaire", order: 3 },
      { name: "GPO & DNS & DHCP", level: "Intermédiaire", order: 4 },
      { name: "Scripting Bash", level: "Intermédiaire", order: 5 },
    ],
  },
  {
    name: "Sécurité",
    slug: "securite",
    order: 6,
    skills: [
      { name: "Security Fundamentals", level: "Intermédiaire", order: 1 },
      { name: "DevSecOps", level: "Fondamental", order: 2 },
      { name: "IaC Security (tfsec, checkov)", level: "Fondamental", order: 3 },
      { name: "Gestion des secrets", level: "Intermédiaire", order: 4 },
    ],
  },
  {
    name: "Programmation",
    slug: "programmation",
    order: 7,
    skills: [
      { name: "Python", level: "Intermédiaire", order: 1 },
      { name: "TypeScript / JavaScript", level: "Intermédiaire", order: 2 },
      { name: "Bash", level: "Intermédiaire", order: 3 },
      { name: "SQL", level: "Intermédiaire", order: 4 },
    ],
  },
];

// ------------------------------------------------------------

export const technologies = [
  "AWS", "Terraform", "Git", "GitHub Actions", "Docker", "Kubernetes",
  "Linux", "Helm", "Ingress", "VPC", "EC2", "S3", "IAM", "RDS",
  "CloudWatch", "Next.js", "PostgreSQL", "Prisma", "TypeScript",
  "GNS3", "Cisco IOS", "VLAN", "OSPF", "VPN", "Windows Server",
  "Active Directory", "GPO", "DNS", "DHCP", "tfsec", "checkov",
  "gitleaks", "DevSecOps", "CI/CD", "Python", "Bash",
];

// ------------------------------------------------------------

export const projects = [
  {
    title: "Infrastructure Cloud avec Terraform",
    slug: "infrastructure-aws-terraform",
    shortSummary:
      "Automatiser le déploiement d'une infrastructure AWS complète en code.",
    description:
      "Conception et automatisation d'une infrastructure cloud avec Terraform, avec une approche orientée reproductibilité et sécurité.",
    context:
      "Dans le cadre de mes projets personnels Cloud, j'ai voulu concevoir une infrastructure AWS reproductible, versionnable et prête à évoluer, plutôt que de la configurer manuellement via la console AWS.",
    objectives:
      "Définir l'infrastructure en code, structurer en modules réutilisables, gérer un state distant, appliquer le moindre privilège IAM, documenter chaque ressource.",
    architecture:
      "Modules réseau (VPC, subnets, route tables), calcul (EC2, security groups), stockage (S3) et identités (IAM), appelés depuis des environnements dev/staging/prod.",
    results:
      "Déploiement reproductible en une commande. Aucune configuration manuelle. Code versionné et documenté.",
    status: "COMPLETED" as const,
    featured: true,
    published: true,
    order: 1,
    githubUrl: "https://github.com/sam-irung",
    technologies: ["Terraform", "AWS", "VPC", "EC2", "S3", "IAM", "Git"],
  },
  {
    title: "Environnement Kubernetes",
    slug: "environnement-kubernetes",
    shortSummary:
      "Déployer et administrer des applications conteneurisées sur Kubernetes.",
    description:
      "Mise en place d'un environnement Kubernetes pour le déploiement et l'administration d'applications conteneurisées.",
    context:
      "Pour approfondir mes compétences DevOps, j'ai monté un environnement Kubernetes local afin de comprendre le cycle complet.",
    objectives:
      "Conteneuriser une application, déployer sur un cluster, exposer via Ingress, gérer configuration et secrets, mettre en place un pipeline.",
    architecture:
      "Cluster k3s avec namespace dédié, deployments, services ClusterIP, Ingress NGINX, ConfigMaps et Secrets.",
    results:
      "Applications déployées automatiquement. Mises à jour sans interruption. Compréhension concrète de l'orchestration.",
    status: "COMPLETED" as const,
    featured: true,
    published: true,
    order: 2,
    githubUrl: "https://github.com/sam-irung",
    technologies: ["Kubernetes", "Docker", "Helm", "Ingress", "Linux"],
  },
  {
    title: "Mipanga Agro",
    slug: "mipanga-agro",
    shortSummary:
      "Plateforme numérique pour accompagner les agriculteurs au quotidien.",
    description:
      "Plateforme de gestion agricole pour petites exploitations : suivi des cultures, stocks et ventes.",
    context:
      "Mipanga Agro est né d'un constat : les petites exploitations agricoles manquent d'outils simples.",
    objectives:
      "Interface simple et accessible, gestion des cultures, stocks et ventes, vision claire de l'activité.",
    architecture:
      "Application Next.js avec App Router, PostgreSQL via Supabase, ORM Prisma, interface mobile-first.",
    results:
      "Prototype fonctionnel de gestion agricole. Interface accessible. Base de données relationnelle structurée.",
    status: "DEVELOPMENT" as const,
    featured: true,
    published: true,
    order: 3,
    githubUrl: "https://github.com/sam-irung",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
  {
    title: "Lab Réseau GNS3",
    slug: "lab-gns3",
    shortSummary:
      "Simuler une architecture réseau d'entreprise complète et la documenter.",
    description:
      "Simulation d'architectures réseau d'entreprise : VLAN, routage inter-VLAN, OSPF et VPN site-à-site.",
    context:
      "Pour consolider mes bases en administration réseaux, j'ai construit un laboratoire complet sur GNS3.",
    objectives:
      "Segmenter en VLANs, configurer le routage inter-VLAN, déployer OSPF, mettre en place un VPN site-à-site.",
    architecture:
      "Topologie à deux sites avec VLANs, switches de distribution, routeurs OSPF et tunnel VPN.",
    results:
      "Architecture fonctionnelle simulant deux sites. Documentation complète des configurations.",
    status: "COMPLETED" as const,
    featured: false,
    published: true,
    order: 4,
    technologies: ["GNS3", "Cisco IOS", "VLAN", "OSPF", "VPN"],
  },
  {
    title: "Active Directory Lab",
    slug: "active-directory-lab",
    shortSummary:
      "Déployer un domaine Active Directory complet avec GPO et services réseau.",
    description:
      "Déploiement d'un domaine Active Directory complet : utilisateurs, GPO, DNS, DHCP et partage de fichiers.",
    context:
      "L'administration Windows Server et Active Directory reste centrale en entreprise.",
    objectives:
      "Promouvoir un contrôleur de domaine, structurer l'annuaire, GPO, DNS/DHCP, serveur de fichiers.",
    architecture:
      "Contrôleur de domaine avec AD DS, DNS, DHCP. Organisation par OU, GPO par service, serveur de fichiers.",
    results:
      "Domaine fonctionnel. Politiques appliquées automatiquement. Structure d'annuaire scalable.",
    status: "COMPLETED" as const,
    featured: false,
    published: true,
    order: 5,
    technologies: ["Windows Server", "Active Directory", "GPO", "DNS", "DHCP"],
  },
  {
    title: "Pipeline DevSecOps",
    slug: "devsecops-pipeline",
    shortSummary:
      "Intégrer la sécurité à chaque étape du cycle de déploiement.",
    description:
      "Pipeline CI/CD sécurisé : scanning IaC, SAST, gestion des secrets et politique d'accès.",
    context:
      "La sécurité ne doit pas être une étape finale, mais intégrée dès la conception.",
    objectives:
      "Scanner l'IaC, analyser le code, gérer les secrets, appliquer le moindre privilège, journaliser.",
    architecture:
      "Pipeline GitHub Actions en jobs successifs : lint, tests, scan IaC, scan secrets, build, déploiement conditionnel.",
    results:
      "Détection automatique des erreurs IaC. Aucun secret en clair. Traçabilité complète.",
    status: "COMPLETED" as const,
    featured: true,
    published: true,
    order: 6,
    githubUrl: "https://github.com/sam-irung",
    technologies: ["DevSecOps", "GitHub Actions", "tfsec", "checkov", "gitleaks"],
  },
];

// ------------------------------------------------------------

export const experiences = [
  {
    company: "Gécamines",
    position: "Stage — Administration Systèmes & Réseaux",
    location: "RDC",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-09-30"),
    current: false,
    description:
      "Administration d'un environnement Windows Server et gestion de l'infrastructure réseau d'une entreprise industrielle.",
    missions:
      "Administration Windows Server et Active Directory|Gestion des utilisateurs, groupes et GPO|Configuration DNS, DHCP et serveur de fichiers|Support technique utilisateurs niveau 1 et 2|Documentation d'infrastructure réseau",
    technologies: "Windows Server,Active Directory,GPO,DNS,DHCP,Réseaux",
    order: 1,
    published: true,
  },
  {
    company: "Gécamines",
    position: "Stage — Support Informatique",
    location: "RDC",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-05-31"),
    current: false,
    description:
      "Support informatique aux utilisateurs et participation à la maintenance du parc informatique.",
    missions:
      "Installation et configuration de postes de travail|Diagnostic et résolution d'incidents|Gestion du parc informatique|Assistance utilisateurs",
    technologies: "Windows,Support IT,Maintenance,Réseaux",
    order: 2,
    published: true,
  },
  {
    company: "Kamoa Copper",
    position: "Stage — Découverte IT industrielle",
    location: "RDC",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    current: false,
    description:
      "Immersion dans un environnement IT industriel et participation aux opérations de maintenance réseau.",
    missions:
      "Maintenance préventive des équipements réseau|Participation aux interventions techniques|Observation des procédures IT|Support aux équipes",
    technologies: "Réseaux,Maintenance,Support IT",
    order: 3,
    published: true,
  },
  {
    company: "Indépendant",
    position: "Projets Cloud & DevOps",
    location: undefined,
    startDate: new Date("2024-01-01"),
    endDate: undefined,
    current: true,
    description:
      "Conception et déploiement d'infrastructures cloud automatisées avec Terraform.",
    missions:
      "Architecture d'infrastructures AWS|Automatisation avec Terraform|Pipelines CI/CD GitHub Actions|Documentation technique",
    technologies: "AWS,Terraform,GitHub Actions,Docker,Linux",
    order: 4,
    published: true,
  },
];

// ------------------------------------------------------------

export const certifications = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: 2025,
    description:
      "Fondamentaux du cloud AWS : services principaux, facturation, sécurité et architecture.",
    order: 1,
    published: true,
  },
  {
    title: "Terraform Associate",
    issuer: "HashiCorp",
    year: 2025,
    description:
      "Maîtrise de Terraform : configurations, gestion du state, modules et providers.",
    order: 2,
    published: true,
  },
  {
    title: "Docker Fundamentals",
    issuer: "Docker",
    year: 2024,
    description:
      "Conteneurisation d'applications, gestion d'images, réseaux et volumes Docker.",
    order: 3,
    published: true,
  },
  {
    title: "Linux Essentials",
    issuer: "Linux Professional Institute",
    year: 2024,
    description:
      "Bases solides du système Linux : ligne de commande, permissions et scripting.",
    order: 4,
    published: true,
  },
  {
    title: "Cisco Networking Basics",
    issuer: "Cisco",
    year: 2023,
    description:
      "Fondamentaux des réseaux : modèles OSI/TCP-IP, adressage, commutation et routage.",
    order: 5,
    published: true,
  },
];

// ------------------------------------------------------------

export const publications = [
  {
    title: "Electricity Theft and Its Impact on Distribution Networks",
    slug: "electricity-theft-impact-distribution-networks",
    authors: "Sam Irung, et al.",
    abstract:
      "Analyse de l'impact des vols d'électricité sur la stabilité des réseaux de distribution. Proposition de contre-mesures techniques.",
    type: "Article",
    journal: "Energy Engineering",
    year: 2025,
    doi: "10.xxxx/xxxxx",
    status: "PUBLISHED" as const,
    featured: true,
    order: 1,
  },
  {
    title:
      "Sécurisation des infrastructures cloud par l'Infrastructure as Code",
    slug: "securisation-infrastructures-cloud-iac",
    authors: "Sam Irung",
    abstract:
      "Étude de l'intégration de la sécurité dès la conception des infrastructures cloud, via l'IaC.",
    type: "Mémoire",
    year: 2025,
    status: "PUBLISHED" as const,
    featured: false,
    order: 2,
  },
  {
    title:
      "DevSecOps dans les environnements à ressources limitées",
    slug: "devsecops-environnements-ressources-limitees",
    authors: "Sam Irung",
    abstract:
      "Retour d'expérience sur la mise en place de pratiques DevSecOps dans des contextes contraints.",
    type: "Conférence",
    year: 2024,
    status: "PUBLISHED" as const,
    featured: false,
    order: 3,
  },
];

// ------------------------------------------------------------

export const labs = [
  {
    title: "Terraform Lab",
    slug: "terraform-lab",
    summary:
      "Modules Terraform réutilisables pour AWS : VPC, EC2, IAM, S3 avec state distant.",
    objective:
      "Maîtriser la structuration d'un projet Terraform professionnel.",
    environment: "Poste Linux + compte AWS sandbox + S3 + DynamoDB.",
    architecture:
      "Modules réseau, calcul, stockage appelés depuis des environnements dev/staging/prod.",
    result: "Infrastructure reproductible, state distant fonctionnel, modules réutilisables.",
    learning:
      "Structuration multi-environnements|Importance du state distant|Bonnes pratiques modules|Variables, locals, outputs",
    codeUrl: "https://github.com/sam-irung",
    status: "PUBLISHED" as const,
    featured: true,
    order: 1,
  },
  {
    title: "Kubernetes Lab",
    slug: "kubernetes-lab",
    summary:
      "Cluster Kubernetes local avec déploiement, Ingress et gestion de la configuration.",
    objective:
      "Comprendre le cycle complet d'une application conteneurisée sur Kubernetes.",
    environment: "Cluster k3s sur VM + kubectl + Helm + registry local.",
    architecture:
      "Namespace applicatif, Deployments, Services ClusterIP, Ingress NGINX.",
    result: "Application déployée via Ingress, rolling update sans interruption.",
    learning:
      "Différence Docker/Kubernetes|Déploiements progressifs|Debug pods|Organisation namespaces",
    codeUrl: "https://github.com/sam-irung",
    status: "PUBLISHED" as const,
    featured: true,
    order: 2,
  },
  {
    title: "AWS Lab",
    slug: "aws-lab",
    summary: "Architecture 3-tiers complète sur AWS avec haute disponibilité.",
    objective:
      "Concevoir une architecture AWS résiliente : multi-AZ, load balancer, auto-scaling.",
    environment: "Compte AWS sandbox + Terraform.",
    architecture:
      "VPC multi-AZ, ALB, Auto Scaling Group, RDS multi-AZ, CloudWatch.",
    result: "Architecture hautement disponible, scalabilité automatique.",
    learning:
      "Architecture multi-AZ|Subnets publics/privés|Sécurité réseau AWS|CloudWatch",
    codeUrl: "https://github.com/sam-irung",
    status: "PUBLISHED" as const,
    featured: true,
    order: 3,
  },
  {
    title: "GNS3 Lab",
    slug: "gns3-lab",
    summary:
      "Simulation d'une architecture réseau d'entreprise à deux sites.",
    objective:
      "Maîtriser VLANs, routage inter-VLAN, OSPF multi-aires et VPN site-à-site.",
    environment: "GNS3 avec images Cisco IOS.",
    architecture:
      "Deux sites avec VLANs, switches, routeurs OSPF et tunnel VPN.",
    result: "Architecture fonctionnelle simulant deux sites.",
    learning:
      "Configuration VLANs|Diagnostic routage|Captures Wireshark|Tunnel VPN",
    status: "PUBLISHED" as const,
    featured: false,
    order: 4,
  },
  {
    title: "Active Directory Lab",
    slug: "active-directory-lab",
    summary:
      "Domaine Active Directory complet avec GPO et services réseau.",
    objective:
      "Maîtriser la mise en place d'un environnement Windows Server structuré.",
    environment: "2 VMs Windows Server + 1 VM cliente Windows 10.",
    architecture:
      "Contrôleur de domaine AD DS, DNS, DHCP. OU, GPO, serveur de fichiers.",
    result: "Domaine fonctionnel, GPO appliquées, structure scalable.",
    learning:
      "Organisation annuaire AD|Sécurité AD|Permissions par groupe|Diagnostic GPO",
    status: "PUBLISHED" as const,
    featured: false,
    order: 5,
  },
  {
    title: "DevSecOps Lab",
    slug: "devsecops-lab",
    summary:
      "Pipeline CI/CD sécurisé avec détection automatique des vulnérabilités.",
    objective:
      "Intégrer la sécurité à chaque étape du cycle de déploiement.",
    environment:
      "GitHub + GitHub Actions + Terraform + tfsec + checkov + gitleaks.",
    architecture:
      "Pipeline en jobs successifs : lint, tests, scan IaC, scan secrets, build.",
    result: "Détection auto des erreurs IaC, aucun secret en clair.",
    learning:
      "DevOps vs DevSecOps|Place sécurité CI/CD|Outillage IaC security|Gestion secrets",
    codeUrl: "https://github.com/sam-irung",
    status: "PUBLISHED" as const,
    featured: true,
    order: 6,
  },
];

// ------------------------------------------------------------

export const documents = [
  {
    title: "CV — Sam Irung",
    description:
      "Cloud Engineer • DevOps • Infrastructure as Code — version professionnelle complète.",
    category: "Curriculum Vitae",
    fileUrl: "/documents/CV-Sam-Irung.pdf",
    fileType: "PDF",
    order: 1,
    published: true,
  },
];

// ------------------------------------------------------------

export const settings = [
  {
    key: "site.title",
    value: "Sam Irung — Cloud Engineer",
  },
  {
    key: "site.description",
    value:
      "Portfolio professionnel de Sam Irung — Cloud Engineer, DevOps et Infrastructure as Code.",
  },
  {
    key: "contact.email",
    value: "samirung65@gmail.com",
  },
  {
    key: "contact.linkedin",
    value: "https://linkedin.com/in/samirung-4a113334",
  },
  {
    key: "contact.github",
    value: "https://github.com/sam-irung",
  },
];