<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEquipmentScheduleStore } from '@/stores/equipment-schedule'
import { useContractStore } from '@/stores/contract'

const scheduleStore = useEquipmentScheduleStore()
const contractStore = useContractStore()
const router = useRouter()

const searchQuery = ref('')
const selectedContract = ref<string | null>(null)
const selectedStatus = ref('ALL')

const filteredSchedules = computed(() => {
  return scheduleStore.schedules.filter(s => {
    const matchesSearch = s.scheduleNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         s.lesseeName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesContract = !selectedContract.value || s.contractId === selectedContract.value
    const matchesStatus = selectedStatus.value === 'ALL' || s.status === selectedStatus.value
    return matchesSearch && matchesContract && matchesStatus
  })
})

const headers = [
  { title: 'เลขที่ Schedule', key: 'scheduleNo' },
  { title: 'MLA / ลูกค้า', key: 'lesseeName' },
  { title: 'จำนวน ASSET', key: 'totalAssets', align: 'center' },
  { title: 'ค่าเช่ารวม/เดือน (Inc VAT)', key: 'totalRentalInclVat', align: 'right' },
  { title: 'ระยะเริ่ม → สิ้นสุด', key: 'period' },
  { title: 'สถานะ', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    DRAFT: 'secondary',
    ACTIVE: 'success',
    COMPLETED: 'info',
    CANCELLED: 'error',
  }
  return colors[status] || 'grey'
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const navigateToDetail = (id: string) => router.push(`/equipment-schedules/${id}`)
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">Equipment Schedule</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="navigateToDetail('new')">
          สร้าง Schedule ใหม่
        </VBtn>
      </VCol>
    </VRow>

    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQuery"
              placeholder="เลขที่ Schedule / ลูกค้า..."
              prepend-inner-icon="tabler-search"
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VAutocomplete
              v-model="selectedContract"
              label="ค้นหาตาม MLA"
              :items="contractStore.contracts"
              item-title="contractNo"
              item-value="id"
              clearable
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="[
                { title: 'ทั้งหมด', value: 'ALL' },
                { title: 'DRAFT', value: 'DRAFT' },
                { title: 'ACTIVE', value: 'ACTIVE' },
                { title: 'COMPLETED', value: 'COMPLETED' },
                { title: 'CANCELLED', value: 'CANCELLED' }
              ]"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="(headers as any)"
        :items="filteredSchedules"
        class="text-no-wrap"
      >
        <template #[`item.scheduleNo`]="{ item }: any">
          <span class="font-weight-medium text-primary cursor-pointer" @click="navigateToDetail(item.id)">
            {{ item.scheduleNo }}
          </span>
        </template>

        <template #[`item.lesseeName`]="{ item }: any">
          <div class="d-flex flex-column">
            <span class="font-weight-medium">{{ item.lesseeName }}</span>
            <span class="text-caption">MLA: {{ item.contractNo }}</span>
          </div>
        </template>

        <template #[`item.totalRentalInclVat`]="{ item }: any">
          <span class="font-weight-bold">{{ formatCurrency(item.totalRentalInclVat) }}</span>
        </template>

        <template #[`item.period`]="{ item }: any">
          <span class="text-caption">{{ item.commencementDate }} → {{ item.expiryDate }}</span>
        </template>

        <template #[`item.status`]="{ item }: any">
          <VChip :color="getStatusColor(item.status)" size="small" label>
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }: any">
          <VBtn icon variant="text" size="small" @click="navigateToDetail(item.id)">
            <VIcon icon="tabler-edit" />
          </VBtn>
          <VBtn icon variant="text" size="small">
            <VIcon icon="tabler-copy" />
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
</style>
