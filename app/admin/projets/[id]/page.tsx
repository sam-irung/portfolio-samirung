import { notFound } from "next/navigation";
import AdminHeader from "../../_components/AdminHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { technologies: { include: { technology: true } } },
  });

  if (!project) {
    notFound();
  }

  const initial = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    shortSummary: project.shortSummary,
    description: project.description ?? "",
    context: project.context ?? "",
    objectives: project.objectives ?? "",
    architecture: project.architecture ?? "",
    methodology: project.methodology ?? "",
    implementation: project.implementation ?? "",
    results: project.results ?? "",
    difficulties: project.difficulties ?? "",
    solutions: project.solutions ?? "",
    imageUrl: project.imageUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    demoUrl: project.demoUrl ?? "",
    documentationUrl: project.documentationUrl ?? "",
    status: project.status,
    featured: project.featured,
    published: project.published,
    order: project.order,
    technologies: project.technologies.map((t) => t.technology.name),
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">
              Modifier le projet
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              /{project.slug}
            </p>
          </div>

          <DeleteButton
            endpoint={`/api/admin/projects/${project.id}`}
            label="Supprimer le projet"
            redirectTo="/admin/projets"
          />
        </div>

        <ProjectForm initial={initial} mode="edit" />
      </div>
    </main>
  );
}