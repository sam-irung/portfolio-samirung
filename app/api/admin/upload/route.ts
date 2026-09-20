import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_TYPES = {
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  images: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ],
};

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const bucket = (formData.get("bucket") as string) || "documents";

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  }

  if (!["documents", "images"].includes(bucket)) {
    return NextResponse.json({ error: "Bucket invalide" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 50 MB)" }, { status: 400 });
  }

  const allowed = ALLOWED_TYPES[bucket as keyof typeof ALLOWED_TYPES];
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { error: `Type de fichier non autorisé. Types acceptés : ${allowed.join(", ")}` },
      { status: 400 }
    );
  }

  // Nom unique : timestamp + nom sécurisé
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-");

  const fileName = `${Date.now()}-${safeName}`;
  const path = `${bucket}/${fileName}`;

  const supabase = await createClient();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return NextResponse.json({
    url: publicUrl.publicUrl,
    path,
    name: file.name,
    size: file.size,
    type: file.type,
  });
}