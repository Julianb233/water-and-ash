import type { Metadata } from 'next';
import Link from 'next/link';
import { Ship, Users, Clock, MapPin, Check } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'The Osprey - 62ft Striker',
  description:
    'Our flagship vessel offers a dignified sea burial experience aboard a 62-foot Striker with capacity for up to 13 passengers.',
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
  { icon: Ship, label: 'Vessel', value: '62-foot Striker' },
  { icon: Users, label: 'Capacity', value: 'Up to 13 passengers' },
  { icon: Clock, label: 'Duration', value: '3-4 hours' },
  { icon: MapPin, label: 'Departure', value: 'San Diego Harbor' },
];

export default function OspreyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The Osprey
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              62-foot Striker • Up to 13 Passengers
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our flagship vessel offers comfort, stability, and dignity for your
              memorial service. The Osprey is a beautifully maintained sport fishing
              boat perfect for intimate sea burial ceremonies.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Details Section */}
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Service Details */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Service Details
              </h2>
              <p className="mt-4 text-muted-foreground">
                The Osprey provides a peaceful and respectful environment for your
                sea burial ceremony. Our experienced captain and crew ensure a safe,
                smooth journey while you focus on honoring your loved one.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {details.map((detail) => (
                  <Card key={detail.label}>
                    <CardContent className="flex items-center gap-4 p-6">
                      <detail.icon className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {detail.label}
                        </p>
                        <p className="font-semibold">{detail.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pricing & Features */}
            <div>
              <Card className="bg-secondary/30">
                <CardContent className="p-8">
                  <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
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
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>

                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    We&apos;re here to answer your questions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* What to Expect Section */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
              What to Expect
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">Before the Ceremony</h3>
                <p className="mt-2 text-muted-foreground">
                  We&apos;ll work with you to plan every detail of the ceremony.
                  Our team will coordinate timing, gather your guest list, and discuss
                  any special requests or traditions you&apos;d like to include.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">During the Voyage</h3>
                <p className="mt-2 text-muted-foreground">
                  The journey takes approximately 3-4 hours round trip. We travel
                  at least 3 nautical miles offshore to comply with EPA regulations.
                  The Osprey provides a stable, comfortable platform for your ceremony.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">After the Service</h3>
                <p className="mt-2 text-muted-foreground">
                  You&apos;ll receive GPS coordinates of the ceremony location and
                  a certificate of sea burial. These details provide a meaningful
                  connection to the final resting place.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
