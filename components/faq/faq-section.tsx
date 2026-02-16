'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/animations/motion-primitives';

const faqs = [
  {
    question: 'What is a sea burial or ash scattering ceremony?',
    answer:
      'A sea burial is a meaningful farewell where cremated remains are committed to the ocean during a private ceremony aboard one of our vessels. We sail to EPA-designated waters off the coast of San Diego, where your family can say goodbye surrounded by the beauty of the Pacific.',
  },
  {
    question: 'Is a sea burial legal? What are the EPA requirements?',
    answer:
      'Yes, sea burials are fully legal. The EPA requires that cremated remains be scattered at least 3 nautical miles from shore. Water & Ash is fully licensed and insured, and we handle all required documentation and compliance, including filing the EPA burial-at-sea report on your behalf.',
  },
  {
    question: 'What should we bring or wear to the ceremony?',
    answer:
      'We recommend comfortable, layered clothing and flat, non-marking shoes suitable for a boat. Many families bring flowers, photos, letters, or other meaningful items to include in the ceremony. We provide biodegradable wreaths and flower petals as part of the service.',
  },
  {
    question: 'How long does the ceremony last?',
    answer:
      'A typical ceremony lasts approximately 2 to 3 hours, including the voyage out to sea, the ceremony itself, and the return trip. We never rush the experience -- your family can take all the time they need.',
  },
  {
    question: 'Can we bring our own officiant or clergy?',
    answer:
      'Absolutely. Many families choose to bring their own minister, priest, rabbi, or celebrant. We also have a non-denominational ceremony script available if you prefer, or our experienced captain can lead a simple, respectful service.',
  },
  {
    question: 'What happens if there is bad weather?',
    answer:
      'Safety is our top priority. If weather conditions are unfavorable, we will contact you to reschedule at no additional charge. Our experienced captains monitor conditions closely and will always make the call that keeps your family safe.',
  },
  {
    question: 'How many people can attend the ceremony?',
    answer:
      'Capacity varies by vessel: The Osprey accommodates up to 13 guests, White Nights up to 12, and Relentless up to 15. For larger groups, we can arrange multiple vessels or coordinate back-to-back ceremonies.',
  },
  {
    question: 'What documentation do you provide after the ceremony?',
    answer:
      'After every ceremony, we provide an official Certificate of Sea Burial with the exact GPS coordinates, date, and time. We also file the required EPA burial-at-sea report. Many families find the certificate and coordinates bring comfort for future remembrance visits.',
  },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Container className="relative">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">Common Questions</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Frequently Asked{' '}
            <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We understand you may have many questions. Here are answers to the ones
            families ask most often.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mx-auto mt-16 max-w-3xl">
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="card-premium rounded-2xl overflow-hidden"
              >
                <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left group cursor-pointer">
                  <span className="font-serif font-semibold text-foreground pr-4 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gold shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </FadeIn>

        {/* Divider */}
        <div className="mt-16 divider-gold max-w-xs mx-auto" />
      </Container>
    </section>
  );
}
