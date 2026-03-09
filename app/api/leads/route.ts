import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { leadCaptureSchema } from '@/lib/validations/lead';
import { captureLead } from '@/lib/gohighlevel';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

/**
 * POST /api/leads
 *
 * Unified lead capture endpoint that:
 * 1. Validates form data
 * 2. Creates/updates contact in GoHighLevel [CRM-01]
 * 3. Creates opportunity in appropriate pipeline [CRM-05, CRM-06]
 * 4. Tracks lead source [CRM-02]
 * 5. Triggers automations (auto-response, drip, owner notification) [CRM-03, CRM-04, AUTO-01, AUTO-02]
 * 6. Sends backup email notification via Resend
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = leadCaptureSchema.parse(body);

    // Capture lead in GHL (contact + opportunity + automations)
    let ghlResult: Awaited<ReturnType<typeof captureLead>> | null = null;
    try {
      ghlResult = await captureLead(validatedData);
    } catch (ghlError) {
      // Log GHL error but don't fail the request — we still send email
      console.error('GHL lead capture error:', ghlError);
    }

    // Send backup email notification via Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.RESEND_TO_EMAIL || 'info@waterandashburials.org',
        subject: `New Lead: ${validatedData.name} - ${validatedData.service || 'General'} [${validatedData.source}]`,
        html: buildNotificationEmail(validatedData, ghlResult),
      });
    } catch (emailError) {
      console.error('Resend email error:', emailError);
    }

    return NextResponse.json(
      {
        message: 'Thank you for reaching out. We will be in touch shortly.',
        contactId: ghlResult?.contactId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead capture error:', error);

    if (error instanceof Error && error.message.includes('parse')) {
      return NextResponse.json(
        { message: 'Please check your form inputs and try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred. Please call us at 619-928-9160.' },
      { status: 500 }
    );
  }
}

function buildNotificationEmail(
  data: {
    name: string;
    email: string;
    phone: string;
    service?: string;
    message?: string;
    source: string;
    segment: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  },
  ghlResult: { contactId: string; opportunityId: string; isExisting: boolean } | null
): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a2744; color: #d4a853; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">New Lead from Water & Ash Website</h2>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${data.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td>${data.service || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Source:</td><td>${data.source}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Segment:</td><td>${data.segment}</td></tr>
          ${data.utmCampaign ? `<tr><td style="padding: 8px 0; font-weight: bold;">Campaign:</td><td>${data.utmCampaign}</td></tr>` : ''}
        </table>
        ${data.message ? `<div style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 6px;"><strong>Message:</strong><br/>${data.message}</div>` : ''}
        ${ghlResult ? `
          <div style="margin-top: 16px; padding: 12px; background: #ecfdf5; border-radius: 6px; font-size: 13px;">
            <strong>GHL Status:</strong> ${ghlResult.isExisting ? 'Updated existing' : 'New'} contact<br/>
            Contact ID: ${ghlResult.contactId}<br/>
            Opportunity ID: ${ghlResult.opportunityId}
          </div>
        ` : '<div style="margin-top: 16px; padding: 12px; background: #fef2f2; border-radius: 6px; font-size: 13px;"><strong>Warning:</strong> GHL sync failed. Please add this lead manually.</div>'}
      </div>
    </div>
  `;
}
