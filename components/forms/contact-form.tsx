'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';

const services = [
  { value: 'osprey', label: 'The Osprey' },
  { value: 'white-nights', label: 'White Nights' },
  { value: 'relentless', label: 'Relentless' },
  { value: 'at-home', label: 'At-Home Memorial' },
  { value: 'general', label: 'General Inquiry' },
];

interface ContactFormProps {
  /** Lead source identifier for CRM tracking [CRM-02] */
  source?: string;
  /** Lead segment for pipeline routing [CRM-05, CRM-06] */
  segment?: string;
  /** Custom submit button text */
  submitLabel?: string;
}

export function ContactForm({
  source = 'website-contact',
  segment = 'direct-consumer',
  submitLabel = 'Send Message',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract UTM parameters for lead source tracking [CRM-02, LAND-06]
  const [utmParams, setUtmParams] = useState<{
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }>({});

  useEffect(() => {
    setUtmParams({
      utmSource: searchParams.get('utm_source') || undefined,
      utmMedium: searchParams.get('utm_medium') || undefined,
      utmCampaign: searchParams.get('utm_campaign') || undefined,
    });
  }, [searchParams]);

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
        body: JSON.stringify({
          ...data,
          source,
          segment,
          ...utmParams,
        }),
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
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-sm text-destructive">{errors.name.message}</p>
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
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>
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
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="text-sm text-destructive">{errors.phone.message}</p>
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
          aria-describedby={errors.service ? 'service-error' : undefined}
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
          <p id="service-error" role="alert" className="text-sm text-destructive">{errors.service.message}</p>
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
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-destructive">{errors.message.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          We understand this is a difficult time. We&apos;re here to help.
        </p>
      </div>

      {submitError && (
        <div role="alert" className="rounded-md bg-destructive/10 p-4">
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
          submitLabel
        )}
      </Button>
    </form>
  );
}
