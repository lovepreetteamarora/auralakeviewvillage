import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * The floor plan gate.
 *
 * Registering issues a signed, httpOnly cookie; the download route will not
 * serve a PDF without a valid one. The token carries an expiry and is signed
 * with HMAC-SHA256, so a visitor cannot mint or extend their own access by
 * editing the cookie.
 *
 * This is a marketing gate, not a security boundary. It stops the drawings
 * from being linked around the form and keeps the download tied to a captured
 * lead. It is not protecting a secret — the same PDFs are handed out at the
 * sales centre — so it is deliberately simple, with no session store to run.
 */

export const ACCESS_COOKIE = "aura_access";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * In development a missing secret falls back to a fixed string so the flow is
 * runnable straight after `bun install`. In production that fallback is a real
 * hole — anyone could forge a token — so we refuse to start without one.
 */
function secret(): string {
  const s = process.env.ACCESS_SECRET;
  if (s && s.length >= 16) return s;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ACCESS_SECRET is missing or shorter than 16 characters. Set it before deploying — see .env.example.",
    );
  }
  return "dev-only-insecure-secret-do-not-ship";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function issueAccessToken(): string {
  const expires = String(Date.now() + TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function verifyAccessToken(token: string | undefined): boolean {
  if (!token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;

  const expected = sign(expires);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  // Length check first: timingSafeEqual throws on a mismatch rather than
  // returning false.
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(expires);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: TTL_MS / 1000,
} as const;
