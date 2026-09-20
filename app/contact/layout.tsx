import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez-moi pour discuter de vos projets Cloud, DevOps, Infrastructure as Code ou cybersécurité.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}