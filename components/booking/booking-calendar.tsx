'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DayAvailability } from '@/lib/ghl/types';

interface BookingCalendarProps {
  vesselId: string;
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  disabled?: boolean;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function BookingCalendar({
  vesselId,
  selectedDate,
  onDateSelect,
  disabled,
}: BookingCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMonths, setLoadedMonths] = useState<Set<string>>(new Set());

  const fetchAvailability = useCallback(
    async (year: number, month: number) => {
      const monthKey = `${year}-${month}-${vesselId}`;
      if (loadedMonths.has(monthKey) || !vesselId) return;

      setIsLoading(true);
      try {
        const startDate = formatDate(year, month, 1);
        const lastDay = new Date(year, month + 1, 0).getDate();
        const endDate = formatDate(year, month, lastDay);

        const response = await fetch(
          `/api/calendar/availability?vesselId=${vesselId}&startDate=${startDate}&endDate=${endDate}`,
        );

        if (response.ok) {
          const data = await response.json();
          setAvailability((prev) => {
            const existing = new Map(prev.map((d) => [d.date, d]));
            for (const day of data.days) {
              existing.set(day.date, day);
            }
            return Array.from(existing.values());
          });
          setLoadedMonths((prev) => new Set([...prev, monthKey]));
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [vesselId, loadedMonths],
  );

  const navigateMonth = (direction: 'prev' | 'next') => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === 'next') {
      newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    } else {
      newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    fetchAvailability(newYear, newMonth);
  };

  // Initial fetch
  if (vesselId && !loadedMonths.has(`${currentYear}-${currentMonth}-${vesselId}`)) {
    fetchAvailability(currentYear, currentMonth);
  }

  // Reset loaded months when vessel changes
  const [lastVessel, setLastVessel] = useState(vesselId);
  if (vesselId !== lastVessel) {
    setLastVessel(vesselId);
    setLoadedMonths(new Set());
    setAvailability([]);
  }

  const { firstDay, daysInMonth } = getMonthDays(currentYear, currentMonth);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);

  const isPrevDisabled =
    currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const isNextDisabled =
    currentYear === maxDate.getFullYear() && currentMonth >= maxDate.getMonth();

  function getDayStatus(day: number): 'available' | 'unavailable' | 'past' | 'loading' {
    const dateStr = formatDate(currentYear, currentMonth, day);
    const date = new Date(currentYear, currentMonth, day);

    if (date < minDate) return 'past';
    if (date > maxDate) return 'unavailable';

    if (isLoading && !loadedMonths.has(`${currentYear}-${currentMonth}-${vesselId}`)) {
      return 'loading';
    }

    const dayData = availability.find((d) => d.date === dateStr);
    if (!dayData) return 'unavailable';

    return dayData.available ? 'available' : 'unavailable';
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Select a Date <span className="text-destructive">*</span>
      </label>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            disabled={isPrevDisabled || disabled}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <h3 className="font-serif font-semibold text-foreground">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>

          <button
            type="button"
            onClick={() => navigateMonth('next')}
            disabled={isNextDisabled || disabled}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-1"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(currentYear, currentMonth, day);
            const status = getDayStatus(day);
            const isSelected = selectedDate === dateStr;
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            return (
              <button
                key={day}
                type="button"
                disabled={status !== 'available' || disabled}
                onClick={() => onDateSelect(dateStr)}
                className={cn(
                  'aspect-square flex items-center justify-center rounded-lg text-sm transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1',
                  {
                    'bg-gold text-white font-semibold shadow-md': isSelected,
                    'hover:bg-gold/10 hover:text-gold cursor-pointer':
                      status === 'available' && !isSelected,
                    'text-muted-foreground/40 cursor-not-allowed':
                      status === 'past' || status === 'unavailable',
                    'text-muted-foreground/60 animate-pulse': status === 'loading',
                    'ring-1 ring-gold/30': isToday && !isSelected,
                  },
                )}
                aria-label={`${MONTH_NAMES[currentMonth]} ${day}, ${currentYear}${
                  status === 'available' ? ' - available' : ' - unavailable'
                }`}
                aria-pressed={isSelected}
              >
                {status === 'loading' ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  day
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            Unavailable
          </span>
        </div>
      </div>
    </div>
  );
}
