import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const disciplines = [
  { label: "Cloud", icon: "☁" },
  { label: "DevOps", icon: "⚙" },
  { label: "Infrastructure", icon: "◇" },
  { label: "Cybersécurité", icon: "🛡" },
  { label: "IaC (Terraform)", icon: "</>" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-primary-50/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          {/* Colonne texte */}
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-heading text-sm font-medium text-neutral-700">
                Bonjour, je suis
              </span>
              <span className="h-px w-8 bg-primary-600" />
            </div>

            <h1 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
              Sam <span className="text-primary-600">Irung</span>
            </h1>

            <p className="mt-5 font-heading text-lg font-semibold text-primary-600 md:text-xl">
              Cloud Engineer • DevOps • Infrastructure as Code
            </p>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg">
              Je conçois et automatise des infrastructures modernes,
              reproductibles et sécurisées. Je transforme les idées en
              solutions concrètes, du code à la production.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#projets"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-600 px-7 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                Découvrir mes projets
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary-600 bg-white px-7 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50"
              >
                Me contacter
              </Link>
            </div>
          </Reveal>

          {/* Colonne visuelle */}
          <Reveal delay={0.15}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 shadow-2xl">
              <Image
                src="/sam-irung-portrait.png"
                alt="Sam Irung — Cloud Engineer, DevOps et Infrastructure as Code"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover opacity-95"
              />

              <div className="absolute left-6 top-6 z-10">
                <p className="font-heading text-lg font-bold leading-tight text-white drop-shadow-md md:text-xl">
                  Build
                  <br />
                  Automate
                  <br />
                  Secure
                  <br />
                  <span className="text-primary-300">Together</span>
                </p>
                <span className="mt-3 block h-0.5 w-10 bg-primary-400" />
              </div>

              <div className="absolute bottom-6 left-6 z-10 space-y-2">
                {disciplines.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-3 text-sm font-medium text-white/95"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15 font-mono text-xs backdrop-blur-sm">
                      {d.icon}
                    </span>
                    {d.label}
                  </div>
                ))}
              </div>

              <div className="absolute right-4 top-1/3 z-10 hidden rounded-xl bg-neutral-900/80 px-4 py-3 text-xs font-medium leading-snug text-white backdrop-blur-sm md:block">
                Des infrastructures
                <br />
                pour un avenir
                <br />
                <span className="text-primary-300">meilleur</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}