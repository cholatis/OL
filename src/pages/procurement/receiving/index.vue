<script setup lang="ts">
import { useProcurementStore } from '@/stores/procurement'

const procStore = useProcurementStore()

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="การรับรถ (Goods Receipt — GR)">
        <template #append>
          <VBtn prepend-icon="tabler-barcode" color="primary">รับรถใหม่</VBtn>
        </template>
        
        <VCardText>
          <div class="d-flex gap-4">
            <VTextField density="compact" label="ค้นหาเลขที่ GR / PO / Chassis" prepend-inner-icon="tabler-search" hide-details />
            <VBtn variant="tonal" color="secondary">Filter</VBtn>
          </div>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>เลขที่ GR</th>
              <th>วันที่รับ</th>
              <th>อ้างอิง PO</th>
              <th>ผู้ส่ง (Vendor)</th>
              <th class="text-center">จำนวนที่รับ</th>
              <th class="text-center">PDI Result</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gr in procStore.goodsReceipts" :key="gr.id">
              <td class="font-weight-bold">
                <router-link :to="`/procurement/receiving/${gr.id}`" class="text-primary text-decoration-none">
                  {{ gr.grNo }}
                </router-link>
              </td>
              <td>{{ gr.grDate }}</td>
              <td>{{ gr.poId }}</td>
              <td>Toyota Motor Thailand</td>
              <td class="text-center">{{ gr.totalReceived }}</td>
              <td class="text-center">
                <VChip :color="gr.inspectionResult === 'PASS' ? 'success' : 'error'" size="x-small">
                  {{ gr.inspectionResult }}
                </VChip>
              </td>
              <td class="text-center">
                <VChip color="success" size="small">{{ gr.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text"><VIcon icon="tabler-eye" /></VBtn>
              </td>
            </tr>
            <tr v-if="procStore.goodsReceipts.length === 0">
              <td colspan="8" class="text-center py-10 text-secondary">
                <VIcon icon="tabler-package-off" size="48" class="mb-2" />
                <div>ไม่พบข้อมูลการรับสินค้า</div>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
