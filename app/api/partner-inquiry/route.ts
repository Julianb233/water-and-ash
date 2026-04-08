import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { partnerInquirySchema } from '@/lib/validations/partner-inquiry';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { attribution, ...formData } = body;
    const validatedData = partnerInquirySchema.parse(formData);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'info@waterandashburials.org',
      subject: `New Partnership Inquiry - ${validatedData.businessName}`,
      html: `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Contact Name:</strong> ${validatedData.contactName}</p>
        <p><strong>Business Name:</strong> ${validatedData.businessName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Business Type:</strong> ${validatedData.businessType}</p>
        <p><strong>Estimated Monthly Referrals:</strong> ${validatedData.referralVolume}</p>
        ${validatedData.message ? `<p><strong>Message:</strong></p><p>${validatedData.message}</p>` : ''}
        <hr />
        <p><em>This inquiry was submitted from the Mortuaries partnership page.</em></p>
        ${attribution?.utm_source ? `<p style="color:#888;font-size:12px;"><strong>Lead Source:</strong> ${attribution.utm_source}${attribution.utm_medium ? ` / ${attribution.utm_medium}` : ''}${attribution.utm_campaign ? ` (${attribution.utm_campaign})` : ''}${attribution.referrer ? ` | Referrer: ${attribution.referrer}` : ''}</p>` : ''}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send inquiry. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Partnership inquiry sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Partner inquiry error:', error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
