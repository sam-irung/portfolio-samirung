"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUploader from "./FileUploader";

type Data = {
  id?: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  order: number;
  published: boolean;
};

type Props = { initial?: Partial<Data>; mode: "create" | "edit" };

const empty: Data = {
  title: "", description: "", category: "", fileUrl: "",
  fileType: "PDF", fileSize: "", order: 0, published: true,
};

export default function DocumentForm({ initial, mode }: Props) {
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
    const endpoint = mode === "create" ? "/api/admin/documents" : `/api/admin/documents/${initial?.id}`;
    const res = await fetch(endpoint, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { setError("Erreur."); setLoading(false); return; }
    router.push("/admin/documents");
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
          <label className={labelClass}>Description</label>
          <textarea name="description" value={data.description} onChange={handleChange} rows={2} className={inputClass} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Catégorie</label>
            <input name="category" value={data.category} onChange={handleChange} className={inputClass} placeholder="CV, Mémoire, Rapport..." />
          </div>
          <div>
            <label className={labelClass}>Ordre</label>
            <input name="order" type="number" value={data.order} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Upload */}
        <FileUploader
          label="Fichier du document *"
          bucket="documents"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          value={data.fileUrl}
          onChange={(url, meta) => {
            setData((prev) => ({
              ...prev,
              fileUrl: url,
              fileType: meta?.type?.split("/").pop()?.toUpperCase() ?? prev.fileType,
              fileSize: meta ? String(meta.size) : prev.fileSize,
            }));
          }}
        />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" checked={data.published} onChange={handleChange} />
          Publié
        </label>
      </div>

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading || !data.fileUrl} className="inline-flex h-11 items-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60">
          {loading ? "Enregistrement..." : mode === "create" ? "Créer" : "Enregistrer"}
        </button>
        <button type="button" onClick={() => router.push("/admin/documents")} className="inline-flex h-11 items-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
          Annuler
        </button>
      </div>
    </form>
  );
}