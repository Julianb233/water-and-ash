# Research Summary: Water & Ash Burials Website & CRM Integration

**Project:** Water & Ash Burials - Premium Sea Burial Service (San Diego)
**Business Model:** $2k+ celebration-of-life ceremonies with give-back program
**Target Launch:** Demo-ready for Vegas convention (end of February 2026)
**Synthesized:** 2026-01-27

---

## Executive Summary

Water & Ash Burials represents a premium alternative in the death care industry, positioned between budget direct cremation ($400-800) and traditional burial ($7k-12k). Success depends on three pillars:

1. **Premium digital presence** that justifies $2k+ pricing through sophisticated design and flawless UX
2. **Seamless CRM automation** via GoHighLevel that handles time-sensitive lead response (<1 hour) and booking coordination
3. **Referral partnership infrastructure** targeting funeral homes, hospice organizations, and estate planners as primary lead sources

This synthesis distills insights from four research domains (Stack, Features, Architecture, Pitfalls) into strategic guidance for build execution.

---

## 1. Strategic Insights from Research

### Market Positioning Insights

**Celebration vs. Traditional Funeral:** Industry shift accelerated by pandemic. Millennials/Gen X prefer "celebration of life" over traditional funeral rituals. Water & Ash's vessel-based ceremonies align perfectly with this demographic preference for personalized, meaningful experiences vs. prescribed religious rituals.

**Premium Justification Model:** The $2,000 price point requires three-layer justification:
- **Tangible:** Professional vessels (62-foot Osprey), Coast Guard-licensed captain, included photography, GPS coordinates keepsake
- **Experiential:** 2-hour Pacific ceremony, music/slideshow customization, flower arrangements, intimate group setting
- **Values-aligned:** Give-back program funding free services for underserved families demonstrates social mission

**Competitive Differentiation Gaps:** San Diego sea burial competitors lack:
- Real-time booking availability (all use contact forms)
- Virtual vessel tours (generic yacht marketing)
- Celebration-of-life positioning (traditional/formal language)
- Spanish language support (missing 30%+ of San Diego market)
- Transparent online pricing (hidden behind "request quote")

### Operational Insights

**Lead Response as Competitive Weapon:** Harvard research shows 60x higher qualification rate with <1 hour response vs 24 hours. For time-sensitive death care (body handling within days), response speed is existential. Automated 5-minute acknowledgment + human follow-up within 1 hour is table stakes.

**B2B Channel Complexity:** Funeral home referral partners need fundamentally different treatment than direct consumer leads:
- B2B: Partnership materials, commission structure clarity, co-marketing collateral, bulk referral pricing
- B2C: Compassionate consultation, service details, booking guidance, grief-sensitive communication

Mixing these journeys destroys both conversion paths.

**Calendar as Single Point of Failure:** Double-booking disasters are catastrophic for vessel-based services. GoHighLevel calendar requires strict configuration: conflict calendar connection, "appointments per slot = 1", BUSY event status, resource-based scheduling per vessel. Manual booking bypasses create cascading failures.

### Technology Insights

**Modular Monolith Appropriateness:** Research confirms microservices are inappropriate for small service businesses. A well-structured Next.js monolith with clear internal boundaries (presentation → business logic → integrations) provides simplicity without sacrificing professionalism.

**Server-First Architecture Benefit:** Next.js 15/16's React Server Components deliver critical SEO advantages for local service discovery while Server Actions eliminate API route boilerplate for form handling. 80%+ of components should be RSC, with Client Components only for interactive elements.

**Webhook Reliability Requirements:** GoHighLevel doesn't retry 5xx errors. Stripe/GHL webhooks require application-level idempotency tracking, immediate 200 OK responses (<2 seconds), and async processing to prevent timeout retry storms.

---

## 2. Recommended Stack Decisions

### Core Framework (HIGH Confidence)

| Technology | Version | Rationale |
|------------|---------|-----------|
| **Next.js** | 16.x | Turbopack default (5-10x faster), RSC stable for SEO, best GoHighLevel integration examples |
| **React** | 19.2.4 | Server Components + Server Actions, security patches (Jan 26, 2026) |
| **TypeScript** | 5.7+ | Type safety across DB → API → UI, GoHighLevel API interface typing |
| **Tailwind CSS** | 4.1 | 5x faster builds, cascade layers for navy/gold/white premium palette |
| **shadcn/ui** | Latest | Component library (not dependency), Radix accessibility primitives, luxury customization |

### Forms & Validation (HIGH Confidence)

| Technology | Version | Rationale |
|------------|---------|-----------|
| **React Hook Form** | 7.54+ | Minimal re-renders, shadcn/ui integration, uncontrolled components performance |
| **Zod** | 3.24+ | Type inference from schemas, runtime validation for webhooks, client + server validation |

### Integrations (MEDIUM-HIGH Confidence)

| Technology | Version | Rationale |
|------------|---------|-----------|
| **GoHighLevel API** | v2 (OAuth 2.0) | CRM source of truth, v1 end-of-support, webhook-driven architecture |
| **Stripe** | 17.x + @stripe/stripe-js 5.x | Payment Links for simplicity, superior webhook infrastructure, native Server Actions support |
| **Resend** | 4.x | Built for Next.js, React Email templates, booking confirmation emails |
| **Cloudinary** | next-cloudinary 6.x | Automatic WebP/AVIF, responsive sizing for vessel photos, CDN delivery |

### Database & Performance (MEDIUM-HIGH Confidence)

| Technology | Version | Rationale |
|------------|---------|-----------|
| **PostgreSQL + Drizzle ORM** | postgres 3.4 + drizzle-orm 0.37 | Lighter than Prisma, zero cold-start overhead, SQL transparency for serverless |
| **Framer Motion** | motion 5.2 | Premium animations (parallax, hover effects), 60fps smooth, better React integration than GSAP for UI |

### Deployment & Monitoring (HIGH Confidence)

| Technology | Version | Rationale |
|------------|---------|-----------|
| **Vercel** | Pro plan | Zero-config Next.js deployment, preview deployments for client demos, Postgres integration |
| **Sentry** | @sentry/nextjs 8.x | Real-time error tracking, performance monitoring, critical for production CRM/payment integrations |

### Testing (MEDIUM-HIGH Confidence)

| Technology | Version | Rationale |
|------------|---------|-----------|
| **Vitest + RTL** | vitest 3.x + @testing-library/react 16.x | 10x faster than Jest, unit tests for forms and utilities |
| **Playwright** | @playwright/test 1.49 | E2E tests for critical flows (lead capture → GHL → Stripe → confirmation) |

**Key Stack Principle:** Prioritize proven, maintained libraries with active Next.js ecosystems. Avoid bleeding-edge for Vegas deadline.

---

## 3. Table Stakes vs Differentiator Features

### Table Stakes (Missing = Credibility Loss)

**Must-Have for Launch:**
- ✅ Service descriptions with transparent pricing (per vessel/ceremony type)
- ✅ Mobile-responsive design (60%+ traffic mobile, grieving families coordinating remotely)
- ✅ Contact form with <5 minute auto-response, <1 hour human follow-up
- ✅ Professional vessel photo galleries (Osprey, White Nights, Relentless interiors)
- ✅ Service area information (San Diego coastal, nautical miles offshore)
- ✅ Video testimonials (emotional authenticity beats text)
- ✅ SSL security (HTTPS for payment data)
- ✅ Clear navigation (5-7 main items max, grieving users have limited cognitive bandwidth)
- ✅ Privacy policy (legal requirement for data collection)

**Quality Standards:**
- Lighthouse Performance score 90+ (mobile)
- WCAG 2.1 AA accessibility minimum (ADA compliance)
- PageSpeed LCP < 2.5 seconds
- Form completion rate >60% (industry standard ~50%)

### Differentiators (Competitive Advantage)

**High-Value, Build Early:**
- 🎯 **Interactive vessel comparison** (Osprey 62ft vs White Nights 58ft vs Relentless 45ft)
- 🎯 **Give-back program visibility** (dedicated page, values-driven buyer appeal)
- 🎯 **Celebration-of-life positioning** (photo/video galleries showing joy/color vs dark/somber)
- 🎯 **Real-time availability calendar** (reduces booking friction, competitors only offer contact forms)
- 🎯 **Referral partner portal** (/funeral-homes, /hospice, /estate-planners with dedicated workflows)

**Medium-Value, Phase 2-3:**
- 📹 Video virtual vessel tours (2-3 min ceremony-focused walkthroughs)
- 🌐 Spanish language support (San Diego Latino community)
- 📸 Ceremony photography included (premium positioning, shareable memories)
- 📍 GPS coordinates certificate (unique keepsake, families can revisit location)
- 🙏 Spiritual/secular ceremony script library (demonstrates flexibility)

**Low-Priority, Validate Demand First:**
- Live streaming capability (maritime internet expensive/unreliable)
- Payment plan financing (Affirm/Klarna adds underwriting complexity)
- Online memorial guest book (extends ceremony beyond 2 hours)

### Anti-Features (Deliberately Avoid)

**Design/UX:**
- ❌ Dark/gothic/cemetery aesthetics (conflicts with celebration positioning)
- ❌ Auto-play music on homepage (universally hated, jarring for grieving visitors)
- ❌ Chatbot for initial contact (high-touch $2k+ service needs human)
- ❌ Generic stock photography (undermines premium positioning)
- ❌ Complex multi-step forms (grieving users have limited patience)

**Business Model:**
- ❌ "Discount" or "cheap" messaging (conflicts with premium positioning)
- ❌ Forced account creation (one-time service, friction point)
- ❌ E-commerce cart experience (ceremony isn't a product, feels transactional)
- ❌ Pricing behind "Request Quote" (transparency is competitive advantage)

---

## 4. Recommended Architecture Pattern

### Pattern: Server-First Modular Monolith

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 16 APP                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │       MARKETING & PRESENTATION LAYER (RSC)                 │ │
│  │  • Public pages (SEO-optimized, server-rendered)           │ │
│  │  • Vessel showcases, about, contact                        │ │
│  │  • Landing pages (/funeral-homes, /hospice, /estate)       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↕                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           BUSINESS LOGIC LAYER (Server Actions)            │ │
│  │  • Form submissions (lead capture, booking)                │ │
│  │  • Data validation & enrichment (Zod schemas)              │ │
│  │  • Payment orchestration (Stripe checkout sessions)        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↕                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │       EXTERNAL INTEGRATION LAYER (API Routes)              │ │
│  │  • GoHighLevel client (OAuth 2.0)                          │ │
│  │  • Stripe client (webhooks only)                           │ │
│  │  • API routes for external webhooks ONLY                   │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
        ┌──────────────────────────────────────────────┐
        │        EXTERNAL SERVICES (3rd Party)          │
        │  ┌──────────────┐      ┌──────────────────┐  │
        │  │  GoHighLevel │      │  Stripe Payments │  │
        │  │  • CRM/Pipeline      │  • Checkout      │  │
        │  │  • Calendar          │  • Webhooks      │  │
        │  │  • Automations       │  • Refunds       │  │
        │  └──────────────┘      └──────────────────┘  │
        └──────────────────────────────────────────────┘
```

### Architectural Principles

**1. Component Boundaries:**
- Marketing pages = React Server Components (SEO, performance)
- Forms = Client Components (interactivity, validation feedback)
- Form processing = Server Actions (type-safe, no manual fetch)
- External webhooks = API Routes (public HTTP endpoints)

**2. Data Flow Patterns:**

**Lead Capture Flow:**
```
User visits /funeral-homes landing page
   ↓ (RSC renders SEO-optimized content)
User fills form (Client Component, client-side validation)
   ↓ (Submits via Server Action)
Server Action validates (Zod), enriches (UTM params, source)
   ↓ (Server-to-server)
GoHighLevel API creates contact + opportunity
   ↓
Success confirmation + GHL automation trigger
```

**Booking + Payment Flow:**
```
User clicks "Book Now" on vessel page
   ↓
Server Action creates Stripe Checkout Session (server-side pricing)
   ↓
User completes payment on Stripe hosted page
   ↓
Stripe webhook → /api/webhooks/stripe
   ↓ (Signature verification)
Update GHL opportunity: "Deposit Paid"
   ↓
GHL automation: Send booking confirmation email
```

**3. Key Decision Trees:**

**Server Actions vs API Routes:**
- External caller (Stripe, GHL, Zapier)? → API Route
- UI mutation (form submit, booking)? → Server Action
- GET from Client Component? → API Route or Server Component (caching dependent)
- Default → Server Component with RSC

**4. Security Layers:**

**Never Expose Client-Side:**
- GoHighLevel API keys
- Stripe secret keys
- Pricing logic (always fetch server-side)

**Always Verify:**
- GoHighLevel webhooks: RSA signature with public key
- Stripe webhooks: HMAC with signing secret
- Form inputs: Zod validation server-side (never trust client)

**5. Reliability Patterns:**

**Idempotent Webhook Processing:**
```typescript
async function handleWebhook(webhookId: string) {
  // Check if already processed
  if (await isProcessed(webhookId)) return 'duplicate'

  // Return 200 OK immediately
  processAsync(webhookId).catch(console.error)

  // Mark processed AFTER successful completion
  await markProcessed(webhookId)
}
```

**Retry Logic with Exponential Backoff:**
- GHL API failures: 1s → 2s → 4s → 8s → 16s → 32s max
- Cache calendar availability (5-minute TTL) to reduce API calls
- Webhook delivery monitoring: alert if 3+ consecutive failures

### Source of Truth Assignments

| Data Domain | Source of Truth | Rationale |
|-------------|----------------|-----------|
| Contact info, pipeline status, calendar | **GoHighLevel** | CRM owns customer relationship data |
| Marketing content, pricing display | **Next.js** | Website owns presentation layer |
| Payment status, transaction history | **Stripe** | Payment processor owns financial data |

**Conflict Resolution:** Always trust source of truth. If discrepancy, fetch fresh from authoritative system.

---

## 5. Top Risks to Mitigate

### Critical Risks (Existential)

**Risk 1: Lead Response Delays → Lost Conversions**
- **Impact:** 60x lower qualification rate beyond 1 hour. Time-sensitive death care means families book with first responder.
- **Mitigation:**
  - Automated 5-minute email acknowledgment (GHL workflow)
  - SMS + Email notification to owner for every lead
  - GHL mobile app push notifications
  - Response time dashboard: <1 hour goal for 90% of leads
- **Phase:** Phase 02 - GoHighLevel CRM Integration

**Risk 2: Calendar Double-Booking → Operational Catastrophe**
- **Impact:** Two families book same vessel/time. Discovering 48 hours before service creates impossible situation.
- **Mitigation:**
  - GHL calendar: Appointments per slot = 1 (strict)
  - Google Calendar conflict detection (BUSY events only)
  - Resource-based scheduling (separate calendar per vessel)
  - Test concurrent booking attempts before launch
  - Manual confirmation call within 24 hours of booking
- **Phase:** Phase 02 - GoHighLevel CRM Integration

**Risk 3: Webhook Integration Silent Failures → Data Loss**
- **Impact:** Form submissions don't sync to GHL. Payment confirmations don't trigger workflows. Business loses 30%+ of leads silently.
- **Mitigation:**
  - GHL Webhook Logs Dashboard monitoring
  - Application-level retry logic (GHL doesn't retry 5xx)
  - Hourly test webhook to verify connectivity
  - Alert if 3+ consecutive failures
  - Idempotency tracking (prevent duplicate processing)
- **Phase:** Phase 02 - GoHighLevel CRM Integration

**Risk 4: Mobile Performance Destroying Premium Perception**
- **Impact:** Luxury design sacrifices mobile speed. 5+ second load times on smartphones = immediate abandonment. Families search at hospitals/hospice facilities.
- **Mitigation:**
  - Lighthouse Performance score 90+ (mobile)
  - LCP < 2.5 seconds
  - Responsive images (WebP/AVIF via Cloudinary)
  - Mobile-first CSS approach
  - Test on actual devices, not just simulators
- **Phase:** Phase 01 - Website Rebuild

**Risk 5: Vegas Demo Unpreparedness → Missed Partnerships**
- **Impact:** Convention is 5 weeks away. Demo focusing on tech features vs business value won't win funeral home partnerships.
- **Mitigation:**
  - Demo script focused on funeral director pain points
  - Prepare 3-minute and 10-minute versions
  - Demo assets: /funeral-homes page, mobile booking flow, sample automation emails
  - Practice with role-play, prepare objection answers
  - Prioritize demo flow over complete feature set
- **Phase:** Phase 04 - Pre-Launch Prep

### High Risks (Significant Impact)

**Risk 6: Stripe Fund Holds → Cash Flow Crisis**
- **Impact:** 7-10 day first payout delay + potential reserve holds for high-value transactions. Operating expenses unmet.
- **Mitigation:**
  - Account for payout delay in launch cash flow planning
  - Maintain 30-day operating expense reserve outside Stripe
  - Document clear refund policy (reduce chargebacks)
  - Monitor payout schedule dashboard daily
- **Phase:** Phase 03 - Payment Processing

**Risk 7: Untested Automations → Customer Service Disasters**
- **Impact:** Post-service review requests sent before ceremony. Deposit reminders to families who paid. Wrong vessel type in emails.
- **Mitigation:**
  - Create comprehensive test contact records for each journey
  - Test every workflow trigger manually
  - Verify all conditional logic paths (if/then scenarios)
  - 24-hour minimum delay before automated follow-ups
  - Grief-sensitive copy review for all automation emails
- **Phase:** Phase 02 - GoHighLevel CRM Integration

**Risk 8: Undifferentiated Lead Handling → B2B/B2C Confusion**
- **Impact:** Funeral home partners receive consumer-focused follow-up. Direct consumers receive partnership materials. Both conversion paths destroyed.
- **Mitigation:**
  - Lead source tracking: funeral-homes page, hospice page, estate-planners page, direct consumer
  - Separate pipelines or tagging: B2B vs B2C
  - Different automation sequences per lead type
  - Phone scripts/email templates per persona
- **Phase:** Phase 01 (landing pages) + Phase 02 (CRM segmentation)

### Medium Risks (Manageable Impact)

**Risk 9: EPA Reporting Failures → Legal Exposure**
- **Impact:** Federal law requires 30-day reporting. Late/missing reports risk EPA penalties and business license issues.
- **Mitigation:**
  - CRM workflow: Service Complete → EPA Report Task (auto-created)
  - Capture GPS coordinates, burial date, decedent contact info during service
  - 30-day reminder automation
  - Track reporting status: Report Filed checkbox + date
  - Monthly audit: verify all services have EPA reports
- **Phase:** Phase 02 - GoHighLevel CRM Integration

**Risk 10: Technical Debt from Demo Rush → Post-Launch Breakage**
- **Impact:** Shortcuts to meet Vegas deadline: hard-coded values, skipped tests, no error handling. Site breaks under real traffic in March.
- **Mitigation:**
  - Time-box features: if >50% over estimate, descope
  - MVP ruthlessly: 1 form perfect > 3 forms poor
  - Write tests for critical paths: form submission, payment, booking
  - Environment variables for all config (not hard-coded)
  - Plan "Technical Debt Week" first week of March
- **Phase:** All phases (quality principle)

---

## 6. Build Phases Based on Research

### Phase 01: Foundation & Marketing (Week 1-2)

**Goal:** Static website with premium design demonstrating celebration-of-life positioning

**Deliverables:**
- Next.js 16 project setup (App Router, TypeScript, Tailwind v4, shadcn/ui)
- Design system: Navy/gold/white palette, typography (max 2 font families), component library
- Marketing pages (RSC): Home, About, Contact
- Service pages: The Osprey, White Nights, Relentless, At-Home Memorial
- Landing pages: /funeral-homes, /hospice, /estate-planners (different messaging per audience)
- Professional vessel photo galleries (via Cloudinary)
- SSL/HTTPS, privacy policy, WCAG 2.1 AA accessibility
- Vercel deployment with preview environments

**Success Criteria:**
- Lighthouse Performance score 90+ (mobile)
- LCP < 2.5 seconds
- Premium aesthetic: no stock photos, sophisticated typography, generous white space
- Demo-ready for Vegas: can show /funeral-homes page on laptop

**Critical Pitfalls to Avoid:**
- Grief-insensitive design (aggressive CTAs, overwhelming layouts)
- Mobile-first failure (sacrificing mobile for desktop aesthetics)
- Budget aesthetic (stock photos, template design, inconsistent typography)
- Transactional tone (corporate language vs heart-centered approach)

---

### Phase 02: GoHighLevel CRM Integration (Week 2-4)

**Goal:** Lead capture forms syncing to GHL with automated response workflows

**Deliverables:**
- GoHighLevel API setup (OAuth 2.0 or Private API Key)
- Lead capture form components (Client Components with React Hook Form + Zod)
- Server Actions: captureLeadAction, createOpportunityAction
- GHL Contacts API integration (create contact with UTM tracking)
- GHL Opportunities API integration (create opportunity, set pipeline stage)
- Calendar configuration:
  - Conflict calendar connection (Google Calendar)
  - Resource-based scheduling (per vessel)
  - Appointments per slot = 1 (strict)
  - Test concurrent booking prevention
- Webhook endpoints:
  - /api/webhooks/gohighlevel (signature verification, idempotency tracking)
  - Handle: contact.created, opportunity.status_changed, appointment.created
- Automation workflows:
  - Immediate lead acknowledgment (<5 min)
  - Owner SMS/Email notification for new leads
  - Response time tracking dashboard
- Lead segmentation:
  - B2B tags: funeral-home, hospice, estate-planner
  - B2C tags: direct-consumer
  - Separate automation sequences per segment
- EPA reporting workflow:
  - Service Complete → EPA Report Task (auto-created)
  - 30-day reminder automation
  - Report Filed tracking

**Success Criteria:**
- Lead submitted → GHL contact created within 30 seconds
- Automated email acknowledgment within 5 minutes
- Owner notification (SMS + Email) immediate
- Zero calendar double-bookings in testing
- Response time <1 hour for 90% of test leads
- Webhook delivery 99%+ success rate

**Critical Pitfalls to Avoid:**
- Lead response delays (>1 hour = 60x lower conversion)
- Calendar double-booking (existential operational failure)
- Untested automations (post-service review before ceremony)
- Webhook silent failures (no monitoring/alerting)
- Undifferentiated leads (B2B receiving B2C messaging)
- CRM over-engineering (15+ pipeline stages, 30+ custom fields)

---

### Phase 03: Payment Processing (Week 4-5)

**Goal:** Stripe checkout integration for deposit collection with booking confirmation

**Deliverables:**
- Stripe account setup (test mode, then production)
- Server Action: createCheckoutSessionAction (server-side pricing)
- "Book Now" buttons on vessel pages (Client Components)
- Stripe Checkout Session creation:
  - Line items with service name, price (hard-coded server-side)
  - Metadata: serviceType, ghlContactId, ghlOpportunityId, source
  - Success URL, cancel URL
- Webhook endpoint: /api/webhooks/stripe
  - Signature verification (HMAC)
  - Idempotency tracking (event.id)
  - Handle: checkout.session.completed
  - Update GHL opportunity: "Deposit Paid"
  - Return 200 OK within 2 seconds (async processing)
- Booking confirmation page: /booking/success?session_id={SESSION_ID}
- Booking cancellation page: /booking/cancelled
- Clear deposit terms:
  - Refund policy (14+ days: full, 7-14 days: 50%, <7 days: none)
  - Weather rescheduling policy (free rescheduling for unsafe conditions)
  - Checkbox acknowledgment before payment
- GHL automation trigger: Deposit Paid → Send booking confirmation email
- Resend email templates:
  - Booking confirmation with ceremony details
  - Cancellation confirmation with refund timeline

**Success Criteria:**
- End-to-end booking flow: vessel page → book now → Stripe checkout → confirmation
- Payment confirmation → GHL update within 60 seconds
- Booking confirmation email within 5 minutes
- Zero payment processing errors in testing
- Clear refund policy on confirmation page and email
- Chargeback rate <0.5%

**Critical Pitfalls to Avoid:**
- Stripe fund holds (7-10 day first payout not accounted for)
- Unclear deposit terms (ambiguous cancellation/refund policy)
- Client-side pricing (user manipulates payment amount)
- Synchronous webhook processing (timeout → retry storm)

---

### Phase 04: Pre-Launch Preparation (Week 5-6)

**Goal:** Demo-ready for Vegas convention with monitoring and polish

**Deliverables:**
- Vegas demo preparation:
  - Demo script (3-minute + 10-minute versions)
  - Demo assets: /funeral-homes page, mobile booking flow, automation emails
  - Role-play practice with objection handling
  - Partnership materials: sample agreement, co-marketing flyer
- Error monitoring: Sentry integration
- Analytics implementation:
  - Traffic by landing page
  - Form submissions (inquiry, booking)
  - Conversion rates: visitor → inquiry, inquiry → consultation, consultation → deposit
  - Response time tracking
  - Lead source attribution (UTM parameters)
- Performance optimization:
  - Cloudinary image optimization (WebP/AVIF)
  - Lazy loading below-the-fold content
  - Framer Motion animations (hero parallax, vessel card hovers)
  - Critical CSS inline
- Testing:
  - Playwright E2E tests: lead capture flow, booking flow, webhook processing
  - Vitest unit tests: form validation, utility functions
  - Manual QA: mobile devices, cross-browser (Chrome, Firefox, Safari)
- Deployment checklist:
  - Environment variables verification (production keys)
  - Webhook endpoints configured (production URLs)
  - DNS configuration
  - SSL certificate
  - Analytics verification
- Documentation:
  - Deployment runbook
  - CRM workflow documentation
  - Webhook troubleshooting guide
  - Demo script

**Success Criteria:**
- Demo executable in 3 minutes (elevator pitch) or 10 minutes (full walkthrough)
- All critical paths tested (E2E tests passing)
- Lighthouse Performance 90+ (mobile)
- Error tracking operational (Sentry receiving events)
- Analytics tracking verified (events flowing to dashboard)
- Deployment repeatable (documented runbook)

**Critical Pitfalls to Avoid:**
- Vegas demo unprepared (tech features vs business value)
- Success metrics undefined (can't answer "how many leads?")
- Technical debt from rush (hard-coded values, skipped tests)

---

### Phase 05: Post-Vegas Iteration (Week 7+)

**Goal:** Onboard funeral home partners from convention, iterate based on real traffic

**Scope:**
- Technical debt cleanup from Phase 04 rush
- Partner portal enhancements based on funeral home feedback
- Virtual vessel tours (video production)
- Spanish language support (translation)
- Online memorial guest book (if demand validated)
- Live streaming exploration (if partners request)

**Monitoring Focus:**
- Lead volume by source (funeral-homes, hospice, estate-planners, direct)
- Conversion rates at each pipeline stage
- Response time compliance (<1 hour goal)
- Booking completion rate
- Post-service satisfaction (review scores)
- Referral partner activity (leads sent, conversion rate)

---

## 7. Critical Success Factors

### Pre-Launch Essentials

**Technical:**
- [ ] Lighthouse Performance 90+ (mobile)
- [ ] LCP < 2.5 seconds
- [ ] Zero calendar double-booking in stress testing
- [ ] Lead capture → GHL sync < 30 seconds
- [ ] Webhook delivery 99%+ success rate
- [ ] Payment processing end-to-end tested
- [ ] Error monitoring operational (Sentry)

**Business:**
- [ ] Response time <1 hour for 90% of leads
- [ ] Clear refund policy on all booking touchpoints
- [ ] B2B vs B2C lead segmentation operational
- [ ] EPA reporting workflow configured
- [ ] Vegas demo script practiced (3-min + 10-min versions)
- [ ] Partnership materials prepared (agreement, co-marketing)

**Design:**
- [ ] Premium aesthetic: navy/gold/white palette consistent
- [ ] Zero stock photos (all actual vessels/ceremonies)
- [ ] Grief-sensitive copy (heart-centered tone, not transactional)
- [ ] Mobile-first responsive design verified on devices
- [ ] WCAG 2.1 AA accessibility compliance

### Post-Launch Monitoring

**Week 1 Metrics:**
- Lead volume (goal: 5+ qualified leads)
- Response time compliance (goal: 90% <1 hour)
- Form completion rate (goal: 60%+)
- Booking flow drop-off points
- Mobile vs desktop traffic split
- Landing page effectiveness (/funeral-homes, /hospice, /estate-planners)

**Month 1 Metrics:**
- Conversion rate: visitor → inquiry (goal: 3-5%)
- Conversion rate: inquiry → consultation (goal: 40%+)
- Conversion rate: consultation → deposit (goal: 60%+)
- Average response time
- Referral partner acquisition (goal: 3+ funeral homes active)
- Revenue: deposits collected
- Customer satisfaction: post-service review scores (goal: 4.5+ stars)

**Critical Escalation Triggers:**
- Response time >1 hour for 3+ consecutive leads
- Webhook failures 3+ in a row
- Form submission errors >5%
- Booking completion rate <40%
- Calendar double-booking detected
- EPA reporting >7 days overdue

---

## 8. Vegas Convention Demo Strategy

### Demo Positioning

**Audience:** Funeral directors seeking premium sea burial referral partners
**Duration:** 3-minute (elevator pitch) or 10-minute (full walkthrough)
**Goal:** Secure 3-5 partnership commitments with follow-up scheduling

### Demo Script Structure

**1. Pain Point (30 seconds):**
> "Families are increasingly asking for non-traditional memorial options beyond cremation or traditional burial. Many funeral homes lack a premium, turnkey solution for sea burials that maintains their professional reputation."

**2. Solution Overview (30 seconds):**
> "Water & Ash offers luxury vessel-based celebration-of-life ceremonies on the San Diego coast, priced at $2,000. We position as the premium alternative between budget direct cremation and traditional burial, with a heart-centered approach that aligns with modern families' values."

**3. Partnership Value Proposition (1 minute):**
> "Here's what makes us different for your funeral home:
> - **Seamless referral process:** Your families book directly through our website or you can submit referrals through our partner portal
> - **White-glove service:** Professional vessels (62-foot Osprey), Coast Guard-licensed captain, included photography, GPS coordinates keepsake
> - **Transparent commission structure:** [Specify percentage or flat fee]
> - **Co-marketing support:** We provide flyers, digital assets, and can co-brand materials with your funeral home
> - **Real-time tracking:** You see booking status, payment confirmation, and post-service feedback in real time"

**4. Live Demonstration (1 minute):**
- **Laptop:** Show /funeral-homes landing page with partnership benefits
- **Mobile:** Walk through family booking flow (vessel selection → date picker → deposit payment)
- **Email:** Show sample automated confirmation email (grief-sensitive tone)

**5. Differentiators (30 seconds):**
> "Unlike competitors who use contact forms and manual coordination, we offer real-time availability booking. Unlike budget services, we deliver a premium experience families remember and recommend. And uniquely, our give-back program funds free services for underserved families—demonstrating social responsibility your families value."

**6. Call to Action (30 seconds):**
> "I'd love to schedule a vessel tour for you and your team. We can also set up a test referral to see the process firsthand. Can we schedule a follow-up call next week to discuss partnership details?"

### Demo Assets Checklist

**Digital:**
- [ ] Laptop with /funeral-homes page loaded (offline-ready screenshots as backup)
- [ ] Mobile phone with booking flow queued
- [ ] Sample automation emails (printed or tablet)
- [ ] Analytics dashboard screenshot (if have early metrics)

**Physical:**
- [ ] Partnership agreement template (printed)
- [ ] Co-marketing flyer mockup (Water & Ash + [Partner Funeral Home] logo)
- [ ] Business cards (Water & Ash contact info)
- [ ] Vessel photo printouts (backup if Wi-Fi fails)

**Prepared Responses:**
- "How do you compare to [San Diego competitor]?" → Real-time booking, celebration positioning, give-back program, transparent pricing
- "What if a family has issues?" → Direct phone line, 24-hour response commitment, free rescheduling for weather
- "How do we track referrals?" → Partner portal access, monthly reports showing leads sent, conversion rates, revenue generated
- "What's the commission structure?" → [Prepare specific percentage or flat fee per referral]

### Success Metrics for Convention

**Immediate (During Convention):**
- 20+ meaningful conversations (qualifying funeral directors)
- 10+ partnership information packets distributed
- 5+ follow-up meetings scheduled (vessel tours, partnership calls)

**Follow-Up (Week After Convention):**
- 3+ partnership agreements signed
- First referral received within 2 weeks
- Co-marketing materials finalized with 2+ partners

---

## 9. Key Research References

### Technology Stack
- Next.js 16 Release (Turbopack default, React 19 compatibility)
- GoHighLevel API Documentation (v2, OAuth 2.0, Webhooks)
- Stripe + Next.js 15/16 Complete Guide (Server Actions, Webhooks)
- Drizzle vs Prisma ORM comparison (serverless performance)

### Features & Industry
- FTC Funeral Rule (pricing transparency pressure)
- Memorial Service Website Features (Everplans, Keeper Memorials)
- San Diego Sea Burial Competitors (pricing, positioning analysis)
- Celebration of Life vs Traditional Funeral trends

### Architecture Patterns
- Next.js Architecture: Server-First, Client-Islands pattern
- Server Actions vs Route Handlers decision framework
- Modular Monolith vs Microservices for small businesses
- Payment Infrastructure: Modular Architecture & Smart Routing

### Pitfalls & Risk Mitigation
- GoHighLevel Integration: Top Mistakes to Avoid When Migrating CRM
- Troubleshooting Double Booking in HighLevel Calendars
- Stripe Payment Processing: Pros, Cons, Common Issues
- EPA Burial at Sea Reporting Requirements
- Designing for Death: UX Guide for End-of-Life Products

---

## 10. Final Recommendations

### Build Order Priority

**Week 1-2 (Phase 01):**
1. Premium design system (navy/gold/white, typography, spacing)
2. Marketing pages (home, about, contact, services)
3. Landing pages (/funeral-homes, /hospice, /estate-planners)
4. Cloudinary integration for vessel photos
5. Mobile-first responsive implementation

**Week 2-4 (Phase 02):**
1. GoHighLevel API setup and authentication
2. Lead capture forms (React Hook Form + Zod)
3. Server Actions (captureLeadAction, createOpportunityAction)
4. Calendar configuration (conflict detection, resource-based)
5. Webhook endpoints (signature verification, idempotency)
6. Automation workflows (acknowledgment, notifications, segmentation)
7. EPA reporting workflow

**Week 4-5 (Phase 03):**
1. Stripe account setup
2. Server Action (createCheckoutSessionAction)
3. Booking flow (vessel pages → checkout → confirmation)
4. Webhook endpoint (/api/webhooks/stripe)
5. Booking confirmation emails (Resend + React Email)
6. Deposit terms and refund policy

**Week 5-6 (Phase 04):**
1. Vegas demo preparation (script, assets, practice)
2. Error monitoring (Sentry)
3. Analytics implementation (conversion tracking)
4. Performance optimization (Cloudinary, lazy loading, animations)
5. E2E testing (Playwright)
6. Documentation (runbooks, workflows)

### Non-Negotiable Requirements

**Before Vegas Demo (End of February 2026):**
- Functional lead capture: form → GHL → auto-response (<5 min)
- Functional booking flow: vessel selection → Stripe checkout → confirmation
- Premium design: navy/gold/white palette, professional vessel photos, grief-sensitive copy
- Mobile-responsive: Lighthouse 90+, LCP <2.5s
- Demo-ready: /funeral-homes page, booking flow executable on mobile

**Before Accepting First Real Booking:**
- Zero calendar double-booking in stress testing
- EPA reporting workflow operational
- Webhook monitoring and alerting configured
- Refund policy clearly stated and acknowledged
- Response time <1 hour verified for 90% of test leads

**Before Scaling Marketing:**
- Analytics operational (conversion tracking at each stage)
- Error monitoring (Sentry capturing and alerting)
- Webhook delivery 99%+ success rate over 7 days
- Customer satisfaction process (post-service review collection)

---

## Conclusion

Water & Ash Burials has clear product-market fit: premium sea burial services positioned between budget cremation and traditional burial, targeting celebration-of-life demographic with heart-centered approach. Success hinges on three execution priorities:

1. **Premium Digital Presence:** Sophisticated design (navy/gold/white), professional photography, grief-sensitive copy, flawless mobile experience justifying $2k+ pricing
2. **CRM Automation Excellence:** <1 hour lead response, zero double-bookings, automated workflows that feel human, B2B/B2C segmentation
3. **Partnership Infrastructure:** Funeral home/hospice landing pages, referral portal, co-marketing materials, commission tracking

Vegas convention (5 weeks) is critical milestone. Prioritize demo-ready experience over feature completeness: 3 things excellently > 10 things poorly. Post-demo, technical debt cleanup and partner onboarding become focus.

The research consensus is clear: modular monolith architecture (Next.js 16), server-first pattern (React Server Components + Server Actions), proven integrations (GoHighLevel v2 + Stripe), and premium positioning through design excellence. Avoid common pitfalls: lead response delays, calendar double-booking, webhook silent failures, mobile performance sacrifice, and demo unpreparedness.

Build with quality, launch with confidence, iterate with data.

---

**Research Synthesized:** 2026-01-27
**Synthesis Sources:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md
**Next Action:** Begin Phase 01 - Website Rebuild with design system implementation
