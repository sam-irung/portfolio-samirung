import { prisma } from "../prisma";

export async function getSkillCategories() {
  return prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      skills: {
        where: { published: true },
        orderBy: { order: "asc" },
      },
    },
  });
}