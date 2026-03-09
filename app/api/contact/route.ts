import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';
import { captureLead } from '@/lib/gohighlevel';
import type { LeadSource, LeadSegment } from '@/lib/gohighlevel/types';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

/**
 * POST /api/contact
 *
 * Contact form handler that syncs with GoHighLevel CRM.
 * Maintains backward compatibility with existing form while adding:
 * - GHL contact creation [CRM-01]
 * - Lead source tracking [CRM-02]
 * - Auto-response + owner notification triggers [CRM-03, CRM-04]
 * - Pipeline opportunity creation [CRM-05]
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // Determine lead source and segment from request
    const source: LeadSource = (body.source as LeadSource) || 'website-contact';
    const segment: LeadSegment = (body.segment as LeadSegment) || 'direct-consumer';

    // Capture lead in GoHighLevel CRM
    let ghlContactId: string | undefined;
    try {
      const ghlResult = await captureLead({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        message: validatedData.message,
        source,
        segment,
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
      });
      ghlContactId = ghlResult.contactId;
    } catch (ghlError) {
      // Don't fail the form submission if GHL is down
      console.error('GHL sync error (non-blocking):', ghlError);
    }

    // Send backup email via Resend
    const { error } = await resend.emails.send({
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
        <hr/>
        <p style="color: #666; font-size: 12px;">
          Source: ${source} | Segment: ${segment}
          ${ghlContactId ? ` | GHL Contact: ${ghlContactId}` : ' | GHL: sync pending'}
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      // Still return success if GHL captured the lead
      if (ghlContactId) {
        return NextResponse.json(
          { message: 'Message received. We will be in touch shortly.' },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: 'Failed to send email. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully', contactId: ghlContactId },
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
