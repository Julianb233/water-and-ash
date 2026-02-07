# Requirements: Water & Ash Burials

**Version:** 1.0
**Date:** 2026-01-27
**Status:** Draft - Pending Validation

---

## MVP Scope (Milestone 1)

### Must Have (M)

**Website Core**
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

**Virtual Vessel Tours**
- [TOUR-01] Video tour for The Osprey (embed YouTube/Vimeo)
- [TOUR-02] Video tour for White Nights
- [TOUR-03] Video tour for Relentless

**Target Market Landing Pages**
- [LAND-01] /funeral-homes landing page with B2B partnership messaging
- [LAND-02] /mortuaries landing page with referral partner focus
- [LAND-03] /hospice landing page with pre-death planning angle
- [LAND-04] /estate-planners landing page with end-of-life planning focus
- [LAND-05] Each landing page with dedicated lead capture form
- [LAND-06] UTM parameter tracking for lead source attribution

**GoHighLevel CRM Integration**
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

**Payment Processing**
- [PAY-01] Stripe Checkout integration for deposit collection
- [PAY-02] Server-side pricing (never trust client)
- [PAY-03] Stripe webhook endpoint with signature verification
- [PAY-04] Payment success → GHL opportunity status update to "Deposit Paid"
- [PAY-05] Clear refund/cancellation policy on booking page
- [PAY-06] Real-time availability display before booking
- [PAY-07] Booking confirmation page after successful payment

**Automations**
- [AUTO-01] Post-inquiry drip sequence (B2C)
- [AUTO-02] Partnership nurture sequence (B2B)
- [AUTO-03] Booking confirmation email with ceremony details
- [AUTO-04] Pre-ceremony reminder (24 hours before)
- [AUTO-05] Post-service follow-up (grief-sensitive, 2-3 weeks after)

**SEO & Analytics**
- [SEO-01] Meta tags for all pages
- [SEO-02] Open Graph images for social sharing
- [SEO-03] JSON-LD structured data (LocalBusiness schema)
- [SEO-04] XML sitemap
- [SEO-05] Vercel Analytics integration
- [SEO-06] Lead source tracking in GHL dashboard

### Should Have (S)

- [S1] Privacy policy page
- [S2] FAQ page with common questions
- [S3] Testimonials page with video testimonials
- [S4] Multi-language support (Spanish)
- [S5] Weather rescheduling policy page
- [S6] QR code generation for print materials
- [S7] GPS coordinates certificate generation
- [S8] Post-service review request automation

### Could Have (C)

- [C1] Partner portal with login for funeral homes
- [C2] Live streaming capability for remote family
- [C3] Online memorial guest book
- [C4] Ceremony customization builder (music, flowers)
- [C5] Payment plan financing (Affirm/Klarna)
- [C6] Interactive vessel comparison tool

### Won't Have (W) - This Version

- [W1] Article generator / blog system
- [W2] AI voice receptionist
- [W3] Attendant recruitment portal
- [W4] Reddit/social media management
- [W5] Full CRM replacement (GHL stays)
- [W6] Chatbot or live chat

---

## Technical Requirements

### Performance
- Page load time: < 3 seconds (LCP)
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1
- Mobile PageSpeed: 90+
- Form submission to GHL: < 2 seconds

### Security
- HTTPS enforced (TLS 1.3+)
- API keys in environment variables only
- Webhook signature verification (GHL + Stripe)
- No PII in application logs
- Input sanitization on all forms

### Compliance
- EPA burial at sea reporting workflow
- Privacy policy covering data usage
- Clear refund/cancellation terms
- Written consent for testimonials

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Minimum 16px font size
- Sufficient color contrast
- Touch targets 44x44px minimum

---

## Acceptance Criteria

### Website
- [ ] All vessel pages show transparent pricing
- [ ] Mobile responsive (tested iOS/Android)
- [ ] Premium aesthetic (gold/navy/white palette)
- [ ] Grief-sensitive design (no aggressive CTAs)
- [ ] Mobile PageSpeed > 90
- [ ] All images optimized (WebP, lazy loading)

### CRM Integration
- [ ] Form submission creates contact in GHL within 5 seconds
- [ ] Lead source tracked accurately
- [ ] Auto-response email sends within 5 minutes
- [ ] Owner receives SMS/email notification
- [ ] B2C and B2B pipelines configured correctly

### Payments
- [ ] Stripe Checkout flow works end-to-end
- [ ] Payment success updates GHL opportunity
- [ ] Webhook signature verification working
- [ ] Refund policy visible before payment

### Landing Pages
- [ ] /funeral-homes loads with B2B messaging
- [ ] /mortuaries loads with referral focus
- [ ] /hospice loads with pre-planning angle
- [ ] /estate-planners loads with planning focus
- [ ] UTM parameters tracked correctly

---

## Dependencies

| Requirement | Depends On |
|-------------|------------|
| CRM-08 (Calendar) | CRM-01 (Contact creation) |
| PAY-04 (GHL update) | CRM-05 (Pipeline setup) |
| AUTO-03 (Confirmation) | PAY-01 (Stripe setup) |
| LAND-05 (Lead forms) | CRM-01 (GHL integration) |
| SEO-06 (Dashboard) | CRM-02 (Lead source tracking) |

---

## Validation Plan

| Requirement | Validation Method |
|-------------|-------------------|
| WEB-01 to WEB-14 | Visual review, mobile device testing |
| TOUR-01 to TOUR-03 | Video playback test on mobile/desktop |
| LAND-01 to LAND-06 | End-to-end form submission test |
| CRM-01 to CRM-10 | GHL dashboard verification |
| PAY-01 to PAY-07 | Stripe test mode end-to-end |
| AUTO-01 to AUTO-05 | Test contact journey through GHL |
| Performance | Lighthouse, PageSpeed Insights |
| Security | Webhook signature test, env var audit |

---

## Requirements Traceability

### Phase 01: Foundation & Core Pages ✅

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| WEB-01 | Premium design system with gold/navy/white palette | Phase 01 | Complete |
| WEB-02 | Mobile-first responsive design (target 90+ PageSpeed mobile) | Phase 01 | Complete |
| WEB-03 | Grief-sensitive UX (one primary CTA per page, clear language) | Phase 01 | Complete |
| WEB-04 | Framer Motion animations for premium feel | Phase 01 | Complete |
| WEB-05 | Homepage with hero, services overview, trust indicators | Phase 01 | Complete |
| WEB-06 | The Osprey service page with pricing ($2,000) | Phase 01 | Complete |
| WEB-07 | White Nights service page with pricing ($2,000) | Phase 01 | Complete |
| WEB-08 | Relentless service page with pricing ($2,000) | Phase 01 | Complete |
| WEB-09 | At-Home Memorial service page with pricing ($400) | Phase 01 | Complete |
| WEB-10 | About page with company story and heart-centered mission | Phase 01 | Complete |
| WEB-11 | Contact page with form | Phase 01 | Complete |
| WEB-12 | Give-back program page (differentiator) | Phase 01 | Complete |
| WEB-13 | SSL/HTTPS security | Phase 01 | Complete |
| WEB-14 | Professional vessel photography integration | Phase 01 | Complete |
| S1 | Privacy policy page | Phase 01 | Complete |

### Phase 02: Target Market Landing Pages

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| LAND-01 | /funeral-homes landing page with B2B partnership messaging | Phase 02 | Pending |
| LAND-02 | /mortuaries landing page with referral partner focus | Phase 02 | Pending |
| LAND-03 | /hospice landing page with pre-death planning angle | Phase 02 | Pending |
| LAND-04 | /estate-planners landing page with end-of-life planning focus | Phase 02 | Pending |
| LAND-05 | Each landing page with dedicated lead capture form | Phase 02 | Pending |
| LAND-06 | UTM parameter tracking for lead source attribution | Phase 02 | Pending |
| TOUR-01 | Video tour for The Osprey (embed YouTube/Vimeo) | Phase 02 | Pending |
| TOUR-02 | Video tour for White Nights | Phase 02 | Pending |
| TOUR-03 | Video tour for Relentless | Phase 02 | Pending |

### Phase 03: GoHighLevel CRM Integration

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| CRM-01 | Contact creation from website forms via GHL API | Phase 03 | Pending |
| CRM-02 | Lead source tracking (which page/form submitted from) | Phase 03 | Pending |
| CRM-03 | Auto-response email within 5 minutes of submission | Phase 03 | Pending |
| CRM-04 | SMS + email notification to owner for new leads | Phase 03 | Pending |
| CRM-05 | B2C pipeline: Inquiry → Consultation → Deposit → Confirmed → Complete | Phase 03 | Pending |
| CRM-06 | B2B pipeline: Partner Inquiry → Discovery → Agreement → Active Partner | Phase 03 | Pending |
| CRM-07 | Custom fields for service interest, preferred date, vessel preference | Phase 03 | Pending |
| CRM-08 | Booking calendar integration with GHL calendar | Phase 03 | Pending |
| CRM-09 | Calendar conflict detection (prevent double-booking) | Phase 03 | Pending |
| CRM-10 | Webhook endpoint for GHL status updates | Phase 03 | Pending |
| AUTO-01 | Post-inquiry drip sequence (B2C) | Phase 03 | Pending |
| AUTO-02 | Partnership nurture sequence (B2B) | Phase 03 | Pending |
| AUTO-03 | Booking confirmation email with ceremony details | Phase 03 | Pending |
| AUTO-04 | Pre-ceremony reminder (24 hours before) | Phase 03 | Pending |
| AUTO-05 | Post-service follow-up (grief-sensitive, 2-3 weeks after) | Phase 03 | Pending |
| S8 | Post-service review request automation | Phase 03 | Pending |

### Phase 04: Payment Processing

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| PAY-01 | Stripe Checkout integration for deposit collection | Phase 04 | Pending |
| PAY-02 | Server-side pricing (never trust client) | Phase 04 | Pending |
| PAY-03 | Stripe webhook endpoint with signature verification | Phase 04 | Pending |
| PAY-04 | Payment success → GHL opportunity status update to "Deposit Paid" | Phase 04 | Pending |
| PAY-05 | Clear refund/cancellation policy on booking page | Phase 04 | Pending |
| PAY-06 | Real-time availability display before booking | Phase 04 | Pending |
| PAY-07 | Booking confirmation page after successful payment | Phase 04 | Pending |
| S5 | Weather rescheduling policy page | Phase 04 | Pending |

### Phase 05: SEO & Analytics

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| SEO-01 | Meta tags for all pages | Phase 05 | Pending |
| SEO-02 | Open Graph images for social sharing | Phase 05 | Pending |
| SEO-03 | JSON-LD structured data (LocalBusiness schema) | Phase 05 | Pending |
| SEO-04 | XML sitemap | Phase 05 | Pending |
| SEO-05 | Vercel Analytics integration | Phase 05 | Pending |
| SEO-06 | Lead source tracking in GHL dashboard | Phase 05 | Pending |

### Phase 06: Testing, Polish & Vegas Prep

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| S2 | FAQ page with common questions | Phase 06 | Optional |
| S3 | Testimonials page with video testimonials | Phase 06 | Optional |
| S6 | QR code generation for print materials | Phase 06 | Optional |
| S7 | GPS coordinates certificate generation | Phase 06 | Optional |

### Post-Vegas Iteration (Deferred)

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| S4 | Multi-language support (Spanish) | Post-Vegas | Deferred |
| C1 | Partner portal with login for funeral homes | Post-Vegas | Deferred |
| C2 | Live streaming capability for remote family | Post-Vegas | Deferred |
| C3 | Online memorial guest book | Post-Vegas | Deferred |
| C4 | Ceremony customization builder (music, flowers) | Post-Vegas | Deferred |
| C5 | Payment plan financing (Affirm/Klarna) | Post-Vegas | Deferred |
| C6 | Interactive vessel comparison tool | Post-Vegas | Deferred |

### Out of Scope (Won't Have)

| Requirement ID | Description | Phase | Status |
|----------------|-------------|-------|--------|
| W1 | Article generator / blog system | N/A | Out of Scope |
| W2 | AI voice receptionist | N/A | Out of Scope |
| W3 | Attendant recruitment portal | N/A | Out of Scope |
| W4 | Reddit/social media management | N/A | Out of Scope |
| W5 | Full CRM replacement (GHL stays) | N/A | Out of Scope |
| W6 | Chatbot or live chat | N/A | Out of Scope |

---

## Coverage Summary

**Total Requirements:** 77
- **Must Have (M):** 60 requirements (100% mapped to Phases 01-05)
- **Should Have (S):** 8 requirements (3 in MVP, 2 optional Phase 06, 1 deferred)
- **Could Have (C):** 6 requirements (100% deferred to post-Vegas)
- **Won't Have (W):** 6 requirements (100% out of scope)

**Coverage Validation:** 100% of v1 scope (Must Have) mapped to specific phases with clear deliverables and success criteria.

---

*Requirements derived from PROJECT.md, research synthesis, and user scoping.*
*Traceability matrix added: 2026-01-27*
