<script setup lang="ts">
import { useProcurementStore } from '@/stores/procurement'
import { computed } from 'vue'

const procStore = useProcurementStore()
const summary = computed(() => procStore.stockSummary)

const kpiCards = [
  { title: 'พร้อมให้เช่า (Available)', value: summary.value.AVAILABLE, color: 'success', icon: 'tabler-check' },
  { title: 'จองแล้ว (Reserved)', value: summary.value.RESERVED, color: 'warning', icon: 'tabler-ticket' },
  { title: 'ระหว่างขนส่ง', value: summary.value.IN_TRANSIT, color: 'info', icon: 'tabler-truck-delivery' },
  { title: 'รออยู่ท่าเรือ (At Port)', value: summary.value.AT_PORT, color: 'error', icon: 'tabler-ship' },
  { title: 'รอจดทะเบียน', value: summary.value.PENDING_REG, color: 'secondary', icon: 'tabler-news' },
  { title: 'รวมใน Stock', value: summary.value.TOTAL, color: 'primary', icon: 'tabler-database' },
]

const getStatusColor = (status: string) => {
  const map: any = { 'AVAILABLE': 'success', 'RESERVED': 'warning', 'AT_PORT': 'error', 'IN_TRANSIT': 'info' }
  return map[status] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol v-for="card in kpiCards" :key="card.title" cols="12" sm="6" md="2">
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
      <VCard title="Stock Management — ทะเบียนรถในสต็อก">
        <VCardText class="d-flex flex-wrap gap-4 align-center">
          <div style="width: 250px"><VTextField density="compact" label="Search Chassis / Model" prepend-inner-icon="tabler-search" hide-details /></div>
          <VSelect label="Location" :items="['HQ', 'Yard A', 'Yard B', 'Dealer']" density="compact" style="width: 150px" hide-details />
          <VSpacer />
          <VBtn variant="tonal" color="success" prepend-icon="tabler-refresh">Update Inventory</VBtn>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>Chassis No.</th>
              <th>Brand/Model</th>
              <th>Color</th>
              <th>Location</th>
              <th>Status</th>
              <th>วันที่รับ</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-weight-bold">CH-2024-X99</td>
              <td>Toyota Camry 2024</td>
              <td>Black</td>
              <td>HQ Yard</td>
              <td><VChip color="success" size="x-small">AVAILABLE</VChip></td>
              <td>2024-03-10</td>
              <td class="text-center">
                <VBtn size="x-small" color="primary">Reserve</VBtn>
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">CH-IM-999</td>
              <td>Vanguard 2024</td>
              <td>White</td>
              <td>Laem Chabang</td>
              <td><VChip color="error" size="x-small">AT_PORT</VChip></td>
              <td>2024-03-12</td>
              <td class="text-center">
                <VBtn size="x-small" color="info" variant="tonal">Track</VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
