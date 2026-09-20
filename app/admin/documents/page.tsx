import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDocsPage() {
  const items = await prisma.document.findMany({ orderBy: { order: "asc" } });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">Documents</h1>
            <p className="mt-1 text-sm text-neutral-600">{items.length} document(s)</p>
          </div>
          <Link href="/admin/documents/nouveau" className="inline-flex h-10 items-center rounded-full bg-primary-600 px-5 text-sm font-medium text-white hover:bg-primary-700">
            + Nouveau document
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((doc) => (
            <div key={doc.id} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-heading text-lg font-semibold text-neutral-900">{doc.title}</h2>
                <p className="mt-1 text-sm text-neutral-600">{doc.category}</p>
                <p className="mt-1 font-mono text-xs text-neutral-500">{doc.fileUrl}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/documents/${doc.id}`} className="inline-flex h-9 items-center rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium hover:bg-neutral-50">
                  Modifier
                </Link>
                <DeleteButton endpoint={`/api/admin/documents/${doc.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}