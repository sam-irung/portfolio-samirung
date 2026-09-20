"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Data = {
  id?: string;
  title: string;
  slug: string;
  authors: string;
  abstract: string;
  type: string;
  journal: string;
  conference: string;
  year: string;
  doi: string;
  externalUrl: string;
  pdfUrl: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  order: number;
};

type Props = { initial?: Partial<Data>; mode: "create" | "edit" };

const empty: Data = {
  title: "", slug: "", authors: "", abstract: "", type: "Article",
  journal: "", conference: "", year: "", doi: "", externalUrl: "", pdfUrl: "",
  status: "DRAFT", featured: false, order: 0,
};

export default function PublicationForm({ initial, mode }: Props) {
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
    const endpoint = mode === "create" ? "/api/admin/publications" : `/api/admin/publications/${initial?.id}`;
    const res = await fetch(endpoint, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { setError("Erreur."); setLoading(false); return; }
    router.push("/admin/publications");
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
          <label className={labelClass}>Slug (URL)</label>
          <input name="slug" value={data.slug} onChange={handleChange} className={inputClass} placeholder="Laissez vide pour générer" />
        </div>
        <div>
          <label className={labelClass}>Auteurs</label>
          <input name="authors" value={data.authors} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Résumé</label>
          <textarea name="abstract" value={data.abstract} onChange={handleChange} rows={4} className={inputClass} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Type</label>
            <select name="type" value={data.type} onChange={handleChange} className={inputClass}>
              <option value="Article">Article</option>
              <option value="Mémoire">Mémoire</option>
              <option value="Conférence">Conférence</option>
              <option value="Rapport">Rapport</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Année</label>
            <input name="year" type="number" value={data.year} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Journal</label>
            <input name="journal" value={data.journal} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Conférence</label>
            <input name="conference" value={data.conference} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>DOI</label>
            <input name="doi" value={data.doi} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ordre</label>
            <input name="order" type="number" value={data.order} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>URL externe</label>
            <input name="externalUrl" value={data.externalUrl} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>URL du PDF</label>
            <input name="pdfUrl" value={data.pdfUrl} onChange={handleChange} className={inputClass} />
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
        <button type="button" onClick={() => router.push("/admin/publications")} className="inline-flex h-11 items-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
          Annuler
        </button>
      </div>
    </form>
  );
}