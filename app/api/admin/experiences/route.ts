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
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const items = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await request.json();
  const item = await prisma.experience.create({
    data: {
      company: body.company,
      position: body.position,
      location: body.location || null,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      current: body.current ?? false,
      description: body.description || null,
      missions: body.missions || null,
      technologies: body.technologies || null,
      order: body.order ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(item, { status: 201 });
}