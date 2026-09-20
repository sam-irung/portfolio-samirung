import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const lab = await prisma.lab.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug || slugify(body.title),
      summary: body.summary,
      objective: body.objective || null,
      environment: body.environment || null,
      architecture: body.architecture || null,
      manipulations: body.manipulations || null,
      result: body.result || null,
      learning: body.learning || null,
      codeUrl: body.codeUrl || null,
      documentationUrl: body.documentationUrl || null,
      imageUrl: body.imageUrl || null,
      status: body.status,
      featured: body.featured,
      order: body.order,
    },
  });
  return NextResponse.json(lab);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.lab.delete({ where: { id } });
  return NextResponse.json({ success: true });
}