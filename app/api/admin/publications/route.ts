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
  const items = await prisma.publication.findMany({ orderBy: [{ order: "asc" }, { year: "desc" }] });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const body = await request.json();
  const pub = await prisma.publication.create({
    data: {
      title: body.title,
      slug: body.slug || slugify(body.title),
      authors: body.authors || null,
      abstract: body.abstract || null,
      type: body.type || null,
      journal: body.journal || null,
      conference: body.conference || null,
      year: body.year ? Number(body.year) : null,
      doi: body.doi || null,
      externalUrl: body.externalUrl || null,
      pdfUrl: body.pdfUrl || null,
      status: body.status ?? "DRAFT",
      featured: body.featured ?? false,
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(pub, { status: 201 });
}