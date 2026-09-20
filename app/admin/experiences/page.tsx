import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminExperiencesPage() {
  const items = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">
              Expériences
            </h1>
            <p className="mt-1 text-sm text-neutral-600">{items.length} entrée(s)</p>
          </div>
          <Link
            href="/admin/experiences/nouveau"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-medium text-white hover:bg-primary-700"
          >
            + Nouvelle expérience
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-lg font-semibold text-neutral-900">
                    {exp.position}
                  </h2>
                  {exp.published ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Publié</span>
                  ) : (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">Brouillon</span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-primary-600">{exp.company}</p>
                <p className="mt-1 font-mono text-xs text-neutral-500">
                  {new Date(exp.startDate).toISOString().slice(0, 10)}
                  {exp.endDate ? ` → ${new Date(exp.endDate).toISOString().slice(0, 10)}` : " → présent"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/experiences/${exp.id}`}
                  className="inline-flex h-9 items-center rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium text-neutral-900 hover:bg-neutral-50"
                >
                  Modifier
                </Link>
                <DeleteButton endpoint={`/api/admin/experiences/${exp.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}