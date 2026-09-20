"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  endpoint: string;
  label?: string;
  redirectTo?: string;
};

export default function DeleteButton({
  endpoint,
  label = "Supprimer",
  redirectTo,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Confirmer la suppression ? Cette action est irréversible.")) {
      return;
    }
    setLoading(true);

    const res = await fetch(endpoint, { method: "DELETE" });
    if (res.ok) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } else {
      alert("Erreur lors de la suppression.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex h-9 items-center rounded-full border border-rose-200 bg-rose-50 px-4 text-xs font-medium text-rose-700 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "..." : label}
    </button>
  );
}