import { prisma } from "../prisma";

export async function getExperiences() {
  return prisma.experience.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });
}