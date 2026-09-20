import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères.").max(100),
  email: z.string().email("Adresse email invalide."),
  subject: z.string().min(2, "Le sujet doit contenir au moins 2 caractères.").max(200),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères.").max(5000),
});

// Simple rate limit par IP en mémoire (remis à zéro au redémarrage)
const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 heure
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || entry.reset < now) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  // 1. Stockage en base
  const stored = await prisma.message.create({
    data: {
      name,
      email,
      subject,
      content: message,
      status: "UNREAD",
    },
  });

  // 2. Envoi de l'email
  try {
    await resend.emails.send({
      from: "Portfolio Sam Irung <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Nouveau message reçu depuis votre portfolio.

De : ${name} <${email}>
Sujet : ${subject}

${message}

---
Message ID : ${stored.id}
Reçu le : ${stored.createdAt.toISOString()}
`,
    });
  } catch (err) {
    // Le message est déjà stocké, on ne bloque pas la réponse
    console.error("Erreur d'envoi Resend :", err);
  }

  return NextResponse.json({ success: true, messageId: stored.id });
}