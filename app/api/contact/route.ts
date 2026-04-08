import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';
import { enqueueB2CDrip } from '@/lib/emails/drip';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // Send internal notification email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'info@waterandashburials.org',
      subject: `New Contact Form Submission - ${validatedData.service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Service:</strong> ${validatedData.service}</p>
        ${validatedData.message ? `<p><strong>Message:</strong></p><p>${validatedData.message}</p>` : ''}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send email. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    // AUTO-01: Enqueue B2C post-inquiry drip sequence
    const dripResult = await enqueueB2CDrip({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      service: validatedData.service,
      message: validatedData.message,
    });

    if (dripResult.errors.length > 0) {
      console.warn('[drip] B2C drip scheduling errors:', dripResult.errors);
    }

    console.log(`[drip] B2C drip: ${dripResult.scheduled}/4 emails scheduled for ${validatedData.email}`);

    return NextResponse.json(
      { message: 'Message sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
