// ─── Lead / Opportunity ──────────────────────────────────────────────────────
export type OpportunityStage =
  | 'PROSPECT'
  | 'QUALIFIED'
  | 'QUOTATION'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'ON_HOLD'

export type LostReason =
  | 'PRICE_TOO_HIGH'
  | 'LOST_TO_COMPETITOR'
  | 'BUDGET_CUT'
  | 'TIMING_NOT_RIGHT'
  | 'PRODUCT_NOT_FIT'
  | 'NO_RESPONSE'
  | 'OTHER'

export interface Opportunity {
  opportunityId: string
  opportunityNo: string
  customerId?: string
  prospectName?: string
  stage: OpportunityStage
  source: 'INBOUND' | 'REFERRAL' | 'COLD_CALL' | 'EVENT' | 'PORTAL' | 'RENEWAL'
  vehicleType: string
  estimatedFleetSize: number
  estimatedValue: number
  estimatedCloseDate: string
  winProbability: number
  assignedSalesperson: string
  quotationId?: string
  contractId?: string
  lostReason?: LostReason
  lostNote?: string
  competitorLost?: string
  createdAt: string
  updatedAt: string
  closedAt?: string
}

// ─── Sales Activity ───────────────────────────────────────────────────────────
export type SalesActivityType =
  | 'CALL'
  | 'EMAIL'
  | 'MEETING'
  | 'DEMO'
  | 'SITE_VISIT'
  | 'PROPOSAL_SENT'
  | 'FOLLOW_UP'
  | 'NEGOTIATION_SESSION'
  | 'CONTRACT_SIGNING'

export interface SalesActivity {
  activityId: string
  opportunityId?: string
  customerId?: string
  type: SalesActivityType
  subject: string
  notes: string
  outcome: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  nextAction?: string
  nextActionDate?: string
  durationMinutes?: number
  salesperson: string
  createdAt: string
}

// ─── Sales Target ─────────────────────────────────────────────────────────────
export interface SalesTarget {
  targetId: string
  salespersonId: string
  period: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
  year: number
  month?: number
  quarter?: number
  targetRevenue: number
  targetContracts: number
  targetFleetSize: number
  targetNewCustomers: number
  bonusThreshold: number
}

// ─── Sales Performance / Actuals ─────────────────────────────────────────────
export interface SalesActual {
  salespersonId: string
  period: string
  actualRevenue: number
  actualContracts: number
  actualFleetSize: number
  newCustomers: number
  wonOpportunities: number
  lostOpportunities: number
  hitRate: number
  avgDealSize: number
  avgSalesCycle: number
  pipelineValue: number
}

// ─── Commission ───────────────────────────────────────────────────────────────
export type CustomerTier = 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE'

export interface CommissionRule {
  ruleId: string
  name: string
  productType: 'FINANCIAL_LEASE' | 'MAINTENANCE_LEASE' | 'FULL_SERVICE'
  tierCondition?: CustomerTier
  revenueFrom: number
  revenueTo?: number
  commissionRate: number
  bonusRate?: number
  effectiveFrom: string
  effectiveTo?: string
}

export interface CommissionRecord {
  commissionId: string
  salespersonId: string
  contractId: string
  contractValue: number
  commissionRate: number
  commissionAmount: number
  bonusAmount: number
  status: 'PENDING' | 'APPROVED' | 'PAID'
  paidDate?: string
  approvedBy?: string
}

// ─── Sales Forecast ───────────────────────────────────────────────────────────
export interface SalesForecast {
  salespersonId?: string
  forecastMonth: string
  openPipelineValue: number
  committedValue: number
  bestCaseValue: number
  targetRevenue: number
  lastMonthActual: number
}
