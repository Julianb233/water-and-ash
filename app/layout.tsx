import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { inter, playfair } from './fonts';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/structured-data';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Water & Ash Burials | Dignified Sea Burials in San Diego',
    template: '%s | Water & Ash Burials',
  },
  description:
    'Providing compassionate sea burial and memorial services in San Diego, California. Honor your loved ones with dignity aboard our premium vessels.',
  keywords: [
    'sea burial',
    'ash scattering',
    'San Diego',
    'memorial service',
    'ocean burial',
    'cremation burial at sea',
  ],
  authors: [{ name: 'Water & Ash Burials' }],
  creator: 'Water & Ash Burials',
  publisher: 'Water & Ash Burials',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://waterandashburials.org'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Water & Ash Burials | Dignified Sea Burials in San Diego',
    description:
      'Providing compassionate sea burial and memorial services in San Diego, California.',
    siteName: 'Water & Ash Burials',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water & Ash Burials | Dignified Sea Burials in San Diego',
    description:
      'Providing compassionate sea burial and memorial services in San Diego, California.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-navy focus:font-semibold focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
