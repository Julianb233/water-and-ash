import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, FileText, Camera, Check } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'At-Home Memorial - Mail-in Service',
  description:
    'An affordable mail-in sea burial service where we perform the ceremony on your behalf and provide you with complete documentation.',
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
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
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground">
              A simple, respectful process designed to honor your loved one
              while providing you peace of mind.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail, index) => (
              <Card key={detail.label}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <detail.icon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm font-medium">{detail.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
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
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Contact us to receive mailing instructions
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* What You Receive Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
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
              <Button asChild size="lg">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
