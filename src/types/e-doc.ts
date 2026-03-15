// ─── E-Tax Invoice ────────────────────────────────────────────
export type ETaxInvoiceType =
  | 'TAX_INVOICE'          // ใบกำกับภาษี
  | 'DEBIT_NOTE'           // ใบเพิ่มหนี้
  | 'CREDIT_NOTE'          // ใบลดหนี้
  | 'RECEIPT_TAX_INVOICE'  // ใบเสร็จรับเงิน/ใบกำกับภาษี

export type ETaxInvoiceStatus =
  | 'DRAFT'
  | 'SIGNED'           // มี Digital Signature
  | 'SUBMITTED_RD'     // ส่ง RD แล้ว
  | 'ACCEPTED_RD'      // RD ยืนยันรับ
  | 'REJECTED_RD'      // RD ปฏิเสธ
  | 'CANCELLED'        // ยกเลิก (ออก Credit Note แทน)

export interface ETaxInvoice {
  id: string
  invoiceNo: string            // เลขที่ใบกำกับภาษี
  invoiceType: ETaxInvoiceType
  invoiceDate: string
  // Seller (เรา — Lessor)
  sellerTaxId: string
  sellerName: string
  sellerAddress: string
  sellerBranchNo: string
  // Buyer (ลูกค้า — Lessee)
  buyerTaxId: string
  buyerName: string
  buyerAddress: string
  buyerBranchNo: string
  // รายการ
  lines: ETaxInvoiceLine[]
  // ภาษี
  subtotal: number
  vatRate: number              // 7%
  vatAmount: number
  total: number
  // อ้างอิง
  sourceInvoiceId: string
  signatureStatus: 'UNSIGNED' | 'SIGNED' | 'VERIFIED'
  signedAt?: string
  rdSubmissionId?: string
  rdSubmittedAt?: string
  status: ETaxInvoiceStatus
}

export interface ETaxInvoiceLine {
  lineNo: number
  description: string
  quantity: number
  unitPrice: number
  amount: number
  vatType: 'STANDARD' | 'ZERO_RATE' | 'EXEMPT'
}

// ─── E-WHT (ภาษีหัก ณ ที่จ่าย) ───────────────────────────────
export type WHTType = 'PND1' | 'PND3' | 'PND53'

export interface WHTCertificate {
  id: string
  certNo: string
  whtType: WHTType
  issueDate: string
  payerTaxId: string
  payerName: string
  payeeTaxId: string
  payeeName: string
  payeeAddress: string
  lines: WHTLine[]
  totalIncome: number
  totalWHT: number
  apInvoiceId: string
  filingRef?: string
  status: 'DRAFT' | 'ISSUED' | 'FILED' | 'CANCELLED'
}

export interface WHTLine {
  incomeType: string
  incomeTypeCode: string
  incomeAmount: number
  whtRate: number
  whtAmount: number
}

// ─── E-Payment ───────────────────────────────────────────────
export type EPaymentMethod = 'PROMPTPAY' | 'DIRECT_DEBIT' | 'BAHTNET' | 'ORFT'

export interface EPaymentBatch {
  id: string
  batchNo: string
  paymentDate: string
  paymentMethod: EPaymentMethod
  totalAmount: number
  status: 'PENDING' | 'SUBMITTED' | 'CONFIRMED' | 'FAILED' | 'PARTIAL'
  items: EPaymentItem[]
}

export interface EPaymentItem {
  id: string
  type: 'AR_COLLECTION' | 'AP_PAYMENT'
  refId: string
  receiverName: string
  amount: number
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
}

// ─── E-Stamp ─────────────────────────────────────────────────
export interface EStampRecord {
  id: string
  stampNo: string
  contractId: string
  contractType: string
  stampDate: string
  contractValue: number
  stampDuty: number
  status: 'PENDING' | 'PAID' | 'CANCELLED'
}

// ─── E-Filing ────────────────────────────────────────────────
export type FilingFormType = 'PP30' | 'PP36' | 'PND1' | 'PND3' | 'PND53' | 'PND50' | 'PND51'

export interface TaxFiling {
  id: string
  formType: FilingFormType
  taxPeriod: string
  dueDate: string
  taxableAmount: number
  taxAmount: number
  status: 'DRAFT' | 'PREPARED' | 'FILED' | 'PAID' | 'OVERDUE'
  rdRefNo?: string
}
