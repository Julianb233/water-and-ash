'use client';

import { cn } from '@/lib/utils';

interface VesselSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const vessels = [
  {
    id: 'osprey',
    name: 'The Osprey',
    description: 'Our flagship vessel for intimate ceremonies',
  },
  {
    id: 'white-nights',
    name: 'White Nights',
    description: 'Elegant vessel for larger gatherings',
  },
  {
    id: 'relentless',
    name: 'Relentless',
    description: 'Rugged and reliable for all conditions',
  },
];

export function VesselSelector({ value, onChange, disabled }: VesselSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {vessels.map((vessel) => (
        <button
          key={vessel.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(vessel.id)}
          className={cn(
            'rounded-lg border-2 p-4 text-left transition-all hover:border-gold/60',
            value === vessel.id
              ? 'border-gold bg-gold/5'
              : 'border-border bg-background',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <h4 className="font-serif font-semibold text-foreground">{vessel.name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{vessel.description}</p>
        </button>
      ))}
    </div>
  );
}
