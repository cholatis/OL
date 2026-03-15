import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MasterLeaseAgreement, ContractStatus } from '@/types/contract'

export const useContractStore = defineStore('contract', () => {
  const contracts = ref<MasterLeaseAgreement[]>([
    {
      id: 'MLA-001',
      contractNo: 'MLA-2024-001',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      lesseeTaxId: '0107563000123',
      lesseeAddress: '123 ชั้น 20 อาคารทาวเวอร์ สุขุมวิท กรุงเทพฯ',
      lessorId: 'ABC-001',
      lessorName: 'บริษัท เอบีซี ลีสซิ่ง จำกัด',
      authorizedSignatory: 'คุณสมชาย ใจดี',
      authorizedPosition: 'กรรมการผู้มีอำนาจ',
      contractDate: '2024-01-01',
      commencementDate: '2024-01-01',
      expiryDate: '2027-01-01',
      noticePeriodDays: 90,
      contractTermMonths: 36,
      paymentFrequency: 'MONTHLY',
      paymentDueDay: 5,
      paymentProfileCode: 'T01',
      isVatRegistered: true,
      calculationMode: 'WITH_VAT',
      fleetCreditLimit: 5000000,
      fleetCreditUsed: 1200000,
      defaultEndOfTermOption: 'RETURN',
      earlyTerminationPolicy: 'Early termination requires 90 days notice and payment of 50% of remaining rentals.',
      returnConditionPolicy: 'Fair wear and tear accepted as per BVRLA guidelines.',
      baseRate: 2.5,
      margin: 1.5,
      totalRate: 4.0,
      defaultMaintenancePack: 'PD14',
      defaultHireGroup: 'A',
      insurancePolicy: 'Full Comprehensive',
      insuranceProvider: 'Thai Insurance PCL',
      status: 'ACTIVE',
      documents: [],
      equipmentSchedules: ['SCH-001', 'SCH-002'],
      createdBy: 'Admin',
      createdAt: '2023-12-15T10:00:00Z',
      updatedAt: '2024-01-01T08:00:00Z',
    },
    {
      id: 'MLA-002',
      contractNo: 'MLA-2024-002',
      lesseeId: 'CUST-002',
      lesseeName: 'บริษัท เอเพ็กซ์ โลจิสติกส์ จำกัด',
      lesseeTaxId: '0105545009876',
      lesseeAddress: '45/1 หมู่ 4 ถนนบางนา-ตราด สมุทรปราการ',
      lessorId: 'ABC-001',
      lessorName: 'บริษัท เอบีซี ลีสซิ่ง จำกัด',
      authorizedSignatory: 'คุณวิภาวรรณ สดใส',
      authorizedPosition: 'ผู้จัดการทั่วไป',
      contractDate: '2024-02-15',
      commencementDate: '2024-03-01',
      expiryDate: '2029-03-01',
      noticePeriodDays: 90,
      contractTermMonths: 60,
      paymentFrequency: 'MONTHLY',
      paymentDueDay: 1,
      paymentProfileCode: 'T00',
      isVatRegistered: true,
      calculationMode: 'WITHOUT_VAT',
      fleetCreditLimit: 10000000,
      fleetCreditUsed: 0,
      defaultEndOfTermOption: 'PURCHASE',
      earlyTerminationPolicy: 'Early termination penalty applies.',
      returnConditionPolicy: 'Standard return conditions.',
      baseRate: 2.5,
      margin: 2.0,
      totalRate: 4.5,
      defaultMaintenancePack: 'PD13',
      defaultHireGroup: 'B',
      insurancePolicy: 'Full Comprehensive',
      insuranceProvider: 'Allianz Ayudhya',
      status: 'PENDING_APPROVAL',
      submittedBy: 'Saleman A',
      submittedAt: '2024-02-28T14:00:00Z',
      documents: [],
      equipmentSchedules: [],
      createdBy: 'Saleman A',
      createdAt: '2024-02-20T11:00:00Z',
      updatedAt: '2024-02-28T14:00:00Z',
    },
    {
      id: 'MLA-003',
      contractNo: 'MLA-2023-085',
      lesseeId: 'CUST-003',
      lesseeName: 'กรมโยธาธิการและผังเมือง',
      lesseeTaxId: '0994000164723',
      lesseeAddress: '224 ถนนพระราม 9 กรุงเทพฯ',
      lessorId: 'ABC-001',
      lessorName: 'บริษัท เอบีซี ลีสซิ่ง จำกัด',
      authorizedSignatory: 'คุณเกรียงไกร มีทรัพย์',
      authorizedPosition: 'เจ้าหน้าที่บริหาร',
      contractDate: '2023-06-01',
      commencementDate: '2023-07-01',
      expiryDate: '2025-07-01',
      noticePeriodDays: 60,
      contractTermMonths: 24,
      paymentFrequency: 'MONTHLY',
      paymentDueDay: 15,
      paymentProfileCode: 'T01',
      isVatRegistered: false,
      calculationMode: 'WITHOUT_VAT',
      fleetCreditLimit: 20000000,
      fleetCreditUsed: 15600000,
      defaultEndOfTermOption: 'RETURN',
      earlyTerminationPolicy: 'Government termination clause applies.',
      returnConditionPolicy: 'Maintenance included return.',
      baseRate: 2.5,
      margin: 1.0,
      totalRate: 3.5,
      defaultMaintenancePack: 'PD14',
      defaultHireGroup: 'C',
      insurancePolicy: 'Comprehensive',
      insuranceProvider: 'Bangkok Insurance',
      status: 'ACTIVE',
      documents: [],
      equipmentSchedules: ['SCH-101'],
      createdBy: 'Admin',
      createdAt: '2023-05-15T09:00:00Z',
      updatedAt: '2023-07-01T08:00:00Z',
    },
    {
      id: 'MLA-004',
      contractNo: 'MLA-2024-045',
      lesseeId: 'CUST-005',
      lesseeName: 'บริษัท ไทย อินโนเวทีฟ รีเทล จำกัด',
      lesseeTaxId: '0105560001111',
      lesseeAddress: '888 อาคารอโศก กรุงเทพฯ',
      lessorId: 'ABC-001',
      lessorName: 'บริษัท เอบีซี ลีสซิ่ง จำกัด',
      authorizedSignatory: 'คุณปิยะพร รวยทรัพย์',
      authorizedPosition: 'CFO',
      contractDate: '2024-03-05',
      commencementDate: '2024-04-01',
      expiryDate: '2028-04-01',
      noticePeriodDays: 90,
      contractTermMonths: 48,
      paymentFrequency: 'QUARTERLY',
      paymentDueDay: 5,
      paymentProfileCode: 'T02',
      isVatRegistered: true,
      calculationMode: 'WITH_VAT',
      fleetCreditLimit: 12000000,
      fleetCreditUsed: 0,
      defaultEndOfTermOption: 'RENEW',
      earlyTerminationPolicy: 'Standard Retail Policy.',
      returnConditionPolicy: 'BVRLA Fair Wear & Tear.',
      baseRate: 2.5,
      margin: 2.2,
      totalRate: 4.7,
      defaultMaintenancePack: 'PD14',
      defaultHireGroup: 'D',
      insurancePolicy: 'Full Comprehensive',
      insuranceProvider: 'Muang Thai Insurance',
      status: 'DRAFT',
      documents: [],
      equipmentSchedules: [],
      createdBy: 'Admin',
      createdAt: '2024-03-05T10:00:00Z',
      updatedAt: '2024-03-05T10:00:00Z',
    },
    {
      id: 'MLA-005',
      contractNo: 'MLA-2022-110',
      lesseeId: 'CUST-004',
      lesseeName: 'หจก. รุ่งเรือง การก่อสร้าง',
      lesseeTaxId: '0123547000456',
      lesseeAddress: '99/9 ถนนมิตรภาพ นครราชสีมา',
      lessorId: 'ABC-001',
      lessorName: 'บริษัท เอบีซี ลีสซิ่ง จำกัด',
      authorizedSignatory: 'คุณมานะ ขยันงาน',
      authorizedPosition: 'หุ้นส่วนผู้จัดการ',
      contractDate: '2022-11-10',
      commencementDate: '2022-12-01',
      expiryDate: '2025-12-01',
      noticePeriodDays: 90,
      contractTermMonths: 36,
      paymentFrequency: 'MONTHLY',
      paymentDueDay: 28,
      paymentProfileCode: 'T01',
      isVatRegistered: true,
      calculationMode: 'WITH_VAT',
      fleetCreditLimit: 3000000,
      fleetCreditUsed: 2800000,
      defaultEndOfTermOption: 'RETURN',
      earlyTerminationPolicy: 'High risk termination policy.',
      returnConditionPolicy: 'Strict return inspection.',
      baseRate: 3.0,
      margin: 3.0,
      totalRate: 6.0,
      defaultMaintenancePack: 'NONE',
      defaultHireGroup: 'A',
      insurancePolicy: 'Third Party only',
      insuranceProvider: 'MSIG Thailand',
      status: 'EXPIRED',
      documents: [],
      equipmentSchedules: ['SCH-999'],
      createdBy: 'System',
      createdAt: '2022-10-01T08:00:00Z',
      updatedAt: '2025-12-01T23:59:59Z',
    },
  ])

  const selectedContract = ref<MasterLeaseAgreement | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const activeContracts = computed(() => contracts.value.filter(c => c.status === 'ACTIVE'))
  const pendingContracts = computed(() => contracts.value.filter(c => c.status === 'PENDING_APPROVAL'))
  const expiringWithin90Days = computed(() => {
    const today = new Date()
    const limit = new Date()
    limit.setDate(today.getDate() + 90)
    return contracts.value.filter(c => c.status === 'ACTIVE' && new Date(c.expiryDate) <= limit)
  })

  // Actions
  async function fetchContracts() {
    loading.value = true
    // Mock fetch
    await new Promise(resolve => setTimeout(resolve, 500))
    loading.value = false
  }

  async function fetchContractById(id: string) {
    loading.value = true
    const contract = contracts.value.find(c => c.id === id || c.contractNo === id)
    selectedContract.value = contract ? { ...contract } : null
    loading.value = false
  }

  async function createContract(data: Partial<MasterLeaseAgreement>) {
    const newContract: MasterLeaseAgreement = {
      id: `MLA-NEW-${Date.now()}`,
      contractNo: `MLA-2024-${String(contracts.value.length + 1).padStart(5, '0')}`,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Admin',
      documents: [],
      equipmentSchedules: [],
      ...data,
    } as MasterLeaseAgreement
    
    contracts.value.unshift(newContract)
    return newContract
  }

  async function updateContract(id: string, data: Partial<MasterLeaseAgreement>) {
    const index = contracts.value.findIndex(c => c.id === id)
    if (index !== -1) {
      contracts.value[index] = { ...contracts.value[index], ...data, updatedAt: new Date().toISOString() }
    }
  }

  async function submitForApproval(id: string) {
    const c = contracts.value.find(c => c.id === id)
    if (c) {
      c.status = 'PENDING_APPROVAL'
      c.submittedBy = 'Admin'
      c.submittedAt = new Date().toISOString()
    }
  }

  async function approveContract(id: string, approvedBy: string) {
    const c = contracts.value.find(c => c.id === id)
    if (c) {
      c.status = 'APPROVED'
      c.approvedBy = approvedBy
      c.approvedAt = new Date().toISOString()
    }
  }

  async function rejectContract(id: string, reason: string) {
    const c = contracts.value.find(c => c.id === id)
    if (c) {
      c.status = 'DRAFT'
      c.rejectionReason = reason
    }
  }

  async function terminateContract(id: string, reason: string, terminationDate: string) {
    const c = contracts.value.find(c => c.id === id)
    if (c) {
      c.status = 'TERMINATED'
      c.updatedAt = new Date().toISOString()
    }
  }

  return {
    contracts,
    selectedContract,
    loading,
    error,
    activeContracts,
    pendingContracts,
    expiringWithin90Days,
    fetchContracts,
    fetchContractById,
    createContract,
    updateContract,
    submitForApproval,
    approveContract,
    rejectContract,
    terminateContract,
  }
})
