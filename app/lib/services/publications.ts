import { prisma } from "../prisma";

export async function getPublications() {
  return prisma.publication.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ order: "asc" }, { year: "desc" }],
  });
}

export async function getFeaturedPublications(limit = 3) {
  return prisma.publication.findMany({
    where: { status: "PUBLISHED", featured: true },
    orderBy: { order: "asc" },
    take: limit,
  });
}