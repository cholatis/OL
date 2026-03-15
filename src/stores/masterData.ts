import { defineStore } from 'pinia'
import type { HireGroup, MaintenancePack, InsuranceRate, BaseRate, RVTableEntry } from '@/types/master-data'

export const useMasterDataStore = defineStore('masterData', {
  state: () => ({
    hireGroups: [
      {
        id: 'HG-A',
        code: 'A',
        description: 'City Car',
        exampleModels: ['Toyota Yaris', 'Honda City'],
        repairsTotal: 20000,
        repairsBaseTerm: 60,
        servicingPerEvent: 800,
        servicingDefaultCount: 7,
        tyresPerSet: 6000,
        tyresDefaultSets: 2,
        isActive: true,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'HG-B',
        code: 'B',
        description: 'Sedan <1500cc',
        exampleModels: ['Toyota Vios', 'Honda Jazz'],
        repairsTotal: 25000,
        repairsBaseTerm: 60,
        servicingPerEvent: 1200,
        servicingDefaultCount: 7,
        tyresPerSet: 8000,
        tyresDefaultSets: 2,
        isActive: true,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'HG-C',
        code: 'C',
        description: 'Sedan 1500-2000cc',
        exampleModels: ['Toyota Corolla Altis', 'Honda Civic'],
        repairsTotal: 30000,
        repairsBaseTerm: 60,
        servicingPerEvent: 1500,
        servicingDefaultCount: 7,
        tyresPerSet: 10000,
        tyresDefaultSets: 2,
        isActive: true,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'HG-D',
        code: 'D',
        description: 'Sedan >2000cc / Premium',
        exampleModels: ['Toyota Camry', 'Honda Accord'],
        repairsTotal: 34000,
        repairsBaseTerm: 60,
        servicingPerEvent: 2000,
        servicingDefaultCount: 7,
        tyresPerSet: 13000,
        tyresDefaultSets: 2,
        isActive: true,
        updatedAt: new Date().toISOString()
      }
    ] as HireGroup[],

    maintenancePacks: [
      {
        id: 'PK-PD13',
        code: 'PD13',
        description: 'Standard Maintenance Pack',
        includesRepairs: true,
        includesServicing: true,
        includesTyres: true,
        includesRelief: true,
        includesRoadside: true,
        adminCostMonthly: 100,
        laborInsuranceMonthly: 60,
        laborMaintenanceMonthly: 150,
        laborReliefMonthly: 200,
        laborProcurementMonthly: 30,
        laborRoadsideMonthly: 30,
        isActive: true,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'PK-PD14',
        code: 'PD14',
        description: 'Full Maintenance Pack (PD14)',
        includesRepairs: true,
        includesServicing: true,
        includesTyres: true,
        includesRelief: true,
        includesRoadside: true,
        adminCostMonthly: 140,
        laborInsuranceMonthly: 90,
        laborMaintenanceMonthly: 200,
        laborReliefMonthly: 260,
        laborProcurementMonthly: 40,
        laborRoadsideMonthly: 40,
        isActive: true,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'PK-BASIC',
        code: 'BASIC',
        description: 'Insurance Only',
        includesRepairs: false,
        includesServicing: false,
        includesTyres: false,
        includesRelief: false,
        includesRoadside: false,
        adminCostMonthly: 0,
        laborInsuranceMonthly: 0,
        laborMaintenanceMonthly: 0,
        laborReliefMonthly: 0,
        laborProcurementMonthly: 0,
        laborRoadsideMonthly: 0,
        isActive: true,
        updatedAt: new Date().toISOString()
      }
    ] as MaintenancePack[],

    insuranceRates: [
      { id: 'INS-001', provider: 'MTI', planCode: 'MTI SEDAN STD', vehicleType: 'SEDAN', insuranceGroup: 1, premiumPerPayment: 2200.00, coverageType: 'COMPREHENSIVE', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'INS-002', provider: 'MTI', planCode: 'MTI SEDAN STD', vehicleType: 'SEDAN', insuranceGroup: 2, premiumPerPayment: 3521.60, coverageType: 'COMPREHENSIVE', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'INS-003', provider: 'MTI', planCode: 'MTI SEDAN STD', vehicleType: 'SEDAN', insuranceGroup: 3, premiumPerPayment: 4200.00, coverageType: 'COMPREHENSIVE', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'INS-004', provider: 'MTI', planCode: 'MTI SEDAN STD', vehicleType: 'SEDAN', insuranceGroup: 4, premiumPerPayment: 5100.00, coverageType: 'COMPREHENSIVE', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'INS-005', provider: 'MTI', planCode: 'MTI SEDAN STD', vehicleType: 'SEDAN', insuranceGroup: 5, premiumPerPayment: 6800.00, coverageType: 'COMPREHENSIVE', effectiveFrom: '2026-01-01', isActive: true }
    ] as InsuranceRate[],

    baseRates: [
      { id: 'BR-001', rate: 3.50, effectiveFrom: '2026-01-01', note: 'Adjusted per BOT policy', createdBy: 'Admin' }
    ] as BaseRate[],

    rvTable: [
      { id: 'RV-001', vehicleCategory: 'SEDAN', brandModel: 'Toyota Camry', termMonths: 60, rvPercent: 37, rvSourceNote: 'Market standard', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'RV-002', vehicleCategory: 'SEDAN', brandModel: 'Toyota Camry', termMonths: 48, rvPercent: 40, rvSourceNote: 'Market standard', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'RV-003', vehicleCategory: 'SEDAN', brandModel: 'Toyota Camry', termMonths: 36, rvPercent: 45, rvSourceNote: 'Market standard', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'RV-004', vehicleCategory: 'SEDAN', brandModel: 'Toyota Camry', termMonths: 24, rvPercent: 52, rvSourceNote: 'Market standard', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'RV-DEF-60', vehicleCategory: 'SEDAN', brandModel: '*', termMonths: 60, rvPercent: 32, rvSourceNote: 'Category fallback', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'RV-DEF-48', vehicleCategory: 'SEDAN', brandModel: '*', termMonths: 48, rvPercent: 35, rvSourceNote: 'Category fallback', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'RV-DEF-36', vehicleCategory: 'SEDAN', brandModel: '*', termMonths: 36, rvPercent: 40, rvSourceNote: 'Category fallback', effectiveFrom: '2026-01-01', isActive: true },
      { id: 'RV-DEF-24', vehicleCategory: 'SEDAN', brandModel: '*', termMonths: 24, rvPercent: 48, rvSourceNote: 'Category fallback', effectiveFrom: '2026-01-01', isActive: true }
    ] as RVTableEntry[]
  }),

  getters: {
    // ดึง service rates ทั้งหมดตาม hire group + pack + term
    getServiceRates: (state) => (hireGroupCode: string, packCode: string, termMonths: number, servicingCount: number, tyresSets: number) => {
      const hg = state.hireGroups.find(h => h.code === hireGroupCode)
      const pk = state.maintenancePacks.find(p => p.code === packCode)
      
      if (!hg || !pk) return { repairsMonthly: 0, servicingMonthly: 0, tyresMonthly: 0, adminMonthly: 0, laborTotal: 0 }

      return {
        repairsMonthly: (hg.repairsTotal / hg.repairsBaseTerm),  // ÷ base term (ไม่ใช่ actual term) ตามสูตร
        servicingMonthly: (hg.servicingPerEvent * servicingCount) / termMonths,
        tyresMonthly: (hg.tyresPerSet * tyresSets) / termMonths,
        adminMonthly: pk.adminCostMonthly,
        laborTotal: pk.laborInsuranceMonthly + pk.laborMaintenanceMonthly
                    + pk.laborReliefMonthly + pk.laborProcurementMonthly
                    + pk.laborRoadsideMonthly,
      }
    },

    // ดึง insurance premium
    getInsurancePremium: (state) => (insuranceGroup: number, vehicleType: string, provider: string) => {
      return state.insuranceRates.find(r =>
        r.insuranceGroup === insuranceGroup &&
        r.vehicleType === vehicleType &&
        r.provider === provider &&
        r.isActive
      )?.premiumPerPayment ?? 0
    },

    // ดึง base rate ปัจจุบัน
    getCurrentBaseRate: (state) => () => {
      return state.baseRates.find(r => !r.effectiveTo)?.rate ?? 3.5
    },

    // ดึง RV % ตาม model + term (specific → category fallback)
    getRVPercent: (state) => (brandModel: string, termMonths: number) => {
      return state.rvTable.find(r =>
        r.brandModel === brandModel && r.termMonths === termMonths && r.isActive
      )?.rvPercent
      ?? state.rvTable.find(r =>
        r.brandModel === '*' && r.termMonths === termMonths && r.isActive
      )?.rvPercent
      ?? 35
    }
  },

  actions: {
    // CRUD and update methods would go here
  }
})
