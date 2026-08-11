import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/access";

/**
 * Unlock status for the floor plan vault.
 *
 * The access cookie is httpOnly so the page cannot read it directly. The vault
 * asks here on mount instead, which keeps the homepage itself static — reading
 * cookies during render would force the whole page to be server-rendered on
 * every request.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const jar = await cookies();
  const unlocked = verifyAccessToken(jar.get(ACCESS_COOKIE)?.value);

  return NextResponse.json({ unlocked }, { headers: { "Cache-Control": "no-store" } });
}
