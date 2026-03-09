import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, FileText, Camera, Check, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-primitives';
import { ServiceStructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'At-Home Memorial - Mail-in Sea Burial Service',
  description:
    'Affordable mail-in sea burial service for $400. We perform the ceremony on your behalf in San Diego and provide GPS coordinates, certificate, photographs, and detailed report.',
  alternates: { canonical: '/services/at-home' },
  openGraph: {
    title: 'At-Home Memorial - Mail-in Service | Water & Ash Burials',
    description:
      'Affordable mail-in sea burial service. We perform a dignified ceremony on your behalf and provide complete documentation.',
  },
};

const features = [
  'We perform the ceremony on your behalf',
  'GPS coordinates of ceremony location',
  'Certificate of sea burial',
  'Photographs of the ceremony',
  'Detailed ceremony report',
  'Respectful, dignified service',
];

const details = [
  {
    icon: Mail,
    label: 'Step 1',
    value: 'Mail us the cremated remains',
  },
  {
    icon: MapPin,
    label: 'Step 2',
    value: 'We perform the ceremony at sea',
  },
  {
    icon: FileText,
    label: 'Step 3',
    value: 'Receive documentation & photos',
  },
  {
    icon: Camera,
    label: 'Step 4',
    value: 'Keep the memories forever',
  },
];

export default function AtHomePage() {
  return (
    <>
      <ServiceStructuredData
        name="At-Home Memorial - Mail-in Sea Burial"
        description="Affordable mail-in sea burial service. We perform the ceremony on your behalf and provide GPS coordinates, certificate, photographs, and detailed report."
        price="400"
        url="https://waterandashburials.org/services/at-home"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              At-Home Memorial
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Mail-in Service • $400
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A dignified and affordable option for families who cannot travel to
              San Diego. We perform the ceremony on your behalf and provide you
              with complete documentation of the service.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A simple, respectful process designed to honor your loved one
              while providing you peace of mind.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail) => (
              <StaggerItem key={detail.label}>
                <div className="card-premium rounded-2xl p-6 text-center h-full">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                    <detail.icon className="h-8 w-8 text-gold" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-gold">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm font-medium">{detail.value}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl">
            <div className="card-premium rounded-2xl p-8">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                  Complete Service
                </p>
                <p className="mt-4 font-serif text-5xl font-bold">$400</p>
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
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Contact us to receive mailing instructions
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* What You Receive Section */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl">
              What You&apos;ll Receive
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">GPS Coordinates</h3>
                <p className="mt-2 text-muted-foreground">
                  Exact latitude and longitude coordinates of where the ceremony
                  took place, allowing you to connect with the location anytime.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Certificate of Sea Burial</h3>
                <p className="mt-2 text-muted-foreground">
                  An official certificate documenting the date, time, and location
                  of the ceremony, signed by our captain.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Ceremony Photographs</h3>
                <p className="mt-2 text-muted-foreground">
                  Professional photographs of the ceremony, including floral tributes
                  and the ceremony site, giving you a visual memory of the service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Detailed Report</h3>
                <p className="mt-2 text-muted-foreground">
                  A written description of the ceremony, weather conditions, and
                  any special observations from our crew.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14">
                <Link href="/contact">
                  Contact Us Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
