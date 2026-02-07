# Phase 01 Plan: Foundation & Core Pages

**Phase:** 01
**Status:** Ready to Execute
**Created:** 2026-01-27
**Duration:** Week 1-2 (Target: Demo-ready for Vegas Convention)

---

## Overview

Phase 01 establishes the foundation for Water & Ash Burials' premium website: a Next.js 16 application with Tailwind CSS v4, shadcn/ui components, and Cloudinary image management. This phase delivers 9 public-facing pages (homepage, 4 service pages, about, contact, give-back, privacy) with a grief-sensitive design system emphasizing navy/gold/white luxury aesthetics and mobile-first responsive design.

**Key Deliverables:**
- Next.js 16 project with TypeScript and App Router
- Premium design system (navy/gold/white palette)
- 8 core pages + 1 thank-you page
- Contact form with email notification
- Mobile-first responsive design (90+ Lighthouse score)
- Cloudinary integration for vessel photography

**Success = Demo-ready for Vegas convention with:**
1. Fast mobile load times (90+ Lighthouse Performance)
2. Premium aesthetic (real vessel photos, sophisticated design)
3. Grief-sensitive UX (clear language, one CTA per page)
4. Working contact form with email notification

---

## Execution Waves

### Wave 1: Project Setup (Parallelizable)

#### Task 1.1: Initialize Next.js 16 Project
**Type:** Setup
**Requirement:** WEB-13 (HTTPS/SSL via Vercel)

**Steps:**
1. Create Next.js 16 project with TypeScript, Tailwind, and App Router
2. Configure project structure for App Router
3. Set up ESLint and Prettier configuration
4. Initialize git repository with proper .gitignore
5. Create environment variables template

**Commands:**
```bash
npx create-next-app@latest water-and-ash --typescript --tailwind --app --use-npm
cd water-and-ash
```

**File: `.env.example`**
```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (Resend)
RESEND_API_KEY=

# Site URL
NEXT_PUBLIC_SITE_URL=https://waterandashburials.org
```

**Verification:**
- [ ] `npm run dev` starts successfully on localhost:3000
- [ ] TypeScript compiles without errors
- [ ] ESLint runs without errors
- [ ] .env.example file created

---

#### Task 1.2: Configure Tailwind CSS v4 and Design System
**Type:** Setup
**Requirement:** WEB-01

**Steps:**
1. Configure Tailwind v4 with custom theme in globals.css
2. Define navy/gold/white color palette using oklch
3. Configure typography scale with Inter and Playfair Display
4. Set up spacing and breakpoint tokens
5. Install Google Fonts via next/font

**File: `app/globals.css`**
```css
@import "tailwindcss";

@theme {
  /* Premium Color Palette */
  --color-navy: oklch(0.25 0.05 250);
  --color-navy-light: oklch(0.35 0.04 250);
  --color-navy-dark: oklch(0.18 0.05 250);
  --color-gold: oklch(0.75 0.15 80);
  --color-gold-light: oklch(0.85 0.12 80);
  --color-gold-dark: oklch(0.65 0.18 80);
  --color-white: oklch(1 0 0);
  --color-cream: oklch(0.98 0.01 80);

  /* Semantic Colors */
  --color-background: var(--color-white);
  --color-foreground: var(--color-navy);
  --color-muted: oklch(0.95 0.01 250);
  --color-muted-foreground: oklch(0.45 0.03 250);
  --color-accent: var(--color-gold);
  --color-accent-foreground: var(--color-navy-dark);

  /* Typography */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;

  /* Spacing Scale */
  --spacing-section: 5rem;
  --spacing-section-lg: 7rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

/* Base Styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "kern" 1, "liga" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif text-navy;
  }

  /* Ensure minimum touch target size */
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Premium Focus States */
@layer components {
  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2;
  }
}
```

**File: `app/fonts.ts`**
```typescript
import { Inter, Playfair_Display } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})
```

**Verification:**
- [ ] Custom colors available: `bg-navy`, `text-gold`, etc.
- [ ] Fonts load correctly (Inter for body, Playfair for headings)
- [ ] Responsive breakpoints work (sm, md, lg, xl)

---

#### Task 1.3: Install and Configure shadcn/ui
**Type:** Setup
**Requirement:** WEB-01, WEB-03

**Steps:**
1. Initialize shadcn/ui with custom configuration
2. Install core components needed for Phase 01
3. Customize component styling for premium aesthetic
4. Create custom button variants

**Commands:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card form input textarea select separator accordion label
```

**File: `components/ui/button.tsx` (customization)**
```typescript
// After shadcn init, update variants for premium styling
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy text-white hover:bg-navy-light shadow-sm",
        gold: "bg-gold text-navy-dark hover:bg-gold-light shadow-sm",
        outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
        ghost: "text-navy hover:bg-navy/10",
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

**Verification:**
- [ ] All components render correctly
- [ ] Button variants display with premium colors
- [ ] Form components have proper focus states

---

#### Task 1.4: Configure Cloudinary Integration
**Type:** Setup
**Requirement:** WEB-14

**Steps:**
1. Install next-cloudinary package
2. Configure Cloudinary environment variables
3. Set up image remote patterns in next.config.js
4. Create reusable image component wrapper

**Commands:**
```bash
npm install next-cloudinary
```

**File: `next.config.ts`**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
```

**File: `components/cloudinary-image.tsx`**
```typescript
'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'

interface CloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  src: string
  alt: string
  priority?: boolean
}

export function CloudinaryImage({
  src,
  alt,
  priority = false,
  ...props
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      quality="auto"
      format="auto"
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  )
}
```

**Verification:**
- [ ] Cloudinary images load successfully
- [ ] Images auto-optimize to WebP/AVIF
- [ ] Responsive images work at different breakpoints

---

#### Task 1.5: Install Animation and Form Dependencies
**Type:** Setup
**Requirement:** WEB-04, WEB-11

**Steps:**
1. Install Framer Motion for animations
2. Install React Hook Form and Zod for forms
3. Install Resend for email notifications
4. Configure form resolver

**Commands:**
```bash
npm install motion
npm install react-hook-form @hookform/resolvers zod
npm install resend
```

**Verification:**
- [ ] All packages install without conflicts
- [ ] TypeScript types resolve correctly
- [ ] No peer dependency warnings

---

#### Task 1.6: Set Up Vercel Project
**Type:** Setup
**Requirement:** WEB-13

**Steps:**
1. Create Vercel project linked to repository
2. Configure environment variables in Vercel
3. Set up production domain
4. Enable Vercel Analytics and Speed Insights

**Commands:**
```bash
npm install @vercel/analytics @vercel/speed-insights
```

**File: `app/layout.tsx` (analytics integration)**
```typescript
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

// ... in return statement
<>
  {children}
  <Analytics />
  <SpeedInsights />
</>
```

**Verification:**
- [ ] Vercel deployment succeeds
- [ ] HTTPS working on Vercel URL
- [ ] Environment variables accessible in deployment

---

### Wave 2: Layout Components (Sequential after Wave 1)

#### Task 2.1: Create Root Layout with Metadata
**Type:** Component
**Requirement:** WEB-01, WEB-13

**Steps:**
1. Create root layout with font configuration
2. Set up default metadata for SEO
3. Add JSON-LD structured data
4. Configure viewport and theme color

**File: `app/layout.tsx`**
```typescript
import type { Metadata, Viewport } from 'next'
import { inter, playfair } from './fonts'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LocalBusinessSchema } from '@/components/structured-data'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://waterandashburials.org'),
  title: {
    default: 'Water & Ash Burials | Premium Sea Burial Services in San Diego',
    template: '%s | Water & Ash Burials',
  },
  description: 'Premium sea burial ceremonies in San Diego. Celebrate life on the Pacific with our heart-centered service aboard luxury vessels. Starting at $2,000.',
  keywords: ['sea burial', 'San Diego', 'ocean ceremony', 'celebration of life', 'cremation', 'memorial service', 'burial at sea'],
  authors: [{ name: 'Water & Ash Burials' }],
  creator: 'Water & Ash Burials',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waterandashburials.org',
    siteName: 'Water & Ash Burials',
    title: 'Water & Ash Burials | Premium Sea Burial Services',
    description: 'Premium sea burial ceremonies in San Diego. Celebrate life on the Pacific.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Water & Ash Burials - Premium Sea Burial Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water & Ash Burials | Premium Sea Burial Services',
    description: 'Premium sea burial ceremonies in San Diego.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a2332', // Navy
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <LocalBusinessSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Verification:**
- [ ] Metadata renders correctly in page source
- [ ] Fonts apply to body and headings
- [ ] Theme color shows in mobile browser

---

#### Task 2.2: Create Header Component with Navigation
**Type:** Component
**Requirement:** WEB-03

**Steps:**
1. Create responsive header with logo
2. Implement desktop navigation with services dropdown
3. Create mobile hamburger menu
4. Add scroll behavior (optional: sticky header)

**File: `components/layout/header.tsx`**
```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'The Osprey', href: '/services/osprey', description: '62-foot Sport Fishing Vessel' },
      { name: 'White Nights', href: '/services/white-nights', description: '58-foot Motor Yacht' },
      { name: 'Relentless', href: '/services/relentless', description: '45-foot Catamaran' },
      { name: 'At-Home Memorial', href: '/services/at-home', description: 'Mail-in Service' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Give-Back Program', href: '/give-back' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {/* Replace with actual logo */}
            <span className="font-serif text-2xl font-bold text-navy">
              Water & Ash
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="flex items-center text-navy hover:text-gold transition-colors">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full pt-2 w-64"
                      >
                        <div className="bg-white rounded-lg shadow-lg ring-1 ring-black/5 p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-md px-4 py-3 hover:bg-cream transition-colors"
                            >
                              <div className="font-medium text-navy">{child.name}</div>
                              <div className="text-sm text-muted-foreground">{child.description}</div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-navy hover:text-gold transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) =>
                  item.children ? (
                    <div key={item.name} className="space-y-2">
                      <div className="px-4 py-2 font-medium text-navy">{item.name}</div>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-8 py-2 text-navy/80 hover:text-gold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-navy hover:text-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
                <div className="px-4 pt-4">
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
```

**Verification:**
- [ ] Desktop navigation displays correctly
- [ ] Services dropdown works on hover
- [ ] Mobile menu opens/closes smoothly
- [ ] Touch targets are 44px minimum

---

#### Task 2.3: Create Footer Component
**Type:** Component
**Requirement:** WEB-01

**Steps:**
1. Create footer with contact information
2. Add navigation links
3. Include social links placeholder
4. Add copyright and privacy link

**File: `components/layout/footer.tsx`**
```typescript
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const footerNavigation = {
  services: [
    { name: 'The Osprey', href: '/services/osprey' },
    { name: 'White Nights', href: '/services/white-nights' },
    { name: 'Relentless', href: '/services/relentless' },
    { name: 'At-Home Memorial', href: '/services/at-home' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Give-Back Program', href: '/give-back' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold text-gold">
              Water & Ash Burials
            </Link>
            <p className="mt-4 text-white/80 max-w-md">
              Premium sea burial ceremonies in San Diego. Celebrate life on the Pacific
              with our heart-centered service.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:619-928-9160"
                className="flex items-center text-white/80 hover:text-gold transition-colors"
              >
                <Phone className="h-5 w-5 mr-3" />
                619-928-9160
              </a>
              <a
                href="mailto:info@waterandashburials.org"
                className="flex items-center text-white/80 hover:text-gold transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                info@waterandashburials.org
              </a>
              <div className="flex items-center text-white/80">
                <MapPin className="h-5 w-5 mr-3" />
                San Diego, California
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Water & Ash Burials. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Serving families in San Diego with heart-centered memorial services
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Verification:**
- [ ] Footer displays on all pages
- [ ] Links navigate correctly
- [ ] Contact information is correct
- [ ] Responsive layout works on mobile

---

#### Task 2.4: Create Container Component
**Type:** Component
**Requirement:** WEB-01

**Steps:**
1. Create reusable container with max-width
2. Add responsive padding options
3. Create section wrapper for consistent spacing

**File: `components/layout/container.tsx`**
```typescript
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-7xl': size === 'default',
          'max-w-4xl': size === 'narrow',
          'max-w-screen-2xl': size === 'wide',
        },
        className
      )}
    >
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', className)}
    >
      {children}
    </section>
  )
}
```

**Verification:**
- [ ] Container centers content correctly
- [ ] Max-width applies on large screens
- [ ] Responsive padding works

---

#### Task 2.5: Create Structured Data Component
**Type:** Component
**Requirement:** SEO

**Steps:**
1. Create LocalBusiness JSON-LD schema
2. Add to root layout

**File: `components/structured-data.tsx`**
```typescript
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Water & Ash Burials',
    description: 'Premium sea burial services in San Diego. Celebrate life on the Pacific with heart-centered memorial ceremonies.',
    url: 'https://waterandashburials.org',
    telephone: '619-928-9160',
    email: 'info@waterandashburials.org',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '32.7157',
      longitude: '-117.1611',
    },
    priceRange: '$$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '18:00',
    },
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sea Burial Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'The Osprey Sea Burial',
            description: '62-foot sport fishing vessel, accommodates up to 13 passengers',
          },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'White Nights Sea Burial',
            description: '58-foot motor yacht sea burial ceremony',
          },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Relentless Sea Burial',
            description: '45-foot Bali catamaran sea burial ceremony',
          },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'At-Home Memorial',
            description: 'Mail-in sea burial service with video and GPS coordinates',
          },
          price: '400',
          priceCurrency: 'USD',
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Verification:**
- [ ] JSON-LD appears in page source
- [ ] Schema validates in Google Rich Results Test

---

### Wave 3: Design System Components (Sequential after Wave 2)

#### Task 3.1: Create Animation Primitives
**Type:** Component
**Requirement:** WEB-04

**Steps:**
1. Create reusable fade-in animation wrapper
2. Create stagger container for lists
3. Implement reduced motion support

**File: `components/animations/motion-primitives.tsx`**
```typescript
'use client'

import { motion, useReducedMotion, Variants } from 'motion/react'
import { ReactNode } from 'react'

// Fade in from bottom
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Fade in from left
const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

// Simple fade
const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'none'
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up'
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    up: fadeInUpVariants,
    left: fadeInLeftVariants,
    none: fadeInVariants,
  }[direction]

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Verification:**
- [ ] Animations play on scroll into view
- [ ] Animations respect prefers-reduced-motion
- [ ] No layout shift from animations

---

#### Task 3.2: Create Service Card Component
**Type:** Component
**Requirement:** WEB-05

**Steps:**
1. Create service card for homepage grid
2. Include vessel image, name, capacity, price
3. Add hover animation

**File: `components/services/service-card.tsx`**
```typescript
'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { CloudinaryImage } from '@/components/cloudinary-image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'

interface ServiceCardProps {
  name: string
  slug: string
  description: string
  capacity: string
  price: number
  cloudinaryId: string
}

export function ServiceCard({
  name,
  slug,
  description,
  capacity,
  price,
  cloudinaryId,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative aspect-[4/3]">
          <CloudinaryImage
            src={cloudinaryId}
            alt={`${name} - Sea burial vessel`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            crop="fill"
            gravity="auto"
            className="object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-xl font-semibold text-navy">{name}</h3>
          <p className="mt-2 text-muted-foreground text-sm line-clamp-2">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {capacity}
            </div>
            <div className="text-navy font-semibold">
              ${price.toLocaleString()}
            </div>
          </div>
          <Button asChild variant="outline" className="w-full mt-4">
            <Link href={`/services/${slug}`}>Learn More</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

**Verification:**
- [ ] Card displays all information correctly
- [ ] Image loads and optimizes
- [ ] Hover animation works smoothly
- [ ] Link navigates to correct service page

---

#### Task 3.3: Create Contact Form Component
**Type:** Component
**Requirement:** WEB-11

**Steps:**
1. Create contact form with React Hook Form and Zod
2. Implement minimal fields (name, email, phone, service, message)
3. Add loading and success states
4. Connect to server action

**File: `lib/validations/contact.ts`**
```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a 10-digit phone number'),
  service: z.enum(['osprey', 'white-nights', 'relentless', 'at-home', 'not-sure'], {
    required_error: 'Please select a service interest',
  }),
  message: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

**File: `components/forms/contact-form.tsx`**
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { contactSchema, ContactFormData } from '@/lib/validations/contact'

const serviceOptions = [
  { value: 'osprey', label: 'The Osprey (62-foot vessel)' },
  { value: 'white-nights', label: 'White Nights (58-foot yacht)' },
  { value: 'relentless', label: 'Relentless (45-foot catamaran)' },
  { value: 'at-home', label: 'At-Home Memorial ($400)' },
  { value: 'not-sure', label: "I'm not sure yet" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: 'not-sure',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      router.push('/thank-you')
    } catch (err) {
      setError('Something went wrong. Please call us at 619-928-9160.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="6195551234"
                    {...field}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your needs or any questions you have..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            We understand this is a difficult time. Take your time, and we'll respond within 4 hours during business hours.
          </p>
        </div>
      </form>
    </Form>
  )
}
```

**Verification:**
- [ ] Form validates all fields correctly
- [ ] Phone input only accepts digits
- [ ] Loading state shows during submission
- [ ] Error messages display appropriately
- [ ] Successful submission redirects to thank-you page

---

#### Task 3.4: Create Contact Form API Route
**Type:** API
**Requirement:** WEB-11

**Steps:**
1. Create API route for form submission
2. Validate incoming data server-side
3. Send email notification via Resend
4. Handle errors gracefully

**File: `app/api/contact/route.ts`**
```typescript
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

const serviceLabels: Record<string, string> = {
  'osprey': 'The Osprey',
  'white-nights': 'White Nights',
  'relentless': 'Relentless',
  'at-home': 'At-Home Memorial',
  'not-sure': 'Not Sure Yet',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Server-side validation
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, service, message } = result.data

    // Format phone for display
    const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

    // Send email notification to owner
    await resend.emails.send({
      from: 'Water & Ash Contact Form <noreply@waterandashburials.org>',
      to: 'info@waterandashburials.org',
      replyTo: email,
      subject: `New Inquiry: ${serviceLabels[service]} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a2332;">New Contact Form Submission</h2>
          <p style="color: #666;">A new inquiry has been received from your website.</p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${formattedPhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${serviceLabels[service]}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${message}</td>
            </tr>
            ` : ''}
          </table>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Remember: Respond within 1 hour for best conversion rates.
          </p>
        </div>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Water & Ash Burials <noreply@waterandashburials.org>',
      to: email,
      subject: 'Thank you for contacting Water & Ash Burials',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a2332;">Thank You, ${name}</h2>

          <p style="color: #333; line-height: 1.6;">
            We understand this is a difficult time, and we appreciate you reaching out to us.
          </p>

          <p style="color: #333; line-height: 1.6;">
            A member of our team will contact you within 4 hours during business hours
            (Monday-Sunday, 8am-6pm Pacific). If you need immediate assistance,
            please call us at <a href="tel:619-928-9160" style="color: #d4af37;">619-928-9160</a>.
          </p>

          <p style="color: #333; line-height: 1.6;">
            Take your time, and know that we're here to support you through every step.
          </p>

          <p style="color: #333; margin-top: 30px;">
            With care,<br/>
            <strong>The Water & Ash Burials Team</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <p style="color: #999; font-size: 12px;">
            Water & Ash Burials<br/>
            Premium Sea Burial Services in San Diego<br/>
            619-928-9160 | info@waterandashburials.org
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
```

**Verification:**
- [ ] API route validates data correctly
- [ ] Owner receives notification email
- [ ] User receives confirmation email
- [ ] Error responses return appropriate status codes

---

### Wave 4: Core Pages (Sequential after Wave 3)

#### Task 4.1: Create Homepage
**Type:** Page
**Requirement:** WEB-05

**Steps:**
1. Create hero section with headline, subheadline, CTA
2. Create services overview grid
3. Create trust indicators section
4. Add animation effects

**File: `app/page.tsx`**
```typescript
import { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { TrustSection } from '@/components/home/trust-section'
import { CTASection } from '@/components/home/cta-section'

export const metadata: Metadata = {
  title: 'Premium Sea Burial Services in San Diego',
  description: 'Celebrate life on the Pacific with Water & Ash Burials. Heart-centered sea burial ceremonies aboard luxury vessels. Starting at $2,000.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <TrustSection />
      <CTASection />
    </>
  )
}
```

**File: `components/home/hero.tsx`**
```typescript
'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { CloudinaryImage } from '@/components/cloudinary-image'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <CloudinaryImage
          src="water-ash/hero-ocean"
          alt="San Diego coastline at sunset"
          fill
          priority
          sizes="100vw"
          crop="fill"
          gravity="auto"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight"
          >
            Celebrate Life on the Pacific
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-white/90 leading-relaxed"
          >
            Premium sea burial ceremonies in San Diego with heart-centered service.
            Honor your loved one with a meaningful celebration of life on the ocean.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" variant="gold">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link href="#services">Explore Services</Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-white/70 text-sm"
          >
            10+ years as captain | 8 years serving families | San Diego, CA
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
```

**File: `components/home/services-grid.tsx`**
```typescript
import { Container, Section } from '@/components/layout/container'
import { ServiceCard } from '@/components/services/service-card'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-primitives'

const services = [
  {
    name: 'The Osprey',
    slug: 'osprey',
    description: '62-foot Striker sport fishing vessel. Spacious deck for ceremonies with panoramic ocean views.',
    capacity: 'Up to 13 passengers',
    price: 2000,
    cloudinaryId: 'water-ash/vessels/osprey-hero',
  },
  {
    name: 'White Nights',
    slug: 'white-nights',
    description: '58-foot Hatteras motor yacht. Elegant interior with comfortable seating and climate control.',
    capacity: 'Up to 12 passengers',
    price: 2000,
    cloudinaryId: 'water-ash/vessels/white-nights-hero',
  },
  {
    name: 'Relentless',
    slug: 'relentless',
    description: '45-foot Bali catamaran. Stable sailing experience with spacious deck areas.',
    capacity: 'Up to 10 passengers',
    price: 2000,
    cloudinaryId: 'water-ash/vessels/relentless-hero',
  },
  {
    name: 'At-Home Memorial',
    slug: 'at-home',
    description: 'Mail-in service for families who cannot attend. Includes video recording and GPS coordinates.',
    capacity: 'Mail-in service',
    price: 400,
    cloudinaryId: 'water-ash/services/at-home-memorial',
  },
]

export function ServicesGrid() {
  return (
    <Section id="services" className="bg-cream">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect vessel for your loved one's celebration of life.
            Each ceremony includes professional captain and crew, music system, and full EPA compliance.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  )
}
```

**File: `components/home/trust-section.tsx`**
```typescript
import { Container, Section } from '@/components/layout/container'
import { FadeIn } from '@/components/animations/motion-primitives'
import { Heart, Anchor, Award, Users } from 'lucide-react'

const trustIndicators = [
  {
    icon: Anchor,
    title: '10+ Years Experience',
    description: 'Licensed captain with over a decade of maritime experience.',
  },
  {
    icon: Heart,
    title: 'Heart-Centered Service',
    description: 'Every ceremony is a celebration of life, not just a service.',
  },
  {
    icon: Award,
    title: 'Full Compliance',
    description: 'EPA-compliant ceremonies with all required reporting.',
  },
  {
    icon: Users,
    title: 'Give-Back Program',
    description: 'We provide free services for families who cannot afford.',
  },
]

export function TrustSection() {
  return (
    <Section>
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">
            Why Families Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Water & Ash Burials provides premium sea burial services with a
            personal touch. We're here to help you honor your loved one.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustIndicators.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

**File: `components/home/cta-section.tsx`**
```typescript
import Link from 'next/link'
import { Container, Section } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animations/motion-primitives'

export function CTASection() {
  return (
    <Section className="bg-navy">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Ready to Honor Your Loved One?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            We understand this is a difficult time. Contact us to discuss how we can
            help create a meaningful celebration of life on the Pacific.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="gold">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link href="tel:619-928-9160">Call 619-928-9160</Link>
            </Button>
          </div>
          <p className="mt-6 text-white/60 text-sm">
            Available 7 days a week, 8am-6pm Pacific
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}
```

**Verification:**
- [ ] Homepage loads with all sections
- [ ] Hero animation plays smoothly
- [ ] Services grid displays 4 cards
- [ ] Trust section shows 4 indicators
- [ ] CTA buttons link correctly

---

#### Task 4.2: Create Service Page Template
**Type:** Component
**Requirement:** WEB-06, WEB-07, WEB-08, WEB-09

**Steps:**
1. Create reusable vessel page template
2. Include hero, description, gallery, pricing, CTA
3. Apply to all 4 service pages

**File: `components/services/vessel-page.tsx`**
```typescript
'use client'

import Link from 'next/link'
import { CloudinaryImage } from '@/components/cloudinary-image'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/layout/container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-primitives'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Users, Clock, MapPin, Phone } from 'lucide-react'

interface VesselPageProps {
  name: string
  tagline: string
  description: string
  specs: {
    length: string
    capacity: string
    duration: string
    departure: string
  }
  price: number
  includes: string[]
  additionalOptions?: { name: string; price: string }[]
  heroImage: string
  galleryImages: string[]
}

export function VesselPage({
  name,
  tagline,
  description,
  specs,
  price,
  includes,
  additionalOptions,
  heroImage,
  galleryImages,
}: VesselPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <CloudinaryImage
            src={heroImage}
            alt={`${name} - Sea burial vessel`}
            fill
            priority
            sizes="100vw"
            crop="fill"
            gravity="auto"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
        </div>
        <Container className="relative z-10 pb-12">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white">
              {name}
            </h1>
            <p className="mt-4 text-xl text-white/90">{tagline}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {specs.capacity}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {specs.duration}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {specs.departure}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Description & Pricing */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="text-2xl font-serif font-bold text-navy">
                  About {name}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {description}
                </p>

                <h3 className="mt-8 text-xl font-serif font-semibold text-navy">
                  What's Included
                </h3>
                <ul className="mt-4 space-y-3">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="h-5 w-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                {additionalOptions && (
                  <>
                    <h3 className="mt-8 text-xl font-serif font-semibold text-navy">
                      Additional Options
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {additionalOptions.map((option) => (
                        <li key={option.name} className="flex justify-between text-muted-foreground">
                          <span>{option.name}</span>
                          <span>{option.price}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </FadeIn>
            </div>

            {/* Pricing Card */}
            <div>
              <FadeIn delay={0.2}>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-4xl font-serif font-bold text-navy">
                        ${price.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vessel</span>
                        <span className="text-navy font-medium">{specs.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="text-navy font-medium">{specs.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="text-navy font-medium">{specs.duration}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Button asChild size="lg" className="w-full">
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="w-full">
                        <Link href="tel:619-928-9160">
                          <Phone className="h-4 w-4 mr-2" />
                          619-928-9160
                        </Link>
                      </Button>
                    </div>

                    <p className="mt-4 text-xs text-center text-muted-foreground">
                      No obligation consultation. We understand this is a difficult time.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <Section className="bg-cream">
          <Container>
            <FadeIn className="text-center mb-12">
              <h2 className="text-2xl font-serif font-bold text-navy">
                Photo Gallery
              </h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <StaggerItem key={image}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <CloudinaryImage
                      src={image}
                      alt={`${name} gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      crop="fill"
                      gravity="auto"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-navy">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-white">
              Schedule Your Ceremony
            </h2>
            <p className="mt-4 text-white/80">
              Contact us to discuss your needs and reserve your preferred date aboard {name}.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="gold">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                <Link href="tel:619-928-9160">Call Now</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
```

**Verification:**
- [ ] Template renders all sections
- [ ] Gallery images display correctly
- [ ] Pricing card is sticky on scroll
- [ ] CTAs link to contact page

---

#### Task 4.3: Create Service Pages (Osprey, White Nights, Relentless, At-Home)
**Type:** Pages
**Requirement:** WEB-06, WEB-07, WEB-08, WEB-09

**Steps:**
1. Create service route group
2. Create individual service pages using template
3. Add page-specific metadata

**File: `app/services/osprey/page.tsx`**
```typescript
import { Metadata } from 'next'
import { VesselPage } from '@/components/services/vessel-page'

export const metadata: Metadata = {
  title: 'The Osprey - 62-Foot Sport Fishing Vessel',
  description: 'Premium sea burial ceremonies aboard The Osprey, a 62-foot Striker sport fishing vessel. Accommodates up to 13 passengers. Starting at $2,000.',
  openGraph: {
    title: 'The Osprey - Luxury Sea Burial Vessel',
    description: 'Experience a meaningful celebration of life aboard our 62-foot sport fishing vessel.',
    images: ['/og-images/osprey.jpg'],
  },
}

export default function OspreyPage() {
  return (
    <VesselPage
      name="The Osprey"
      tagline="62-foot Striker Sport Fishing Vessel"
      description="The Osprey is a magnificent 62-foot Striker sport fishing vessel that provides the perfect setting for a celebration of life at sea. With its spacious deck and comfortable seating areas, families can gather to honor their loved one while surrounded by the beauty of the Pacific Ocean. The vessel features panoramic views, a professional sound system for music, and ample space for flowers and ceremonial items."
      specs={{
        length: '62 feet',
        capacity: 'Up to 13 passengers',
        duration: '2-3 hours',
        departure: 'San Diego Harbor',
      }}
      price={2000}
      includes={[
        'Professional captain and crew',
        'Music system (bring your own playlist)',
        'Flower petals for scattering',
        'Full EPA compliance and reporting',
        'Memorial certificate with GPS coordinates',
        'Refreshments (water, soft drinks)',
        '2-3 hour ceremony on the ocean',
        'Departure from San Diego Harbor',
      ]}
      additionalOptions={[
        { name: 'Professional photography', price: 'Starting at $300' },
        { name: 'Premium floral arrangements', price: 'Starting at $150' },
        { name: 'Custom ceremony officiant', price: 'Starting at $200' },
        { name: 'Catering services', price: 'Quote upon request' },
      ]}
      heroImage="water-ash/vessels/osprey-hero"
      galleryImages={[
        'water-ash/vessels/osprey-gallery-1',
        'water-ash/vessels/osprey-gallery-2',
        'water-ash/vessels/osprey-gallery-3',
        'water-ash/vessels/osprey-gallery-4',
        'water-ash/vessels/osprey-gallery-5',
        'water-ash/vessels/osprey-gallery-6',
      ]}
    />
  )
}
```

**Create similar files for:**
- `app/services/white-nights/page.tsx`
- `app/services/relentless/page.tsx`
- `app/services/at-home/page.tsx` (with modified template for mail-in service)

**Verification:**
- [ ] All 4 service pages render correctly
- [ ] Metadata is unique per page
- [ ] Navigation links work between pages

---

### Wave 5: Remaining Pages (Sequential after Wave 4)

#### Task 5.1: Create About Page
**Type:** Page
**Requirement:** WEB-10

**Steps:**
1. Create about page with company story
2. Include captain background
3. Add heart-centered mission section

**File: `app/about/page.tsx`**
```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { CloudinaryImage } from '@/components/cloudinary-image'
import { FadeIn } from '@/components/animations/motion-primitives'
import { Heart, Anchor, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Water & Ash Burials, our heart-centered approach to sea burial services, and our commitment to celebrating life on the Pacific.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-navy">
        <Container>
          <FadeIn className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              About Water & Ash Burials
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              A heart-centered approach to celebrating life on the Pacific Ocean.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Story */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <CloudinaryImage
                  src="water-ash/about/captain"
                  alt="Captain at Water & Ash Burials"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  crop="fill"
                  gravity="face"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl font-serif font-bold text-navy">
                Our Story
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                With over 10 years as a licensed captain and 8 years dedicated to sea burial services,
                I founded Water & Ash Burials to provide families with a meaningful alternative to
                traditional burial options.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                After years of working in the industry, I saw an opportunity to create something
                different - a service that truly puts families first, where every ceremony is a
                genuine celebration of life rather than just another transaction.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                In partnership with Lance, who provides our beautiful vessels, we've created a
                service that combines maritime expertise with heartfelt compassion. Together,
                we're honored to help families say goodbye in a way that feels meaningful and
                personal.
              </p>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section className="bg-cream">
        <Container>
          <FadeIn className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-navy">
              Our Heart-Centered Mission
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We believe that saying goodbye to a loved one should be as beautiful and
              unique as their life. Our mission is to create curated experiences that
              celebrate life - with music, flowers, candles, and personal touches that
              make each ceremony special.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Celebration of Life',
                description: 'We focus on joy and remembrance, not sorrow. Each ceremony celebrates the beautiful life lived.',
              },
              {
                icon: Anchor,
                title: 'Maritime Excellence',
                description: 'Professional, experienced captains who treat every family with respect and care.',
              },
              {
                icon: Star,
                title: 'Personal Touch',
                description: 'Music playlists, flower arrangements, and ceremony elements tailored to your wishes.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-4">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-navy">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Sea Burial */}
      <Section>
        <Container size="narrow">
          <FadeIn>
            <h2 className="text-3xl font-serif font-bold text-navy text-center">
              Why Choose a Sea Burial?
            </h2>
            <div className="mt-8 prose prose-lg max-w-none text-muted-foreground">
              <p>
                For many families, the ocean holds special meaning. Whether your loved one was a
                sailor, surfer, fisherman, or simply found peace by the water, a sea burial offers
                a natural and beautiful way to honor their memory.
              </p>
              <p>
                Unlike traditional cemetery burials, a sea burial returns your loved one to nature
                in a way that many find deeply meaningful. The vast Pacific Ocean becomes a place
                of remembrance - somewhere you can visit anytime, feeling connected to the person
                you've lost.
              </p>
              <p>
                Our ceremonies take place 3+ nautical miles offshore in full compliance with EPA
                regulations. We handle all required reporting, so you can focus on what matters
                most: honoring your loved one.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-navy">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-white">
              Let Us Help You Honor Your Loved One
            </h2>
            <p className="mt-4 text-white/80">
              Contact us for a compassionate consultation about how we can create a
              meaningful celebration of life.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="gold">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
```

**Verification:**
- [ ] About page renders all sections
- [ ] Story section displays correctly
- [ ] Mission values are clear
- [ ] CTA links to contact page

---

#### Task 5.2: Create Contact Page
**Type:** Page
**Requirement:** WEB-11

**File: `app/contact/page.tsx`**
```typescript
import { Metadata } from 'next'
import { Container, Section } from '@/components/layout/container'
import { ContactForm } from '@/components/forms/contact-form'
import { FadeIn } from '@/components/animations/motion-primitives'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Water & Ash Burials to discuss sea burial services in San Diego. We respond within 4 hours during business hours.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-navy">
        <Container>
          <FadeIn className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-white/80">
              We understand this is a difficult time. Reach out when you're ready,
              and we'll be here to help.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Contact Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <FadeIn>
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-serif font-bold text-navy mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-navy">
                    Get in Touch
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    We're here to answer your questions and help you plan a meaningful
                    celebration of life for your loved one.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-navy">Phone</h3>
                      <a
                        href="tel:619-928-9160"
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        619-928-9160
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Call us anytime. Leave a message if we miss you.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-navy">Email</h3>
                      <a
                        href="mailto:info@waterandashburials.org"
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        info@waterandashburials.org
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We respond within 4 hours during business hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-navy">Location</h3>
                      <p className="text-muted-foreground">San Diego, California</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ceremonies depart from San Diego Harbor.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-gold" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-navy">Hours</h3>
                      <p className="text-muted-foreground">Monday - Sunday</p>
                      <p className="text-muted-foreground">8:00 AM - 6:00 PM Pacific</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We understand arrangements can't always wait.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="p-6 bg-cream rounded-lg">
                  <p className="text-navy font-medium">
                    We're here to help, not sell.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Take your time. There's no pressure to make any decisions right away.
                    We're simply here to answer your questions and provide information
                    about our services.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  )
}
```

**Verification:**
- [ ] Contact page renders with form and info
- [ ] Form submits successfully
- [ ] Contact information is correct

---

#### Task 5.3: Create Give-Back Page
**Type:** Page
**Requirement:** WEB-12

**File: `app/give-back/page.tsx`**
```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animations/motion-primitives'
import { Heart, Users, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Give-Back Program',
  description: 'Our give-back program provides free sea burial services to families who cannot afford them. Every premium ceremony helps make this possible.',
}

export default function GiveBackPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-navy">
        <Container>
          <FadeIn className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              Our Give-Back Program
            </h1>
            <p className="mt-6 text-xl text-white/80">
              No family should be denied a meaningful memorial due to financial circumstances.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Main Content */}
      <Section>
        <Container size="narrow">
          <FadeIn>
            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-muted-foreground">
                At Water & Ash Burials, we believe that every person deserves a dignified
                and meaningful farewell, regardless of their family's financial situation.
              </p>

              <h2 className="font-serif text-navy">How It Works</h2>
              <p>
                For every premium ceremony we conduct, we set aside resources to provide
                free sea burial services to families who cannot afford them. These services
                are identical to our paid offerings - the same vessels, the same care, the
                same respect.
              </p>

              <h2 className="font-serif text-navy">Why We Do This</h2>
              <p>
                We started Water & Ash Burials because we believe in the healing power of
                meaningful memorials. Financial hardship often accompanies loss - medical
                bills, unexpected expenses, lost income. We don't want the cost of a ceremony
                to add to that burden.
              </p>

              <h2 className="font-serif text-navy">For Families in Need</h2>
              <p>
                If you or someone you know is facing financial hardship and would like to
                learn more about our give-back program, please contact us. We handle every
                inquiry with compassion and discretion.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section className="bg-cream">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-navy">
              Every Ceremony Makes a Difference
            </h2>
            <p className="mt-4 text-muted-foreground">
              When you choose Water & Ash for your family's ceremony, you're not just
              honoring your loved one - you're helping another family do the same.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Heart-Centered',
                description: 'Built on the belief that compassion should guide everything we do.',
              },
              {
                icon: Users,
                title: 'Community Focused',
                description: 'Serving our San Diego community with dignity and respect.',
              },
              {
                icon: Sparkles,
                title: 'Equal Service',
                description: 'Give-back families receive the exact same ceremony experience.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-4">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-navy">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-white">
              Learn More About Our Program
            </h2>
            <p className="mt-4 text-white/80">
              Whether you're interested in our services or learning about the give-back
              program, we're here to help.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="gold">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
```

**Verification:**
- [ ] Give-back page renders correctly
- [ ] Content communicates program clearly
- [ ] CTA links to contact page

---

#### Task 5.4: Create Privacy Policy Page
**Type:** Page
**Requirement:** S1

**File: `app/privacy/page.tsx`**
```typescript
import { Metadata } from 'next'
import { Container, Section } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Water & Ash Burials website and services.',
}

export default function PrivacyPage() {
  return (
    <Section>
      <Container size="narrow">
        <h1 className="text-4xl font-serif font-bold text-navy">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: January 2026</p>

        <div className="mt-8 prose prose-lg max-w-none text-muted-foreground">
          <h2 className="font-serif text-navy">Introduction</h2>
          <p>
            Water & Ash Burials ("we," "our," or "us") respects your privacy and is
            committed to protecting your personal information. This Privacy Policy
            explains how we collect, use, and protect your information when you use
            our website and services.
          </p>

          <h2 className="font-serif text-navy">Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Service preferences and ceremony details</li>
            <li>Communications you send to us</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li>Device and browser information</li>
            <li>IP address and general location</li>
            <li>Website usage data (pages visited, time spent)</li>
          </ul>

          <h2 className="font-serif text-navy">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and coordinate sea burial services</li>
            <li>Communicate with you about your ceremony</li>
            <li>Send service confirmations and updates</li>
            <li>Comply with legal obligations (including EPA reporting requirements)</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="font-serif text-navy">Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>
              <strong>EPA (Environmental Protection Agency):</strong> As required by
              federal law, we report all burials at sea to the EPA within 30 days.
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party services that help us
              operate our business (email services, payment processors).
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect
              our rights.
            </li>
          </ul>
          <p>
            We do not sell your personal information to third parties for marketing
            purposes.
          </p>

          <h2 className="font-serif text-navy">Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide
            our services and comply with legal obligations. Service records are kept
            for 7 years in accordance with IRS requirements.
          </p>

          <h2 className="font-serif text-navy">Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="font-serif text-navy">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information, including SSL/TLS encryption for data transmission and
            secure storage practices.
          </p>

          <h2 className="font-serif text-navy">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your
            rights, please contact us:
          </p>
          <ul>
            <li>Email: info@waterandashburials.org</li>
            <li>Phone: 619-928-9160</li>
          </ul>

          <h2 className="font-serif text-navy">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you
            of any material changes by posting the new policy on this page.
          </p>
        </div>
      </Container>
    </Section>
  )
}
```

**Verification:**
- [ ] Privacy page renders correctly
- [ ] All required sections present
- [ ] Contact information accurate

---

#### Task 5.5: Create Thank You Page
**Type:** Page
**Requirement:** WEB-11

**File: `app/thank-you/page.tsx`**
```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animations/motion-primitives'
import { CheckCircle, Phone, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Water & Ash Burials. We will be in touch soon.',
}

export default function ThankYouPage() {
  return (
    <Section className="min-h-[60vh] flex items-center">
      <Container size="narrow">
        <FadeIn className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 text-gold mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy">
            Thank You for Reaching Out
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
            We understand this is a difficult time, and we appreciate you trusting us
            with your inquiry. A member of our team will be in touch soon.
          </p>

          <div className="mt-8 p-6 bg-cream rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-navy">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Response Time</span>
            </div>
            <p className="mt-2 text-muted-foreground">
              We typically respond within 4 hours during business hours
              (Monday-Sunday, 8am-6pm Pacific).
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-muted-foreground">
              Need to speak with someone sooner?
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="tel:619-928-9160">
                <Phone className="h-4 w-4 mr-2" />
                Call 619-928-9160
              </Link>
            </Button>
          </div>

          <div className="mt-12">
            <Button asChild variant="ghost">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
```

**Verification:**
- [ ] Thank you page displays after form submission
- [ ] Message is compassionate and clear
- [ ] Phone number link works

---

### Wave 6: Integration and Polish (Sequential after Wave 5)

#### Task 6.1: SEO Optimization
**Type:** Enhancement
**Requirement:** SEO-01

**Steps:**
1. Add unique metadata to all pages
2. Create sitemap
3. Add robots.txt
4. Verify Open Graph images

**File: `app/sitemap.ts`**
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://waterandashburials.org'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services/osprey`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/white-nights`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/relentless`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/at-home`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/give-back`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
```

**File: `app/robots.ts`**
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: 'https://waterandashburials.org/sitemap.xml',
  }
}
```

**Verification:**
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] All pages have unique titles and descriptions

---

#### Task 6.2: Performance Optimization
**Type:** Enhancement
**Requirement:** WEB-02

**Steps:**
1. Audit Lighthouse scores
2. Optimize images (already via Cloudinary)
3. Ensure fonts don't block render
4. Add loading states where needed

**Performance Checklist:**
- [ ] Hero images have `priority` attribute
- [ ] Below-fold images lazy load
- [ ] Fonts use `display: swap`
- [ ] No unused JavaScript
- [ ] CSS is optimized via Tailwind

**Target Metrics:**
- Lighthouse Performance: 90+
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

**Verification:**
- [ ] Run Lighthouse on homepage (mobile)
- [ ] Run Lighthouse on service page (mobile)
- [ ] All Core Web Vitals pass

---

#### Task 6.3: Mobile Testing and Polish
**Type:** Testing
**Requirement:** WEB-02

**Steps:**
1. Test all pages on mobile devices
2. Verify touch targets are 44px minimum
3. Test form submission on mobile
4. Verify navigation works smoothly

**Testing Checklist:**
- [ ] iPhone Safari: Homepage, Service page, Contact form
- [ ] Android Chrome: Homepage, Service page, Contact form
- [ ] Test on slow 3G network (Chrome DevTools)
- [ ] Verify no horizontal scroll issues
- [ ] Verify text is readable without zoom

**Verification:**
- [ ] All pages work on iOS Safari
- [ ] All pages work on Android Chrome
- [ ] Contact form submits successfully on mobile

---

#### Task 6.4: Final Content Review
**Type:** Review
**Requirement:** WEB-03

**Steps:**
1. Review all copy for grief-sensitivity
2. Verify pricing is accurate
3. Confirm contact information
4. Check all links work

**Content Checklist:**
- [ ] No aggressive CTAs ("Buy Now", "Limited Time")
- [ ] Clear, direct language (no euphemisms)
- [ ] Reassuring copy present ("Take your time")
- [ ] All prices match ($2,000 / $400)
- [ ] Phone: 619-928-9160
- [ ] Email: info@waterandashburials.org

**Verification:**
- [ ] Content reviewed by stakeholder
- [ ] All broken links fixed
- [ ] 404 page exists and is styled

---

## Success Criteria

### Performance
- [ ] Lighthouse mobile score: 90+ Performance
- [ ] Largest Contentful Paint: < 2.5 seconds
- [ ] First Input Delay: < 100ms
- [ ] Cumulative Layout Shift: < 0.1

### Functionality
- [ ] All 8 pages deployed and functional
- [ ] Contact form working with email notification
- [ ] Navigation works on desktop and mobile
- [ ] All links functional (no 404s)

### Design
- [ ] Premium aesthetic with navy/gold/white palette
- [ ] Real vessel photos (not stock photos)
- [ ] Consistent typography (Inter + Playfair Display)
- [ ] Mobile-responsive at all breakpoints

### Content
- [ ] Grief-sensitive language throughout
- [ ] One primary CTA per page
- [ ] Transparent pricing displayed
- [ ] Contact information accurate

### Demo Readiness (Vegas Convention)
- [ ] Homepage loads flawlessly
- [ ] Service pages demonstrate vessels
- [ ] Contact form works end-to-end
- [ ] Give-back page highlights differentiator
- [ ] Fast load times (< 2s on WiFi)

---

## Dependencies

### External Dependencies
| Dependency | Status | Notes |
|------------|--------|-------|
| Cloudinary account | Required | For vessel photography hosting |
| Resend API key | Required | For email notifications |
| Vercel project | Required | For deployment and HTTPS |
| Professional vessel photos | Required | Existing photos from current site |

### What Phase 02 Needs from Phase 01
- Completed design system (colors, typography, components)
- Working form infrastructure (can extend for landing pages)
- Component library (ServiceCard, VesselPage template)
- Cloudinary integration configured
- Email notification system (will add CRM sync)

### What Phase 03 Needs from Phase 01
- Contact form ready for CRM integration
- Form validation patterns established
- API route structure defined

---

## File Structure Summary

```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout
├── globals.css                 # Tailwind + theme
├── fonts.ts                    # Font configuration
├── sitemap.ts                  # SEO sitemap
├── robots.ts                   # SEO robots.txt
├── about/page.tsx              # About page
├── contact/page.tsx            # Contact page
├── give-back/page.tsx          # Give-back page
├── privacy/page.tsx            # Privacy policy
├── thank-you/page.tsx          # Form success page
├── api/
│   └── contact/route.ts        # Contact form API
└── services/
    ├── osprey/page.tsx         # The Osprey
    ├── white-nights/page.tsx   # White Nights
    ├── relentless/page.tsx     # Relentless
    └── at-home/page.tsx        # At-Home Memorial

components/
├── ui/                         # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   └── ...
├── layout/
│   ├── header.tsx              # Site header + nav
│   ├── footer.tsx              # Site footer
│   └── container.tsx           # Layout containers
├── home/
│   ├── hero.tsx                # Homepage hero
│   ├── services-grid.tsx       # Services overview
│   ├── trust-section.tsx       # Trust indicators
│   └── cta-section.tsx         # Call to action
├── services/
│   ├── service-card.tsx        # Service card component
│   └── vessel-page.tsx         # Service page template
├── forms/
│   └── contact-form.tsx        # Contact form
├── animations/
│   └── motion-primitives.tsx   # Framer Motion wrappers
├── cloudinary-image.tsx        # Cloudinary image wrapper
└── structured-data.tsx         # JSON-LD schemas

lib/
├── utils.ts                    # Utility functions
└── validations/
    └── contact.ts              # Zod schemas
```

---

## Estimated Timeline

| Wave | Tasks | Duration | Dependencies |
|------|-------|----------|--------------|
| Wave 1 | Project Setup | 1 day | None |
| Wave 2 | Layout Components | 1 day | Wave 1 |
| Wave 3 | Design System Components | 1 day | Wave 2 |
| Wave 4 | Core Pages | 2 days | Wave 3 |
| Wave 5 | Remaining Pages | 1 day | Wave 4 |
| Wave 6 | Integration & Polish | 1 day | Wave 5 |

**Total:** 7 days (5 working days + buffer)

---

*Plan created: 2026-01-27*
*Ready for execution by development team*
