import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/access";
import { getFloorPlan } from "@/lib/floorplans";

/**
 * Gated floor plan download.
 *
 * The PDFs live in /assets, outside /public, so this route is the only way to
 * reach them — a visitor cannot guess a static URL and skip the form. The file
 * name comes from the catalogue rather than from the URL, so a crafted slug
 * cannot traverse out of the directory.
 */

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const plan = getFloorPlan(slug);
  if (!plan) {
    return NextResponse.json({ error: "Unknown floor plan" }, { status: 404 });
  }

  const jar = await cookies();
  if (!verifyAccessToken(jar.get(ACCESS_COOKIE)?.value)) {
    return NextResponse.json(
      { error: "Register to unlock the floor plans." },
      { status: 401 },
    );
  }

  let file: Buffer;
  try {
    file = await readFile(
      path.join(process.cwd(), "assets", "floorplans", plan.file),
    );
  } catch {
    console.error("[floorplans] missing file on disk:", plan.file);
    return NextResponse.json({ error: "Floor plan unavailable" }, { status: 500 });
  }

  const filename = `Aura-${plan.name.replace(/\s+/g, "-")}-${plan.residence.replace(/\s+/g, "-")}.pdf`;

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Content-Length": String(file.byteLength),
      // Gated content must never land in a shared cache.
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
