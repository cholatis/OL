<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContractStore } from '@/stores/contract'

const contractStore = useContractStore()
const router = useRouter()

const searchQuery = ref('')
const selectedStatus = ref<string[]>([])
const expiryFilter = ref('ALL')

const statusOptions = [
  { title: 'DRAFT', value: 'DRAFT' },
  { title: 'PENDING', value: 'PENDING_APPROVAL' },
  { title: 'APPROVED', value: 'APPROVED' },
  { title: 'ACTIVE', value: 'ACTIVE' },
  { title: 'EXPIRED', value: 'EXPIRED' },
  { title: 'TERMINATED', value: 'TERMINATED' },
]

const filteredContracts = computed(() => {
  return contractStore.contracts.filter(c => {
    const matchesSearch = c.contractNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         c.lesseeName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value.length === 0 || selectedStatus.value.includes(c.status)
    
    // Simplistic expiry filter mock
    let matchesExpiry = true
    if (expiryFilter.value !== 'ALL') {
        const days = parseInt(expiryFilter.value)
        const today = new Date()
        const targetDate = new Date()
        targetDate.setDate(today.getDate() + days)
        matchesExpiry = new Date(c.expiryDate) <= targetDate && new Date(c.expiryDate) >= today
    }

    return matchesSearch && matchesStatus && matchesExpiry
  })
})

const summaryStats = computed(() => {
    return [
        { title: 'ACTIVE', count: contractStore.activeContracts.length, color: 'success', icon: 'tabler-check' },
        { title: 'หมดอายุใน 90 วัน', count: contractStore.expiringWithin90Days.length, color: 'warning', icon: 'tabler-clock' },
        { title: 'Pending Approval', count: contractStore.pendingContracts.length, color: 'orange', icon: 'tabler-clipboard-check' },
        { title: 'Fleet Credit Used', count: '฿19.6M', color: 'primary', icon: 'tabler-chart-pie' }, // Mock stat
    ]
})

const headers = [
  { title: 'เลขที่สัญญา / วันที่', key: 'contractNo' },
  { title: 'ลูกค้า', key: 'lesseeName' },
  { title: 'SCHEDULES', key: 'equipmentSchedules', align: 'center' },
  { title: 'ค่าเช่ารวม (Inc VAT)', key: 'totalRent', align: 'right' },
  { title: 'ระยะเวลาสัญญา', key: 'period' },
  { title: 'สถานะ', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    DRAFT: 'secondary',
    PENDING_APPROVAL: 'orange',
    APPROVED: 'info',
    ACTIVE: 'success',
    SUSPENDED: 'warning',
    EXPIRED: 'error',
    TERMINATED: 'grey'
  }
  return colors[status] || 'grey'
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const navigateToDetail = (id: string) => router.push(`/contracts/${id}`)
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">Master Lease Agreement</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="navigateToDetail('new')">
          สร้างสัญญาใหม่
        </VBtn>
      </VCol>
    </VRow>

    <!-- Summary Stats -->
    <VRow class="mb-6">
      <VCol v-for="stat in summaryStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard variant="flat" border>
          <VCardText class="d-flex align-center">
            <VAvatar :color="stat.color" variant="tonal" rounded size="42" class="me-4">
              <VIcon :icon="stat.icon" size="24" />
            </VAvatar>
            <div>
              <div class="text-caption">{{ stat.title }}</div>
              <div class="text-h5 font-weight-bold">{{ stat.count }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Filters -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQuery"
              placeholder="เลขสัญญา / ชื่อลูกค้า..."
              prepend-inner-icon="tabler-search"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="5">
            <VChipGroup v-model="selectedStatus" multiple column selected-class="text-primary border-primary">
              <VChip
                v-for="opt in statusOptions"
                :key="opt.value"
                :value="opt.value"
                variant="outlined"
                size="small"
                filter
              >
                {{ opt.title }}
              </VChip>
            </VChipGroup>
          </VCol>
          <VCol cols="12" md="3">
             <VSelect
                v-model="expiryFilter"
                label="ตัวกรองวันหมดอายุ"
                :items="[
                    { title: 'ทั้งหมด', value: 'ALL' },
                    { title: 'ใน 30 วัน', value: '30' },
                    { title: 'ใน 60 วัน', value: '60' },
                    { title: 'ใน 90 วัน', value: '90' }
                ]"
                hide-details
                density="compact"
             />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="(headers as any)"
        :items="filteredContracts"
        class="text-no-wrap"
      >
        <template #[`item.contractNo`]="{ item }: any">
          <div class="d-flex flex-column">
            <span class="font-weight-medium text-primary cursor-pointer" @click="navigateToDetail(item.id)">
              {{ item.contractNo }}
            </span>
            <span class="text-caption">{{ item.contractDate }}</span>
          </div>
        </template>

        <template #[`item.lesseeName`]="{ item }: any">
          <div class="d-flex flex-column">
            <span class="text-truncate" style="max-width: 250px;">{{ item.lesseeName }}</span>
            <span class="text-caption">Tax ID: {{ item.lesseeTaxId }}</span>
          </div>
        </template>

        <template #[`item.equipmentSchedules`]="{ item }: any">
           <VAvatar size="28" color="primary" variant="tonal">
             <span class="text-caption">{{ item.equipmentSchedules.length }}</span>
           </VAvatar>
        </template>

        <template #[`item.totalRent`]="{ item }: any">
           <span class="font-weight-bold">{{ formatCurrency(125000) }}</span> 
           <!-- Mock total rent calculated from schedules -->
        </template>

        <template #[`item.period`]="{ item }: any">
           <div class="d-flex flex-column" style="min-width: 150px;">
              <span class="text-caption">{{ item.commencementDate }} ถึง {{ item.expiryDate }}</span>
              <VProgressLinear
                 model-value="65"
                 height="6"
                 rounded
                 color="primary"
                 class="mt-1"
              />
           </div>
        </template>

        <template #[`item.status`]="{ item }: any">
          <VChip :color="getStatusColor(item.status)" size="small" label class="text-uppercase">
            {{ item.status?.replace('_', ' ') }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }: any">
            <VBtn icon variant="text" size="small" @click="navigateToDetail(item.id)">
              <VIcon icon="tabler-edit" />
            </VBtn>
            <VBtn icon variant="text" size="small">
              <VIcon icon="tabler-plus" title="เพิ่ม Schedule" />
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
