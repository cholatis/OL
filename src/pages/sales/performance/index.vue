<script setup lang="ts">
import { ref } from 'vue'

const selectedPeriod = ref('March 2024')
const selectedSalesperson = ref('Somsak P.')

const kpiCards = [
  { title: 'Revenue Actual vs Target', value: '฿12.5M / ฿20M', hit: 62.5, color: 'primary', icon: 'tabler-currency-baht' },
  { title: 'Contracts Actual vs Target', value: '3 / 5', hit: 60, color: 'info', icon: 'tabler-file-analytics' },
  { title: 'Fleet Size Actual vs Target', value: '35 / 50', hit: 70, color: 'warning', icon: 'tabler-car' },
  { title: 'Hit Rate (Win/Loss)', value: '75%', hit: 75, color: 'success', icon: 'tabler-target-arrow' },
]

const chartOptions = {
  revenue: {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
    colors: ['#007A6C', '#BDC3C7'],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  },
  winLoss: {
    chart: { type: 'donut' },
    labels: ['Won', 'Lost', 'In Progress'],
    colors: ['#28C76F', '#EA5455', '#FF9F43'],
  }
}

const series = {
  revenue: [
    { name: 'Actual', data: [15, 18, 12, 0, 0, 0] },
    { name: 'Target', data: [18, 18, 20, 20, 15, 15] }
  ],
  winLoss: [15, 5, 25]
}
</script>

<template>
  <div>
    <!-- Selectors -->
    <VCard class="mb-6">
      <VCardText class="d-flex flex-wrap gap-4 align-center">
        <div style="width: 200px"><VSelect v-model="selectedPeriod" label="Period" :items="['March 2024', 'February 2024', 'Q1 2024']" density="compact" hide-details /></div>
        <div style="width: 200px"><VSelect v-model="selectedSalesperson" label="Salesperson" :items="['All Team', 'Somsak P.', 'Vichai K.']" density="compact" hide-details /></div>
      </VCardText>
    </VCard>

    <!-- KPI Cards -->
    <VRow class="mb-6">
      <VCol v-for="card in kpiCards" :key="card.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-start mb-2">
              <VAvatar :color="card.color" variant="tonal" rounded size="38">
                <VIcon :icon="card.icon" size="24" />
              </VAvatar>
              <VChip :color="card.hit >= 100 ? 'success' : 'warning'" size="x-small" label>{{ card.hit }}% Hit</VChip>
            </div>
            <div class="text-h6 font-weight-bold mb-1">{{ card.value }}</div>
            <div class="text-caption">{{ card.title }}</div>
            <VProgressLinear :model-value="card.hit" :color="card.color" height="6" rounded class="mt-4" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Charts -->
    <VRow>
      <VCol cols="12" md="8">
        <VCard title="Monthly Revenue vs Target (Million Baht)">
          <VCardText>
            <VueApexCharts :options="chartOptions.revenue" :series="series.revenue" height="350" />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard title="Win/Loss Ratio">
          <VCardText>
            <VueApexCharts :options="chartOptions.winLoss" :series="series.winLoss" height="350" />
          </VCardText>
        </VCard>
      </VCol>
      
      <VCol cols="12">
        <VCard title="Forecast Analysis">
          <VTable>
            <thead>
               <tr>
                 <th>Salesperson</th>
                 <th>Target</th>
                 <th>Committed (Prob ≥ 70%)</th>
                 <th>Best Case</th>
                 <th>Open Pipeline</th>
                 <th>Gap to Target</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                 <td>
                    <div class="d-flex align-center gap-2">
                      <VAvatar size="24" color="primary">SP</VAvatar>
                      <span>Somsak P.</span>
                    </div>
                 </td>
                 <td>฿20.0M</td>
                 <td>฿12.5M</td>
                 <td>฿35.0M</td>
                 <td>฿22.5M</td>
                 <td><span class="text-error font-weight-bold">฿7.5M</span></td>
               </tr>
            </tbody>
          </VTable>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
