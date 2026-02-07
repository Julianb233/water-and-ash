import { z } from 'zod';

export const contactFormSchema = z.object({
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
      'Please enter a valid phone number with only digits, spaces, hyphens, plus signs, and parentheses'
    ),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
