import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/forms/contact-form';
import { FadeIn, StaggerContainer, StaggerItem, WaveDivider } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Contact Us - Schedule a Consultation',
  description:
    'Contact Water & Ash Burials for sea burial services in San Diego. Call 619-928-9160 or fill out our form. We respond within hours and are here to help.',
  openGraph: {
    title: 'Contact Water & Ash Burials',
    description:
      'Schedule a consultation for sea burial services in San Diego. Call 619-928-9160 or send us a message.',
  },
};

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '619-928-9160',
    href: 'tel:619-928-9160',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@waterandashburials.org',
    href: 'mailto:info@waterandashburials.org',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Diego, California',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Fri: 9am-5pm',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center" duration={0.8}>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-8 text-muted-foreground">
              We&apos;re here to answer your questions and help you plan a
              meaningful ceremony. Take your time, and reach out whenever you&apos;re
              ready.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <FadeIn direction="left">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">Get in Touch</h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground">
                You can reach us by phone, email, or using the contact form.
                We typically respond within a few hours during business hours.
              </p>

              <StaggerContainer className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <StaggerItem key={item.label}>
                    <div className="card-premium rounded-2xl p-5 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 shrink-0">
                          <item.icon className="h-5 w-5 text-gold" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-medium hover:text-gold transition-colors text-sm sm:text-base break-all"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-medium text-sm sm:text-base">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="mt-8 rounded-lg bg-secondary/30 p-6">
                <h3 className="font-semibold text-lg">What to Expect</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  When you contact us, we&apos;ll discuss your needs, answer your
                  questions, and help you understand your options. There&apos;s no
                  pressure—we&apos;re here to provide information and support.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  We understand this is a difficult time. Our team is trained to
                  provide compassionate guidance while handling all the logistics.
                </p>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="right" delay={0.2}>
              <div className="card-premium rounded-2xl p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Wave: Contact -> FAQ */}
      <WaveDivider fill="var(--color-cream)" variant="gentle" className="bg-background -mb-1" />

      {/* FAQ Section */}
      <section className="bg-cream py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl">
                Common Questions
              </h2>
            </FadeIn>
            <div className="mt-8 space-y-6">
              {[
                {
                  q: 'How quickly can you arrange a ceremony?',
                  a: 'We can typically schedule ceremonies within a few days to a week, depending on vessel availability and weather conditions. We work with your timeline.',
                },
                {
                  q: 'What should I bring to the ceremony?',
                  a: "Bring the cremated remains in a water-soluble or biodegradable container. We provide floral tributes. You're welcome to bring readings, music, or other personal items.",
                },
                {
                  q: 'What if someone gets seasick?',
                  a: 'Our catamaran (Relentless) is the most stable option. We recommend taking motion sickness medication 30 minutes before departure. The ceremony location is typically calm.',
                },
                {
                  q: 'Do you handle all the permits?',
                  a: "Yes. We ensure full EPA compliance and handle all regulatory requirements. You'll receive official documentation after the ceremony.",
                },
              ].map((faq, i) => (
                <FadeIn key={faq.q} delay={i * 0.1} direction="left">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{faq.q}</h3>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">{faq.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
