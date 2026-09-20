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
  const items = await prisma.skill.findMany({
    orderBy: [{ categoryId: "asc" }, { order: "asc" }],
    include: { category: true },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const body = await request.json();
  const skill = await prisma.skill.create({
    data: {
      name: body.name,
      description: body.description || null,
      level: body.level || null,
      icon: body.icon || null,
      order: body.order ?? 0,
      published: body.published ?? true,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json(skill, { status: 201 });
}