import Link from "next/link";

const currentYear = new Date().getFullYear();

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/a-propos" },
      { label: "Compétences", href: "/competences" },
      { label: "Projets", href: "/projets" },
    ],
  },
  {
    title: "Parcours",
    links: [
      { label: "Expérience", href: "/experience" },
      { label: "Certifications", href: "/certifications" },
      { label: "Publications", href: "/publications" },
      { label: "Documents", href: "/documents" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Me contacter", href: "/contact" },
      { label: "GitHub", href: "https://github.com/sam-irung" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/sam-irung-44a113334/" },
    ],
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/sam-irung" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sam-irung-44a113334/" },
  { label: "Email", href: "mailto:samirung65@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Identité */}
          <div>
            <Link
              href="/"
              className="font-heading text-lg font-bold tracking-tight text-neutral-900"
            >
              Sam<span className="text-primary-600">.</span>Irung
            </Link>
            <p className="mt-3 max-w-xs text-sm text-neutral-600">
              Cloud Engineer • DevOps • Infrastructure as Code.
              <br />
              Je conçois et automatise des infrastructures modernes,
              reproductibles et sécurisées.
            </p>
          </div>

          {/* Colonnes de liens */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-neutral-900">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bas de footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 md:flex-row">
          <p className="text-xs text-neutral-500">
            © {currentYear} Sam Irung. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-neutral-600 transition-colors hover:text-primary-600"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}