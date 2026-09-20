import { prisma } from "../prisma";

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: {
      technologies: {
        include: { technology: true },
      },
    },
  });
}

export async function getFeaturedProjects(limit = 3) {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { order: "asc" },
    take: limit,
    include: {
      technologies: {
        include: { technology: true },
      },
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, published: true },
    include: {
      technologies: {
        include: { technology: true },
      },
    },
  });
}