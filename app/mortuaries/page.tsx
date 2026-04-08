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
  Building2,
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
  title: 'Mortuary Partnerships - Sea Burial Referral Program',
  description:
    'Partner with Water & Ash Burials to offer premium sea burial services to your families. Competitive referral commissions, co-marketing support, and a seamless handoff process for San Diego mortuaries.',
  openGraph: {
    title: 'Mortuary Partnerships | Water & Ash Burials',
    description:
      'Expand your service menu with premium sea burials. Competitive commissions, dedicated support, and a seamless referral workflow for mortuaries.',
  },
};

const partnerBenefits = [
  {
    icon: DollarSign,
    title: 'Competitive Referral Commissions',
    description:
      'Earn a generous fee for every family you refer. Transparent tracking, reliable payouts, and no caps on your earnings.',
  },
  {
    icon: Users,
    title: 'Expand Your Service Menu',
    description:
      'Offer families a meaningful option many mortuaries cannot provide in-house — without adding staff, vessels, or permits to your operations.',
  },
  {
    icon: Shield,
    title: 'Fully Licensed & EPA-Compliant',
    description:
      'Every ceremony meets EPA ocean disposal regulations, with licensed captains and full liability coverage. Your reputation is protected.',
  },
  {
    icon: Clock,
    title: 'Fast Scheduling & Coordination',
    description:
      'We schedule ceremonies within days and coordinate directly with your staff on timing, remains transfer, and family communication.',
  },
  {
    icon: Heart,
    title: 'Grief-Sensitive Family Care',
    description:
      'Our team mirrors the compassionate standard your families expect. From first contact to GPS certificate delivery, every interaction is handled with care.',
  },
  {
    icon: FileText,
    title: 'Co-Marketing Materials',
    description:
      'Receive branded brochures, display materials, and digital assets to introduce sea burial as an option during your arrangement conferences.',
  },
];

const referralSteps = [
  {
    step: '01',
    title: 'Introduce the Option',
    description:
      'During arrangement conferences, share our brochure or mention sea burial as an alternative. Families who are interested can be connected immediately.',
  },
  {
    step: '02',
    title: 'Submit a Referral',
    description:
      'One call, email, or form submission is all it takes. Share the family\'s contact details and we take it from there — no extra paperwork for your team.',
  },
  {
    step: '03',
    title: 'We Handle Everything',
    description:
      'We coordinate directly with the family on vessel selection, scheduling, and ceremony personalization. We also arrange remains pickup or accept delivery from your facility.',
  },
  {
    step: '04',
    title: 'Commission & Follow-Up',
    description:
      'After the ceremony, the family receives a GPS certificate and memorial package. You receive your referral commission — tracked transparently with timely payouts.',
  },
];

const vesselHighlights = [
  {
    name: 'The Osprey',
    detail: '62-foot Striker Sport Fishing Vessel',
    capacity: 'Up to 13 passengers',
    price: '$2,000',
  },
  {
    name: 'White Nights',
    detail: '58-foot Hatteras Motor Yacht',
    capacity: 'Up to 12 passengers',
    price: '$2,000',
  },
  {
    name: 'Relentless',
    detail: '45-foot Bali Catamaran',
    capacity: 'Up to 15 passengers',
    price: '$2,000',
  },
  {
    name: 'At-Home Memorial',
    detail: 'Mail-in Ceremony with Video & GPS',
    capacity: 'Private ceremony',
    price: '$400',
  },
];

export default function MortuariesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop&q=85"
            alt="Serene ocean horizon at golden hour"
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
              <Building2 className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/90">
                Mortuary Referral Program
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Offer Your Families a{' '}
              <span className="text-gradient-gold">
                Premium Sea Burial Option
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl max-w-2xl">
              Partner with San Diego&apos;s premier sea burial service. Add a
              meaningful, eco-conscious option to your arrangement conferences
              — and earn a competitive commission on every referral.
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

      {/* Why Partner Section */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Why Mortuaries{' '}
              <span className="text-gradient-gold">Partner with Us</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Add premium sea burial services to your offerings with zero
              overhead, full compliance, and co-marketing support.
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

      {/* Referral Process Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              How the Referral{' '}
              <span className="text-gradient-gold">Workflow Works</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A streamlined four-step process designed to fit seamlessly into
              your existing arrangement workflow.
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

      {/* Fleet Overview Section */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
              <Anchor className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Our Fleet</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Premium Vessels for{' '}
              <span className="text-gradient-gold">Every Family</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              All-inclusive pricing with no hidden fees. Your families always
              know exactly what to expect.
            </p>
          </FadeIn>

          <StaggerContainer className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
            {vesselHighlights.map((vessel) => (
              <StaggerItem key={vessel.name}>
                <div className="card-premium rounded-2xl p-6 flex items-center gap-4">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                    <Anchor className="h-6 w-6 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {vessel.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {vessel.detail}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {vessel.capacity}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-xl font-bold text-gold">
                      {vessel.price}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Reputation Is Safe with Us
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              When you refer a family to Water &amp; Ash, they receive the same
              standard of care and professionalism your mortuary is known for.
            </p>
          </FadeIn>

          <div className="mx-auto mt-12 max-w-3xl">
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {[
                'Full EPA compliance on every ceremony',
                'Licensed, insured, and bonded operations',
                '10+ years of maritime and burial experience',
                '500+ families served with compassion',
                'Experienced, USCG-licensed captains',
                'Official GPS coordinates and documentation',
                'Seamless remains transfer coordination',
                'Branded co-marketing materials provided',
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

      {/* Lead Capture Form Section */}
      <section
        id="partner-form"
        className="py-20 md:py-28 bg-cream scroll-mt-20"
      >
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Left column - messaging */}
              <div className="lg:col-span-2">
                <FadeIn>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Start a{' '}
                    <span className="text-gradient-gold">Partnership</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Fill out the form and our partnerships team will reach out
                    within 24 hours to discuss how we can work together.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
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
                  </div>

                  <div className="mt-8 rounded-lg bg-secondary/30 p-6">
                    <h3 className="font-semibold text-lg">
                      What happens next?
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-gold font-bold">1.</span>
                        We review your inquiry and prepare partnership details
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gold font-bold">2.</span>
                        A discovery call to understand your needs
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gold font-bold">3.</span>
                        We finalize the referral partnership agreement
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gold font-bold">4.</span>
                        You start referring families and earning commissions
                      </li>
                    </ul>
                  </div>
                </FadeIn>
              </div>

              {/* Right column - form */}
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop&q=60"
            alt=""
            fill
            loading="lazy"
            className="object-cover"
          />
        </div>

        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Serve San Diego Families{' '}
              <span className="text-gradient-gold">Together</span>
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Join a growing network of mortuaries, funeral homes, and
              cremation providers who trust Water &amp; Ash Burials to deliver
              a dignified, premium sea burial experience to their families.
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
