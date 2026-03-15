import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { EquipmentSchedule, ScheduleItem } from '@/types/equipment-schedule'

export const useEquipmentScheduleStore = defineStore('equipmentSchedule', () => {
  const schedules = ref<EquipmentSchedule[]>([
    {
      id: 'SCH-001',
      scheduleNo: 'SCH-2024-00001',
      contractId: 'MLA-001',
      contractNo: 'MLA-2024-001',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      scheduleDate: '2024-01-01',
      commencementDate: '2024-01-01',
      expiryDate: '2027-01-01',
      termMonths: 36,
      items: [
        {
          id: 'ITEM-001',
          lineNo: 1,
          assetId: 'ASSET-001',
          assetModel: 'Toyota Hilux Revo',
          assetBrand: 'Toyota',
          assetYear: 2023,
          assetCondition: 'NEW',
          assetCategory: 'CAR',
          listPrice: 950000,
          sellingPrice: 900000,
          discount: 50000,
          onRoadPrice: 963000,
          netSellingPrice: 900000,
          residualValueThb: 450000,
          residualValuePct: 47.3,
          totalDepreciation: 450000,
          depreciationMonthly: 12500,
          financeProfitMonthly: 3000,
          insuranceMonthly: 1500,
          financialRentalMonthly: 17000,
          servicesMonthly: 5000,
          maintenanceRentalMonthly: 5350,
          totalRentalMonthly: 22000,
          totalRentalInclVat: 23540,
          includeRepairs: true,
          includeServicing: true,
          servicingCount: 6,
          includeTyres: true,
          tyresSets: 2,
          includeReliefVehicle: true,
          includeRoadsideAssistance: true,
          endOfTermOption: 'RETURN',
          substitutions: [],
        },
      ],
      totalAssets: 1,
      financialRentalMonthly: 17000,
      maintenanceRentalMonthly: 5350,
      totalRentalExclVat: 22000,
      totalRentalInclVat: 23540,
      totalContractValue: 847440,
      defaultEndOfTermOption: 'RETURN',
      status: 'ACTIVE',
      createdAt: '2024-01-01T08:00:00Z',
      updatedAt: '2024-01-01T08:00:00Z',
    },
    {
      id: 'SCH-002',
      scheduleNo: 'SCH-2024-00002',
      contractId: 'MLA-001',
      contractNo: 'MLA-2024-001',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      scheduleDate: '2024-02-01',
      commencementDate: '2024-02-01',
      expiryDate: '2027-02-01',
      termMonths: 36,
      items: [],
      totalAssets: 0,
      financialRentalMonthly: 0,
      maintenanceRentalMonthly: 0,
      totalRentalExclVat: 0,
      totalRentalInclVat: 0,
      totalContractValue: 0,
      defaultEndOfTermOption: 'RETURN',
      status: 'DRAFT',
      createdAt: '2024-02-01T10:00:00Z',
      updatedAt: '2024-02-01T10:00:00Z',
    },
  ])

  const selectedSchedule = ref<EquipmentSchedule | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchSchedules() {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    loading.value = false
  }

  async function fetchScheduleById(id: string) {
    loading.value = true
    const sch = schedules.value.find(s => s.id === id || s.scheduleNo === id)
    selectedSchedule.value = sch ? JSON.parse(JSON.stringify(sch)) : null
    loading.value = false
  }

  async function createSchedule(data: Partial<EquipmentSchedule>) {
    const newSch: EquipmentSchedule = {
      id: `SCH-NEW-${Date.now()}`,
      scheduleNo: `SCH-2024-${String(schedules.value.length + 1).padStart(5, '0')}`,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
      ...data,
    } as EquipmentSchedule
    schedules.value.unshift(newSch)
    return newSch
  }

  async function updateSchedule(id: string, data: Partial<EquipmentSchedule>) {
    const index = schedules.value.findIndex(s => s.id === id)
    if (index !== -1) {
      schedules.value[index] = { ...schedules.value[index], ...data, updatedAt: new Date().toISOString() }
    }
  }

  return {
    schedules,
    selectedSchedule,
    loading,
    error,
    fetchSchedules,
    fetchScheduleById,
    createSchedule,
    updateSchedule,
  }
})
