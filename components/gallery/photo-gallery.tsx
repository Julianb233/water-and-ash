'use client';

import Image from 'next/image';
import { Camera } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/animations/motion-primitives';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
    alt: 'Golden sunset over calm Pacific waters',
    span: 'col-span-1 row-span-1 sm:col-span-2 sm:row-span-2',
    sizes: '(max-width: 640px) 100vw, 66vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop&q=80',
    alt: 'Serene ocean horizon at dusk',
    span: 'col-span-1 row-span-1',
    sizes: '(max-width: 640px) 100vw, 33vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop&q=80',
    alt: 'Gentle waves washing ashore at twilight',
    span: 'col-span-1 row-span-1',
    sizes: '(max-width: 640px) 100vw, 33vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80',
    alt: 'Morning light reflecting on the ocean surface',
    span: 'col-span-1 row-span-1',
    sizes: '(max-width: 640px) 100vw, 33vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=600&h=400&fit=crop&q=80',
    alt: 'Flower petals drifting on calm sea water',
    span: 'col-span-1 row-span-1',
    sizes: '(max-width: 640px) 100vw, 33vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop&q=80',
    alt: 'Panoramic view of sunset clouds over the Pacific',
    span: 'col-span-1 sm:col-span-2 row-span-1',
    sizes: '(max-width: 640px) 100vw, 66vw',
  },
];

export function PhotoGallery() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
            <Camera className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">Gallery</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            The Beauty of a{' '}
            <span className="text-gradient-gold">Sea Farewell</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Every ceremony takes place against the breathtaking backdrop of the
            Pacific Ocean. These moments of beauty bring comfort and peace.
          </p>
        </FadeIn>

        <StaggerContainer className="mx-auto mt-12 sm:mt-16 max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((image) => (
            <StaggerItem key={image.src} className={image.span}>
              <ScaleIn>
                <div className="group relative rounded-2xl overflow-hidden h-full min-h-[200px] sm:min-h-[240px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes={image.sizes}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors duration-500 flex items-end">
                    <p className="text-white text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                      {image.alt}
                    </p>
                  </div>
                  {/* Subtle border */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/10 group-hover:ring-gold/30 transition-all duration-500" />
                </div>
              </ScaleIn>
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
