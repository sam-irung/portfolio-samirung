import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getExperiences } from "@/app/lib/services/experiences";
import { prisma } from "@/app/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Cloud Engineer orienté DevOps et Infrastructure as Code, en route vers la cybersécurité. Parcours, formation et vision professionnelle.",
};
//export const dynamic = "force-dynamic";

const values = [
  {
    title: "Apprentissage continu",
    icon: "◎",
    text: "Chaque projet est une occasion d'apprendre quelque chose de nouveau et de progresser.",
  },
  {
    title: "Rigueur technique",
    icon: "◉",
    text: "Je privilégie les solutions robustes, documentées et reproductibles.",
  },
  {
    title: "Impact concret",
    icon: "⚡",
    text: "La technologie n'a de sens que lorsqu'elle résout de vrais problèmes.",
  },
  {
    title: "Collaboration",
    icon: "◇",
    text: "Je crois au partage de connaissances et au travail en équipe.",
  },
];

const interests = [
  "Cloud Architecture",
  "DevOps & CI/CD",
  "Infrastructure as Code",
  "Cybersécurité",
  "Réseaux & Systèmes",
  "Automatisation",
];

function formatPeriod(startDate: Date, endDate: Date | null, current: boolean) {
  const start = new Date(startDate);
  const startLabel = `${start.getFullYear()}`;

  if (current || !endDate) {
    return `${startLabel} — Aujourd'hui`;
  }

  const end = new Date(endDate);
  const endLabel = `${end.getFullYear()}`;

  return startLabel === endLabel ? startLabel : `${startLabel} — ${endLabel}`;
}

export default async function AboutPage() {
  const experiences = await getExperiences();

  const emailSetting = await prisma.setting.findUnique({
    where: { key: "contact.email" },
  });

  const email = emailSetting?.value ?? "samirung65@gmail.com";

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
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
                  À propos
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Qui je suis
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Cloud Engineer orienté DevOps et Infrastructure as Code, en
                  route vers une spécialisation en cybersécurité.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
            <Reveal>
              <div className="mx-auto md:mx-0">
                <div className="relative h-64 w-64 overflow-hidden rounded-3xl md:h-72 md:w-72">
                  <Image
                    src="/sam-irung-portrait.png"
                    alt="Sam Irung"
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-neutral-700">
                <p>
                  Je suis <strong className="text-neutral-900">Sam Irung</strong>,
                  Cloud Engineer avec une formation solide en administration
                  systèmes et réseaux.
                </p>

                <p>
                  Je conçois, automatise et sécurise des infrastructures
                  modernes, en m'appuyant sur le Cloud, le DevOps et
                  l'Infrastructure as Code.
                </p>

                <p>
                  Aujourd'hui, je travaille principalement avec{" "}
                  <strong className="text-neutral-900">AWS</strong>,{" "}
                  <strong className="text-neutral-900">Terraform</strong>,{" "}
                  <strong className="text-neutral-900">Docker</strong> et{" "}
                  <strong className="text-neutral-900">Kubernetes</strong>. Je
                  documente chaque projet comme une étude de cas.
                </p>

                <p>
                  Je poursuis actuellement un{" "}
                  <strong className="text-neutral-900">
                    Master en cybersécurité
                  </strong>{" "}
                  afin d'intégrer la sécurité dès la conception des
                  infrastructures. Mon objectif : construire des environnements
                  fiables, reproductibles et durables.
                </p>

                <div className="pt-2">
                  <a
                    href="/documents/CV-Sam-Irung.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    Télécharger mon CV
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                  Parcours
                </p>
                <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                  Mon parcours
                </h2>
              </div>
            </Reveal>

            <div className="relative mx-auto mt-16 max-w-3xl">
              <span className="absolute left-4 top-0 h-full w-px bg-neutral-200 md:left-6" />

              <div className="space-y-8">
                {experiences.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.06}>
                    <div className="relative flex gap-6 md:gap-8">
                      <span className="relative z-10 mt-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-50 bg-primary-600 text-xs font-bold text-white md:h-12 md:w-12">
                        {new Date(item.startDate).getFullYear().toString().slice(-2)}
                      </span>

                      <div className="flex-1 rounded-2xl border border-neutral-200 bg-white p-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-primary-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary-700">
                            {formatPeriod(item.startDate, item.endDate, item.current)}
                          </span>
                          <span className="text-xs font-medium text-neutral-500">
                            {item.company}
                          </span>
                        </div>

                        <h3 className="mt-3 font-heading text-lg font-semibold text-neutral-900">
                          {item.position}
                        </h3>

                        {item.description && (
                          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
                  Valeurs
                </p>
                <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                  Ce qui me guide
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <Reveal key={value.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary-600">
                      {value.icon}
                    </span>
                    <h3 className="mt-4 font-heading text-base font-semibold text-neutral-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {value.text}
                    </p>
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
                Envie de collaborer ou d'échanger ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Discutons de vos projets Cloud, DevOps, IaC ou cybersécurité.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Me contacter
                </a>
                <Link
                  href="/projets"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  Voir mes projets
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