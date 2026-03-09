// GoHighLevel Configuration
// All pipeline/calendar IDs are configured via environment variables
// so they can be set up in GHL's dashboard and referenced here.

export const GHL_CONFIG = {
  apiBaseUrl: 'https://services.leadconnectorhq.com',
  apiVersion: '2021-07-28',

  // Auth
  get apiKey() {
    return process.env.GHL_API_KEY || '';
  },
  get locationId() {
    return process.env.GHL_LOCATION_ID || '';
  },

  // Pipelines
  pipelines: {
    b2c: {
      get id() {
        return process.env.GHL_B2C_PIPELINE_ID || '';
      },
      stages: {
        get inquiry() {
          return process.env.GHL_B2C_STAGE_INQUIRY || '';
        },
        get consultation() {
          return process.env.GHL_B2C_STAGE_CONSULTATION || '';
        },
        get deposit() {
          return process.env.GHL_B2C_STAGE_DEPOSIT || '';
        },
        get confirmed() {
          return process.env.GHL_B2C_STAGE_CONFIRMED || '';
        },
        get complete() {
          return process.env.GHL_B2C_STAGE_COMPLETE || '';
        },
      },
    },
    b2b: {
      get id() {
        return process.env.GHL_B2B_PIPELINE_ID || '';
      },
      stages: {
        get partnerInquiry() {
          return process.env.GHL_B2B_STAGE_PARTNER_INQUIRY || '';
        },
        get discovery() {
          return process.env.GHL_B2B_STAGE_DISCOVERY || '';
        },
        get agreement() {
          return process.env.GHL_B2B_STAGE_AGREEMENT || '';
        },
        get activePartner() {
          return process.env.GHL_B2B_STAGE_ACTIVE_PARTNER || '';
        },
      },
    },
  },

  // Calendars (one per vessel + general)
  calendars: {
    get osprey() {
      return process.env.GHL_CALENDAR_OSPREY || '';
    },
    get whiteNights() {
      return process.env.GHL_CALENDAR_WHITE_NIGHTS || '';
    },
    get relentless() {
      return process.env.GHL_CALENDAR_RELENTLESS || '';
    },
    get general() {
      return process.env.GHL_CALENDAR_GENERAL || '';
    },
  },

  // Custom fields in GHL
  customFields: {
    get serviceInterest() {
      return process.env.GHL_FIELD_SERVICE_INTEREST || '';
    },
    get preferredDate() {
      return process.env.GHL_FIELD_PREFERRED_DATE || '';
    },
    get vesselPreference() {
      return process.env.GHL_FIELD_VESSEL_PREFERENCE || '';
    },
    get leadSource() {
      return process.env.GHL_FIELD_LEAD_SOURCE || '';
    },
    get utmSource() {
      return process.env.GHL_FIELD_UTM_SOURCE || '';
    },
    get utmMedium() {
      return process.env.GHL_FIELD_UTM_MEDIUM || '';
    },
    get utmCampaign() {
      return process.env.GHL_FIELD_UTM_CAMPAIGN || '';
    },
    get epaReportStatus() {
      return process.env.GHL_FIELD_EPA_REPORT_STATUS || '';
    },
    get epaReportDueDate() {
      return process.env.GHL_FIELD_EPA_REPORT_DUE || '';
    },
  },

  // Webhook verification
  get webhookSecret() {
    return process.env.GHL_WEBHOOK_SECRET || '';
  },

  // Owner notification settings
  owner: {
    get email() {
      return process.env.GHL_OWNER_EMAIL || 'info@waterandashburials.org';
    },
    get phone() {
      return process.env.GHL_OWNER_PHONE || '6199289160';
    },
  },
} as const;

// Map vessel slug to calendar ID
export function getCalendarIdForVessel(vessel: string): string {
  const map: Record<string, string> = {
    osprey: GHL_CONFIG.calendars.osprey,
    'white-nights': GHL_CONFIG.calendars.whiteNights,
    relentless: GHL_CONFIG.calendars.relentless,
  };
  return map[vessel] || GHL_CONFIG.calendars.general;
}

// Map lead source to segment for tagging
export function getSegmentForSource(source: string): string {
  const map: Record<string, string> = {
    'website-funeral-homes': 'funeral-home',
    'website-mortuaries': 'mortuary',
    'website-hospice': 'hospice',
    'website-estate-planners': 'estate-planner',
    'website-contact': 'direct-consumer',
    'website-booking': 'direct-consumer',
  };
  return map[source] || 'direct-consumer';
}
