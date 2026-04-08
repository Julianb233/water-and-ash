import { describe, it, expect } from 'vitest';
import { partnerInquirySchema } from '@/lib/validations/partner-inquiry';

describe('partnerInquirySchema', () => {
  const validData = {
    contactName: 'Dr. James Wilson',
    businessName: 'Wilson Memorial Services',
    email: 'james@wilsonmemorial.com',
    phone: '858-555-0100',
    businessType: 'mortuary',
    referralVolume: '6-15',
    message: 'Interested in partnering.',
  };

  it('accepts valid partner inquiry data', () => {
    expect(() => partnerInquirySchema.parse(validData)).not.toThrow();
  });

  it('accepts valid data without optional message', () => {
    const { message, ...dataWithoutMessage } = validData;
    expect(() => partnerInquirySchema.parse(dataWithoutMessage)).not.toThrow();
  });

  it('rejects missing contactName', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, contactName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing businessName', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, businessName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, email: 'not-email' });
    expect(result.success).toBe(false);
  });

  it('rejects missing phone', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, phone: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing businessType', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, businessType: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing referralVolume', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, referralVolume: '' });
    expect(result.success).toBe(false);
  });

  it('rejects contactName over 100 characters', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, contactName: 'A'.repeat(101) });
    expect(result.success).toBe(false);
  });

  it('rejects businessName over 200 characters', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, businessName: 'A'.repeat(201) });
    expect(result.success).toBe(false);
  });

  it('rejects message over 2000 characters', () => {
    const result = partnerInquirySchema.safeParse({ ...validData, message: 'A'.repeat(2001) });
    expect(result.success).toBe(false);
  });
});
