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

export async function GET() {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const items = await prisma.lab.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const body = await request.json();
  const lab = await prisma.lab.create({
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
      status: body.status ?? "DRAFT",
      featured: body.featured ?? false,
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(lab, { status: 201 });
}