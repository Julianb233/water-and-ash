# Phase 01 Research: Foundation & Core Pages

**Phase:** 01 - Foundation & Core Pages
**Duration:** Week 1-2 (February 2026)
**Research Date:** 2026-01-27
**Researcher:** Claude (GSD Phase Researcher Agent)

---

## Executive Summary

Phase 01 establishes the foundation for Water & Ash Burials' premium website: a Next.js 16 application with Tailwind CSS v4, shadcn/ui components, and Cloudinary image management. This phase delivers 8 public-facing pages (homepage, 4 service pages, about, contact, give-back) with a grief-sensitive design system emphasizing navy/gold/white luxury aesthetics and mobile-first responsive design.

**Critical Success Factors:**
1. **Grief-sensitive UX** - One primary CTA per page, clear language, no aggressive tactics
2. **Mobile performance** - Lighthouse 90+ score, LCP < 2.5s (60%+ of traffic is mobile)
3. **Premium aesthetic** - Professional vessel photography, sophisticated typography, no stock photos
4. **Demo readiness** - Homepage and service pages flawless for Vegas convention (end of February)
5. **Foundation for integration** - Forms structured for Phase 02 GoHighLevel integration

**Key Risks:**
- Mobile performance degradation from large images → Mitigate with Cloudinary optimization
- Budget aesthetic from template design → Mitigate with custom design system and real photos
- Complex forms reducing conversion → Mitigate with minimal initial contact form

---

## What You Need to Know to PLAN This Phase Well

### 1. Technical Foundation Decisions

#### Next.js 16 with App Router

**Why Next.js 16:**
- Turbopack as default bundler: 5-10x faster Fast Refresh, critical for rapid iteration toward Vegas deadline
- React Server Components (RSC) stable: Perfect for SEO-critical service pages
- Server Actions eliminate API routes for form handling (cleaner architecture)
- Built-in image optimization for vessel photography
- File-based routing simplifies 8-page structure

**App Router Structure:**
```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout with nav/footer
├── about/page.tsx              # About page
├── contact/page.tsx            # Contact page
├── give-back/page.tsx          # Give-back program
├── privacy/page.tsx            # Privacy policy
└── services/
    ├── page.tsx                # Services overview (optional)
    ├── osprey/page.tsx         # The Osprey service page
    ├── white-nights/page.tsx   # White Nights service page
    ├── relentless/page.tsx     # Relentless service page
    └── at-home/page.tsx        # At-Home Memorial service page
```

**Why NOT alternatives:**
- Remix: Lacks GoHighLevel integration community examples
- Gatsby: Build times don't scale for CRM-connected pages
- Next.js 15: Version 16 is stable with Turbopack default (better DX)

**Installation command:**
```bash
npx create-next-app@latest water-and-ash --typescript --tailwind --app --use-npm
cd water-and-ash
git init
git add .
git commit -m "Initial Next.js 16 setup"
```

#### Tailwind CSS v4.1

**Why Tailwind v4:**
- 5x faster full builds, 100x faster incremental builds (critical for rapid iteration)
- Automatic content detection (zero config)
- Cascade layers and color-mix() for premium color palette (navy/gold/white)
- Mobile-first responsive design built-in

**Configuration approach:**
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-navy: oklch(0.25 0.05 250);
  --color-gold: oklch(0.75 0.15 80);
  --color-white: oklch(1 0 0);

  /* Typography scale */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
}
```

**Custom design tokens needed:**
- Navy primary: Deep navy blue for trust and maritime theme
- Gold accent: Warm metallic gold for premium feel
- White base: Clean backgrounds and negative space
- Maximum 2 font families: Sans-serif for UI, serif for elegance

#### shadcn/ui Component Library

**Why shadcn/ui:**
- Component library (not dependency) - full control over styling
- Built on Radix UI (accessibility out of box)
- Tailwind-native styling matches premium design
- Easy to customize for luxury aesthetic

**Core components for Phase 01:**
```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add separator
npx shadcn@latest add accordion
```

**Component usage:**
- Button: CTAs like "Contact Us" or "Learn More" (NOT "Book Now" until Phase 04)
- Card: Vessel showcase cards on homepage
- Form: Contact form (Phase 01 basic version, enhanced in Phase 02)
- Separator: Visual hierarchy between sections
- Accordion: FAQ section if included

#### Cloudinary Image Management

**Why Cloudinary:**
- Automatic format optimization (WebP, AVIF) for mobile performance
- Responsive image sizing (critical for vessel photos)
- Dynamic cropping and focal point detection
- CDN delivery for fast global access
- Next.js Image component integration via `CldImage`

**Asset organization strategy:**
```
water-ash/
  vessels/
    osprey-hero.jpg         # Hero image for The Osprey page
    osprey-gallery-1.jpg    # Gallery images
    osprey-gallery-2.jpg
    white-nights-hero.jpg
    white-nights-gallery-1.jpg
    relentless-hero.jpg
    relentless-gallery-1.jpg
  ceremonies/
    ceremony-joy-1.jpg      # Celebration-of-life positioning photos
    ceremony-joy-2.jpg
  logos/
    logo-white.png          # Logo variations for different backgrounds
    logo-gold.png
    logo-navy.png
```

**Image requirements:**
- Professional photography of actual vessels (NOT stock photos)
- Minimum 2000px width for hero images
- Show celebration-of-life positioning (joy, connection, not dark/somber)
- Include vessel interiors, ceremony space, families celebrating

**Critical:** If professional vessel photos don't exist, this is a Phase 01 blocker. Must shoot or source before development begins.

---

### 2. Design System Requirements

#### Grief-Sensitive UX Principles

**Research finding:** Bereaved visitors have limited cognitive bandwidth and cannot process complex information architecture. 70%+ form abandonment occurs with more than 5 required fields.

**Design rules for Phase 01:**

1. **One primary CTA per page:**
   - Homepage: "Contact Us" or "Learn About Our Services"
   - Service pages: "Contact Us" (NOT "Book Now" until payment integration in Phase 04)
   - About page: "Get in Touch"
   - Give-back page: "Support Our Mission"

2. **Clear, direct language (not euphemisms):**
   - Use "sea burial ceremony" not "eternal ocean resting place"
   - Use "celebration of life" not "celebration package"
   - Use "pricing" not "investment options"

3. **Minimal navigation:**
   ```
   Navigation structure (max 6 items):
   - Home
   - Services (dropdown: Osprey, White Nights, Relentless, At-Home)
   - About
   - Give-Back Program
   - Contact
   ```

4. **Reassuring copy patterns:**
   - "Take your time" on contact form
   - "We understand this is a difficult time" in acknowledgments
   - "No obligation consultation" to reduce pressure
   - "Available 7 days a week" for accessibility

5. **Minimal form fields (Phase 01 contact form):**
   ```
   Required fields ONLY:
   - Name (single field, not split)
   - Email OR Phone (at least one)
   - Brief message (optional but encouraged)

   Total: 3-4 fields maximum
   ```

**Anti-patterns to AVOID:**
- Multiple competing CTAs (confusing)
- Auto-playing videos or music (jarring)
- Aggressive popups (disrespectful)
- "Buy Now" or "Limited Time" language (insensitive)
- More than 3 navigation levels (overwhelming)

#### Premium Aesthetic Requirements

**Research finding:** Budget aesthetics (stock photos, template designs, 3+ fonts) destroy premium perception. If website feels budget, customers expect budget pricing and balk at $2,000 price point.

**Premium design checklist:**

1. **Color palette (strictly navy/gold/white):**
   ```css
   /* Primary colors */
   --navy: #1a2332 (or oklch equivalent)
   --gold: #d4af37
   --white: #ffffff

   /* Semantic colors */
   --text-primary: var(--navy)
   --text-secondary: rgba(26, 35, 50, 0.7)
   --accent: var(--gold)
   --background: var(--white)
   ```

2. **Typography system (max 2 font families):**
   ```
   Sans-serif (UI): Inter Variable or similar
   - Headings: 600-700 weight
   - Body: 400-500 weight
   - Minimum 16px base size

   Serif (elegance): Playfair Display or similar
   - Used sparingly for section headers
   - Adds sophistication without overwhelming
   ```

3. **White space philosophy:**
   - Generous padding/margins (60-80px between sections on desktop)
   - Uncluttered layouts (premium = breathing room)
   - Focus on one key message per viewport height

4. **Image quality standards:**
   - Professional photography ONLY (no stock photos)
   - High resolution (2x retina displays)
   - Optimized for web (Cloudinary handles this)
   - Show real vessels, real ceremonies (with consent)

5. **CTA styling (sophisticated, not loud):**
   ```tsx
   // Example button component usage
   <Button variant="default" size="lg">
     Contact Us
   </Button>

   // Styling: Navy background, white text, gold hover accent
   // NOT: Neon green, flashing, "BOOK NOW!!!"
   ```

#### Mobile-First Responsive Design

**Research finding:** 60%+ of memorial service website traffic is mobile. Families coordinate on smartphones at hospitals, hospice facilities, or during crisis moments. Slow mobile sites (LCP > 2.5s) lose clients.

**Mobile performance targets:**
- Lighthouse Performance: 90+ on mobile
- Largest Contentful Paint (LCP): < 2.5 seconds
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Mobile-first implementation strategy:**

1. **Responsive images:**
   ```tsx
   // Use CldImage with responsive sizing
   <CldImage
     src="water-ash/vessels/osprey-hero"
     width={1200}
     height={800}
     alt="The Osprey - 62-foot Sport Fishing Vessel"
     crop="fill"
     gravity="auto"
     quality="auto"
     format="auto"
     sizes="(max-width: 768px) 100vw, 1200px"
   />
   ```

2. **Mobile navigation:**
   - Hamburger menu (44x44px touch target minimum)
   - Clear, tappable links (no hover-only interactions)
   - Sticky header optional (consider UX vs performance trade-off)

3. **Touch targets:**
   - Minimum 44x44px for all interactive elements
   - Adequate spacing between links (8px minimum)
   - Large, easy-to-tap CTAs

4. **Typography scale:**
   ```css
   /* Mobile-first sizing */
   --text-base: 16px;      /* Never below 16px (prevents zoom) */
   --text-lg: 18px;
   --text-xl: 24px;
   --text-2xl: 32px;

   /* Desktop enhancement */
   @media (min-width: 768px) {
     --text-base: 18px;
     --text-2xl: 48px;
   }
   ```

5. **Lazy loading strategy:**
   ```tsx
   // Hero image: eager load
   <CldImage ... loading="eager" priority />

   // Below-the-fold images: lazy load
   <CldImage ... loading="lazy" />
   ```

**Testing requirements:**
- Test on actual devices (iPhone, Android) not just browser simulators
- Test on 3G/4G networks (not just WiFi)
- Use Lighthouse CI in build process

---

### 3. Page-Specific Requirements

#### Homepage Requirements

**Purpose:** Establish premium positioning, build trust, guide to service pages or contact.

**Above-the-fold (hero section):**
- Headline: "Celebrate Life on the Pacific" or similar (celebration positioning)
- Subheadline: "Premium sea burial ceremonies in San Diego with heart-centered service"
- Hero image: One of the vessels in beautiful ocean setting
- Primary CTA: "Contact Us" or "Learn About Our Services"
- Trust indicator: "10 years as captain, 8 years serving families"

**Services overview section:**
- Grid of 4 service cards (Osprey, White Nights, Relentless, At-Home)
- Each card: Vessel photo, name, brief description (1-2 sentences), capacity, starting price
- CTA on each card: "Learn More" → links to service detail page

**Trust indicators section:**
- Give-back program mention (differentiator)
- Captain credentials
- Service area (San Diego coastal)
- Optional: Testimonial quote (if available)

**Design notes:**
- Avoid dark/somber funeral home aesthetics
- Show joy and celebration in imagery
- White space and sophistication over information density

#### Service Page Requirements (4 pages total)

**Pages needed:**
1. The Osprey (62-foot Striker) - $2,000
2. White Nights (58-foot Hatteras) - $2,000
3. Relentless (45-foot Bali catamaran) - $2,000
4. At-Home Memorial (mail-in service) - $400

**Page structure (consistent across all 4):**

1. **Hero section:**
   - Vessel name as H1
   - Hero image of vessel
   - Key specs (length, capacity, price)

2. **Vessel description:**
   - Physical description (layout, amenities)
   - Ceremony space details
   - Capacity: passenger count
   - What makes this vessel special

3. **Photo gallery:**
   - 4-6 images showing:
     - Exterior vessel
     - Interior ceremony space
     - Families celebrating (if available with consent)
     - San Diego coastline backdrop

4. **Service details:**
   - Ceremony duration (typically 2 hours)
   - What's included:
     - Professional captain and crew
     - Music system (families can provide playlist)
     - Flowers available (optional upgrade)
     - EPA reporting compliance
   - Departure location
   - Minimum distance offshore (3+ nautical miles)

5. **Pricing transparency:**
   ```
   Starting at $2,000 (or $400 for At-Home)
   - Base ceremony
   - Up to [X] passengers
   - 2-hour experience

   Additional options:
   - Professional photography (+$X)
   - Premium floral arrangements (+$X)
   - Custom ceremony elements (pricing on consultation)
   ```

6. **CTA section:**
   - "Contact Us to Schedule Your Ceremony"
   - Brief contact form (name, email, phone, message)
   - Phone number prominently displayed
   - "Available 7 days a week"

**At-Home Memorial page differences:**
- Emphasize mail-in process
- Explain video and GPS coordinates delivery
- Clarify timeline (typically 2-4 weeks)
- Show how ashes are handled with care and respect

**Design considerations:**
- Each vessel should have distinct personality through photos
- Emphasize celebration-of-life (not somber funeral)
- Clear pricing reduces friction (FTC pushing transparency)
- Form captures initial interest (full booking in Phase 04)

#### About Page Requirements

**Purpose:** Build trust, establish heart-centered mission, differentiate from competitors.

**Required content sections:**

1. **Company story:**
   - Owner's background: 10 years as captain, 8 years in burial space
   - Breaking off from competitors to start own business
   - Partner Lance provides vessels
   - San Diego maritime heritage

2. **Heart-centered mission:**
   - "Celebration of life" vs traditional funeral positioning
   - Curated experience: music, candles, flowers, TV slideshows
   - Spiritual approach (not religious, but meaningful)
   - Families as priority over transactions

3. **Why sea burial:**
   - Connection to ocean
   - Environmental considerations
   - Alternative to traditional cemetery
   - Peace and beauty of Pacific

4. **Captain credentials:**
   - Licensed captain
   - Years of experience
   - Safety record
   - Personal commitment to families

5. **CTA:**
   - "Learn About Our Services" → link to services
   - "Contact Us" → link to contact page

**Tone guidelines:**
- Warm, personal, authentic
- Use first person ("I've been a captain for 10 years") if owner-written
- Avoid corporate jargon
- Show passion for service, not just business

#### Contact Page Requirements

**Purpose:** Minimize friction for initial contact, capture basic info for Phase 02 CRM sync.

**Page structure:**

1. **Contact form (minimal fields):**
   ```
   Fields:
   - Name (required)
   - Email (required)
   - Phone (required)
   - Preferred service (dropdown: Osprey, White Nights, Relentless, At-Home, Not sure)
   - Message (optional but encouraged)

   Submit button: "Send Message"
   Help text: "We'll respond within 4 hours during business hours"
   ```

2. **Direct contact information:**
   ```
   Phone: 619-928-9160
   Email: info@waterandashburials.org

   Business hours:
   Monday-Sunday, 8am-6pm Pacific
   (We understand arrangements can't wait -
    leave a message anytime and we'll respond promptly)
   ```

3. **Form submission behavior (Phase 01):**
   - Client-side validation with Zod
   - Success: Redirect to thank-you page with "We'll be in touch soon"
   - Email notification sent to owner (simple Resend integration)
   - Phase 02 will add GoHighLevel CRM sync

4. **Optional elements:**
   - Service area map (San Diego coastal areas)
   - FAQ section (common questions)

**Form validation rules:**
```typescript
// Zod schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^\d{10}$/, "10-digit phone required"),
  service: z.enum(["osprey", "white-nights", "relentless", "at-home", "not-sure"]),
  message: z.string().optional()
})
```

#### Give-Back Program Page Requirements

**Purpose:** Differentiate from competitors, appeal to values-driven buyers, establish heart-centered mission.

**Required content:**

1. **Program overview:**
   - For every premium ceremony, Water & Ash provides free services to families who can't afford
   - Heart-centered commitment to serve all families
   - No family should be denied meaningful memorial due to cost

2. **How it works:**
   - Premium ceremonies fund give-back services
   - Families in need can apply or be referred
   - Same vessels, same care, no distinction in service quality

3. **Impact storytelling (if available):**
   - Number of families served (if tracking)
   - Testimonials from give-back recipients (with permission)
   - Photos showing joy regardless of payment status

4. **CTA:**
   - For families in need: "Contact Us to Learn More"
   - For supporters: "Every Premium Ceremony Makes This Possible"

**Tone:**
- Compassionate but not pitying
- Celebrate ability to serve all families
- Avoid "charity" language (feels condescending)
- Use "give-back program" or "community service"

**Competitive advantage:**
- Research shows NO San Diego sea burial competitors offer this
- Unique differentiator in Vegas convention demo
- Appeals to funeral homes (shows values alignment)

#### Privacy Policy Page Requirements

**Purpose:** Legal requirement for data collection, establish trust.

**Required sections:**

1. **What data is collected:**
   - Contact information (name, email, phone)
   - Service preferences
   - Form submission metadata (IP, timestamp)

2. **How data is used:**
   - Service delivery (ceremony coordination)
   - Follow-up communication
   - Internal records
   - EPA reporting compliance (legal obligation)

3. **Third-party sharing:**
   - EPA reporting (legal requirement)
   - Payment processor (Stripe, in Phase 04)
   - CRM (GoHighLevel, in Phase 02)
   - No marketing/selling of data

4. **Data retention:**
   - 7 years per IRS requirements
   - Customer can request copy or deletion (with exceptions for legal obligations)

5. **Security:**
   - SSL/TLS encryption
   - Secure storage
   - Access controls

**Implementation:**
- Use standard privacy policy template
- Customize for memorial service specifics
- Link from footer on all pages
- Update when Phase 02/04 add integrations

---

### 4. Technical Implementation Details

#### Component Architecture

**Recommended component structure:**

```
components/
├── ui/                     # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   └── ...
├── layout/
│   ├── header.tsx          # Site navigation
│   ├── footer.tsx          # Footer with links
│   └── container.tsx       # Max-width wrapper
├── home/
│   ├── hero.tsx            # Homepage hero section
│   ├── services-grid.tsx   # 4 service cards
│   └── trust-section.tsx   # Trust indicators
├── services/
│   ├── vessel-hero.tsx     # Service page hero
│   ├── photo-gallery.tsx   # Vessel photos
│   └── pricing-card.tsx    # Pricing display
└── forms/
    └── contact-form.tsx    # Contact form component
```

**Server vs Client Components:**

```tsx
// Server Components (default):
// - All page.tsx files
// - Layout components (header, footer)
// - Static content sections (hero, about text)

// Client Components (explicit 'use client'):
// - Contact form (needs interactivity)
// - Navigation menu (mobile hamburger)
// - Photo gallery (if interactive)
// - Any component with useState, useEffect, event handlers
```

#### Form Implementation Pattern

**Contact form with React Hook Form + Zod:**

```tsx
// app/contact/page.tsx (Server Component)
import ContactForm from '@/components/forms/contact-form'

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Water & Ash Burials</h1>
      <ContactForm />
    </div>
  )
}
```

```tsx
// components/forms/contact-form.tsx (Client Component)
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^\d{10}$/, "10-digit phone required"),
  service: z.enum(["osprey", "white-nights", "relentless", "at-home", "not-sure"]),
  message: z.string().optional()
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "not-sure",
      message: ""
    }
  })

  async function onSubmit(data: ContactFormValues) {
    // Phase 01: Simple email notification
    // Phase 02: Add GoHighLevel CRM sync
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      // Redirect to thank-you page
      window.location.href = '/thank-you'
    } else {
      // Show error message
      alert('Something went wrong. Please call us at 619-928-9160')
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

        {/* Similar fields for email, phone, service, message */}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        <p className="text-sm text-gray-600">
          We'll respond within 4 hours during business hours
        </p>
      </form>
    </Form>
  )
}
```

**API route for form submission (Phase 01 simple version):**

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()

  // Validate (redundant but good practice)
  if (!body.name || !body.email || !body.phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Send email notification to owner
  await resend.emails.send({
    from: 'Water & Ash Contact Form <noreply@waterandashburials.org>',
    to: 'info@waterandashburials.org',
    subject: `New Contact Form Submission: ${body.service}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Service Interest:</strong> ${body.service}</p>
      <p><strong>Message:</strong> ${body.message || 'N/A'}</p>
    `
  })

  return NextResponse.json({ success: true })
}
```

#### Image Optimization Strategy

**Cloudinary setup:**

```bash
npm install next-cloudinary
```

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig
```

**Image component usage:**

```tsx
// components/services/vessel-hero.tsx
'use client'

import { CldImage } from 'next-cloudinary'

interface VesselHeroProps {
  vesselName: string
  cloudinaryId: string
  capacity: number
  price: number
}

export default function VesselHero({ vesselName, cloudinaryId, capacity, price }: VesselHeroProps) {
  return (
    <div className="relative h-[60vh] w-full">
      <CldImage
        src={cloudinaryId}
        alt={`${vesselName} - Premium sea burial vessel`}
        fill
        crop="fill"
        gravity="auto"
        quality="auto"
        format="auto"
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end">
        <div className="container mx-auto px-4 py-12 text-white">
          <h1 className="text-5xl font-serif font-bold">{vesselName}</h1>
          <p className="text-xl mt-4">
            Up to {capacity} passengers · Starting at ${price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
```

#### Animation Implementation (Framer Motion)

**Install Framer Motion:**

```bash
npm install motion
```

**Subtle animations for premium feel:**

```tsx
// components/home/hero.tsx
'use client'

import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section className="relative h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-4 pt-32"
      >
        <h1 className="text-6xl font-serif font-bold text-navy">
          Celebrate Life on the Pacific
        </h1>
        <p className="text-xl text-navy/80 mt-6 max-w-2xl">
          Premium sea burial ceremonies in San Diego with heart-centered service
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8"
        >
          <Button size="lg">Contact Us</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

**Animation principles:**
- Subtle (300-600ms durations)
- Purposeful (guide attention, not distract)
- Performance-conscious (use transform/opacity, not layout properties)
- Respect prefers-reduced-motion

#### SEO Implementation (Next.js Metadata API)

**Page-level metadata:**

```typescript
// app/services/osprey/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Osprey - Luxury Sea Burial Vessel | Water & Ash Burials',
  description: '62-foot Striker sport fishing vessel for premium sea burial ceremonies in San Diego. Accommodates up to 13 passengers for a celebration of life on the ocean.',
  keywords: ['sea burial', 'San Diego', 'luxury memorial', 'ocean ceremony', 'The Osprey', 'celebration of life'],
  openGraph: {
    title: 'The Osprey - Luxury Sea Burial Vessel',
    description: 'Premium sea burial ceremonies on a 62-foot sport fishing vessel',
    images: [
      {
        url: 'https://res.cloudinary.com/water-ash/image/upload/v1/og-images/osprey.jpg',
        width: 1200,
        height: 630,
        alt: 'The Osprey vessel'
      }
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'Water & Ash Burials'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Osprey - Luxury Sea Burial Vessel',
    description: 'Premium sea burial ceremonies in San Diego',
    images: ['https://res.cloudinary.com/water-ash/image/upload/v1/og-images/osprey.jpg']
  },
  alternates: {
    canonical: 'https://waterandashburials.org/services/osprey'
  }
}

export default function OspreyPage() {
  return (
    // Page content
  )
}
```

**Structured data (JSON-LD):**

```tsx
// components/layout/structured-data.tsx
export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Water & Ash Burials',
          description: 'Premium sea burial services in San Diego',
          url: 'https://waterandashburials.org',
          telephone: '619-928-9160',
          email: 'info@waterandashburials.org',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Diego',
            addressRegion: 'CA',
            addressCountry: 'US'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '32.7157',
            longitude: '-117.1611'
          },
          priceRange: '$$$$',
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '18:00'
          }
        })
      }}
    />
  )
}
```

---

### 5. Critical Pitfalls to Avoid

#### Pitfall 1: Grief-Insensitive Design

**What goes wrong:** Overwhelming layouts, aggressive CTAs, or insensitive language traumatizes users who are already emotionally compromised.

**Prevention:**
- One primary action per page
- Clear, direct language (not euphemisms)
- No aggressive popups
- Reassuring copy ("Take your time", "No obligation")
- Test with grief counselors if possible

#### Pitfall 2: Mobile-First Failure

**What goes wrong:** High-resolution images and complex animations create 5+ second mobile load times. 96% of users have encountered non-optimized mobile sites and most leave after 5 seconds.

**Prevention:**
- Target Lighthouse 90+ on mobile
- Use Cloudinary for automatic optimization
- Lazy load below-the-fold images
- Test on actual devices with throttled network
- Mobile-first CSS (enhance for desktop, don't strip for mobile)

#### Pitfall 3: Budget Aesthetic

**What goes wrong:** Stock photos, template design, and inconsistent typography destroy premium perception. If website feels budget, customers expect budget pricing.

**Prevention:**
- Use ONLY actual vessel photos (no stock)
- Hire professional photographer if needed
- Strict navy/gold/white color palette
- Maximum 2 font families
- Generous white space

#### Pitfall 4: Complex Forms

**What goes wrong:** Forms with 5+ required fields see 70%+ abandonment. Grieving users have limited patience.

**Prevention:**
- Initial contact: 3-4 fields max (name, email, phone, brief message)
- Capture full details after relationship established (via CRM in Phase 02)
- Progressive disclosure strategy

#### Pitfall 5: Transactional Tone

**What goes wrong:** Corporate language contradicts "heart-centered" positioning. Automated emails reading like rental car confirmations destroy human connection.

**Prevention:**
- Eliminate corporate language (no "order", "transaction", "customer")
- Use "family", "service", "ceremony"
- Personal signatures ("With care, [Owner Name], Captain")
- Acknowledgment before logistics in all communications

---

### 6. Phase 01 Deliverables Checklist

**Technical foundation:**
- [ ] Next.js 16 project initialized with TypeScript
- [ ] Tailwind CSS v4 configured with custom theme
- [ ] shadcn/ui components installed and customized
- [ ] Cloudinary account setup and configured
- [ ] Vercel project created (or Railway/Render alternative)
- [ ] SSL certificate configured
- [ ] Environment variables documented

**Design system:**
- [ ] Navy/gold/white color palette implemented
- [ ] Typography system (max 2 font families)
- [ ] Component library (buttons, cards, forms) with premium styling
- [ ] Responsive breakpoints defined
- [ ] Animation primitives (Framer Motion) configured

**Core pages (8 total):**
- [ ] Homepage with hero, services grid, trust indicators
- [ ] The Osprey service page with photos, pricing, description
- [ ] White Nights service page
- [ ] Relentless service page
- [ ] At-Home Memorial service page
- [ ] About page with company story and mission
- [ ] Contact page with minimal form
- [ ] Give-back program page
- [ ] Privacy policy page

**Media integration:**
- [ ] Professional vessel photos uploaded to Cloudinary
- [ ] Ceremony photos (celebration-of-life positioning)
- [ ] Logo variations (white, gold, navy)
- [ ] All images optimized (WebP/AVIF, lazy loading)

**Forms:**
- [ ] Contact form with React Hook Form + Zod validation
- [ ] Form submission API route
- [ ] Email notification to owner (Resend integration)
- [ ] Thank-you page after submission
- [ ] Error handling and user feedback

**SEO:**
- [ ] Metadata API implementation on all pages
- [ ] Unique title/description for each page
- [ ] Open Graph images for social sharing
- [ ] LocalBusiness structured data (JSON-LD)
- [ ] XML sitemap (auto-generated by Next.js)
- [ ] robots.txt configured

**Performance:**
- [ ] Lighthouse Performance 90+ on mobile
- [ ] LCP < 2.5 seconds
- [ ] All images optimized via Cloudinary
- [ ] Critical CSS inline
- [ ] Lazy loading implemented for below-the-fold content

**Testing:**
- [ ] Manual testing on iPhone and Android devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Form submission end-to-end test
- [ ] Mobile navigation test
- [ ] Performance testing with Lighthouse

**Deployment:**
- [ ] Vercel deployment configured
- [ ] Production domain configured (waterandashburials.org)
- [ ] SSL/HTTPS verified
- [ ] Environment variables set in Vercel
- [ ] Preview deployment tested
- [ ] Production deployment successful

**Demo readiness (Vegas convention):**
- [ ] Homepage loads flawlessly on laptop
- [ ] Service pages (Osprey, White Nights, Relentless) demo-ready
- [ ] Contact form submits successfully
- [ ] Give-back program page demonstrates differentiation
- [ ] Mobile responsive (demo on phone if needed)
- [ ] No broken links or missing images
- [ ] Fast load times (< 2 seconds on WiFi)

---

### 7. Dependencies for Future Phases

**Phase 02 dependencies (Target Market Landing Pages + Virtual Tours):**
- All Phase 01 pages complete (design system established)
- Form structure in place (will enhance with UTM tracking)
- Component library ready (will reuse for landing pages)

**Phase 03 dependencies (GoHighLevel CRM Integration):**
- Contact form working (will add CRM sync)
- Email infrastructure (Resend) operational
- Form validation patterns established

**Phase 04 dependencies (Payment Processing):**
- Service pages complete (will add "Book Now" CTAs)
- Pricing displayed (will integrate Stripe Checkout)
- Form patterns established (will add booking forms)

**Phase 05 dependencies (SEO & Analytics):**
- All pages deployed (will add advanced analytics)
- Metadata API implemented (will enhance)
- Performance baseline (will maintain/improve)

**Phase 06 dependencies (Testing & Vegas Prep):**
- All functionality working (will create test suite)
- Design polished (will finalize demo assets)
- Content complete (will prepare demo script)

---

### 8. Research Sources Summary

**Next.js & React:**
- [Next.js 16 Release](https://nextjs.org/blog/next-16)
- [React v19 Stable](https://react.dev/blog/2024/12/05/react-19)
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)

**Grief-Sensitive Design:**
- [Designing for Death: A UX Guide for End-of-Life Products](https://matthewlarn.medium.com/designing-for-death-a-ux-guide-for-end-of-life-products-98983f885014)
- [Designing content for people dealing with a death – DWP Digital](https://dwpdigital.blog.gov.uk/2020/02/06/designing-content-for-people-dealing-with-a-death/)

**Mobile Performance:**
- [Common Responsive Design Failures and Fixes](https://onenine.com/common-responsive-design-failures-and-fixes/)
- [Responsive Design Failures: Debugging Mobile Issues](https://blog.pixelfreestudio.com/responsive-design-failures-debugging-mobile-issues/)

**Premium Aesthetics:**
- [Best Funeral Websites of 2026 | 40 Examples](https://mycodelesswebsite.com/funeral-website-design/)
- [Funeral Home Website Design: 10 Inspiring Examples](https://aqmarketing.com/funeral-home-website-design/)

**Form Optimization:**
- [Optimize Funeral Home Landing Pages for Higher Conversions](https://www.ringringmarketing.com/funeral/how-to-optimize-funeral-home-landing-pages-for-higher-conversions/)

**SEO & Structured Data:**
- [The Complete Guide to SEO Optimization in Next.js 15](https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7)
- [Maximizing SEO with Meta Data in Next.js 15](https://dev.to/joodi/maximizing-seo-with-meta-data-in-nextjs-15-a-comprehensive-guide-4pa7)

---

### 9. Key Questions to Answer During Planning

**Technical decisions:**
1. Do we have professional vessel photos or need to budget for photography?
2. What is Cloudinary account tier needed for estimated image volume?
3. Vercel vs Railway vs Render for hosting? (Vercel recommended for Next.js)
4. Custom domain already owned or need to purchase?
5. Email service for notifications: Resend vs SendGrid? (Resend recommended)

**Content decisions:**
1. Who writes page copy? (Owner vs copywriter vs developer guidance)
2. Do we have testimonials and consent forms?
3. Do we have ceremony photos with consent for public use?
4. What is exact company story for About page?
5. What are exact vessel specs (capacity, length, amenities)?

**Design decisions:**
1. Exact shade of navy and gold (provide hex codes)?
2. Which font families? (Inter + Playfair Display recommended)
3. Logo variations available in all 3 colors?
4. Photography style: bright/joyful vs calm/serene?
5. Tone of voice guidelines document exists?

**Scope decisions:**
1. Is FAQ section Phase 01 or Phase 06? (Recommend Phase 06)
2. Is blog/resources section needed? (Out of scope per PROJECT.md)
3. Are testimonials page separate or embedded? (Embedded recommended Phase 01)
4. Is services overview page needed or just individual service pages? (Individual only recommended)

**Integration decisions:**
1. Phase 01 form: just email or also save to database? (Just email Phase 01, CRM in Phase 02)
2. Analytics from day 1 or Phase 05? (Vercel Analytics from day 1 recommended)
3. Error tracking from day 1 or Phase 06? (Sentry Phase 06 OK)

---

## Conclusion

Phase 01 is the foundation everything else builds on. Getting design system, mobile performance, and grief-sensitive UX right from the start prevents rework later. The deliverables are straightforward (8 pages, 1 form, image optimization) but execution quality matters enormously.

**Success = Demo-ready homepage and service pages that:**
1. Load fast on mobile (90+ Lighthouse score)
2. Feel premium (navy/gold/white, real photos, sophisticated typography)
3. Respect grief (clear language, one CTA, no aggressive tactics)
4. Build trust (transparency, testimonials, give-back program)
5. Capture leads (minimal 3-4 field contact form)

**Failure modes to watch:**
- Stock photos or placeholder images (kills premium perception)
- Slow mobile performance (families abandon immediately)
- Complex forms (70%+ abandonment)
- Corporate/transactional tone (contradicts heart-centered mission)
- Incomplete content at launch (missing about page, unclear pricing)

Use the provided component examples, pitfall checklist, and deliverables list to plan detailed tasks in PLAN.md.

---

*Research completed: 2026-01-27*
*Next step: Create PLAN.md with specific implementation tasks*
