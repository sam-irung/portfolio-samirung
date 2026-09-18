import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const labs = [
  {
    title: "Terraform Lab",
    category: "Infrastructure as Code",
    description:
      "Modules Terraform réutilisables pour AWS : VPC, EC2, IAM, S3 avec state distant.",
    tags: ["Terraform", "AWS", "S3"],
    icon: "</>",
    color: "from-violet-500 to-violet-700",
  },
  {
    title: "Kubernetes Lab",
    category: "DevOps",
    description:
      "Cluster Kubernetes local, déploiement d'applications, Ingress, ConfigMaps et Secrets.",
    tags: ["Kubernetes", "Docker", "Helm"],
    icon: "☸",
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "AWS Lab",
    category: "Cloud",
    description:
      "Architecture 3-tiers sur AWS : VPC, subnets, load balancer, auto-scaling et monitoring.",
    tags: ["AWS", "VPC", "EC2"],
    icon: "☁",
    color: "from-orange-500 to-orange-700",
  },
  {
    title: "GNS3 Lab",
    category: "Réseaux",
    description:
      "Simulation d'architectures réseau : VLAN, routage inter-VLAN, OSPF, VPN site-à-site.",
    tags: ["GNS3", "VLAN", "OSPF"],
    icon: "◈",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    title: "Active Directory Lab",
    category: "Systèmes",
    description:
      "Déploiement d'un domaine AD : utilisateurs, GPO, DNS, DHCP et serveur de fichiers.",
    tags: ["Windows Server", "AD", "GPO"],
    icon: "⚙",
    color: "from-sky-500 to-sky-700",
  },
  {
    title: "DevSecOps Lab",
    category: "Sécurité",
    description:
      "Pipeline CI/CD sécurisé : scanning IaC, SAST, gestion des secrets et politique d'accès.",
    tags: ["DevSecOps", "CI/CD", "Sécurité"],
    icon: "🛡",
    color: "from-rose-500 to-rose-700",
  },
];

export default function LabsPreview() {
  return (
    <section id="labs" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* En-tête */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                Labs
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                Laboratoires techniques
              </h2>
              <p className="mt-3 max-w-xl text-base text-neutral-600">
                Environnements d'expérimentation pour tester, casser, comprendre
                et reconstruire : c'est là que naissent les vraies compétences.
              </p>
            </div>
            <Link
              href="#labs"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Voir tous les labs
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Grille */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab, i) => (
            <Reveal key={lab.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                {/* Bandeau avec icône */}
                <div
                  className={`relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${lab.color}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                  <span className="relative font-mono text-4xl text-white/90">
                    {lab.icon}
                  </span>
                  <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {lab.category}
                  </span>
                </div>

                {/* Contenu */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-semibold text-neutral-900">
                    {lab.title}
                  </h3>
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

                  <Link
                    href="#labs"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700"
                  >
                    Explorer le lab
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