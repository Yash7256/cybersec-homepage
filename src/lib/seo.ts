const SITE_URL = "https://cybersec-toolkit.com";
export const DEFAULT_OG_IMAGE = "https://home.cybersec.tech/og-image.png";

export interface SeoMetaOptions {
  title: string;
  description: string;
  path?: string;
  isHome?: boolean;
  image?: string;
  noindex?: boolean;
}

export function seoMeta(options: SeoMetaOptions) {
  const meta: Record<string, string>[] = [
    { title: options.title },
    { name: "description", content: options.description },
    { property: "og:title", content: options.title },
    { property: "og:description", content: options.description },
    { property: "og:type", content: options.isHome ? "website" : "article" },
    { property: "og:site_name", content: "CyberSec Toolkit" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: options.title },
    { name: "twitter:description", content: options.description },
  ];

  const imageUrl = options.image
    ? options.image.startsWith("http")
      ? options.image
      : `${SITE_URL}${options.image}`
    : DEFAULT_OG_IMAGE;
  meta.push(
    { property: "og:image", content: imageUrl },
    { name: "twitter:image", content: imageUrl },
  );

  if (options.path) {
    const url = `${SITE_URL}${options.path}`;
    meta.push({ property: "og:url", content: url });
  }

  if (options.noindex) {
    meta.push({ name: "robots", content: "noindex" });
  }

  return meta;
}

export function seoLinks(path: string) {
  return [{ rel: "canonical", href: `${SITE_URL}${path}` }];
}
