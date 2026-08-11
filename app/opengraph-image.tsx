import { ImageResponse } from "next/og";
import { ADDRESS, PHASE, PRICING, PROJECT } from "@/lib/project";

/**
 * Social card. Generated rather than shipped as a file so the price and phase
 * can never fall out of step with lib/project.ts — the same rule the visible
 * copy and the JSON-LD follow.
 *
 * System fonts only: ImageResponse would otherwise need the font binary
 * fetched at build time, and a network dependency in the build is not worth a
 * typeface here.
 */
export const alt = `${PROJECT.name} — townhomes from ${PRICING.fromDisplay} in ${ADDRESS.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16141a",
          padding: 72,
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#e9f24d",
              color: "#16141a",
              padding: "10px 20px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {PHASE.label}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, lineHeight: 1.05, letterSpacing: -2 }}>
            {PROJECT.name}
          </div>
          {/* Satori rejects a non-flex element with more than one child node,
              so interpolated text has to arrive as a single string. */}
          <div style={{ marginTop: 24, fontSize: 32, color: "rgba(255,255,255,0.65)" }}>
            {`${PROJECT.homeType} · ${ADDRESS.city}, ${ADDRESS.region}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 64,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 32,
          }}
        >
          {[
            { v: PRICING.fromDisplay, l: "STARTING FROM" },
            { v: `${PRICING.sqftMin}–${PRICING.sqftMax} SQ FT`, l: "HOME SIZES" },
            { v: `${PHASE.homeCount} HOMES`, l: "FINAL RELEASE" },
          ].map((stat) => (
            <div key={stat.l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", letterSpacing: 3 }}>
                {stat.l}
              </div>
              <div style={{ marginTop: 8, fontSize: 40, color: "#e9f24d" }}>{stat.v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
