<script setup lang="ts">
import { useSalesStore } from '@/stores/sales'
import { computed } from 'vue'

const salesStore = useSalesStore()

const stages = ['PROSPECT', 'QUALIFIED', 'QUOTATION', 'NEGOTIATION', 'WON', 'LOST'] as const

const getOpportunitiesByStage = (stage: string) => {
  return salesStore.opportunities.filter(o => o.stage === stage)
}

const getProbabilityColor = (prob: number) => {
  if (prob >= 70) return 'success'
  if (prob >= 40) return 'warning'
  return 'error'
}

const stats = computed(() => [
  { title: 'Total Open Pipeline', value: `฿${(salesStore.pipelineStats.totalValue / 1000000).toFixed(1)}M`, icon: 'tabler-chart-bar', color: 'primary' },
  { title: 'Weighted Pipeline', value: `฿${(salesStore.pipelineStats.weightedValue / 1000000).toFixed(1)}M`, icon: 'tabler-scale', color: 'info' },
  { title: 'Open Deals', value: salesStore.pipelineStats.count, icon: 'tabler-target', color: 'warning' },
  { title: 'Won MTD', value: salesStore.pipelineStats.wonMTD, icon: 'tabler-trophy', color: 'success' },
])
</script>

<template>
  <div>
    <!-- Summary Header -->
    <VRow class="mb-6">
      <VCol v-for="stat in stats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText class="d-flex align-center">
            <VAvatar :color="stat.color" variant="tonal" rounded size="42" class="me-4">
              <VIcon :icon="stat.icon" />
            </VAvatar>
            <div>
              <div class="text-h6 font-weight-bold">{{ stat.value }}</div>
              <div class="text-caption text-no-wrap">{{ stat.title }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <div class="d-flex justify-space-between align-center mb-6">
      <h3 class="text-h4 font-weight-bold">Sales Pipeline</h3>
      <div class="d-flex gap-2">
        <VBtn color="primary" prepend-icon="tabler-plus">New Opportunity</VBtn>
        <VBtn variant="tonal" color="secondary" prepend-icon="tabler-filter">Filters</VBtn>
      </div>
    </div>

    <!-- Kanban Board -->
    <div class="kanban-wrapper pb-6">
      <div class="d-flex gap-4 kanban-container">
        <div v-for="stage in stages" :key="stage" class="kanban-column">
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="d-flex align-center gap-2">
              <span class="text-subtitle-1 font-weight-bold">{{ stage }}</span>
              <VChip size="x-small" label>{{ getOpportunitiesByStage(stage).length }}</VChip>
            </div>
          </div>

          <div class="kanban-cards d-flex flex-column gap-3">
            <VCard 
              v-for="opp in getOpportunitiesByStage(stage)" 
              :key="opp.opportunityId" 
              class="opportunity-card cursor-pointer"
              :to="`/sales/pipeline/${opp.opportunityId}`"
            >
              <VCardText class="pa-4">
                <div class="d-flex justify-space-between align-start mb-2">
                  <div class="font-weight-bold text-truncate" style="max-width: 150px;">
                    {{ opp.prospectName || 'Customer ID: ' + opp.customerId }}
                  </div>
                  <VChip :color="getProbabilityColor(opp.winProbability)" size="x-small" label>
                    {{ opp.winProbability }}%
                  </VChip>
                </div>
                
                <div class="text-body-2 mb-3 text-secondary">{{ opp.vehicleType }} (x{{ opp.estimatedFleetSize }})</div>
                
                <div class="d-flex justify-space-between align-center">
                  <div class="text-primary font-weight-bold">฿{{ (opp.estimatedValue / 1000000).toFixed(1) }}M</div>
                  <div class="d-flex align-center gap-2">
                     <span class="text-caption text-secondary">{{ new Date(opp.estimatedCloseDate).toLocaleDateString() }}</span>
                     <VAvatar size="24" color="primary">
                       <span class="text-xxs">{{ opp.assignedSalesperson.charAt(0) }}</span>
                     </VAvatar>
                  </div>
                </div>
              </VCardText>
            </VCard>
            
            <div v-if="getOpportunitiesByStage(stage).length === 0" class="empty-stage pa-10 text-center border-dashed rounded">
              <VIcon icon="tabler-plus" color="secondary" size="20" class="mb-1" />
              <div class="text-caption text-secondary">No deals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-wrapper {
  overflow-x: auto;
  min-height: calc(100vh - 350px);
}
.kanban-container {
  min-width: 1200px;
}
.kanban-column {
  width: 250px;
  flex-shrink: 0;
  background-color: rgba(var(--v-theme-on-surface), 0.03);
  padding: 12px;
  border-radius: 8px;
}
.opportunity-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.border-dashed { border: 2px dashed rgba(var(--v-theme-on-surface), 0.1); }
.text-xxs { font-size: 10px; }
</style>
