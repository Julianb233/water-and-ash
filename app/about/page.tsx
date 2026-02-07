import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Anchor, Users } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Water & Ash Burials, our mission to provide dignified sea burial services, and our commitment to serving San Diego families with compassion.',
};

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description:
      'We understand the weight of this moment. Every family receives our full attention and care.',
  },
  {
    icon: Anchor,
    title: 'Professionalism',
    description:
      'Licensed, insured, and experienced. We handle every detail with expertise and respect.',
  },
  {
    icon: Users,
    title: 'Family Focus',
    description:
      'Your needs come first. We customize each ceremony to honor your loved one uniquely.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Water & Ash Burials
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Serving San Diego families with dignified, compassionate sea burial
              services since our founding. We honor life&apos;s final journey with
              respect and maritime excellence.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We believe that saying goodbye to a loved one should be as meaningful
              and personal as possible. The ocean has long represented eternity,
              peace, and the endless cycle of life. Through our sea burial services,
              we help families create lasting memories while honoring their loved
              ones in one of nature&apos;s most powerful settings.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our team combines professional maritime experience with genuine
              compassion. We understand that this is one of life&apos;s most
              difficult moments, and we&apos;re honored to guide you through it
              with care and dignity.
            </p>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Our Values
            </h2>
            <p className="mt-4 text-muted-foreground">
              These principles guide everything we do.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
              Why Families Choose Us
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">
                  EPA-Compliant Sea Burials
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We follow all federal regulations, conducting ceremonies at
                  least 3 nautical miles offshore. You&apos;ll receive GPS
                  coordinates and official documentation of the ceremony.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Premium Vessels</h3>
                <p className="mt-2 text-muted-foreground">
                  Our fleet includes well-maintained sport fishing boats and a
                  catamaran, all chosen for comfort, stability, and capacity.
                  Experienced captains ensure safe passage.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Personalized Ceremonies
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Every ceremony is customized to reflect your loved one&apos;s
                  life and your family&apos;s traditions. We support readings,
                  music, and special requests.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Transparent Pricing
                </h3>
                <p className="mt-2 text-muted-foreground">
                  No hidden fees. Our all-inclusive pricing covers ceremony
                  coordination, vessel charter, documentation, and floral tributes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold">
              We&apos;re Here for You
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Contact us anytime to discuss your needs. We&apos;ll answer your
              questions and help you plan a meaningful ceremony.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="tel:619-928-9160">Call 619-928-9160</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
