import { notFound } from "next/navigation";
import AdminHeader from "../../_components/AdminHeader";
import PublicationForm from "@/components/admin/PublicationForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditPubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pub = await prisma.publication.findUnique({ where: { id } });
  if (!pub) notFound();

  const initial = {
    id: pub.id, title: pub.title, slug: pub.slug, authors: pub.authors ?? "",
    abstract: pub.abstract ?? "", type: pub.type ?? "Article",
    journal: pub.journal ?? "", conference: pub.conference ?? "",
    year: pub.year?.toString() ?? "", doi: pub.doi ?? "",
    externalUrl: pub.externalUrl ?? "", pdfUrl: pub.pdfUrl ?? "",
    status: pub.status, featured: pub.featured, order: pub.order,
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">Modifier la publication</h1>
          <DeleteButton endpoint={`/api/admin/publications/${pub.id}`} label="Supprimer" redirectTo="/admin/publications" />
        </div>
        <PublicationForm initial={initial} mode="edit" />
      </div>
    </main>
  );
}