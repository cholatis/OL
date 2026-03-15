import { defineStore } from 'pinia'
import type { FixedAsset, FADisposal, FARevaluation } from '@/types/fixed-assets'

export const useFixedAssetsStore = defineStore('fixedAssets', {
  state: () => ({
    assets: [
      {
        id: 'fa-1',
        assetCode: 'FA-2024-0001',
        assetManagementId: 'SN-V001',
        assetName: 'Toyota Camry 2024 - White',
        category: 'VEHICLE_PASSENGER',
        acquisitionDate: '2024-01-01',
        acquisitionCost: 1200000,
        residualValue: 100000,
        usefulLifeYears: 5,
        depreciationMethod: 'STRAIGHT_LINE',
        depreciationRate: 20,
        accountCode: '1210',
        accumDeprAccount: '1211',
        deprExpenseAccount: '5101',
        status: 'ACTIVE',
        currentLeaseContractId: 'MLA-001',
        currentLesseeName: 'SCG Logistics',
        leaseStartDate: '2024-02-01',
        leaseEndDate: '2027-01-31',
        accumulatedDepreciation: 40000,
        netBookValue: 1160000
      },
      {
        id: 'fa-2',
        assetCode: 'FA-2024-0002',
        assetManagementId: 'SN-V002',
        assetName: 'Isuzu D-Max 2024 - Blue',
        category: 'VEHICLE_COMMERCIAL',
        acquisitionDate: '2024-01-15',
        acquisitionCost: 850000,
        residualValue: 50000,
        usefulLifeYears: 5,
        depreciationMethod: 'STRAIGHT_LINE',
        depreciationRate: 20,
        accountCode: '1210',
        accumDeprAccount: '1211',
        deprExpenseAccount: '5101',
        status: 'ACTIVE',
        currentLeaseContractId: 'MLA-002',
        currentLesseeName: 'CP All Public Co.',
        leaseStartDate: '2024-03-01',
        leaseEndDate: '2028-02-29',
        accumulatedDepreciation: 26000,
        netBookValue: 824000
      }
    ] as FixedAsset[],
    disposals: [] as FADisposal[],
    revaluations: [] as FARevaluation[],
    depreciationRuns: [
      {
        period: '2024-01',
        date: '2024-01-31',
        totalAmount: 15450.50,
        status: 'POSTED',
        runBy: 'Admin User'
      },
      {
        period: '2024-02',
        date: '2024-02-29',
        totalAmount: 18220.75,
        status: 'POSTED',
        runBy: 'Admin User'
      }
    ]
  }),
  getters: {
    totalAcquisitionCost: (state) => state.assets.reduce((sum, a) => sum + a.acquisitionCost, 0),
    totalNBV: (state) => state.assets.reduce((sum, a) => sum + a.netBookValue, 0),
    totalAccumulatedDepr: (state) => state.assets.reduce((sum, a) => sum + a.accumulatedDepreciation, 0),
    activeAssetCount: (state) => state.assets.filter(a => a.status === 'ACTIVE').length
  },
  actions: {
    addDisposal(disposal: FADisposal) {
      this.disposals.push(disposal)
      const asset = this.assets.find(a => a.id === disposal.assetId)
      if (asset) {
        asset.status = 'DISPOSED'
      }
    }
  }
})
