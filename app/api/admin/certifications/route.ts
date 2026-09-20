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
  const items = await prisma.certification.findMany({ orderBy: [{ order: "asc" }, { year: "desc" }] });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const body = await request.json();
  const cert = await prisma.certification.create({
    data: {
      title: body.title,
      issuer: body.issuer,
      year: body.year ? Number(body.year) : null,
      description: body.description || null,
      certificateUrl: body.certificateUrl || null,
      verificationUrl: body.verificationUrl || null,
      imageUrl: body.imageUrl || null,
      order: body.order ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(cert, { status: 201 });
}