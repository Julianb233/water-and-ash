import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Scale,
  DollarSign,
  Users,
  Shield,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Anchor,
  FileText,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations/motion-primitives';
import { PartnerInquiryForm } from '@/components/forms/partner-inquiry-form';

export const metadata: Metadata = {
  title: 'Estate Planner Partnerships - End-of-Life Planning | Water & Ash',
  description:
    'Partner with Water & Ash Burials to offer estate planning clients a pre-planned sea burial option. Complement wills, trusts, and advance directives with dignified end-of-life arrangements.',
  openGraph: {
    title: 'Estate Planner Partnerships | Water & Ash Burials',
    description:
      'Add sea burial pre-planning to your estate planning services. A natural complement to wills, trusts, and advance directives.',
  },
};

const partnerBenefits = [
  {
    icon: BookOpen,
    title: 'Complement Estate Plans',
    description:
      'Sea burial pre-planning fits naturally alongside wills, trusts, and advance directives — giving clients a complete end-of-life plan.',
  },
  {
    icon: DollarSign,
    title: 'Referral Revenue',
    description:
      'Earn a referral commission when your clients pre-plan or book a sea burial. Transparent tracking and reliable payouts.',
  },
  {
    icon: Shield,
    title: 'Fully Documented & Compliant',
    description:
      'Every arrangement is documented with the same rigor your clients expect from legal planning — EPA compliance, permits, and official records.',
  },
  {
    icon: Scale,
    title: 'Reduce Family Burden',
    description:
      'When burial arrangements are pre-planned, executors and family members face one less decision during an already stressful time.',
  },
  {
    icon: Clock,
    title: 'Lock In Today\'s Pricing',
    description:
      'Pre-planned sea burials lock in current pricing. Clients protect against rising costs — a tangible estate planning benefit.',
  },
  {
    icon: FileText,
    title: 'Professional Materials',
    description:
      'Receive branded materials to share during estate planning consultations, including a summary that integrates with advance directive documents.',
  },
];

const planningSteps = [
  {
    step: '01',
    title: 'Introduce During Planning',
    description:
      'When discussing end-of-life wishes alongside wills and advance directives, introduce sea burial as a dignified arrangement that can be pre-planned and documented.',
  },
  {
    step: '02',
    title: 'Client Consultation',
    description:
      'We schedule a consultation with your client to discuss vessel options, ceremony preferences, and pricing. Everything is documented for inclusion in their estate plan.',
  },
  {
    step: '03',
    title: 'Pre-Plan & Document',
    description:
      'The arrangement is formalized with a pre-planning agreement. Details are recorded and can be referenced in advance directives or included with trust documents.',
  },
  {
    step: '04',
    title: 'Execution When Needed',
    description:
      'When the time comes, the family or executor contacts us. The pre-planned ceremony is executed exactly as arranged — no decisions needed during grief.',
  },
];

export default function EstatePlannersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=85"
            alt="Ocean horizon with golden sunlight"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <Container className="relative z-10">
          <FadeIn className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Briefcase className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/90">
                Estate Planner Partnership
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Complete Your Clients&apos;{' '}
              <span className="text-gradient-gold">End-of-Life Plan</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl max-w-2xl">
              Add pre-planned sea burial to your estate planning services.
              A natural complement to wills, trusts, and advance directives
              that gives your clients peace of mind.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-gold border-0 rounded-full text-base px-8 h-14"
              >
                <a href="#partner-form">
                  Become a Referral Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
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

      {/* Benefits */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Why Estate Planners{' '}
              <span className="text-gradient-gold">Recommend Us</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Pre-planned sea burial protects your clients and simplifies
              execution for executors and families.
            </p>
          </FadeIn>

          <StaggerContainer className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {partnerBenefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="card-premium rounded-2xl p-8 h-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                    <benefit.icon className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Planning Process */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              From Plan to{' '}
              <span className="text-gradient-gold">Execution</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A structured process that mirrors the thoroughness your clients
              expect from their estate planning.
            </p>
          </FadeIn>

          <div className="mx-auto mt-16 max-w-4xl">
            <StaggerContainer className="space-y-8">
              {planningSteps.map((item) => (
                <StaggerItem key={item.step}>
                  <div className="card-premium rounded-2xl p-8 flex gap-6 items-start">
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                      <span className="text-lg font-bold text-gold">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Professional, Documented & Reliable
            </h2>
          </FadeIn>

          <div className="mx-auto mt-12 max-w-3xl">
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {[
                'Pre-planning agreements included in estate documents',
                'Pricing locked in at time of arrangement',
                'Full EPA compliance and legal documentation',
                'USCG-licensed captains on every vessel',
                'GPS coordinates and official certificates',
                'Executor-friendly: clear instructions for future execution',
                'All-inclusive pricing — no surprises for the estate',
                'Professional partnership materials for your practice',
              ].map((point) => (
                <StaggerItem key={point}>
                  <div className="flex items-start gap-3 p-3">
                    <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Lead Capture Form */}
      <section id="partner-form" className="py-20 md:py-28 scroll-mt-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <FadeIn>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Start a{' '}
                    <span className="text-gradient-gold">Partnership</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Let&apos;s discuss how sea burial pre-planning can
                    complement your estate planning services.
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Prefer to call?
                      </p>
                      <a
                        href="tel:619-928-9160"
                        className="font-medium hover:text-gold transition-colors"
                      >
                        619-928-9160
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-3">
                <div className="card-premium rounded-2xl p-8">
                  <h3 className="font-serif text-2xl font-bold mb-6">
                    Partnership Inquiry
                  </h3>
                  <PartnerInquiryForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              The Final Detail in a{' '}
              <span className="text-gradient-gold">Complete Estate Plan</span>
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Give your clients the peace of knowing every detail is handled —
              including their final wishes. Partner with Water &amp; Ash today.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="btn-gold border-0 rounded-full text-base px-8 h-14"
              >
                <a href="#partner-form">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
