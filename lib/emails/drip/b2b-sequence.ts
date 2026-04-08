/**
 * AUTO-02: B2B Partner Nurture Drip Sequence
 *
 * 4-email sequence sent after a business submits a partnership inquiry.
 * Professional, value-focused language for funeral homes, hospice, estate planners.
 *
 * Email 1: Immediate — partnership inquiry acknowledgment
 * Email 2: Day 2 — partnership benefits & revenue model
 * Email 3: Day 5 — co-marketing materials preview
 * Email 4: Day 10 — schedule a call CTA
 */

import { emailWrapper, BRAND } from '../shared';

export interface B2BLeadDetails {
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  referralVolume: string;
  message?: string;
}

// ─── Business Type Display Names ──────────────────────────────────────────

const BUSINESS_TYPE_NAMES: Record<string, string> = {
  'funeral-home': 'Funeral Home',
  mortuary: 'Mortuary',
  crematory: 'Crematory',
  hospice: 'Hospice Organization',
  'estate-planner': 'Estate Planning Firm',
  'elder-care': 'Elder Care Provider',
  other: 'Organization',
};

function getBusinessTypeName(slug: string): string {
  return BUSINESS_TYPE_NAMES[slug] || slug;
}

// ─── Email 1: Immediate Acknowledgment ────────────────────────────────────

export function b2bEmail1Acknowledgment(lead: B2BLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;
  const typeName = getBusinessTypeName(lead.businessType);

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">Thank You for Your Interest in Partnering</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Thank you for reaching out on behalf of ${lead.businessName}. We are excited about the possibility of working together to provide families with a premium sea burial option.</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">A member of our partnership team will personally follow up within the next 24 hours to discuss how we can best serve your families and create a mutually beneficial relationship.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;border-left:4px solid ${colors.gold};">
      <tr><td style="padding:24px;">
        <h3 style="margin:0 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">Your Inquiry</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:4px 0;color:${colors.textMuted};font-size:14px;width:140px;">Business</td><td style="padding:4px 0;color:${colors.textDark};font-size:14px;">${lead.businessName}</td></tr>
          <tr><td style="padding:4px 0;color:${colors.textMuted};font-size:14px;">Type</td><td style="padding:4px 0;color:${colors.textDark};font-size:14px;">${typeName}</td></tr>
          <tr><td style="padding:4px 0;color:${colors.textMuted};font-size:14px;">Est. Referrals</td><td style="padding:4px 0;color:${colors.textDark};font-size:14px;">${lead.referralVolume}/month</td></tr>
        </table>
      </td></tr>
    </table>
    <p style="margin:20px 0 0;color:${colors.textDark};font-size:15px;line-height:1.7;">In the meantime, feel free to explore our <a href="${BRAND.url}/funeral-homes" style="color:${colors.gold};text-decoration:underline;">partnership overview</a> to see how we work with ${typeName.toLowerCase()}s like yours.</p>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">Best regards,<br />The Water & Ash Partnerships Team</p>`;

  return {
    subject: `Partnership inquiry received — ${lead.businessName}`,
    html: emailWrapper(content, `Thank you for your partnership inquiry, ${lead.contactName}. We will follow up within 24 hours.`),
  };
}

// ─── Email 2: Day 2 — Partnership Benefits & Revenue Model ───────────────

export function b2bEmail2Benefits(lead: B2BLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">The Water & Ash Partnership Model</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Sea burial is one of the fastest-growing memorial options in coastal markets. With cremation rates above 70% in San Diego, more families are asking about alternatives to traditional scattering — and most funeral professionals do not have a partner to refer them to.</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">That is where our partnership comes in.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.navy};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:28px;">
        <h3 style="margin:0 0 20px;color:${colors.gold};font-size:14px;letter-spacing:2px;text-transform:uppercase;">How It Works</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            <p style="margin:0;color:${colors.gold};font-size:14px;font-weight:600;">1. Family expresses interest in sea burial</p>
            <p style="margin:4px 0 0;color:${colors.white};font-size:13px;opacity:0.9;">During arrangement or at any point — you simply mention the option.</p>
          </td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            <p style="margin:0;color:${colors.gold};font-size:14px;font-weight:600;">2. Hand them a co-branded brochure or direct to our site</p>
            <p style="margin:4px 0 0;color:${colors.white};font-size:13px;opacity:0.9;">We provide all printed and digital materials at no cost to you.</p>
          </td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            <p style="margin:0;color:${colors.gold};font-size:14px;font-weight:600;">3. We handle everything</p>
            <p style="margin:4px 0 0;color:${colors.white};font-size:13px;opacity:0.9;">Scheduling, ceremony coordination, EPA compliance, insurance — all handled.</p>
          </td></tr>
          <tr><td style="padding:10px 0;">
            <p style="margin:0;color:${colors.gold};font-size:14px;font-weight:600;">4. You earn a referral fee</p>
            <p style="margin:4px 0 0;color:${colors.white};font-size:13px;opacity:0.9;">Deposited quarterly, no invoicing required from your end.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;">
      <tr>
        <td style="padding:20px;text-align:center;width:33%;">
          <p style="margin:0 0 4px;color:${colors.navy};font-size:28px;font-weight:600;">$2,000</p>
          <p style="margin:0;color:${colors.textMuted};font-size:12px;">Average service value</p>
        </td>
        <td style="padding:20px;text-align:center;width:33%;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
          <p style="margin:0 0 4px;color:${colors.navy};font-size:28px;font-weight:600;">2-5</p>
          <p style="margin:0;color:${colors.textMuted};font-size:12px;">Referrals/month avg.</p>
        </td>
        <td style="padding:20px;text-align:center;width:33%;">
          <p style="margin:0 0 4px;color:${colors.navy};font-size:28px;font-weight:600;">$0</p>
          <p style="margin:0;color:${colors.textMuted};font-size:12px;">Cost to you</p>
        </td>
      </tr>
    </table>
    <p style="margin:20px 0 24px;color:${colors.textDark};font-size:15px;line-height:1.7;">The partnership is non-exclusive, has no minimum commitment, and can be cancelled anytime. There is truly no risk — only upside for your families and your business.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        <a href="${BRAND.url}/funeral-homes" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">See Full Partnership Details</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">Best regards,<br />The Water & Ash Partnerships Team</p>`;

  return {
    subject: `How ${lead.businessName} can earn with sea burial referrals`,
    html: emailWrapper(content, 'Here is how our turnkey partnership model works — and what it means for your bottom line.'),
  };
}

// ─── Email 3: Day 5 — Co-Marketing Materials Preview ─────────────────────

export function b2bEmail3CoMarketing(lead: B2BLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">Your Co-Branded Materials Are Ready</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">When you partner with Water & Ash, we do not just hand you a phone number and say "good luck." We invest in your success with a complete co-marketing toolkit — customized with your branding.</p>
    <h3 style="margin:28px 0 16px;color:${colors.navy};font-size:16px;font-weight:600;">What You Receive as a Partner</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:16px;background-color:${colors.lightGray};border-radius:8px;margin-bottom:8px;">
          <p style="margin:0 0 4px;color:${colors.navy};font-size:15px;font-weight:600;">Co-Branded Brochures & Flyers</p>
          <p style="margin:0;color:${colors.textMuted};font-size:13px;line-height:1.6;">Professional print materials with your logo and contact information alongside ours. Perfect for arrangement rooms and display stands.</p>
        </td>
      </tr>
      <tr><td style="height:8px;"></td></tr>
      <tr>
        <td style="padding:16px;background-color:${colors.lightGray};border-radius:8px;">
          <p style="margin:0 0 4px;color:${colors.navy};font-size:15px;font-weight:600;">Digital Assets for Your Website</p>
          <p style="margin:0;color:${colors.textMuted};font-size:13px;line-height:1.6;">Web banners, social media graphics, and copy you can use on your website to showcase sea burial as a service option.</p>
        </td>
      </tr>
      <tr><td style="height:8px;"></td></tr>
      <tr>
        <td style="padding:16px;background-color:${colors.lightGray};border-radius:8px;">
          <p style="margin:0 0 4px;color:${colors.navy};font-size:15px;font-weight:600;">QR Codes for Your Facility</p>
          <p style="margin:0;color:${colors.textMuted};font-size:13px;line-height:1.6;">Custom QR codes linking to your personalized landing page. Place them in brochure racks, arrangement rooms, or reception areas.</p>
        </td>
      </tr>
      <tr><td style="height:8px;"></td></tr>
      <tr>
        <td style="padding:16px;background-color:${colors.lightGray};border-radius:8px;">
          <p style="margin:0 0 4px;color:${colors.navy};font-size:15px;font-weight:600;">Staff Training Session</p>
          <p style="margin:0;color:${colors.textMuted};font-size:13px;line-height:1.6;">A 30-minute overview for your arrangement staff so they can confidently present sea burial as an option to families.</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.navy};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:24px;text-align:center;">
        <p style="margin:0 0 8px;color:${colors.gold};font-size:16px;font-weight:600;">All materials are provided at no cost to you.</p>
        <p style="margin:0;color:${colors.white};font-size:14px;opacity:0.9;">We believe in investing in partnerships that serve families well.</p>
      </td></tr>
    </table>
    <p style="margin:20px 0 24px;color:${colors.textDark};font-size:15px;line-height:1.7;">We would love to get ${lead.businessName}'s logo and start creating your custom materials. The sooner we get started, the sooner your families will have a premium sea burial option at their fingertips.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        <a href="mailto:${BRAND.email}?subject=Partnership Materials — ${encodeURIComponent(lead.businessName)}" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">Send Us Your Logo to Get Started</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">Best regards,<br />The Water & Ash Partnerships Team</p>`;

  return {
    subject: `Co-branded materials for ${lead.businessName} — ready when you are`,
    html: emailWrapper(content, `Here is what ${lead.businessName} receives as a Water & Ash partner — all at no cost.`),
  };
}

// ─── Email 4: Day 10 — Schedule a Call CTA ────────────────────────────────

export function b2bEmail4ScheduleCall(lead: B2BLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">Let's Make This Easy</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">We know you are busy running ${lead.businessName}, so we will keep this brief.</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">We would love to spend 15 minutes walking you through how the partnership works in practice — referral tracking, payment schedules, and how we coordinate with your staff. No commitment, just a conversation.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:24px;">
        <h3 style="margin:0 0 16px;color:${colors.navy};font-size:16px;font-weight:600;">What We Will Cover</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:6px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">✓ &nbsp; How families are referred and tracked</td></tr>
          <tr><td style="padding:6px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">✓ &nbsp; Referral fee structure and quarterly deposits</td></tr>
          <tr><td style="padding:6px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">✓ &nbsp; Co-branded materials tailored for ${lead.businessName}</td></tr>
          <tr><td style="padding:6px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">✓ &nbsp; Staff training options (virtual or in-person)</td></tr>
          <tr><td style="padding:6px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">✓ &nbsp; Your questions — anything at all</td></tr>
        </table>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:16px 0;">
        <a href="${BRAND.url}/book" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:16px 40px;border-radius:6px;text-decoration:none;font-size:15px;font-weight:600;letter-spacing:1px;">Schedule a 15-Minute Call</a>
      </td></tr>
      <tr><td align="center" style="padding:0;">
        <p style="margin:0;color:${colors.textMuted};font-size:13px;">Or reply to this email and we will find a time that works.</p>
      </td></tr>
    </table>
    <p style="margin:24px 0 16px;color:${colors.textDark};font-size:15px;line-height:1.7;">If now is not the right time, that is completely fine. You can always reach out when you are ready — our door is always open.</p>
    <p style="margin:0 0 24px;color:${colors.textDark};font-size:15px;line-height:1.7;">We look forward to the possibility of working together to serve more families with the dignity and care they deserve.</p>
    <p style="margin:0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">Warm regards,<br />The Water & Ash Partnerships Team</p>`;

  return {
    subject: `15 minutes — let's explore the partnership, ${lead.contactName}`,
    html: emailWrapper(content, `A quick call to walk through how ${lead.businessName} can offer sea burial as a service.`),
  };
}
