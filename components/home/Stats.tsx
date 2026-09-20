import Reveal from "@/components/ui/Reveal";
import { prisma } from "@/app/lib/prisma";

export default async function Stats() {
  const [
    projectsCount,
    certificationsCount,
    publicationsCount,
    experiencesCount,
  ] = await Promise.all([
    prisma.project.count({ where: { published: true } }),
    prisma.certification.count({ where: { published: true } }),
    prisma.publication.count({ where: { status: "PUBLISHED" } }),
    prisma.experience.count({ where: { published: true } }),
  ]);

  const stats = [
    { value: `${experiencesCount}`, label: "Expériences", icon: "🎓" },
    { value: `${projectsCount}`, label: "Projets réalisés", icon: "📄" },
    { value: `${certificationsCount}`, label: "Certifications", icon: "🏆" },
    { value: `${publicationsCount}`, label: "Publications", icon: "📖" },
  ];

  return (
    <section className="border-y border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:gap-8 md:py-12">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="flex items-center gap-4 md:justify-center">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl">
                {stat.icon}
              </span>
              <div>
                <p className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-neutral-600 md:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}