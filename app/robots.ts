import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/project";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api is disallowed so the gated floor plan downloads are never crawled
    // or indexed — the route also sets X-Robots-Tag on every response.
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
