<script setup lang="ts">
import { useDisposalStore } from '@/stores/disposal'
import { computed } from 'vue'

const disposalStore = useDisposalStore()
const summary = computed(() => disposalStore.pipelineSummary)

const kpiCards = [
  { title: 'รอรับรถคืน', value: summary.value.PENDING_RETURN, color: 'warning', icon: 'tabler-truck-return' },
  { title: 'อยู่ระหว่างตรวจสภาพ', value: summary.value.INSPECTION, color: 'info', icon: 'tabler-clipboard-check' },
  { title: 'รอประเมินราคา', value: summary.value.VALUATION, color: 'secondary', icon: 'tabler-cash' },
  { title: 'ลงประกาศขายแล้ว', value: summary.value.LISTED, color: 'primary', icon: 'tabler-tag' },
  { title: 'ขายเสร็จ (เดือนนี้)', value: summary.value.SOLD, color: 'success', icon: 'tabler-check' },
]

const getStatusColor = (status: string) => {
  const map: any = { 
    'PENDING_RETURN': 'warning', 
    'RETURNED': 'info', 
    'INSPECTION': 'info', 
    'VALUATION': 'secondary',
    'LISTED': 'primary',
    'SOLD': 'success',
    'CLOSED': 'success'
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol v-for="card in kpiCards" :key="card.title" cols="12" sm="6" md="2.4" style="flex: 0 0 20%; max-width: 20%;">
      <VCard>
        <VCardText class="d-flex flex-column align-center text-center">
          <VAvatar :color="card.color" variant="tonal" rounded size="42" class="mb-3">
            <VIcon :icon="card.icon" />
          </VAvatar>
          <div class="text-h5 font-weight-bold">{{ card.value }}</div>
          <div class="text-caption">{{ card.title }}</div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="รายการจำหน่ายสินทรัพย์ (Disposal Pipeline)">
        <template #append>
          <VBtn color="primary" prepend-icon="tabler-plus">New Disposal Case</VBtn>
        </template>
        
        <VCardText class="d-flex flex-wrap gap-4">
          <div style="width: 250px"><VTextField label="Search Disposal No / Plate" density="compact" prepend-inner-icon="tabler-search" hide-details /></div>
          <VSelect label="Stage" :items="['All', 'INSPECTION', 'VALUATION', 'LISTED', 'SOLD']" density="compact" style="width: 180px" hide-details />
          <VSpacer />
          <div class="text-right">
            <div class="text-caption">Avg Gain/Loss per Unit</div>
            <div class="text-subtitle-1 font-weight-bold text-success">+{{ summary.avgGainLoss.toLocaleString() }} BHT</div>
          </div>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>Disposal No.</th>
              <th>Vehicle Details</th>
              <th>Origin</th>
              <th class="text-right">NBV</th>
              <th class="text-right">RV (Contract)</th>
              <th class="text-right">Sale Price</th>
              <th class="text-center">Status</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in disposalStore.disposalCases" :key="c.id">
              <td class="font-weight-bold">
                <router-link :to="`/fleet/disposal/${c.id}`" class="text-primary text-decoration-none">
                  {{ c.disposalNo }}
                </router-link>
              </td>
              <td>
                <div class="font-weight-bold text-uppercase">{{ c.plateNo }}</div>
                <div class="text-caption">{{ c.brand }} {{ c.model }} ({{ c.year }})</div>
              </td>
              <td><VChip size="x-small" variant="outlined">{{ c.originType }}</VChip></td>
              <td class="text-right font-weight-medium">{{ c.nbvAtDisposal.toLocaleString() }}</td>
              <td class="text-right">{{ c.contractRV.toLocaleString() }}</td>
              <td class="text-right">
                <span v-if="c.finalSalePrice" class="font-weight-bold text-success">{{ c.finalSalePrice.toLocaleString() }}</span>
                <span v-else class="text-secondary">-</span>
              </td>
              <td class="text-center">
                <VChip :color="getStatusColor(c.status)" size="small" label>{{ c.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-eye" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
