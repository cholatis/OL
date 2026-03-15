<script setup lang="ts">
import { useAccountingStore } from '@/stores/accounting'

const accountingStore = useAccountingStore()

const getGapColor = (gap: number) => {
  return gap < 0 ? 'error' : 'success'
}

const headers = [
  { title: 'Contract', key: 'contractId' },
  { title: 'Asset', key: 'assetName' },
  { title: 'Original RV', key: 'originalRV', align: 'end' },
  { title: 'RV %', key: 'originalRVRate', align: 'end' },
  { title: 'Book Value (NBV)', key: 'currentBookValue', align: 'end' },
  { title: 'Market Value', key: 'marketValue', align: 'end' },
  { title: 'Gap', key: 'rvGainLoss', align: 'end' },
  { title: 'Expiry', key: 'expiryDate' },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Residual Value (RV) Management & Risk Tracking">
        <template #append>
            <VBtn prepend-icon="tabler-chart-line" variant="tonal" size="small">
                Market Value Trends
            </VBtn>
        </template>
        
        <VDataTable
          :headers="headers"
          :items="accountingStore.rvRecords"
          density="compact"
        >
          <template #item.originalRV="{ value }">
            {{ value.toLocaleString() }} ฿
          </template>

          <template #item.originalRVRate="{ value }">
            {{ value }}%
          </template>

          <template #item.currentBookValue="{ value }">
            {{ value.toLocaleString() }} ฿
          </template>

          <template #item.marketValue="{ value }">
            <span class="font-weight-medium">{{ value?.toLocaleString() || '-' }} ฿</span>
          </template>

          <template #item.rvGainLoss="{ value }">
            <VChip :color="getGapColor(value)" size="x-small" variant="tonal">
              {{ value > 0 ? '+' : '' }}{{ value.toLocaleString() }} ฿
            </VChip>
          </template>

          <template #item.actions="{ item }">
            <VBtn
                icon="tabler-adjustments"
                variant="text"
                size="small"
                color="info"
                title="Adjust RV"
            />
            <VBtn
                icon="tabler-external-link"
                variant="text"
                size="small"
                title="Send to Remarketing"
            />
          </template>
        </VDataTable>
      </VCard>
    </VCol>

    <VCol cols="12" md="6">
        <VCard title="Residual Value Risk Analysis">
            <VCardText>
                 <div class="d-flex flex-column gap-6">
                    <div>
                        <div class="d-flex justify-space-between mb-2">
                            <span class="text-body-2">Portfolio RV Concentration (Trucks/Pickups)</span>
                            <span class="text-caption">65% of Total RV</span>
                        </div>
                        <VProgressLinear model-value="65" color="primary" height="8" rounded />
                    </div>
                    <div>
                        <div class="d-flex justify-space-between mb-2">
                            <span class="text-body-2">Avg. Gap to Market (All Fleet)</span>
                            <span class="text-caption text-error">-2.5%</span>
                        </div>
                        <VProgressLinear model-value="97.5" color="error" height="8" rounded />
                    </div>
                 </div>
            </VCardText>
        </VCard>
    </VCol>

    <VCol cols="12" md="6">
        <VCard title="RV Adjustment Log (Recent)">
            <VList density="compact">
                <VListItem>
                    <template #prepend>
                        <VAvatar color="warning" variant="tonal" size="32" class="me-3">
                            <VIcon icon="tabler-alert-triangle" size="18" />
                        </VAvatar>
                    </template>
                    <VListItemTitle>RV Adjustment: MLA-001</VListItemTitle>
                    <VListItemSubtitle>Adjusted -30,000 THB due to extreme mileage (180k km)</VListItemSubtitle>
                    <template #append>
                        <span class="text-caption">2 days ago</span>
                    </template>
                </VListItem>
            </VList>
        </VCard>
    </VCol>
  </VRow>
</template>
