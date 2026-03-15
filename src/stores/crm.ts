import { defineStore } from 'pinia'
import type { 
  CustomerProfile, CustomerInteraction, 
  EngagementMessage, MessageTemplate,
  SurveyResponse, CustomerPortalAccess
} from '@/types/crm'

export const useCRMStore = defineStore('crm', {
  state: () => ({
    customers: [
      {
        customerId: 'cust-001',
        companyName: 'Global Tech Solutions Co., Ltd.',
        taxId: '0105560001234',
        tier: 'PLATINUM',
        fleetSize: 125,
        totalContractValue: 45000000,
        totalContracts: 15,
        activeContracts: 12,
        overdueAmount: 0,
        lastActivityDate: '2024-03-12',
        assignedSalesperson: 'Somsak P.',
        tags: ['Key Account', 'Tech Sector', 'Renewal Pending'],
        segment: {
          tier: 'PLATINUM',
          fleetCategory: 'LARGE',
          renewalLikelihood: 'HIGH',
          engagementScore: 92,
          churnRisk: 'LOW'
        },
        contactPersons: [
          {
            contactId: 'cp-1',
            customerId: 'cust-001',
            name: 'Wichai Manee',
            position: 'Procurement Manager',
            department: 'Operations',
            phone: '081-222-3333',
            email: 'wichai@globaltech.co.th',
            isPrimary: true,
            roles: ['CONTRACT', 'FLEET'],
            preferredChannel: 'EMAIL'
          },
          {
            contactId: 'cp-2',
            customerId: 'cust-001',
            name: 'Sunee Luck',
            position: 'CFO',
            department: 'Finance',
            phone: '081-444-5555',
            email: 'sunee@globaltech.co.th',
            isPrimary: false,
            roles: ['BILLING', 'EXECUTIVE'],
            preferredChannel: 'PHONE'
          }
        ],
        pdpaConsent: {
          customerId: 'cust-001',
          consentVersion: 'v2.1',
          consentDate: '2023-01-15',
          consentChannels: ['MARKETING', 'NOTIFICATION', 'ANALYTICS'],
          withdrawnChannels: [],
          lastUpdated: '2023-01-15'
        }
      }
    ] as CustomerProfile[],

    interactions: [
      {
        interactionId: 'int-1',
        customerId: 'cust-001',
        type: 'MEETING',
        subject: 'QBR & Fleet Expansion Discussion',
        notes: 'Discussed adding 20 more EVs to their fleet by Q3.',
        outcome: 'Follow-up with quotation',
        nextAction: 'Prepare EV Quotation',
        nextActionDate: '2024-03-20',
        createdBy: 'Somsak P.',
        createdAt: '2024-03-10T10:00:00Z'
      }
    ] as CustomerInteraction[],

    engagementMessages: [
      {
        messageId: 'msg-1',
        channel: 'LINE_OA',
        purpose: 'CONTRACT_RENEWAL_REMINDER',
        templateId: 'tpl-1',
        templateName: 'Renewal Notification',
        recipients: ['cp-1'],
        totalSent: 1,
        totalDelivered: 1,
        totalOpened: 1,
        sentAt: '2024-03-01T09:00:00Z',
        status: 'SENT'
      }
    ] as EngagementMessage[],

    templates: [
      {
        templateId: 'tpl-1',
        channel: 'EMAIL',
        purpose: 'CONTRACT_RENEWAL_REMINDER',
        name: 'Standard Renewal Reminder',
        subject: 'Your Lease Contract is expiring soon',
        body: 'Dear {{customerName}}, your contract {{contractNo}} will expire on {{dueDate}}...',
        language: 'TH',
        isActive: true
      }
    ] as MessageTemplate[],

    surveyResponses: [
      {
        surveyId: 'srv-1',
        customerId: 'cust-001',
        surveyType: 'NPS',
        score: 10,
        comment: 'Excellent service and proactive fleet maintenance.',
        triggeredBy: 'CONTRACT_RENEWAL_REMINDER',
        respondedAt: '2024-03-05T14:30:00Z',
        channel: 'EMAIL'
      }
    ] as SurveyResponse[],

    portalAccess: [
      {
        portalUserId: 'puser-1',
        customerId: 'cust-001',
        contactPersonId: 'cp-1',
        email: 'wichai@globaltech.co.th',
        lastLogin: '2024-03-13T08:15:00Z',
        isActive: true,
        permissions: ['VIEW_CONTRACT', 'VIEW_INVOICE', 'DOWNLOAD_DOCS']
      }
    ] as CustomerPortalAccess[]
  }),

  getters: {
    getCustomerById: (state) => (id: string) => state.customers.find(c => c.customerId === id),
    getInteractionsByCustomer: (state) => (id: string) => state.interactions.filter(i => i.customerId === id),
    getEngagementByCustomer: (state) => (id: string) => state.engagementMessages.filter(m => m.recipients.some(r => {
      const customer = state.customers.find(c => c.customerId === id)
      return customer?.contactPersons.some(cp => cp.contactId === r)
    })),
    npsScore: (state) => {
      const responses = state.surveyResponses.filter(s => s.surveyType === 'NPS')
      if (responses.length === 0) return 0
      const promoters = responses.filter(r => r.score >= 9).length
      const detractors = responses.filter(r => r.score <= 6).length
      return ((promoters - detractors) / responses.length) * 100
    }
  },

  actions: {
    addInteraction(interaction: CustomerInteraction) {
      this.interactions.unshift(interaction)
    }
  }
})
