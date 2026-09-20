import { notFound } from "next/navigation";
import AdminHeader from "../../_components/AdminHeader";
import ExperienceForm from "@/components/admin/ExperienceForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = await prisma.experience.findUnique({ where: { id } });
  if (!exp) notFound();

  const initial = {
    id: exp.id,
    company: exp.company,
    position: exp.position,
    location: exp.location ?? "",
    startDate: new Date(exp.startDate).toISOString().slice(0, 10),
    endDate: exp.endDate ? new Date(exp.endDate).toISOString().slice(0, 10) : "",
    current: exp.current,
    description: exp.description ?? "",
    missions: exp.missions ?? "",
    technologies: exp.technologies ?? "",
    order: exp.order,
    published: exp.published,
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">
            Modifier l'expérience
          </h1>
          <DeleteButton
            endpoint={`/api/admin/experiences/${exp.id}`}
            label="Supprimer"
            redirectTo="/admin/experiences"
          />
        </div>
        <ExperienceForm initial={initial} mode="edit" />
      </div>
    </main>
  );
}