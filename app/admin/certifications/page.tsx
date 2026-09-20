import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminCertsPage() {
  const items = await prisma.certification.findMany({ orderBy: [{ order: "asc" }, { year: "desc" }] });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">Certifications</h1>
            <p className="mt-1 text-sm text-neutral-600">{items.length} certification(s)</p>
          </div>
          <Link href="/admin/certifications/nouveau" className="inline-flex h-10 items-center rounded-full bg-primary-600 px-5 text-sm font-medium text-white hover:bg-primary-700">
            + Nouvelle certification
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((cert) => (
            <div key={cert.id} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-heading text-lg font-semibold text-neutral-900">{cert.title}</h2>
                <p className="mt-1 text-sm text-primary-600">{cert.issuer} {cert.year && `· ${cert.year}`}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/certifications/${cert.id}`} className="inline-flex h-9 items-center rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium hover:bg-neutral-50">
                  Modifier
                </Link>
                <DeleteButton endpoint={`/api/admin/certifications/${cert.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}