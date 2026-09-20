import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getSkillCategories } from "@/app/lib/services/skills";

export const dynamic = "force-dynamic";

const levelStyles: Record<string, string> = {
  Fondamental: "bg-neutral-100 text-neutral-700",
  Intermédiaire: "bg-sky-100 text-sky-800",
  Avancé: "bg-primary-100 text-primary-800",
  Expert: "bg-accent-100 text-accent-800",
};

export default async function SkillsPage() {
  const categories = await getSkillCategories();

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
                  Compétences
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Mes compétences techniques
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Un inventaire honnête et évolutif de mes compétences en Cloud,
                  DevOps, Infrastructure as Code, réseaux, systèmes et sécurité.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Légende */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-medium text-neutral-500">Niveaux :</span>
              {Object.entries(levelStyles).map(([lvl, cls]) => (
                <span
                  key={lvl}
                  className={`rounded-full px-3 py-1 font-medium ${cls}`}
                >
                  {lvl}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Catégories */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 font-mono text-xl text-primary-600">
                      ◆
                    </span>

                    <div>
                      <h2 className="font-heading text-xl font-bold text-neutral-900">
                        {cat.name}
                      </h2>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.id}
                        className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-sm font-medium text-neutral-800">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span
                            className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              levelStyles[skill.level] ??
                              "bg-neutral-100 text-neutral-700"
                            }`}
                          >
                            {skill.level}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Vous cherchez ces compétences pour votre équipe ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
                Discutons de vos besoins en Cloud, DevOps ou sécurité.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Me contacter
                </Link>
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