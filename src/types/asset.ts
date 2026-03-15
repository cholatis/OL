export type AssetStatus = 'AVAILABLE' | 'RESERVED' | 'ACTIVE' | 'MAINTENANCE' | 'RETURNED' | 'DAMAGED' | 'DISPOSED'

export interface Asset {
  id: string
  assetCode: string              // Internal Code
  assetTag: string               // QR/RFID tag
  serialNumber: string           // Manufacturer SN
  model: string
  brand: string
  category: string               // CAR / WATER_PURIFIER / FREEZER / etc.
  year: number
  color?: string

  // Financial
  purchaseDate: string
  purchaseCost: number
  currentBookValue: number       // Calc ตาม depreciation
  residualValueThb: number       // มูลค่าตกค้างที่ประเมิน
  residualValuePct: number

  // Contract
  currentContractId?: string
  currentLesseeId?: string
  currentLesseeName?: string
  leaseStartDate?: string
  leaseEndDate?: string

  // Insurance & Warranty
  warrantyExpiry: string
  insurancePolicyNo: string
  insuranceExpiry: string
  insuranceProvider: string

  // Location
  currentSite: string
  currentAddress: string
  gpsLat?: number
  gpsLng?: number

  status: AssetStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface AssetSubstitution {
  id: string
  contractId: string
  contractNo: string
  originalAssetId: string
  originalAssetSerial: string
  replacementAssetId: string
  replacementAssetSerial: string
  substitutionDate: string
  reason: 'DAMAGED' | 'LOST' | 'STOLEN' | 'UPGRADE'
  damageReportRef?: string
  insuranceClaimRef?: string
  approvedBy: string
  status: 'PENDING' | 'APPROVED' | 'COMPLETED'
  remark?: string
  createdAt: string
}
