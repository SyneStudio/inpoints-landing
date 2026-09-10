import { NextResponse } from "next/server";
import { demoRequestSchema } from "@/lib/validation";
import { getServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Formulaire invalide.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { company, ...data } = parsed.data;
  // Honeypot triggered — pretend success, store nothing.
  if (company) return NextResponse.json({ ok: true });

  const supabase = getServiceClient();
  if (supabase) {
    const { error } = await supabase.from("demo_requests").insert({
      name: data.name,
      email: data.email,
      federation: data.federation,
      role: data.role || null,
      message: data.message || null,
      // La table est partagée avec le site InSports : sans cette colonne, une
      // demande venue d'ici serait indiscernable d'une demande fédérale.
      product: "inpoints",
    });
    if (error) {
      console.error("[demo] insert failed:", error.message);
      return NextResponse.json(
        { error: "Impossible d'enregistrer votre demande pour le moment." },
        { status: 500 },
      );
    }
  } else {
    // No DB configured (e.g. local preview) — log so the flow is still testable.
    console.info("[demo] request received (no Supabase configured):", data.email);
  }

  return NextResponse.json({ ok: true });
}
