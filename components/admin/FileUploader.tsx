"use client";

import { useState } from "react";

type Props = {
  value: string;
  onChange: (url: string, meta?: { name: string; size: number; type: string }) => void;
  bucket: "documents" | "images";
  accept?: string;
  label?: string;
};

export default function FileUploader({
  value,
  onChange,
  bucket,
  accept,
  label = "Fichier",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Erreur lors de l'upload.");
      setUploading(false);
      return;
    }

    const data = await res.json();
    onChange(data.url, { name: data.name, size: data.size, type: data.type });
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-900">
        {label}
      </label>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50">
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            disabled={uploading}
          />
          {uploading ? "Upload en cours..." : "Choisir un fichier"}
        </label>

        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm text-primary-600 hover:text-primary-700"
          >
            {value.split("/").pop()}
          </a>
        )}
      </div>

      {/* Permet aussi la saisie manuelle d'une URL */}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ou collez une URL manuellement"
        className="mt-3 w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
      />

      {error && (
        <p className="mt-2 text-sm text-rose-600">{error}</p>
      )}
    </div>
  );
}