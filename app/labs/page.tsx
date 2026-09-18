import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

type Lab = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
};

const labs: Lab[] = [
  {
    slug: "terraform-lab",
    title: "Terraform Lab",
    category: "Infrastructure as Code",
    description:
      "Modules Terraform réutilisables pour AWS : VPC, EC2, IAM, S3 avec state distant sur S3 + DynamoDB.",
    tags: ["Terraform", "AWS", "S3", "DynamoDB"],
    color: "from-violet-500 to-violet-700",
    icon: "</>",
    level: "Intermédiaire",
  },
  {
    slug: "kubernetes-lab",
    title: "Kubernetes Lab",
    category: "DevOps",
    description:
      "Cluster Kubernetes local (k3s) avec déploiement d'applications, Ingress, ConfigMaps, Secrets et Helm.",
    tags: ["Kubernetes", "k3s", "Helm", "Ingress"],
    color: "from-blue-500 to-blue-700",
    icon: "☸",
    level: "Intermédiaire",
  },
  {
    slug: "aws-lab",
    title: "AWS Lab",
    category: "Cloud",
    description:
      "Architecture 3-tiers sur AWS : VPC multi-AZ, Application Load Balancer, Auto Scaling Group, RDS et monitoring CloudWatch.",
    tags: ["AWS", "VPC", "ALB", "EC2", "RDS"],
    color: "from-orange-500 to-orange-700",
    icon: "☁",
    level: "Intermédiaire",
  },
  {
    slug: "gns3-lab",
    title: "GNS3 Lab",
    category: "Réseaux",
    description:
      "Simulation d'architectures réseau d'entreprise : VLAN, routage inter-VLAN, OSPF multi-aires et VPN site-à-site.",
    tags: ["GNS3", "VLAN", "OSPF", "VPN"],
    color: "from-cyan-500 to-cyan-700",
    icon: "◈",
    level: "Intermédiaire",
  },
  {
    slug: "active-directory-lab",
    title: "Active Directory Lab",
    category: "Systèmes",
    description:
      "Déploiement d'un domaine Active Directory complet : contrôleur de domaine, DNS, DHCP, GPO et serveur de fichiers.",
    tags: ["Windows Server", "AD DS", "GPO", "DNS", "DHCP"],
    color: "from-sky-500 to-sky-700",
    icon: "⚙",
    level: "Intermédiaire",
  },
  {
    slug: "devsecops-lab",
    title: "DevSecOps Lab",
    category: "Sécurité",
    description:
      "Pipeline CI/CD sécurisé : scanning IaC (tfsec, checkov), SAST, gestion des secrets et principe du moindre privilège.",
    tags: ["DevSecOps", "CI/CD", "tfsec", "Sécurité"],
    color: "from-rose-500 to-rose-700",
    icon: "🛡",
    level: "Avancé",
  },
];

const levelStyles: Record<Lab["level"], string> = {
  Débutant: "bg-neutral-100 text-neutral-700",
  Intermédiaire: "bg-primary-100 text-primary-700",
  Avancé: "bg-accent-100 text-accent-700",
};

export default function LabsPage() {
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
                  Labs
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Laboratoires techniques
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Des environnements d'expérimentation conçus pour tester,
                  comprendre et reconstruire. Chaque lab est documenté comme
                  une petite étude de cas : objectif, architecture, manipulations
                  et apprentissages.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Grille labs */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab, i) => (
              <Reveal key={lab.slug} delay={i * 0.06}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
                >
                  {/* Bandeau */}
                  <div
                    className={`relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${lab.color}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />

                    <span className="relative font-mono text-4xl text-white/95">
                      {lab.icon}
                    </span>

                    <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {lab.category}
                    </span>

                    <span
                      className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${levelStyles[lab.level]}`}
                    >
                      {lab.level}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-heading text-lg font-semibold text-neutral-900">
                      {lab.title}
                    </h2>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                      {lab.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {lab.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
                      Explorer le lab
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Vous voulez voir ces labs en action ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Tous les labs sont documentés sur GitHub. N'hésitez pas à me
                contacter pour en discuter.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://github.com/sam-irung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Voir sur GitHub
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