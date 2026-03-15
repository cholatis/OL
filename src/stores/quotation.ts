import { defineStore } from 'pinia'
import type { Quotation } from '@/types/quotation'

export const useQuotationStore = defineStore('quotation', () => {
  const quotations = ref<Quotation[]>([
    {
      id: 'QT-001',
      quotationNo: 'QT-2024-00001',
      status: 'APPROVED',
      customerId: 'CUST-001',
      customerName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      contactName: 'คุณสมชาย ใจดี',
      quotationDate: '2024-03-01',
      validUntil: '2024-03-31',
      assetModelId: 'MOD-001',
      assetModel: 'Toyota Hilux Revo Z Edition',
      assetYear: 2024,
      assetCondition: 'NEW',
      assetCategory: 'COMMERCIAL',
      insuranceGroup: 1,
      listPrice: 650000,
      sellingPrice: 630000,
      discount: 20000,
      preVatPrice: 610000,
      vatAmount: 42700,
      registrationFee: 5500,
      rstServiceFee: 1500,
      onRoadPrice: 659700,
      reclaimedVat: 42700,
      netSellingPrice: 617000,
      otdPrice: 659700,
      isVatRegistered: true,
      contractTermMonths: 48,
      annualMileageKm: 30000,
      totalContractMileageKm: 120000,
      paymentsInAdvance: 1,
      downPayment: 0,
      securityDeposit: 0,
      paymentFrequency: 'MONTHLY',
      paymentProfileCode: 'T01',
      maintenancePackCode: 'PD14',
      hireGroup: 'A',
      includeRepairs: true,
      includeServicing: true,
      servicingCount: 12,
      includeTyres: true,
      tyresSets: 2,
      includeReliefVehicle: true,
      includeRoadsideAssistance: true,
      services: [
        { serviceType: 'Maintenance', monthlyAmount: 1200, totalAmount: 57600, dbTotal: 57600 },
        { serviceType: 'Repairs', monthlyAmount: 850, totalAmount: 40800, dbTotal: 40800 }
      ],
      baseRate: 3.5,
      margin: 1.5,
      totalRate: 5.0,
      residualValueThb: 240000,
      residualValuePct: 36.4,
      rvWithVat: 240000,
      rvNetVat: 224299,
      calculationMode: 'WITHOUT_VAT',
      insurancePremium: 18500,
      totalDepreciation: 392701,
      financeMaintenance: 0,
      financeProfit: 123400,
      financialRentalMonthly: 14500,
      maintenanceRentalMonthly: 2193,
      totalRentalExclVat: 16551,
      vatOnRental: 1158,
      totalRentalInclVat: 17709,
      totalContractValue: 850032,
      createdAt: '2024-03-01T08:00:00Z',
      updatedAt: '2024-03-01T08:00:00Z',
    },
    {
      id: 'QT-002',
      quotationNo: 'QT-2024-00002',
      status: 'DRAFT',
      customerId: 'CUST-002',
      customerName: 'บริษัท เอเพ็กซ์ โลจิสติกส์ จำกัด',
      contactName: 'คุณวิภาวรรณ สดใส',
      quotationDate: '2024-03-10',
      validUntil: '2024-04-10',
      assetModelId: 'MOD-002',
      assetModel: 'Isuzu D-Max Spark',
      assetYear: 2024,
      assetCondition: 'NEW',
      assetCategory: 'COMMERCIAL',
      insuranceGroup: 2,
      listPrice: 580000,
      sellingPrice: 565000,
      discount: 15000,
      preVatPrice: 550000,
      vatAmount: 38500,
      registrationFee: 5000,
      rstServiceFee: 1500,
      onRoadPrice: 595000,
      reclaimedVat: 0,
      netSellingPrice: 595000,
      otdPrice: 595000,
      isVatRegistered: false,
      contractTermMonths: 36,
      annualMileageKm: 40000,
      totalContractMileageKm: 120000,
      paymentsInAdvance: 1,
      downPayment: 0,
      securityDeposit: 0,
      paymentFrequency: 'MONTHLY',
      paymentProfileCode: 'T01',
      maintenancePackCode: 'PD14',
      hireGroup: 'B',
      includeRepairs: true,
      includeServicing: true,
      servicingCount: 9,
      includeTyres: false,
      tyresSets: 0,
      includeReliefVehicle: false,
      includeRoadsideAssistance: true,
      services: [
        { serviceType: 'Maintenance', monthlyAmount: 1500, totalAmount: 54000, dbTotal: 54000 }
      ],
      baseRate: 3.5,
      margin: 2.0,
      totalRate: 5.5,
      residualValueThb: 180000,
      residualValuePct: 30.2,
      rvWithVat: 180000,
      rvNetVat: 168224,
      calculationMode: 'WITH_VAT',
      insurancePremium: 16000,
      totalDepreciation: 426776,
      financeMaintenance: 0,
      financeProfit: 98000,
      financialRentalMonthly: 18200,
      maintenanceRentalMonthly: 1605,
      totalRentalExclVat: 19700,
      vatOnRental: 1379,
      totalRentalInclVat: 21079,
      totalContractValue: 758844,
      createdAt: '2024-03-10T09:00:00Z',
      updatedAt: '2024-03-10T09:00:00Z',
    }
  ])

  const selectedQuotation = ref<Quotation | null>(null)
  const loading = ref(false)

  async function fetchQuotations() {
    // Mock fetch
  }

  async function fetchQuotationById(id: string) {
    const q = quotations.value.find(q => q.id === id)
    selectedQuotation.value = q ? JSON.parse(JSON.stringify(q)) : null
  }

  async function saveQuotation(data: Quotation) {
    const index = quotations.value.findIndex(q => q.id === data.id)
    if (index !== -1) {
      quotations.value[index] = { ...data, updatedAt: new Date().toISOString() }
    } else {
      quotations.value.push({
        ...data,
        id: `QT-${String(quotations.value.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
  }

  return {
    quotations,
    selectedQuotation,
    loading,
    fetchQuotations,
    fetchQuotationById,
    saveQuotation
  }
})
