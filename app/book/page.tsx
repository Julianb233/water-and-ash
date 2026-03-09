import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { BookingForm } from '@/components/booking/booking-form';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Book a Ceremony',
  description:
    'Schedule your sea burial ceremony in San Diego. Choose your vessel, select a date, and reserve your time aboard one of our premium boats.',
  openGraph: {
    title: 'Book a Ceremony | Water & Ash Burials',
    description:
      'Schedule your sea burial ceremony in San Diego. Choose your vessel, pick a date, and we will handle the rest.',
  },
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Schedule Your Ceremony
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Choose a vessel, select a date, and we&apos;ll take care of the rest.
              Each ceremony is a private, personalized celebration of life on the ocean.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <BookingForm />
          </div>
        </Container>
      </section>

      {/* Support Note */}
      <section className="bg-cream py-12 md:py-16">
        <Container>
          <FadeIn className="mx-auto max-w-xl text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Need Help?
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We understand this is a meaningful decision. If you&apos;d prefer
              to speak with someone directly, please call us at{' '}
              <a
                href="tel:619-928-9160"
                className="text-gold font-medium hover:underline"
              >
                619-928-9160
              </a>{' '}
              or{' '}
              <a
                href="mailto:info@waterandashburials.org"
                className="text-gold font-medium hover:underline"
              >
                send us an email
              </a>
              .
            </p>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
