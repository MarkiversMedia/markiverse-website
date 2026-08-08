import type { MetadataRoute } from "next";

/**
 * This is the pre-launch staging site, so nothing here should be crawled or
 * indexed — it would otherwise compete with markiverse.com for the same terms.
 *
 * Remove this file (and the `robots` block in layout.tsx) before the site goes
 * live on the production domain, or it will stay invisible to search.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
