import { prisma } from "../prisma";

export async function getCertifications() {
  return prisma.certification.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { year: "desc" }],
  });
}