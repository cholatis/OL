import { defineStore } from 'pinia'
import type { Asset, AssetSubstitution } from '@/types/asset'

export const useAssetStore = defineStore('asset', () => {
  const assets = ref<Asset[]>([
    {
      id: 'AST-001',
      assetCode: 'OL-VEH-001',
      assetTag: 'QR-88291',
      serialNumber: 'VIN-9920399482',
      model: 'Hilux Revo',
      brand: 'Toyota',
      category: 'CAR',
      year: 2023,
      color: 'White',
      purchaseDate: '2023-01-15',
      purchaseCost: 650000,
      currentBookValue: 580000,
      residualValueThb: 220000,
      residualValuePct: 33.8,
      currentContractId: 'CON-1001',
      currentLesseeId: 'CUST-001',
      currentLesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      leaseStartDate: '2024-01-01',
      leaseEndDate: '2027-12-31',
      warrantyExpiry: '2026-01-15',
      insurancePolicyNo: 'INS-99203',
      insuranceExpiry: '2025-01-15',
      insuranceProvider: 'Viriyah Insurance',
      currentSite: 'Main Office',
      currentAddress: 'Bangkok, Thailand',
      status: 'ACTIVE',
      createdAt: '2023-01-15T08:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z',
    },
    {
      id: 'AST-002',
      assetCode: 'OL-VEH-002',
      assetTag: 'QR-88292',
      serialNumber: 'VIN-1120399482',
      model: 'D-Max Spark',
      brand: 'Isuzu',
      category: 'CAR',
      year: 2023,
      color: 'Silver',
      purchaseDate: '2023-05-20',
      purchaseCost: 580000,
      currentBookValue: 540000,
      residualValueThb: 180000,
      residualValuePct: 31.0,
      status: 'AVAILABLE',
      warrantyExpiry: '2026-05-20',
      insurancePolicyNo: 'INS-11204',
      insuranceExpiry: '2025-05-20',
      insuranceProvider: 'Bangkok Insurance',
      currentSite: 'Warehouse A',
      currentAddress: 'Samut Prakan, Thailand',
      createdAt: '2023-05-20T09:00:00Z',
      updatedAt: '2023-05-20T09:00:00Z',
    },
    {
      id: 'AST-003',
      assetCode: 'OL-VEH-003',
      assetTag: 'QR-88293',
      serialNumber: 'VIN-5520399482',
      model: 'Hilux Revo',
      brand: 'Toyota',
      category: 'CAR',
      year: 2023,
      color: 'Black',
      purchaseDate: '2023-02-10',
      purchaseCost: 650000,
      currentBookValue: 590000,
      residualValueThb: 220000,
      residualValuePct: 33.8,
      status: 'MAINTENANCE',
      warrantyExpiry: '2026-02-10',
      insurancePolicyNo: 'INS-55205',
      insuranceExpiry: '2025-02-10',
      insuranceProvider: 'Viriyah Insurance',
      currentSite: 'Toyota Service Center',
      currentAddress: 'Bangkok, Thailand',
      createdAt: '2023-02-10T11:00:00Z',
      updatedAt: '2024-03-05T09:00:00Z',
    },
    {
      id: 'AST-004',
      assetCode: 'OL-VEH-004',
      assetTag: 'QR-88294',
      serialNumber: 'VIN-7720399482',
      model: 'Isuzu Elf',
      brand: 'Isuzu',
      category: 'COMMERCIAL',
      year: 2022,
      color: 'White',
      purchaseDate: '2022-11-30',
      purchaseCost: 950000,
      currentBookValue: 780000,
      residualValueThb: 350000,
      residualValuePct: 36.8,
      status: 'RETURNED',
      warrantyExpiry: '2025-11-30',
      insurancePolicyNo: 'INS-77206',
      insuranceExpiry: '2024-11-30',
      insuranceProvider: 'MSIG',
      currentSite: 'Warehouse B',
      currentAddress: 'Rayong, Thailand',
      createdAt: '2022-11-30T15:00:00Z',
      updatedAt: '2024-02-28T16:00:00Z',
    },
    {
      id: 'AST-005',
      assetCode: 'OL-VEH-005',
      assetTag: 'QR-88295',
      serialNumber: 'VIN-3320399482',
      model: 'Honda City e:HEV',
      brand: 'Honda',
      category: 'CAR',
      year: 2023,
      color: 'Blue',
      purchaseDate: '2023-08-12',
      purchaseCost: 850000,
      currentBookValue: 820000,
      residualValueThb: 400000,
      residualValuePct: 47.0,
      status: 'DAMAGED',
      warrantyExpiry: '2026-08-12',
      insurancePolicyNo: 'INS-33207',
      insuranceExpiry: '2024-08-12',
      insuranceProvider: 'AIA',
      currentSite: 'Repair Shop C',
      currentAddress: 'Bangkok, Thailand',
      createdAt: '2023-08-12T10:00:00Z',
      updatedAt: '2024-03-01T14:00:00Z',
    }
  ])

  const substitutions = ref<AssetSubstitution[]>([
    {
      id: 'SUB-001',
      contractId: 'CON-1001',
      contractNo: 'MLA-2024-05',
      originalAssetId: 'AST-005',
      originalAssetSerial: 'VIN-3320399482',
      replacementAssetId: 'AST-002',
      replacementAssetSerial: 'VIN-1120399482',
      substitutionDate: '2024-03-15',
      reason: 'DAMAGED',
      damageReportRef: 'REP-2024-001',
      insuranceClaimRef: 'CLM-99281',
      approvedBy: 'Manager A',
      status: 'PENDING',
      createdAt: '2024-03-12T09:00:00Z',
    }
  ])

  const loading = ref(false)

  const availableAssets = computed(() => assets.value.filter(a => a.status === 'AVAILABLE'))
  const activeAssets = computed(() => assets.value.filter(a => a.status === 'ACTIVE'))
  const maintenanceAssets = computed(() => assets.value.filter(a => a.status === 'MAINTENANCE'))
  const returnedAssets = computed(() => assets.value.filter(a => a.status === 'RETURNED'))
  const damagedAssets = computed(() => assets.value.filter(a => a.status === 'DAMAGED'))

  async function fetchAssetById(id: string) {
    return assets.value.find(a => a.id === id)
  }

  async function createSubstitution(sub: Omit<AssetSubstitution, 'id' | 'createdAt' | 'status'>) {
    const newSub: AssetSubstitution = {
      ...sub,
      id: `SUB-${String(substitutions.value.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    }
    substitutions.value.push(newSub)
    return newSub
  }

  async function approveSubstitution(id: string) {
    const sub = substitutions.value.find(s => s.id === id)
    if (sub) {
      sub.status = 'APPROVED'
      sub.approvedBy = 'Current User' // Simplified
      
      // Update asset statuses logically
      const original = assets.value.find(a => a.id === sub.originalAssetId)
      const replacement = assets.value.find(a => a.id === sub.replacementAssetId)
      
      if (original) original.status = 'DAMAGED' // Or whatever reason
      if (replacement) {
          replacement.status = 'ACTIVE'
          replacement.currentContractId = sub.contractId
          replacement.currentLesseeName = original?.currentLesseeName
      }
    }
  }

  return {
    assets,
    substitutions,
    availableAssets,
    activeAssets,
    maintenanceAssets,
    returnedAssets,
    damagedAssets,
    loading,
    fetchAssetById,
    createSubstitution,
    approveSubstitution
  }
})
