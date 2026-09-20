import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/admin"
          className="font-heading text-lg font-bold tracking-tight text-neutral-900"
        >
          Admin<span className="text-primary-600">.</span>Panel
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/admin/projets"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Projets
          </Link>
          <Link
            href="/admin/competences"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Compétences
          </Link>
          <Link
            href="/admin/experiences"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Expériences
          </Link>
          <Link
            href="/admin/certifications"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Certifications
          </Link>
          <Link
            href="/admin/publications"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Publications
          </Link>
          <Link
            href="/admin/labs"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Labs
          </Link>
          <Link
            href="/admin/documents"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Documents
          </Link>
          <Link
            href="/admin/messages"
            className="font-medium text-neutral-600 hover:text-primary-600"
          >
            Messages
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-sm font-medium text-neutral-600 hover:text-primary-600"
          >
            Voir le site ↗
          </Link>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="text-sm font-medium text-rose-600 hover:text-rose-700"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}