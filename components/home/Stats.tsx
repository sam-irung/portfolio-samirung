import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: "3+", label: "Années d'expérience", icon: "🎓" },
  { value: "10+", label: "Projets réalisés", icon: "📄" },
  { value: "5+", label: "Certifications", icon: "🏆" },
  { value: "4+", label: "Publications", icon: "📖" },
];

export default function Stats() {
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