import { defineStore } from 'pinia'
import type { 
  TFRS16Schedule, 
  TFRS9Assessment, 
  ResidualValueRecord, 
  UDFDefinition,
  TFRS9Stage
} from '@/types/accounting'

export const useAccountingStore = defineStore('accounting', {
  state: () => ({
    tfrs16Schedules: [
      {
        contractId: 'MLA-001',
        commencementDate: '2024-01-01',
        leaseTerm: 12,
        discountRate: 4.5,
        rightOfUseAsset: 500000,
        leaseLiability: 500000,
        rouAmortizationMethod: 'STRAIGHT_LINE',
        rows: Array.from({ length: 12 }, (_, i) => ({
          period: i + 1,
          date: `2024-0${i + 1}-01`,
          openingLeaseLiability: 500000 - (i * 41666),
          leasePayment: 45000,
          interestExpense: (500000 - (i * 41666)) * (0.045 / 12),
          principalRepayment: 45000 - ((500000 - (i * 41666)) * (0.045 / 12)),
          closingLeaseLiability: 500000 - ((i + 1) * 41666),
          rouDepreciation: 500000 / 12,
          closingRouAsset: 500000 - ((i + 1) * (500000 / 12))
        }))
      }
    ] as TFRS16Schedule[],

    tfrs9Assessments: [
      {
        contractId: 'MLA-001',
        customerName: 'บริษัท เอบีซี จำกัด',
        assessmentDate: '2024-03-01',
        currentStage: 'STAGE1',
        stagingCriteria: { dpd: 0, significantCreditDegradation: false, inDefault: false, legalStatus: false },
        ecl: { pd: 0.02, lgd: 0.45, ead: 450000, ecl12Month: 4050, eclLifetime: 0, provision: 4050 },
        stageHistory: [{ date: '2024-01-01', stage: 'STAGE1', reason: 'Initial Setup' }]
      },
      {
        contractId: 'MLA-002',
        customerName: 'บริษัท เอ็กซ์วายแซด โลจิสติกส์',
        assessmentDate: '2024-03-01',
        currentStage: 'STAGE2',
        previousStage: 'STAGE1',
        stagingCriteria: { dpd: 35, significantCreditDegradation: true, inDefault: false, legalStatus: false },
        ecl: { pd: 0.15, lgd: 0.45, ead: 1200000, ecl12Month: 0, eclLifetime: 81000, provision: 81000 },
        stageHistory: [
            { date: '2024-01-01', stage: 'STAGE1', reason: 'Initial Setup' },
            { date: '2024-02-15', stage: 'STAGE2', reason: 'DPD > 30 days' }
        ]
      },
      {
        contractId: 'MLA-003',
        customerName: 'ร้านปังปัง เบเกอรี่',
        assessmentDate: '2024-03-01',
        currentStage: 'STAGE3',
        stagingCriteria: { dpd: 95, significantCreditDegradation: true, inDefault: true, legalStatus: true },
        ecl: { pd: 1.0, lgd: 0.60, ead: 800000, ecl12Month: 0, eclLifetime: 480000, provision: 480000 },
        stageHistory: [
            { date: '2024-01-01', stage: 'STAGE1', reason: 'Initial Setup' },
            { date: '2024-03-01', stage: 'STAGE3', reason: 'Default Status' }
        ]
      }
    ] as TFRS9Assessment[],

    rvRecords: [
      {
        contractId: 'MLA-001',
        assetId: 'ASSET-2024-001',
        assetName: 'Toyota Hilux Revo 2024',
        originalRV: 450000,
        originalRVRate: 45,
        currentBookValue: 850000,
        marketValue: 420000,
        expiryDate: '2027-12-31',
        rvAdjustments: [],
        rvGainLoss: -30000
      },
      {
        contractId: 'MLA-004',
        assetId: 'ASSET-2024-045',
        assetName: 'Isuzu D-Max 2024',
        originalRV: 380000,
        originalRVRate: 40,
        currentBookValue: 720000,
        marketValue: 400000,
        expiryDate: '2028-06-30',
        rvAdjustments: [],
        rvGainLoss: 20000
      }
    ] as ResidualValueRecord[],

    udfDefinitions: [
      { id: 'UDF-001', entity: 'CONTRACT', fieldCode: 'UDF_LOC_01', fieldLabel: 'Location ID', fieldType: 'TEXT', required: false, displayOrder: 1, active: true, createdBy: 'Admin' },
      { id: 'UDF-002', entity: 'ASSET', fieldCode: 'UDF_GPS_ID', fieldLabel: 'GPS Serial Number', fieldType: 'TEXT', required: true, displayOrder: 1, active: true, createdBy: 'Admin' },
      { id: 'UDF-003', entity: 'CUSTOMER', fieldCode: 'UDF_IND_GRP', fieldLabel: 'Industry Group', fieldType: 'DROPDOWN', required: true, dropdownOptions: ['Logistics', 'Trading', 'Manufacturing', 'Services'], displayOrder: 1, active: true, createdBy: 'Admin' }
    ] as UDFDefinition[]
  }),

  actions: {
    getTFRS16ByContract(id: string) {
      return this.tfrs16Schedules.find(s => s.contractId === id)
    },
    updateECLStage(contractId: string, stage: TFRS9Stage, reason: string) {
        const assessment = this.tfrs9Assessments.find(a => a.contractId === contractId)
        if (assessment) {
            assessment.previousStage = assessment.currentStage
            assessment.currentStage = stage
            assessment.stageHistory.push({ date: new Date().toISOString().split('T')[0], stage, reason })
        }
    },
    addUDF(udf: UDFDefinition) {
        this.udfDefinitions.push(udf)
    }
  }
})
