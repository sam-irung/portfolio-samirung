"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Data = {
  id?: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  certificateUrl: string;
  verificationUrl: string;
  imageUrl: string;
  order: number;
  published: boolean;
};

type Props = { initial?: Partial<Data>; mode: "create" | "edit" };

const empty: Data = {
  title: "", issuer: "", year: "", description: "",
  certificateUrl: "", verificationUrl: "", imageUrl: "",
  order: 0, published: true,
};

export default function CertificationForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Data>({ ...empty, ...initial });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") setData({ ...data, [name]: (e.target as HTMLInputElement).checked });
    else if (name === "order") setData({ ...data, order: Number(value) });
    else setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const endpoint = mode === "create" ? "/api/admin/certifications" : `/api/admin/certifications/${initial?.id}`;
    const res = await fetch(endpoint, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { setError("Erreur."); setLoading(false); return; }
    router.push("/admin/certifications");
    router.refresh();
  };

  const inputClass = "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";
  const labelClass = "block text-sm font-medium text-neutral-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Titre *</label>
            <input name="title" value={data.title} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Organisme *</label>
            <input name="issuer" value={data.issuer} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Année</label>
            <input name="year" type="number" value={data.year} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ordre</label>
            <input name="order" type="number" value={data.order} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass}>Description</label>
          <textarea name="description" value={data.description} onChange={handleChange} rows={3} className={inputClass} />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>URL du certificat</label>
            <input name="certificateUrl" value={data.certificateUrl} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>URL de vérification</label>
            <input name="verificationUrl" value={data.verificationUrl} onChange={handleChange} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>URL de l'image</label>
            <input name="imageUrl" value={data.imageUrl} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" checked={data.published} onChange={handleChange} />
          Publié
        </label>
      </div>

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="inline-flex h-11 items-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60">
          {loading ? "Enregistrement..." : mode === "create" ? "Créer" : "Enregistrer"}
        </button>
        <button type="button" onClick={() => router.push("/admin/certifications")} className="inline-flex h-11 items-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
          Annuler
        </button>
      </div>
    </form>
  );
}