import type { MetadataRoute } from "next";
import { PUBLIC_FLOOR_PLANS } from "@/lib/floorplans";
import { POSTS } from "@/lib/posts";
import { SITE_URL } from "@/lib/project";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    // Per-model pages rank for the long tail ("the nova corner floor plan",
    // "aura echo end square footage") that every competing site gates behind a
    // form, so they sit just below the homepage in priority.
    { url: `${SITE_URL}/floor-plans`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...PUBLIC_FLOOR_PLANS.map((p) => ({
      url: `${SITE_URL}/floor-plans/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.published),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
