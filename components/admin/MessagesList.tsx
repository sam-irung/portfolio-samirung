"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  content: string;
  status: "UNREAD" | "READ" | "ARCHIVED";
  createdAt: string | Date;
};

const statusStyles: Record<string, string> = {
  UNREAD: "bg-primary-100 text-primary-700",
  READ: "bg-neutral-100 text-neutral-600",
  ARCHIVED: "bg-neutral-200 text-neutral-500",
};

const statusLabels: Record<string, string> = {
  UNREAD: "Non lu",
  READ: "Lu",
  ARCHIVED: "Archivé",
};

export default function MessagesList({ initialMessages }: { initialMessages: Message[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<Message | null>(null);

  const updateStatus = async (id: string, status: Message["status"]) => {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
      if (selected?.id === id) setSelected({ ...selected, status });
      router.refresh();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages(messages.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
      router.refresh();
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[380px_1fr]">
      {/* Liste */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucun message.</p>
        ) : (
          messages.map((msg) => (
            <button
              key={msg.id}
              type="button"
              onClick={() => {
                setSelected(msg);
                if (msg.status === "UNREAD") updateStatus(msg.id, "READ");
              }}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                selected?.id === msg.id
                  ? "border-primary-300 bg-primary-50"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-medium text-neutral-900">{msg.name}</span>
                <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[msg.status]}`}>
                  {statusLabels[msg.status]}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-neutral-500">{msg.email}</p>
              {msg.subject && (
                <p className="mt-1 truncate text-sm font-medium text-neutral-800">{msg.subject}</p>
              )}
              <p className="mt-1 text-xs text-neutral-400">
                {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit", month: "short", year: "numeric",
                })}
              </p>
            </button>
          ))
        )}
      </div>

      {/* Détail */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        {selected ? (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg font-semibold text-neutral-900">
                  {selected.subject ?? "Sans sujet"}
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  De <strong>{selected.name}</strong> · {selected.email}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  {new Date(selected.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(selected.id, "ARCHIVED")}
                  className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium hover:bg-neutral-50"
                >
                  Archiver
                </button>
                <button
                  type="button"
                  onClick={() => remove(selected.id)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                >
                  Supprimer
                </button>
              </div>
            </div>

            <div className="mt-6 whitespace-pre-line border-t border-neutral-200 pt-6 text-sm leading-relaxed text-neutral-700">
              {selected.content}
            </div>

            <div className="mt-6">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject ?? ""}`}
                className="inline-flex h-10 items-center rounded-full bg-primary-600 px-5 text-sm font-medium text-white hover:bg-primary-700"
              >
                Répondre par email
              </a>
            </div>
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            Sélectionnez un message pour le lire.
          </p>
        )}
      </div>
    </div>
  );
}