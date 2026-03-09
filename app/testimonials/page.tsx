import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/motion-primitives';
import { TestimonialsSection } from '@/components/testimonials/testimonial-card';

export const metadata: Metadata = {
  title: 'Testimonials - Family Stories & Reviews',
  description:
    'Read heartfelt testimonials from families who chose Water & Ash Burials for their sea burial ceremonies in San Diego. Real stories of compassion and healing.',
  openGraph: {
    title: 'Testimonials - Water & Ash Burials',
    description:
      'Heartfelt stories from families we have served. Discover why San Diego families trust Water & Ash for compassionate sea burial ceremonies.',
  },
};

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Words from{' '}
              <span className="text-gradient-gold">Families We&apos;ve Served</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every ceremony is a privilege. These are the stories families have
              shared about their experience with Water &amp; Ash — in their own
              words.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Ready to Begin?
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Let us help you create a beautiful, meaningful farewell for your
              loved one. Our team is here whenever you&apos;re ready.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14">
                <Link href="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/10 rounded-full text-base px-8 h-14"
              >
                <a href="tel:619-928-9160" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call 619-928-9160
                </a>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
