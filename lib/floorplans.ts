/**
 * The seven Aura Towns models.
 *
 * Specs are transcribed from the INFO panel on each Caivan floor plan PDF.
 * The PDFs themselves live in /assets/floorplans (deliberately NOT in /public)
 * and are served only through the gated route — see lib/access.ts.
 *
 * The specs stay visible to everyone, gate or no gate: they are the substance
 * a buyer searches for, and hiding them behind the form would cost the ranking
 * that brings the buyer here in the first place. The gate is on the drawing.
 */

export type FloorPlan = {
  slug: string;
  name: string;
  residence: "Main Residence" | "Upper Residence";
  sqft: number;
  sqftDisplay: string;
  beds: string;
  baths: string;
  /** Filename inside assets/floorplans. Never exposed to the client. */
  file: string;
  options: string[];
};

/**
 * Public teaser image: the drawing sheet rasterised at 182px wide.
 *
 * It is intentionally too small to read a dimension or a room label off, which
 * is what lets it sit in /public and be crawled — the shape of the plan is the
 * hook, the legible drawing is the thing being traded for. The card blurs it
 * further in CSS so the lock reads as deliberate rather than as a broken image.
 */
export function teaserSrc(slug: string): string {
  return `/floorplans/preview/${slug}.jpg`;
}

/** Full-resolution sheet, served only through the gated preview route. */
export function previewFile(slug: string): string {
  return `preview/${slug}.jpg`;
}

export const FLOOR_PLANS: FloorPlan[] = [
  {
    slug: "the-echo",
    name: "The Echo",
    residence: "Main Residence",
    sqft: 789,
    sqftDisplay: "789",
    beds: "2",
    baths: "1.5 (opt. 2)",
    file: "the-echo.pdf",
    options: ["Main full bath — $7,000"],
  },
  {
    slug: "the-echo-end",
    name: "The Echo End",
    residence: "Main Residence",
    sqft: 815,
    sqftDisplay: "815",
    beds: "2",
    baths: "1.5 (opt. 2)",
    file: "the-echo-end.pdf",
    options: ["Main full bath — $7,000"],
  },
  {
    slug: "the-halo",
    name: "The Halo",
    residence: "Upper Residence",
    sqft: 957,
    sqftDisplay: "957",
    beds: "2",
    baths: "1.5 (opt. 2)",
    file: "the-halo.pdf",
    options: ["Main full bath — $7,000"],
  },
  {
    slug: "the-halo-end",
    name: "The Halo End",
    residence: "Upper Residence",
    sqft: 977,
    sqftDisplay: "977",
    beds: "2",
    baths: "1.5 (opt. 2)",
    file: "the-halo-end.pdf",
    options: ["Main full bath — $7,000"],
  },
  {
    slug: "the-prism-end",
    name: "The Prism End",
    residence: "Main Residence",
    sqft: 961,
    sqftDisplay: "961",
    beds: "3 (opt. 2)",
    baths: "2 (opt. 2.5)",
    file: "the-prism-end.pdf",
    options: ["Den and powder room — $8,500", "Enclosed den — $4,500"],
  },
  {
    slug: "the-lux-corner",
    name: "The Lux Corner",
    residence: "Main Residence",
    sqft: 973,
    sqftDisplay: "973",
    beds: "3 (opt. 2)",
    baths: "2 (opt. 2.5)",
    file: "the-lux-corner.pdf",
    options: [
      "Dining room — $3,000",
      "Enclosed dining room — $5,000",
      "Den and powder room — $8,500",
      "Enclosed den — $4,500",
    ],
  },
  {
    slug: "the-nova-corner",
    name: "The Nova Corner",
    residence: "Upper Residence",
    sqft: 1138,
    sqftDisplay: "1,138",
    beds: "3 (opt. 2)",
    baths: "2 (opt. 2.5)",
    file: "the-nova-corner.pdf",
    options: [
      "Dining room — $3,000",
      "Enclosed dining room — $5,000",
      "Den and powder room — $8,500",
      "Enclosed den — $4,500",
    ],
  },
];

export function getFloorPlan(slug: string): FloorPlan | undefined {
  return FLOOR_PLANS.find((p) => p.slug === slug);
}

/** Shape sent to the browser — note the absence of `file`. */
export type PublicFloorPlan = Omit<FloorPlan, "file">;

export const PUBLIC_FLOOR_PLANS: PublicFloorPlan[] = FLOOR_PLANS.map(
  ({ file: _file, ...rest }) => rest,
);
