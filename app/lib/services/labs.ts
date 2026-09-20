import { prisma } from "../prisma";

export async function getLabs() {
  return prisma.lab.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ order: "asc" }],
  });
}

export async function getLabBySlug(slug: string) {
  return prisma.lab.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}