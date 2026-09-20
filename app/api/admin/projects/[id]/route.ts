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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { technologies: { include: { technology: true } } },
  });

  if (!project) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const techNames: string[] = body.technologies ?? [];

  // Résoudre les IDs de technologies
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

  // Supprimer les anciennes liaisons
  await prisma.projectTechnology.deleteMany({ where: { projectId: id } });

  const project = await prisma.project.update({
    where: { id },
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
      status: body.status,
      featured: body.featured,
      published: body.published,
      order: body.order,
      technologies: {
        create: technologyIds.map((tid) => ({ technologyId: tid })),
      },
    },
    include: { technologies: { include: { technology: true } } },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}