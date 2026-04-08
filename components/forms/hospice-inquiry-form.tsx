'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import {
  partnerInquirySchema,
  type PartnerInquiryData,
} from '@/lib/validations/partner-inquiry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const hospiceTypes = [
  { value: 'home-hospice', label: 'Home Hospice' },
  { value: 'inpatient-hospice', label: 'Inpatient Hospice Facility' },
  { value: 'palliative-care', label: 'Palliative Care Provider' },
  { value: 'hospice-social-work', label: 'Hospice Social Work' },
  { value: 'bereavement-services', label: 'Bereavement Services' },
  { value: 'other', label: 'Other' },
];

const familyVolumes = [
  { value: '1-5', label: '1-5 families per month' },
  { value: '6-15', label: '6-15 families per month' },
  { value: '16-30', label: '16-30 families per month' },
  { value: '30+', label: '30+ families per month' },
  { value: 'unsure', label: 'Not sure yet' },
];

export function HospiceInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerInquiryData>({
    resolver: zodResolver(partnerInquirySchema),
    defaultValues: {
      businessType: 'hospice',
    },
  });

  const onSubmit = async (data: PartnerInquiryData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          businessType: 'hospice',
          source: 'hospice-landing',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send inquiry');
      }

      router.push('/thank-you?type=partner');
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to send inquiry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register('businessType')} value="hospice" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">
            Your Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactName"
            placeholder="Full name"
            {...register('contactName')}
            aria-invalid={errors.contactName ? 'true' : 'false'}
            aria-describedby={
              errors.contactName ? 'contactName-error' : undefined
            }
            disabled={isSubmitting}
          />
          {errors.contactName && (
            <p id="contactName-error" role="alert" className="text-sm text-destructive">
              {errors.contactName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessName">
            Organization Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="businessName"
            placeholder="Your hospice or care organization"
            {...register('businessName')}
            aria-invalid={errors.businessName ? 'true' : 'false'}
            aria-describedby={
              errors.businessName ? 'businessName-error' : undefined
            }
            disabled={isSubmitting}
          />
          {errors.businessName && (
            <p id="businessName-error" role="alert" className="text-sm text-destructive">
              {errors.businessName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@organization.com"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(619) 555-0100"
            {...register('phone')}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="text-sm text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hospiceType">
            Service Type <span className="text-destructive">*</span>
          </Label>
          <select
            id="hospiceType"
            {...register('referralVolume')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={errors.referralVolume ? 'true' : 'false'}
            aria-describedby={
              errors.referralVolume ? 'hospiceType-error' : undefined
            }
            disabled={isSubmitting}
          >
            <option value="">Select your service type</option>
            {hospiceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.referralVolume && (
            <p id="hospiceType-error" role="alert" className="text-sm text-destructive">
              Please select your service type
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="familyVolume">
            Families You Serve Monthly
          </Label>
          <select
            id="familyVolume"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            <option value="">Select estimated volume</option>
            {familyVolumes.map((vol) => (
              <option key={vol.value} value={vol.value}>
                {vol.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          How do families currently learn about burial options through your organization? (optional)
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your organization and how you'd like to offer sea burial as an option to your families..."
          rows={4}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {submitError && (
        <div role="alert" className="rounded-md bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{submitError}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full btn-gold border-0 rounded-full text-base h-14"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Request Partnership Details'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        We respond with care and sensitivity within one business day.
      </p>
    </form>
  );
}
