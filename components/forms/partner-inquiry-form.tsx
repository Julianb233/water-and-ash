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

const businessTypes = [
  { value: 'mortuary', label: 'Mortuary' },
  { value: 'funeral-home', label: 'Funeral Home' },
  { value: 'crematory', label: 'Crematory' },
  { value: 'hospice', label: 'Hospice Provider' },
  { value: 'estate-planner', label: 'Estate Planner' },
  { value: 'other', label: 'Other' },
];

const referralVolumes = [
  { value: '1-5', label: '1-5 per month' },
  { value: '6-15', label: '6-15 per month' },
  { value: '16-30', label: '16-30 per month' },
  { value: '30+', label: '30+ per month' },
  { value: 'unsure', label: 'Not sure yet' },
];

export function PartnerInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerInquiryData>({
    resolver: zodResolver(partnerInquirySchema),
  });

  const onSubmit = async (data: PartnerInquiryData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">
            Contact Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactName"
            placeholder="Your full name"
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
            Business Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="businessName"
            placeholder="Your mortuary or business"
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
            placeholder="you@business.com"
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
            placeholder="619-928-9160"
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
          <Label htmlFor="businessType">
            Business Type <span className="text-destructive">*</span>
          </Label>
          <select
            id="businessType"
            {...register('businessType')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={errors.businessType ? 'true' : 'false'}
            aria-describedby={
              errors.businessType ? 'businessType-error' : undefined
            }
            disabled={isSubmitting}
          >
            <option value="">Select your business type</option>
            {businessTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p id="businessType-error" role="alert" className="text-sm text-destructive">
              {errors.businessType.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="referralVolume">
            Estimated Monthly Referrals <span className="text-destructive">*</span>
          </Label>
          <select
            id="referralVolume"
            {...register('referralVolume')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={errors.referralVolume ? 'true' : 'false'}
            aria-describedby={
              errors.referralVolume ? 'referralVolume-error' : undefined
            }
            disabled={isSubmitting}
          >
            <option value="">Select estimated volume</option>
            {referralVolumes.map((vol) => (
              <option key={vol.value} value={vol.value}>
                {vol.label}
              </option>
            ))}
          </select>
          {errors.referralVolume && (
            <p id="referralVolume-error" role="alert" className="text-sm text-destructive">
              {errors.referralVolume.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Details (optional)</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your mortuary and what you're looking for in a sea burial partner..."
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
          'Request Partnership Information'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        We typically respond to partnership inquiries within 24 hours.
      </p>
    </form>
  );
}
