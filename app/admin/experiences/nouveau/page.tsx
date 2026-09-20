import AdminHeader from "../../_components/AdminHeader";
import ExperienceForm from "@/components/admin/ExperienceForm";

export const dynamic = "force-dynamic";

export default function NewExperiencePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-8 font-heading text-3xl font-bold text-neutral-900">
          Nouvelle expérience
        </h1>
        <ExperienceForm mode="create" />
      </div>
    </main>
  );
}