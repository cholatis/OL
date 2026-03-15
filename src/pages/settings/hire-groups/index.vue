<script setup lang="ts">
import { useMasterDataStore } from '@/stores/masterData'
import { useRouter } from 'vue-router'

const masterDataStore = useMasterDataStore()
const router = useRouter()

const headers = [
  { title: 'CODE', key: 'code' },
  { title: 'DESCRIPTION', key: 'description' },
  { title: 'EXAMPLE MODELS', key: 'exampleModels' },
  { title: 'BASE REPAIRS (฿)', key: 'repairsTotal' },
  { title: 'STATUS', key: 'isActive' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const editHireGroup = (id: string) => {
  router.push(`/settings/hire-groups/${id}`)
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">Hire Group & Rates</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="editHireGroup('new')">
          สร้าง Hire Group ใหม่
        </VBtn>
      </VCol>
    </VRow>

    <VCard>
      <VDataTable
        :headers="headers"
        :items="masterDataStore.hireGroups"
        class="text-no-wrap"
      >
        <template #[`item.code`]="{ item }">
          <VChip color="primary" variant="tonal" class="font-weight-bold">GROUP {{ item.code }}</VChip>
        </template>

        <template #[`item.exampleModels`]="{ item }">
          <span class="text-body-2">{{ item.exampleModels.join(', ') }}</span>
        </template>

        <template #[`item.repairsTotal`]="{ item }">
          <span>{{ item.repairsTotal.toLocaleString() }} ฿</span>
        </template>

        <template #[`item.isActive`]="{ item }">
          <VChip :color="item.isActive ? 'success' : 'secondary'" size="small" label>
            {{ item.isActive ? 'ACTIVE' : 'INACTIVE' }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
          <VBtn icon variant="text" size="small" @click="editHireGroup(item.id)">
            <VIcon icon="tabler-edit" />
          </VBtn>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>
