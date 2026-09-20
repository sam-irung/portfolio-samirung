import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const cert = await prisma.certification.update({
    where: { id },
    data: {
      title: body.title,
      issuer: body.issuer,
      year: body.year ? Number(body.year) : null,
      description: body.description || null,
      certificateUrl: body.certificateUrl || null,
      verificationUrl: body.verificationUrl || null,
      imageUrl: body.imageUrl || null,
      order: body.order,
      published: body.published,
    },
  });
  return NextResponse.json(cert);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.certification.delete({ where: { id } });
  return NextResponse.json({ success: true });
}