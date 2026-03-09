import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/animations/motion-primitives';
import { QRGenerator } from '@/components/qr-code/qr-generator';

export const metadata: Metadata = {
  title: 'QR Code Generator — Print Materials',
  description:
    'Generate QR codes for Water & Ash Burials print materials — brochures, business cards, flyers, and partnership materials.',
  robots: { index: false, follow: false },
};

export default function QRPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              QR Code{' '}
              <span className="text-gradient-gold">Generator</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create QR codes for your print materials — brochures, business cards,
              flyers, and partnership collateral. Select a page or enter a custom URL.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Generator */}
      <section className="pb-20 md:pb-28">
        <Container>
          <FadeIn delay={0.2}>
            <QRGenerator />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
