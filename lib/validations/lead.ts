import { z } from 'zod';

const leadSourceValues = [
  'website-contact',
  'website-funeral-homes',
  'website-mortuaries',
  'website-hospice',
  'website-estate-planners',
  'website-booking',
] as const;

const leadSegmentValues = [
  'direct-consumer',
  'funeral-home',
  'mortuary',
  'hospice',
  'estate-planner',
] as const;

export const leadCaptureSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      'Please enter a valid phone number'
    ),
  service: z.string().optional(),
  message: z
    .string()
    .max(2000, 'Message must be less than 2000 characters')
    .optional(),
  source: z.enum(leadSourceValues),
  segment: z.enum(leadSegmentValues),
  preferredDate: z.string().optional(),
  vesselPreference: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

export const bookingSchema = z.object({
  contactId: z.string().min(1, 'Contact ID is required'),
  calendarId: z.string().min(1, 'Calendar ID is required'),
  vesselPreference: z.string().min(1, 'Vessel selection is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  notes: z.string().max(1000).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const webhookVerifySchema = z.object({
  type: z.string(),
  locationId: z.string(),
  id: z.string(),
});
