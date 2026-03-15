<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingStore } from '@/stores/accounting'
import VueApexCharts from 'vue3-apexcharts'

const accountingStore = useAccountingStore()

const stageStats = computed(() => {
  const counts = { STAGE1: 0, STAGE2: 0, STAGE3: 0 }
  const amounts = { STAGE1: 0, STAGE2: 0, STAGE3: 0 }
  
  accountingStore.tfrs9Assessments.forEach(a => {
    counts[a.currentStage]++
    amounts[a.currentStage] += a.ecl.ead
  })
  
  return { counts, amounts }
})

const chartOptions = {
  labels: ['Stage 1 (Normal)', 'Stage 2 (Underperforming)', 'Stage 3 (Impaired)'],
  colors: ['#28c76f', '#ff9f43', '#ea5455'],
  legend: { position: 'bottom' },
  dataLabels: { enabled: false }
}

const chartSeries = computed(() => [
  stageStats.value.amounts.STAGE1,
  stageStats.value.amounts.STAGE2,
  stageStats.value.amounts.STAGE3
])

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'STAGE1': return 'success'
    case 'STAGE2': return 'warning'
    case 'STAGE3': return 'error'
    default: return 'secondary'
  }
}

const headers = [
  { title: 'Contract', key: 'contractId' },
  { title: 'Customer', key: 'customerName' },
  { title: 'Exposure (EAD)', key: 'ecl.ead', align: 'end' },
  { title: 'DPD', key: 'stagingCriteria.dpd', align: 'end' },
  { title: 'Stage', key: 'currentStage' },
  { title: 'PD %', key: 'ecl.pd', align: 'end' },
  { title: 'Provision (ECL)', key: 'ecl.provision', align: 'end' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const totalProvision = computed(() => 
  accountingStore.tfrs9Assessments.reduce((sum, a) => sum + a.ecl.provision, 0)
)
</script>

<template>
  <VRow>
    <!-- Portfolio Summary -->
    <VCol cols="12" md="4">
      <VCard title="Portfolio Staging Distribution">
        <VCardText>
          <VueApexCharts
            type="donut"
            height="300"
            :options="chartOptions"
            :series="chartSeries"
          />
          <div class="mt-6">
            <div class="d-flex justify-space-between mb-2">
                <span class="text-body-2">Total Expected Credit Loss (ECL)</span>
                <span class="text-h6 text-error">{{ totalProvision.toLocaleString() }} ฿</span>
            </div>
             <VProgressLinear
              :model-value="100"
              color="error"
              height="8"
              rounded
            />
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VRow>
        <VCol v-for="(val, key) in stageStats.amounts" :key="key" cols="12" md="4">
            <VCard>
                <VCardText class="d-flex align-center gap-4">
                    <VAvatar :color="getStageColor(key)" variant="tonal" rounded size="42">
                        <VIcon icon="tabler-chart-pie" />
                    </VAvatar>
                    <div>
                        <div class="text-caption">{{ key }} (Outstanding)</div>
                        <div class="text-h6">{{ val.toLocaleString() }} ฿</div>
                    </div>
                </VCardText>
            </VCard>
        </VCol>
      </VRow>

      <!-- Staging Table -->
      <VCard class="mt-6" title="TFRS 9 Staging & ECL Assessment">
        <template #append>
            <VBtn prepend-icon="tabler-refresh" variant="tonal" color="primary" size="small">
                Recalculate ECL
            </VBtn>
        </template>
        <VDataTable
          :headers="headers"
          :items="accountingStore.tfrs9Assessments"
          density="compact"
        >
          <template #item.ecl.ead="{ value }">
            {{ value.toLocaleString() }} ฿
          </template>

          <template #item.currentStage="{ value }">
            <VChip :color="getStageColor(value)" size="x-small">
              {{ value }}
            </VChip>
          </template>

          <template #item.ecl.pd="{ value }">
            {{ (value * 100).toFixed(2) }}%
          </template>

          <template #item.ecl.provision="{ value }">
            <span class="font-weight-bold">{{ value.toLocaleString() }} ฿</span>
          </template>

          <template #item.actions="{ item }">
            <VBtn
                icon="tabler-edit"
                variant="text"
                size="small"
                color="info"
                title="Override Stage"
            />
            <VBtn
                icon="tabler-history"
                variant="text"
                size="small"
                title="Stage History"
            />
          </template>
        </VDataTable>
      </VCard>
    </VCol>

    <!-- ECL Parameters -->
    <VCol cols="12">
        <VCard title="Global ECL Parameters & Assumptions">
            <VCardText>
                <VRow>
                    <VCol cols="12" md="3">
                        <VTextField label="LGD (Loss Given Default) %" model-value="45" suffix="%" density="compact" />
                    </VCol>
                    <VCol cols="12" md="3">
                        <VTextField label="Avg. PD (Stage 1) %" model-value="2.5" suffix="%" density="compact" />
                    </VCol>
                    <VCol cols="12" md="3">
                        <VTextField label="Avg. PD (Stage 2) %" model-value="15.0" suffix="%" density="compact" />
                    </VCol>
                    <VCol cols="12" md="3">
                        <VBtn block color="primary" prepend-icon="tabler-device-floppy">Save Parameters</VBtn>
                    </VCol>
                </VRow>
            </VCardText>
        </VCard>
    </VCol>
  </VRow>
</template>
