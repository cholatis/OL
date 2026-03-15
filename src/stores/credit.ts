import { defineStore } from 'pinia'
import type { 
  KYCRequest, 
  DebtorSummary, 
  NCBRequest, 
  LegalCase, 
  CollectionActivity 
} from '@/types/credit'

export const useCreditStore = defineStore('credit', {
  state: () => ({
    kycRequests: [
      {
        id: 'KYC-2026-001',
        customerId: 'CUST-001',
        customerName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
        requestDate: '2026-03-01',
        status: 'IN_REVIEW',
        pdpaConsent: {
          consentDate: '2026-03-01',
          consentVersion: 'v1.2',
          consentBy: 'คุณสมชาย ใจดี',
          purposes: ['CREDIT_CHECK', 'NCB_INQUIRY', 'PRODUCT_OFFER'],
          expiryDate: '2029-03-01'
        },
        documents: [
          { docType: 'COMPANY_REG', fileName: 'reg_cert_2026.pdf', uploadDate: '2026-03-01', verified: true },
          { docType: 'FINANCIAL_STMT', fileName: 'finstmt_2025.pdf', uploadDate: '2026-03-01', verified: false }
        ],
        creditScore: {
          scoreDate: '2026-03-02',
          internalScore: 82,
          internalGrade: 'A',
          factors: [
            { factor: 'อายุกิจการ', score: 10, weight: 15, comment: 'มากกว่า 10 ปี' },
            { factor: 'D/E Ratio', score: 8, weight: 20, comment: '1.2x' }
          ],
          recommendedLimit: 10000000,
          recommendedTenor: 60
        },
        reviewedBy: 'Credit Analyst A'
      }
    ] as KYCRequest[],

    debtors: [
      {
        customerId: 'CUST-002',
        companyName: 'บริษัท เอเพ็กซ์ โลจิสติกส์ จำกัด',
        activeContracts: 3,
        totalOutstanding: 1250000,
        overdueAmount: 45000,
        overdueDays: 45,
        status: 'OVERDUE_31_60',
        lastPaymentDate: '2026-01-20',
        collectionStage: 'SOFT_CALL'
      },
      {
        customerId: 'CUST-005',
        companyName: 'บริษัท ไทย อินโนเวทีฟ รีเทล จำกัด',
        activeContracts: 1,
        totalOutstanding: 800000,
        overdueAmount: 800000,
        overdueDays: 120,
        status: 'NPL',
        lastPaymentDate: '2025-11-05',
        collectionStage: 'LEGAL'
      }
    ] as DebtorSummary[],

    collectionActivities: [
      {
        id: 'ACT-001',
        customerId: 'CUST-002',
        activityDate: '2026-03-10 10:00',
        activityType: 'PHONE_CALL',
        result: 'PROMISE_TO_PAY',
        promiseDate: '2026-03-15',
        promiseAmount: 45000,
        notes: 'Customer promised to transfer by end of week',
        createdBy: 'Collector A'
      }
    ] as CollectionActivity[],

    ncbRequests: [
      {
        id: 'NCB-2026-001',
        customerId: 'CUST-001',
        customerName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
        requestDate: '2026-03-01',
        requestType: 'NEW',
        consentRef: 'PDPA-REF-001',
        status: 'RECEIVED',
        result: {
          receivedDate: '2026-03-01',
          score: 750,
          creditHistory: [
            { financialInstitution: 'BBL', productType: 'OD', creditLimit: 5000000, outstanding: 2000000, overdueDays: 0, accountStatus: '010' }
          ],
          inquiryCount3Months: 2,
          flags: []
        }
      }
    ] as NCBRequest[],

    legalCases: [
      {
        id: 'CASE-2026-001',
        customerId: 'CUST-005',
        customerName: 'บริษัท ไทย อินโนเวทีฟ รีเทล จำกัด',
        contractId: 'MLA-004',
        contractNo: 'MLA-2024-045',
        currentStage: 'LEGAL_FILING',
        startDate: '2026-02-10',
        claimAmount: 850000,
        outstandingAtFiling: 780000,
        lawyer: 'บริษัท กฎหมาย ทองคำ จำกัด',
        hearingDates: [
          { date: '2026-04-10', purpose: 'ไกล่เกลี่ยครั้งที่ 1' }
        ],
        timeline: [
          { date: '2026-01-01', stage: 'DEMAND_LETTER', description: 'ส่ง Demand Letter โดยทนาย', attachments: [], createdBy: 'Legal Dept' },
          { date: '2026-02-10', stage: 'LEGAL_FILING', description: 'ยื่นฟ้องศาลแพ่งกรุงเทพใต้', attachments: [], createdBy: 'Lawyer A' }
        ]
      }
    ] as LegalCase[]
  }),

  actions: {
    getKYCById(id: string) {
      return this.kycRequests.find(k => k.id === id)
    },
    getDebtorById(customerId: string) {
      return this.debtors.find(d => d.customerId === customerId)
    },
    getCollectionActivities(customerId: string) {
      return this.collectionActivities.filter(a => a.customerId === customerId)
    },
    getLegalCasesByCustomer(customerId: string) {
      return this.legalCases.filter(c => c.customerId === customerId)
    },
    addCollectionActivity(activity: CollectionActivity) {
      this.collectionActivities.unshift(activity)
    },
    updateLegalStage(caseId: string, stage: LegalCase['currentStage'], description: string) {
      const c = this.legalCases.find(x => x.id === caseId)
      if (c) {
        c.currentStage = stage
        c.timeline.unshift({
          date: new Date().toISOString(),
          stage,
          description,
          attachments: [],
          createdBy: 'System'
        })
      }
    }
  }
})
