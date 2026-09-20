import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { technologies: { include: { technology: true } } },
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">
              Projets
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              {projects.length} projet{projects.length > 1 ? "s" : ""}
            </p>
          </div>

          <Link
            href="/admin/projets/nouveau"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            + Nouveau projet
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-sm text-neutral-500">
              Aucun projet. Créez-en un nouveau.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-heading text-lg font-semibold text-neutral-900">
                      {project.title}
                    </h2>
                    {project.featured && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        En vedette
                      </span>
                    )}
                    {project.published ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        Publié
                      </span>
                    ) : (
                      <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                        Brouillon
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-2xl truncate text-sm text-neutral-600">
                    {project.shortSummary}
                  </p>
                  <p className="mt-1 font-mono text-xs text-neutral-400">
                    /{project.slug} · ordre {project.order}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/projets/${project.id}`}
                    className="inline-flex h-9 items-center rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium text-neutral-900 hover:bg-neutral-50"
                  >
                    Modifier
                  </Link>
                  <DeleteButton
                    endpoint={`/api/admin/projects/${project.id}`}
                    label="Supprimer"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}