const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://waterandashburials.org';

function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#business`,
    name: 'Water & Ash Burials',
    description:
      'Providing dignified sea burials and memorial services in San Diego, California.',
    url: siteUrl,
    telephone: '+1-619-928-9160',
    email: 'info@waterandashburials.org',
    image: `${siteUrl}/og-image.jpg`,
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://instagram.com/waterandashburials',
      'https://facebook.com/waterandashburials',
      'https://yelp.com/biz/water-and-ash-burials-san-diego',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sea Burial Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'The Osprey - Sea Burial Ceremony',
            description:
              'Dignified sea burial aboard a 62-foot Striker with capacity for up to 13 passengers. Includes ceremony coordination, GPS coordinates, certificate, and floral tributes.',
            url: `${siteUrl}/services/osprey`,
          },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'White Nights - Sea Burial Ceremony',
            description:
              'Elegant sea burial aboard a 58-foot Hatteras motor yacht with capacity for up to 12 passengers. Includes ceremony coordination, GPS coordinates, certificate, and floral tributes.',
            url: `${siteUrl}/services/white-nights`,
          },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Relentless - Sea Burial Ceremony',
            description:
              'Spacious sea burial aboard a 45-foot Bali Catamaran with capacity for up to 15 passengers. Includes ceremony coordination, GPS coordinates, certificate, and floral tributes.',
            url: `${siteUrl}/services/relentless`,
          },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'At-Home Memorial - Mail-in Sea Burial',
            description:
              'Affordable mail-in sea burial service. We perform the ceremony on your behalf and provide GPS coordinates, certificate, photographs, and detailed report.',
            url: `${siteUrl}/services/at-home`,
          },
          price: '400',
          priceCurrency: 'USD',
        },
      ],
    },
  };
}

function getBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteUrl}/services/osprey`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'About',
        item: `${siteUrl}/about`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${siteUrl}/contact`,
      },
    ],
  };
}

function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a sea burial or ash scattering ceremony?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A sea burial is a meaningful farewell where cremated remains are committed to the ocean during a private ceremony aboard one of our vessels. We sail to EPA-designated waters off the coast of San Diego, where your family can say goodbye surrounded by the beauty of the Pacific.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a sea burial legal? What are the EPA requirements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, sea burials are fully legal. The EPA requires that cremated remains be scattered at least 3 nautical miles from shore. Water & Ash is fully licensed and insured, and we handle all required documentation and compliance, including filing the EPA burial-at-sea report on your behalf.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should we bring or wear to the ceremony?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend comfortable, layered clothing and flat, non-marking shoes suitable for a boat. Many families bring flowers, photos, letters, or other meaningful items to include in the ceremony. We provide biodegradable wreaths and flower petals as part of the service.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the ceremony last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A typical ceremony lasts approximately 2 to 3 hours, including the voyage out to sea, the ceremony itself, and the return trip. We never rush the experience -- your family can take all the time they need.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we bring our own officiant or clergy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Many families choose to bring their own minister, priest, rabbi, or celebrant. We also have a non-denominational ceremony script available if you prefer, or our experienced captain can lead a simple, respectful service.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if there is bad weather?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Safety is our top priority. If weather conditions are unfavorable, we will contact you to reschedule at no additional charge. Our experienced captains monitor conditions closely and will always make the call that keeps your family safe.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many people can attend the ceremony?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Capacity varies by vessel: The Osprey accommodates up to 13 guests, White Nights up to 12, and Relentless up to 15. For larger groups, we can arrange multiple vessels or coordinate back-to-back ceremonies.',
        },
      },
      {
        '@type': 'Question',
        name: 'What documentation do you provide after the ceremony?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After every ceremony, we provide an official Certificate of Sea Burial with the exact GPS coordinates, date, and time. We also file the required EPA burial-at-sea report. Many families find the certificate and coordinates bring comfort for future remembrance visits.',
        },
      },
    ],
  };
}

export function StructuredData() {
  const schemas = [
    getLocalBusinessSchema(),
    getBreadcrumbSchema(),
    getFAQSchema(),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  author,
  imageUrl,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  imageUrl: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Water & Ash Burials',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceStructuredData({
  name,
  description,
  price,
  url,
}: {
  name: string;
  description: string;
  price: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Water & Ash Burials',
      '@id': `${siteUrl}/#business`,
    },
    areaServed: {
      '@type': 'City',
      name: 'San Diego',
    },
    url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
