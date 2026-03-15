export interface HireGroup {
  id: string
  code: string                   // 'A' | 'B' | 'C' | 'D'
  description: string            // "Sedan >2000cc / Premium"
  exampleModels: string[]        // ['Toyota Camry', 'Honda Accord']
  // Rates — ระบบจะ ÷ termMonths เพื่อหา monthly
  repairsTotal: number           // 34,000  (สำหรับ term มาตรฐาน)
  repairsBaseTerm: number        // 60 (เดือน — term ที่ใช้อ้างอิง)
  servicingPerEvent: number      // ราคาต่อครั้ง
  servicingDefaultCount: number  // 7 ครั้ง (default)
  tyresPerSet: number            // ราคาต่อชุด
  tyresDefaultSets: number       // 2 ชุด (default)
  isActive: boolean
  updatedAt: string
}

export interface MaintenancePack {
  id: string
  code: string                   // 'PD14' | 'PD13' | 'BASIC'
  description: string
  includesRepairs: boolean
  includesServicing: boolean
  includesTyres: boolean
  includesRelief: boolean
  includesRoadside: boolean
  // Monthly labor costs (กรอกต่อเดือน)
  adminCostMonthly: number       // 140.00
  laborInsuranceMonthly: number  // 90.00
  laborMaintenanceMonthly: number // 200.00
  laborReliefMonthly: number     // 260.00
  laborProcurementMonthly: number // 40.00
  laborRoadsideMonthly: number   // 40.00
  isActive: boolean
  updatedAt: string
}

export interface InsuranceRate {
  id: string
  provider: string               // 'MTI' | 'AXA' | 'TOKIO'
  planCode: string               // 'MTI SEDAN STD'
  vehicleType: string            // 'SEDAN' | 'SUV' | 'PICKUP'
  insuranceGroup: number         // 1 | 2 | 3 | 4 | 5
  premiumPerPayment: number      // 3,521.60
  coverageType: string           // 'COMPREHENSIVE' | 'THIRD_PARTY'
  effectiveFrom: string
  effectiveTo?: string
  isActive: boolean
}

export interface BaseRate {
  id: string
  rate: number                   // 3.50 (%)
  effectiveFrom: string
  effectiveTo?: string           // null = ใช้อยู่
  note: string
  createdBy: string
}

export interface RVTableEntry {
  id: string
  vehicleCategory: string        // 'SEDAN' | 'SUV' | 'ECO_CAR'
  brandModel: string             // 'Toyota Camry' หรือ '*' = category default
  termMonths: number             // 24 | 36 | 48 | 60
  rvPercent: number              // 37.0
  rvSourceNote: string
  effectiveFrom: string
  isActive: boolean
}
