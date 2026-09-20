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
  const pub = await prisma.publication.update({
    where: { id },
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
      status: body.status,
      featured: body.featured,
      order: body.order,
    },
  });
  return NextResponse.json(pub);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.publication.delete({ where: { id } });
  return NextResponse.json({ success: true });
}