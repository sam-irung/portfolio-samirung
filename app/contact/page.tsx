"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

type FormState = "idle" | "sending" | "success" | "error";

const contactInfoFallback = [
  { label: "Email", value: "samirung65@gmail.com", href: "mailto:samirung65@gmail.com", icon: "✉" },
  { label: "LinkedIn", value: "linkedin.com/in/samirung-4a113334", href: "https://linkedin.com/in/samirung-4a113334", icon: "in" },
  { label: "GitHub", value: "github.com/sam-irung", href: "https://github.com/sam-irung", icon: "◇" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState(contactInfoFallback);

  useEffect(() => {
    fetch("/api/settings/public")
      .then((res) => res.json())
      .then((data) => {
        if (data?.email) {
          setContactInfo((prev) =>
            prev.map((info) =>
              info.label === "Email"
                ? { ...info, value: data.email, href: `mailto:${data.email}` }
                : info
            )
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setState("sending");

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Merci de remplir tous les champs.");
      setState("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Merci de saisir une adresse email valide.");
      setState("error");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    setState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

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
                  Contact
                </p>

                <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  Me contacter
                </h1>

                <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                  Une question, un projet, une opportunité ou simplement envie
                  d'échanger ? N'hésitez pas à me laisser un message.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_360px] md:gap-16">
            <Reveal>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
                      Nom complet
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                      placeholder="vous@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-900">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    placeholder="Objet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-900">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    className="mt-2 w-full resize-y rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    placeholder="Décrivez votre projet, question ou message..."
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                {state === "success" && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    ✓ Message envoyé. Je vous répondrai dans les plus brefs délais.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-600 px-7 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <span aria-hidden>→</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-neutral-500">
                  Les informations transmises via ce formulaire ne sont utilisées que pour vous répondre.
                </p>
              </form>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="space-y-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <h2 className="font-heading text-lg font-semibold text-neutral-900">
                    Autres moyens de contact
                  </h2>

                  <ul className="mt-5 space-y-4">
                    {contactInfo.map((info) => (
                      <li key={info.label}>
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group flex items-center gap-4"
                        >
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 font-mono text-sm text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                            {info.icon}
                          </span>

                          <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                              {info.label}
                            </p>
                            <p className="truncate text-sm font-medium text-neutral-900 group-hover:text-primary-600">
                              {info.value}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <h3 className="font-heading text-sm font-semibold text-neutral-900">
                    Disponibilité
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    Actuellement disponible pour des opportunités en Cloud,
                    DevOps, Infrastructure as Code et cybersécurité.
                  </p>

                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Réponse sous 24–48h
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}