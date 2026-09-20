import { notFound } from "next/navigation";
import AdminHeader from "../../_components/AdminHeader";
import CertificationForm from "@/components/admin/CertificationForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditCertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await prisma.certification.findUnique({ where: { id } });
  if (!cert) notFound();

  const initial = {
    id: cert.id, title: cert.title, issuer: cert.issuer,
    year: cert.year?.toString() ?? "", description: cert.description ?? "",
    certificateUrl: cert.certificateUrl ?? "", verificationUrl: cert.verificationUrl ?? "",
    imageUrl: cert.imageUrl ?? "", order: cert.order, published: cert.published,
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">Modifier la certification</h1>
          <DeleteButton endpoint={`/api/admin/certifications/${cert.id}`} label="Supprimer" redirectTo="/admin/certifications" />
        </div>
        <CertificationForm initial={initial} mode="edit" />
      </div>
    </main>
  );
}