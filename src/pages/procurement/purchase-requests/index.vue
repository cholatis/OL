<script setup lang="ts">
import { useProcurementStore } from '@/stores/procurement'

const procStore = useProcurementStore()

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    'DRAFT': 'secondary',
    'PENDING_APPROVAL': 'warning',
    'APPROVED': 'success',
    'CONVERTED_TO_PO': 'info',
    'CANCELLED': 'error'
  }
  return map[status] || 'secondary'
}

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="รายการขอซื้อ (Purchase Requests)">
        <template #append>
          <VBtn prepend-icon="tabler-plus" color="primary">สร้าง PR ใหม่</VBtn>
        </template>

        <VCardText class="d-flex flex-wrap gap-4 align-center">
          <div style="width: 250px">
            <VTextField density="compact" label="ค้นหาเลขที่ PR" prepend-inner-icon="tabler-search" hide-details />
          </div>
          <VSpacer />
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>เลขที่ PR</th>
              <th>วันที่ขอ</th>
              <th>ผู้ขอ / Dept</th>
              <th>วันที่ต้องการ</th>
              <th class="text-right">งบประมาณ</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pr in procStore.purchaseRequests" :key="pr.id">
              <td class="font-weight-bold">
                <router-link :to="`/procurement/purchase-requests/${pr.id}`" class="text-primary text-decoration-none">
                  {{ pr.prNo }}
                </router-link>
              </td>
              <td>{{ pr.requestDate }}</td>
              <td>
                <div class="d-flex flex-column">
                  <span class="font-weight-medium">{{ pr.requestedBy }}</span>
                  <span class="text-caption">{{ pr.department }}</span>
                </div>
              </td>
              <td>{{ pr.requiredDate }}</td>
              <td class="text-right">{{ formatCurrency(pr.totalBudget) }}</td>
              <td class="text-center">
                <VChip :color="getStatusColor(pr.status)" size="small" label>{{ pr.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-eye" /></VBtn>
                <VBtn icon size="x-small" variant="text" color="success" :disabled="pr.status !== 'APPROVED'">
                  <VIcon icon="tabler-shopping-cart-plus" />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
