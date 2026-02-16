import type { Metadata } from 'next';
import Link from 'next/link';
import { Ship, Users, Clock, MapPin, Check, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-primitives';
import { ServiceStructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'White Nights - 58ft Hatteras Motor Yacht',
  description:
    'Elegant sea burial ceremonies aboard a luxurious 58-foot Hatteras motor yacht in San Diego. Capacity for up to 12 passengers. All-inclusive at $2,000.',
  openGraph: {
    title: 'White Nights - 58ft Hatteras | Water & Ash Burials',
    description:
      'Elegant sea burial ceremonies aboard a 58-foot Hatteras motor yacht. Capacity for up to 12 passengers, departing from San Diego Harbor.',
  },
};

const features = [
  'Professional ceremony coordination',
  'GPS coordinates of ceremony location',
  'Certificate of sea burial',
  'Floral tributes included',
  'Photography available (optional)',
  'Flexible ceremony customization',
];

const details = [
  { icon: Ship, label: 'Vessel', value: '58-foot Hatteras' },
  { icon: Users, label: 'Capacity', value: 'Up to 12 passengers' },
  { icon: Clock, label: 'Duration', value: '3-4 hours' },
  { icon: MapPin, label: 'Departure', value: 'San Diego Harbor' },
];

export default function WhiteNightsPage() {
  return (
    <>
      <ServiceStructuredData
        name="White Nights - Sea Burial Ceremony"
        description="Elegant sea burial aboard a 58-foot Hatteras motor yacht with capacity for up to 12 passengers. Includes ceremony coordination, GPS coordinates, certificate, and floral tributes."
        price="2000"
        url="https://waterandashburials.org/services/white-nights"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              White Nights
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              58-foot Hatteras • Up to 12 Passengers
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A luxurious motor yacht offering an elegant and refined setting for
              your memorial service. White Nights combines comfort with maritime
              excellence for a truly dignified experience.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Details Section */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Service Details */}
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Service Details
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                White Nights is a beautifully appointed Hatteras motor yacht that
                provides a serene and sophisticated atmosphere. The spacious salon
                and deck areas offer comfort for your family and friends during
                this meaningful ceremony.
              </p>

              <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
                {details.map((detail) => (
                  <StaggerItem key={detail.label}>
                    <div className="card-premium rounded-2xl p-6 flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                        <detail.icon className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {detail.label}
                        </p>
                        <p className="font-semibold">{detail.value}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>

            {/* Pricing & Features */}
            <FadeIn delay={0.2}>
              <div className="card-premium rounded-2xl p-8">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                    Complete Service
                  </p>
                  <p className="mt-4 font-serif text-5xl font-bold">$2,000</p>
                  <p className="mt-2 text-muted-foreground">
                    All-inclusive pricing
                  </p>
                </div>

                <ul className="mt-8 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button asChild size="lg" className="w-full btn-gold border-0 rounded-full h-14">
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  We&apos;re here to answer your questions
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* What to Expect Section */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl">
              What to Expect
            </h2>
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="font-serif font-semibold text-lg">Before the Ceremony</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  We&apos;ll work with you to plan every detail of the ceremony.
                  Our team will coordinate timing, gather your guest list, and discuss
                  any special requests or traditions you&apos;d like to include.
                </p>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-lg">During the Voyage</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  The journey takes approximately 3-4 hours round trip. We travel
                  at least 3 nautical miles offshore to comply with EPA regulations.
                  White Nights offers a smooth, stable ride with climate-controlled
                  interior spaces.
                </p>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-lg">After the Service</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  You&apos;ll receive GPS coordinates of the ceremony location and
                  a certificate of sea burial. These details provide a meaningful
                  connection to the final resting place.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14">
                <Link href="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
