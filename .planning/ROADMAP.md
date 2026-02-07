# Roadmap: Water & Ash Burials

**Project:** Premium Sea Burial Website & CRM Integration
**Timeline:** 6 weeks (Demo-ready for Vegas convention end of February 2026)
**Status:** Active Development

---

## Phase 01: Foundation & Core Pages ✅ COMPLETE

**Duration:** Week 1-2
**Status:** Complete (2026-01-27)
**Goal:** Professional website foundation with premium design and service showcases

### Deliverables

**Technical Foundation**
- Next.js 16 project with App Router, TypeScript, Tailwind CSS v4
- shadcn/ui component library setup
- Vercel deployment with preview environments
- SSL/HTTPS configuration

**Design System**
- Navy/gold/white color palette implementation
- Typography system (maximum 2 font families)
- Premium component library (buttons, cards, forms)
- Framer Motion animation primitives

**Core Pages**
- Homepage with hero, services overview, trust indicators
- About page with company story and heart-centered mission
- Contact page with form
- Give-back program page
- Privacy policy page

**Service Pages**
- The Osprey (62-foot Striker) - $2,000
- White Nights (58-foot Hatteras) - $2,000
- Relentless (45-foot Bali catamaran) - $2,000
- At-Home Memorial (mail-in service) - $400

**Media Integration**
- Cloudinary setup for vessel photography
- Professional vessel photo galleries
- Image optimization (WebP/AVIF, lazy loading)

### Requirements Coverage

- [WEB-01] Premium design system with gold/navy/white palette
- [WEB-02] Mobile-first responsive design (target 90+ PageSpeed mobile)
- [WEB-03] Grief-sensitive UX (one primary CTA per page, clear language)
- [WEB-04] Framer Motion animations for premium feel
- [WEB-05] Homepage with hero, services overview, trust indicators
- [WEB-06] The Osprey service page with pricing ($2,000)
- [WEB-07] White Nights service page with pricing ($2,000)
- [WEB-08] Relentless service page with pricing ($2,000)
- [WEB-09] At-Home Memorial service page with pricing ($400)
- [WEB-10] About page with company story and heart-centered mission
- [WEB-11] Contact page with form
- [WEB-12] Give-back program page (differentiator)
- [WEB-13] SSL/HTTPS security
- [WEB-14] Professional vessel photography integration
- [S1] Privacy policy page

### Success Criteria

1. **Premium Aesthetic Validation:** Design review confirms navy/gold/white palette consistency, no stock photos used, sophisticated typography with generous white space
2. **Mobile Performance:** Lighthouse Performance score 90+ on mobile, LCP < 2.5 seconds measured on actual device
3. **Grief-Sensitive UX:** User testing confirms clear language, single primary CTA per page, no aggressive sales tactics
4. **Service Transparency:** All four service pages display transparent pricing, vessel details, and clear booking CTAs
5. **Demo Readiness:** Homepage and service pages load flawlessly on laptop for Vegas demo walkthrough

---

## Phase 02: Target Market Landing Pages

**Duration:** Week 2
**Goal:** B2B partnership landing pages with tailored messaging for referral partners

### Deliverables

**Landing Pages**
- /funeral-homes - B2B partnership messaging, referral process, commission structure
- /mortuaries - Referral partner focus, co-marketing support
- /hospice - Pre-death planning angle, compassionate transition services
- /estate-planners - End-of-life planning focus, advance arrangement benefits

**Lead Capture Infrastructure**
- Dedicated lead capture forms per landing page
- UTM parameter tracking for lead source attribution
- Form field customization per audience (B2B vs B2C)

**Virtual Vessel Tours**
- YouTube/Vimeo video embeds for The Osprey
- YouTube/Vimeo video embeds for White Nights
- YouTube/Vimeo video embeds for Relentless
- Mobile-responsive video players

### Requirements Coverage

- [LAND-01] /funeral-homes landing page with B2B partnership messaging
- [LAND-02] /mortuaries landing page with referral partner focus
- [LAND-03] /hospice landing page with pre-death planning angle
- [LAND-04] /estate-planners landing page with end-of-life planning focus
- [LAND-05] Each landing page with dedicated lead capture form
- [LAND-06] UTM parameter tracking for lead source attribution
- [TOUR-01] Video tour for The Osprey (embed YouTube/Vimeo)
- [TOUR-02] Video tour for White Nights
- [TOUR-03] Video tour for Relentless

### Success Criteria

1. **Audience Segmentation:** Each landing page uses distinct messaging appropriate for target audience (funeral directors vs hospice administrators vs estate planners)
2. **Lead Attribution:** UTM parameters correctly captured and associated with form submissions (test with sample URLs)
3. **Video Engagement:** Virtual vessel tours load and play on mobile/desktop, positioned above-the-fold on service pages
4. **Form Completion:** Landing page form completion rate exceeds 60% in testing (industry benchmark ~50%)
5. **Vegas Demo Asset:** /funeral-homes page ready to showcase to convention attendees on mobile device

---

## Phase 03: GoHighLevel CRM Integration

**Duration:** Week 3-4
**Goal:** Seamless lead capture with automated response workflows and calendar management

### Deliverables

**API Integration**
- GoHighLevel API v2 setup (OAuth 2.0 or Private API Key)
- Contact creation endpoint integration
- Opportunity creation and pipeline management
- Custom fields configuration (service interest, preferred date, vessel preference)

**Form Processing**
- React Hook Form + Zod validation implementation
- Server Actions: captureLeadAction, createOpportunityAction
- Lead source tracking (page origin, UTM parameters)
- Client-side and server-side validation

**Pipeline Configuration**
- B2C pipeline: Inquiry → Consultation → Deposit → Confirmed → Complete
- B2B pipeline: Partner Inquiry → Discovery → Agreement → Active Partner
- Custom pipeline stages per customer journey

**Calendar Integration**
- Booking calendar with GHL calendar API
- Conflict calendar connection (Google Calendar sync)
- Calendar conflict detection (prevent double-booking)
- Resource-based scheduling (separate calendar per vessel)
- Appointments per slot = 1 (strict configuration)

**Webhook Infrastructure**
- Webhook endpoint: /api/webhooks/gohighlevel
- RSA signature verification with GHL public key
- Idempotency tracking (prevent duplicate processing)
- Event handling: contact.created, opportunity.status_changed, appointment.created
- Async processing with immediate 200 OK response

**Automation Workflows**
- Auto-response email within 5 minutes of submission
- SMS + email notification to owner for new leads
- Lead segmentation tags (B2B: funeral-home, hospice, estate-planner; B2C: direct-consumer)
- Post-inquiry drip sequence (B2C)
- Partnership nurture sequence (B2B)
- Booking confirmation email with ceremony details
- Pre-ceremony reminder (24 hours before)
- Post-service follow-up (grief-sensitive, 2-3 weeks after)

**EPA Compliance Workflow**
- Service Complete → EPA Report Task (auto-created)
- 30-day reminder automation
- Report Filed checkbox tracking

### Requirements Coverage

- [CRM-01] Contact creation from website forms via GHL API
- [CRM-02] Lead source tracking (which page/form submitted from)
- [CRM-03] Auto-response email within 5 minutes of submission
- [CRM-04] SMS + email notification to owner for new leads
- [CRM-05] B2C pipeline: Inquiry → Consultation → Deposit → Confirmed → Complete
- [CRM-06] B2B pipeline: Partner Inquiry → Discovery → Agreement → Active Partner
- [CRM-07] Custom fields for service interest, preferred date, vessel preference
- [CRM-08] Booking calendar integration with GHL calendar
- [CRM-09] Calendar conflict detection (prevent double-booking)
- [CRM-10] Webhook endpoint for GHL status updates
- [AUTO-01] Post-inquiry drip sequence (B2C)
- [AUTO-02] Partnership nurture sequence (B2B)
- [AUTO-03] Booking confirmation email with ceremony details
- [AUTO-04] Pre-ceremony reminder (24 hours before)
- [AUTO-05] Post-service follow-up (grief-sensitive, 2-3 weeks after)
- [S8] Post-service review request automation

### Success Criteria

1. **Lead Sync Speed:** Form submission creates GHL contact within 30 seconds, verified through GHL dashboard
2. **Automated Response:** Auto-response email delivers within 5 minutes, owner receives SMS/email notification immediately
3. **Zero Double-Booking:** Stress testing with concurrent booking attempts confirms calendar conflict detection prevents overlaps
4. **Webhook Reliability:** 99%+ webhook delivery success rate over 72-hour testing period
5. **Response Time Compliance:** 90% of test leads receive human follow-up within 1 hour (measured via GHL activity logs)

---

## Phase 04: Payment Processing

**Duration:** Week 4-5
**Goal:** Stripe checkout integration with deposit collection and booking confirmation

### Deliverables

**Stripe Setup**
- Stripe account configuration (test mode + production)
- Server-side pricing configuration (never trust client)
- Webhook signing secret setup

**Checkout Flow**
- Server Action: createCheckoutSessionAction
- "Book Now" buttons on vessel pages (Client Components)
- Stripe Checkout Session creation with metadata (serviceType, ghlContactId, ghlOpportunityId, source)
- Success URL: /booking/success?session_id={SESSION_ID}
- Cancel URL: /booking/cancelled

**Webhook Processing**
- Webhook endpoint: /api/webhooks/stripe
- HMAC signature verification
- Idempotency tracking (event.id)
- Event handling: checkout.session.completed
- Update GHL opportunity status to "Deposit Paid"
- Async processing with <2 second response time

**Booking Confirmation**
- Booking confirmation page with ceremony details
- Booking cancellation page
- Real-time availability display before booking
- Clear refund/cancellation policy on booking page

**Email Templates**
- Resend integration setup
- React Email templates for booking confirmation
- Cancellation confirmation with refund timeline

**Policy Documentation**
- Refund policy (14+ days: full, 7-14 days: 50%, <7 days: none)
- Weather rescheduling policy (free rescheduling for unsafe conditions)
- Checkbox acknowledgment before payment

### Requirements Coverage

- [PAY-01] Stripe Checkout integration for deposit collection
- [PAY-02] Server-side pricing (never trust client)
- [PAY-03] Stripe webhook endpoint with signature verification
- [PAY-04] Payment success → GHL opportunity status update to "Deposit Paid"
- [PAY-05] Clear refund/cancellation policy on booking page
- [PAY-06] Real-time availability display before booking
- [PAY-07] Booking confirmation page after successful payment
- [S5] Weather rescheduling policy page

### Success Criteria

1. **End-to-End Booking:** Complete flow from vessel page → book now → Stripe checkout → confirmation page executes without errors
2. **Payment Confirmation Sync:** Stripe payment confirmation updates GHL opportunity within 60 seconds, verified in dashboard
3. **Email Delivery:** Booking confirmation email delivers within 5 minutes of successful payment
4. **Transparent Terms:** Refund policy clearly visible on checkout page and confirmation email, checkbox acknowledgment required
5. **Zero Payment Errors:** 100% success rate for test transactions in Stripe test mode

---

## Phase 05: SEO & Analytics

**Duration:** Week 5
**Goal:** Search optimization and conversion tracking infrastructure

### Deliverables

**SEO Implementation**
- Meta tags for all pages (title, description, keywords)
- Open Graph images for social sharing
- JSON-LD structured data (LocalBusiness schema)
- XML sitemap generation
- robots.txt configuration

**Analytics Setup**
- Vercel Analytics integration
- Conversion tracking (form submissions, bookings)
- Lead source attribution dashboard
- Traffic by landing page reporting
- Form completion rate tracking

**Performance Optimization**
- Critical CSS inline
- Below-the-fold lazy loading
- Framer Motion animations (hero parallax, vessel card hovers)
- Mobile performance verification

### Requirements Coverage

- [SEO-01] Meta tags for all pages
- [SEO-02] Open Graph images for social sharing
- [SEO-03] JSON-LD structured data (LocalBusiness schema)
- [SEO-04] XML sitemap
- [SEO-05] Vercel Analytics integration
- [SEO-06] Lead source tracking in GHL dashboard

### Success Criteria

1. **SEO Compliance:** All pages have unique meta titles/descriptions, Open Graph images generate correctly in social share previews
2. **Structured Data:** LocalBusiness schema validates via Google Rich Results Test
3. **Analytics Accuracy:** Form submission events tracked correctly, lead source attribution matches GHL records
4. **Performance Maintenance:** Lighthouse Performance score remains 90+ after analytics implementation
5. **Conversion Visibility:** Dashboard shows visitor → inquiry → consultation → deposit funnel with drop-off points

---

## Phase 06: Testing, Polish & Vegas Prep

**Duration:** Week 5-6
**Goal:** Demo-ready site with monitoring, testing, and documentation

### Deliverables

**Vegas Demo Preparation**
- Demo script (3-minute elevator pitch + 10-minute full walkthrough)
- Demo assets (/funeral-homes page, mobile booking flow, sample emails)
- Partnership materials (sample agreement, co-marketing flyer)
- Role-play practice with objection handling
- Offline-ready screenshots as backup

**Testing Infrastructure**
- Playwright E2E tests (lead capture flow, booking flow, webhook processing)
- Vitest unit tests (form validation, utility functions)
- Manual QA on mobile devices (iOS/Android)
- Cross-browser testing (Chrome, Firefox, Safari)

**Monitoring & Error Tracking**
- Sentry integration for error monitoring
- Webhook delivery monitoring with alerting
- Performance monitoring dashboard
- Response time tracking

**Documentation**
- Deployment runbook
- CRM workflow documentation
- Webhook troubleshooting guide
- Vegas demo script
- Partnership onboarding guide

**Production Deployment**
- Environment variables verification (production keys)
- Webhook endpoints configured (production URLs)
- DNS configuration
- SSL certificate verification
- Analytics verification

**Optional Enhancements (Should Have)**
- [S2] FAQ page with common questions
- [S3] Testimonials page with video testimonials
- [S6] QR code generation for print materials
- [S7] GPS coordinates certificate generation

### Requirements Coverage

- Performance testing (target metrics)
- Security validation (webhook signatures, env vars)
- Compliance verification (EPA workflow, privacy policy, refund terms)
- Accessibility testing (WCAG 2.1 AA)
- All acceptance criteria validation

### Success Criteria

1. **Demo Execution:** Vegas demo executable in 3 minutes (elevator pitch) or 10 minutes (full walkthrough) without technical issues
2. **Critical Path Testing:** E2E tests passing for lead capture and booking flows, zero failures in test suite
3. **Error Monitoring:** Sentry operational and receiving events, alerting configured for critical failures
4. **Performance Validation:** Lighthouse Performance 90+ on mobile, LCP < 2.5s, verified on actual devices
5. **Production Readiness:** Deployment checklist complete, all production keys configured, DNS/SSL operational

---

## Requirements Coverage Matrix

### Must Have (M) - Phase Mapping

| Requirement | Phase | Status |
|-------------|-------|--------|
| WEB-01 to WEB-14 | Phase 01 | Pending |
| TOUR-01 to TOUR-03 | Phase 02 | Pending |
| LAND-01 to LAND-06 | Phase 02 | Pending |
| CRM-01 to CRM-10 | Phase 03 | Pending |
| AUTO-01 to AUTO-05 | Phase 03 | Pending |
| PAY-01 to PAY-07 | Phase 04 | Pending |
| SEO-01 to SEO-06 | Phase 05 | Pending |

### Should Have (S) - Phase Mapping

| Requirement | Phase | Status |
|-------------|-------|--------|
| S1 (Privacy policy) | Phase 01 | Pending |
| S2 (FAQ page) | Phase 06 | Optional |
| S3 (Testimonials page) | Phase 06 | Optional |
| S4 (Multi-language Spanish) | Post-Vegas | Deferred |
| S5 (Weather policy) | Phase 04 | Pending |
| S6 (QR codes) | Phase 06 | Optional |
| S7 (GPS certificates) | Phase 06 | Optional |
| S8 (Review automation) | Phase 03 | Pending |

### Could Have (C) - Future Phases

| Requirement | Phase | Status |
|-------------|-------|--------|
| C1 to C6 | Post-Vegas | Deferred |

### Won't Have (W) - Out of Scope

| Requirement | Phase | Status |
|-------------|-------|--------|
| W1 to W6 | N/A | Out of Scope |

**Coverage Validation:** 100% of Must Have (M) requirements mapped to Phases 01-05. All Should Have (S) requirements either included or explicitly deferred. Could Have (C) and Won't Have (W) appropriately scoped out of v1.

---

## Critical Dependencies

### Phase Dependencies

- **Phase 02 depends on Phase 01:** Landing page forms require design system and component library
- **Phase 03 depends on Phase 02:** CRM integration requires forms to capture and send data
- **Phase 04 depends on Phase 03:** Payment processing requires GHL contact/opportunity creation
- **Phase 05 runs parallel to Phase 04:** SEO/Analytics can be implemented independently
- **Phase 06 depends on Phases 01-05:** Testing and demo prep requires complete functionality

### Technical Dependencies

- **CRM-08 (Calendar) depends on CRM-01 (Contact creation):** Must create contact before booking calendar appointment
- **PAY-04 (GHL update) depends on CRM-05 (Pipeline setup):** Must have pipeline configured before updating opportunity status
- **AUTO-03 (Confirmation) depends on PAY-01 (Stripe setup):** Booking confirmation requires payment success event
- **LAND-05 (Lead forms) depends on CRM-01 (GHL integration):** Forms must sync to CRM before going live
- **SEO-06 (Dashboard) depends on CRM-02 (Lead source tracking):** Attribution reporting requires UTM capture

---

## Risk Mitigation

### Critical Risks

**Risk 1: Calendar Double-Booking**
- **Impact:** Existential operational failure
- **Mitigation:** Strict calendar configuration (appointments per slot = 1), stress testing with concurrent bookings, manual confirmation call within 24 hours
- **Phase:** Phase 03

**Risk 2: Lead Response Delays**
- **Impact:** 60x lower conversion rate beyond 1 hour
- **Mitigation:** Automated 5-minute acknowledgment, SMS/email owner notification, response time dashboard
- **Phase:** Phase 03

**Risk 3: Webhook Silent Failures**
- **Impact:** 30%+ lead loss without detection
- **Mitigation:** Webhook monitoring, application-level retry logic, idempotency tracking, failure alerting
- **Phase:** Phase 03-04

**Risk 4: Mobile Performance Degradation**
- **Impact:** Premium perception destroyed, immediate abandonment
- **Mitigation:** Lighthouse 90+ mobile target, LCP < 2.5s, image optimization, mobile-first CSS, actual device testing
- **Phase:** Phase 01, 05, 06

**Risk 5: Vegas Demo Unpreparedness**
- **Impact:** Lost partnership opportunities
- **Mitigation:** Demo script preparation, role-play practice, offline backup assets, partnership materials ready
- **Phase:** Phase 06

---

## Success Metrics

### Pre-Launch Validation (End of Week 6)

**Technical:**
- [ ] Lighthouse Performance 90+ (mobile)
- [ ] LCP < 2.5 seconds
- [ ] Zero calendar double-booking in stress testing
- [ ] Lead capture → GHL sync < 30 seconds
- [ ] Webhook delivery 99%+ success rate
- [ ] Payment processing end-to-end tested
- [ ] Error monitoring operational (Sentry)

**Business:**
- [ ] Response time <1 hour for 90% of test leads
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

### Post-Launch Monitoring (Month 1)

**Conversion Funnel:**
- Visitor → Inquiry: 3-5% target
- Inquiry → Consultation: 40%+ target
- Consultation → Deposit: 60%+ target

**Operational:**
- Response time <1 hour for 90% of leads
- Zero calendar double-bookings
- Webhook delivery 99%+ success rate
- Form completion rate 60%+

**Partnership:**
- 3+ funeral home partnerships active
- First referral received within 2 weeks post-Vegas
- Co-marketing materials deployed with 2+ partners

---

## Timeline Overview

```
Week 1-2: Phase 01 (Foundation & Core Pages)
Week 2:   Phase 02 (Target Market Landing Pages)
Week 3-4: Phase 03 (GoHighLevel CRM Integration)
Week 4-5: Phase 04 (Payment Processing)
Week 5:   Phase 05 (SEO & Analytics)
Week 5-6: Phase 06 (Testing, Polish & Vegas Prep)

Vegas Convention: End of February 2026
```

**Current Status:** Roadmap defined, ready to begin Phase 01

---

*Roadmap created: 2026-01-27*
*Next action: Begin Phase 01 - Foundation & Core Pages*
