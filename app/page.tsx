import Link from 'next/link';
import Image from 'next/image';
import { Heart, Shield, Anchor, Waves, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ServiceCard } from '@/components/services/service-card';
import { Button } from '@/components/ui/button';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Parallax,
  AnimatedButton,
  WaveDivider,
  CountUp,
  Float,
} from '@/components/animations/motion-primitives';
import dynamic from 'next/dynamic';

const TestimonialsSection = dynamic(
  () => import('@/components/testimonials/testimonial-card').then(mod => ({ default: mod.TestimonialsSection })),
  { loading: () => <div className="py-16 md:py-24" /> }
);
const FAQSection = dynamic(
  () => import('@/components/faq/faq-section').then(mod => ({ default: mod.FAQSection })),
  { loading: () => <div className="py-16 md:py-24" /> }
);
const PhotoGallery = dynamic(
  () => import('@/components/gallery/photo-gallery').then(mod => ({ default: mod.PhotoGallery })),
  { loading: () => <div className="py-16 md:py-24" /> }
);

const services = [
  {
    name: 'The Osprey',
    vessel: '62-foot Striker',
    price: '$2,000',
    capacity: 'Up to 13 passengers',
    description: 'Our flagship vessel offering the perfect blend of comfort and dignity for your memorial service at sea.',
    href: '/services/osprey',
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop&q=80',
  },
  {
    name: 'White Nights',
    vessel: '58-foot Hatteras',
    price: '$2,000',
    capacity: 'Up to 12 passengers',
    description: 'A luxurious motor yacht providing an elegant and intimate setting for your farewell ceremony.',
    href: '/services/white-nights',
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop&q=80',
  },
  {
    name: 'Relentless',
    vessel: '45-foot Bali Catamaran',
    price: '$2,000',
    capacity: 'Up to 15 passengers',
    description: 'A stable and spacious catamaran, ideal for larger gatherings and those seeking extra comfort.',
    href: '/services/relentless',
    imageUrl: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop&q=80',
  },
  {
    name: 'At-Home Memorial',
    vessel: 'Mail-in Service',
    price: '$400',
    capacity: 'Private ceremony',
    description: 'We perform the burial on your behalf and provide you with detailed ceremony documentation.',
    href: '/services/at-home',
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=600&fit=crop&q=80',
  },
];

const trustPoints = [
  {
    icon: Heart,
    title: 'Compassionate Care',
    description:
      'We understand this is a difficult time. Our team provides dignified, respectful service with genuine empathy.',
  },
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description:
      'Fully licensed and insured for your peace of mind. All ceremonies are EPA compliant.',
  },
  {
    icon: Anchor,
    title: 'Maritime Excellence',
    description:
      'Premium vessels with experienced captains ensuring safe, smooth voyages every time.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <Parallax speed={-0.2} className="absolute inset-0 z-0 -top-[10%] -bottom-[10%]">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=85"
            alt="Peaceful ocean waves at golden hour"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </Parallax>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-overlay z-[1]" />
        {/* Bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-[2]" />

        <Container className="relative z-10">
          <FadeIn className="max-w-3xl" duration={0.8}>
            {/* Tagline */}
            <Float amplitude={4} duration={5}>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <Waves className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-white/90">San Diego&apos;s Premier Sea Burial Service</span>
              </div>
            </Float>

            <FadeIn delay={0.2} direction="up">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Honor Their Memory{' '}
                <span className="text-gradient-gold">at Sea</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl max-w-2xl">
                Compassionate, EPA-compliant ocean ceremonies aboard premium vessels.
                Let the Pacific Ocean be their final resting place, surrounded by the
                beauty they loved.
              </p>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <AnimatedButton>
                  <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14 w-full sm:w-auto">
                    <Link href="/contact">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </AnimatedButton>
                <AnimatedButton>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="glass border-white/30 text-white hover:bg-white/10 rounded-full text-base px-8 h-14 w-full sm:w-auto"
                  >
                    <Link href="/services/osprey">Explore Our Vessels</Link>
                  </Button>
                </AnimatedButton>
              </div>
            </FadeIn>

            {/* Quick Stats */}
            <FadeIn delay={0.8} direction="up">
              <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '500+', label: 'Families Served' },
                  { value: '100%', label: 'EPA Compliant' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <CountUp
                      value={stat.value}
                      className="text-2xl font-bold text-gold sm:text-3xl md:text-4xl"
                    />
                    <div className="text-xs text-white/70 mt-1 sm:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </FadeIn>
        </Container>
      </section>

      {/* Wave: Hero -> Services */}
      <WaveDivider fill="var(--color-cream)" variant="gentle" className="wave-fill-cream -mt-1 bg-transparent" />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Our Fleet</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Choose Your Vessel
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Each of our vessels offers a unique experience for your memorial ceremony.
              All services include ceremony coordination and official documentation.
            </p>
          </FadeIn>

          <StaggerContainer className="mx-auto mt-16 grid max-w-6xl gap-6 sm:gap-8 sm:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.name}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Wave: Services -> Trust */}
      <WaveDivider fill="var(--color-cream)" variant="dramatic" flip className="bg-background -mb-1" />

      {/* Trust Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Why Families Choose{' '}
              <span className="text-gradient-gold">Water & Ash</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We combine professional maritime excellence with genuine compassion
              to serve San Diego families during their most difficult moments.
            </p>
          </FadeIn>

          <StaggerContainer className="mx-auto mt-16 grid max-w-5xl gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="card-premium rounded-2xl p-6 sm:p-8 text-center h-full">
                  <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                    <point.icon className="h-7 w-7 sm:h-8 sm:w-8 text-gold" />
                  </div>
                  <h3 className="mt-5 sm:mt-6 font-serif text-lg sm:text-xl font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Divider */}
          <FadeIn delay={0.3}>
            <div className="mt-16 divider-gold max-w-xs mx-auto" />
          </FadeIn>
        </Container>
      </section>

      {/* Wave: Trust -> Testimonials */}
      <WaveDivider fill="var(--color-cream)" variant="double" className="-mb-1 bg-background" />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Wave: Testimonials -> FAQ */}
      <WaveDivider fill="var(--color-cream)" variant="gentle" flip className="bg-background -mb-1" />

      {/* FAQ Section */}
      <FAQSection />

      {/* Wave: FAQ -> Gallery */}
      <WaveDivider fill="var(--color-background)" variant="dramatic" flip className="bg-cream -mb-1" />

      {/* Photo Gallery Section */}
      <PhotoGallery />

      {/* Wave: Gallery -> CTA */}
      <WaveDivider
        fill="oklch(0.18 0.05 250)"
        variant="double"
        className="bg-cream -mb-1"
      />

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-navy" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=600&fit=crop&q=60"
            alt=""
            fill
            loading="lazy"
            className="object-cover"
          />
        </div>

        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              We&apos;re Here When You Need Us
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed">
              Whether you&apos;re planning ahead or need immediate assistance,
              our compassionate team is ready to help guide you through every step.
              Take your time -- there&apos;s no pressure.
            </p>

            <FadeIn delay={0.2} direction="up">
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <AnimatedButton>
                  <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14 w-full sm:w-auto">
                    <Link href="/contact">
                      Start a Conversation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </AnimatedButton>
                <AnimatedButton>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="glass border-white/30 text-white hover:bg-white/10 rounded-full text-base px-8 h-14 w-full sm:w-auto"
                  >
                    <a href="tel:619-928-9160" className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call 619-928-9160
                    </a>
                  </Button>
                </AnimatedButton>
              </div>
            </FadeIn>

            {/* Hours note */}
            <FadeIn delay={0.4}>
              <p className="mt-8 text-sm text-white/60">
                Available 7 days a week, 8am - 6pm Pacific
              </p>
            </FadeIn>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
