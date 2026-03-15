// ─── TFRS 16 ──────────────────────────────────────────────────
// (Lessee Perspective — ผู้เช่าต้องรับรู้ ROU Asset + Lease Liability)
export interface TFRS16Schedule {
  contractId: string
  commencementDate: string
  leaseTerm: number              // เดือน
  discountRate: number           // Incremental Borrowing Rate (IBR) %
  // Opening
  rightOfUseAsset: number        // มูลค่า ROU Asset เริ่มต้น (= PV ของ lease payments)
  leaseLiability: number         // Lease Liability เริ่มต้น (= PV ของ lease payments)
  // Amortization
  rouAmortizationMethod: 'STRAIGHT_LINE' | 'DECLINING'
  rows: TFRS16Row[]
}

export interface TFRS16Row {
  period: number                 // งวดที่
  date: string
  openingLeaseLiability: number
  leasePayment: number           // ค่าเช่าจริง
  interestExpense: number        // ดอกเบี้ย = Opening × IBR/12
  principalRepayment: number     // ชำระต้น = leasePayment - interestExpense
  closingLeaseLiability: number
  rouDepreciation: number        // ค่าเสื่อม ROU Asset
  closingRouAsset: number
}

// ─── TFRS9 ────────────────────────────────────────────────────
export type TFRS9Stage = 'STAGE1' | 'STAGE2' | 'STAGE3'

export interface TFRS9Assessment {
  contractId: string
  customerName: string
  assessmentDate: string
  currentStage: TFRS9Stage
  previousStage?: TFRS9Stage
  // Stage criteria
  stagingCriteria: {
    dpd: number                  // Days Past Due
    significantCreditDegradation: boolean  // SICR
    inDefault: boolean
    legalStatus: boolean
  }
  // ECL Calculation
  ecl: {
    pd: number                   // Probability of Default %
    lgd: number                  // Loss Given Default %
    ead: number                  // Exposure at Default (outstanding)
    ecl12Month: number           // Stage 1: 12-month ECL
    eclLifetime: number          // Stage 2/3: Lifetime ECL
    provision: number            // เงินสำรองที่ต้องตั้ง
  }
  stageHistory: { date: string; stage: TFRS9Stage; reason: string }[]
}

// ─── Rate Calculations ────────────────────────────────────────
export interface RateCalculation {
  calculationType: 'YIELD' | 'IRR' | 'EIR' | 'FLAT_TO_EFFECTIVE'
  // Input
  principal: number
  totalInterest: number
  term: number                   // เดือน
  paymentSchedule?: PaymentCashflow[]
  rateType: 'FIXED' | 'FLOATING'
  // Floating Rate
  floatingBase?: 'THBFIX' | 'SOFR' | 'MLR' | 'MOR' | 'MRR'
  spread?: number                // THBFIX + Spread%
  // Output
  flatRate?: number
  yieldRate?: number             // Nominal Yield
  irr?: number                   // Internal Rate of Return (monthly compounding)
  eir?: number                   // Effective Interest Rate (TFRS9/IFRS 9 amortized cost)
}

export interface PaymentCashflow {
  period: number
  date: string
  cashflow: number               // ลบ=รับ, บวก=จ่าย (จากมุมมอง Lessor)
}

// ─── Residual Value Management ───────────────────────────────
export interface ResidualValueRecord {
  contractId: string
  assetId: string
  assetName: string
  originalRV: number             // RV ณ วันทำสัญญา
  originalRVRate: number         // % ของราคาทุน
  currentBookValue: number       // NBV ปัจจุบัน
  marketValue?: number           // ราคาตลาดปัจจุบัน (ประเมินโดย Remarketing)
  rvAdjustments: RVAdjustment[]  // ถ้ามีการ adjust RV ระหว่างทาง
  endOfLeaseAction?: 'RETURN' | 'PURCHASE' | 'RENEW'
  actualSalePrice?: number       // ราคาขายจริง (ถ้า PURCHASE/Remarketing)
  rvGainLoss?: number            // กำไร/ขาดทุนเมื่อเทียบกับ original RV
  expiryDate: string
}

export interface RVAdjustment {
  date: string
  adjustedRV: number
  reason: string
  approvedBy: string
}

// ─── User Defined Fields (UDF) ───────────────────────────────
export type UDFEntity = 'CONTRACT' | 'CUSTOMER' | 'ASSET' | 'INVOICE' | 'QUOTATION'
export type UDFFieldType = 'TEXT' | 'NUMBER' | 'DATE' | 'DROPDOWN' | 'CHECKBOX' | 'TEXTAREA'

export interface UDFDefinition {
  id: string
  entity: UDFEntity
  fieldCode: string              // เช่น "CUSTOM_001"
  fieldLabel: string             // ชื่อที่แสดง
  fieldType: UDFFieldType
  required: boolean
  dropdownOptions?: string[]     // สำหรับ DROPDOWN
  displayOrder: number
  active: boolean
  createdBy: string
}
