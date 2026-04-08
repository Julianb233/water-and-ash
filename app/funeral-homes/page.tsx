import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Handshake,
  DollarSign,
  Users,
  Shield,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Anchor,
  Heart,
  FileText,
  Building,
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
  title: 'Funeral Home Partnerships - Sea Burial Referral Program | Water & Ash',
  description:
    'Partner with Water & Ash Burials to expand your funeral home services with premium sea burials. Competitive referral commissions, co-marketing support, and seamless coordination for San Diego funeral homes.',
  openGraph: {
    title: 'Funeral Home Partnerships | Water & Ash Burials',
    description:
      'Add sea burial to your funeral home service menu. Earn referral commissions while providing families with a meaningful, eco-conscious alternative.',
  },
};

const partnerBenefits = [
  {
    icon: DollarSign,
    title: 'Revenue Without Overhead',
    description:
      'Earn a generous referral commission on every family you connect with us — no vessels, permits, or crew to manage.',
  },
  {
    icon: Users,
    title: 'Broaden Your Service Offerings',
    description:
      'Sea burial is one of the fastest-growing alternatives to traditional burial. Offer it as a premium option during planning meetings.',
  },
  {
    icon: Shield,
    title: 'Licensed, Insured & EPA-Compliant',
    description:
      'Every ceremony meets federal EPA ocean disposal standards. Licensed captains, full liability coverage, and documented compliance.',
  },
  {
    icon: Clock,
    title: 'Seamless Scheduling',
    description:
      'We coordinate ceremony timing, remains transfer, and family logistics directly with your staff — minimal disruption to your workflow.',
  },
  {
    icon: Heart,
    title: 'Compassionate Family Care',
    description:
      'Your families receive the same standard of grief-sensitive care your funeral home is known for, from first inquiry to GPS certificate delivery.',
  },
  {
    icon: FileText,
    title: 'Turn-Key Marketing Support',
    description:
      'Branded brochures, digital assets, and display materials to introduce sea burial during arrangement conferences and viewings.',
  },
];

const referralSteps = [
  {
    step: '01',
    title: 'Introduce Sea Burial',
    description:
      'Share our brochures during planning meetings or display materials in your arrangement room. Many families are drawn to the idea of returning their loved one to the sea.',
  },
  {
    step: '02',
    title: 'Submit the Referral',
    description:
      'A simple call, email, or form submission connects the family with our team. No additional paperwork for your funeral home staff.',
  },
  {
    step: '03',
    title: 'We Handle the Rest',
    description:
      'From vessel selection and ceremony planning to remains pickup and family communication — we manage every detail with care.',
  },
  {
    step: '04',
    title: 'Commission & Documentation',
    description:
      'The family receives a GPS certificate and memorial package. Your funeral home receives a transparent referral commission with timely payouts.',
  },
];

export default function FuneralHomesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=85"
            alt="Peaceful ocean horizon at sunrise"
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
              <Building className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/90">
                Funeral Home Referral Program
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Give Families a{' '}
              <span className="text-gradient-gold">
                Meaningful Sea Burial Option
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl max-w-2xl">
              Partner with San Diego&apos;s leading sea burial service. Expand
              your funeral home&apos;s offerings and earn referral commissions on
              every family you connect with us.
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
              Why Funeral Homes{' '}
              <span className="text-gradient-gold">Partner with Us</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Premium sea burial services with zero overhead — just referrals
              and commissions.
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

      {/* Referral Process */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Simple{' '}
              <span className="text-gradient-gold">Referral Process</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four straightforward steps — designed to fit into your existing
              arrangement workflow.
            </p>
          </FadeIn>

          <div className="mx-auto mt-16 max-w-4xl">
            <StaggerContainer className="space-y-8">
              {referralSteps.map((item) => (
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
              Trusted by San Diego&apos;s Funeral Industry
            </h2>
          </FadeIn>

          <div className="mx-auto mt-12 max-w-3xl">
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {[
                'Full EPA compliance on every ceremony',
                'Licensed, insured, and bonded operations',
                '500+ families served with care',
                'USCG-licensed captains on every vessel',
                'GPS coordinates and official documentation',
                'Seamless remains transfer coordination',
                'Co-marketing materials included',
                'Dedicated partner support line',
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
                    Complete the form and our partnerships team will contact you
                    within 24 hours.
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
              Serve Families{' '}
              <span className="text-gradient-gold">Together</span>
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Join a network of funeral homes who trust Water &amp; Ash to
              deliver dignified sea burial experiences to their families.
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
