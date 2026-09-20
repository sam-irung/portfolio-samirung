import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: ["contact.email", "contact.linkedin", "contact.github", "site.title"],
      },
    },
  });

  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return NextResponse.json({
    email: map["contact.email"] ?? null,
    linkedin: map["contact.linkedin"] ?? null,
    github: map["contact.github"] ?? null,
    siteTitle: map["site.title"] ?? null,
  });
}