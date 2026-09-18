import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-8 py-16 md:px-16 md:py-20">
            {/* Motif discret */}
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90">
                Contact
              </p>

              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Vous avez un projet ou une opportunité ?
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                Construisons quelque chose ensemble. Discutons de votre
                infrastructure, de vos projets Cloud, DevOps ou de
                cybersécurité.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="mailto:samirung65@gmail.com"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-primary-700 transition-colors hover:bg-neutral-100"
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
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                  Envoyer un email
                </Link>

                <Link
                  href="https://www.linkedin.com/in/sam-irung-44a113334/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Me contacter sur LinkedIn
                </Link>
              </div>

              {/* Petites infos */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70">
                <span>samirung65@gmail.com</span>
                <span className="hidden md:inline">•</span>
                <span>Disponible pour missions & collaborations</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}