// Import du type Metadata fourni par Next.js
// Il permet de typer l'objet metadata utilisé pour le SEO
import type { Metadata } from "next";

// Import des polices Google via le système optimisé de Next.js
// Poppins   → titres (look moderne, rond, professionnel)
// Inter     → texte courant (très lisible à l'écran)
// JetBrains → code (police monospace conçue pour les développeurs)
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";

// Import du fichier de styles global (Tailwind + variables CSS)
import "./globals.css";

// ------------------------------------------------------------------
// Configuration des polices
// Chaque police expose une variable CSS (--font-xxx) qu'on réutilise
// dans globals.css via Tailwind.
// ------------------------------------------------------------------

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap", // affiche une police de secours pendant le chargement
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// ------------------------------------------------------------------
// Métadonnées SEO globales du site
// Ces valeurs seront utilisées par défaut sur toutes les pages.
// Chaque page pourra les surcharger plus tard.
// ------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://samirung.vercel.app"
  ),
  title: {
    default: "Sam Irung — Cloud Engineer • DevOps • Infrastructure as Code",
    template: "%s | Sam Irung",
  },
  description:
    "Portfolio professionnel de Sam Irung — Cloud Engineer, DevOps et Infrastructure as Code. Projets, expériences, certifications et travaux techniques.",
  keywords: [
    "Sam Irung",
    "Cloud Engineer",
    "DevOps",
    "Infrastructure as Code",
    "Terraform",
    "Kubernetes",
    "Docker",
    "AWS",
    "Cybersécurité",
    "DevSecOps",
    "Portfolio",
  ],
  authors: [{ name: "Sam Irung", url: "https://github.com/sam-irung" }],
  creator: "Sam Irung",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Sam Irung",
    title: "Sam Irung — Cloud Engineer • DevOps • Infrastructure as Code",
    description:
      "Portfolio professionnel de Sam Irung — Cloud Engineer, DevOps et Infrastructure as Code.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Irung — Cloud Engineer • DevOps • Infrastructure as Code",
    description:
      "Portfolio professionnel de Sam Irung — Cloud Engineer, DevOps et Infrastructure as Code.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ------------------------------------------------------------------
// Layout racine de l'application
// Ce composant enveloppe TOUTES les pages du site.
// Il est rendu une seule fois côté serveur.
// ------------------------------------------------------------------

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr" // langue principale : français
      data-scroll-behavior="smooth"
      className={`
        ${poppins.variable}
        ${inter.variable}
        ${jetbrainsMono.variable}
        h-full antialiased
      `}
      suppressHydrationWarning // évite un warning bénin causé par certaines extensions navigateur
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sam Irung",
              url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://samirung.vercel.app",
              jobTitle: "Cloud Engineer",
              knowsAbout: [
                "Cloud Computing",
                "DevOps",
                "Infrastructure as Code",
                "Terraform",
                "Kubernetes",
                "AWS",
                "Cybersecurity",
              ],
              sameAs: [
                "https://github.com/sam-irung",
                "https://linkedin.com/in/samirung-4a113334",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}