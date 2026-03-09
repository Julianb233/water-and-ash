import { z } from 'zod';

export const partnerInquirySchema = z.object({
  contactName: z
    .string()
    .min(1, 'Contact name is required')
    .max(100, 'Name is too long'),
  businessName: z
    .string()
    .min(1, 'Business name is required')
    .max(200, 'Business name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  businessType: z.string().min(1, 'Please select your business type'),
  referralVolume: z.string().min(1, 'Please select estimated referral volume'),
  message: z.string().max(2000, 'Message is too long').optional(),
});

export type PartnerInquiryData = z.infer<typeof partnerInquirySchema>;
