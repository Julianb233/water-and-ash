import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/forms/contact-form';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Water & Ash Burials for sea burial services in San Diego. Call 619-928-9160 or fill out our form. We are here to help during this difficult time.',
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
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We&apos;re here to answer your questions and help you plan a
              meaningful ceremony. Take your time, and reach out whenever you&apos;re
              ready.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-3xl font-bold">Get in Touch</h2>
              <p className="mt-4 text-muted-foreground">
                You can reach us by phone, email, or using the contact form.
                We typically respond within a few hours during business hours.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <Card key={item.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-6 w-6 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-medium">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

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
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Send Us a Message
                  </h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-center">
              Common Questions
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">
                  How quickly can you arrange a ceremony?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We can typically schedule ceremonies within a few days to a week,
                  depending on vessel availability and weather conditions. We work
                  with your timeline.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  What should I bring to the ceremony?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Bring the cremated remains in a water-soluble or biodegradable
                  container. We provide floral tributes. You&apos;re welcome to
                  bring readings, music, or other personal items.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  What if someone gets seasick?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Our catamaran (Relentless) is the most stable option. We recommend
                  taking motion sickness medication 30 minutes before departure. The
                  ceremony location is typically calm.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Do you handle all the permits?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes. We ensure full EPA compliance and handle all regulatory
                  requirements. You&apos;ll receive official documentation after
                  the ceremony.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
