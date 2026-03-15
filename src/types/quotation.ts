export interface Quotation {
  id: string
  quotationNo: string              // Auto-gen เช่น QT-2026-00001
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CONVERTED'
  customerId: string
  customerName: string
  contactName: string
  quotationDate: string
  validUntil: string

  // Section A: Asset
  assetModelId: string
  assetModel: string               // ชื่อรถ/สินค้า
  assetYear: number
  assetCondition: 'NEW' | 'USED'
  assetCategory: 'CAR' | 'COMMERCIAL' | 'EQUIPMENT'
  insuranceGroup: number           // 1-5

  // Section B: Pricing
  listPrice: number                // Vehicle Basic (Original)
  sellingPrice: number             // Vehicle Basic (Current)
  discount: number
  preVatPrice: number              // Calc
  vatAmount: number                // Calc
  registrationFee: number
  rstServiceFee: number
  onRoadPrice: number              // Calc = preVat + vat + regFee + rst
  reclaimedVat: number             // Calc ถ้า isVatRegistered
  netSellingPrice: number          // Calc = onRoad - reclaimedVat
  otdPrice: number                 // On The Door price
  isVatRegistered: boolean         // Y/N

  // Section C: Contract Parameters
  contractTermMonths: number       // 12/24/36/48/60
  annualMileageKm: number
  totalContractMileageKm: number   // Calc
  paymentsInAdvance: number
  downPayment: number
  securityDeposit: number
  paymentFrequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
  paymentProfileCode: string       // T00, T01 etc.

  // Section D: Services Package
  maintenancePackCode: string      // PD14, PD13 etc.
  hireGroup: string                // A/B/C/D
  includeRepairs: boolean
  includeServicing: boolean
  servicingCount: number
  includeTyres: boolean
  tyresSets: number
  includeReliefVehicle: boolean
  includeRoadsideAssistance: boolean
  services: QuotationService[]     // Calc จาก selections

  // Section E: Finance + RV
  baseRate: number                 // 3.5% ดึงจาก master
  margin: number                   // กรอกเอง 4%
  totalRate: number                // Calc = base + margin
  residualValueThb: number         // Input หรือดึงจาก RV Table
  residualValuePct: number         // Calc = RV / OTD * 100
  rvWithVat: number                // Calc
  rvNetVat: number                 // Calc = RV / 1.07
  calculationMode: 'WITH_VAT' | 'WITHOUT_VAT'
  insurancePremium: number         // เบี้ยประกันภัยต่อปี

  // Section F: Output (Calc ทั้งหมด)
  totalDepreciation: number
  financeMaintenance: number
  financeProfit: number
  financialRentalMonthly: number
  maintenanceRentalMonthly: number
  totalRentalExclVat: number
  vatOnRental: number
  totalRentalInclVat: number
  totalContractValue: number

  createdAt: string
  updatedAt: string
}

export interface QuotationService {
  serviceType: string
  monthlyAmount: number
  totalAmount: number
  dbTotal: number
}
