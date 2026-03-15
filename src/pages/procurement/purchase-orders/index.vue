<script setup lang="ts">
import { useProcurementStore } from '@/stores/procurement'

const procStore = useProcurementStore()

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    'DRAFT': 'secondary',
    'CONFIRMED': 'primary',
    'PARTIAL_RECEIVED': 'warning',
    'FULLY_RECEIVED': 'success',
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
      <VCard title="ใบสั่งซื้อ (Purchase Orders)">
        <VCardText class="d-flex flex-wrap gap-4 align-center">
          <div style="width: 250px">
            <VTextField density="compact" label="ค้นหาเลขที่ PO / Vendor" prepend-inner-icon="tabler-search" hide-details />
          </div>
          <VSelect label="สถานะ" :items="['All', 'DRAFT', 'CONFIRMED', 'FULLY_RECEIVED']" density="compact" style="width: 150px" hide-details />
          <VSpacer />
          <VBtn prepend-icon="tabler-file-download" variant="tonal" color="secondary">Export CSV</VBtn>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>เลขที่ PO</th>
              <th>วันที่สั่ง</th>
              <th>Vendor</th>
              <th>กำหนดส่ง</th>
              <th class="text-right">ยอดรวม</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="po in procStore.purchaseOrders" :key="po.id">
              <td class="font-weight-bold">
                <router-link :to="`/procurement/purchase-orders/${po.id}`" class="text-primary text-decoration-none">
                  {{ po.poNo }}
                </router-link>
              </td>
              <td>{{ po.poDate }}</td>
              <td>{{ po.vendorName }}</td>
              <td>{{ po.deliveryDate }}</td>
              <td class="text-right font-weight-bold">{{ formatCurrency(po.total) }}</td>
              <td class="text-center">
                <VChip :color="getStatusColor(po.status)" size="small" label>{{ po.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-printer" /></VBtn>
                <VBtn icon size="x-small" variant="text" color="info" :to="`/procurement/receiving?po=${po.poNo}`">
                  <VIcon icon="tabler-package-receive" />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
