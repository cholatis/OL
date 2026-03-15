<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBillingStore } from '@/stores/billing'

const billingStore = useBillingStore()
const router = useRouter()

const selectedItems = ref<string[]>([])
const searchQuery = ref('')
const selectedStatus = ref('ALL')

const filteredSchedules = computed(() => {
  return billingStore.leaseSchedules.filter(s => {
    const matchesSearch = s.contractNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         s.lesseeName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = selectedStatus.value === 'ALL' || s.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})

const summary = computed(() => {
    const data = filteredSchedules.value
    return {
        financial: data.reduce((acc, s) => acc + s.financialRentalExclVat, 0),
        maintenance: data.reduce((acc, s) => acc + s.maintenanceRentalExclVat, 0),
        vat: data.reduce((acc, s) => acc + s.vatAmount, 0),
        total: data.reduce((acc, s) => acc + s.totalInclVat, 0)
    }
})

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const getStatusColor = (status: string) => {
  if (status === 'PAID') return 'success'
  if (status === 'OVERDUE') return 'error'
  if (status === 'INVOICED') return 'info'
  if (status === 'PARTIAL') return 'warning'
  return 'secondary'
}

const headers = [
  { title: 'INSTALLMENT', key: 'installmentNo' },
  { title: 'CONTRACT / CUSTOMER', key: 'contractNo' },
  { title: 'DUE DATE', key: 'dueDate' },
  { title: 'FINANCIAL RENTAL', key: 'financialRentalExclVat' },
  { title: 'MAINTENANCE RENTAL', key: 'maintenanceRentalExclVat' },
  { title: 'VAT (7%)', key: 'vatAmount' },
  { title: 'TOTAL', key: 'totalInclVat' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const isBatchDialogOpen = ref(false)
const batchForm = ref({
  type: 'COMBINED',
  consolidated: true,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]
})

const handleBatchInvoice = () => {
  if (selectedItems.value.length === 0) return
  isBatchDialogOpen.value = true
}

const confirmBatchGeneration = async () => {
    const inv = await billingStore.generateInvoice(selectedItems.value, batchForm.value.type as any)
    if (inv) {
        isBatchDialogOpen.value = false
        selectedItems.value = []
        router.push(`/invoices/${inv.id}`)
    }
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">ตาราง Lease Schedule</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn
            color="primary"
            prepend-icon="tabler-file-invoice"
            :disabled="selectedItems.length === 0"
            @click="handleBatchInvoice"
        >
          สร้างใบแจ้งหนี้ ({{ selectedItems.length }})
        </VBtn>
      </VCol>
    </VRow>

    <VCard class="mb-6 bg-primary-dark">
        <VCardText>
            <VRow class="text-center align-center py-2">
                <VCol cols="6" md="3">
                    <div class="text-caption text-white opacity-70">Financial Rental (Ex)</div>
                    <div class="text-h5 text-white font-weight-bold">{{ formatCurrency(summary.financial) }}</div>
                </VCol>
                <VCol cols="6" md="3">
                    <div class="text-caption text-white opacity-70">Maintenance Rental (Ex)</div>
                    <div class="text-h5 text-white font-weight-bold">{{ formatCurrency(summary.maintenance) }}</div>
                </VCol>
                <VCol cols="6" md="2">
                    <div class="text-caption text-white opacity-70">VAT Sum</div>
                    <div class="text-h5 text-white font-weight-bold text-success">{{ formatCurrency(summary.vat) }}</div>
                </VCol>
                <VCol cols="6" md="4">
                    <VDivider vertical class="mx-4 d-none d-md-flex" />
                    <div class="text-caption text-white">รวมสุทธิ (Inc VAT)</div>
                    <div class="text-h3 text-white font-weight-black">{{ formatCurrency(summary.total) }}</div>
                </VCol>
            </VRow>
        </VCardText>
    </VCard>

    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQuery"
              placeholder="ค้นหาตามสัญญา / ลูกค้า..."
              prepend-inner-icon="tabler-search"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="4">
             <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="['ALL', 'PENDING', 'INVOICED', 'PAID', 'OVERDUE']"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        v-model="selectedItems"
        :headers="headers"
        :items="filteredSchedules"
        show-select
        item-value="id"
        class="text-no-wrap"
      >
        <template #[`item.installmentNo`]="{ item }">
          <span class="font-weight-medium">#{{ item.installmentNo }}</span>
        </template>

        <template #[`item.contractNo`]="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium text-primary">{{ item.contractNo }}</span>
            <span class="text-caption text-truncate" style="max-width: 200px;">{{ item.lesseeName }}</span>
          </div>
        </template>

        <template #[`item.dueDate`]="{ item }">
          <div class="d-flex align-center">
            <span>{{ item.dueDate }}</span>
            <VIcon
                v-if="item.status === 'PENDING' && new Date(item.dueDate) < new Date()"
                icon="tabler-alert-circle"
                color="error"
                size="x-small"
                class="ms-1"
                title="เกินกำหนดชำระ"
            />
          </div>
        </template>

        <template #[`item.financialRentalExclVat`]="{ item }">
          {{ formatCurrency(item.financialRentalExclVat) }}
        </template>

        <template #[`item.maintenanceRentalExclVat`]="{ item }">
           {{ formatCurrency(item.maintenanceRentalExclVat) }}
        </template>

        <template #[`item.vatAmount`]="{ item }">
           <span class="text-success">{{ formatCurrency(item.vatAmount) }}</span>
        </template>

        <template #[`item.totalInclVat`]="{ item }">
           <span class="font-weight-bold">{{ formatCurrency(item.totalInclVat) }}</span>
        </template>

        <template #[`item.status`]="{ item }">
          <VChip :color="getStatusColor(item.status)" size="small" label>
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
           <VBtn v-if="item.status === 'INVOICED'" icon variant="text" size="small" color="primary" @click="router.push(`/invoices/${item.invoiceId}`)">
              <VIcon icon="tabler-file-search" />
           </VBtn>
        </template>
      </VDataTable>
    </VCard>
    <!-- Batch Generation Dialog -->
    <VDialog v-model="isBatchDialogOpen" max-width="600">
        <VCard title="ออกใบแจ้งหนี้ (Batch Generating)">
            <VCardText>
                <VAlert 
                    v-if="selectedItems.length > 0"
                    color="primary" 
                    variant="tonal" 
                    icon="tabler-info-circle"
                    class="mb-6"
                >
                    คุณกำลังจะออกใบแจ้งหนี้สำหรับ {{ selectedItems.length }} รายการ Lease Schedule
                </VAlert>

                <VRow>
                    <VCol cols="12">
                        <div class="text-subtitle-2 mb-2 font-weight-bold">ประเภทใบแจ้งหนี้ (Invoice Type):</div>
                        <VRadioGroup v-model="batchForm.type" inline hide-details>
                            <VRadio label="Combined (Fin + Main)" value="COMBINED" />
                            <VRadio label="Financial Only" value="FINANCIAL" />
                            <VRadio label="Maintenance Only" value="MAINTENANCE" />
                        </VRadioGroup>
                    </VCol>

                    <VCol cols="12">
                        <VCheckbox 
                            v-model="batchForm.consolidated" 
                            label="รวมทุก Schedule ของลูกค้าเดียวกันเป็น 1 ใบ (Consolidated)"
                            hide-details
                        />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField v-model="batchForm.invoiceDate" label="วันที่ออกใบแจ้งหนี้" type="date" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="batchForm.dueDate" label="วันครบกำหนดชำระ" type="date" />
                    </VCol>
                </VRow>

                <VDivider class="my-4" />
                
                <div class="text-subtitle-2 mb-2 font-weight-bold">Preview:</div>
                <div class="border rounded pa-4 bg-light">
                    <div class="d-flex justify-space-between mb-2">
                        <span>จำนวนลูกค้า (Total Lessees):</span>
                        <span class="font-weight-bold">1 ราย</span>
                    </div>
                    <div class="d-flex justify-space-between">
                        <span>จำนวนใบแจ้งหนี้ที่จะถูกสร้าง:</span>
                        <span class="text-h6 font-weight-bold text-primary">1 ใบ</span>
                    </div>
                </div>
            </VCardText>
            <VCardActions class="pa-4">
                <VSpacer />
                <VBtn variant="tonal" color="secondary" @click="isBatchDialogOpen = false">ยกเลิก</VBtn>
                <VBtn color="primary" variant="elevated" @click="confirmBatchGeneration">
                    ยืนยันออกใบแจ้งหนี้
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.bg-primary-dark {
    background: linear-gradient(135deg, #7367f0 0%, #4839eb 100%) !important;
}
.opacity-70 { opacity: 0.7; }
</style>
