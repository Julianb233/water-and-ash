import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone, Mail } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Thank You',
  description:
    'Thank you for contacting Water & Ash Burials. We will respond to your inquiry shortly.',
};

export default function ThankYouPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
              <CheckCircle className="h-12 w-12 text-gold" />
            </div>
            <h1 className="mt-8 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Thank You for Reaching Out
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We&apos;ve received your message and will respond within a few hours
              during business hours. We understand this is a difficult time, and
              we&apos;re here to help.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl">
                What Happens Next
              </h2>
            </FadeIn>
            <StaggerContainer className="mt-12 space-y-6">
              <StaggerItem>
                <div className="card-premium rounded-2xl p-8">
                  <h3 className="font-serif font-semibold text-lg">1. We&apos;ll Contact You</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    A member of our team will reach out to you by phone or email
                    (based on your preference) to discuss your needs and answer
                    any questions.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="card-premium rounded-2xl p-8">
                  <h3 className="font-serif font-semibold text-lg">
                    2. Plan the Ceremony
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    We&apos;ll work with you to choose the right vessel, schedule
                    the ceremony, and discuss any special requests or traditions
                    you&apos;d like to include.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="card-premium rounded-2xl p-8">
                  <h3 className="font-serif font-semibold text-lg">
                    3. Coordinate Details
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    Our team will handle all the logistics, including permits,
                    vessel preparation, and ceremony coordination. You can focus
                    on honoring your loved one.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Need Immediate Assistance?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              If you need to speak with someone right away, please don&apos;t
              hesitate to call or email us directly.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="card-premium rounded-2xl p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                  <Phone className="h-7 w-7 text-gold" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Call Us</p>
                <a
                  href="tel:619-928-9160"
                  className="mt-1 block font-semibold hover:text-gold transition-colors"
                >
                  619-928-9160
                </a>
              </div>

              <div className="card-premium rounded-2xl p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                  <Mail className="h-7 w-7 text-gold" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Email Us</p>
                <a
                  href="mailto:info@waterandashburials.org"
                  className="mt-1 block font-semibold hover:text-gold transition-colors break-all"
                >
                  info@waterandashburials.org
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Resources Section */}
      <section className="py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              While You Wait
            </h2>
            <p className="mt-4 text-muted-foreground">
              Learn more about our services and what to expect.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/services/osprey">View Our Services</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/give-back">Give Back</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
