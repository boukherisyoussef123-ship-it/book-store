import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://book-store-ashy-nine.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/sign-in/",
        "/sign-up/",
        "/read-full/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}