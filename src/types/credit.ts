// ─── KYC & PDPA ───────────────────────────────────────────────
export type KYCRequestStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
export type PDPAPurpose =
  | 'CREDIT_CHECK'       // ตรวจสอบเครดิต
  | 'NCB_INQUIRY'        // ขอข้อมูล NCB
  | 'MARKETING'          // การตลาด
  | 'PRODUCT_OFFER'      // เสนอผลิตภัณฑ์
  | 'DATA_SHARING'       // แชร์ข้อมูลกับพันธมิตร

export type KYCDocumentType = 'COMPANY_REG' | 'FINANCIAL_STMT' | 'BANK_STMT' | 'TAX_CERT' | 'DIRECTOR_ID' | 'OTHER'

export interface KYCDocument {
  docType: KYCDocumentType
  fileName: string
  uploadDate: string
  verified: boolean
}

export interface CreditScoreFactor {
  factor: string              // เช่น "อายุกิจการ", "อัตราส่วนหนี้สิน"
  score: number
  weight: number
  comment: string
}

export interface CreditScore {
  scoreDate: string
  // Internal Scoring
  internalScore: number         // 0-100 internal model
  internalGrade: 'A' | 'B' | 'C' | 'D' | 'F'
  // scoring factors (แสดงเหตุผล)
  factors: CreditScoreFactor[]
  // NCB Score (ถ้ามี)
  ncbScore?: number
  ncbGrade?: string
  ncbInquiryDate?: string
  // Recommended Credit Limit
  recommendedLimit: number
  recommendedTenor: number      // เดือน
}

export interface KYCRequest {
  id: string
  customerId: string
  customerName?: string
  requestDate: string
  status: KYCRequestStatus
  // PDPA Consent (ต้องได้รับก่อนดำเนินการใดๆ)
  pdpaConsent: {
    consentDate: string
    consentVersion: string     // version ของ consent form
    consentBy: string          // ชื่อผู้ให้ consent (authorized person)
    purposes: PDPAPurpose[]    // วัตถุประสงค์ที่ได้รับ consent
    expiryDate: string         // วันหมดอายุ consent (default 3 ปี)
    withdrawnDate?: string     // ถ้าถอน consent
  }
  // เอกสาร KYC
  documents: KYCDocument[]
  // Credit Scoring
  creditScore: CreditScore
  // ผล
  approvedCreditLimit?: number
  rejectionReason?: string
  reviewedBy: string
  reviewedDate?: string
}

// ─── Debtor Management ────────────────────────────────────────
export type DebtorStatus = 'CURRENT' | 'OVERDUE_1_30' | 'OVERDUE_31_60' | 'OVERDUE_61_90' | 'NPL' | 'LEGAL'
export type CollectionStage = 'NORMAL' | 'SOFT_CALL' | 'HARD_CALL' | 'LEGAL' | 'SEIZE'
export type CollectionActivityType = 'PHONE_CALL' | 'SMS' | 'EMAIL' | 'VISIT' | 'LETTER' | 'LEGAL_NOTICE'
export type CollectionResult = 'CONTACTED' | 'NO_ANSWER' | 'PROMISE_TO_PAY' | 'DISPUTE' | 'UNABLE_TO_CONTACT'

export interface DebtorSummary {
  customerId: string
  companyName: string
  activeContracts: number
  totalOutstanding: number      // ยอดค้างชำระรวม
  overdueAmount: number         // ยอดเกินกำหนด
  overdueDays: number           // วันที่เกินกำหนดสูงสุด
  status: DebtorStatus
  lastPaymentDate?: string
  lastPaymentAmount?: number
  collectionStage: CollectionStage
}

export interface CollectionActivity {
  id: string
  customerId: string
  activityDate: string
  activityType: CollectionActivityType
  result: CollectionResult
  promiseDate?: string          // วันที่นัดชำระ
  promiseAmount?: number
  notes: string
  createdBy: string
}

// ─── NCB ──────────────────────────────────────────────────────
export type NCBRequestType = 'NEW' | 'RENEWAL' | 'MONITORING'
export type NCBStatus = 'PENDING' | 'SUBMITTED' | 'RECEIVED' | 'FAILED'

export interface NCBCreditLine {
  financialInstitution: string
  productType: string
  creditLimit: number
  outstanding: number
  overdueDays: number
  accountStatus: string
}

export interface NCBRequest {
  id: string
  customerId: string
  customerName?: string
  requestDate: string
  requestType: NCBRequestType
  consentRef: string            // อ้างอิง PDPA consent ID
  status: NCBStatus
  // NCB Result
  result?: {
    receivedDate: string
    score?: number
    creditHistory: NCBCreditLine[]
    inquiryCount3Months: number // จำนวนครั้งที่ถูก inquiry ใน 3 เดือน
    flags: string[]             // เช่น "NPA", "Write-off", "Restructured"
    rawReportFile?: string      // PDF attachment
  }
}

// ─── Legal & Seize ────────────────────────────────────────────
export type LegalStage =
  | 'WARNING_LETTER_1'    // หนังสือแจ้งเตือนครั้งที่ 1 (overdue 30 วัน)
  | 'WARNING_LETTER_2'    // หนังสือแจ้งเตือนครั้งที่ 2 (overdue 60 วัน)
  | 'DEMAND_LETTER'       // หนังสือทวงถาม (overdue 90 วัน)
  | 'LEGAL_FILING'        // ฟ้องคดี
  | 'COURT_PROCESS'       // อยู่ระหว่างพิจารณาคดี
  | 'JUDGMENT'            // ศาลมีคำพิพากษา
  | 'ENFORCEMENT'         // บังคับคดี / ยึดทรัพย์
  | 'ASSET_SEIZED'        // ยึดทรัพย์แล้ว
  | 'COMPLETED'           // ปิดคดี

export interface HearingDate {
  date: string
  purpose: string
  result?: string
}

export interface LegalEvent {
  date: string
  stage: LegalStage
  description: string
  attachments: string[]
  createdBy: string
}

export interface LegalCase {
  id: string
  customerId: string
  customerName?: string
  contractId: string
  contractNo?: string
  currentStage: LegalStage
  startDate: string
  claimAmount: number           // ยอดฟ้องรวม
  outstandingAtFiling: number   // ยอดค้างชำระ ณ วันฟ้อง
  courtCaseNo?: string          // เลขคดี
  court?: string                // ศาลที่ยื่นฟ้อง
  lawyer?: string               // ทนายความ / บริษัทกฎหมาย
  hearingDates: HearingDate[]
  seizedAssets?: string[]       // Asset IDs ที่ยึด
  timeline: LegalEvent[]
}
