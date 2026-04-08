'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, CalendarCheck } from 'lucide-react';
import { VesselSelector } from './vessel-selector';
import { BookingCalendar } from './booking-calendar';
import { TimeSlotPicker } from './time-slot-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { trackConversion, ConversionEvents, getAttribution } from '@/lib/analytics';

/**
 * Multi-step booking form for scheduling a sea burial ceremony.
 *
 * Steps:
 * 1. Select vessel
 * 2. Choose date
 * 3. Pick time slot
 * 4. Fill in contact info
 * 5. Submit booking
 */
export function BookingForm() {
  const router = useRouter();

  // Form state
  const [vesselId, setVesselId] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Get max capacity for selected vessel
  const vesselCapacity: Record<string, number> = {
    osprey: 13,
    'white-nights': 12,
    relentless: 15,
  };
  const maxGuests = vesselCapacity[vesselId] || 15;

  // Handle vessel change — reset date and slot
  const handleVesselChange = useCallback((id: string) => {
    setVesselId(id);
    setSelectedDate(null);
    setSelectedSlot(null);
  }, []);

  // Handle date change — reset slot
  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Client-side validation
    if (!vesselId) {
      setSubmitError('Please select a vessel.');
      setIsSubmitting(false);
      return;
    }

    if (!selectedDate || !selectedSlot) {
      setSubmitError('Please select a date and time slot.');
      setIsSubmitting(false);
      return;
    }

    if (!firstName || !lastName || !email || !phone) {
      setSubmitError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    const guests = parseInt(guestCount, 10);
    if (isNaN(guests) || guests < 1 || guests > maxGuests) {
      setSubmitError(`Guest count must be between 1 and ${maxGuests}.`);
      setIsSubmitting(false);
      return;
    }

    try {
      const attribution = getAttribution();
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vesselId,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          firstName,
          lastName,
          email,
          phone,
          guestCount: guests,
          specialRequests: specialRequests || undefined,
          source: attribution.utm_source || 'website-booking',
          attribution,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      trackConversion(ConversionEvents.BOOKING_SUBMIT, {
        vessel: vesselId,
        guest_count: guests,
      });

      // Redirect to confirmation page with booking details
      const params = new URLSearchParams({
        vessel: data.vessel,
        date: data.date,
        time: `${data.startTime}`,
        appointmentId: data.appointmentId || '',
      });

      router.push(`/book/confirmation?${params.toString()}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to create booking. Please try again or call us at 619-928-9160.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Step 1: Vessel Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white text-xs font-semibold">
            1
          </span>
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Choose Your Vessel
          </h3>
        </div>
        <VesselSelector
          value={vesselId}
          onChange={handleVesselChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Step 2: Date Selection */}
      {vesselId && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white text-xs font-semibold">
              2
            </span>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Choose a Date
            </h3>
          </div>
          <BookingCalendar
            vesselId={vesselId}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            disabled={isSubmitting}
          />
        </div>
      )}

      {/* Step 3: Time Selection */}
      {vesselId && selectedDate && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white text-xs font-semibold">
              3
            </span>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Choose a Time
            </h3>
          </div>
          <TimeSlotPicker
            vesselId={vesselId}
            date={selectedDate}
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
            disabled={isSubmitting}
          />
        </div>
      )}

      {/* Step 4: Contact Information */}
      {vesselId && selectedDate && selectedSlot && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white text-xs font-semibold">
              4
            </span>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Your Information
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="619-928-9160"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestCount">
              Number of Guests <span className="text-destructive">*</span>
            </Label>
            <Input
              id="guestCount"
              type="number"
              placeholder={`1 to ${maxGuests}`}
              min={1}
              max={maxGuests}
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              disabled={isSubmitting}
              required
            />
            <p className="text-xs text-muted-foreground">
              Maximum {maxGuests} guests for this vessel
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">
              Special Requests <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="specialRequests"
              placeholder="Music preferences, flowers, ceremony traditions, or any other details..."
              rows={3}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              We&apos;ll coordinate all ceremony details with you personally.
            </p>
          </div>
        </div>
      )}

      {/* Error display */}
      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
        >
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{submitError}</p>
        </div>
      )}

      {/* Submit */}
      {vesselId && selectedDate && selectedSlot && (
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full btn-gold border-0 rounded-full h-14 text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Scheduling...
            </>
          ) : (
            <>
              <CalendarCheck className="mr-2 h-5 w-5" />
              Schedule Ceremony
            </>
          )}
        </Button>
      )}

      <p className="text-center text-xs text-muted-foreground">
        By scheduling, you agree to our booking terms. A team member will follow up
        to confirm your ceremony details and discuss the deposit.
      </p>
    </form>
  );
}
