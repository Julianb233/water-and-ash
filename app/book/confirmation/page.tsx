import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your sea burial ceremony has been scheduled. We will follow up with ceremony details.',
};

interface ConfirmationPageProps {
  searchParams: Promise<{
    vessel?: string;
    date?: string;
    time?: string;
    appointmentId?: string;
  }>;
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(isoStr: string): string {
  try {
    const date = new Date(isoStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Los_Angeles',
    });
  } catch {
    return isoStr;
  }
}

export default async function ConfirmationPage(props: ConfirmationPageProps) {
  const searchParams = await props.searchParams;
  const { vessel, date, time } = searchParams;

  return (
    <>
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
              <CheckCircle2 className="h-8 w-8 text-gold" />
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Ceremony Scheduled
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Thank you for choosing Water & Ash Burials. Your ceremony request has
              been received and our team will follow up shortly to confirm all details.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-lg">
            {/* Booking Details Card */}
            {(vessel || date) && (
              <div className="card-premium rounded-2xl p-8 mb-8">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Booking Details
                </h2>
                <dl className="space-y-4">
                  {vessel && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Vessel</dt>
                      <dd className="text-sm font-medium text-foreground">{vessel}</dd>
                    </div>
                  )}
                  {date && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Date</dt>
                      <dd className="text-sm font-medium text-foreground">
                        {formatDate(date)}
                      </dd>
                    </div>
                  )}
                  {time && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Time</dt>
                      <dd className="text-sm font-medium text-foreground">
                        {formatTime(time)}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* What Happens Next */}
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                What Happens Next
              </h2>

              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-semibold text-gold">
                    1
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Confirmation Call
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A team member will call you within 24 hours to confirm
                      your ceremony details and discuss the deposit.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-semibold text-gold">
                    2
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Ceremony Planning
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll coordinate music, flowers, and any special
                      traditions or requests for your ceremony.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-semibold text-gold">
                    3
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Day of Ceremony
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You&apos;ll receive a pre-ceremony reminder with dock
                      location and arrival instructions.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Contact Info */}
            <div className="mt-8 rounded-xl bg-cream p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                Questions?
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

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Button asChild className="btn-gold border-0 rounded-full px-8 h-12">
                <Link href="/">
                  Return Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
