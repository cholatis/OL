<script setup lang="ts">
import { useCreditStore } from '@/stores/credit'

const creditStore = useCreditStore()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'RECEIVED': return 'success'
    case 'PENDING': return 'warning'
    case 'SUBMITTED': return 'info'
    case 'FAILED': return 'error'
    default: return 'secondary'
  }
}

const headers = [
  { title: 'Inquiry ID', key: 'id' },
  { title: 'Customer', key: 'customerName' },
  { title: 'Date', key: 'requestDate' },
  { title: 'Type', key: 'requestType' },
  { title: 'Status', key: 'status' },
  { title: 'NCB Score', key: 'result.score' },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="NCB Inquiry Tracking">
        <template #append>
          <VBtn prepend-icon="tabler-plus" color="primary">
            New NCB Request
          </VBtn>
        </template>

        <VDataTable
          :headers="headers"
          :items="creditStore.ncbRequests"
          density="compact"
        >
          <template #item.customerName="{ item }">
            <div class="d-flex flex-column">
              <span class="font-weight-medium text-body-1">{{ item.customerName }}</span>
              <span class="text-caption text-disabled">{{ item.customerId }}</span>
            </div>
          </template>

          <template #item.status="{ item }">
            <VChip :color="getStatusColor(item.status)" size="x-small">
              {{ item.status }}
            </VChip>
          </template>

          <template #item.result.score="{ item }">
            <div v-if="item.result" class="d-flex align-center gap-2">
                <span class="font-weight-bold">{{ item.result.score }}</span>
                <span class="text-caption text-disabled">(Grade A)</span>
            </div>
            <span v-else>-</span>
          </template>

          <template #item.actions="{ item }">
            <VBtn
              icon="tabler-file-download"
              variant="text"
              size="small"
              color="info"
              :disabled="item.status !== 'RECEIVED'"
            />
             <VBtn
              icon="tabler-eye"
              variant="text"
              size="small"
            />
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
