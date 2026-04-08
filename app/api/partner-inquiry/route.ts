import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { partnerInquirySchema } from '@/lib/validations/partner-inquiry';
import { enqueueB2BDrip } from '@/lib/emails/drip';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = partnerInquirySchema.parse(body);

    // Send internal notification email
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
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send inquiry. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    // AUTO-02: Enqueue B2B partner nurture drip sequence
    const dripResult = await enqueueB2BDrip({
      contactName: validatedData.contactName,
      businessName: validatedData.businessName,
      email: validatedData.email,
      phone: validatedData.phone,
      businessType: validatedData.businessType,
      referralVolume: validatedData.referralVolume,
      message: validatedData.message,
    });

    if (dripResult.errors.length > 0) {
      console.warn('[drip] B2B drip scheduling errors:', dripResult.errors);
    }

    console.log(`[drip] B2B drip: ${dripResult.scheduled}/4 emails scheduled for ${validatedData.email}`);

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
