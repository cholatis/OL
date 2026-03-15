export type ContractStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'EXPIRED'
  | 'TERMINATED'

export interface MasterLeaseAgreement {
  id: string
  contractNo: string
  quotationId?: string
  quotationNo?: string

  // Parties
  lessorId: string
  lessorName: string
  lesseeId: string
  lesseeName: string
  lesseeTaxId: string
  lesseeAddress: string
  authorizedSignatory: string
  authorizedPosition: string

  // Dates
  contractDate: string
  commencementDate: string
  expiryDate: string
  noticePeriodDays: number

  // Core Terms
  contractTermMonths: number
  paymentFrequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
  paymentDueDay: number
  paymentProfileCode: string
  isVatRegistered: boolean
  calculationMode: 'WITH_VAT' | 'WITHOUT_VAT'

  // Fleet Credit Facility
  fleetCreditLimit: number
  fleetCreditUsed: number

  // Policies
  defaultEndOfTermOption: 'RETURN' | 'RENEW' | 'PURCHASE'
  earlyTerminationPolicy: string
  returnConditionPolicy: string

  // Finance Scheme
  baseRate: number
  margin: number
  totalRate: number

  // Services & Insurance
  defaultMaintenancePack: string
  defaultHireGroup: string
  insurancePolicy: string
  insuranceProvider: string

  // Approval Workflow
  status: ContractStatus
  submittedBy?: string
  submittedAt?: string
  approvedBy?: string
  approvedAt?: string
  rejectionReason?: string

  // Docs & Schedules
  documents: ContractDocument[]
  equipmentSchedules: string[]

  // Audit
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface ContractDocument {
  id: string
  type: 'MLA_SIGNED' | 'AMENDMENT' | 'BOARD_RESOLUTION' | 'OTHER'
  fileName: string
  version: string
  uploadedAt: string
  url?: string
}
