import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds the shareable GitHub Pages preview (static, noindex,
// served under /villa-mima). The real production deployment is Vercel, where
// none of this applies — see .github/workflows/preview.yml and README.md.
const isStaticPreview = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticPreview
  ? {
      output: "export",
      basePath: "/villa-mima",
      trailingSlash: true,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_BASE_PATH: "/villa-mima", NEXT_PUBLIC_STATIC_PREVIEW: "1" },
    }
  : {};

export default nextConfig;
