import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPubsPage() {
  const items = await prisma.publication.findMany({ orderBy: [{ order: "asc" }, { year: "desc" }] });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">Publications</h1>
            <p className="mt-1 text-sm text-neutral-600">{items.length} publication(s)</p>
          </div>
          <Link href="/admin/publications/nouveau" className="inline-flex h-10 items-center rounded-full bg-primary-600 px-5 text-sm font-medium text-white hover:bg-primary-700">
            + Nouvelle publication
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((pub) => (
            <div key={pub.id} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {pub.type && <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">{pub.type}</span>}
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${pub.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-600"}`}>
                    {pub.status === "PUBLISHED" ? "Publié" : "Brouillon"}
                  </span>
                </div>
                <h2 className="mt-2 font-heading text-base font-semibold text-neutral-900">{pub.title}</h2>
                <p className="mt-1 font-mono text-xs text-neutral-500">{pub.year}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/publications/${pub.id}`} className="inline-flex h-9 items-center rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium hover:bg-neutral-50">
                  Modifier
                </Link>
                <DeleteButton endpoint={`/api/admin/publications/${pub.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}