export interface EquipmentSchedule {
  id: string
  scheduleNo: string
  contractId: string
  contractNo: string
  lesseeId: string
  lesseeName: string

  // Dates
  scheduleDate: string
  commencementDate: string
  expiryDate: string
  termMonths: number

  // Assets
  items: ScheduleItem[]

  // Totals
  totalAssets: number
  financialRentalMonthly: number
  maintenanceRentalMonthly: number
  totalRentalExclVat: number
  totalRentalInclVat: number
  totalContractValue: number

  // End-of-Term
  defaultEndOfTermOption: 'RETURN' | 'RENEW' | 'PURCHASE'

  // Approval status
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  approvedBy?: string
  approvedAt?: string

  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ScheduleItem {
  id: string
  lineNo: number
  assetId?: string
  assetTag?: string
  serialNumber?: string
  assetModel: string
  assetBrand: string
  assetYear: number
  assetCondition: 'NEW' | 'USED'
  assetCategory: string

  // Pricing
  listPrice: number
  sellingPrice: number
  discount: number
  onRoadPrice: number
  netSellingPrice: number
  residualValueThb: number
  residualValuePct: number
  totalDepreciation: number

  // Rentals (Monthly)
  depreciationMonthly: number
  financeProfitMonthly: number
  insuranceMonthly: number
  financialRentalMonthly: number
  servicesMonthly: number
  maintenanceRentalMonthly: number
  totalRentalMonthly: number
  totalRentalInclVat: number

  // Services
  includeRepairs: boolean
  includeServicing: boolean
  servicingCount: number
  includeTyres: boolean
  tyresSets: number
  includeReliefVehicle: boolean
  includeRoadsideAssistance: boolean

  // Options
  endOfTermOption: 'RETURN' | 'RENEW' | 'PURCHASE'

  substitutions: AssetSubstitutionRef[]
}

export interface AssetSubstitutionRef {
  substitutionId: string
  date: string
  reason: string
  originalSerial: string
  replacementSerial: string
}
