<script setup lang="ts">
import { useMasterDataStore } from '@/stores/masterData'
import { useRouter } from 'vue-router'

const masterDataStore = useMasterDataStore()
const router = useRouter()

const headers = [
  { title: 'CODE', key: 'code' },
  { title: 'DESCRIPTION', key: 'description' },
  { title: 'SERVICES INCLUDED', key: 'services' },
  { title: 'ADMIN COST/M', key: 'adminCostMonthly' },
  { title: 'TOTAL LABOR/M', key: 'totalLabor' },
  { title: 'STATUS', key: 'isActive' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const getLaborTotal = (item: any) => {
    return item.laborInsuranceMonthly + item.laborMaintenanceMonthly + 
           item.laborReliefMonthly + item.laborProcurementMonthly + 
           item.laborRoadsideMonthly
}

const editPack = (id: string) => {
  router.push(`/settings/maintenance-packs/${id}`)
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">Maintenance Packs</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="editPack('new')">
          สร้าง Pack ใหม่
        </VBtn>
      </VCol>
    </VRow>

    <VCard>
      <VDataTable
        :headers="headers"
        :items="masterDataStore.maintenancePacks"
        class="text-no-wrap"
      >
        <template #[`item.code`]="{ item }">
          <VChip color="info" variant="tonal" class="font-weight-bold">{{ item.code }}</VChip>
        </template>

        <template #[`item.services`]="{ item }">
          <div class="d-flex gap-1">
            <VIcon v-if="item.includesRepairs" icon="tabler-tool" size="18" title="Repairs" color="primary" />
            <VIcon v-if="item.includesServicing" icon="tabler-settings" size="18" title="Servicing" color="primary" />
            <VIcon v-if="item.includesTyres" icon="tabler-circle-dotted" size="18" title="Tyres" color="primary" />
            <VIcon v-if="item.includesRelief" icon="tabler-car" size="18" title="Relief Car" color="primary" />
          </div>
        </template>

        <template #[`item.adminCostMonthly`]="{ item }">
          <span>{{ item.adminCostMonthly.toLocaleString() }} ฿</span>
        </template>

        <template #[`item.totalLabor`]="{ item }">
          <span>{{ getLaborTotal(item).toLocaleString() }} ฿</span>
        </template>

        <template #[`item.isActive`]="{ item }">
          <VSwitch :model-value="item.isActive" color="success" density="compact" readonly hide-details />
        </template>

        <template #[`item.actions`]="{ item }">
          <VBtn icon variant="text" size="small" @click="editPack(item.id)">
            <VIcon icon="tabler-edit" />
          </VBtn>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>
