import { NextResponse } from "next/server";
import { ACCESS_COOKIE, ACCESS_COOKIE_OPTIONS, issueAccessToken } from "@/lib/access";
import { saveLead } from "@/lib/leads";

/**
 * Validate and persist the enquiry before issuing floor-plan access.
 * The optional CRM webhook runs only after a confirmed database save.
 */

export const runtime = "nodejs";

const WEBHOOK_TIMEOUT_MS = 8_000;

type Lead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isRealtor: string;
  budget: string;
  timeline: string;
  receivedAt: string;
  source: string;
};

async function forward(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.warn("[lead] LEAD_WEBHOOK_URL is not set — lead logged only, not delivered");
    console.log("[lead]", lead);
    return;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!res.ok) {
      // Log the lead alongside the failure so it is recoverable from the logs.
      console.error("[lead] webhook rejected", res.status, lead);
    }
  } catch (err) {
    console.error("[lead] webhook failed", err, lead);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, isRealtor, budget, timeline, company } =
    (body ?? {}) as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 200) : "");

  // Honeypot. `company` is hidden from humans and has no autocomplete, so only
  // a bot filling every field will populate it. Answer 200 rather than 400 —
  // a rejection tells the bot what to change, silence does not. No cookie is
  // issued and nothing is stored.
  if (str(company)) {
    console.warn("[lead] honeypot triggered, discarding submission");
    return NextResponse.json({ ok: true });
  }

  const lead: Lead = {
    firstName: str(firstName),
    lastName: str(lastName),
    email: str(email).toLowerCase(),
    phone: str(phone),
    isRealtor: str(isRealtor),
    budget: str(budget),
    timeline: str(timeline),
    receivedAt: new Date().toISOString(),
    source: req.headers.get("referer") ?? "direct",
  };

  if (!lead.firstName || !lead.lastName || !lead.email || !lead.phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(lead.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (lead.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  // Supabase is the system of record; the webhook is an optional extra hop for
  // a CRM. Both are awaited so a cold serverless instance is not frozen before
  // the writes finish, and both fail soft.
  const stored = await saveLead({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    isRealtor: lead.isRealtor,
    budget: lead.budget,
    timeline: lead.timeline,
    referer: lead.source,
    userAgent: req.headers.get("user-agent") ?? "",
    // Vercel and Cloudflare both put the client IP here; it is hashed, not stored raw.
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
  });

  if (!stored) {
    return NextResponse.json({ error: "Your request could not be saved. Please try again shortly." }, { status: 503 });
  }

  await forward(lead);

  // Unlock floor plans only after the enquiry has been saved.
  const res = NextResponse.json({ ok: true, unlocked: true });
  res.cookies.set(ACCESS_COOKIE, issueAccessToken(), ACCESS_COOKIE_OPTIONS);
  return res;
}
