/**
 * AUTO-01: B2C Post-Inquiry Drip Sequence
 *
 * 4-email sequence sent after a family submits the contact form.
 * Grief-sensitive, heart-centered language throughout.
 *
 * Email 1: Immediate — warm acknowledgment
 * Email 2: Day 1 — service details for their selected service
 * Email 3: Day 3 — social proof / family stories
 * Email 4: Day 7 — gentle follow-up with FAQ
 */

import { emailWrapper, BRAND } from '../shared';

export interface B2CLeadDetails {
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
}

// ─── Service Display Names ────────────────────────────────────────────────

const SERVICE_NAMES: Record<string, string> = {
  osprey: 'The Osprey — 62ft Striker Sport Fisher',
  'white-nights': 'White Nights — Hatteras Motor Yacht',
  relentless: 'Relentless — Bali Catamaran',
  'at-home': 'At-Home Memorial Service',
};

const SERVICE_PRICES: Record<string, string> = {
  osprey: '$2,000',
  'white-nights': '$2,000',
  relentless: '$2,000',
  'at-home': '$400',
};

function getServiceName(slug: string): string {
  return SERVICE_NAMES[slug] || slug;
}

function getServicePrice(slug: string): string {
  return SERVICE_PRICES[slug] || 'Contact us for pricing';
}

// ─── Email 1: Immediate Acknowledgment ────────────────────────────────────

export function b2cEmail1Acknowledgment(lead: B2CLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">We Received Your Message</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.name},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Thank you for reaching out to Water & Ash Burials. We understand this is a deeply personal decision, and we are honored that you are considering us to be part of this meaningful journey.</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">A member of our team will personally respond to your inquiry within the next few hours. In the meantime, please know there is no pressure and no rush — we are here whenever you are ready.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;border-left:4px solid ${colors.gold};">
      <tr><td style="padding:24px;">
        <h3 style="margin:0 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">Your Inquiry</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:4px 0;color:${colors.textMuted};font-size:14px;width:100px;">Service</td><td style="padding:4px 0;color:${colors.textDark};font-size:14px;">${getServiceName(lead.service)}</td></tr>
          <tr><td style="padding:4px 0;color:${colors.textMuted};font-size:14px;">Phone</td><td style="padding:4px 0;color:${colors.textDark};font-size:14px;">${lead.phone}</td></tr>
        </table>
      </td></tr>
    </table>
    <p style="margin:20px 0;color:${colors.textDark};font-size:15px;line-height:1.7;">If you have any immediate questions, you can reach us directly:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        <a href="tel:${BRAND.phone.replace(/[^\d+]/g, '')}" style="display:inline-block;background-color:${colors.navy};color:${colors.gold};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">Call Us: ${BRAND.phone}</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">With care,<br />The Water & Ash Team</p>`;

  return {
    subject: `We received your message, ${lead.name}`,
    html: emailWrapper(content, 'Thank you for reaching out to Water & Ash Burials. We will be in touch shortly.'),
  };
}

// ─── Email 2: Day 1 — Service Details ─────────────────────────────────────

export function b2cEmail2ServiceDetails(lead: B2CLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;
  const serviceName = getServiceName(lead.service);
  const servicePrice = getServicePrice(lead.service);
  const isAtHome = lead.service === 'at-home';

  const vesselContent = isAtHome
    ? `
      <p style="margin:0 0 16px;color:${colors.textDark};font-size:14px;line-height:1.7;">Our At-Home Memorial is designed for families who cannot be present in San Diego. For ${servicePrice}, we perform a beautiful ceremony on your behalf and provide:</p>
      <ul style="margin:0 0 16px;padding-left:20px;color:${colors.textDark};font-size:14px;line-height:2;">
        <li>Professional video documentation of the entire ceremony</li>
        <li>Exact GPS coordinates of the burial location</li>
        <li>A personalized ceremony certificate</li>
        <li>Floral tribute placed on your behalf</li>
      </ul>`
    : `
      <p style="margin:0 0 16px;color:${colors.textDark};font-size:14px;line-height:1.7;">The ${serviceName} experience is an all-inclusive ceremony at ${servicePrice}. Here is what is included:</p>
      <ul style="margin:0 0 16px;padding-left:20px;color:${colors.textDark};font-size:14px;line-height:2;">
        <li>Private vessel charter for your family and guests</li>
        <li>Professional ceremony coordination from start to finish</li>
        <li>GPS coordinates and ceremony certificate</li>
        <li>Floral tributes and music playlist customization</li>
        <li>Complimentary refreshments on board</li>
        <li>Optional photography add-on available</li>
      </ul>`;

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">More About ${isAtHome ? 'Your' : 'The'} ${isAtHome ? 'At-Home Memorial' : serviceName.split(' — ')[0]}</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.name},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">We wanted to share a bit more about the service you expressed interest in. Every detail is designed to create a meaningful, peaceful experience for you and your loved ones.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.navy};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:28px;">
        <h3 style="margin:0 0 16px;color:${colors.gold};font-size:14px;letter-spacing:2px;text-transform:uppercase;">${serviceName}</h3>
        ${vesselContent.replace(/color:${colors.textDark}/g, `color:${colors.white}`).replace(/color:#2d3748/g, `color:${colors.white}`)}
      </td></tr>
    </table>
    <h3 style="margin:28px 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">What Makes Us Different</h3>
    <p style="margin:0 0 16px;color:${colors.textDark};font-size:14px;line-height:1.7;">Our captain brings over 10 years of maritime experience and 8 years dedicated specifically to sea burial ceremonies. This is not a side service — it is our calling and our passion.</p>
    <p style="margin:0 0 24px;color:${colors.textDark};font-size:14px;line-height:1.7;">We handle all EPA compliance, California maritime regulations, and insurance requirements so you never have to worry about logistics. Your only job is to be present for the ones you love.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        <a href="${BRAND.url}/services/${lead.service}" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">View Full Service Details</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">With warmth,<br />The Water & Ash Team</p>`;

  return {
    subject: `Everything you need to know about ${isAtHome ? 'our At-Home Memorial' : serviceName.split(' — ')[0]}`,
    html: emailWrapper(content, `Here is what to expect with your ${serviceName} ceremony.`),
  };
}

// ─── Email 3: Day 3 — Social Proof ───────────────────────────────────────

export function b2cEmail3SocialProof(lead: B2CLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">Stories from Families Like Yours</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.name},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Choosing how to honor someone you love is one of the most meaningful decisions you will ever make. We wanted to share what other families have experienced with Water & Ash, in their own words.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid ${colors.gold};margin:24px 0;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 12px;color:${colors.textDark};font-size:15px;line-height:1.7;font-style:italic;">"The ceremony was more beautiful than we ever imagined. The captain was so respectful and kind — he made our family feel completely at peace. My father would have loved every moment of it."</p>
        <p style="margin:0;color:${colors.gold};font-size:14px;font-weight:600;">— The Martinez Family, San Diego</p>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid ${colors.gold};margin:24px 0;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 12px;color:${colors.textDark};font-size:15px;line-height:1.7;font-style:italic;">"We live in Ohio and could not travel to California. The At-Home Memorial service was perfect — they sent us a beautiful video and the exact GPS coordinates. We can visit the spot anytime we are in San Diego."</p>
        <p style="margin:0;color:${colors.gold};font-size:14px;font-weight:600;">— Sarah T., Columbus, OH</p>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:24px;text-align:center;">
        <p style="margin:0 0 4px;color:${colors.navy};font-size:32px;font-weight:600;">100%</p>
        <p style="margin:0;color:${colors.textMuted};font-size:14px;">of families say they would recommend Water & Ash to someone they care about</p>
      </td></tr>
    </table>
    <h3 style="margin:28px 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">Our Give-Back Promise</h3>
    <p style="margin:0 0 24px;color:${colors.textDark};font-size:14px;line-height:1.7;">We believe every family deserves a meaningful farewell, regardless of financial circumstances. Through our Give-Back Program, we provide complimentary ceremonies for families in need. When you choose Water & Ash, you are also supporting this mission.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        <a href="${BRAND.url}/give-back" style="display:inline-block;background-color:${colors.navy};color:${colors.gold};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">Learn About Our Give-Back Program</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">With heart,<br />The Water & Ash Team</p>`;

  return {
    subject: 'What families are saying about their experience',
    html: emailWrapper(content, 'Hear from families who have trusted Water & Ash with their loved one\'s farewell.'),
  };
}

// ─── Email 4: Day 7 — Gentle Follow-Up ───────────────────────────────────

export function b2cEmail4GentleFollowup(lead: B2CLeadDetails): { subject: string; html: string } {
  const { colors } = BRAND;

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">We Are Here When You Are Ready</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${lead.name},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">We know that planning a memorial takes time, and there is absolutely no rush. We simply wanted to check in and let you know that we are still here if you have any questions or would like to talk through your options.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.navy};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:28px;">
        <h3 style="margin:0 0 20px;color:${colors.gold};font-size:14px;letter-spacing:2px;text-transform:uppercase;">Common Questions</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            <p style="margin:0 0 4px;color:${colors.gold};font-size:14px;font-weight:600;">How far in advance should I book?</p>
            <p style="margin:0;color:${colors.white};font-size:13px;line-height:1.6;opacity:0.9;">We recommend booking 2-4 weeks in advance, but we can accommodate shorter timelines when needed.</p>
          </td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            <p style="margin:0 0 4px;color:${colors.gold};font-size:14px;font-weight:600;">What if the weather is bad on our ceremony day?</p>
            <p style="margin:0;color:${colors.white};font-size:13px;line-height:1.6;opacity:0.9;">Safety is our top priority. If conditions are not suitable, we will reschedule at no additional cost.</p>
          </td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            <p style="margin:0 0 4px;color:${colors.gold};font-size:14px;font-weight:600;">Can I bring personal items to place in the water?</p>
            <p style="margin:0;color:${colors.white};font-size:13px;line-height:1.6;opacity:0.9;">Yes — flowers, petals, and biodegradable wreaths are welcome. We will guide you on what is permitted by EPA regulations.</p>
          </td></tr>
          <tr><td style="padding:10px 0;">
            <p style="margin:0 0 4px;color:${colors.gold};font-size:14px;font-weight:600;">Is a deposit required?</p>
            <p style="margin:0;color:${colors.white};font-size:13px;line-height:1.6;opacity:0.9;">A 50% deposit secures your date. The remaining balance is due the day of the ceremony.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    <p style="margin:20px 0;color:${colors.textDark};font-size:15px;line-height:1.7;">If you would like to speak with someone, we are always just a phone call away. No pressure, no obligation — just a caring conversation.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:8px 4px;">
          <a href="tel:${BRAND.phone.replace(/[^\d+]/g, '')}" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:14px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">Call Us</a>
        </td>
        <td align="center" style="padding:8px 4px;">
          <a href="mailto:${BRAND.email}" style="display:inline-block;background-color:${colors.navy};color:${colors.gold};padding:14px 28px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">Email Us</a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">Whenever you are ready, we are here.<br />The Water & Ash Team</p>`;

  return {
    subject: `${lead.name}, we are here whenever you are ready`,
    html: emailWrapper(content, 'No rush — just a gentle check-in and some answers to common questions.'),
  };
}
