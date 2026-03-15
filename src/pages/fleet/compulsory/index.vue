<script setup lang="ts">
import { useFleetInsuranceStore } from '@/stores/fleet-insurance'

const insuranceStore = useFleetInsuranceStore()
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="การจัดการ พรบ. (Compulsory Motor Insurance)">
        <template #append>
          <VBtn prepend-icon="tabler-file-upload" variant="tonal" color="secondary" class="me-2">Batch Update</VBtn>
          <VBtn prepend-icon="tabler-plus" color="primary">Manual Renew</VBtn>
        </template>

        <VCardText class="d-flex flex-wrap gap-4 align-center">
          <div style="width: 250px"><VTextField density="compact" label="Search Vehicle" prepend-inner-icon="tabler-search" hide-details /></div>
          <VAlert v-if="insuranceStore.compulsoryList.some(c => c.status === 'EXPIRED')" color="error" class="ml-4 py-2" density="compact" variant="tonal">มี พรบ. หมดอายุ {{ insuranceStore.compulsoryList.filter(c => c.status === 'EXPIRED').length }} รายการ</VAlert>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>ทะเบียน / Chassis</th>
              <th>บริษัทประกัน</th>
              <th>เลขที่ใบรับรอง</th>
              <th>วันหมดอายุ</th>
              <th class="text-right">เบี้ยรวม</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in insuranceStore.compulsoryList" :key="c.id">
              <td>
                <div class="font-weight-bold">{{ c.plateNo }}</div>
                <div class="text-caption">{{ c.chassisNo }}</div>
              </td>
              <td>{{ c.insuranceCompany }}</td>
              <td>{{ c.certificateNo }}</td>
              <td>
                <div :class="c.status === 'EXPIRED' ? 'text-error font-weight-bold' : ''">{{ c.expiryDate }}</div>
              </td>
              <td class="text-right">{{ c.premium.toLocaleString() }}</td>
              <td class="text-center">
                <VChip :color="c.status === 'ACTIVE' ? 'success' : 'error'" size="small" label>{{ c.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn size="small" variant="outlined" color="primary" class="me-1">ต่ออายุ</VBtn>
                <VBtn icon size="x-small" variant="text"><VIcon icon="tabler-download" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
