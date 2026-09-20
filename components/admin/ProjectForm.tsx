"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectData = {
  id?: string;
  title: string;
  slug: string;
  shortSummary: string;
  description: string;
  context: string;
  objectives: string;
  architecture: string;
  methodology: string;
  implementation: string;
  results: string;
  difficulties: string;
  solutions: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  documentationUrl: string;
  status: "DEVELOPMENT" | "COMPLETED" | "ARCHIVED";
  featured: boolean;
  published: boolean;
  order: number;
  technologies: string[];
};

type Props = {
  initial?: Partial<ProjectData>;
  mode: "create" | "edit";
};

const empty: ProjectData = {
  title: "",
  slug: "",
  shortSummary: "",
  description: "",
  context: "",
  objectives: "",
  architecture: "",
  methodology: "",
  implementation: "",
  results: "",
  difficulties: "",
  solutions: "",
  imageUrl: "",
  githubUrl: "",
  demoUrl: "",
  documentationUrl: "",
  status: "DEVELOPMENT",
  featured: false,
  published: false,
  order: 0,
  technologies: [],
};

export default function ProjectForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState<ProjectData>({ ...empty, ...initial });
  const [techInput, setTechInput] = useState(
    (initial?.technologies ?? []).join(", ")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setData({ ...data, [name]: checked });
    } else if (name === "order") {
      setData({ ...data, order: Number(value) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = { ...data, technologies };

    const endpoint =
      mode === "create"
        ? "/api/admin/projects"
        : `/api/admin/projects/${initial?.id}`;

    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setError(err.error ?? "Erreur lors de l'enregistrement.");
      setLoading(false);
      return;
    }

    router.push("/admin/projets");
    router.refresh();
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";
  const labelClass = "block text-sm font-medium text-neutral-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Bloc principal */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          Informations principales
        </h2>

        <div className="mt-5 space-y-4">
          <div>
            <label className={labelClass}>Titre *</label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Infrastructure Cloud avec Terraform"
            />
          </div>

          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input
              name="slug"
              value={data.slug}
              onChange={handleChange}
              className={inputClass}
              placeholder="Laissez vide pour générer automatiquement"
            />
          </div>

          <div>
            <label className={labelClass}>Résumé court *</label>
            <textarea
              name="shortSummary"
              value={data.shortSummary}
              onChange={handleChange}
              required
              rows={2}
              className={inputClass}
              placeholder="Une phrase qui résume le projet"
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Étude de cas */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          Étude de cas
        </h2>

        <div className="mt-5 space-y-4">
          {[
            ["context", "Contexte"],
            ["objectives", "Objectifs"],
            ["architecture", "Architecture"],
            ["implementation", "Implémentation"],
            ["results", "Résultats"],
            ["difficulties", "Difficultés"],
            ["solutions", "Solutions"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <textarea
                name={key}
                value={(data as any)[key]}
                onChange={handleChange}
                rows={3}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Liens & image */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          Liens & ressources
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            ["githubUrl", "GitHub"],
            ["demoUrl", "Démo"],
            ["documentationUrl", "Documentation"],
            ["imageUrl", "URL de l'image"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input
                name={key}
                value={(data as any)[key]}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          Technologies
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Séparées par des virgules. Les nouvelles seront créées automatiquement.
        </p>
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          className={inputClass}
          placeholder="Terraform, AWS, Git"
        />
      </div>

      {/* Statut */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          Statut & affichage
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <label className={labelClass}>Statut</label>
            <select
              name="status"
              value={data.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="DEVELOPMENT">En développement</option>
              <option value="COMPLETED">Terminé</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Ordre</label>
            <input
              type="number"
              name="order"
              value={data.order}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-neutral-900">
            <input
              type="checkbox"
              name="featured"
              checked={data.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-neutral-300"
            />
            En vedette sur la Home
          </label>

          <label className="flex items-center gap-2 text-sm text-neutral-900">
            <input
              type="checkbox"
              name="published"
              checked={data.published}
              onChange={handleChange}
              className="h-4 w-4 rounded border-neutral-300"
            />
            Publié
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Enregistrement..."
            : mode === "create"
            ? "Créer le projet"
            : "Enregistrer les modifications"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/projets")}
          className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}