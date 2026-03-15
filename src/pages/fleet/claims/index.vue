<script setup lang="ts">
import { useFleetInsuranceStore } from '@/stores/fleet-insurance'

const insuranceStore = useFleetInsuranceStore()

const getStatusColor = (status: string) => {
  const map: any = { 'APPROVED': 'success', 'REPAIR_IN_PROGRESS': 'warning', 'SETTLED': 'info' }
  return map[status] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="รายการเคลมประกันภัย (Insurance Claims)">
        <VCardText>
          <div class="d-flex gap-4">
             <VTextField density="compact" label="Search Claim No / Acc No" prepend-inner-icon="tabler-search" hide-details />
             <VSelect label="Status" :items="['All', 'SUBMITTED', 'APPROVED', 'REPAIR', 'SETTLED']" density="compact" style="width: 200px" hide-details />
          </div>
        </VCardText>
        
        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>Claim No.</th>
              <th>Accident No.</th>
              <th>วันที่เคลม</th>
              <th>ประเภท</th>
              <th class="text-right">วงเงินอนุมัติ</th>
              <th class="text-right">เบี้ยปรับ/Deduct</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in insuranceStore.claims" :key="c.id">
              <td class="font-weight-bold">{{ c.claimNo }}</td>
              <td>{{ c.accidentId }}</td>
              <td>{{ c.claimDate }}</td>
              <td>{{ c.claimType }}</td>
              <td class="text-right font-weight-bold">{{ (c.approvedClaimAmount || 0).toLocaleString() }}</td>
              <td class="text-right text-error">{{ c.deductible.toLocaleString() }}</td>
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
