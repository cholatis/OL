<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMaintenanceStore } from '@/stores/maintenance'

const maintenanceStore = useMaintenanceStore()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('ALL')

const filteredPlans = computed(() => {
  return maintenanceStore.pmPlans.filter(p => {
    const matchesSearch = p.planName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         p.planCode.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'ALL' || p.assetCategory === selectedCategory.category
    return matchesSearch && matchesCategory
  })
})

const headers = [
  { title: 'CODE / NAME', key: 'planCode' },
  { title: 'CATEGORY', key: 'assetCategory' },
  { title: 'INTERVAL', key: 'intervalMonths' },
  { title: 'CHECKLIST', key: 'checklistItems' },
  { title: 'EST. COST', key: 'estimatedCost' },
  { title: 'ASSETS', key: 'activeAssetCount' },
  { title: 'STATUS', key: 'isActive' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const nagivateToDetail = (id: string) => router.push(`/pm-plans/${id}`)
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">PM Plans (แผนบำรุงรักษา)</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="router.push('/pm-plans/new')">
          สร้างแผน PM ใหม่
        </VBtn>
      </VCol>
    </VRow>

    <VCard>
      <VCardText>
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="searchQuery"
              placeholder="ค้นหาชื่อแผน / รหัสแผน..."
              prepend-inner-icon="tabler-search"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="6">
            <VSelect
              v-model="selectedCategory"
              label="Asset Category"
              :items="['ALL', 'SEDAN', 'SUV', 'EQUIPMENT', 'VAN']"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="headers"
        :items="filteredPlans"
        class="text-no-wrap"
      >
        <template #[`item.planCode`]="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-bold text-primary cursor-pointer" @click="nagivateToDetail(item.id)">
              {{ item.planCode }}
            </span>
            <span class="text-body-2 font-weight-medium">{{ item.planName }}</span>
          </div>
        </template>

        <template #[`item.checklistItems`]="{ item }">
            <div class="d-flex align-center">
                <VIcon icon="tabler-list-check" size="18" class="me-1 opacity-50" />
                <span>{{ item.checklistTemplate.length }} รายการ</span>
            </div>
        </template>

        <template #[`item.intervalMonths`]="{ item }">
            <VChip size="small" variant="tonal" color="primary">ทุก {{ item.intervalMonths }} เดือน</VChip>
        </template>

        <template #[`item.estimatedCost`]="{ item }">
            <span>฿{{ item.estimatedCost.toLocaleString() }}</span>
        </template>

        <template #[`item.isActive`]="{ item }">
            <VSwitch :model-value="item.isActive" color="success" hide-details readonly density="compact" />
        </template>

        <template #[`item.actions`]="{ item }">
          <VBtn icon variant="text" size="small" @click="nagivateToDetail(item.id)">
            <VIcon icon="tabler-edit" />
          </VBtn>
          <VBtn icon variant="text" size="small" color="secondary">
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
