import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/motion-primitives';
import { FAQSection } from '@/components/faq/faq-section';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Sea Burial FAQ',
  description:
    'Find answers to common questions about sea burial ceremonies, EPA requirements, what to expect, pricing, and more. Water & Ash Burials, San Diego.',
  openGraph: {
    title: 'FAQ - Water & Ash Burials',
    description:
      'Answers to common questions about sea burial ceremonies in San Diego. Learn about EPA compliance, vessel capacity, pricing, and what to expect.',
  },
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Frequently Asked{' '}
              <span className="text-gradient-gold">Questions</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We understand you may have many questions during this time. Below
              you&apos;ll find answers to the most common ones. If you don&apos;t see
              what you&apos;re looking for, please don&apos;t hesitate to reach out.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Still Have Questions CTA */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our compassionate team is here to help. Reach out anytime — there
              is never any pressure.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full text-base px-8 h-14"
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
