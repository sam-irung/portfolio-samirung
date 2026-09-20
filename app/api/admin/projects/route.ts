import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return user;
}

export async function GET() {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: {
      technologies: { include: { technology: true } },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json();

  const techNames: string[] = body.technologies ?? [];

  // 1. Créer ou récupérer les technologies
  const technologyIds: string[] = [];
  for (const name of techNames) {
    const trimmed = name.trim();
    if (!trimmed) continue;
    const tech = await prisma.technology.upsert({
      where: { name: trimmed },
      update: {},
      create: { name: trimmed, slug: slugify(trimmed) },
    });
    technologyIds.push(tech.id);
  }

  // 2. Créer le projet
  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug || slugify(body.title),
      shortSummary: body.shortSummary,
      description: body.description || null,
      context: body.context || null,
      objectives: body.objectives || null,
      architecture: body.architecture || null,
      methodology: body.methodology || null,
      implementation: body.implementation || null,
      results: body.results || null,
      difficulties: body.difficulties || null,
      solutions: body.solutions || null,
      imageUrl: body.imageUrl || null,
      githubUrl: body.githubUrl || null,
      demoUrl: body.demoUrl || null,
      documentationUrl: body.documentationUrl || null,
      status: body.status ?? "DEVELOPMENT",
      featured: body.featured ?? false,
      published: body.published ?? false,
      order: body.order ?? 0,
      technologies: {
        create: technologyIds.map((id) => ({ technologyId: id })),
      },
    },
    include: {
      technologies: { include: { technology: true } },
    },
  });

  return NextResponse.json(project, { status: 201 });
}