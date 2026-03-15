<script setup lang="ts">
import { useFleetInsuranceStore } from '@/stores/fleet-insurance'
import { computed } from 'vue'

const insuranceStore = useFleetInsuranceStore()
const summary = computed(() => insuranceStore.insuranceSummary)

const kpiCards = [
  { title: 'กรมธรรม์ Active', value: summary.value.active, color: 'success', icon: 'tabler-shield-check' },
  { title: 'หมดอายุใน 30 วัน', value: summary.value.due30, color: 'error', icon: 'tabler-alert-circle' },
  { title: 'หมดอายุใน 31-60 วัน', value: summary.value.due60, color: 'warning', icon: 'tabler-alert-triangle' },
  { title: 'เบี้ยรวมทั้งปี (BHT)', value: summary.value.totalPremium.toLocaleString(), color: 'primary', icon: 'tabler-currency-baht' },
]

const getStatusColor = (status: string) => {
  const map: any = { 'ACTIVE': 'success', 'EXPIRED': 'error', 'DUE_SOON': 'warning' }
  return map[status] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol v-for="card in kpiCards" :key="card.title" cols="12" sm="6" md="3">
      <VCard>
        <VCardText class="d-flex align-center">
          <VAvatar :color="card.color" variant="tonal" rounded size="42" class="me-4">
            <VIcon :icon="card.icon" />
          </VAvatar>
          <div>
            <div class="text-h6 font-weight-bold">{{ card.value }}</div>
            <div class="text-caption">{{ card.title }}</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="พอร์ตกรมธรรม์ประกันภัย (Insurance Portfolio)">
        <template #append>
          <VBtn color="primary" prepend-icon="tabler-plus">Manual Add Policy</VBtn>
        </template>
        
        <VCardText class="d-flex flex-wrap gap-4">
          <div style="width: 250px"><VTextField label="Search Plate / Chassis" density="compact" prepend-inner-icon="tabler-search" hide-details /></div>
          <VSelect label="Class" :items="['CLASS1', 'CLASS2', 'CLASS3']" density="compact" style="width: 150px" hide-details />
          <VSpacer />
          <VBtn color="secondary" variant="tonal" prepend-icon="tabler-file-download">Bulk Renew</VBtn>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>ทะเบียน</th>
              <th>ประเภท</th>
              <th>บริษัทประกัน</th>
              <th class="text-right">เบี้ยประกัน</th>
              <th>วันหมดอายุ</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in insuranceStore.policies" :key="p.id">
              <td class="font-weight-bold">
                <div class="text-primary text-decoration-none cursor-pointer">
                  {{ p.plateNo }}
                </div>
                <div class="text-caption">{{ p.chassisNo }}</div>
              </td>
              <td><VChip size="x-small" label>{{ p.class }}</VChip></td>
              <td>{{ p.insuranceCompany }}</td>
              <td class="text-right font-weight-bold">{{ p.totalPremium.toLocaleString() }}</td>
              <td>{{ p.coverageEnd }}</td>
              <td class="text-center">
                <VChip :color="getStatusColor(p.status)" size="small" label>{{ p.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-eye" /></VBtn>
                <VBtn icon size="x-small" variant="text" color="success"><VIcon icon="tabler-refresh" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
