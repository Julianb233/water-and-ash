import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as Sentry from '@sentry/nextjs';
import { contactFormSchema } from '@/lib/validations/contact';
import { withWebhookMonitoring } from '@/lib/monitoring';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // Send email via Resend with monitoring
    const { data, error } = await withWebhookMonitoring(
      'resend',
      '/api/contact',
      () =>
        resend.emails.send({
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
        }),
      { formType: 'contact', service: validatedData.service }
    );

    if (error) {
      console.error('Resend error:', error);
      Sentry.captureMessage(`Resend API error on contact form: ${error.message}`, 'error');
      return NextResponse.json(
        { message: 'Failed to send email. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    Sentry.captureException(error, { tags: { route: '/api/contact' } });

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
