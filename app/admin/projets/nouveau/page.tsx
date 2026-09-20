import AdminHeader from "../../_components/AdminHeader";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-8 font-heading text-3xl font-bold text-neutral-900">
          Nouveau projet
        </h1>
        <ProjectForm mode="create" />
      </div>
    </main>
  );
}