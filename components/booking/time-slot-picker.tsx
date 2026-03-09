'use client';

import { useState, useEffect } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AvailableSlot } from '@/lib/ghl/types';

interface TimeSlotPickerProps {
  vesselId: string;
  date: string | null;
  selectedSlot: { startTime: string; endTime: string } | null;
  onSlotSelect: (slot: { startTime: string; endTime: string }) => void;
  disabled?: boolean;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  });
}

export function TimeSlotPicker({
  vesselId,
  date,
  selectedSlot,
  onSlotSelect,
  disabled,
}: TimeSlotPickerProps) {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vesselId || !date) {
      setSlots([]);
      return;
    }

    let cancelled = false;

    async function fetchSlots() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/calendar/availability?vesselId=${vesselId}&startDate=${date}&endDate=${date}`,
        );

        if (!response.ok) {
          throw new Error('Failed to load time slots');
        }

        const data = await response.json();

        if (!cancelled) {
          const dayData = data.days?.find(
            (d: { date: string }) => d.date === date,
          );
          setSlots(dayData?.slots || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load time slots');
          setSlots([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchSlots();

    return () => {
      cancelled = true;
    };
  }, [vesselId, date]);

  if (!date) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Select a Time <span className="text-destructive">*</span>
        </label>
        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
          <Clock className="mx-auto h-6 w-6 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">
            Please select a date first
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Select a Time <span className="text-destructive">*</span>
      </label>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-gold mr-2" />
          <span className="text-sm text-muted-foreground">
            Loading available times...
          </span>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      ) : slots.length === 0 ? (
        <div className="rounded-xl border border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No available time slots for this date. Please select another date.
          </p>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((slot) => {
            const isSelected =
              selectedSlot?.startTime === slot.startTime &&
              selectedSlot?.endTime === slot.endTime;

            return (
              <button
                key={slot.startTime}
                type="button"
                disabled={!slot.available || disabled}
                onClick={() =>
                  onSlotSelect({
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                  })
                }
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1',
                  {
                    'border-gold bg-gold/10 text-gold font-semibold shadow-sm':
                      isSelected,
                    'border-border hover:border-gold/50 hover:bg-gold/5':
                      !isSelected && slot.available,
                    'border-border/50 text-muted-foreground/40 cursor-not-allowed':
                      !slot.available,
                  },
                )}
                aria-pressed={isSelected}
                aria-label={`${formatTime(slot.startTime)} to ${formatTime(slot.endTime)}${
                  slot.available ? '' : ' - unavailable'
                }`}
              >
                <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>
                  {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
