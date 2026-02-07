# Water & Ash Burials

A premium Next.js 16 website for Water & Ash Burials, providing dignified sea burial services in San Diego, California.

## Features

- **Next.js 16** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS v4** with custom navy/gold/white theme using OKLCH colors
- **shadcn/ui** component library for premium UI
- **Framer Motion** for smooth animations
- **React Hook Form + Zod** for form validation
- **Resend** for email handling
- **Cloudinary** for image optimization
- **Vercel Analytics** and Speed Insights
- **Mobile-first responsive design** with 44px minimum touch targets

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Cloudinary account for image hosting
- Resend account for email functionality

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Configure your environment variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `RESEND_API_KEY`: Your Resend API key
   - `RESEND_FROM_EMAIL`: From email address
   - `RESEND_TO_EMAIL`: To email address for contact form
   - `NEXT_PUBLIC_SITE_URL`: Your production URL

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
/opt/agency-workspace/water-and-ash/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── contact/          # Contact form endpoint
│   ├── services/             # Service pages
│   │   ├── osprey/
│   │   ├── white-nights/
│   │   ├── relentless/
│   │   └── at-home/
│   ├── about/
│   ├── contact/
│   ├── give-back/
│   ├── privacy/
│   ├── thank-you/
│   ├── fonts.ts              # Font configuration
│   ├── globals.css           # Global styles with Tailwind v4
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── animations/           # Motion primitives
│   ├── forms/                # Form components
│   ├── layout/               # Header, Footer, Container
│   ├── services/             # Service cards
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── utils.ts              # Utility functions
│   └── validations/          # Zod schemas
└── public/                   # Static assets
```

## Pages

1. **Homepage** (`/`) - Hero, services grid, trust section
2. **The Osprey** (`/services/osprey`) - 62ft Striker vessel
3. **White Nights** (`/services/white-nights`) - 58ft Hatteras yacht
4. **Relentless** (`/services/relentless`) - 45ft Bali catamaran
5. **At-Home Memorial** (`/services/at-home`) - Mail-in service
6. **About** (`/about`) - Mission and values
7. **Contact** (`/contact`) - Contact form and information
8. **Give Back** (`/give-back`) - Community initiatives
9. **Privacy** (`/privacy`) - Privacy policy
10. **Thank You** (`/thank-you`) - Post-contact confirmation

## Design System

### Colors (OKLCH)

- **Navy** (`oklch(0.25 0.05 250)`) - Primary color for trust/maritime
- **Gold** (`oklch(0.75 0.15 80)`) - Accent for premium feel
- **White** (`oklch(1 0 0)`) - Clean backgrounds

### Typography

- **Inter** - Sans-serif for UI text
- **Playfair Display** - Serif for headings

### Accessibility

- Minimum 44px touch targets for buttons and links
- Semantic HTML throughout
- ARIA labels where needed
- Color contrast meets WCAG AA standards

## Grief-Sensitive UX

This website follows grief-sensitive design principles:

- Clear, direct language (no euphemisms)
- One primary CTA per page ("Contact Us")
- Minimal form fields
- Reassuring copy throughout
- "Take your time" messaging

## Contact Information

- **Phone**: 619-928-9160
- **Email**: info@waterandashburials.org
- **Location**: San Diego, California

## License

All rights reserved - Water & Ash Burials

## Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Resend](https://resend.com/)
- [Cloudinary](https://cloudinary.com/)
