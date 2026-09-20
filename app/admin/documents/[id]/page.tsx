import { notFound } from "next/navigation";
import AdminHeader from "../../_components/AdminHeader";
import DocumentForm from "@/components/admin/DocumentForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditDocPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) notFound();

  const initial = {
    id: doc.id, title: doc.title, description: doc.description ?? "",
    category: doc.category ?? "", fileUrl: doc.fileUrl,
    fileType: doc.fileType ?? "PDF", fileSize: doc.fileSize?.toString() ?? "",
    order: doc.order, published: doc.published,
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">Modifier le document</h1>
          <DeleteButton endpoint={`/api/admin/documents/${doc.id}`} label="Supprimer" redirectTo="/admin/documents" />
        </div>
        <DocumentForm initial={initial} mode="edit" />
      </div>
    </main>
  );
}