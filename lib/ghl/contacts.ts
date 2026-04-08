/**
 * GoHighLevel Contact Management — CRM-01, CRM-02, CRM-07
 *
 * Full contact lifecycle:
 * - Create/upsert contacts with lead source tracking
 * - Custom field management for ceremony-specific data
 * - Lead source attribution (website-form, website-booking, referral, phone, etc.)
 * - Tag management for segmentation
 */

const GHL_API_BASE = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-07-28';

// ─── Types ────────────────────────────────────────────────────────────────

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: LeadSource;
  /** Service of interest (e.g., 'osprey', 'white-nights', 'at-home') */
  serviceInterest?: string;
  /** How they heard about us */
  referralSource?: string;
  /** Initial message or notes */
  notes?: string;
  /** Tags for segmentation */
  tags?: string[];
  /** Custom fields as key-value pairs */
  customFields?: Record<string, string>;
}

export interface GHLContactResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags: string[];
  source: string;
  dateAdded: string;
}

export type LeadSource =
  | 'website-contact-form'
  | 'website-booking'
  | 'phone-call'
  | 'referral'
  | 'walk-in'
  | 'funeral-home-partner'
  | 'social-media'
  | 'google-search'
  | 'other';

// ─── Custom Field Keys ────────────────────────────────────────────────────

/**
 * Custom field keys configured in GHL for Water & Ash.
 * These must match the custom field names in the GHL location settings.
 */
export const CUSTOM_FIELDS = {
  serviceInterest: 'service_interest',
  referralSource: 'referral_source',
  vesselPreference: 'vessel_preference',
  ceremonyDate: 'ceremony_date',
  guestCount: 'guest_count',
  specialRequests: 'special_requests',
  leadScore: 'lead_score',
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────

function getApiKey(): string {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error('GHL_API_KEY is not configured');
  return key;
}

function getLocationId(): string {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error('GHL_LOCATION_ID is not configured');
  return id;
}

function ghlHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json',
    Version: API_VERSION,
  };
}

// ─── Contact Creation ─────────────────────────────────────────────────────

/**
 * Create or update a contact in GHL with full lead tracking.
 *
 * Uses email as the dedup key. If the contact already exists,
 * their record is updated with the new information.
 *
 * CRM-01: Contact creation
 * CRM-02: Lead source tracking
 * CRM-07: Custom fields
 */
export async function createContact(
  input: CreateContactInput,
): Promise<GHLContactResponse> {
  const locationId = getLocationId();

  // Build custom fields array
  const customFields: { key: string; field_value: string }[] = [];

  if (input.serviceInterest) {
    customFields.push({
      key: CUSTOM_FIELDS.serviceInterest,
      field_value: input.serviceInterest,
    });
  }

  if (input.referralSource) {
    customFields.push({
      key: CUSTOM_FIELDS.referralSource,
      field_value: input.referralSource,
    });
  }

  // Add any additional custom fields
  if (input.customFields) {
    for (const [key, value] of Object.entries(input.customFields)) {
      customFields.push({ key, field_value: value });
    }
  }

  // Build tags — always include lead source as a tag
  const tags = [...(input.tags || [])];
  tags.push(`source:${input.source}`);

  if (input.serviceInterest) {
    tags.push(`interest:${input.serviceInterest}`);
  }

  const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      locationId,
      source: input.source,
      tags,
      customFields,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GHL contact creation failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const contact = data.contact || data;

  return {
    id: contact.id,
    firstName: contact.firstName || input.firstName,
    lastName: contact.lastName || input.lastName,
    email: contact.email || input.email,
    phone: contact.phone || input.phone,
    tags: contact.tags || tags,
    source: input.source,
    dateAdded: contact.dateAdded || new Date().toISOString(),
  };
}

// ─── Contact Lookup ───────────────────────────────────────────────────────

/**
 * Look up a contact by email address.
 */
export async function getContactByEmail(
  email: string,
): Promise<GHLContactResponse | null> {
  const params = new URLSearchParams({
    locationId: getLocationId(),
    query: email,
  });

  const response = await fetch(
    `${GHL_API_BASE}/contacts/search/duplicate?${params}`,
    { headers: ghlHeaders() },
  );

  if (!response.ok) {
    if (response.status === 404) return null;
    const errorBody = await response.text();
    throw new Error(`GHL contact lookup failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const contact = data.contact;

  if (!contact) return null;

  return {
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    tags: contact.tags || [],
    source: contact.source || 'unknown',
    dateAdded: contact.dateAdded,
  };
}

/**
 * Get a contact by their GHL contact ID.
 */
export async function getContactById(
  contactId: string,
): Promise<GHLContactResponse | null> {
  const response = await fetch(
    `${GHL_API_BASE}/contacts/${contactId}`,
    { headers: ghlHeaders() },
  );

  if (!response.ok) {
    if (response.status === 404) return null;
    const errorBody = await response.text();
    throw new Error(`GHL get contact failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const contact = data.contact || data;

  return {
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    tags: contact.tags || [],
    source: contact.source || 'unknown',
    dateAdded: contact.dateAdded,
  };
}

// ─── Tag Management ───────────────────────────────────────────────────────

/**
 * Add tags to an existing contact.
 */
export async function addContactTags(
  contactId: string,
  tags: string[],
): Promise<void> {
  const response = await fetch(
    `${GHL_API_BASE}/contacts/${contactId}/tags`,
    {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({ tags }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GHL add tags failed (${response.status}): ${errorBody}`);
  }
}

/**
 * Remove tags from a contact.
 */
export async function removeContactTags(
  contactId: string,
  tags: string[],
): Promise<void> {
  const response = await fetch(
    `${GHL_API_BASE}/contacts/${contactId}/tags`,
    {
      method: 'DELETE',
      headers: ghlHeaders(),
      body: JSON.stringify({ tags }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GHL remove tags failed (${response.status}): ${errorBody}`);
  }
}

// ─── Custom Field Updates ─────────────────────────────────────────────────

/**
 * Update custom fields on an existing contact.
 */
export async function updateContactCustomFields(
  contactId: string,
  fields: Record<string, string>,
): Promise<void> {
  const customFields = Object.entries(fields).map(([key, value]) => ({
    key,
    field_value: value,
  }));

  const response = await fetch(
    `${GHL_API_BASE}/contacts/${contactId}`,
    {
      method: 'PUT',
      headers: ghlHeaders(),
      body: JSON.stringify({ customFields }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GHL update custom fields failed (${response.status}): ${errorBody}`);
  }
}

// ─── Notes ────────────────────────────────────────────────────────────────

/**
 * Add a note to a contact's record.
 */
export async function addContactNote(
  contactId: string,
  body: string,
): Promise<void> {
  const response = await fetch(
    `${GHL_API_BASE}/contacts/${contactId}/notes`,
    {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({ body }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GHL add note failed (${response.status}): ${errorBody}`);
  }
}
