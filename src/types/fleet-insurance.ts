// ─── Insurance Policy ─────────────────────────────────────────
export type InsuranceClass = 'CLASS1' | 'CLASS2PLUS' | 'CLASS3PLUS' | 'CLASS2' | 'CLASS3'

export interface InsurancePolicy {
  id: string
  policyNo: string              // เลขที่กรมธรรม์
  assetId: string               // Asset ที่เอาประกัน
  chassisNo: string
  plateNo: string
  // บริษัทประกัน
  insuranceCompany: string
  agentCode?: string
  // ประเภท
  class: InsuranceClass
  // ความคุ้มครอง
  coverageStart: string
  coverageEnd: string           // วันหมดอายุ
  // เบี้ยประกัน
  premiumAmount: number         // เบี้ยสุทธิ
  stampDuty: number             // อากรแสตมป์
  vat: number                   // VAT 7%
  totalPremium: number
  // วงเงินคุ้มครอง
  coverageDetails: {
    ownDamage: number           // ค่าซ่อมตัวเอง
    thirdPartyBody: number      // บุคคลภายนอก ร่างกาย
    thirdPartyProperty: number  // บุคคลภายนอก ทรัพย์สิน
    fire: number                // ไฟไหม้
    theft: number               // ขโมย
    ownPersonalAccident?: number // PA ผู้ขับ
    deductible: number          // ส่วนที่ลูกค้าออกเอง
  }
  insuredName: string
  driverName?: string
  contractId: string
  lesseeId: string
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'RENEWED' | 'SUSPENDED'
  renewalStatus: 'ON_TIME' | 'DUE_SOON' | 'OVERDUE' | 'RENEWED'
  policyDocUrl?: string
}

// ─── พรบ (Compulsory Motor Insurance) ────────────────────────
export interface CompulsoryInsurance {
  id: string
  assetId: string
  plateNo: string
  chassisNo: string
  issueDate: string
  expiryDate: string
  insuredAmount: number
  premium: number
  insuranceCompany: string
  certificateNo: string
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING'
  renewalAlert: boolean
}

// ─── ภาษีรถยนต์ประจำปี (Road/Vehicle Tax) ────────────────────
export interface VehicleTax {
  id: string
  assetId: string
  plateNo: string
  chassisNo: string
  taxYear: number
  dueDate: string
  taxAmount: number
  lateFee?: number
  totalPaid: number
  paidDate?: string
  receiptNo?: string
  method: 'DLT_COUNTER' | 'ONLINE' | 'MOBILE_APP' | 'AGENT'
  status: 'PENDING' | 'PAID' | 'OVERDUE'
  renewalAlert: boolean
}

// ─── Accident Report ─────────────────────────────────────────
export type AccidentSeverity = 'MINOR' | 'MODERATE' | 'SEVERE' | 'TOTAL_LOSS'
export type AccidentFault = 'OWN' | 'THIRD_PARTY' | 'BOTH' | 'UNKNOWN'

export interface AccidentReport {
  id: string
  accidentNo: string
  reportDate: string
  accidentDate: string
  accidentTime: string
  assetId: string
  chassisNo: string
  plateNo: string
  driverName: string
  lesseeId: string
  lesseeContact: string
  location: string
  province: string
  description: string
  severity: AccidentSeverity
  fault: AccidentFault
  injuries: boolean
  injuredPersons?: string
  policeStationReported: boolean
  policeReportNo?: string
  policeOfficer?: string
  thirdPartyVehicle?: {
    plateNo: string
    owner: string
    insurance: string
    policyNo: string
    contact: string
    damage: string
  }
  photos: string[]
  estimatedRepairCost?: number
  actualRepairCost?: number
  isTotalLoss: boolean
  claimIds: string[]
  status: 'REPORTED' | 'UNDER_INVESTIGATION' | 'CLAIM_FILED' | 'REPAIRED' | 'SETTLED' | 'TOTAL_LOSS_PROCESS'
}

// ─── Insurance Claim ─────────────────────────────────────────
export type ClaimType = 'OWN_DAMAGE' | 'THIRD_PARTY_BODY' | 'THIRD_PARTY_PROPERTY' | 'THEFT' | 'FIRE'
export type ClaimStatus = 'DRAFT' | 'SUBMITTED' | 'SURVEY_SCHEDULED' | 'SURVEYED' | 'APPROVED' | 'REPAIR_IN_PROGRESS' | 'SETTLED' | 'REJECTED'

export interface InsuranceClaim {
  id: string
  claimNo: string
  accidentId: string
  policyId: string
  claimType: ClaimType
  claimDate: string
  surveyDate?: string
  surveyorName?: string
  surveyorCompany?: string
  approvedClaimAmount?: number
  deductible: number
  repairShop?: string
  repairStartDate?: string
  repairEndDate?: string
  repairInvoiceAmount?: number
  settlementAmount?: number
  settlementDate?: string
  workOrderId?: string
  status: ClaimStatus
  remarks: string
}

// ─── MA (Maintenance Agreement) ──────────────────────────────
export interface MaintenanceAgreement {
  id: string
  maNo: string
  vendorId: string
  vendorName: string
  serviceScope: {
    serviceTypes: string[]
    brands: string[]
    serviceArea: string[]
    maxRepairCostPerJob?: number
  }
  laborRate: number
  partsPriceType: 'DEALER_LIST' | 'DISCOUNT_PERCENT' | 'FIXED_CATALOG'
  partsDiscount?: number
  sla: {
    responseTimeHours: number
    repairTimeWorkingDays: number
    loaner: boolean
  }
  startDate: string
  endDate: string
  kpis?: {
    avgRepairDays: number
    onTimeRate: number
    customerSatisfaction: number
    totalJobs: number
    totalCost: number
  }
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED'
}
