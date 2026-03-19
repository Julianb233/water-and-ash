import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Anchor, Users, ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedButton,
  WaveDivider,
} from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'About Us - Our Mission & Values',
  description:
    'Learn about Water & Ash Burials, our mission to provide dignified sea burial services, and our commitment to serving San Diego families with compassion and maritime excellence.',
  openGraph: {
    title: 'About Water & Ash Burials',
    description:
      'Our mission is to provide compassionate, EPA-compliant sea burial services in San Diego. Licensed, insured, and experienced.',
  },
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
          <FadeIn className="mx-auto max-w-3xl text-center" duration={0.8}>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              About Water & Ash Burials
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-8 text-muted-foreground">
              Serving San Diego families with dignified, compassionate sea burial
              services since our founding. We honor life&apos;s final journey with
              respect and maritime excellence.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Wave: Hero -> Mission */}
      <WaveDivider fill="var(--color-background)" variant="gentle" flip className="bg-gradient-to-b from-secondary/30 to-secondary/30 -mb-1" />

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl">
                Our Mission
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground">
                We believe that saying goodbye to a loved one should be as meaningful
                and personal as possible. The ocean has long represented eternity,
                peace, and the endless cycle of life. Through our sea burial services,
                we help families create lasting memories while honoring their loved
                ones in one of nature&apos;s most powerful settings.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Our team combines professional maritime experience with genuine
                compassion. We understand that this is one of life&apos;s most
                difficult moments, and we&apos;re honored to guide you through it
                with care and dignity.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Wave: Mission -> Values */}
      <WaveDivider fill="var(--color-cream)" variant="double" className="bg-background -mb-1" />

      {/* Values Section */}
      <section className="bg-cream py-16 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              These principles guide everything we do.
            </p>
          </FadeIn>

          <StaggerContainer className="mx-auto mt-12 sm:mt-16 grid max-w-5xl gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="card-premium rounded-2xl p-6 sm:p-8 text-center h-full">
                  <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                    <value.icon className="h-7 w-7 sm:h-8 sm:w-8 text-gold" />
                  </div>
                  <h3 className="mt-5 sm:mt-6 font-serif text-lg sm:text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Wave: Values -> Why Choose Us */}
      <WaveDivider fill="var(--color-cream)" variant="gentle" flip className="bg-background -mb-1" />

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl">
                Why Families Choose Us
              </h2>
            </FadeIn>
            <div className="mt-8 space-y-6">
              {[
                {
                  title: 'EPA-Compliant Sea Burials',
                  text: 'We follow all federal regulations, conducting ceremonies at least 3 nautical miles offshore. You\'ll receive GPS coordinates and official documentation of the ceremony.',
                },
                {
                  title: 'Premium Vessels',
                  text: 'Our fleet includes well-maintained sport fishing boats and a catamaran, all chosen for comfort, stability, and capacity. Experienced captains ensure safe passage.',
                },
                {
                  title: 'Personalized Ceremonies',
                  text: 'Every ceremony is customized to reflect your loved one\'s life and your family\'s traditions. We support readings, music, and special requests.',
                },
                {
                  title: 'Transparent Pricing',
                  text: 'No hidden fees. Our all-inclusive pricing covers ceremony coordination, vessel charter, documentation, and floral tributes.',
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1} direction="left">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Wave: Why Choose Us -> CTA */}
      <WaveDivider
        fill="oklch(0.18 0.05 250)"
        variant="dramatic"
        className="bg-background -mb-1"
      />

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              We&apos;re Here for You
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed">
              Contact us anytime to discuss your needs. We&apos;ll answer your
              questions and help you plan a meaningful ceremony.
            </p>
            <FadeIn delay={0.2} direction="up">
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <AnimatedButton>
                  <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14 w-full sm:w-auto">
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </AnimatedButton>
                <AnimatedButton>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="glass border-white/30 text-white hover:bg-white/10 rounded-full text-base px-8 h-14 w-full sm:w-auto"
                  >
                    <a href="tel:619-928-9160" className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call 619-928-9160
                    </a>
                  </Button>
                </AnimatedButton>
              </div>
            </FadeIn>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
