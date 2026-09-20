import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function GET() {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const items = await prisma.document.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const body = await request.json();
  const doc = await prisma.document.create({
    data: {
      title: body.title,
      description: body.description || null,
      category: body.category || null,
      fileUrl: body.fileUrl,
      fileType: body.fileType || null,
      fileSize: body.fileSize ? Number(body.fileSize) : null,
      order: body.order ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(doc, { status: 201 });
}