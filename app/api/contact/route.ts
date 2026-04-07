import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';
import { createContact } from '@/lib/ghl/contacts';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // Split name into first/last for GHL
    const nameParts = validatedData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create/upsert contact in GHL with lead source tracking (CRM-01, CRM-02, CRM-07)
    let contactId: string | undefined;
    try {
      const contact = await createContact({
        firstName,
        lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        source: 'website-contact-form',
        serviceInterest: validatedData.service,
        notes: validatedData.message,
        tags: ['website-lead', 'contact-form'],
      });
      contactId = contact.id;
      console.log(`[contact] GHL contact created/updated: ${contact.id}`);
    } catch (ghlError) {
      // Don't fail the form submission if GHL is down — email still goes out
      console.error('[contact] GHL contact creation failed (non-blocking):', ghlError);
    }

    // Send email via Resend
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
        ${contactId ? `<p><em>GHL Contact ID: ${contactId}</em></p>` : ''}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send email. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully', data, contactId },
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
