<script setup lang="ts">
import { useFleetInsuranceStore } from '@/stores/fleet-insurance'

const insuranceStore = useFleetInsuranceStore()

const getSeverityColor = (sev: string) => {
  const map: any = { 'MINOR': 'info', 'MODERATE': 'warning', 'SEVERE': 'error', 'TOTAL_LOSS': 'secondary' }
  return map[sev] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="รายการอุบัติเหตุ (Accident Reports)">
        <template #append>
          <VBtn color="error" prepend-icon="tabler-alert-triangle">แจ้งอุบัติเหตุใหม่</VBtn>
        </template>
        
        <VCardText>
          <VRow>
            <VCol cols="12" md="4"><VTextField density="compact" label="Search Acc No / Plate" prepend-inner-icon="tabler-search" hide-details /></VCol>
            <VCol cols="12" md="8" class="d-flex gap-2">
              <VChip v-for="s in ['REPORTED', 'CLAIM_FILED', 'REPAIRED', 'SETTLED']" :key="s" variant="tonal" size="small">{{ s }}</VChip>
            </VCol>
          </VRow>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>วันที่เกิดเหตุ</th>
              <th>ทะเบียนรถ</th>
              <th>สถานที่ / จังหวัด</th>
              <th>ความรุนแรง</th>
              <th>ฝ่ายผิด</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in insuranceStore.accidents" :key="a.id">
              <td class="font-weight-bold">
                <router-link :to="`/fleet/accidents/${a.id}`" class="text-primary text-decoration-none">
                  {{ a.accidentNo }}
                </router-link>
              </td>
              <td>{{ a.accidentDate }} {{ a.accidentTime }}</td>
              <td>{{ a.plateNo }}</td>
              <td>{{ a.location }}, {{ a.province }}</td>
              <td>
                <VChip :color="getSeverityColor(a.severity)" size="x-small" label>{{ a.severity }}</VChip>
              </td>
              <td>{{ a.fault }}</td>
              <td class="text-center">
                <VChip variant="outlined" size="small">{{ a.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-eye" /></VBtn>
                <VBtn icon size="x-small" variant="text" color="info"><VIcon icon="tabler-file-invoice" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
