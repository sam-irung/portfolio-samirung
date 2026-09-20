import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getLabBySlug, getLabs } from "@/app/lib/services/labs";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = await getLabBySlug(slug);
  if (!lab) return {};

  return {
    title: lab.title,
    description: lab.summary,
  };
}
//export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateStaticParams() {
  const labs = await getLabs();
  return labs.map((l) => ({ slug: l.slug }));
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = await getLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  const learnings = lab.learning ? lab.learning.split("|") : [];

  return (
    <>
      <Header />

      <main className="flex-1 bg-white">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <Link
              href="/labs"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              ← Tous les labs
            </Link>

            <div className="mt-8">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                {lab.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
                {lab.summary}
              </p>

              {lab.codeUrl && (
                <div className="mt-8">
                  <a
                    href={lab.codeUrl}
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

        <section className="mx-auto max-w-5xl px-6 pt-12">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl text-white/90 md:text-8xl">
                {"</>"}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="space-y-12">
            {lab.objective && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Objectif
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {lab.objective}
                </p>
              </div>
            )}

            {lab.environment && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Environnement
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {lab.environment}
                </p>
              </div>
            )}

            {lab.architecture && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Architecture
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {lab.architecture}
                </p>
              </div>
            )}

            {lab.result && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Résultats
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {lab.result}
                </p>
              </div>
            )}

            {learnings.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Ce que j'ai appris
                </h2>
                <ul className="mt-4 space-y-2">
                  {learnings.map((l, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-base leading-relaxed text-neutral-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                      {l.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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