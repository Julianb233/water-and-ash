import type { Metadata } from 'next';
import Link from 'next/link';
import { XCircle, Phone, Mail, ArrowRight, AlertTriangle } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Booking Cancelled',
  description: 'Your booking was not completed. Contact Water & Ash Burials at 619-928-9160 for assistance.',
};

interface CancellationPageProps {
  searchParams: Promise<{
    reason?: string;
  }>;
}

export default async function CancellationPage(props: CancellationPageProps) {
  const searchParams = await props.searchParams;
  const reason = searchParams.reason;

  return (
    <>
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Booking Not Completed
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {reason === 'payment'
                ? 'Your payment was not processed. No charges have been made to your account.'
                : 'Your booking was not completed. No charges have been made.'}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-lg space-y-8">
            {/* Reassurance */}
            <div className="card-premium rounded-2xl p-8">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                We Understand
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Planning a ceremony is a deeply personal process. There is no rush.
                When you are ready, our team is here to help you create a beautiful,
                meaningful farewell for your loved one.
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                What Would You Like to Do?
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Button asChild size="lg" className="btn-gold border-0 rounded-full h-14">
                  <Link href="/book">
                    Try Again
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full h-14">
                  <Link href="/contact">
                    Talk to Our Team
                    <Phone className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Refund Policy Summary */}
            <div className="rounded-xl border border-border bg-cream p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    Our Refund Policy
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <strong>No charge</strong> was made if you did not complete the booking process.
                    </li>
                    <li>
                      <strong>Full refund</strong> for cancellations made 7+ days before the ceremony.
                    </li>
                    <li>
                      <strong>50% refund</strong> for cancellations 3-6 days before the ceremony.
                    </li>
                    <li>
                      <strong>Weather rescheduling</strong> is always free. If conditions are unsafe,
                      we reschedule at no additional cost.
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Questions? Call us at{' '}
                    <a href="tel:619-928-9160" className="text-gold hover:underline">
                      619-928-9160
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-xl bg-cream p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                Need Help?
              </h3>
              <div className="space-y-2">
                <a
                  href="tel:619-928-9160"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  619-928-9160
                </a>
                <a
                  href="mailto:info@waterandashburials.org"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@waterandashburials.org
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
