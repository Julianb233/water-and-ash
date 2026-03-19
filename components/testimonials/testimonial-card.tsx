'use client';

import { Quote } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/animations/motion-primitives';

const testimonials = [
  {
    quote:
      'Water & Ash gave my father the farewell he always wanted. The crew was incredibly respectful, and the sunset ceremony was the most beautiful thing I have ever witnessed.',
    name: 'Margaret C.',
    relationship: 'Daughter of Robert C.',
  },
  {
    quote:
      'During the hardest week of our lives, this team carried us with such grace. Every detail was handled with care, and we could simply be present with our grief and our love.',
    name: 'David & Linda T.',
    relationship: 'Children of Patricia T.',
  },
  {
    quote:
      'My husband was a Navy veteran who spent his life on the water. There was no more fitting tribute than returning him to the sea. The ceremony was dignified and deeply personal.',
    name: 'Susan R.',
    relationship: 'Wife of Captain James R.',
  },
  {
    quote:
      'We chose the at-home memorial service from out of state, and they treated our mother\'s remains with the same reverence as if we had been there in person. The documentation and photos meant everything to us.',
    name: 'Michael P.',
    relationship: 'Son of Eleanor P.',
  },
  {
    quote:
      'From the very first phone call, I felt like I was talking to family. They never rushed us, answered every question patiently, and created a ceremony that truly honored my grandmother.',
    name: 'Rachel K.',
    relationship: 'Granddaughter of Dorothy K.',
  },
  {
    quote:
      'The Osprey was immaculate, the captain was warm and professional, and the whole experience brought our family a sense of peace we desperately needed. I cannot recommend them enough.',
    name: 'Thomas & Maria G.',
    relationship: 'Family of Antonio G.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Words from{' '}
            <span className="text-gradient-gold">Families We&apos;ve Served</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Every ceremony is a privilege. Here is what families have shared about
            their experience with Water &amp; Ash.
          </p>
        </FadeIn>

        <StaggerContainer className="mx-auto mt-12 sm:mt-16 grid max-w-6xl gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <div className="card-premium rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                {/* Quote icon */}
                <ScaleIn>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 mb-4 sm:mb-5">
                    <Quote className="h-5 w-5 text-gold" />
                  </div>
                </ScaleIn>

                {/* Quote text */}
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gold/15">
                  <p className="font-serif font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {testimonial.relationship}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Divider */}
        <FadeIn delay={0.3}>
          <div className="mt-12 sm:mt-16 divider-gold max-w-xs mx-auto" />
        </FadeIn>
      </Container>
    </section>
  );
}
