'use client';

import { useState } from 'react';
import { MapPin, Calendar, Ship, Anchor, Printer, Download } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/motion-primitives';

interface CertificateData {
  name: string;
  date: string;
  vessel: string;
  latitude: string;
  longitude: string;
  captain: string;
  reference: string;
}

function CertificateDisplay({ data }: { data: CertificateData }) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Print / Download buttons */}
      <div className="flex justify-center gap-4 mb-8 print:hidden">
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="rounded-full"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Certificate
        </Button>
      </div>

      {/* Certificate */}
      <div
        id="certificate"
        className="bg-white border-4 border-double border-gold/40 rounded-lg p-8 sm:p-12 md:p-16 text-center print:border-gold print:shadow-none"
      >
        {/* Header ornament */}
        <div className="flex justify-center mb-6">
          <Anchor className="h-12 w-12 text-gold" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-navy tracking-wide">
          Certificate of Sea Burial
        </h1>

        <div className="mt-2 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />

        <p className="mt-8 text-muted-foreground leading-relaxed max-w-lg mx-auto">
          This certifies that a dignified sea burial ceremony was conducted in
          the waters of the Pacific Ocean off the coast of San Diego, California,
          in full compliance with EPA regulations.
        </p>

        {/* Honoree */}
        <div className="mt-10">
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            In Loving Memory of
          </p>
          <p className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
            {data.name}
          </p>
        </div>

        {/* Details grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto text-left">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Date of Ceremony
              </p>
              <p className="font-medium text-foreground">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Ship className="h-5 w-5 text-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Vessel
              </p>
              <p className="font-medium text-foreground">{data.vessel}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2">
            <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                GPS Coordinates
              </p>
              <p className="font-medium text-foreground font-mono text-sm">
                {data.latitude}, {data.longitude}
              </p>
              <a
                href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold hover:underline mt-1 inline-block print:hidden"
              >
                View on Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-12 pt-8 border-t border-gold/20">
          <p className="text-sm text-muted-foreground">
            Captain {data.captain}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Water & Ash Burials &bull; San Diego, California
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Reference: {data.reference}
          </p>
        </div>

        {/* Footer ornament */}
        <div className="mt-8 flex justify-center">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default function CertificatePage() {
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [error, setError] = useState('');

  // Demo certificate for preview purposes
  const showDemo = () => {
    setCertificate({
      name: 'Robert Charles Mitchell',
      date: '2026-02-15',
      vessel: 'The Osprey — 62-foot Striker',
      latitude: '32.6195° N',
      longitude: '117.2653° W',
      captain: 'James Sullivan',
      reference: 'WA-2026-0215-001',
    });
    setError('');
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden print:pt-4 print:pb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background print:hidden" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center print:hidden">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              GPS{' '}
              <span className="text-gradient-gold">Certificate</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Enter your ceremony reference number to view and print your
              official Certificate of Sea Burial with GPS coordinates.
            </p>
          </FadeIn>

          {/* Lookup form */}
          {!certificate && (
            <FadeIn delay={0.2} className="mx-auto mt-10 max-w-md print:hidden">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // In production this would call an API
                  // For now, show demo
                  showDemo();
                }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="reference"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Ceremony Reference Number
                  </label>
                  <input
                    id="reference"
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="e.g. WA-2026-0215-001"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-gold border-0 rounded-full h-12"
                  disabled={loading}
                >
                  {loading ? 'Looking up...' : 'View Certificate'}
                </Button>
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Your reference number was included in your ceremony
                documentation. If you need help finding it, please{' '}
                <a href="/contact" className="text-gold hover:underline">
                  contact us
                </a>
                .
              </p>
            </FadeIn>
          )}
        </Container>
      </section>

      {/* Certificate Display */}
      {certificate && (
        <section className="pb-20 md:pb-28">
          <Container>
            <CertificateDisplay data={certificate} />

            <div className="mt-8 text-center print:hidden">
              <Button
                variant="ghost"
                onClick={() => {
                  setCertificate(null);
                  setReference('');
                }}
                className="text-muted-foreground"
              >
                Look up another certificate
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
