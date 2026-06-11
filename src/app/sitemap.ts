import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/villa", priority: 0.9 },
    { path: "/availability", priority: 0.9 },
    { path: "/explore", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
