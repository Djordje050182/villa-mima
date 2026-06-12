import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// required for the static-export preview build
export const dynamic = "force-static";

const isStaticPreview = process.env.STATIC_EXPORT === "1";

// AI assistants increasingly answer "villa in Kotor" queries directly — welcome
// their crawlers explicitly alongside the general allow rule.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  // The GitHub Pages preview must never be indexed — the real site is villamima.com
  if (isStaticPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
