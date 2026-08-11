import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray pnpm-lock.yaml in the home directory makes Next infer the workspace
  // root as ~/ and trace far more than it should. Pin it to this project.
  outputFileTracingRoot: process.cwd(),
  // The gated floor plans are read from disk at request time. They are not
  // imported by any module, so tracing cannot infer them — say so explicitly
  // or the PDFs are missing from the deployed bundle and every download 500s.
  outputFileTracingIncludes: {
    "/api/floorplans/[slug]": ["./assets/floorplans/*.pdf"],
    "/api/floorplans/[slug]/preview": ["./assets/floorplans/preview/*.jpg"],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
