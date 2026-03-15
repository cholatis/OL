<script setup lang="ts">
import { useProcurementStore } from '@/stores/procurement'

const procStore = useProcurementStore()

const formatRating = (score: number) => {
  return '⭐'.repeat(score || 0)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="ทะเบียนคู่ค้า & Vendor (Vendors/Dealers)">
        <template #append>
          <VBtn prepend-icon="tabler-plus" color="primary">Add Vendor</VBtn>
        </template>
        
        <VCardText>
          <VTextField density="compact" label="Search Vendor Name / Code" prepend-inner-icon="tabler-search" hide-details />
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Vendor Name</th>
              <th>Type</th>
              <th>Brands / Services</th>
              <th class="text-center">Lead Time (Avg)</th>
              <th class="text-center">Rating</th>
              <th class="text-center">Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v in procStore.vendors" :key="v.id">
              <td class="font-weight-bold">{{ v.vendorCode }}</td>
              <td>
                <div class="d-flex flex-column">
                  <span class="font-weight-medium">{{ v.companyName }}</span>
                  <span class="text-caption">Tax: {{ v.taxId }}</span>
                </div>
              </td>
              <td><VChip size="x-small" label>{{ v.vendorType }}</VChip></td>
              <td>
                <div class="d-flex gap-1 flex-wrap">
                  <VChip v-for="b in v.brand" :key="b" size="x-small" variant="tonal">{{ b }}</VChip>
                </div>
              </td>
              <td class="text-center">{{ v.avgDeliveryDays || '-' }} Days</td>
              <td class="text-center text-warning">{{ formatRating(v.qualityScore || 5) }}</td>
              <td class="text-center">
                <VChip color="success" size="small">{{ v.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-eye" /></VBtn>
                <VBtn icon size="x-small" variant="text" color="secondary"><VIcon icon="tabler-pencil" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
