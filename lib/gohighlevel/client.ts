import { GHL_CONFIG } from './config';
import type {
  GHLContactCreate,
  GHLContactResponse,
  GHLOpportunityCreate,
  GHLOpportunityResponse,
  GHLCalendarSlotsResponse,
  GHLAppointmentCreate,
  GHLAppointmentResponse,
} from './types';

/**
 * GoHighLevel API v2 Client
 *
 * Handles all communication with the GHL API including
 * contacts, opportunities, calendars, and appointments.
 */
class GoHighLevelClient {
  private baseUrl: string;
  private apiVersion: string;

  constructor() {
    this.baseUrl = GHL_CONFIG.apiBaseUrl;
    this.apiVersion = GHL_CONFIG.apiVersion;
  }

  private get headers(): HeadersInit {
    return {
      Authorization: `Bearer ${GHL_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
      Version: this.apiVersion,
    };
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`GHL API error [${response.status}]: ${errorBody}`);
      throw new Error(
        `GoHighLevel API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<T>;
  }

  // ─── Contacts ────────────────────────────────────────────────────

  async createContact(data: GHLContactCreate): Promise<GHLContactResponse> {
    return this.request<GHLContactResponse>('POST', '/contacts/', {
      ...data,
      locationId: GHL_CONFIG.locationId,
    });
  }

  async getContact(contactId: string): Promise<GHLContactResponse> {
    return this.request<GHLContactResponse>('GET', `/contacts/${contactId}`);
  }

  async updateContact(
    contactId: string,
    data: Partial<GHLContactCreate>
  ): Promise<GHLContactResponse> {
    return this.request<GHLContactResponse>(
      'PUT',
      `/contacts/${contactId}`,
      data
    );
  }

  async addContactTags(
    contactId: string,
    tags: string[]
  ): Promise<GHLContactResponse> {
    return this.request<GHLContactResponse>(
      'POST',
      `/contacts/${contactId}/tags`,
      { tags }
    );
  }

  async lookupContactByEmail(
    email: string
  ): Promise<GHLContactResponse | null> {
    try {
      const result = await this.request<{ contacts: GHLContactResponse['contact'][] }>(
        'GET',
        `/contacts/lookup?email=${encodeURIComponent(email)}&locationId=${GHL_CONFIG.locationId}`
      );
      if (result.contacts && result.contacts.length > 0) {
        return { contact: result.contacts[0] };
      }
      return null;
    } catch {
      return null;
    }
  }

  // ─── Opportunities ───────────────────────────────────────────────

  async createOpportunity(
    data: GHLOpportunityCreate
  ): Promise<GHLOpportunityResponse> {
    return this.request<GHLOpportunityResponse>('POST', '/opportunities/', data);
  }

  async updateOpportunityStage(
    opportunityId: string,
    pipelineStageId: string
  ): Promise<GHLOpportunityResponse> {
    return this.request<GHLOpportunityResponse>(
      'PUT',
      `/opportunities/${opportunityId}`,
      { pipelineStageId }
    );
  }

  async updateOpportunityStatus(
    opportunityId: string,
    status: 'open' | 'won' | 'lost' | 'abandoned'
  ): Promise<GHLOpportunityResponse> {
    return this.request<GHLOpportunityResponse>(
      'PUT',
      `/opportunities/${opportunityId}`,
      { status }
    );
  }

  // ─── Calendars ───────────────────────────────────────────────────

  async getAvailableSlots(
    calendarId: string,
    startDate: string,
    endDate: string
  ): Promise<GHLCalendarSlotsResponse> {
    return this.request<GHLCalendarSlotsResponse>(
      'GET',
      `/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}`
    );
  }

  async createAppointment(
    data: GHLAppointmentCreate
  ): Promise<GHLAppointmentResponse> {
    return this.request<GHLAppointmentResponse>(
      'POST',
      `/calendars/events/appointments`,
      data
    );
  }

  async getAppointment(
    appointmentId: string
  ): Promise<GHLAppointmentResponse> {
    return this.request<GHLAppointmentResponse>(
      'GET',
      `/calendars/events/appointments/${appointmentId}`
    );
  }

  async cancelAppointment(
    appointmentId: string
  ): Promise<GHLAppointmentResponse> {
    return this.request<GHLAppointmentResponse>(
      'PUT',
      `/calendars/events/appointments/${appointmentId}`,
      { status: 'cancelled' }
    );
  }

  // ─── Notes ───────────────────────────────────────────────────────

  async addContactNote(
    contactId: string,
    body: string
  ): Promise<{ note: { id: string } }> {
    return this.request<{ note: { id: string } }>(
      'POST',
      `/contacts/${contactId}/notes`,
      { body }
    );
  }

  // ─── Tasks ───────────────────────────────────────────────────────

  async createTask(
    contactId: string,
    title: string,
    dueDate: string,
    description?: string
  ): Promise<{ task: { id: string } }> {
    return this.request<{ task: { id: string } }>(
      'POST',
      `/contacts/${contactId}/tasks`,
      {
        title,
        dueDate,
        description: description || '',
        completed: false,
      }
    );
  }
}

// Singleton instance
export const ghlClient = new GoHighLevelClient();
