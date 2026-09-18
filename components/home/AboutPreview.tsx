import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    title: "Ma mission",
    icon: "◎",
    text: "Contribuer à des infrastructures modernes, sécurisées et durables.",
  },
  {
    title: "Ma vision",
    icon: "◉",
    text: "Un monde où la technologie crée plus d'opportunités et de solutions.",
  },
  {
    title: "Mes valeurs",
    icon: "⚡",
    text: "Apprentissage continu • Excellence • Impact • Collaboration",
  },
];

export default function AboutPreview() {
  return (
    <section id="a-propos" className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[auto_1fr_1fr] md:gap-10">
          {/* Photo ronde */}
          <Reveal>
            <div className="relative mx-auto md:mx-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary-600/30 md:h-44 md:w-44">
                <Image
                  src="/sam-irung-portrait.png"
                  alt="Sam Irung"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 border-neutral-950 bg-green-400" />
            </div>
          </Reveal>

          {/* Texte */}
          <Reveal delay={0.1}>
            <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-300">
              À propos
            </p>

            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
              À propos de moi
            </h2>

            <p className="mt-5 text-base leading-relaxed text-neutral-300">
              Je suis Sam Irung, Cloud Engineer et passionné par les
              technologies modernes. Je conçois, déploie et sécurise des
              infrastructures cloud en m'appuyant sur le DevOps, l'Infrastructure
              as Code et les bonnes pratiques de cybersécurité.
            </p>

            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              Mon objectif : créer des solutions fiables, scalables et à fort
              impact.
            </p>

            <Link
              href="/documents/cv-sam-irung.pdf"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Télécharger mon CV
            </Link>
          </Reveal>

          {/* 3 piliers */}
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6 border-l border-white/10 pl-0 md:pl-8">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary-300">
                    {pillar.icon}
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}