<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMaintenanceStore } from '@/stores/maintenance'

const maintenanceStore = useMaintenanceStore()
const router = useRouter()

const searchQuery = ref('')
const selectedType = ref('ALL')
const selectedStatus = ref('ALL')

const summaryStats = computed(() => {
  return [
    { title: 'OPEN', count: maintenanceStore.workOrders.filter(w => w.status === 'OPEN').length, color: 'primary', icon: 'tabler-inbox' },
    { title: 'IN PROGRESS', count: maintenanceStore.workOrders.filter(w => w.status === 'IN_PROGRESS').length, color: 'info', icon: 'tabler-tool' },
    { title: 'PENDING PARTS', count: maintenanceStore.workOrders.filter(w => w.status === 'PENDING_PARTS').length, color: 'warning', icon: 'tabler-settings-automation' },
    { title: 'DUE TODAY', count: 2, color: 'error', icon: 'tabler-alert-circle' },
  ]
})

const filteredWorkOrders = computed(() => {
  return maintenanceStore.workOrders.filter(w => {
    const matchesSearch = w.workOrderNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         w.assetModel.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         w.lesseeName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === 'ALL' || w.type === selectedType.value
    const matchesStatus = selectedStatus.value === 'ALL' || w.status === selectedStatus.value
    return matchesSearch && matchesType && matchesStatus
  })
})

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    CRITICAL: 'error',
    HIGH: 'warning',
    MEDIUM: 'info',
    LOW: 'secondary'
  }
  return colors[priority] || 'secondary'
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    OPEN: 'secondary',
    ASSIGNED: 'primary',
    IN_PROGRESS: 'info',
    PENDING_PARTS: 'warning',
    COMPLETED: 'success',
    CANCELLED: 'grey'
  }
  return colors[status] || 'grey'
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    PM: 'primary',
    CM: 'warning',
    EMERGENCY: 'error',
    INSPECTION: 'info'
  }
  return colors[type] || 'secondary'
}

const headers = [
  { title: 'เลขที่ WO / ความสำคัญ', key: 'workOrderNo', width: '200px' },
  { title: 'ประเภท', key: 'type', width: '120px' },
  { title: 'Asset / ทรัพย์สิน', key: 'assetModel' },
  { title: 'ลูกค้า / สถานที่', key: 'lesseeName' },
  { title: 'กำหนดการ', key: 'scheduledDate' },
  { title: 'ช่างรับผิดชอบ', key: 'technicianName' },
  { title: 'สถานะ', key: 'status', width: '150px' },
  { title: 'Actions', key: 'actions', sortable: false, width: '100px' },
]

const navigateToDetail = (id: string) => router.push(`/work-orders/${id}`)
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">Work Orders (ใบสั่งซ่อม)</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="router.push('/work-orders/new')">
          สร้างใบสั่งซ่อม
        </VBtn>
      </VCol>
    </VRow>

    <!-- Summary Stats -->
    <VRow class="mb-6">
      <VCol v-for="stat in summaryStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText class="d-flex align-center">
            <VAvatar :color="stat.color" variant="tonal" size="48" class="me-4">
              <VIcon :icon="stat.icon" size="28" />
            </VAvatar>
            <div>
              <div class="text-caption text-uppercase">{{ stat.title }}</div>
              <div class="text-h4 font-weight-bold">{{ stat.count }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VCard>
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQuery"
              placeholder="ค้นหาเลข WO / รุ่น / ลูกค้า..."
              prepend-inner-icon="tabler-search"
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect
              v-model="selectedType"
              label="ประเภทงาน"
              :items="['ALL', 'PM', 'CM', 'EMERGENCY', 'INSPECTION']"
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="['ALL', 'OPEN', 'ASSIGNED', 'IN_PROGRESS', 'PENDING_PARTS', 'COMPLETED']"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="headers"
        :items="filteredWorkOrders"
        class="text-no-wrap"
      >
        <template #[`item.workOrderNo`]="{ item }">
          <div class="d-flex align-center">
            <div 
              :style="{ backgroundColor: `shadow-color(${getPriorityColor(item.priority)})` }" 
              class="priority-dot me-2"
              :class="`bg-${getPriorityColor(item.priority)}`"
            ></div>
            <div class="d-flex flex-column">
              <span class="font-weight-bold text-primary cursor-pointer" @click="navigateToDetail(item.id)">
                {{ item.workOrderNo }}
              </span>
              <span class="text-caption text-uppercase font-weight-medium" :class="`text-${getPriorityColor(item.priority)}`">
                {{ item.priority }}
              </span>
            </div>
          </div>
        </template>

        <template #[`item.type`]="{ item }">
          <VChip :color="getTypeColor(item.type)" size="x-small" variant="flat">
            {{ item.type }}
          </VChip>
        </template>

        <template #[`item.assetModel`]="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium">{{ item.assetModel }}</span>
            <span class="text-caption">SN: {{ item.serialNumber }}</span>
          </div>
        </template>

        <template #[`item.lesseeName`]="{ item }">
          <div class="d-flex flex-column">
            <span class="text-truncate" style="max-width: 200px;">{{ item.lesseeName }}</span>
            <span class="text-caption opacity-70">{{ item.siteAddress }}</span>
          </div>
        </template>

        <template #[`item.scheduledDate`]="{ item }">
          <div class="d-flex flex-column">
            <span>{{ item.scheduledDate }}</span>
            <span class="text-caption text-medium-emphasis">{{ item.scheduledTimeSlot }}</span>
          </div>
        </template>

        <template #[`item.status`]="{ item }">
          <VChip :color="getStatusColor(item.status)" size="small" label class="text-uppercase font-weight-bold">
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
          <VBtn icon variant="text" size="small" @click="navigateToDetail(item.id)">
            <VIcon icon="tabler-eye" />
          </VBtn>
          <VBtn icon variant="text" size="small">
            <VIcon icon="tabler-edit" />
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

.priority-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(var(--v-theme-surface), 1);
}
</style>
