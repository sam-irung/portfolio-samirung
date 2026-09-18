import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  skills: string[];
  verifyUrl?: string;
  color: string;
  icon: string;
};

const certifications: Certification[] = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    credentialId: "AWS-CP-XXXXX",
    description:
      "Fondamentaux du cloud AWS : services principaux, modèle de facturation, sécurité et architecture.",
    skills: ["AWS", "Cloud", "IAM", "S3", "EC2"],
    verifyUrl: "#",
    color: "from-orange-500 to-orange-700",
    icon: "☁",
  },
  {
    name: "Terraform Associate",
    issuer: "HashiCorp",
    date: "2025",
    description:
      "Maîtrise de Terraform : écriture de configurations, gestion du state, modules et providers.",
    skills: ["Terraform", "IaC", "State", "Modules"],
    verifyUrl: "#",
    color: "from-violet-500 to-violet-700",
    icon: "</>",
  },
  {
    name: "Docker Fundamentals",
    issuer: "Docker",
    date: "2024",
    description:
      "Conteneurisation d'applications, gestion d'images, réseaux et volumes Docker.",
    skills: ["Docker", "Containers", "Compose"],
    verifyUrl: "#",
    color: "from-sky-500 to-sky-700",
    icon: "🐳",
  },
  {
    name: "Linux Essentials",
    issuer: "Linux Professional Institute",
    date: "2024",
    description:
      "Bases solides du système Linux : ligne de commande, système de fichiers, permissions et scripting.",
    skills: ["Linux", "Bash", "Systèmes"],
    verifyUrl: "#",
    color: "from-neutral-700 to-neutral-900",
    icon: "🐧",
  },
  {
    name: "Cisco Networking Basics",
    issuer: "Cisco",
    date: "2023",
    description:
      "Fondamentaux des réseaux : modèles OSI/TCP-IP, adressage, commutation et routage.",
    skills: ["Réseaux", "TCP/IP", "Cisco"],
    verifyUrl: "#",
    color: "from-blue-500 to-blue-700",
    icon: "◈",
  },
];

export default function CertificationsPage() {
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
                  Certifications
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Mes certifications
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Des certifications obtenues pour valider et structurer mes
                  connaissances en Cloud, DevOps, systèmes et réseaux.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Grille certifications */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl">
                  {/* Bandeau */}
                  <div
                    className={`relative aspect-[16/9] bg-gradient-to-br ${cert.color}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-5xl text-white/95">
                        {cert.icon}
                      </span>
                    </div>
                    <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur-sm">
                      {cert.date}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-600">
                      {cert.issuer}
                    </p>

                    <h2 className="mt-2 font-heading text-lg font-semibold text-neutral-900">
                      {cert.name}
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                      {cert.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {cert.credentialId && (
                      <p className="mt-4 font-mono text-xs text-neutral-500">
                        ID : {cert.credentialId}
                      </p>
                    )}

                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700"
                      >
                        Vérifier le certificat
                        <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Vous souhaitez voir les documents ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Les certificats et documents associés sont disponibles dans la
                section Documents.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/documents"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Voir les documents
                </Link>
                <Link
                  href="/competences"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  Voir mes compétences
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