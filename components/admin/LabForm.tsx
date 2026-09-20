"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Data = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  objective: string;
  environment: string;
  architecture: string;
  manipulations: string;
  result: string;
  learning: string;
  codeUrl: string;
  documentationUrl: string;
  imageUrl: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  order: number;
};

type Props = { initial?: Partial<Data>; mode: "create" | "edit" };

const empty: Data = {
  title: "", slug: "", summary: "", objective: "", environment: "",
  architecture: "", manipulations: "", result: "", learning: "",
  codeUrl: "", documentationUrl: "", imageUrl: "",
  status: "DRAFT", featured: false, order: 0,
};

export default function LabForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Data>({ ...empty, ...initial });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") setData({ ...data, [name]: (e.target as HTMLInputElement).checked });
    else if (name === "order") setData({ ...data, order: Number(value) });
    else setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const endpoint = mode === "create" ? "/api/admin/labs" : `/api/admin/labs/${initial?.id}`;
    const res = await fetch(endpoint, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { setError("Erreur."); setLoading(false); return; }
    router.push("/admin/labs");
    router.refresh();
  };

  const inputClass = "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";
  const labelClass = "block text-sm font-medium text-neutral-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
        <div>
          <label className={labelClass}>Titre *</label>
          <input name="title" value={data.title} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input name="slug" value={data.slug} onChange={handleChange} className={inputClass} placeholder="Laissez vide pour générer" />
        </div>
        <div>
          <label className={labelClass}>Résumé *</label>
          <textarea name="summary" value={data.summary} onChange={handleChange} required rows={2} className={inputClass} />
        </div>
        {[
          ["objective", "Objectif"],
          ["environment", "Environnement"],
          ["architecture", "Architecture"],
          ["manipulations", "Manipulations"],
          ["result", "Résultats"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className={labelClass}>{label}</label>
            <textarea name={key} value={(data as any)[key]} onChange={handleChange} rows={3} className={inputClass} />
          </div>
        ))}
        <div>
          <label className={labelClass}>
            Apprentissages (séparés par <code className="font-mono">|</code>)
          </label>
          <textarea name="learning" value={data.learning} onChange={handleChange} rows={3} className={inputClass} placeholder="Point 1|Point 2" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>URL du code</label>
            <input name="codeUrl" value={data.codeUrl} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>URL doc</label>
            <input name="documentationUrl" value={data.documentationUrl} onChange={handleChange} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>URL image</label>
            <input name="imageUrl" value={data.imageUrl} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 pt-2">
          <div>
            <label className={labelClass}>Statut</label>
            <select name="status" value={data.status} onChange={handleChange} className={inputClass}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Ordre</label>
            <input name="order" type="number" value={data.order} onChange={handleChange} className={inputClass} />
          </div>
          <label className="flex items-center gap-2 text-sm self-end">
            <input type="checkbox" name="featured" checked={data.featured} onChange={handleChange} />
            En vedette
          </label>
        </div>
      </div>

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="inline-flex h-11 items-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60">
          {loading ? "Enregistrement..." : mode === "create" ? "Créer" : "Enregistrer"}
        </button>
        <button type="button" onClick={() => router.push("/admin/labs")} className="inline-flex h-11 items-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
          Annuler
        </button>
      </div>
    </form>
  );
}