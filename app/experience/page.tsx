import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getExperiences } from "@/app/lib/services/experiences";

export const dynamic = "force-dynamic";

function formatPeriod(startDate: Date, endDate: Date | null, current: boolean) {
  const start = new Date(startDate);
  const startLabel = `${start.getFullYear()}`;

  if (current || !endDate) {
    return `${startLabel} — Aujourd'hui`;
  }

  const end = new Date(endDate);
  const endLabel = `${end.getFullYear()}`;

  if (startLabel === endLabel) {
    return startLabel;
  }

  return `${startLabel} — ${endLabel}`;
}

export default async function ExperiencePage() {
  const experiences = await getExperiences();

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
                  Parcours
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Expérience & formation
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Un parcours qui combine formation académique, stages en
                  entreprise et projets techniques personnels.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="relative">
            <span className="absolute left-3 top-2 hidden h-[calc(100%-1rem)] w-px bg-neutral-200 md:left-[180px] md:block" />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <Reveal key={exp.id} delay={i * 0.05}>
                  <div className="relative grid gap-6 md:grid-cols-[180px_1fr] md:gap-10">
                    <div className="hidden md:block">
                      <p className="font-heading text-base font-semibold text-neutral-900">
                        {formatPeriod(exp.startDate, exp.endDate, exp.current)}
                      </p>
                      {exp.location && (
                        <p className="mt-1 text-xs text-neutral-500">
                          {exp.location}
                        </p>
                      )}
                    </div>

                    <span className="absolute left-[180px] top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-primary-600 ring-2 ring-primary-100 md:block" />

                    <article className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg md:p-8">
                      <div className="mb-4 md:hidden">
                        <p className="font-heading text-sm font-semibold text-neutral-900">
                          {formatPeriod(exp.startDate, exp.endDate, exp.current)}
                        </p>
                      </div>

                      <h2 className="font-heading text-xl font-bold text-neutral-900">
                        {exp.position}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-primary-600">
                        {exp.company}
                        {exp.location && (
                          <span className="text-neutral-500">
                            {" "}
                            · {exp.location}
                          </span>
                        )}
                      </p>

                      {exp.description && (
                        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                          {exp.description}
                        </p>
                      )}

                      {exp.missions && (
                        <div className="mt-5">
                          <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-neutral-900">
                            Missions
                          </h3>
                          <ul className="mt-3 space-y-2">
                            {exp.missions.split("|").map((mission, idx) => (
                              <li
                                key={idx}
                                className="flex gap-2 text-sm leading-relaxed text-neutral-600"
                              >
                                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                                {mission.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.technologies && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {exp.technologies.split(",").map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

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