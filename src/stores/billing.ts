import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LeaseScheduleItem, Invoice } from '@/types/billing'

export const useBillingStore = defineStore('billing', () => {
  const leaseSchedules = ref<LeaseScheduleItem[]>([
    {
      id: 'SCH-001',
      contractId: 'CON-1001',
      contractNo: 'MLA-2024-05',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      installmentNo: 1,
      dueDate: '2024-01-01',
      depreciationAmount: 15000,
      financeMaintenanceAmount: 2000,
      financeProfitAmount: 3000,
      insuranceAmount: 500,
      financialRentalExclVat: 20500,
      servicesAmount: 5000,
      maintenanceRentalExclVat: 5000,
      totalExclVat: 25500,
      vatAmount: 1785,
      totalInclVat: 27285,
      status: 'PAID',
      paidDate: '2023-12-28',
      paidAmount: 27285,
      rouAssetBalance: 580000,
      leaseLiabilityBalance: 570000,
      interestExpense: 1200,
    },
    {
      id: 'SCH-002',
      contractId: 'CON-1001',
      contractNo: 'MLA-2024-05',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      installmentNo: 2,
      dueDate: '2024-02-01',
      depreciationAmount: 15000,
      financeMaintenanceAmount: 2000,
      financeProfitAmount: 3000,
      insuranceAmount: 500,
      financialRentalExclVat: 20500,
      servicesAmount: 5000,
      maintenanceRentalExclVat: 5000,
      totalExclVat: 25500,
      vatAmount: 1785,
      totalInclVat: 27285,
      status: 'PAID',
      paidDate: '2024-01-25',
      paidAmount: 27285,
      rouAssetBalance: 565000,
      leaseLiabilityBalance: 555000,
      interestExpense: 1150,
    },
    {
      id: 'SCH-003',
      contractId: 'CON-1001',
      contractNo: 'MLA-2024-05',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      installmentNo: 3,
      dueDate: '2024-03-01',
      depreciationAmount: 15000,
      financeMaintenanceAmount: 2000,
      financeProfitAmount: 3000,
      insuranceAmount: 500,
      financialRentalExclVat: 20500,
      servicesAmount: 5000,
      maintenanceRentalExclVat: 5000,
      totalExclVat: 25500,
      vatAmount: 1785,
      totalInclVat: 27285,
      status: 'INVOICED',
      invoiceId: 'INV-2024-001',
      rouAssetBalance: 550000,
      leaseLiabilityBalance: 540000,
      interestExpense: 1100,
    },
    {
      id: 'SCH-004',
      contractId: 'CON-1001',
      contractNo: 'MLA-2024-05',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      installmentNo: 4,
      dueDate: '2024-04-01',
      depreciationAmount: 15000,
      financeMaintenanceAmount: 2000,
      financeProfitAmount: 3000,
      insuranceAmount: 500,
      financialRentalExclVat: 20500,
      servicesAmount: 5000,
      maintenanceRentalExclVat: 5000,
      totalExclVat: 25500,
      vatAmount: 1785,
      totalInclVat: 27285,
      status: 'PENDING',
      rouAssetBalance: 535000,
      leaseLiabilityBalance: 525000,
      interestExpense: 1050,
    }
  ])

  const invoices = ref<Invoice[]>([
    {
      id: 'INV-001',
      invoiceNo: 'INV-2024-001',
      invoiceType: 'COMBINED',
      contractId: 'CON-1001',
      contractNo: 'MLA-2024-05',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      lesseeTaxId: '0105556789012',
      lesseeAddress: 'กรุงเทพมหานคร ประเทศไทย',
      invoiceDate: '2024-03-01',
      dueDate: '2024-03-15',
      items: [
        { description: 'ค่าเช่า Operating Lease (Financial)', quantity: 1, unitPrice: 20500, amount: 20500, vatRate: 7 },
        { description: 'ค่าเช่า Operating Lease (Maintenance)', quantity: 1, unitPrice: 5000, amount: 5000, vatRate: 7 }
      ],
      subtotal: 25500,
      vatAmount: 1785,
      totalAmount: 27285,
      withholdingTax: 1275,
      netPayable: 26010,
      status: 'ISSUED',
      createdAt: '2024-03-01T08:00:00Z',
    },
    {
      id: 'INV-002',
      invoiceNo: 'INV-2023-120',
      invoiceType: 'COMBINED',
      contractId: 'CON-1001',
      contractNo: 'MLA-2024-05',
      lesseeId: 'CUST-001',
      lesseeName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      lesseeTaxId: '0105556789012',
      lesseeAddress: 'กรุงเทพมหานคร ประเทศไทย',
      invoiceDate: '2023-12-01',
      dueDate: '2023-12-15',
      items: [
        { description: 'ค่าเช่า Operating Lease (Combined) งวด 1', quantity: 1, unitPrice: 25500, amount: 25500, vatRate: 7 }
      ],
      subtotal: 25500,
      vatAmount: 1785,
      totalAmount: 27285,
      withholdingTax: 1275,
      netPayable: 26010,
      status: 'PAID',
      paidDate: '2023-12-28',
      paidAmount: 27285,
      createdAt: '2023-12-01T08:00:00Z',
    }
  ])

  const loading = ref(false)

  const overdueInvoices = computed(() => {
    const today = new Date()
    return invoices.value.filter(inv => inv.status !== 'PAID' && inv.status !== 'CANCELLED' && new Date(inv.dueDate) < today)
  })

  async function generateInvoice(scheduleIds: string[], type: 'FINANCIAL' | 'MAINTENANCE' | 'COMBINED' = 'COMBINED') {
    loading.value = true
    // Mock generation
    const selected = leaseSchedules.value.filter(s => scheduleIds.includes(s.id))
    if (selected.length === 0) return null

    const first = selected[0]
    const subtotal = selected.reduce((acc, s) => acc + s.totalExclVat, 0)
    const vat = selected.reduce((acc, s) => acc + s.vatAmount, 0)
    const total = subtotal + vat

    const newInvoice: Invoice = {
      id: `INV-NEW-${Date.now()}`,
      invoiceNo: `INV-2024-${String(invoices.value.length + 1).padStart(3, '0')}`,
      invoiceType: type,
      contractId: first.contractId,
      contractNo: first.contractNo,
      lesseeId: first.lesseeId,
      lesseeName: first.lesseeName,
      lesseeTaxId: '010555XXXXXXX',
      lesseeAddress: 'ADDRESS MOCK',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      items: selected.map(s => ({
          description: `Rent Rental Installment ${s.installmentNo} (${s.contractNo})`,
          quantity: 1,
          unitPrice: s.totalExclVat,
          amount: s.totalExclVat,
          vatRate: 7
      })),
      subtotal,
      vatAmount: vat,
      totalAmount: total,
      withholdingTax: subtotal * 0.05,
      netPayable: total - (subtotal * 0.05),
      status: 'DRAFT',
      createdAt: new Date().toISOString()
    }

    invoices.value.unshift(newInvoice)
    
    // Update schedules status
    selected.forEach(s => {
        s.status = 'INVOICED'
        s.invoiceId = newInvoice.invoiceNo
    })

    loading.value = false
    return newInvoice
  }

  async function confirmPayment(invoiceId: string, amount: number, method: string) {
    const inv = invoices.value.find(i => i.id === invoiceId)
    if (inv) {
        inv.status = 'PAID'
        inv.paidAmount = amount
        inv.paidDate = new Date().toISOString().split('T')[0]
        inv.paymentMethod = method
        
        // Update linked schedules
        const schedules = leaseSchedules.value.filter(s => s.invoiceId === inv.invoiceNo)
        schedules.forEach(s => {
            s.status = 'PAID'
            s.paidDate = inv.paidDate
            s.paidAmount = s.totalInclVat // Simplified
        })
    }
  }

  return {
    leaseSchedules,
    invoices,
    overdueInvoices,
    loading,
    generateInvoice,
    confirmPayment
  }
})
