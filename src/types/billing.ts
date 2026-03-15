export interface LeaseScheduleItem {
  id: string
  contractId: string
  contractNo: string
  lesseeId: string
  lesseeName: string
  installmentNo: number
  dueDate: string
  // Financial Rental
  depreciationAmount: number
  financeMaintenanceAmount: number
  financeProfitAmount: number
  insuranceAmount: number
  financialRentalExclVat: number
  // Maintenance Rental
  servicesAmount: number
  maintenanceRentalExclVat: number
  // Total
  totalExclVat: number
  vatAmount: number
  totalInclVat: number
  // Status
  status: 'PENDING' | 'INVOICED' | 'PAID' | 'OVERDUE' | 'PARTIAL'
  invoiceId?: string
  paidDate?: string
  paidAmount?: number
  // IFRS 16 columns
  rouAssetBalance: number
  leaseLiabilityBalance: number
  interestExpense: number
}

export interface Invoice {
  id: string
  invoiceNo: string
  invoiceType: 'FINANCIAL' | 'MAINTENANCE' | 'COMBINED'
  contractId: string
  contractNo: string
  lesseeId: string
  lesseeName: string
  lesseeTaxId: string
  lesseeAddress: string
  invoiceDate: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  vatAmount: number
  totalAmount: number
  withholdingTax: number
  netPayable: number
  status: 'DRAFT' | 'ISSUED' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'
  paidDate?: string
  paidAmount?: number
  paymentMethod?: string
  notes?: string
  createdAt: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  amount: number
  vatRate: number
}
