// ─── Chart of Accounts ────────────────────────────────────────
export type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE'
export type AccountNature = 'DR' | 'CR'

export interface ChartOfAccount {
  code: string
  name: string
  nameEn?: string
  type: AccountType
  nature: AccountNature
  parentCode?: string
  level: number
  active: boolean
  isSystemAccount: boolean
}

// ─── Journal Entry ────────────────────────────────────────────
export type JournalSource =
  | 'INVOICE'
  | 'RECEIPT'
  | 'AP_INVOICE'
  | 'AP_PAYMENT'
  | 'DEPRECIATION'
  | 'EIR_AMORTIZE'
  | 'ECL_PROVISION'
  | 'MANUAL'

export interface JournalEntry {
  id: string
  entryNo: string
  date: string
  source: JournalSource
  sourceRefId?: string
  description: string
  lines: JournalLine[]
  status: 'DRAFT' | 'POSTED' | 'REVERSED'
  reversalEntryId?: string
  postedBy?: string
  postedDate?: string
  period: string
}

export interface JournalLine {
  lineNo: number
  accountCode: string
  accountName: string
  description: string
  dr: number
  cr: number
  costCenter?: string
  contractId?: string
  customerId?: string
}

// ─── AR Receipt ───────────────────────────────────────────────
export type PaymentMethod = 'CASH' | 'TRANSFER' | 'CHEQUE' | 'DIRECT_DEBIT' | 'PROMPTPAY' | 'CREDIT_CARD'

export interface Receipt {
  id: string
  receiptNo: string
  receiptDate: string
  customerId: string
  appliedInvoices: AppliedInvoice[]
  totalReceived: number
  paymentMethod: PaymentMethod
  bankAccount?: string
  chequeNo?: string
  chequeDate?: string
  referenceNo?: string
  whtTotal: number
  whtCertNo?: string
  status: 'DRAFT' | 'CONFIRMED' | 'BOUNCED' | 'CANCELLED'
  journalEntryId?: string
}

export interface AppliedInvoice {
  invoiceId: string
  invoiceNo: string
  invoiceAmount: number
  paidAmount: number
  discount?: number
  whtDeducted?: number
}

// ─── Statement of Account ────────────────────────────────────
export interface SOALine {
  date: string
  refNo: string
  description: string
  invoiceAmount: number
  paidAmount: number
  balance: number
  daysOverdue: number
}

// ─── Bank Reconciliation ─────────────────────────────────────
export interface BankReconItem {
  id: string
  date: string
  bankRef: string
  bankAmount: number
  matchedReceiptId?: string
  status: 'UNMATCHED' | 'MATCHED' | 'PARTIAL' | 'EXCEPTION'
  notes?: string
}

// ─── AP ──────────────────────────────────────────────────────
export interface APInvoice {
  id: string
  apInvoiceNo: string
  vendorId: string
  vendorName: string
  vendorTaxId: string
  invoiceDate: string
  dueDate: string
  lines: APLine[]
  subtotal: number
  vatAmount: number
  whtAmount: number
  netPayable: number
  workOrderId?: string
  contractId?: string
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'PARTIAL' | 'CANCELLED'
}

export interface APLine {
  description: string
  amount: number
  whtRate: number
  whtAmount: number
  accountCode: string
}
