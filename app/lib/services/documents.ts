import { prisma } from "../prisma";

export async function getDocuments() {
  return prisma.document.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }],
  });
}