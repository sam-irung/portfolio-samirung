import AdminHeader from "../_components/AdminHeader";
import SkillsManager from "@/components/admin/SkillsManager";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-8 font-heading text-3xl font-bold text-neutral-900">
          Compétences
        </h1>
        <SkillsManager initialCategories={categories} />
      </div>
    </main>
  );
}