import type { Metadata } from 'next';
import Image from 'next/image';
import {
  HeartHandshake,
  Leaf,
  Users,
  Shield,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Anchor,
  Heart,
  Stethoscope,
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
  title: 'Hospice Partnerships - Pre-Planning Sea Burial | Water & Ash',
  description:
    'Partner with Water & Ash Burials to offer hospice families a compassionate sea burial option. Pre-death planning support, gentle transitions, and dignified ceremonies for San Diego hospice providers.',
  openGraph: {
    title: 'Hospice Partnerships | Water & Ash Burials',
    description:
      'Help hospice families plan ahead with a dignified sea burial option. Compassionate coordination and pre-planning support.',
  },
};

const partnerBenefits = [
  {
    icon: HeartHandshake,
    title: 'Pre-Death Planning Support',
    description:
      'Families in hospice care can plan their loved one\'s sea burial in advance — bringing peace of mind during an incredibly difficult time.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious Alternative',
    description:
      'Many hospice families are drawn to sea burial as a natural, environmentally responsible option. No embalming chemicals, no land use, no headstone maintenance.',
  },
  {
    icon: Users,
    title: 'Gentle Family Coordination',
    description:
      'Our team is trained in grief-sensitive communication. We work at the family\'s pace, never rushing, and always meeting them where they are emotionally.',
  },
  {
    icon: Shield,
    title: 'Fully Licensed & Documented',
    description:
      'EPA-compliant ceremonies with licensed captains, full insurance, and official GPS coordinates delivered to the family.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description:
      'We understand hospice timelines are unpredictable. Ceremonies can be scheduled quickly after passing, or pre-arranged months in advance.',
  },
  {
    icon: Heart,
    title: 'Meaningful Closure',
    description:
      'A sea burial ceremony gives families a shared moment of goodbye — watching the ocean receive their loved one creates lasting, peaceful memories.',
  },
];

const planningSteps = [
  {
    step: '01',
    title: 'Early Conversation',
    description:
      'When a patient or family expresses interest in alternative arrangements, introduce sea burial as a gentle option. Our brochures are designed for bedside conversations.',
  },
  {
    step: '02',
    title: 'Pre-Plan Together',
    description:
      'The family (or patient) can choose a vessel, discuss ceremony preferences, and complete all arrangements in advance — reducing stress after passing.',
  },
  {
    step: '03',
    title: 'Compassionate Transition',
    description:
      'After passing, we coordinate with the hospice and cremation provider for a seamless transition. Remains are handled with care and dignity at every step.',
  },
  {
    step: '04',
    title: 'The Ceremony',
    description:
      'Families gather aboard a private vessel for a personalized sea burial ceremony. Afterwards, they receive GPS coordinates, photos, and a memorial certificate.',
  },
];

export default function HospicePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop&q=85"
            alt="Calm ocean at golden hour"
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
              <Stethoscope className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/90">
                Hospice Partnership Program
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Help Families Plan{' '}
              <span className="text-gradient-gold">
                a Peaceful Goodbye
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl max-w-2xl">
              Partner with Water &amp; Ash to offer hospice families a
              compassionate sea burial option — with pre-planning support that
              brings peace of mind during life&apos;s most difficult moments.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-gold border-0 rounded-full text-base px-8 h-14"
              >
                <a href="#partner-form">
                  Partner with Us
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
              Why Hospice Providers{' '}
              <span className="text-gradient-gold">Partner with Us</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Give families facing end-of-life a meaningful, pre-planned
              alternative to traditional burial.
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
              Pre-Planning with{' '}
              <span className="text-gradient-gold">Compassion</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A gentle process designed for families navigating end-of-life care.
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
              A Service Families Remember with Gratitude
            </h2>
          </FadeIn>

          <div className="mx-auto mt-12 max-w-3xl">
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {[
                'Pre-planning available before passing',
                'Grief-sensitive, trained coordinators',
                'Full EPA compliance and documentation',
                'USCG-licensed captains',
                'GPS coordinates and memorial certificate',
                'Flexible scheduling around hospice timelines',
                'All-inclusive pricing with no hidden fees',
                'Eco-conscious, natural return to the sea',
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
                    We&apos;d love to discuss how sea burial can serve your
                    hospice families. Fill out the form and we&apos;ll be in
                    touch within 24 hours.
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
              Compassionate Care,{' '}
              <span className="text-gradient-gold">From Start to Sea</span>
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Help your hospice families find peace with a dignified,
              pre-planned sea burial. Partner with Water &amp; Ash today.
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
