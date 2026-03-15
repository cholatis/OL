// ประเภท Contract Event ทั้งหมด
export type ContractEventType =
  | 'RENEW'           // ต่อสัญญา (เงื่อนไขใหม่ + Rate ใหม่)
  | 'EXTEND'          // ขยายระยะเวลา (เงื่อนไขเดิม)
  | 'RESTRUCTURE'     // ปรับโครงสร้าง payment schedule (DR/TDR)
  | 'AMENDMENT'       // แก้ไขข้อกำหนดในสัญญา (เพิ่ม/ลด Asset, เปลี่ยน address)
  | 'TRANSFER'        // โอนสิทธิ์ให้ผู้เช่ารายใหม่
  | 'SUBLEASE'        // ให้เช่าช่วง (ต้องได้รับอนุมัติจาก Lessor)
  | 'SALE_LEASEBACK'  // ขายทรัพย์แล้วเช่ากลับ (Asset โอนมาจากลูกค้า)
  | 'EARLY_TERMINATION'  // ยกเลิกก่อนครบสัญญา (มีค่า ET)
  | 'SETTLEMENT'      // ปิดสัญญาปกติ (ครบกำหนด)
  | 'TOTAL_LOSS'      // สูญเสียทั้งหมด (ไฟไหม้/อุบัติเหตุร้ายแรง)
  | 'PARTIAL_LOSS'    // เสียหายบางส่วน (ประกันจ่ายบางส่วน)

export type ContractEventStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface Attachment {
  name: string
  url: string
  uploadedAt: string
}

export interface ApprovalStep {
  role: string
  approver: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  date?: string
  remarks?: string
}

export interface PaymentRow {
  period: number
  date: string
  amount: number
}

// Early Termination / Settlement
export interface ETDetails {
  terminationDate: string
  outstandingPrincipal: number   // เงินต้นคงเหลือ
  unearnedIncome: number         // ดอกเบี้ยที่ยังไม่รับรู้
  etFee: number                  // ค่า ET (กำหนดใน contract)
  etFeeRate: number              // % ของ outstanding
  insuranceRefund: number        // ประกันคืน
  securityDepositRefund: number  // เงินประกันคืน
  netPayable: number             // ยอดที่ลูกค้าต้องจ่าย/รับคืน
}

// Total Loss
export interface TotalLossDetails {
  incidentDate: string
  incidentType: 'FIRE' | 'FLOOD' | 'ACCIDENT' | 'THEFT' | 'OTHER'
  insuranceClaim: number         // วงเงินประกันที่เคลม
  insuranceDeductible: number    // ส่วนที่ลูกค้าออกเอง
  assetWriteOff: number          // มูลค่าที่ตัดออก
  replacementRequested: boolean  // ลูกค้าขอ Asset ทดแทน (→ ทำ Substitution)
  policeReportNo?: string
}

// Sale & Leaseback
export interface SaleLeasebackDetails {
  assetPurchasePrice: number     // ราคาที่ Lessor ซื้อจากลูกค้า
  leasebackTerm: number          // ระยะเวลาเช่ากลับ (เดือน)
  newMonthlyRental: number       // ค่าเช่าใหม่
  ownershipTransferDate: string  // วันโอนกรรมสิทธิ์
}

// Restructure (DR/TDR)
export interface RestructureDetails {
  restructureType: 'DR' | 'TDR'  // Debt Restructure / Troubled Debt Restructure
  originalSchedule: PaymentRow[]
  newSchedule: PaymentRow[]
  interestReduction?: number      // ลดดอกเบี้ย (TDR)
  principalReduction?: number     // ลดเงินต้น (TDR)
  extensionMonths?: number        // ขยายระยะเวลา
  approvalCommitteeDate?: string  // วันที่คณะกรรมการอนุมัติ (TDR ต้องผ่านคณะกรรมการ)
  tfrs9Impact: string             // ผลกระทบต่อ TFRS9 staging
}

export type EventDetails = ETDetails | TotalLossDetails | SaleLeasebackDetails | RestructureDetails | Record<string, unknown>

export interface ContractEvent {
  id: string
  contractId: string           // อ้างอิง MLA
  contractNo: string
  equipmentScheduleId?: string // อ้างอิง Equipment Schedule (ถ้าระบุเฉพาะ asset)
  eventType: ContractEventType
  eventDate: string            // วันที่มีผล
  requestDate: string            // วันที่ขอ
  requestedBy: string
  status: ContractEventStatus
  details: EventDetails
  attachments: Attachment[]
  approvalHistory: ApprovalStep[]
  remarks: string
}

// Down Payment / Initial Payment / Security Deposit
export interface ContractFinancials {
  id: string
  contractId: string
  contractNo: string
  // Down Payment
  downPaymentAmount: number      // เงินดาวน์ (ลด Financial Rental)
  downPaymentDate: string
  downPaymentStatus: 'PENDING' | 'RECEIVED'
  downPaymentMethod: 'CASH' | 'TRANSFER' | 'CHEQUE'
  // Security Deposit
  securityDepositAmount: number  // เงินประกัน (ไม่ใช่ค่าเช่า — คืนท้ายสัญญา)
  securityDepositDate: string
  securityDepositStatus: 'PENDING' | 'RECEIVED' | 'REFUNDED'
  securityDepositType: 'CASH' | 'GUARANTEE_LETTER' | 'POST_DATED_CHEQUE'
  // Initial Payment (ค่าเช่างวดแรก + ค่าใช้จ่ายแรกเข้า)
  initialPaymentAmount: number
  initialPaymentStatus: 'PENDING' | 'RECEIVED'
  initialPaymentItems: {
    description: string
    amount: number
  }[]
  // Payment Pattern
  paymentMethod: 'ADVANCE' | 'ARREAR'
  paymentPattern: 'STRAIGHT' | 'STEP_UP' | 'STEP_DOWN'
  stepPayments?: {
    fromMonth: number
    toMonth: number
    amount: number
  }[]
}
