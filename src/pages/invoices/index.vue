<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBillingStore } from '@/stores/billing'
import { useInvoicePrint } from '@/composables/useInvoicePrint'

const billingStore = useBillingStore()
const router = useRouter()
const { printInvoice } = useInvoicePrint()

const searchQuery = ref('')
const selectedType = ref('ALL')
const selectedStatus = ref('ALL')

const filteredInvoices = computed(() => {
  return billingStore.invoices.filter(i => {
    const matchesSearch = i.invoiceNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         i.lesseeName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         i.contractNo.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === 'ALL' || i.invoiceType === selectedType.value
    const matchesStatus = selectedStatus.value === 'ALL' || i.status === selectedStatus.value
    return matchesSearch && matchesType && matchesStatus
  })
})

const agingSummary = computed(() => {
    return [
        { title: 'ยังไม่ถึงกำหนด', count: 12, amount: 450000, color: 'primary' },
        { title: 'เกิน 1-30 วัน', count: 3, amount: 82000, color: 'warning' },
        { title: 'เกิน 31-60 วัน', count: 1, amount: 27000, color: 'orange' },
        { title: 'เกิน 60+ วัน', count: 2, amount: 54000, color: 'error' },
    ]
})

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    ISSUED: 'info',
    SENT: 'primary',
    PAID: 'success',
    OVERDUE: 'error',
    DRAFT: 'secondary',
    CANCELLED: 'grey'
  }
  return colors[status] || 'grey'
}

const getTypeColor = (type: string) => {
    if (type === 'FINANCIAL') return 'info'
    if (type === 'MAINTENANCE') return 'success'
    return 'primary'
}

const headers = [
  { title: 'เลขที่ใบแจ้งหนี้', key: 'invoiceNo' },
  { title: 'ประเภท', key: 'invoiceType' },
  { title: 'ลูกค้า / สัญญา', key: 'lesseeName' },
  { title: 'วันที่ออก', key: 'invoiceDate' },
  { title: 'วันครบกำหนด', key: 'dueDate' },
  { title: 'ยอดรวม (Inc VAT)', key: 'totalAmount' },
  { title: 'สถานะ', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const navigateToDetail = (id: string) => router.push(`/invoices/${id}`)
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">ใบแจ้งหนี้ (Invoices)</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="router.push('/lease-schedules')">
          ออกใบแจ้งหนี้ใหม่
        </VBtn>
      </VCol>
    </VRow>

    <!-- Aging Summary Cards -->
    <VRow class="mb-6">
      <VCol v-for="item in agingSummary" :key="item.title" cols="12" sm="6" md="3">
        <VCard :border="`${item.color} opacity-50`" class="border-s-4">
          <VCardText>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-caption">{{ item.title }}</div>
                <div class="text-h5 font-weight-bold mt-1">{{ formatCurrency(item.amount) }}</div>
                <div class="text-caption text-medium-emphasis">{{ item.count }} ใบ</div>
              </div>
              <VAvatar :color="item.color" variant="tonal" size="42">
                <VIcon icon="tabler-clock" size="24" />
              </VAvatar>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQuery"
              placeholder="เลขที่ / ลูกค้า / สัญญา..."
              prepend-inner-icon="tabler-search"
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
             <VSelect
              v-model="selectedType"
              label="ประเภทใบแจ้งหนี้"
              :items="['ALL', 'FINANCIAL', 'MAINTENANCE', 'COMBINED']"
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="['ALL', 'ISSUED', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED']"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="headers"
        :items="filteredInvoices"
        class="text-no-wrap"
      >
        <template #[`item.invoiceNo`]="{ item }">
          <span class="font-weight-medium text-primary cursor-pointer" @click="navigateToDetail(item.id)">
            {{ item.invoiceNo }}
          </span>
        </template>

        <template #[`item.invoiceType`]="{ item }">
          <VChip :color="getTypeColor(item.invoiceType)" size="x-small" variant="flat">
            {{ item.invoiceType }}
          </VChip>
        </template>

        <template #[`item.lesseeName`]="{ item }">
          <div class="d-flex flex-column">
            <span class="text-truncate" style="max-width: 250px;">{{ item.lesseeName }}</span>
            <span class="text-caption">Ref: {{ item.contractNo }}</span>
          </div>
        </template>

        <template #[`item.totalAmount`]="{ item }">
          <div class="d-flex flex-column text-right">
            <span class="font-weight-bold">{{ formatCurrency(item.totalAmount) }}</span>
            <span class="text-caption">WHT: {{ formatCurrency(item.withholdingTax) }}</span>
          </div>
        </template>

        <template #[`item.status`]="{ item }">
          <VChip :color="getStatusColor(item.status)" size="small" label>
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
            <VBtn icon variant="text" size="small" @click="navigateToDetail(item.id)">
              <VIcon icon="tabler-eye" />
            </VBtn>
            <VBtn icon variant="text" size="small" @click="printInvoice(item.id)">
              <VIcon icon="tabler-printer" />
            </VBtn>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.border-s-4 {
    border-inline-start-width: 4px !important;
}
</style>
