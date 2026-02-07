# Architecture Patterns

**Domain:** Premium Service Website with GoHighLevel CRM Integration
**Project:** Water & Ash Burials - San Diego Sea Burial Service
**Researched:** 2026-01-27
**Confidence:** HIGH (official docs for core patterns) + MEDIUM (integration patterns from community)

## Executive Summary

Premium service websites with CRM integration follow a **modular monolith** pattern: a single Next.js application with clear internal boundaries between presentation, business logic, and external integrations. This architecture prioritizes simplicity and speed for small-to-medium businesses while maintaining professional separation of concerns.

For Water & Ash Burials specifically: a **server-first Next.js 15 application** with React Server Components handling most rendering, Server Actions managing form submissions and mutations, and API routes reserved exclusively for external webhooks (GoHighLevel callbacks, Stripe webhooks). The CRM acts as the source of truth for lead pipeline data, while Next.js owns the marketing/presentation layer and payment orchestration.

## Recommended Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              MARKETING & PRESENTATION LAYER                │ │
│  │  • Public pages (RSC for SEO)                              │ │
│  │  • Target market landing pages                             │ │
│  │  • Service pages                                           │ │
│  │  • Lead capture forms                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↕                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   BUSINESS LOGIC LAYER                     │ │
│  │  • Server Actions (form submissions, bookings)             │ │
│  │  • Data validation & enrichment                            │ │
│  │  • Payment orchestration                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↕                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              EXTERNAL INTEGRATION LAYER                    │ │
│  │  • GoHighLevel client (OAuth 2.0)                          │ │
│  │  • Stripe client (Server Actions + Webhooks)               │ │
│  │  • API routes (webhooks only)                              │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
        ┌──────────────────────────────────────────────┐
        │        EXTERNAL SERVICES (3rd Party)          │
        │  ┌──────────────┐      ┌──────────────────┐  │
        │  │  GoHighLevel │      │  Stripe Payments │  │
        │  │  • CRM/Pipeline      │  • Checkout      │  │
        │  │  • Calendar          │  • Subscriptions │  │
        │  │  • Automations       │  • Webhooks      │  │
        │  └──────────────┘      └──────────────────┘  │
        └──────────────────────────────────────────────┘
```

### Architecture Philosophy

**Modular Monolith over Microservices:** For small business service websites (even premium ones), a well-structured monolith is the pragmatic choice. Research indicates monoliths are "easier to test, simpler to deploy with fewer pipelines, and most development teams are capable of building them without specialized skills." Microservices introduce "operational and organizational complexity that not every team is ready for," particularly unnecessary for a single-product service business like Water & Ash.

**Server-First with Client Islands:** Next.js 15's architecture principle is "server-first (fetch, compute, render on server) with client-islands pattern (hydrate only interactive parts)." This means 80%+ of components should be React Server Components, with Client Components reserved for interactive elements like form inputs, booking calendars, and payment widgets.

## Component Boundaries

| Component | Responsibility | Communicates With | Data Flow |
|-----------|---------------|-------------------|-----------|
| **Marketing Pages** (RSC) | SEO-optimized content rendering, vessel showcases, about/contact | None directly (static/server-rendered) | One-way: Server → Browser |
| **Landing Pages** (RSC + Client Forms) | Target-specific messaging (funeral homes, hospice, estate planners), lead capture | Server Actions for form submission | Lead data → Server Actions → GHL |
| **Lead Capture Forms** (Client Components) | User input, client-side validation, loading states | Server Actions (mutations) | User input → validation → GHL API |
| **Server Actions** (Server-side) | Form processing, business logic, data enrichment, CRM sync | GoHighLevel API, Stripe API | Bidirectional with external APIs |
| **API Routes** (Webhooks only) | Receive external notifications, verify signatures, trigger internal events | Stripe, GoHighLevel (via webhooks) | External → Validation → Internal processing |
| **GoHighLevel Integration** | Lead/contact CRUD, calendar management, pipeline tracking | GHL API (REST), GHL Webhooks (inbound) | Bidirectional: Create leads, receive status updates |
| **Stripe Integration** | Payment sessions, checkout flows, webhook processing | Stripe API, Stripe Webhooks | Bidirectional: Create sessions, receive payment confirmations |

### Key Boundary Rules

1. **Never expose CRM/payment logic to client components** - All API calls from client must go through Server Actions with validation
2. **API routes are for external webhooks ONLY** - Internal client-server communication uses Server Actions
3. **Single responsibility per integration** - GoHighLevel owns lead pipeline; Stripe owns payments; Next.js owns presentation
4. **Idempotent webhook handlers** - All webhook processors must safely handle duplicate deliveries

## Data Flow Patterns

### Pattern 1: Lead Capture Flow (Primary User Journey)

```
User visits landing page
   ↓ (RSC renders page with SEO-optimized content)
User fills out lead form (Client Component)
   ↓ (Client-side validation)
User submits form
   ↓ (Calls Server Action)
Server Action validates + enriches data
   ↓ (Server-to-server call)
GoHighLevel API creates contact/opportunity
   ↓ (Success response)
Server Action returns success
   ↓
User sees confirmation + redirect
   ↓ (Async)
GoHighLevel automation triggers (email sequence, SMS follow-up)
```

**Critical implementation details:**
- Form submission uses Server Actions, NOT API routes (internal communication)
- Server Action validates data server-side (never trust client)
- GHL contact creation includes UTM parameters, page source, form fields
- Idempotency key prevents duplicate leads if user double-clicks submit
- Success confirmation can be Next.js page or redirect to GHL booking calendar

### Pattern 2: Booking + Deposit Flow

```
User clicks "Book Now" CTA
   ↓ (Server Action checks availability)
Server Action creates Stripe Checkout Session
   ↓ (Includes service details, pricing, metadata)
User redirected to Stripe Checkout
   ↓ (User completes payment)
Stripe sends webhook to /api/webhooks/stripe
   ↓ (Signature verification)
API route validates webhook signature
   ↓ (Processes checkout.session.completed event)
API route updates GHL opportunity with "Deposit Paid" status
   ↓
GHL automation triggers booking confirmation email
   ↓
User receives confirmation with calendar invite
```

**Critical implementation details:**
- Pricing/product info NEVER comes from client (fetched server-side from config/Stripe)
- Stripe webhook endpoint uses raw body for signature verification
- Webhook handler is idempotent (checks if already processed by event ID)
- GHL opportunity status update includes payment reference and amount
- Error handling includes retry logic with exponential backoff for GHL API calls

### Pattern 3: Webhook Sync Pattern (Bidirectional CRM Updates)

```
External event occurs (GHL or Stripe)
   ↓
Webhook POST to Next.js API route
   ↓ (Raw body required for signature verification)
API route verifies webhook signature
   ↓ (SHA256 + public key for GHL; Stripe signature for Stripe)
Webhook validation passes
   ↓
API route immediately returns 200 OK
   ↓ (Process asynchronously)
Webhook handler queues processing job
   ↓
Background job processes event (update database, trigger actions)
   ↓
Log success/failure with webhook ID (idempotency)
```

**Critical implementation details:**
- **Return 200 OK immediately** before processing (prevents timeout/retry storms)
- Track webhook IDs to prevent duplicate processing
- Use 429 status code for rate limiting (only code that triggers GHL retry)
- Verify signatures using GoHighLevel public key (RSA) or Stripe signing secret
- Log all webhooks with payload, timestamp, processing result for debugging

### Pattern 4: Server Actions vs API Routes Decision Tree

```
Is the caller external (Stripe, GHL, Zapier)?
   YES → Use API Route (with public endpoint)
   NO ↓
Is it a data mutation from the UI (form submit, booking, update)?
   YES → Use Server Action (type-safe, no manual fetch)
   NO ↓
Is it a GET request for data from a Client Component?
   YES → Use API Route or Server Component (depends on caching needs)
   NO ↓
Default → Server Component with RSC (server-rendered data)
```

**Rationale from research:** "Use Route Handlers when calling the API from an external source... Server Actions are like automatically generated POST API routes that can be called from the client, designed for mutation operations." The key decision factor is whether the caller is external (use API route with HTTP verb flexibility) or internal (use Server Action for type safety and DX).

## Patterns to Follow

### Pattern 1: Server-First Form Handling

**What:** Forms use Server Actions for submissions, with progressive enhancement for better UX

**When:** All lead capture forms, booking forms, contact forms

**Why:** Server Actions provide automatic loading states, type safety, and eliminate the need for manual fetch calls or API routes

**Example:**

```typescript
// app/actions/lead-capture.ts (Server Action)
'use server'

import { z } from 'zod'
import { ghlClient } from '@/lib/gohighlevel'
import { redirect } from 'next/navigation'

const LeadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  serviceInterest: z.enum(['osprey', 'white-nights', 'relentless', 'at-home'])
})

export async function captureLeadAction(formData: FormData) {
  // Server-side validation
  const parsed = LeadSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    serviceInterest: formData.get('serviceInterest')
  })

  if (!parsed.success) {
    return { error: 'Invalid form data' }
  }

  // Create contact in GoHighLevel
  try {
    await ghlClient.contacts.create({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      source: 'website_lead_form',
      customFields: {
        service_interest: parsed.data.serviceInterest
      }
    })
  } catch (error) {
    console.error('GHL contact creation failed:', error)
    return { error: 'Failed to save lead. Please try again.' }
  }

  // Redirect to confirmation page
  redirect('/thank-you?service=' + parsed.data.serviceInterest)
}
```

```tsx
// app/components/lead-form.tsx (Client Component)
'use client'

import { useFormStatus } from 'react-dom'
import { captureLeadAction } from '@/app/actions/lead-capture'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Get Started'}
    </button>
  )
}

export function LeadForm() {
  return (
    <form action={captureLeadAction}>
      <input name="firstName" required />
      <input name="lastName" required />
      <input name="email" type="email" required />
      <input name="phone" required />
      <select name="serviceInterest">
        <option value="osprey">The Osprey</option>
        <option value="white-nights">White Nights</option>
        <option value="relentless">Relentless</option>
        <option value="at-home">At-Home Memorial</option>
      </select>
      <SubmitButton />
    </form>
  )
}
```

**Benefits:** No manual fetch, automatic loading state, progressive enhancement (works without JS), type-safe server-side processing

### Pattern 2: Webhook Signature Verification (GoHighLevel)

**What:** Verify incoming webhooks using RSA public key cryptography to prevent spoofing

**When:** All GoHighLevel webhook endpoints

**Why:** "Webhooks can be spoofed by malicious actors, so always verify that webhooks are coming from the platform"

**Example:**

```typescript
// app/api/webhooks/gohighlevel/route.ts
import { createVerify } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const GHL_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
-----END PUBLIC KEY-----`

export async function POST(request: NextRequest) {
  // Extract signature from header
  const signature = request.headers.get('x-wh-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
  }

  // Read raw body (required for signature verification)
  const rawBody = await request.text()

  // Verify signature using GHL public key
  const verify = createVerify('sha256')
  verify.update(rawBody)
  const isValid = verify.verify(GHL_PUBLIC_KEY, signature, 'base64')

  if (!isValid) {
    console.error('Invalid webhook signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // Parse webhook payload after verification
  const payload = JSON.parse(rawBody)
  const { type, data, id: webhookId } = payload

  // Return 200 immediately (process asynchronously)
  // Do NOT await processing - prevents timeout/retry storms
  processWebhookAsync(webhookId, type, data).catch(console.error)

  return NextResponse.json({ received: true })
}

async function processWebhookAsync(webhookId: string, type: string, data: any) {
  // Check idempotency (prevent duplicate processing)
  const alreadyProcessed = await checkWebhookProcessed(webhookId)
  if (alreadyProcessed) {
    console.log('Webhook already processed:', webhookId)
    return
  }

  // Process webhook based on type
  switch (type) {
    case 'contact.created':
      await handleContactCreated(data)
      break
    case 'opportunity.status_changed':
      await handleOpportunityStatusChanged(data)
      break
    // ... other event types
  }

  // Mark webhook as processed
  await markWebhookProcessed(webhookId)
}
```

**Security layers:** Signature verification → Immediate 200 response → Idempotency check → Async processing

### Pattern 3: Stripe Payment with Server Actions

**What:** Use Server Actions to create Stripe Checkout sessions, API routes only for webhooks

**When:** Booking deposits, service payments, subscription billing

**Why:** "Server Actions avoid needing to set up a REST API... No API routes, no fetch calls, no manual loading states"

**Example:**

```typescript
// app/actions/create-checkout.ts
'use server'

import Stripe from 'stripe'
import { redirect } from 'next/navigation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

export async function createCheckoutSessionAction(serviceType: string) {
  // NEVER trust prices from client - fetch server-side
  const serviceConfig = {
    'osprey': { name: 'The Osprey Sea Burial', price: 200000 }, // $2000 in cents
    'white-nights': { name: 'White Nights Sea Burial', price: 200000 },
    'relentless': { name: 'Relentless Sea Burial', price: 200000 },
    'at-home': { name: 'At-Home Memorial Service', price: 40000 } // $400
  }

  const service = serviceConfig[serviceType as keyof typeof serviceConfig]
  if (!service) {
    throw new Error('Invalid service type')
  }

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: service.name,
            description: 'Sea burial ceremony - deposit payment'
          },
          unit_amount: service.price
        },
        quantity: 1
      }
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/services/${serviceType}`,
    metadata: {
      service_type: serviceType,
      source: 'website_booking'
    }
  })

  // Redirect to Stripe Checkout
  redirect(session.url!)
}
```

```tsx
// app/components/book-now-button.tsx
'use client'

import { createCheckoutSessionAction } from '@/app/actions/create-checkout'

export function BookNowButton({ serviceType }: { serviceType: string }) {
  return (
    <form action={() => createCheckoutSessionAction(serviceType)}>
      <button type="submit">
        Book Now - Pay Deposit
      </button>
    </form>
  )
}
```

**Security:** Pricing sourced server-side, user never manipulates payment amounts, automatic CSRF protection

### Pattern 4: Idempotent Webhook Processing

**What:** Track processed webhook IDs to safely handle duplicate deliveries

**When:** All webhook handlers (Stripe, GoHighLevel)

**Why:** Webhook delivery is at-least-once, meaning duplicates are expected and must be handled gracefully

**Example:**

```typescript
// lib/webhook-tracking.ts
const processedWebhooks = new Map<string, Date>() // In production: use Redis or database

export async function isWebhookProcessed(webhookId: string): Promise<boolean> {
  return processedWebhooks.has(webhookId)
}

export async function markWebhookProcessed(webhookId: string): Promise<void> {
  processedWebhooks.set(webhookId, new Date())
  // In production: store in Redis with TTL (e.g., 24 hours)
  // await redis.setex(`webhook:${webhookId}`, 86400, 'processed')
}

// Usage in webhook handler
async function handleWebhook(webhookId: string, payload: any) {
  if (await isWebhookProcessed(webhookId)) {
    console.log('Duplicate webhook, skipping:', webhookId)
    return { status: 'duplicate' }
  }

  try {
    // Process webhook
    await processPaymentSuccess(payload)

    // Mark as processed AFTER successful processing
    await markWebhookProcessed(webhookId)

    return { status: 'success' }
  } catch (error) {
    // Do NOT mark as processed if error occurs (allow retry)
    console.error('Webhook processing failed:', error)
    throw error
  }
}
```

**Key principle:** Mark processed AFTER success, not before (allows legitimate retries on failure)

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client-Side API Keys

**What:** Exposing Stripe or GoHighLevel API keys in client-side code

**Why bad:** API keys exposed to browser can be extracted and abused, leading to unauthorized charges, data theft, or CRM manipulation

**Instead:**
- Always call APIs from Server Actions or API routes (server-side only)
- Use Stripe publishable key for client-side Checkout redirects ONLY
- Store secrets in `.env.local` with `NEXT_PUBLIC_` prefix ONLY for truly public values

**Detection:** Search codebase for API keys in Client Components with `'use client'` directive

### Anti-Pattern 2: API Routes for Internal Form Submissions

**What:** Creating POST API routes at `/api/submit-form` and calling them with `fetch()` from client components

**Why bad:** Server Actions provide the same functionality with better DX (type safety, automatic loading states, no manual fetch), plus automatic CSRF protection

**Instead:** Use Server Actions for all form submissions and mutations originating from the UI

**Example of what NOT to do:**

```typescript
// ❌ BAD: Unnecessary API route for internal form submission
// app/api/submit-form/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  // ... process form
}

// ❌ BAD: Client component manually fetching API route
'use client'
async function handleSubmit(data) {
  const res = await fetch('/api/submit-form', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

// ✅ GOOD: Server Action with direct invocation
'use server'
export async function submitFormAction(formData: FormData) {
  // ... process form
}

// ✅ GOOD: Client component uses Server Action directly
'use client'
<form action={submitFormAction}>...</form>
```

**When API routes ARE appropriate:** Webhooks from external services (Stripe, GoHighLevel), third-party integrations (Zapier), public APIs for mobile apps

### Anti-Pattern 3: Missing Webhook Idempotency

**What:** Processing every incoming webhook without checking if it's already been handled

**Why bad:** Webhook providers retry deliveries on timeouts or errors, leading to duplicate charges, double-entry leads, or repeated automation triggers

**Instead:**
- Track webhook IDs in database or Redis
- Check if ID exists before processing
- Only mark as processed after successful completion
- Use transactional operations where possible

**Consequences:** User charged twice, duplicate leads in CRM, emails sent multiple times - real customer impact

### Anti-Pattern 4: Synchronous Webhook Processing

**What:** Performing long-running operations (CRM updates, email sending) inside webhook handler before returning response

**Why bad:** External webhook callers (Stripe, GHL) timeout after 5-10 seconds, triggering automatic retries which compound the problem. Research found: "Return 200 OK immediately before processing (prevents timeout/retry storms)"

**Instead:**
- Return 200 OK within 1-2 seconds
- Queue processing job asynchronously
- Use background workers or serverless functions
- Log webhook ID and payload for debugging

**Example:**

```typescript
// ❌ BAD: Synchronous processing blocks response
export async function POST(request: Request) {
  const payload = await request.json()

  await updateCRM(payload) // Takes 3 seconds
  await sendEmail(payload) // Takes 2 seconds
  await logAnalytics(payload) // Takes 1 second
  // Total: 6 seconds → likely timeout → retry storm

  return NextResponse.json({ success: true })
}

// ✅ GOOD: Immediate response, async processing
export async function POST(request: Request) {
  const payload = await request.json()

  // Return immediately
  queueWebhookProcessing(payload).catch(console.error)

  return NextResponse.json({ received: true }) // Returns in <500ms
}
```

### Anti-Pattern 5: Trusting Client-Side Pricing

**What:** Accepting payment amounts from client-side forms or URL parameters

**Why bad:** Users can manipulate client-side values (browser dev tools, intercepting proxies), potentially paying $1 for a $2000 service

**Instead:**
- Store pricing in server-side config or database
- Fetch prices inside Server Actions before creating payment session
- Only pass product identifier from client (e.g., `serviceType: 'osprey'`)
- Validate all amounts against server-side source of truth

**Real-world impact:** Revenue loss, business viability threat, potential fraud vector

### Anti-Pattern 6: Over-Engineering with Microservices

**What:** Splitting small service website into separate deployments for forms, payments, CRM sync, etc.

**Why bad:** Research found "the intricacy of microservices design may not be necessary if you have a small team, since a monolith can meet all of your company's needs." Adds operational complexity (multiple deployments, service mesh, inter-service auth) without corresponding benefit for small/medium businesses.

**Instead:**
- Use modular monolith with clear internal boundaries
- Separate concerns via folders and modules, not deployments
- Consider microservices only when scaling beyond 50K+ users or multiple teams
- Keep architecture appropriate to business size

**Structure example:**

```
app/
├── (marketing)/        # Public pages
├── actions/            # Server Actions (business logic)
├── api/webhooks/       # External webhook receivers
lib/
├── gohighlevel/        # GHL client module
├── stripe/             # Stripe client module
├── validations/        # Shared validation schemas

# All in ONE deployment, clear separation via directories
```

## GoHighLevel Integration Architecture

### Authentication Pattern

**OAuth 2.0 for Agency Access:** Use OAuth flow for multi-location agencies or marketplace apps. Store access/refresh tokens securely, implement token refresh logic.

**Private API Key for Single Location:** Water & Ash is single-location, so private API key (scoped to location) is simpler and sufficient. Store in `.env.local` as `GOHIGHLEVEL_API_KEY`.

**Recommendation for Water & Ash:** Start with Private API Key (simpler, faster), migrate to OAuth only if expanding to multiple locations or white-label offering.

### API Integration Points

Based on official documentation, GoHighLevel provides six API modules. For Water & Ash, relevant integrations:

| GHL Module | Use Case | Implementation |
|------------|----------|----------------|
| **Contacts API** | Create leads from website forms, update contact info | POST /contacts on form submission via Server Action |
| **Opportunities API** | Track booking pipeline, update status on deposit payment | POST /opportunities when lead converts, PATCH on status change |
| **Calendar API** | Display availability, create booking appointments | GET /calendars for availability, POST /appointments on booking |
| **Conversations API** | (Future) Send SMS confirmations, automated follow-ups | Not MVP - GHL automations handle this internally |
| **Payments API** | (Optional) GHL has payment processing, but using Stripe | Not using - Stripe is primary payment processor |
| **Webhooks (Inbound)** | Receive status updates from GHL (appointment confirmed, cancelled) | POST to /api/webhooks/gohighlevel with signature verification |

### Webhook Event Types (GHL → Next.js)

Critical events to subscribe to for Water & Ash:

- `contact.created` - New lead added in GHL (possibly via phone call, need to sync to analytics)
- `opportunity.status_changed` - Pipeline stage changes (Lead → Qualified → Booked → Completed)
- `appointment.created` - New booking scheduled (trigger internal confirmation)
- `appointment.cancelled` - Booking cancelled (handle refunds, update availability)
- `payment.received` - (If using GHL payments instead of Stripe)

**Setup location:** GoHighLevel Settings → Integrations → Webhooks → Configure endpoint URL

### Data Sync Strategy

**Source of Truth Principle:**
- **GoHighLevel = Source of Truth** for: Contact info, pipeline status, booking calendar, automation state
- **Next.js = Source of Truth** for: Public marketing content, service descriptions, pricing display
- **Stripe = Source of Truth** for: Payment status, transaction history, deposit amounts

**Sync Pattern:**
1. Website lead form → Creates contact in GHL (Next.js → GHL)
2. User books via Stripe → Updates GHL opportunity status (Next.js → GHL)
3. Stripe confirms payment → Webhook updates GHL (Stripe → Next.js → GHL)
4. GHL automation triggers → Sends confirmation emails (GHL internal)
5. GHL status changes → Webhook notifies Next.js for analytics (GHL → Next.js)

**Conflict Resolution:** Always trust GHL for contact/pipeline data. If discrepancy, fetch fresh from GHL API.

### Rate Limiting & Error Handling

**GoHighLevel API Limits:** Not explicitly documented, but community reports suggest ~120 requests/minute per location

**Best Practices:**
- Implement exponential backoff on API failures (start with 1s, max 32s)
- Cache calendar availability (5-minute TTL) to reduce API calls
- Batch contact updates where possible (avoid updating same contact multiple times)
- Use webhook delivery for real-time updates (don't poll for changes)

**Error Scenarios:**
- `401 Unauthorized` → API key invalid or expired (alert developer)
- `429 Too Many Requests` → Retry with exponential backoff
- `500 Server Error` → GHL outage, retry up to 3 times, then queue for later
- `404 Not Found` → Contact/opportunity doesn't exist (log and investigate)

### Implementation Sequence

**Build Order for GHL Integration:**

1. **Setup & Auth** (Day 1)
   - Install GoHighLevel SDK or create axios client
   - Configure API key in environment variables
   - Test connection with GET /locations/{locationId}

2. **Lead Capture** (Day 2-3)
   - Implement Server Action for form submission
   - Map form fields to GHL contact schema
   - Add UTM parameter tracking
   - Test lead creation end-to-end

3. **Opportunity Pipeline** (Day 4-5)
   - Create opportunity when lead submits form
   - Set initial stage as "New Lead" or "Website Inquiry"
   - Add custom fields for service interest, source page

4. **Webhook Receiver** (Day 6-7)
   - Create /api/webhooks/gohighlevel endpoint
   - Implement signature verification
   - Handle contact/opportunity status updates
   - Test with GHL webhook simulator

5. **Calendar Integration** (Day 8-10)
   - Fetch calendar availability for booking flow
   - Create appointment on successful deposit payment
   - Sync appointment details back to Stripe metadata

6. **Error Monitoring** (Day 11)
   - Add logging for all GHL API calls
   - Set up alerting for repeated failures
   - Implement retry queue for failed updates

## Stripe Payment Architecture

### Integration Pattern: Checkout + Webhooks

**Stripe Checkout Session:** User-friendly hosted payment page, PCI compliant, handles card validation and 3D Secure. For Water & Ash: one-time payments (deposits), not subscriptions initially.

**Webhook Confirmation:** Stripe sends `checkout.session.completed` event to Next.js webhook endpoint. This is the authoritative payment confirmation (never trust client-side success page redirect).

**Metadata Linking:** Include `{ serviceType, ghlContactId, ghlOpportunityId }` in Checkout session metadata to link payment back to CRM records.

### Payment Flow Architecture

```
User clicks "Book Now" (Client Component)
   ↓
Calls Server Action: createCheckoutSessionAction(serviceType)
   ↓
Server Action fetches pricing (server-side config)
   ↓
Server Action creates Stripe Checkout Session
   • line_items with service name and price
   • metadata: { serviceType, source: 'website' }
   • success_url: /booking/success?session_id={CHECKOUT_SESSION_ID}
   • cancel_url: /services/{serviceType}
   ↓
Server Action redirects to session.url (Stripe hosted page)
   ↓
User completes payment on Stripe Checkout
   ↓
Stripe redirects to success_url (optimistic UI)
   ↓
Stripe sends webhook to /api/webhooks/stripe (authoritative)
   ↓
Next.js webhook handler:
   • Verifies signature (stripe.webhooks.constructEvent)
   • Checks idempotency (event.id already processed?)
   • Extracts metadata (serviceType, ghlContactId)
   • Updates GHL opportunity: "Deposit Paid"
   • Returns 200 OK
   ↓
GHL automation: Send booking confirmation email
   ↓
User receives email with calendar link
```

### Webhook Security: Stripe Signature Verification

**Critical:** Stripe webhooks must verify signature to prevent spoofing. Unlike GHL (which uses RSA public key), Stripe uses HMAC with signing secret.

**Implementation:**

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

export async function POST(request: Request) {
  const body = await request.text() // Raw body required for signature
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    // Verify signature (throws if invalid)
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Process event after verification
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await handleCheckoutComplete(session)
  }

  return NextResponse.json({ received: true })
}
```

**Security layers:**
1. Signature verification (ensures webhook from Stripe)
2. Idempotency check (prevents duplicate processing)
3. Server-side metadata validation (ensures session belongs to valid service)

### Payment Status Tracking

**States to track:**

| Stripe Event | Meaning | Next Action |
|--------------|---------|-------------|
| `checkout.session.completed` | Payment successful | Update GHL opportunity to "Deposit Paid", send confirmation |
| `checkout.session.expired` | User abandoned checkout | (Optional) Trigger abandoned cart email via GHL |
| `payment_intent.succeeded` | Payment confirmed (card charged) | Log for reconciliation, receipt already sent by Stripe |
| `charge.refunded` | Refund processed | Update GHL opportunity to "Refunded", flag for review |
| `charge.dispute.created` | Chargeback initiated | Alert admin, investigate booking |

**For MVP:** Only handle `checkout.session.completed`. Other events can be added incrementally.

### Testing Strategy

**Stripe Test Mode:**
- Use test API keys (starts with `sk_test_` and `pk_test_`)
- Test cards: `4242 4242 4242 4242` (Visa success), `4000 0000 0000 0002` (declined)
- Trigger test webhooks: Stripe Dashboard → Webhooks → Send test webhook

**Local Testing with Stripe CLI:**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Generates webhook signing secret for local testing
stripe trigger checkout.session.completed
```

**Staging Environment:** Use Stripe test mode with real GHL integration to validate end-to-end flow

## Build Order & Dependencies

### Phase 1: Foundation (Week 1)

**Goal:** Basic Next.js app with marketing pages and CRM auth

1. Next.js 15 project setup (App Router, TypeScript, Tailwind, shadcn/ui)
2. Environment variables configuration (GHL API key, Stripe keys)
3. Static marketing pages (home, about, services)
4. Service detail pages for vessels (Osprey, White Nights, Relentless, At-Home)
5. GoHighLevel client setup and authentication test

**Dependency:** None (greenfield)
**Deliverable:** Static site deployed, GHL connection verified

### Phase 2: Lead Capture (Week 2)

**Goal:** Forms that sync leads to GoHighLevel CRM

6. Lead capture form component (Client Component with validation)
7. Server Action for form submission
8. GHL Contacts API integration (create contact)
9. GHL Opportunities API integration (create opportunity)
10. Form submission confirmation page
11. Error handling and retry logic

**Dependency:** Phase 1 (GHL client setup)
**Deliverable:** Functional lead capture to CRM

### Phase 3: Landing Pages (Week 2-3)

**Goal:** Target market-specific pages with optimized messaging

12. `/funeral-homes` landing page (funeral director persona)
13. `/hospice` landing page (hospice coordinator persona)
14. `/estate-planners` landing page (end-of-life planner persona)
15. Each with dedicated lead forms and service emphasis
16. UTM parameter tracking (source attribution)

**Dependency:** Phase 2 (lead capture forms)
**Deliverable:** Three landing pages with unique messaging

### Phase 4: Payment Integration (Week 3-4)

**Goal:** Accept deposits via Stripe Checkout

17. Stripe SDK integration
18. Server Action to create Checkout Session
19. "Book Now" buttons on service pages
20. Stripe webhook endpoint (signature verification)
21. Handle `checkout.session.completed` event
22. Update GHL opportunity status on payment
23. Success/cancel redirect pages

**Dependency:** Phase 2 (GHL opportunity creation)
**Deliverable:** End-to-end booking with deposit payment

### Phase 5: Bidirectional Sync (Week 4-5)

**Goal:** Receive updates from GoHighLevel via webhooks

24. GoHighLevel webhook endpoint (signature verification)
25. Handle `opportunity.status_changed` event
26. Handle `appointment.created` / `appointment.cancelled` events
27. Idempotency tracking for webhook deduplication
28. Webhook logging dashboard (admin view)

**Dependency:** Phase 2 (GHL integration), Phase 4 (webhook patterns)
**Deliverable:** Real-time sync between GHL and Next.js

### Phase 6: Polish & Monitoring (Week 5-6)

**Goal:** Production-ready reliability and observability

29. Error logging (Sentry or similar)
30. API call retry logic with exponential backoff
31. Rate limiting for GHL API calls
32. Webhook delivery monitoring
33. Form submission analytics
34. Performance optimization (caching, image optimization)

**Dependency:** All previous phases
**Deliverable:** Production-ready application

### Critical Path Dependencies

```
Phase 1 (Foundation)
   ↓
Phase 2 (Lead Capture) ← Must complete before Phase 3 & 4
   ↓
Phase 3 (Landing Pages) + Phase 4 (Payments)
   ↓                              ↓
Phase 5 (Bidirectional Sync) ← Needs both Phase 2 & 4
   ↓
Phase 6 (Polish & Monitoring)
```

**Parallelization Opportunities:**
- Phase 3 (Landing Pages) and Phase 4 (Payments) can be built simultaneously after Phase 2
- Phase 1 static pages can be designed while Phase 2 CRM integration is being built

**Risky Dependencies:**
- **GoHighLevel API Access:** Must obtain API key before Phase 2
- **Stripe Account Approval:** Can take 1-3 business days, obtain early
- **Webhook URL Requirements:** Need publicly accessible domain (not localhost) for Phase 4 & 5 testing

## Scalability Considerations

| Concern | At Launch (0-100 users/month) | At Growth (100-1K users/month) | At Scale (1K-10K users/month) |
|---------|-------------------------------|--------------------------------|-------------------------------|
| **Hosting** | Vercel Hobby ($0) or Pro ($20/mo) | Vercel Pro + Edge Functions | Vercel Enterprise or self-hosted |
| **Database** | Not needed (GHL is source of truth) | Optional: PostgreSQL for analytics | Required: Separate analytics DB |
| **Caching** | Next.js built-in cache (enough) | Redis for GHL API response caching | Redis + CDN (Cloudflare) |
| **Webhook Processing** | Synchronous (return 200 immediately) | Asynchronous with queue (Vercel Cron) | Dedicated queue (BullMQ + Redis) |
| **GHL API Rate Limits** | <10 req/min, no throttling needed | Cache aggressively, respect 120/min limit | Use webhook-driven architecture, minimize polling |
| **Monitoring** | Console logs + Vercel logs | Sentry error tracking | Full observability (Datadog/New Relic) |

**Recommendation for Water & Ash:**
- Start in "At Launch" tier - simple architecture, minimal costs
- Monitor traffic and error rates for 3-6 months
- Scale up incrementally only when metrics show need (don't premature optimize)

**Early Warning Signals:**
- Webhook processing >2 seconds (add queue)
- GHL API 429 errors (add caching)
- Form submission errors >5% (investigate validation/network)

## Sources

### Official Documentation (HIGH Confidence)
- [GoHighLevel API Documentation](https://marketplace.gohighlevel.com/docs/)
- [GoHighLevel Webhook Integration Guide](https://marketplace.gohighlevel.com/docs/webhook/WebhookIntegrationGuide/index.html)
- [Next.js Architecture in 2026 — Server-First, Client-Islands](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js 15: App Router — A Complete Senior-Level Guide](https://medium.com/@livenapps/next-js-15-app-router-a-complete-senior-level-guide-0554a2b820f7)
- [Modern Full Stack Application Architecture Using Next.js 15+](https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/)

### Integration Patterns (MEDIUM Confidence)
- [Stripe Checkout and Webhook in a Next.js 15 (2025)](https://medium.com/@gragson.john/stripe-checkout-and-webhook-in-a-next-js-15-2025-925d7529855e)
- [Stripe + Next.js 15: The Complete 2025 Guide](https://www.pedroalonso.net/blog/stripe-nextjs-complete-guide-2025/)
- [GoHighLevel API Integration (2025): REST, Webhooks, OAuth](https://isitdev.com/gohighlevel-api-integration-2025/)
- [The Ultimate 2025 Guide to GoHighLevel CRM Integrations](https://colorwhistle.com/gohighlevel-crm-integration/)

### Architecture Best Practices (MEDIUM Confidence)
- [Server Actions vs Route Handlers in Next.js](https://makerkit.dev/blog/tutorials/server-actions-vs-route-handlers)
- [Next.js API Routes vs. Server Actions: Which One to Use and Why?](https://medium.com/@shavaizali159/next-js-api-routes-vs-server-actions-which-one-to-use-and-why-809f09d5069b)
- [Monolith vs. Microservices: Which Architecture Is Right for Your Business in 2026?](https://uniridge.co/monolith-vs-microservices-which-architecture-is-right-for-your-business-in-2026/)
- [Microservices vs Monoliths in 2026: When Each Architecture Wins](https://www.javacodegeeks.com/2025/12/microservices-vs-monoliths-in-2026-when-each-architecture-wins.html)

### Service Booking Systems (MEDIUM Confidence)
- [Architecture and Data Flow - Wix Bookings](https://dev.wix.com/docs/rest/business-solutions/bookings/architecture-and-data-flow)
- [Design Hotel Booking System: Step-by-Step Guide](https://www.systemdesignhandbook.com/guides/design-hotel-booking-system/)
- [Payment Infrastructure 2026: Modular Architecture & Smart Routing](https://www.nuvei.com/posts/payment-infrastructure-2026-modular-architecture-smart-routing-real-time-optimization)

### Lead Capture & CRM Sync (MEDIUM Confidence)
- [How to Integrate Landing Pages with Your CRM for Better Lead Management](https://webbookstudio.com/articles/how-to-integrate-landing-pages-with-your-crm-for-better-lead-management/)
- [API & Multi-Channel Lead Capture: Building Your Lead Ecosystem - 2026 Guide](https://resources.rework.com/libraries/lead-management/multi-channel-lead-capture)
- [Landing Page Builders 2026: 7 Ultimate Tools to Dominate Conversions](https://crmbased.com/?p=347)

---

**Architecture Decision Summary:**

✅ **Modular monolith** (not microservices) - appropriate for business size
✅ **Server-first Next.js 15** with React Server Components for SEO and performance
✅ **Server Actions for forms** - better DX than API routes for internal mutations
✅ **API routes for webhooks only** - external integrations (Stripe, GHL)
✅ **GoHighLevel as CRM source of truth** - Next.js syncs TO GHL, not vice versa
✅ **Stripe for payments** - standard integration with checkout sessions and webhooks
✅ **Idempotent webhook handlers** - safe duplicate processing with ID tracking
✅ **Immediate webhook responses** - return 200 OK, process asynchronously

**Critical Success Factors:**
1. Never expose API keys client-side
2. Always verify webhook signatures (GHL RSA, Stripe HMAC)
3. Never trust client-side pricing - fetch server-side
4. Implement retry logic with exponential backoff for external APIs
5. Start simple, scale incrementally based on metrics
