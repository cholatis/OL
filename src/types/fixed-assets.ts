export type FAStatus = 'ACTIVE' | 'FULLY_DEPRECIATED' | 'DISPOSED' | 'IMPAIRED' | 'UNDER_MAINTENANCE'
export type DepreciationMethod = 'STRAIGHT_LINE' | 'DECLINING_BALANCE' | 'UNITS_OF_PRODUCTION'
export type FACategory =
  | 'VEHICLE_PASSENGER'   // รถยนต์นั่ง (เสื่อมราคา 5 ปี)
  | 'VEHICLE_COMMERCIAL'  // รถบรรทุก (เสื่อมราคา 5 ปี)
  | 'MACHINERY'           // เครื่องจักร
  | 'EQUIPMENT'           // อุปกรณ์สำนักงาน
  | 'IT_EQUIPMENT'        // อุปกรณ์ IT

export interface FixedAsset {
  id: string
  assetCode: string           // FA-2024-0001
  assetManagementId: string   // link to Asset Management (SN)
  assetName: string
  category: FACategory
  acquisitionDate: string
  acquisitionCost: number
  residualValue: number       // Scrap Value
  usefulLifeYears: number
  depreciationMethod: DepreciationMethod
  depreciationRate: number    // % per year
  accountCode: string         // 1210 Assets on Lease
  accumDeprAccount: string    // 1211 Accumulated Depreciation
  deprExpenseAccount: string  // 5101 Depreciation Expense
  status: FAStatus
  currentLeaseContractId?: string
  currentLesseeName?: string
  leaseStartDate?: string
  leaseEndDate?: string
  accumulatedDepreciation: number
  netBookValue: number
  revaluedAmount?: number
  revaluationDate?: string
  revaluationSurplus?: number
}

export interface DepreciationScheduleRow {
  period: string              // "2024-01"
  date: string
  openingNBV: number
  depreciationExpense: number
  accumulatedDepreciation: number
  closingNBV: number
}

export interface FADisposal {
  id: string
  assetId: string
  disposalDate: string
  disposalType: 'SALE' | 'WRITE_OFF' | 'TRANSFER' | 'TOTAL_LOSS'
  saleProceeds?: number
  nbvAtDisposal: number
  gainLossOnDisposal: number
  journalEntryId?: string
  approvedBy: string
  remarks: string
}

export interface FARevaluation {
  id: string
  assetId: string
  revaluationDate: string
  previousNBV: number
  newFairValue: number
  increase: number
}
