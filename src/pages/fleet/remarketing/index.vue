<script setup lang="ts">
import { useDisposalStore } from '@/stores/disposal'
import { computed } from 'vue'

const disposalStore = useDisposalStore()

const chartOptions = {
  chart: { type: 'donut', toolbar: { show: false } },
  labels: ['Dealer Buyback', 'Auction', 'Private Sale', 'Lessee Purchase', 'Scrap'],
  colors: ['#00cfd5', '#7367f0', '#ff9f43', '#28c76f', '#ea5455'],
  legend: { position: 'bottom' }
}
const series = [40, 30, 15, 10, 5]

const statsCards = [
  { title: 'Total Revenue', value: '4.5M', color: 'primary', icon: 'tabler-cash' },
  { title: 'Units Sold (MTD)', value: '12', color: 'success', icon: 'tabler-car' },
  { title: 'Avg Days to Sell', value: '18d', color: 'info', icon: 'tabler-clock' },
  { title: 'Gain/Loss vs NBV', value: '+12%', color: 'warning', icon: 'tabler-trending-up' },
]
</script>

<template>
  <VRow>
    <VCol v-for="s in statsCards" :key="s.title" cols="12" sm="6" md="3">
      <VCard>
        <VCardText class="d-flex align-center">
          <VAvatar :color="s.color" variant="tonal" rounded size="42" class="me-4">
            <VIcon :icon="s.icon" />
          </VAvatar>
          <div>
            <div class="text-h6 font-weight-bold">{{ s.value }}</div>
            <div class="text-caption">{{ s.title }}</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="6">
      <VCard title="Disposal by Channel">
        <VCardText>
          <div class="d-flex justify-center py-6">
            <VueApexCharts :options="chartOptions" :series="series" height="350" width="100%" />
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="6">
      <VCard title="Remarketing Performance">
        <VCardText>
          <div class="bg-light pa-4 rounded mb-4 d-flex justify-space-between align-center">
            <div>
              <div class="text-subtitle-1 font-weight-bold">Expected Revenue (RV)</div>
              <div class="text-caption">Based on 35 upcoming terminations</div>
            </div>
            <div class="text-h6">31.5M BHT</div>
          </div>
          
          <VList density="compact">
             <VListItem title="Auction Lots Ready" subtitle="Waiting for next session" prepend-icon="tabler-gavel">
               <template #append><VChip color="primary" size="x-small">8 Units</VChip></template>
             </VListItem>
             <VListItem title="Lessee Purchase Offers" subtitle="Pending customer decision" prepend-icon="tabler-user-check">
               <template #append><VChip color="warning" size="x-small">3 Pending</VChip></template>
             </VListItem>
             <VListItem title="Dealer Inquiries" subtitle="Buyback quotes requested" prepend-icon="tabler-building">
               <template #append><VChip color="info" size="x-small">12 Quotes</VChip></template>
             </VListItem>
          </VList>
          
          <VBtn block color="primary" class="mt-4" to="/fleet/remarketing/auction">Manage Auctions</VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.bg-light { background-color: rgba(var(--v-theme-on-surface), 0.03); }
</style>
