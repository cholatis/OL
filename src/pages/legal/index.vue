<script setup lang="ts">
import { useCreditStore } from '@/stores/credit'

const creditStore = useCreditStore()

const getStageColor = (stage: string) => {
  if (stage.startsWith('WARNING')) return 'warning'
  if (stage === 'DEMAND_LETTER') return 'orange'
  if (stage === 'LEGAL_FILING' || stage === 'COURT_PROCESS') return 'error'
  if (stage === 'ASSET_SEIZED') return 'deep-purple'
  if (stage === 'COMPLETED') return 'success'
  return 'secondary'
}

const headers = [
  { title: 'Case ID', key: 'id' },
  { title: 'Customer', key: 'customerName' },
  { title: 'Contract', key: 'contractNo' },
  { title: 'Current Stage', key: 'currentStage' },
  { title: 'Claim Amount (฿)', key: 'claimAmount', align: 'end' },
  { title: 'Start Date', key: 'startDate' },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Legal Cases & Asset Seizure Tracking">
        <VDataTable
          :headers="headers"
          :items="creditStore.legalCases"
          density="compact"
        >
          <template #item.customerName="{ item }">
            <div class="d-flex flex-column">
              <span class="font-weight-medium text-body-1">{{ item.customerName }}</span>
              <span class="text-caption text-disabled">{{ item.customerId }}</span>
            </div>
          </template>

          <template #item.currentStage="{ item }">
            <VChip :color="getStageColor(item.currentStage)" size="x-small">
              {{ item.currentStage.replace('_', ' ') }}
            </VChip>
          </template>

          <template #item.claimAmount="{ item }">
            {{ item.claimAmount.toLocaleString() }} ฿
          </template>

          <template #item.actions="{ item }">
            <VBtn
              icon="tabler-eye"
              variant="text"
              size="small"
              :to="{ name: 'legal-id', params: { id: item.id } }"
            />
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
