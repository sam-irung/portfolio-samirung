"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Data = {
  id?: string;
  company: string;
  position: string;
  location: string;
  startDate: string;   // format YYYY-MM-DD
  endDate: string;
  current: boolean;
  description: string;
  missions: string;
  technologies: string;
  order: number;
  published: boolean;
};

type Props = { initial?: Partial<Data>; mode: "create" | "edit" };

const empty: Data = {
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  missions: "",
  technologies: "",
  order: 0,
  published: true,
};

export default function ExperienceForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Data>({ ...empty, ...initial });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setData({ ...data, [name]: (e.target as HTMLInputElement).checked });
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

    const endpoint =
      mode === "create"
        ? "/api/admin/experiences"
        : `/api/admin/experiences/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError("Erreur lors de l'enregistrement.");
      setLoading(false);
      return;
    }

    router.push("/admin/experiences");
    router.refresh();
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";
  const labelClass = "block text-sm font-medium text-neutral-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          Informations
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Entreprise *</label>
            <input
              name="company"
              value={data.company}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Poste *</label>
            <input
              name="position"
              value={data.position}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Lieu</label>
            <input
              name="location"
              value={data.location}
              onChange={handleChange}
              className={inputClass}
            />
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
          <div>
            <label className={labelClass}>Date de début *</label>
            <input
              type="date"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Date de fin</label>
            <input
              type="date"
              name="endDate"
              value={data.endDate}
              onChange={handleChange}
              disabled={data.current}
              className={`${inputClass} disabled:bg-neutral-100 disabled:text-neutral-400`}
            />
            <label className="mt-2 flex items-center gap-2 text-xs text-neutral-600">
              <input
                type="checkbox"
                name="current"
                checked={data.current}
                onChange={handleChange}
              />
              Poste actuel
            </label>
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="mt-5">
          <label className={labelClass}>
            Missions (séparées par des <code className="font-mono">|</code>)
          </label>
          <textarea
            name="missions"
            value={data.missions}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            placeholder="Mission 1|Mission 2|Mission 3"
          />
        </div>

        <div className="mt-5">
          <label className={labelClass}>
            Technologies (séparées par des <code className="font-mono">,</code>)
          </label>
          <input
            name="technologies"
            value={data.technologies}
            onChange={handleChange}
            className={inputClass}
            placeholder="AWS, Terraform, Docker"
          />
        </div>

        <label className="mt-5 flex items-center gap-2 text-sm text-neutral-900">
          <input
            type="checkbox"
            name="published"
            checked={data.published}
            onChange={handleChange}
          />
          Publié
        </label>
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
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {loading ? "Enregistrement..." : mode === "create" ? "Créer" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/experiences")}
          className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}