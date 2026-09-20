import type { MetadataRoute } from "next";
import { prisma } from "@/app/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samirung.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, labs] = await Promise.all([
    prisma.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.lab.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/competences`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projets`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/certifications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/publications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/labs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/documents`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projets/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const labPages: MetadataRoute.Sitemap = labs.map((l) => ({
    url: `${BASE_URL}/labs/${l.slug}`,
    lastModified: l.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...labPages];
}