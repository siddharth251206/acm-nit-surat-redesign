import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Update this to your final production domain if it changes
  const baseUrl = 'https://acm-nit-surat.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Explicitly block all admin and raw API routes from being indexed by search engines
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
