import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().max(2000, 'Message is too long').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
