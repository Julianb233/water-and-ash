import Link from 'next/link';
import Image from 'next/image';
import { Heart, Shield, Anchor, Waves, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ServiceCard } from '@/components/services/service-card';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-primitives';

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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=85"
            alt="Peaceful ocean waves at golden hour"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 hero-overlay" />
          {/* Bottom fade for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <Container className="relative z-10">
          <FadeIn className="max-w-3xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Waves className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/90">San Diego&apos;s Premier Sea Burial Service</span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Honor Their Memory{' '}
              <span className="text-gradient-gold">at Sea</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl max-w-2xl">
              Compassionate, EPA-compliant ocean ceremonies aboard premium vessels.
              Let the Pacific Ocean be their final resting place, surrounded by the
              beauty they loved.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
                <Link href="/services/osprey">Explore Our Vessels</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '500+', label: 'Families Served' },
                { value: '100%', label: 'EPA Compliant' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gold sm:text-4xl">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-cream">
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

          <StaggerContainer className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.name}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
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

          <StaggerContainer className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="card-premium rounded-2xl p-8 text-center h-full">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20">
                    <point.icon className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Divider */}
          <div className="mt-16 divider-gold max-w-xs mx-auto" />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-navy" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=600&fit=crop&q=60"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              We&apos;re Here When You Need Us
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Whether you&apos;re planning ahead or need immediate assistance,
              our compassionate team is ready to help guide you through every step.
              Take your time — there&apos;s no pressure.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="btn-gold border-0 rounded-full text-base px-8 h-14">
                <Link href="/contact">
                  Start a Conversation
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

            {/* Hours note */}
            <p className="mt-8 text-sm text-white/60">
              Available 7 days a week, 8am - 6pm Pacific
            </p>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
