import Link from "next/link";
import { redirect } from "next/navigation";
import AdminHeader from "./_components/AdminHeader";
import { createClient } from "@/app/lib/supabase/server";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [
    projectsCount,
    skillsCount,
    experiencesCount,
    certificationsCount,
    publicationsCount,
    labsCount,
    documentsCount,
    messagesCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.certification.count(),
    prisma.publication.count(),
    prisma.lab.count(),
    prisma.document.count(),
    prisma.message.count(),
  ]);

  const sections = [
    { label: "Projets", count: projectsCount, href: "/admin/projets", icon: "📄" },
    { label: "Compétences", count: skillsCount, href: "/admin/competences", icon: "🎯" },
    { label: "Expériences", count: experiencesCount, href: "/admin/experiences", icon: "💼" },
    { label: "Certifications", count: certificationsCount, href: "/admin/certifications", icon: "🏆" },
    { label: "Publications", count: publicationsCount, href: "/admin/publications", icon: "📚" },
    { label: "Labs", count: labsCount, href: "/admin/labs", icon: "🧪" },
    { label: "Documents", count: documentsCount, href: "/admin/documents", icon: "📁" },
    { label: "Messages", count: messagesCount, href: "/admin/messages", icon: "✉️" },
  ];

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">
            Tableau de bord
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Connecté en tant que <strong>{user.email}</strong>
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-xl">
                  {section.icon}
                </span>
                <span className="font-heading text-2xl font-bold text-neutral-900">
                  {section.count}
                </span>
              </div>
              <p className="mt-4 font-heading text-sm font-semibold text-neutral-900">
                {section.label}
              </p>
              <p className="mt-1 text-xs text-neutral-500 group-hover:text-primary-600">
                Gérer →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}