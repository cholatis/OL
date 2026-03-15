// ─── Customer 360° Profile ───────────────────────────────────────────────────
export interface CustomerSegment {
  tier: string
  fleetCategory: 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'
  renewalLikelihood: 'HIGH' | 'MEDIUM' | 'LOW'
  engagementScore: number
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface PdpaConsentRecord {
  customerId: string
  consentVersion: string
  consentDate: string
  consentChannels: ('MARKETING' | 'NOTIFICATION' | 'ANALYTICS' | 'THIRD_PARTY')[]
  withdrawnChannels: string[]
  lastUpdated: string
  consentDocument?: string
}

export interface ContactPerson {
  contactId: string
  customerId: string
  name: string
  position: string
  department: string
  phone: string
  email: string
  lineId?: string
  isPrimary: boolean
  roles: ('BILLING' | 'CONTRACT' | 'FLEET' | 'EXECUTIVE')[]
  pdpaConsentDate?: string
  preferredChannel: 'LINE' | 'EMAIL' | 'PHONE' | 'SMS'
}

export interface CustomerProfile {
  customerId: string
  companyName: string
  taxId: string
  tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE'
  fleetSize: number
  totalContractValue: number
  totalContracts: number
  activeContracts: number
  overdueAmount: number
  lastActivityDate: string
  assignedSalesperson: string
  segment: CustomerSegment
  tags: string[]
  pdpaConsent: PdpaConsentRecord
  contactPersons: ContactPerson[]
}

// ─── Interaction / Activity Log ──────────────────────────────────────────────
export type InteractionType =
  | 'CALL_INBOUND'
  | 'CALL_OUTBOUND'
  | 'MEETING'
  | 'EMAIL_SENT'
  | 'EMAIL_RECEIVED'
  | 'LINE_MESSAGE'
  | 'SITE_VISIT'
  | 'DOCUMENT_SENT'
  | 'COMPLAINT'
  | 'FEEDBACK'
  | 'CONTRACT_DISCUSSION'

export interface CustomerInteraction {
  interactionId: string
  customerId: string
  contactPersonId?: string
  type: InteractionType
  subject: string
  notes: string
  outcome?: string
  nextAction?: string
  nextActionDate?: string
  createdBy: string
  createdAt: string
  linkedToContractId?: string
  linkedToQuotationId?: string
  attachments?: string[]
}

// ─── Social Engagement ───────────────────────────────────────────────────────
export type EngagementChannel = 'LINE_OA' | 'EMAIL' | 'SMS' | 'PUSH_NOTIFICATION'
export type EngagementPurpose =
  | 'CONTRACT_RENEWAL_REMINDER'
  | 'PAYMENT_REMINDER'
  | 'INSURANCE_RENEWAL'
  | 'SERVICE_DUE'
  | 'OVERDUE_NOTICE'
  | 'MARKETING_CAMPAIGN'
  | 'NPS_SURVEY'
  | 'DOCUMENT_DELIVERY'
  | 'WELCOME'

export interface EngagementMessage {
  messageId: string
  channel: EngagementChannel
  purpose: EngagementPurpose
  templateId: string
  templateName: string
  recipients: string[]
  totalSent: number
  totalDelivered: number
  totalOpened?: number
  totalClicked?: number
  sentAt: string
  scheduledAt?: string
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'FAILED'
  linkedToContractId?: string
}

export interface MessageTemplate {
  templateId: string
  channel: EngagementChannel
  purpose: EngagementPurpose
  name: string
  subject?: string
  body: string
  language: 'TH' | 'EN'
  isActive: boolean
}

// ─── Customer Portal (self-service) ─────────────────────────────────────────
export interface CustomerPortalAccess {
  portalUserId: string
  customerId: string
  contactPersonId: string
  email: string
  lastLogin?: string
  isActive: boolean
  permissions: ('VIEW_CONTRACT' | 'VIEW_INVOICE' | 'MAKE_PAYMENT' | 'DOWNLOAD_DOCS' | 'SUBMIT_CLAIM')[]
}

// ─── NPS / CSAT Survey ───────────────────────────────────────────────────────
export interface SurveyResponse {
  surveyId: string
  customerId: string
  contactPersonId?: string
  surveyType: 'NPS' | 'CSAT' | 'CES'
  score: number
  comment?: string
  triggeredBy: EngagementPurpose
  respondedAt: string
  channel: EngagementChannel
}
