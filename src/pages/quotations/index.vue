<script setup lang="ts">
import { useQuotationStore } from '@/stores/quotation'

const quotationStore = useQuotationStore()
const router = useRouter()

const searchQuery = ref('')
const selectedStatus = ref('ALL')

const filteredQuotations = computed(() => {
  return quotationStore.quotations.filter(q => {
    const matchesSearch = q.quotationNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         q.customerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = selectedStatus.value === 'ALL' || q.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})

const getStatusColor = (status: string) => {
  if (status === 'APPROVED') return 'success'
  if (status === 'PENDING') return 'warning'
  if (status === 'DRAFT') return 'secondary'
  if (status === 'REJECTED') return 'error'
  return 'info'
}

const headers = [
  { title: 'เลขที่ใบเสนอราคา', key: 'quotationNo' },
  { title: 'ลูกค้า', key: 'customerName' },
  { title: 'Asset / รุ่น', key: 'assetModel' },
  { title: 'ระยะเวลา (เดือน)', key: 'contractTermMonths' },
  { title: 'ค่าเช่ารวม (Inc. VAT)', key: 'totalRentalInclVat' },
  { title: 'RV (%)', key: 'residualValuePct' },
  { title: 'สถานะ', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const navigateToCreate = () => router.push('/quotations/new')
const navigateToEdit = (id: string) => router.push(`/quotations/${id}`)

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold italic">ใบเสนอราคา Operating Lease</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="navigateToCreate">
          สร้างใบเสนอราคา
        </VBtn>
      </VCol>
    </VRow>

    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="searchQuery"
              placeholder="ค้นหาเลขที่ หรือ ชื่อลูกค้า..."
              prepend-inner-icon="tabler-search"
              clearable
              hide-details
            />
          </VCol>
          <VCol cols="12" md="6">
            <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="['ALL', 'DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'CONVERTED']"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="headers"
        :items="filteredQuotations"
        class="text-no-wrap"
      >
        <template #[`item.quotationNo`]="{ item }">
          <span class="font-weight-medium text-primary cursor-pointer" @click="navigateToEdit(item.id)">
            {{ item.quotationNo }}
          </span>
        </template>

        <template #[`item.totalRentalInclVat`]="{ item }">
          <span class="font-weight-bold">{{ formatCurrency(item.totalRentalInclVat) }}</span>
        </template>

        <template #[`item.residualValuePct`]="{ item }">
          <span>{{ item.residualValuePct.toFixed(1) }}%</span>
        </template>

        <template #[`item.status`]="{ item }">
          <VChip :color="getStatusColor(item.status)" size="small" label elevated>
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
          <div @click.stop>
            <VBtn icon variant="text" size="small" color="medium-emphasis" @click="navigateToEdit(item.id)">
              <VIcon icon="tabler-edit" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="medium-emphasis">
              <VIcon icon="tabler-copy" title="Duplicate" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="primary" v-if="item.status === 'APPROVED'">
              <VIcon icon="tabler-file-contract" title="Convert to Contract" />
            </VBtn>
          </div>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
