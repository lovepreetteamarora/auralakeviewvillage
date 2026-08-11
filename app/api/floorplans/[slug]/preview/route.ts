import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/access";
import { getFloorPlan, previewFile } from "@/lib/floorplans";

/**
 * Full-resolution floor plan sheet as an image, for registered visitors.
 *
 * The public teaser in /public is deliberately too small to read. Once the
 * gate is passed the card swaps to this, so a visitor can study the plan in
 * place without downloading seven PDFs to find the one they want.
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
      path.join(process.cwd(), "assets", "floorplans", previewFile(plan.slug)),
    );
  } catch {
    console.error("[floorplans] missing preview on disk:", plan.slug);
    return NextResponse.json({ error: "Preview unavailable" }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(file.byteLength),
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
