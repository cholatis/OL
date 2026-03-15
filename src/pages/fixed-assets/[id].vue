<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFixedAssetsStore } from '@/stores/fixed-assets'
import { useDepreciation } from '@/composables/useDepreciation'

const route = useRoute()
const faStore = useFixedAssetsStore()
const deprCalc = useDepreciation()

const asset = computed(() => faStore.assets.find(a => a.id === route.params.id))
const activeTab = ref(0)
const schedule = computed(() => asset.value ? deprCalc.buildDepreciationSchedule(asset.value) : [])

const chartOptions = computed(() => ({
  chart: { type: 'line', toolbar: { show: false } },
  colors: ['#007A6C'],
  stroke: { curve: 'smooth', width: 3 },
  xaxis: { categories: schedule.value.slice(0, 12).map(r => r.period) },
  yaxis: { labels: { formatter: (val: number) => val.toLocaleString() } },
  tooltip: { y: { formatter: (val: number) => val.toLocaleString() } }
}))

const chartSeries = computed(() => [
  { name: 'Net Book Value', data: schedule.value.slice(0, 12).map(r => r.closingNBV) }
])

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <div v-if="asset">
    <VRow class="mb-4">
      <VCol cols="12" class="d-flex align-center">
        <VBtn icon="tabler-arrow-left" variant="text" @click="$router.back()" />
        <h3 class="text-h5 ms-2">{{ asset.assetName }} ({{ asset.assetCode }})</h3>
        <VSpacer />
        <VChip :color="asset.status === 'ACTIVE' ? 'success' : 'warning'" label size="small" class="me-2">
          {{ asset.status }}
        </VChip>
        <VBtn color="primary" prepend-icon="tabler-edit" disabled>Edit Asset</VBtn>
      </VCol>
    </VRow>

    <VTabs v-model="activeTab" color="primary">
      <VTab :value="0">General Info</VTab>
      <VTab :value="1">Depreciation Schedule</VTab>
      <VTab :value="2">Lease History</VTab>
      <VTab :value="3">Documents</VTab>
    </VTabs>

    <VWindow v-model="activeTab" class="mt-4">
      <!-- Tab 1: General Info -->
      <VWindowItem :value="0">
        <VRow>
          <VCol cols="12" md="8">
            <VCard title="Asset Details">
              <VCardText>
                <VRow>
                  <VCol cols="6">
                    <div class="text-caption">Category</div>
                    <div class="font-weight-bold">{{ asset.category }}</div>
                  </VCol>
                  <VCol cols="6">
                    <div class="text-caption">Linked Asset SN</div>
                    <div class="font-weight-bold text-primary">{{ asset.assetManagementId }}</div>
                  </VCol>
                  <VCol cols="6">
                    <div class="text-caption">Acquisition Date</div>
                    <div>{{ asset.acquisitionDate }}</div>
                  </VCol>
                  <VCol cols="6">
                    <div class="text-caption">Useful Life</div>
                    <div>{{ asset.usefulLifeYears }} Years</div>
                  </VCol>
                  <VCol cols="6">
                    <div class="text-caption">Acquisition Cost</div>
                    <div class="text-h6">{{ formatCurrency(asset.acquisitionCost) }}</div>
                  </VCol>
                  <VCol cols="6">
                    <div class="text-caption">Residual Value (Scrap)</div>
                    <div>{{ formatCurrency(asset.residualValue) }}</div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>

            <VCard title="Accounting Information" class="mt-4">
              <VCardText>
                <VRow>
                  <VCol cols="4">
                    <div class="text-caption">Asset Account</div>
                    <div class="text-primary">{{ asset.accountCode }}</div>
                  </VCol>
                  <VCol cols="4">
                    <div class="text-caption">Accum. Depr. Account</div>
                    <div class="text-primary">{{ asset.accumDeprAccount }}</div>
                  </VCol>
                  <VCol cols="4">
                    <div class="text-caption">Depr. Expense Account</div>
                    <div class="text-primary">{{ asset.deprExpenseAccount }}</div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="4">
            <VCard title="Current Lease Status" class="bg-light-primary">
              <VCardText v-if="asset.currentLeaseContractId">
                <div class="mb-4">
                  <div class="text-caption">Lessee</div>
                  <div class="text-h6">{{ asset.currentLesseeName }}</div>
                </div>
                <div class="mb-4">
                  <div class="text-caption">Contract ID</div>
                  <div class="text-primary font-weight-bold">{{ asset.currentLeaseContractId }}</div>
                </div>
                <div class="d-flex justify-space-between">
                  <div>
                    <div class="text-caption">Start Date</div>
                    <div>{{ asset.leaseStartDate }}</div>
                  </div>
                  <div>
                    <div class="text-caption">End Date</div>
                    <div>{{ asset.leaseEndDate }}</div>
                  </div>
                </div>
              </VCardText>
              <VCardText v-else class="text-center py-8">
                <VIcon icon="tabler-ban" size="48" color="secondary" class="mb-2" />
                <div class="text-subtitle-1">Not Currently On Lease</div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Tab 2: Depreciation Schedule -->
      <VWindowItem :value="1">
        <VRow>
          <VCol cols="12" md="8">
            <VCard title="Depreciation Schedule (Monthly)">
              <VTable density="compact" class="border rounded">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th class="text-right">Opening NBV</th>
                    <th class="text-right">Expense</th>
                    <th class="text-right">Accum. Depr.</th>
                    <th class="text-right">Closing NBV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in schedule.slice(0, 24)" :key="row.period">
                    <td>{{ row.period }}</td>
                    <td class="text-right">{{ formatCurrency(row.openingNBV) }}</td>
                    <td class="text-right text-error">{{ formatCurrency(row.depreciationExpense) }}</td>
                    <td class="text-right">{{ formatCurrency(row.accumulatedDepreciation) }}</td>
                    <td class="text-right font-weight-bold">{{ formatCurrency(row.closingNBV) }}</td>
                  </tr>
                </tbody>
              </VTable>
              <VCardText class="text-center border-top">
                <VBtn variant="text">View Full 60-Month Schedule</VBtn>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="4">
            <VCard title="NBV Declining Curve (12 Months)">
              <VCardText>
                <VueApexCharts :options="chartOptions" :series="chartSeries" height="300" />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Tab 3: Lease History -->
      <VWindowItem :value="2">
        <VCard title="Lease History Timeline">
          <VCardText>
            <VTimeline align="start" density="compact">
              <VTimelineItem color="success" size="small">
                <div class="d-flex justify-space-between align-center">
                  <div class="font-weight-bold">Current: {{ asset.currentLesseeName }}</div>
                  <div class="text-caption">{{ asset.leaseStartDate }} - Present</div>
                </div>
                <div class="text-caption">Contract: {{ asset.currentLeaseContractId }}</div>
              </VTimelineItem>
              <VTimelineItem color="secondary" size="small">
                <div class="d-flex justify-space-between align-center">
                  <div class="font-weight-bold italic">Idle / Inventory</div>
                  <div class="text-caption">2023-10-01 - 2024-01-31</div>
                </div>
              </VTimelineItem>
              <VTimelineItem color="primary" size="small">
                <div class="d-flex justify-space-between align-center">
                  <div class="font-weight-bold">Previous Lessee: Major Cineplex</div>
                  <div class="text-caption">2020-09-01 - 2023-09-30</div>
                </div>
              </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>
      </VWindowItem>

      <!-- Tab 4: Documents -->
      <VWindowItem :value="3">
        <VCard>
          <VCardText>
            <div class="d-flex flex-wrap gap-4">
              <VCard v-for="i in 3" :key="i" width="150" variant="outlined" class="text-center pa-4 cursor-pointer">
                <VIcon icon="tabler-file-text" size="48" color="primary" />
                <div class="text-caption mt-2">Registration_Book.pdf</div>
              </VCard>
              <VCard width="150" variant="tonal" color="primary" class="d-flex align-center justify-center cursor-pointer border-dashed">
                <VIcon icon="tabler-plus" size="32" />
              </VCard>
            </div>
          </VCardText>
        </VCard>
      </VWindowItem>
    </VWindow>
  </div>
  <div v-else class="text-center py-12">
    <VProgressCircular indeterminate color="primary" />
  </div>
</template>

<style scoped>
.bg-light-primary { background-color: rgba(var(--v-theme-primary), 0.05); }
.border-top { border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)); }
</style>
