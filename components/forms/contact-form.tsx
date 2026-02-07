'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const services = [
  { value: 'osprey', label: 'The Osprey' },
  { value: 'white-nights', label: 'White Nights' },
  { value: 'relentless', label: 'Relentless' },
  { value: 'at-home', label: 'At-Home Memorial' },
  { value: 'general', label: 'General Inquiry' },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      router.push('/thank-you');
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Your full name"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="619-928-9160"
          {...register('phone')}
          aria-invalid={errors.phone ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">
          Service <span className="text-destructive">*</span>
        </Label>
        <select
          id="service"
          {...register('service')}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={errors.service ? 'true' : 'false'}
          disabled={isSubmitting}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-sm text-destructive">{errors.service.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          placeholder="Please share any details that will help us serve you better. Take your time."
          rows={5}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          We understand this is a difficult time. We&apos;re here to help.
        </p>
      </div>

      {submitError && (
        <div className="rounded-md bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{submitError}</p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
