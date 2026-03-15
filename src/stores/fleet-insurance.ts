import { defineStore } from 'pinia'
import type { 
  InsurancePolicy, CompulsoryInsurance, VehicleTax, 
  AccidentReport, InsuranceClaim, MaintenanceAgreement 
} from '@/types/fleet-insurance'

export const useFleetInsuranceStore = defineStore('fleet-insurance', {
  state: () => ({
    policies: [
      {
        id: 'pol-1',
        policyNo: 'V-0012345/2024',
        assetId: 'as-1',
        chassisNo: 'CH-2024-X99',
        plateNo: '1กก 1234',
        insuranceCompany: 'Viriyah Insurance',
        class: 'CLASS1',
        coverageStart: '2024-01-01',
        coverageEnd: '2024-12-31',
        premiumAmount: 18000,
        stampDuty: 72,
        vat: 1260,
        totalPremium: 19332,
        coverageDetails: {
          ownDamage: 1560000,
          thirdPartyBody: 500000,
          thirdPartyProperty: 2500000,
          fire: 1560000,
          theft: 1560000,
          deductible: 5000
        },
        insuredName: 'Phatra Leasing PCL',
        contractId: 'cnt-101',
        lesseeId: 'lss-99',
        status: 'ACTIVE',
        renewalStatus: 'ON_TIME'
      }
    ] as InsurancePolicy[],

    compulsoryList: [
      {
        id: 'comp-1',
        assetId: 'as-1',
        plateNo: '1กก 1234',
        chassisNo: 'CH-2024-X99',
        issueDate: '2024-01-01',
        expiryDate: '2024-12-31',
        insuredAmount: 300000,
        premium: 645,
        insuranceCompany: 'Viriyah Insurance',
        certificateNo: 'C12344566',
        status: 'ACTIVE',
        renewalAlert: false
      }
    ] as CompulsoryInsurance[],

    taxPayments: [
      {
        id: 'tax-1',
        assetId: 'as-1',
        plateNo: '1กก 1234',
        chassisNo: 'CH-2024-X99',
        taxYear: 2567,
        dueDate: '2024-06-30',
        taxAmount: 2500,
        totalPaid: 2500,
        method: 'DLT_COUNTER',
        status: 'PAID',
        renewalAlert: false
      }
    ] as VehicleTax[],

    accidents: [
      {
        id: 'acc-1',
        accidentNo: 'ACC-2024-001',
        reportDate: '2024-03-10',
        accidentDate: '2024-03-10',
        accidentTime: '14:30',
        assetId: 'as-1',
        chassisNo: 'CH-2024-X99',
        plateNo: '1กก 1234',
        driverName: 'Somsak Driver',
        lesseeId: 'lss-99',
        lesseeContact: '081-111-2222',
        location: 'Ratchadapisek Rd.',
        province: 'Bangkok',
        description: 'Rear-ended at traffic light',
        severity: 'MODERATE',
        fault: 'THIRD_PARTY',
        injuries: false,
        policeStationReported: true,
        policeReportNo: 'POL-99123',
        photos: [],
        isTotalLoss: false,
        claimIds: ['clm-1'],
        status: 'CLAIM_FILED'
      }
    ] as AccidentReport[],

    claims: [
      {
        id: 'clm-1',
        claimNo: 'CLM-2024-001',
        accidentId: 'acc-1',
        policyId: 'pol-1',
        claimType: 'OWN_DAMAGE',
        claimDate: '2024-03-11',
        deductible: 5000,
        status: 'APPROVED',
        remarks: 'Claim approved by surveyor'
      }
    ] as InsuranceClaim[],

    maintenanceAgreements: [
      {
        id: 'ma-1',
        maNo: 'MA-2024-001',
        vendorId: 'v-1',
        vendorName: 'Toyota Motor Thailand',
        serviceScope: {
          serviceTypes: ['PM', 'Engine Repair'],
          brands: ['Toyota'],
          serviceArea: ['Bangkok', 'Central']
        },
        laborRate: 650,
        partsPriceType: 'DISCOUNT_PERCENT',
        partsDiscount: 15,
        sla: {
          responseTimeHours: 4,
          repairTimeWorkingDays: 7,
          loaner: true
        },
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'ACTIVE'
      }
    ] as MaintenanceAgreement[]
  }),

  getters: {
    getPolicyById: (state) => (id: string) => state.policies.find(p => p.id === id),
    getAccidentById: (state) => (id: string) => state.accidents.find(a => a.id === id),
    getClaimsByAccident: (state) => (accId: string) => state.claims.filter(c => c.accidentId === accId),
    getMAByVendor: (state) => (vId: string) => state.maintenanceAgreements.find(ma => ma.vendorId === vId),
    
    insuranceSummary: (state) => {
      const active = state.policies.filter(p => p.status === 'ACTIVE').length
      const due30 = state.policies.filter(p => p.renewalStatus === 'OVERDUE').length
      const due60 = state.policies.filter(p => p.renewalStatus === 'DUE_SOON').length
      const totalPremium = state.policies.reduce((s, p) => s + p.totalPremium, 0)
      return { active, due30, due60, totalPremium }
    }
  }
})
