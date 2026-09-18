import Reveal from "@/components/ui/Reveal";

const categories = [
  { title: "Cloud", icon: "☁", skills: ["AWS", "Cloud Architecture", "IAM", "Compute", "Storage", "Networking"] },
  { title: "DevOps", icon: "⚙", skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Linux"] },
  { title: "Infrastructure as Code", icon: "</>", skills: ["Terraform", "Git", "Ansible", "Modules", "State Management"] },
  { title: "Réseaux", icon: "◈", skills: ["TCP/IP", "VLAN", "Routing", "Switching", "GNS3"] },
  { title: "Sécurité", icon: "🛡", skills: ["Security Fundamentals", "DevSecOps", "IaC Security", "Terraform Scanning"] },
  { title: "Programmation", icon: "{ }", skills: ["Python", "TypeScript", "Bash", "JavaScript"] },
];

export default function SkillsPreview() {
  return (
    <section id="competences" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-700">
              Compétences
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
              Mes compétences techniques
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              Un ensemble de technologies que j'utilise pour concevoir,
              automatiser et sécuriser des infrastructures modernes.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 font-mono text-lg text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    {cat.icon}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-neutral-900">
                    {cat.title}
                  </h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}