export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Water & Ash Burials',
    description:
      'Providing dignified sea burials and memorial services in San Diego, California.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://waterandashburials.org',
    telephone: '+1-619-928-9160',
    email: 'info@waterandashburials.org',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.7157,
      longitude: -117.1611,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 32.7157,
        longitude: -117.1611,
      },
      geoRadius: '50',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
