import { notFound } from "next/navigation";
import AdminHeader from "../../_components/AdminHeader";
import LabForm from "@/components/admin/LabForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditLabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lab = await prisma.lab.findUnique({ where: { id } });
  if (!lab) notFound();

  const initial = {
    id: lab.id, title: lab.title, slug: lab.slug, summary: lab.summary,
    objective: lab.objective ?? "", environment: lab.environment ?? "",
    architecture: lab.architecture ?? "", manipulations: lab.manipulations ?? "",
    result: lab.result ?? "", learning: lab.learning ?? "",
    codeUrl: lab.codeUrl ?? "", documentationUrl: lab.documentationUrl ?? "",
    imageUrl: lab.imageUrl ?? "", status: lab.status,
    featured: lab.featured, order: lab.order,
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">Modifier le lab</h1>
          <DeleteButton endpoint={`/api/admin/labs/${lab.id}`} label="Supprimer" redirectTo="/admin/labs" />
        </div>
        <LabForm initial={initial} mode="edit" />
      </div>
    </main>
  );
}