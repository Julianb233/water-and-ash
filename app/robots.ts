import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://waterandashburials.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/book/confirmation'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
