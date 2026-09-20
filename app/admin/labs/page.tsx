import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminLabsPage() {
  const items = await prisma.lab.findMany({ orderBy: { order: "asc" } });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">Labs</h1>
            <p className="mt-1 text-sm text-neutral-600">{items.length} lab(s)</p>
          </div>
          <Link href="/admin/labs/nouveau" className="inline-flex h-10 items-center rounded-full bg-primary-600 px-5 text-sm font-medium text-white hover:bg-primary-700">
            + Nouveau lab
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((lab) => (
            <div key={lab.id} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-lg font-semibold text-neutral-900">{lab.title}</h2>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${lab.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-600"}`}>
                    {lab.status === "PUBLISHED" ? "Publié" : "Brouillon"}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-neutral-500">/{lab.slug}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/labs/${lab.id}`} className="inline-flex h-9 items-center rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium hover:bg-neutral-50">
                  Modifier
                </Link>
                <DeleteButton endpoint={`/api/admin/labs/${lab.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}