import Link from 'next/link';
import Image from 'next/image';
import { Ship, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  name: string;
  vessel: string;
  price: string;
  capacity: string;
  description: string;
  href: string;
  imageUrl: string;
}

export function ServiceCard({
  name,
  vessel,
  price,
  capacity,
  description,
  href,
  imageUrl,
}: ServiceCardProps) {
  return (
    <div className="group card-premium rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${name} - ${vessel}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 glass-gold rounded-full px-4 py-2">
          <span className="text-sm font-bold text-navy">{price}</span>
        </div>

        {/* Vessel name on image */}
        <div className="absolute bottom-4 left-4">
          <h3 className="font-serif text-2xl font-bold text-white drop-shadow-lg">
            {name}
          </h3>
          <p className="text-white/90 text-sm flex items-center gap-2 mt-1">
            <Ship className="h-4 w-4" />
            {vessel}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-gold" />
            <span>{capacity}</span>
          </div>

          <Button asChild variant="ghost" className="text-gold hover:text-gold-dark hover:bg-gold/10 group/btn">
            <Link href={href} className="flex items-center gap-2">
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
